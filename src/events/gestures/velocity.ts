import { Vec2 } from "../../common/geometry";
import { LeastSquaresSolver } from "./lsq_solver";

export function velocityClampMagnitude(velocity: Vec2, minValue: number, maxValue: number): Vec2 {
    const valueSquared = velocity.distanceSquared();
    if (valueSquared > maxValue * maxValue) {
        return velocity.div(velocity.distance()).mul(maxValue);
    }
    if (valueSquared < minValue * minValue) {
        return velocity.div(velocity.distance()).mul(minValue);
    }
    return velocity;
}

export class VelocityEstimate {
    readonly pixelsPerSecond: Vec2;
    readonly confidence: number;
    readonly duration: number;
    readonly offset: Vec2;

    constructor(
        pixelsPerSecond: Vec2,
        confidence: number,
        duration: number,
        offset: Vec2,
    ) {
        this.pixelsPerSecond = pixelsPerSecond;
        this.confidence = confidence;
        this.duration = duration;
        this.offset = offset;
    }
}

class PointAtTime {
    time: number;
    point: Vec2;

    constructor(point: Vec2, time: number) {
        this.point = point;
        this.time = time;
    }
}

const ASSUME_POINTER_MOVE_STOPPED_MILLISECONDS = 40;
const HISTORY_SIZE = 20;
const HORIZON_MILLISECONDS = 100;
const MIN_SAMPLE_SIZE = 3;

export class VelocityTracker {
    private _samples = new Array<PointAtTime>(HISTORY_SIZE);
    private _index = 0;

    addPosition(time: number, position: Vec2) {
        this._index++;
        if (this._index === HISTORY_SIZE) {
            this._index = 0;
        }
        this._samples[this._index] = new PointAtTime(position, time);
    }

    getVelocityEstimate(): VelocityEstimate | null {
        let index = this._index;

        const newestSample = this._samples[index];
        if (newestSample === null) {
            return null;
        }

        const x = [] as number[];
        const y = [] as number[];
        const w = [] as number[];
        const time = [] as number[];

        let sampleCount = 0;
        let previousSample = newestSample;
        let oldestSample = newestSample;

        do {
            const sample = this._samples[index];
            if (sample === null) {
                break;
            }

            const age = newestSample.time - sample.time;
            const delta = Math.abs(sample.time - previousSample.time);
            previousSample = sample;

            if (age > HORIZON_MILLISECONDS || delta > ASSUME_POINTER_MOVE_STOPPED_MILLISECONDS) {
                break;
            }

            oldestSample = sample;
            const position = sample.point;
            x.push(position.x);
            y.push(position.y);
            w.push(1);
            time.push(-age);
            index = ((index === 0) ? HISTORY_SIZE : index) - 1;
            sampleCount++;
        } while (sampleCount < HISTORY_SIZE);

        if (sampleCount > MIN_SAMPLE_SIZE) {
            const xSolver = new LeastSquaresSolver(time, x, w);
            const xFit = xSolver.solve(2);
            if (xFit !== null) {
                const ySolver = new LeastSquaresSolver(time, y, w);
                const yFit = ySolver.solve(2);
                if (yFit !== null) {
                    return new VelocityEstimate(
                        new Vec2(xFit.coefficients[1] * 1000, yFit.coefficients[1] * 1000),
                        xFit.confidence * yFit.confidence,
                        newestSample.time - oldestSample.time,
                        newestSample.point.sub(oldestSample.point),
                    );
                }
            }
        }
        return new VelocityEstimate(
            new Vec2(0, 0),
            1,
            newestSample.time - oldestSample.time,
            newestSample.point.sub(oldestSample.point),
        );
    }

    getVelocity(): Vec2 | null {
        const estimate = this.getVelocityEstimate();
        if (estimate === null || estimate.pixelsPerSecond.eq(Vec2.Zero)) {
            return null;
        }
        return estimate.pixelsPerSecond;
    }
}
