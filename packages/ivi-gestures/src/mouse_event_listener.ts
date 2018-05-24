import { TOUCH_EVENTS, INPUT_DEVICE_CAPABILITIES, MOUSE_EVENT_BUTTONS, getMouseButtons } from "ivi-core";
import {
  SyntheticEventFlags, EVENT_SOURCE_MOUSE_DOWN, EVENT_SOURCE_MOUSE_UP, EVENT_SOURCE_MOUSE_MOVE, SyntheticNativeEvent,
  addBeforeListener, removeBeforeListener,
} from "ivi-events";
import { GestureNativeEventSource } from "./gesture_event_source";
import { GesturePointerAction, GesturePointerEvent } from "./pointer_event";

declare global {
  interface InputDeviceCapabilities {
    firesTouchEvents: boolean;
  }

  interface UIEvent {
    sourceCapabilities: InputDeviceCapabilities;
  }
}

function createGesturePointerEventFromMouseEvent(
  ev: MouseEvent,
  action: GesturePointerAction,
  buttons: number,
) {
  return new GesturePointerEvent(
    SyntheticEventFlags.Bubbles,
    ev.timeStamp,
    // the mouse always has a pointerId of 1
    1,
    action,
    ev.clientX,
    ev.clientY,
    ev.pageX,
    ev.pageY,
    buttons,
    true,
    // mouse events always perform hit target tests when they are moving
    ev.target as Element,
  );
}

export function createMouseEventListener(
  dispatch: (ev: GesturePointerEvent, target?: Element) => void,
  primaryPointers: GesturePointerEvent[] | null = null,
): GestureNativeEventSource {
  let activePointer: GesturePointerEvent | null = null;

  function activate() {
    addBeforeListener(EVENT_SOURCE_MOUSE_DOWN, onDown);
    addBeforeListener(EVENT_SOURCE_MOUSE_UP, onUp);
  }

  function deactivate() {
    removeBeforeListener(EVENT_SOURCE_MOUSE_DOWN, onDown);
    removeBeforeListener(EVENT_SOURCE_MOUSE_UP, onUp);
  }

  function startMoveTracking(ev: GesturePointerEvent, target: Element) {
    activePointer = ev;
    addBeforeListener(EVENT_SOURCE_MOUSE_MOVE, onMove);
  }

  function stopMoveTracking(ev: GesturePointerEvent) {
    activePointer = null;
    removeBeforeListener(EVENT_SOURCE_MOUSE_MOVE, onMove);
  }

  function isEventSimulatedFromTouch(ev: MouseEvent): boolean {
    if (TOUCH_EVENTS) {
      if (INPUT_DEVICE_CAPABILITIES) {
        return ev.sourceCapabilities.firesTouchEvents;
      }

      if (primaryPointers !== null) {
        const x = ev.clientX;
        const y = ev.clientY;
        for (let i = 0; i < primaryPointers.length; ++i) {
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

  function onDown(s: SyntheticNativeEvent<MouseEvent>): void {
    const ev = s.native;
    if (isEventSimulatedFromTouch(ev) === false) {
      const buttons = getMouseButtons(ev);
      let pointer;
      if (activePointer === null) {
        pointer = createGesturePointerEventFromMouseEvent(
          ev,
          GesturePointerAction.Down,
          buttons,
        );
      } else {
        pointer = createGesturePointerEventFromMouseEvent(
          ev,
          GesturePointerAction.Move,
          buttons | activePointer.buttons,
        );
      }
      dispatch(pointer, ev.target as Element);
    }
  }

  function onMove(s: SyntheticNativeEvent<MouseEvent>): void {
    const ev = s.native;
    if (isEventSimulatedFromTouch(ev) === false) {
      if (activePointer !== null) {
        dispatch(createGesturePointerEventFromMouseEvent(
          ev,
          (ev.which === 0) ? GesturePointerAction.Up : GesturePointerAction.Move,
          activePointer.buttons,
        ));
      }
    }
  }

  function onUp(s: SyntheticNativeEvent<MouseEvent>): void {
    const ev = s.native;
    if (isEventSimulatedFromTouch(ev) === false) {
      if (activePointer !== null) {
        let buttons = getMouseButtons(ev);
        if (!MOUSE_EVENT_BUTTONS) {
          buttons = activePointer.buttons & ~buttons;
        }
        dispatch(createGesturePointerEventFromMouseEvent(
          ev,
          (buttons === 0) ? GesturePointerAction.Up : GesturePointerAction.Move,
          buttons,
        ));
      }
    }
  }

  return {
    activate,
    deactivate,
    startMoveTracking,
    stopMoveTracking,
  };
}
