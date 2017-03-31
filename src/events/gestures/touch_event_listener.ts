import { FEATURES, FeatureFlags } from "../../common/feature_detection";
import { SyntheticEventFlags } from "../flags";
import { EventSource } from "../event_source";
import { GestureNativeEventSource } from "./gesture_event_source";
import { GesturePointerType, GesturePointerAction, GesturePointerEvent } from "./pointer_event";
import { createMouseEventListener } from "./mouse_event_listener";

declare global {
    interface Touch {
        radiusX: number;
        radiusY: number;
        force: number;
        webkitRadiusX: number;
        webkitRadiusY: number;
        webkitForce: number;
    }
}

function typeToButtons(type: string) {
    if (type === "touchstart" || type === "touchmove") {
        return 1;
    }
    return 0;
}

let touchWidth: (touch: Touch) => number;
let touchHeight: (touch: Touch) => number;
let touchPressure: (touch: Touch) => number;

if ((FEATURES & FeatureFlags.TouchEvents) && "radiusX" in Touch.prototype) {
    touchWidth = function (touch: Touch) {
        return touch.radiusX;
    };
    touchHeight = function (touch: Touch) {
        return touch.radiusY;
    };
    touchPressure = function (touch: Touch) {
        return touch.force;
    };
} else if ((FEATURES & FeatureFlags.TouchEvents) && "webkitRadiusX" in Touch.prototype) {
    touchWidth = function (touch: Touch) {
        return touch.webkitRadiusX;
    };
    touchHeight = function (touch: Touch) {
        return touch.webkitRadiusY;
    };
    touchPressure = function (touch: Touch) {
        return touch.webkitForce;
    };
} else {
    touchWidth = touchHeight = function (touch: Touch) {
        return 0;
    };
    touchPressure = function (touch: Touch) {
        return 0.5;
    };
}

function touchToGesturePointerEvent(
    ev: TouchEvent,
    source: EventSource,
    action: GesturePointerAction,
    touch: Touch,
    isPrimary: boolean,
) {
    return new GesturePointerEvent(
        source,
        SyntheticEventFlags.Bubbles,
        ev.target,
        ev.timeStamp,
        // pointerId 1 is reserved for mouse, touch identifiers can start from 0.
        touch.identifier + 2,
        action,
        touch.clientX,
        touch.clientY,
        touch.pageX,
        touch.pageY,
        typeToButtons(ev.type),
        touchWidth(touch),
        touchHeight(touch),
        touchPressure(touch),
        0,
        0,
        GesturePointerType.Touch,
        isPrimary,
    );
}

function cancelGesturePointerEvent(
    ev: GesturePointerEvent,
) {
    return new GesturePointerEvent(
        ev.source,
        ev.flags,
        ev.target,
        ev.timestamp,
        ev.id,
        GesturePointerAction.Cancel,
        ev.x,
        ev.y,
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

export function createTouchEventListener(
    source: EventSource,
    pointers: Map<number, GesturePointerEvent>,
    dispatch: any,
): GestureNativeEventSource {
    const primaryPointers: GesturePointerEvent[] | null = (FEATURES & FeatureFlags.InputDeviceCapabilities) === 0 ?
        [] :
        null;
    const mouseListener = createMouseEventListener(source, pointers, dispatch, primaryPointers);

    let firstTouch: number | null = null;
    let captured = 0;

    function isPrimary(touch: Touch): boolean {
        return firstTouch === touch.identifier;
    }

    function setPrimary(touch: Touch): boolean {
        if (pointers.size === 0 || (pointers.size === 1 && pointers.has(1))) {
            firstTouch = touch.identifier;
            return true;
        }
        return false;
    }

    function removePrimaryPointer(pointer: GesturePointerEvent): void {
        if (pointer.isPrimary === true) {
            firstTouch = null;
        }
    }

    function findTouch(touches: TouchList, id: number): boolean {
        for (let i = 0; i < touches.length; i++) {
            if (touches[i].identifier === id) {
                return true;
            }
        }
        return false;
    }

    function vacuum(ev: TouchEvent) {
        const touches = ev.touches;
        if (pointers.size >= touches.length) {
            const toCancel: GesturePointerEvent[] = [];
            pointers.forEach(function (value, key) {
                if (key !== 1) {
                    if (findTouch(touches, key - 2) === false) {
                        toCancel.push(value);
                    }
                }
            });
            for (let i = 0; i < toCancel.length; i++) {
                const p = toCancel[i];
                removePrimaryPointer(p);
                dispatch(cancelGesturePointerEvent(p));
            }
        }
    }

    function activate() {
        mouseListener.activate();
        document.addEventListener("touchstart", onStart);
    }

    function deactivate() {
        document.removeEventListener("touchstart", onStart);
        mouseListener.activate();
    }

    function capture(ev: GesturePointerEvent) {
        if (ev.id === 1) {
            mouseListener.capture(ev);
        } else {
            if (captured++ === 0) {
                document.addEventListener("touchmove", onMove);
                document.addEventListener("touchend", onEnd);
                document.addEventListener("touchcancel", onCancel);
            }
        }
    }

    function release(ev: GesturePointerEvent) {
        if (ev.id === 1) {
            mouseListener.release(ev);
        } else {
            if (--captured === 0) {
                document.removeEventListener("touchmove", onMove);
                document.removeEventListener("touchend", onEnd);
                document.removeEventListener("touchcancel", onCancel);
            }
        }
    }

    function dedupSynthMouse(p: GesturePointerEvent) {
        if ((FEATURES & FeatureFlags.InputDeviceCapabilities) === 0 && p.isPrimary === true) {
            primaryPointers!.push(p);
            setTimeout(function () {
                const idx = primaryPointers!.indexOf(p);
                if (idx !== -1) {
                    primaryPointers!.splice(idx, 1);
                }
            }, 2500);
        }
    }

    function onStart(ev: TouchEvent) {
        vacuum(ev);
        const touches = ev.changedTouches;
        setPrimary(touches[0]);
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            const p = touchToGesturePointerEvent(
                ev,
                source,
                GesturePointerAction.Down,
                touch,
                isPrimary(touch),
            );
            dedupSynthMouse(p);
            dispatch(p);
        }
    }

    function onMove(ev: TouchEvent) {
        const touches = ev.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            if (pointers.has(touch.identifier)) {
                dispatch(touchToGesturePointerEvent(
                    ev,
                    source,
                    GesturePointerAction.Move,
                    touch,
                    isPrimary(touch),
                ));
            }
        }
    }

    function onEnd(ev: TouchEvent) {
        const touches = ev.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            if (pointers.has(touch.identifier)) {
                const p = touchToGesturePointerEvent(
                    ev,
                    source,
                    GesturePointerAction.Up,
                    touch,
                    isPrimary(touch),
                );
                dedupSynthMouse(p);
                dispatch();
            }
        }
    }

    function onCancel(ev: TouchEvent) {
        const touches = ev.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            if (pointers.has(touch.identifier)) {
                dispatch(touchToGesturePointerEvent(
                    ev,
                    source,
                    GesturePointerAction.Cancel,
                    touch,
                    isPrimary(touch),
                ));
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
