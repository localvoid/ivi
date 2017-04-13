import { trace } from "../../dev_mode/trace";
import { EventHandler } from "../event_handler";
import { GesturePointerEvent } from "./pointer_event";
import { GestureTapEvent, GestureTapAction } from "./gesture_event";
import { GestureRecognizer, GestureArena, captureArena, leaveArena } from "./arena";

const TAP_TIMEOUT = 100;

const enum TapGestureState {
    PointerCaptured = 1,
    PointerReleased = 1 << 1,
    DeadlineExceeded = 1 << 2,
}

export class TapGestureRecognizer implements GestureRecognizer {
    private readonly handler: EventHandler;
    private arena: GestureArena | null = null;
    private timeoutId = -1;
    private state: TapGestureState = 0;
    private startX = 0;
    private startY = 0;

    constructor(handler: EventHandler) {
        this.handler = handler;
    }

    addPointer(arena: GestureArena, ev: GesturePointerEvent): boolean {
        trace("TapGestureRecognizer.addPointer()");
        if (ev.isPrimary === true) {
            // assert(this.arena === null);
            this.arena = arena;
            this.startX = ev.x;
            this.startY = ev.y;
            this.timeoutId = setTimeout(this.deadlineExceeded, TAP_TIMEOUT);
            return true;
        }

        return false;
    }

    pointerMoved(arena: GestureArena, event: GesturePointerEvent): void {
        const dx = event.x - this.startX;
        const dy = event.y - this.startY;
        if (Math.sqrt(dx * dx + dy * dy) > 8) {
            leaveArena(this.arena!, this);
        }
    }

    pointerReleased(arena: GestureArena, event: GesturePointerEvent): void {
        trace("TapGestureRecognizer.pointerReleased()");
        this.state |= TapGestureState.PointerReleased;
        if (this.state & TapGestureState.PointerCaptured) {
            this.handler(new GestureTapEvent(0, GestureTapAction.TapUp));
            this.handler(new GestureTapEvent(0, GestureTapAction.Tap));
            this.reset();
        } else {
            captureArena(arena, this);
        }
    }

    pointerCaptured(arena: GestureArena): void {
        trace("TapGestureRecognizer.pointerCaptured()");
        this.state |= TapGestureState.PointerCaptured;
        if (!(this.state & TapGestureState.DeadlineExceeded)) {
            this.handler(new GestureTapEvent(0, GestureTapAction.TapDown));
            this.cancelTimeout();
        }
        if (this.state & TapGestureState.PointerReleased) {
            this.handler(new GestureTapEvent(0, GestureTapAction.TapUp));
            this.handler(new GestureTapEvent(0, GestureTapAction.Tap));
            this.reset();
        }
    }

    pointerCanceled(arena: GestureArena): void {
        trace("TapGestureRecognizer.pointerCanceled()");
        if (this.state & (TapGestureState.PointerCaptured | TapGestureState.DeadlineExceeded)) {
            this.handler(new GestureTapEvent(0, GestureTapAction.TapCancel));
        }
        this.reset();
    }

    dispose() {
        trace("TapGestureRecognizer.dispose()");
        if (this.arena !== null) {
            if (!(this.state & TapGestureState.PointerCaptured)) {
                leaveArena(this.arena, this);
            }
        }
    }

    private deadlineExceeded = () => {
        trace("TapGestureRecognizer.deadlineExceeded()");
        this.state |= TapGestureState.DeadlineExceeded;
        if (!(this.state & TapGestureState.PointerCaptured)) {
            this.handler(new GestureTapEvent(0, GestureTapAction.TapDown));
        }
    }

    private cancelTimeout() {
        if (this.timeoutId !== -1) {
            clearTimeout(this.timeoutId);
            this.timeoutId = -1;
        }
    }

    private reset() {
        this.arena = null;
        this.state = 0;
        this.cancelTimeout();
    }
}
