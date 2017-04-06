import { trace } from "../../dev_mode/trace";
import { EventHandler } from "../event_handler";
import { GesturePointerEvent, GesturePointerAction } from "./pointer_event";
import { GestureTapEvent, GestureTapAction } from "./gesture_event";
import { GestureDisposition } from "./arena";
import { PrimaryPointerGestureRecognizer } from "./recognizer";

const TAP_TIMEOUT = 100;

export class GestureTapRecognizer extends PrimaryPointerGestureRecognizer {
    private sentTapDown = false;
    private wonArenaForPrimaryEvent = false;
    private finalPointer: GesturePointerEvent | null = null;
    protected didExceedTimeline: () => void;

    constructor(handler: EventHandler) {
        super(handler, TAP_TIMEOUT);
        this.didExceedTimeline = () => {
            trace("GestureTapRecognizer.didExceedDeadline()");
            this.checkDown();
        };
    }

    handlePrimaryPointer(pointer: GesturePointerEvent) {
        if (pointer.action === GesturePointerAction.Up) {
            this.finalPointer = pointer;
            this.checkUp();
        }
    }

    resolve(disposition: GestureDisposition) {
        if (this.wonArenaForPrimaryEvent === true && disposition === GestureDisposition.Rejected) {
            this.emitTapCancel();
            this.reset();
        }
        super.resolve(disposition);
    }

    acceptGesture(pointerId: number) {
        trace("GestureTapRecognizer.acceptGesture()");
        if (this.primaryPointer !== null && this.primaryPointer.id === pointerId) {
            this.checkDown();
            this.wonArenaForPrimaryEvent = true;
            this.checkUp();
        }
    }

    rejectGesture(pointerId: number) {
        trace("GestureTapRecognizer.rejectGesture()");
        if (this.primaryPointer !== null && this.primaryPointer.id === pointerId) {
            this.emitTapCancel();
            this.reset();
        }
    }

    private checkDown() {
        if (this.sentTapDown === false) {
            this.emitTapDown();
            this.sentTapDown = true;
        }
    }

    private checkUp() {
        if (this.wonArenaForPrimaryEvent === true && this.finalPointer !== null) {
            this.resolve(GestureDisposition.Accepted);
            this.emitTapUp();
            this.emitTap();
            this.reset();
        }
    }

    private reset() {
        this.sentTapDown = false;
        this.wonArenaForPrimaryEvent = false;
        this.finalPointer = null;
    }

    private emitTapDown() {
        this.handler(new GestureTapEvent(0, GestureTapAction.TapDown));
    }

    private emitTap() {
        this.handler(new GestureTapEvent(0, GestureTapAction.Tap));
    }

    private emitTapUp() {
        this.handler(new GestureTapEvent(0, GestureTapAction.TapUp));
    }

    private emitTapCancel() {
        this.handler(new GestureTapEvent(0, GestureTapAction.TapCancel));
    }
}
