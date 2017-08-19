import { FEATURES, FeatureFlags } from "ivi-core";
import {
  SyntheticEventFlags, SyntheticTouchEvent, EventSourceActiveTouchStart, EventSourceTouchEnd, EventSourceTouchCancel,
  EventSourceActiveTouchMove,
} from "ivi-events";
import { isNativeGestureAccepted } from "./arena";
import { GestureNativeEventSource } from "./gesture_event_source";
import { GesturePointerAction, GesturePointerEvent } from "./pointer_event";
import { createMouseEventListener } from "./mouse_event_listener";

/**
 * id 1 is reserved for mouse, and touch identifiers can start from 0.
 */
const TOUCH_ID_OFFSET = 2;

/**
 * Convert Touch into Gesture Pointer Event.
 *
 * @param ev
 * @param action
 * @param touch
 * @param buttons
 * @param isPrimary
 * @param hitTarget
 */
function touchToGesturePointerEvent(
  ev: TouchEvent,
  action: GesturePointerAction,
  touch: Touch,
  buttons: number,
  isPrimary: boolean,
  hitTarget: Element | null,
) {
  return new GesturePointerEvent(
    SyntheticEventFlags.Bubbles,
    ev.timeStamp,
    touch.identifier + TOUCH_ID_OFFSET,
    action,
    touch.clientX,
    touch.clientY,
    touch.pageX,
    touch.pageY,
    buttons,
    isPrimary,
    hitTarget,
  );
}

/**
 * Create a cancel gesture pointer event.
 *
 * @param ev Original Event.
 */
function cancelGesturePointerEvent(
  ev: GesturePointerEvent,
) {
  return new GesturePointerEvent(
    ev.flags,
    ev.timestamp,
    ev.id,
    GesturePointerAction.Cancel,
    ev.x,
    ev.y,
    ev.pageX,
    ev.pageY,
    ev.buttons,
    ev.isPrimary,
    ev.hitTarget,
  );
}

export function createTouchEventListener(
  pointers: GesturePointerEvent[],
  dispatch: (ev: GesturePointerEvent, target?: Element) => void,
): GestureNativeEventSource {
  const primaryPointers: GesturePointerEvent[] | null = (FEATURES & FeatureFlags.InputDeviceCapabilities) === 0 ?
    [] :
    null;
  const mouseListener = createMouseEventListener(dispatch, primaryPointers);

  let primaryTouch: Touch | null = null;
  let eventTimeOffset = 0;

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
    if (pointers.length >= touches.length) {
      const canceledPointers: GesturePointerEvent[] = [];
      let i;
      for (i = 0; i < pointers.length; i++) {
        const pointer = pointers[i];
        const id = pointer.id;
        if (id !== 1) {
          if (findTouch(touches, id - TOUCH_ID_OFFSET) === false) {
            canceledPointers.push(pointer);
          }
        }
      }

      for (i = 0; i < canceledPointers.length; i++) {
        dispatch(cancelGesturePointerEvent(canceledPointers[i]));
      }
    }
  }

  function activate() {
    mouseListener.activate();
    // touchstart should be active, otherwise touchmove can't be canceled.
    EventSourceActiveTouchStart.addBeforeListener(onStart);
    EventSourceTouchEnd.addBeforeListener(onEnd);
    EventSourceTouchCancel.addBeforeListener(onCancel);
  }

  function deactivate() {
    EventSourceActiveTouchStart.removeBeforeListener(onStart);
    EventSourceTouchEnd.removeBeforeListener(onEnd);
    EventSourceTouchCancel.removeBeforeListener(onCancel);
    mouseListener.deactivate();
  }

  function startMoveTracking(ev: GesturePointerEvent, target: Element) {
    if (ev.id === 1) {
      mouseListener.startMoveTracking(ev, target);
    } else {
      EventSourceActiveTouchMove.addBeforeListener(onMove);
    }
  }

  function stopMoveTracking(ev: GesturePointerEvent) {
    if (ev.id === 1) {
      mouseListener.stopMoveTracking(ev);
    } else {
      EventSourceActiveTouchMove.removeBeforeListener(onMove);
    }
  }

  function cleanPrimaryPointersForSyntheticMouseEvents() {
    const now = Date.now();
    let i = 0;
    for (; i < primaryPointers!.length; i++) {
      const p = primaryPointers![i];
      if (now < (p.timestamp + eventTimeOffset)) {
        break;
      }
    }
    if (i > 0) {
      primaryPointers!.splice(0, i);
    }
    if (primaryPointers!.length > 0) {
      setTimeout(
        cleanPrimaryPointersForSyntheticMouseEvents,
        eventTimeOffset + primaryPointers![0].timestamp - now,
      );
    }
  }

  function dedupSyntheticMouseEvents(p: GesturePointerEvent) {
    if ((FEATURES & FeatureFlags.InputDeviceCapabilities) === 0 && (p.isPrimary === true)) {
      if (primaryPointers!.length === 0) {
        eventTimeOffset = Date.now() - p.timestamp + 2500;
        setTimeout(cleanPrimaryPointersForSyntheticMouseEvents, 2500);
      }
      primaryPointers!.push(p);
    }
  }

  function onStart(s: SyntheticTouchEvent): void {
    const ev = s.native;
    vacuum(ev);

    const touches = ev.changedTouches;

    if ((pointers.length === 0) ||
      (pointers.length === 1 && pointers[0].id === 1)) {
      primaryTouch = touches[0];
    }

    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const p = touchToGesturePointerEvent(
        ev,
        GesturePointerAction.Down,
        touch,
        1,
        primaryTouch === touch,
        touch.target as Element,
      );
      dedupSyntheticMouseEvents(p);
      dispatch(p, touch.target as Element);
    }
  }

  function onMove(s: SyntheticTouchEvent) {
    const ev = s.native;
    const touches = ev.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      dispatch(touchToGesturePointerEvent(
        ev,
        GesturePointerAction.Move,
        touch,
        1,
        primaryTouch === touch,
        null,
      ));
    }
    if (!isNativeGestureAccepted()) {
      ev.preventDefault();
    }
  }

  function onEnd(s: SyntheticTouchEvent) {
    const ev = s.native;
    const touches = ev.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const p = touchToGesturePointerEvent(
        ev,
        GesturePointerAction.Up,
        touch,
        0,
        primaryTouch === touch,
        null,
      );
      dedupSyntheticMouseEvents(p);
      dispatch(p);

      if (primaryTouch === touch) {
        primaryTouch = null;
      }
    }
  }

  function onCancel(s: SyntheticTouchEvent) {
    const ev = s.native;
    const touches = ev.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      dispatch(touchToGesturePointerEvent(
        ev,
        GesturePointerAction.Cancel,
        touch,
        0,
        primaryTouch === touch,
        null,
      ));

      if (primaryTouch === touch) {
        primaryTouch = null;
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
