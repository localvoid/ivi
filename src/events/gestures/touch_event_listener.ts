import { SyntheticEventFlags } from "../flags";
import { EventSource } from "../event_source";
import { GestureNativeEventSource } from "./gesture_event_source";
import { GesturePointerAction, GesturePointerEvent } from "./pointer_event";

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

if ("radiusX" in Touch.prototype) {
    touchWidth = function (touch: Touch) {
        return touch.radiusX;
    };
    touchHeight = function (touch: Touch) {
        return touch.radiusY;
    };
    touchPressure = function (touch: Touch) {
        return touch.force;
    };
} else if ("webkitRadiusX" in Touch.prototype) {
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
        "touch",
        isPrimary,
    );
}

export function createTouchEventListener(
    source: EventSource,
    pointers: Map<number, GesturePointerEvent>,
    dispatch: any,
): GestureNativeEventSource {
    let firstTouch: number | null = null;

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
            }
        }
    }

    function addEventListeners(target: Element) {
        target.addEventListener("touchmove", onMove);
        target.addEventListener("touchend", onEnd);
        target.addEventListener("touchcancel", onCancel);
    }

    function removeEventListeners(target: Element) {
        target.removeEventListener("touchmove", onMove);
        target.removeEventListener("touchend", onEnd);
        target.removeEventListener("touchcancel", onCancel);
    }

    function onStart(ev: TouchEvent) {
        vacuum(ev);
        const touches = ev.changedTouches;
        const primary = setPrimary(touches[0]);
        for (let i = 0; i < touches.length; i++) {
            const pointer = touchToGesturePointerEvent(
                ev,
                source,
                GesturePointerAction.Down,
                touches[i],
                primary,
            );
            dispatch(pointer);
        }
        addEventListeners(ev.target as Element);
    }

    function onMove(ev: TouchEvent) {
        const touches = ev.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            const pointer = touchToGesturePointerEvent(
                ev,
                source,
                GesturePointerAction.Move,
                touch,
                isPrimary(touch),
            );

            if (pointers.get(pointer.id)) {
                dispatch(pointer);
            }
        }
    }

    function onEnd(ev: TouchEvent) {
        removeEventListeners(ev.target as Element);
    }

    function onCancel(ev: TouchEvent) {
        removeEventListeners(ev.target as Element);
    }

    return {
        activate: function () {
            document.addEventListener("touchstart", onStart);
        },
        deactivate: function () {
            document.removeEventListener("touchstart", onStart);
        },
    };
}
