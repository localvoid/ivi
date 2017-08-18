import {
  Vec2, ZeroVec2, vec2, vec2DistanceSquared, vec2Distance, vec2Div, vec2Mul, vec2Sub, vec2Equal, polynomialFit,
} from "ivi-math";

export function velocityClampMagnitude(velocity: Vec2, minValue: number, maxValue: number): Vec2 {
  const valueSquared = vec2DistanceSquared(velocity);
  if (valueSquared > maxValue * maxValue) {
    return vec2Mul(vec2Div(velocity, vec2Distance(velocity)), maxValue);
  }
  if (valueSquared < minValue * minValue) {
    return vec2Mul(vec2Div(velocity, vec2Distance(velocity)), minValue);
  }
  return velocity;
}

export interface VelocityEstimate {
  readonly pixelsPerSecond: Vec2;
  readonly confidence: number;
  readonly duration: number;
  readonly offset: Vec2;
}

interface PointAtTime {
  readonly time: number;
  readonly point: Vec2;
}

function velocityEstimate(pixelsPerSecond: Vec2, confidence: number, duration: number, offset: Vec2): VelocityEstimate {
  return { pixelsPerSecond, confidence, duration, offset };
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
    this._samples[this._index] = { time: time, point: position };
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
      const xFit = polynomialFit(2, time, x, w);
      if (xFit !== null) {
        const yFit = polynomialFit(2, time, y, w);
        if (yFit !== null) {
          return velocityEstimate(
            vec2(xFit[1] * 1000, yFit[1] * 1000),
            xFit.confidence * yFit.confidence,
            newestSample.time - oldestSample.time,
            vec2Sub(newestSample.point, oldestSample.point),
          );
        }
      }
    }

    return velocityEstimate(
      ZeroVec2,
      1,
      newestSample.time - oldestSample.time,
      vec2Sub(newestSample.point, oldestSample.point),
    );
  }

  getVelocity(): Vec2 | null {
    const estimate = this.getVelocityEstimate();
    if (estimate === null || vec2Equal(estimate.pixelsPerSecond, ZeroVec2)) {
      return null;
    }
    return estimate.pixelsPerSecond;
  }
}
