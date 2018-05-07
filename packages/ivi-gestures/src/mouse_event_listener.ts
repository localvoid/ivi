import { FEATURES, FeatureFlags, getMouseButtons } from "ivi-core";
import {
  SyntheticEventFlags, SyntheticMouseEvent, EventSourceMouseDown, EventSourceMouseUp, EventSourceMouseMove,
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
    EventSourceMouseDown.addBeforeListener(onDown);
    EventSourceMouseUp.addBeforeListener(onUp);
  }

  function deactivate() {
    EventSourceMouseDown.removeBeforeListener(onDown);
    EventSourceMouseUp.removeBeforeListener(onUp);
  }

  function startMoveTracking(ev: GesturePointerEvent, target: Element) {
    activePointer = ev;
    EventSourceMouseMove.addBeforeListener(onMove);
  }

  function stopMoveTracking(ev: GesturePointerEvent) {
    activePointer = null;
    EventSourceMouseMove.removeBeforeListener(onMove);
  }

  function isEventSimulatedFromTouch(ev: MouseEvent): boolean {
    if ((FEATURES & FeatureFlags.TouchEvents) !== 0) {
      if ((FEATURES & FeatureFlags.InputDeviceCapabilities) !== 0) {
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

  function onDown(s: SyntheticMouseEvent<MouseEvent>): void {
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

  function onMove(s: SyntheticMouseEvent<MouseEvent>): void {
    const ev = s.native;
    if (isEventSimulatedFromTouch(ev) === false) {
      if (activePointer !== null) {
        let pointer;
        if (ev.which === 0) {
          pointer = createGesturePointerEventFromMouseEvent(
            ev,
            GesturePointerAction.Up,
            activePointer.buttons,
          );
        } else {
          pointer = createGesturePointerEventFromMouseEvent(
            ev,
            GesturePointerAction.Move,
            activePointer.buttons,
          );
        }
        dispatch(pointer);
      }
    }
  }

  function onUp(s: SyntheticMouseEvent<MouseEvent>): void {
    const ev = s.native;
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
            GesturePointerAction.Up,
            buttons,
          );
        } else {
          pointer = createGesturePointerEventFromMouseEvent(
            ev,
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
    startMoveTracking,
    stopMoveTracking,
  };
}
