import { trace } from "../../dev_mode/trace";
import { EventHandler } from "../event_handler";
import { GesturePointerEvent } from "./pointer_event";
import { GestureLongPressEvent } from "./gesture_event";
import { GestureRecognizer, GestureArena, captureArena, leaveArena } from "./arena";

const LONG_PRESS_TIMEOUT = 500;

const enum LongPressGestureState {
    PointerCaptured = 1,
    PointerReleased = 1 << 1,
    DeadlineExceeded = 1 << 2,
}

export class LongPressGestureRecognizer implements GestureRecognizer {
    private readonly handler: EventHandler;
    private arena: GestureArena | null = null;
    private timeoutId = -1;
    private state: LongPressGestureState = 0;
    private startX = 0;
    private startY = 0;

    constructor(handler: EventHandler) {
        this.handler = handler;
    }

    addPointer(arena: GestureArena, ev: GesturePointerEvent): boolean {
        trace("LongPressGestureRecognizer.addPointer()");
        if (ev.isPrimary === true) {
            // assert(this.arena === null);
            this.arena = arena;
            this.startX = ev.x;
            this.startY = ev.y;
            this.timeoutId = setTimeout(this.deadlineExceeded, LONG_PRESS_TIMEOUT);
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
        trace("LongPressGestureRecognizer.pointerReleased()");
        leaveArena(arena, this);
    }

    pointerCaptured(arena: GestureArena): void {
        trace("LongPressGestureRecognizer.pointerCaptured()");
        this.state |= LongPressGestureState.PointerCaptured;
        if (this.state & LongPressGestureState.DeadlineExceeded) {
            this.handler(new GestureLongPressEvent(0));
            leaveArena(arena, this);
        }
    }

    pointerCanceled(arena: GestureArena): void {
        trace("LongPressGestureRecognizer.pointerCanceled()");
        this.reset();
    }

    dispose() {
        trace("LongPressGestureRecognizer.dispose()");
        if (this.arena !== null) {
            this.cancelTimeout();
            if (!(this.state & LongPressGestureState.PointerCaptured)) {
                leaveArena(this.arena, this);
            }
        }
    }

    private deadlineExceeded = () => {
        trace("LongPressGestureRecognizer.deadlineExceeded()");
        this.state |= LongPressGestureState.DeadlineExceeded;
        captureArena(this.arena!, this);
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
