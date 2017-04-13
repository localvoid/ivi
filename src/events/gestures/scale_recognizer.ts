import { trace } from "../../dev_mode/trace";
import { Vec2 } from "../../common/geometry";
import { EventHandler } from "../event_handler";
import { VelocityTracker } from "./velocity";
import { GesturePointerEvent } from "./pointer_event";
import { GestureScaleEvent, GestureScaleAction } from "./gesture_event";
import { GestureRecognizer, GestureArena, captureArena, leaveArena } from "./arena";

const MIN_FLING_VELOCITY = 50;
const MAX_FLING_VELOCITY = 8000;
const SCALE_SLOP = 8;

const enum ScaleGestureState {
    Pointer1Tracked = 1,
    Pointer2Tracked = 1 << 1,
    Pointer1Captured = 1 << 2,
    Pointer2Captured = 1 << 3,
}

export class ScaleGestureRecognizer implements GestureRecognizer {
    private readonly handler: EventHandler;
    private arena1: GestureArena | null = null;
    private arena2: GestureArena | null = null;
    private state: ScaleGestureState = 0;
    private focalPointX = 0;
    private focalPointY = 0;
    private initialSpan = 0;
    private currentSpan = 0;
    private velocityTracker1: VelocityTracker | null = null;
    private velocityTracker2: VelocityTracker | null = null;

    constructor(handler: EventHandler) {
        this.handler = handler;
    }

    addPointer(arena: GestureArena, ev: GesturePointerEvent): boolean {
        trace("ScaleGestureRecognizer.addPointer()");
        if ((this.state & (ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer2Tracked)) !==
            (ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer2Tracked)) {
            if (this.arena1 === null) {
                this.state |= ScaleGestureState.Pointer1Tracked;
                this.arena1 = arena;
                this.velocityTracker1 = new VelocityTracker();
            }

            if (this.arena2 === null) {
                this.state |= ScaleGestureState.Pointer2Tracked;
                this.arena2 = arena;
                this.velocityTracker2 = new VelocityTracker();
            }

            if ((this.state & (ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer2Tracked)) ===
                (ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer2Tracked)) {
                const p1 = this.arena1!.pointer;
                const p2 = this.arena2!.pointer;

                const focalPointX = (p1.x + p2.x) / 2;
                const focalPointY = (p1.y + p2.y) / 2;
                this.focalPointX = focalPointX;
                this.focalPointY = focalPointY;

                let totalDeviation = 0;
                let x;
                let y;

                x = focalPointX - p1.x;
                y = focalPointY - p1.y;
                totalDeviation += Math.sqrt(x * x + y * y);

                x = focalPointX - p2.x;
                y = focalPointY - p2.y;
                totalDeviation += Math.sqrt(x * x + y * y);

                this.initialSpan = totalDeviation / 2;
            }
            return true;
        }

        return false;
    }

    pointerMoved(arena: GestureArena, event: GesturePointerEvent): void {
        if ((this.state & (ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer2Tracked)) ===
            (ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer2Tracked)) {
            const p1 = this.arena1!.pointer;
            const p2 = this.arena2!.pointer;

            const focalPointX = (p1.x + p2.x) / 2;
            const focalPointY = (p1.y + p2.y) / 2;
            this.focalPointX = focalPointX;
            this.focalPointY = focalPointY;

            let totalDeviation = 0;
            let x;
            let y;

            x = focalPointX - p1.x;
            y = focalPointY - p1.y;
            totalDeviation += Math.sqrt(x * x + y * y);

            x = focalPointX - p2.x;
            y = focalPointY - p2.y;
            totalDeviation += Math.sqrt(x * x + y * y);

            const currentSpan = totalDeviation / 2;
            if ((this.state & (ScaleGestureState.Pointer1Captured | ScaleGestureState.Pointer2Captured)) ===
                (ScaleGestureState.Pointer1Captured | ScaleGestureState.Pointer2Captured)) {
                this.currentSpan = currentSpan;

                const timestamp = event.timestamp;
                const position = new Vec2(event.x, event.y);

                if (this.arena1 === arena) {
                    this.velocityTracker1!.addPosition(timestamp, position);
                }
                if (this.arena2 === arena) {
                    this.velocityTracker2!.addPosition(timestamp, position);
                }

                this.handler(new GestureScaleEvent(
                    0,
                    GestureScaleAction.ScaleUpdate,
                    focalPointX,
                    focalPointY,
                    this.getScaleFactor(),
                    null,
                ));
            } else {
                if (Math.abs(currentSpan - this.initialSpan) > SCALE_SLOP) {
                    if ((this.state & ScaleGestureState.Pointer1Captured) === 0) {
                        captureArena(this.arena1!, this);
                    }
                    if ((this.state & ScaleGestureState.Pointer2Captured) === 0) {
                        captureArena(this.arena2!, this);
                    }
                }
            }
        }
    }

