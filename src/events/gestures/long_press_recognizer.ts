import { EventHandler } from "../event_handler";
import { GesturePointerEvent, GesturePointerAction } from "./pointer_event";
import { GestureLongPressEvent } from "./gesture_event";
import { GestureDisposition } from "./arena";
import { PrimaryPointerGestureRecognizer } from "./recognizer";

const LONG_PRESS_TIMEOUT = 500;

export class GestureLongPressRecognizer extends PrimaryPointerGestureRecognizer {
    protected didExceedTimeline: () => void;

    constructor(handler: EventHandler) {
        super(handler, LONG_PRESS_TIMEOUT);
        this.didExceedTimeline = () => {
            this.resolve(GestureDisposition.Accepted);
            this.emitLongPress();
        };
    }

    handlePrimaryPointer(pointer: GesturePointerEvent) {
        if (pointer.action === GesturePointerAction.Up) {
            this.resolve(GestureDisposition.Rejected);
        }
    }

    private emitLongPress() {
        this.handler(new GestureLongPressEvent(0));
    }
}
