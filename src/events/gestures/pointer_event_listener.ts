import { SyntheticEventFlags } from "../flags";
import { EventSource } from "../event_source";
import { GestureNativeEventSource } from "./gesture_event_source";
import { GesturePointerAction, GesturePointerEvent } from "./pointer_event";

function pointerEventToGesturePointerEvent(
    ev: PointerEvent,
    source: EventSource,
    action: GesturePointerAction,
) {
    return new GesturePointerEvent(
        source,
        SyntheticEventFlags.BubblePhase,
        ev.target,
        ev.hwTimestamp,
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
        ev.type,
        ev.isPrimary,
    );
}

export function createPointerEventListener(
    source: EventSource,
    pointers: Map<number, GesturePointerEvent>,
    dispatch: any,
): GestureNativeEventSource {
    function addEventListeners(target: Element) {
        target.addEventListener("pointermove", onMove);
        target.addEventListener("pointerup", onUp);
        target.addEventListener("pointercancel", onCancel);
    }

    function cancelEventListeners(target: Element) {
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onUp);
        target.removeEventListener("pointercancel", onCancel);
    }

    function onMove(ev: PointerEvent) {
        const pointer = pointerEventToGesturePointerEvent(
            ev,
            source,
            GesturePointerAction.Move,
        );
        dispatch(pointer);
    }

    function onUp(ev: PointerEvent) {
        const target = ev.target as Element;
        const pointer = pointerEventToGesturePointerEvent(
            ev,
            source,
            GesturePointerAction.Up,
        );
        cancelEventListeners(target);
        dispatch(pointer);
    }

    function onCancel(ev: PointerEvent) {
        const target = ev.target as Element;
        const pointer = pointerEventToGesturePointerEvent(
            ev,
            source,
            GesturePointerAction.Cancel,
        );
        cancelEventListeners(target);
        dispatch(pointer);
    }

    function onDown(ev: PointerEvent) {
        const target = ev.target as Element;
        const pointer = pointerEventToGesturePointerEvent(
            ev,
            source,
            GesturePointerAction.Down,
        );
        if (ev.type !== "touch") {
            target.setPointerCapture(pointer.id);
        }
        addEventListeners(target);
        dispatch(pointer);
    }

    return {
        activate: function () {
            document.addEventListener("pointerdown", onDown);
        },
        deactivate: function () {
            document.removeEventListener("pointerdown", onDown);
        },
    };
}
