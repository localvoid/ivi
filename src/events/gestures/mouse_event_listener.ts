import { FEATURES, FeatureFlags } from "../../common/feature_detection";
import { SyntheticEventFlags } from "../flags";
import { EventSource } from "../event_source";
import { GestureNativeEventSource } from "./gesture_event_source";
import { GesturePointerType, GesturePointerAction, GesturePointerEvent } from "./pointer_event";
import { GestureEventFlags } from "./events";

declare global {
    interface InputDeviceCapabilities {
        firesTouchEvents: boolean;
    }

    interface UIEvent {
        sourceCapabilities: InputDeviceCapabilities;
    }
}

function getMouseButtons(ev: MouseEvent): number {
    if ((FEATURES & FeatureFlags.MouseEventButtons) !== 0) {
        return ev.buttons;
    }

    const button = ev.button;
    const r = 1 << button;
    if ((r & (2 | 4)) !== 0) {
        return button << (((r >> 2) ^ 1) << 1);
    }
    return r;
}

function createGesturePointerEventFromMouseEvent(
    ev: MouseEvent,
    source: EventSource,
    target: EventTarget,
    action: GesturePointerAction,
    buttons: number,
) {
    return new GesturePointerEvent(
        source,
        SyntheticEventFlags.Bubbles,
        target,
        ev.timeStamp,
        // the mouse always has a pointerId of 1
        1,
        action,
        ev.clientX,
        ev.clientY,
        ev.pageX,
        ev.pageY,
        buttons,
        1,
        1,
        // pointers without specified pressure use 0.5 for down state and 0 for up state.
        buttons === 0 ? 0 : 0.5,
        0,
        0,
        GesturePointerType.Mouse,
        true,
    );
}

export function createMouseEventListener(
    source: EventSource,
    pointers: GesturePointerEvent[],
    dispatch: any,
    primaryPointers: GesturePointerEvent[] | null = null,
): GestureNativeEventSource {
    let activePointer: GesturePointerEvent | null = null;

    function activate() {
        document.addEventListener("mousedown", onDown);
    }

    function deactivate() {
        document.removeEventListener("mousedown", onDown);
    }

    function capture(ev: GesturePointerEvent, flags: GestureEventFlags) {
        activePointer = ev;
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    }

    function release(ev: GesturePointerEvent) {
        activePointer = null;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
    }

    function isEventSimulatedFromTouch(ev: MouseEvent): boolean {
        if ((FEATURES & FeatureFlags.TouchEvents) !== 0) {
            if ((FEATURES & FeatureFlags.InputDeviceCapabilities) !== 0) {
                return ev.sourceCapabilities.firesTouchEvents;
            }

            if (primaryPointers !== null) {
                const x = ev.clientX;
                const y = ev.clientY;
                for (let i = 0; i < primaryPointers.length; i++) {
                    const pointer = primaryPointers[i];
                    const dx = Math.abs(x - pointer.x);
                    const dy = Math.abs(y - pointer.y);
                    if (dx <= 25 && dy <= 25) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    function onDown(ev: MouseEvent) {
        if (isEventSimulatedFromTouch(ev) === false) {
            const buttons = getMouseButtons(ev);
            let pointer;
            if (activePointer === null) {
                pointer = createGesturePointerEventFromMouseEvent(
                    ev,
                    source,
                    ev.target,
                    GesturePointerAction.Down,
                    buttons,
                );
            } else {
                pointer = createGesturePointerEventFromMouseEvent(
                    ev,
                    source,
                    activePointer.target,
                    GesturePointerAction.Move,
                    buttons | activePointer.buttons,
                );
            }
            dispatch(pointer);
        }
    }

    function onMove(ev: MouseEvent) {
        if (isEventSimulatedFromTouch(ev) === false) {
            if (activePointer !== null) {
                let pointer;
                if (ev.which === 0) {
                    pointer = createGesturePointerEventFromMouseEvent(
                        ev,
                        source,
                        activePointer.target,
                        GesturePointerAction.Up,
                        activePointer.buttons,
                    );
                } else {
                    pointer = createGesturePointerEventFromMouseEvent(
                        ev,
                        source,
                        activePointer.target,
                        GesturePointerAction.Move,
                        activePointer.buttons,
                    );
                }
                dispatch(pointer);
            }
        }
    }

    function onUp(ev: MouseEvent) {
        if (isEventSimulatedFromTouch(ev) === false) {
            if (activePointer !== null) {
                let buttons = getMouseButtons(ev);
                if ((FEATURES & FeatureFlags.MouseEventButtons) === 0) {
                    buttons = activePointer.buttons & ~buttons;
                }
                let pointer;
                if (buttons === 0) {
                    pointer = createGesturePointerEventFromMouseEvent(
                        ev,
                        source,
                        activePointer.target,
                        GesturePointerAction.Up,
                        buttons,
                    );
                } else {
                    pointer = createGesturePointerEventFromMouseEvent(
                        ev,
                        source,
                        activePointer.target,
                        GesturePointerAction.Move,
                        buttons,
                    );
                }
                dispatch(pointer);
            }
        }
    }

    return {
        activate,
        deactivate,
        capture,
        release,
    };
}
