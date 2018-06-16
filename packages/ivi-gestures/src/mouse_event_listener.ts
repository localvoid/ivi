import { TOUCH_EVENTS, INPUT_DEVICE_CAPABILITIES, MOUSE_EVENT_BUTTONS, getMouseButtons } from "ivi-core";
import {
  SyntheticNativeEvent,
  EVENT_DISPATCHER_MOUSE_DOWN, EVENT_DISPATCHER_MOUSE_UP, EVENT_DISPATCHER_MOUSE_MOVE,
  beforeNativeEvent, removeBeforeNativeEvent,
} from "ivi";
import { GesturePointerAction, GesturePointerEvent } from "./gesture_pointer_event";
import { NativeEventListener, NativeEventListenerFlags } from "./native_event_listener";
import { debugPubMouseState } from "./debug";

declare global {
  interface InputDeviceCapabilities {
    firesTouchEvents: boolean;
  }

  interface UIEvent {
    sourceCapabilities: InputDeviceCapabilities;
  }
}

export function createMouseEventListener(
  dispatch: (ev: GesturePointerEvent, target?: Element) => void,
  primaryPointers: GesturePointerEvent[] | null = null,
): NativeEventListener {
  let currentFlags: NativeEventListenerFlags = 0;
  let moveTrackingEnabled = false;
  let activePointer: GesturePointerEvent | null = null;

  if (DEBUG) {
    debugPubMouseState({
      currentFlags,
    });
  }

  function isEventSimulatedFromTouch(ev: MouseEvent): boolean {
    if (TOUCH_EVENTS) {
      if (INPUT_DEVICE_CAPABILITIES) {
        return ev.sourceCapabilities.firesTouchEvents;
      }

      if (primaryPointers !== null) {
        const x = ev.clientX;
        const y = ev.clientY;
        for (const pointer of primaryPointers) {
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
    if (!isEventSimulatedFromTouch(ev)) {
      const buttons = getMouseButtons(ev);
      if (activePointer === null) {
        activePointer = createGesturePointerEventFromMouseEvent(
          ev,
          GesturePointerAction.Down,
          buttons,
        );
        if (!moveTrackingEnabled && (currentFlags & NativeEventListenerFlags.TrackMove)) {
          moveTrackingEnabled = true;
          beforeNativeEvent(EVENT_DISPATCHER_MOUSE_MOVE, onMove);
        }
      } else {
        activePointer = createGesturePointerEventFromMouseEvent(
          ev,
          GesturePointerAction.Move,
          buttons | activePointer.buttons,
        );
      }
      dispatch(activePointer, ev.target as Element);
    }

    if (DEBUG) {
      debugPubMouseState({ currentFlags });
    }
  }

  function onMove(s: SyntheticNativeEvent<MouseEvent>): void {
    const ev = s.native;
    if (!isEventSimulatedFromTouch(ev)) {
      if (activePointer !== null) {
        dispatch(createGesturePointerEventFromMouseEvent(
          ev,
          (ev.which === 0) ? GesturePointerAction.Up : GesturePointerAction.Move,
          activePointer.buttons,
        ));
      }
    }

    if (DEBUG) {
      debugPubMouseState({ currentFlags });
    }
  }

  function onUp(s: SyntheticNativeEvent<MouseEvent>): void {
    const ev = s.native;
    if (!isEventSimulatedFromTouch(ev)) {
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
        activePointer = null;
        if (moveTrackingEnabled) {
          moveTrackingEnabled = false;
          removeBeforeNativeEvent(EVENT_DISPATCHER_MOUSE_MOVE, onMove);
        }
      }
    }

    if (DEBUG) {
      debugPubMouseState({ currentFlags });
    }
  }

  return {
    activate: () => {
      beforeNativeEvent(EVENT_DISPATCHER_MOUSE_DOWN, onDown);
      beforeNativeEvent(EVENT_DISPATCHER_MOUSE_UP, onUp);
    },
    deactivate: () => {
      removeBeforeNativeEvent(EVENT_DISPATCHER_MOUSE_DOWN, onDown);
      removeBeforeNativeEvent(EVENT_DISPATCHER_MOUSE_UP, onUp);
    },
    set: (flags: NativeEventListenerFlags) => {
      if (flags & NativeEventListenerFlags.TrackMove) {
        if (!moveTrackingEnabled) {
          moveTrackingEnabled = true;
          beforeNativeEvent(EVENT_DISPATCHER_MOUSE_MOVE, onMove);
        }
      }
      currentFlags |= flags;
      if (DEBUG) {
        debugPubMouseState({ currentFlags });
      }
    },
    clear: (flags: NativeEventListenerFlags) => {
      if (flags & NativeEventListenerFlags.TrackMove) {
        if (moveTrackingEnabled) {
          moveTrackingEnabled = false;
          removeBeforeNativeEvent(EVENT_DISPATCHER_MOUSE_MOVE, onMove);
        }
      }
      currentFlags &= ~flags;
      if (DEBUG) {
        debugPubMouseState({ currentFlags });
      }
    },
  };
}

function createGesturePointerEventFromMouseEvent(
  ev: MouseEvent,
  action: GesturePointerAction,
  buttons: number,
) {
  return new GesturePointerEvent(
    0,
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
