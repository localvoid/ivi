import { SyntheticEventFlags } from "../flags";
import { EventSource } from "../event_source";
import { GestureNativeEventSource } from "./gesture_event_source";
import { GesturePointerType, GesturePointerAction, GesturePointerEvent } from "./pointer_event";
import { pointerListGet } from "./pointer_list";
import { GestureEventFlags } from "./events";

function convertPointerType(type: string) {
    if (type === "mouse") {
        return GesturePointerType.Mouse;
    }
    if (type === "touch") {
        return GesturePointerType.Touch;
    }
    if (type === "pen") {
        return GesturePointerType.Pen;
    }
    return GesturePointerType.Unknown;
}

function pointerEventToGesturePointerEvent(
    ev: PointerEvent,
    source: EventSource,
    action: GesturePointerAction,
) {
    return new GesturePointerEvent(
        source,
        SyntheticEventFlags.BubblePhase,
        ev.target,
        ev.timeStamp,
        ev.pointerId,
        action,
        ev.clientX,
        ev.clientY,
        ev.pageX,
        ev.pageY,
        ev.buttons,
        ev.width,
        ev.height,
        ev.pressure,
        ev.tiltX,
        ev.tiltY,
        convertPointerType(ev.type),
        ev.isPrimary,
    );
}

export function createPointerEventListener(
    source: EventSource,
    pointers: GesturePointerEvent[],
    dispatch: any,
): GestureNativeEventSource {
    let captured = 0;

    function activate() {
        document.addEventListener("pointerdown", onDown);
    }

    function deactivate() {
        document.removeEventListener("pointerdown", onDown);
    }

    function capture(ev: GesturePointerEvent, flags: GestureEventFlags) {
        ev.target.setPointerCapture(ev.id);
        if (captured++ === 0) {
            document.addEventListener("pointermove", onMove);
            document.addEventListener("pointerup", onUp);
            document.addEventListener("pointercancel", onCancel);
            document.addEventListener("lostpointercapture", onLostCapture);
        }
    }

    function release(ev: GesturePointerEvent) {
        if (--captured === 0) {
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", onUp);
            document.removeEventListener("pointercancel", onCancel);
            document.removeEventListener("lostpointercapture", onLostCapture);
        }
    }

    function onDown(ev: PointerEvent) {
        dispatch(pointerEventToGesturePointerEvent(
            ev,
            source,
            GesturePointerAction.Down,
        ));
    }

    function onMove(ev: PointerEvent) {
        if (pointerListGet(pointers, ev.pointerId) !== undefined) {
            dispatch(pointerEventToGesturePointerEvent(
                ev,
                source,
                GesturePointerAction.Move,
            ));
        }
    }

    function onUp(ev: PointerEvent) {
        if (pointerListGet(pointers, ev.pointerId) !== undefined) {
            dispatch(pointerEventToGesturePointerEvent(
                ev,
                source,
                GesturePointerAction.Up,
            ));
        }
    }

    function onCancel(ev: PointerEvent) {
        if (pointerListGet(pointers, ev.pointerId) !== undefined) {
            dispatch(pointerEventToGesturePointerEvent(
                ev,
                source,
                GesturePointerAction.Cancel,
            ));
        }
    }

    function onLostCapture(ev: PointerEvent) {
        if (pointerListGet(pointers, ev.pointerId) !== undefined) {
            dispatch(pointerEventToGesturePointerEvent(
                ev,
                source,
                GesturePointerAction.Cancel,
            ));
        }
    }

    return {
        activate,
        deactivate,
        capture,
        release,
    };
}