    pointerCaptured(arena: GestureArena): void {
        trace("ScaleGestureRecognizer.pointerCaptured()");
        if (this.arena1 === arena) {
            this.state |= ScaleGestureState.Pointer1Captured;
        } else if (this.arena2 === arena) {
            this.state |= ScaleGestureState.Pointer2Captured;
        }

        if ((this.state & (ScaleGestureState.Pointer1Captured | ScaleGestureState.Pointer2Captured)) ===
            (ScaleGestureState.Pointer1Captured | ScaleGestureState.Pointer2Captured)) {
            this.handler(new GestureScaleEvent(
                0,
                GestureScaleAction.ScaleStart,
                this.focalPointX,
                this.focalPointY,
                1,
                null,
            ));
        }
    }

    pointerReleased(arena: GestureArena, event: GesturePointerEvent): void {
        trace("ScaleGestureRecognizer.pointerReleased()");
        if ((this.state & (ScaleGestureState.Pointer1Captured | ScaleGestureState.Pointer2Captured)) ===
            (ScaleGestureState.Pointer1Captured | ScaleGestureState.Pointer2Captured)) {
            const tracker = this.arena1 === arena ? this.velocityTracker1! : this.velocityTracker2!;
            let velocity = tracker.getVelocity();
            if (velocity !== null && isFlingGesture(velocity) === true) {
                if (velocity.distanceSquared() > MAX_FLING_VELOCITY * MAX_FLING_VELOCITY) {
                    velocity = velocity.div(velocity.distance()).mul(MAX_FLING_VELOCITY);
                    this.emitEnd(this.focalPointX, this.focalPointY, velocity);
                }
            } else {
                this.emitEnd(this.focalPointX, this.focalPointY, Vec2.Zero);
            }

        }

        if (this.arena1 === arena) {
            this.arena1 = null;
            this.state &= ~(ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer1Captured);
        } else { // (this.arena2 === arena)
            this.arena2 = null;
            this.state &= ~(ScaleGestureState.Pointer2Tracked | ScaleGestureState.Pointer2Captured);
        }

        if (this.state & (ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer2Tracked)) {
            // pending other pointer
        } else {
            this.reset();
        }
    }

    pointerCanceled(arena: GestureArena): void {
        trace("ScaleGestureRecognizer.pointerCanceled()");
        if (this.arena1 === arena) {
            this.arena1 = null;
            this.state &= ~(ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer1Captured);
        } else { // (this.arena2 === arena)
            this.arena2 = null;
            this.state &= ~(ScaleGestureState.Pointer2Tracked | ScaleGestureState.Pointer2Captured);
        }

        if (this.state & (ScaleGestureState.Pointer1Tracked | ScaleGestureState.Pointer2Tracked)) {
            // pending other pointer
        } else {
            this.reset();
        }
    }

    dispose() {
        trace("ScaleGestureRecognizer.dispose()");
        if (this.arena1 !== null) {
            leaveArena(this.arena1, this);
        }
        if (this.arena2 !== null) {
            leaveArena(this.arena2, this);
        }
    }

    private getScaleFactor(): number {
        return this.initialSpan > 0 ? this.currentSpan / this.initialSpan : 1;
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

    private reset() {
        this.arena1 = null;
        this.arena2 = null;
        this.state = 0;
    }
}

function isFlingGesture(velocity: Vec2): boolean {
    return velocity.distanceSquared() > MIN_FLING_VELOCITY * MIN_FLING_VELOCITY;
}
