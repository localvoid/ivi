import { Vec2 } from "../../common/geometry";
import { EventHandler } from "../event_handler";
import { PointerMap, pointerMapPush, pointerMapGet } from "./pointer_map";
import { VelocityTracker } from "./velocity";
import { GesturePointerEvent, GesturePointerAction } from "./pointer_event";
import { GestureScaleEvent, GestureScaleAction } from "./gesture_event";
import { GestureDisposition } from "./arena";
import { OneSequenceGestureRecognizer } from "./recognizer";

const MIN_FLING_VELOCITY = 50;
const MAX_FLING_VELOCITY = 8000;
const SCALE_SLOP = 8;

const enum ScaleState {
    Ready = 1,
    Possible = 2,
    Accepted = 3,
    Started = 4,
}

function isFlingGesture(velocity: Vec2): boolean {
    return velocity.distanceSquared() > MIN_FLING_VELOCITY * MIN_FLING_VELOCITY;
}

export class GestureScaleRecognizer extends OneSequenceGestureRecognizer {
    private state: ScaleState;
    private initialSpan: number;
    private currentSpan: number;
    private velocityTrackers: PointerMap<VelocityTracker>;

    constructor(handler: EventHandler) {
        super(handler);
        this.state = ScaleState.Ready;
        this.initialSpan = 0;
        this.currentSpan = 0;
        this.velocityTrackers = [];
    }

    private getScaleFactor(): number {
        return this.initialSpan > 0 ? this.currentSpan / this.initialSpan : 1;
    }

    acceptGesture(pointerId: number) {
        if (this.state !== ScaleState.Accepted) {
            this.state = ScaleState.Accepted;
            this.update(false, pointerId);
        }
    }

    handlePointerEvent(ev: GesturePointerEvent): boolean {
        if (ev.action === GesturePointerAction.Down) {
            this.startPointerTracking(ev);
            pointerMapPush(this.velocityTrackers, ev.id, new VelocityTracker());
            if (this.state === ScaleState.Ready) {
                this.state = ScaleState.Possible;
                this.initialSpan = 0;
                this.currentSpan = 0;
            }
        } else {
            if (ev.action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) {
                this.stopPointerTracking(ev);
            }

        }

        return true;
    }

    didStopTrackingLastPointer(pointer: GesturePointerEvent): void {
        if (this.state === ScaleState.Possible) {
            this.resolve(GestureDisposition.Rejected);
        }
        this.state = ScaleState.Ready;
    }

    private update(configChanged: boolean, pointerId: number) {
        const count = this.pointers.length;
        let focalPointX = 0;
        let focalPointY = 0;

        for (let i = 0; i < count; i++) {
            const pointer = this.pointers[i];
            focalPointX += pointer.x;
            focalPointY += pointer.y;
        }

        focalPointX /= count;
        focalPointY /= count;

        let totalDeviation = 0;
        for (let i = 0; i < count; i++) {
            const pointer = this.pointers[i];
            let x = focalPointX - pointer.x;
            let y = focalPointY - pointer.y;
            totalDeviation += Math.sqrt(x * x + y * y);
        }

        this.currentSpan = count > 0 ? totalDeviation / count : 0;

        if (configChanged === true) {
            this.initialSpan = this.currentSpan;
            if (this.state === ScaleState.Started) {
                const tracker = pointerMapGet(this.velocityTrackers, pointerId)!;
                let velocity = tracker.getVelocity();
                if (velocity !== null && isFlingGesture(velocity) === true) {
                    if (velocity.distanceSquared() > MAX_FLING_VELOCITY * MAX_FLING_VELOCITY) {
                        velocity = velocity.div(velocity.distance()).mul(MAX_FLING_VELOCITY);
                        this.emitEnd(focalPointX, focalPointY, velocity);
                    }
                } else {
                    this.emitEnd(focalPointX, focalPointY, Vec2.Zero);
                }
            }
            this.state = ScaleState.Accepted;
        }

        if (this.state === ScaleState.Ready) {
            this.state = ScaleState.Possible;
        }

        if (this.state === ScaleState.Possible &&
            Math.abs(this.currentSpan - this.initialSpan) > SCALE_SLOP) {
            this.resolve(GestureDisposition.Accepted);
        }

        if (this.state === ScaleState.Accepted && configChanged === false) {
            this.state = ScaleState.Started;
            this.emitStart(focalPointX, focalPointY);
        }

        if (this.state === ScaleState.Started) {
            this.emitUpdate(focalPointX, focalPointY);
        }
    }

    private emitStart(focalPointX: number, focalPointY: number) {
        this.handler(new GestureScaleEvent(
            0,
            GestureScaleAction.ScaleStart,
            focalPointX,
            focalPointY,
            1,
            null,
        ));
    }

    private emitUpdate(focalPointX: number, focalPointY: number) {
        this.handler(new GestureScaleEvent(
            0,
            GestureScaleAction.ScaleUpdate,
            focalPointX,
            focalPointY,
            this.getScaleFactor(),
            null,
        ));
    }

    private emitEnd(focalPointX: number, focalPointY: number, velocity: Vec2) {
        this.handler(new GestureScaleEvent(
            0,
            GestureScaleAction.ScaleUpdate,
            focalPointX,
            focalPointY,
            this.getScaleFactor(),
            velocity,
        ));
    }
}
