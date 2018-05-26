import { INPUT_DEVICE_CAPABILITIES } from "ivi-core";
import {
  SyntheticEventFlags, SyntheticNativeEvent,
  EVENT_DISPATCHER_ACTIVE_TOUCH_START, EVENT_DISPATCHER_TOUCH_END, EVENT_DISPATCHER_TOUCH_CANCEL,
  EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE,
  removeBeforeNativeEvent, beforeNativeEvent,
} from "ivi";
import { GesturePointerAction, GesturePointerEvent } from "./gesture_pointer_event";
import { NativeEventListener, NativeEventListenerFlags } from "./native_event_listener";
import { createMouseEventListener } from "./mouse_event_listener";

/**
 * TODO: make sure that target is always attached to the document, because touch events are always working in capture
 *  mode and when target is removed, all events just disappear. The trick is to add a special task that is executed
 *  after frame is updated and checks that target is attached to the document, if it were removed than we just need
 *  set display:none and reattach it somewhere.
 */

/**
 * id 1 is reserved for mouse, and touch identifiers can start from 0.
 */
const TOUCH_ID_OFFSET = 2;

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
  pointers: Map<number, GesturePointerEvent>,
  dispatch: (ev: GesturePointerEvent, target?: Element) => void,
): NativeEventListener {
  const primaryPointers: GesturePointerEvent[] | null = INPUT_DEVICE_CAPABILITIES ? null : [];
  const mouseListener = createMouseEventListener(dispatch, primaryPointers);

  let primaryTouch: Touch | null = null;
  let currentFlags: NativeEventListenerFlags = 0;
  let eventTimeOffset = 0;

  function findTouch(touches: TouchList, id: number): boolean {
    for (let i = 0; i < touches.length; ++i) {
      if (touches[i].identifier === id) {
        return true;
      }
    }
    return false;
  }

  function vacuum(ev: TouchEvent) {
    const touches = ev.touches;
    if (pointers.size >= touches.length) {
      const canceledPointers: GesturePointerEvent[] = [];
      pointers.forEach((pointer) => {
        const id = pointer.id;
        if (id !== 1) {
          if (!findTouch(touches, id - TOUCH_ID_OFFSET)) {
            canceledPointers.push(pointer);
          }
        }
      });

      for (const canceledPointer of canceledPointers) {
        dispatch(cancelGesturePointerEvent(canceledPointer));
      }
    }
  }

  function cleanPrimaryPointersForSyntheticMouseEvents() {
    const now = Date.now();
    let i = 0;
    for (; i < primaryPointers!.length; ++i) {
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
    if (!INPUT_DEVICE_CAPABILITIES && p.isPrimary) {
      if (primaryPointers!.length === 0) {
        eventTimeOffset = Date.now() - p.timestamp + 2500;
        setTimeout(cleanPrimaryPointersForSyntheticMouseEvents, 2500);
      }
      primaryPointers!.push(p);
    }
  }

  function onStart(s: SyntheticNativeEvent<TouchEvent>): void {
    const ev = s.native;
    vacuum(ev);

    const touches = ev.changedTouches;

    if ((pointers.size === 0) || (pointers.size === 1 && pointers.get(1) !== void 0)) {
      primaryTouch = touches[0];
      beforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
    }

    for (let i = 0; i < touches.length; ++i) {
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

  function onMove(s: SyntheticNativeEvent<TouchEvent>) {
    const ev = s.native;
    const touches = ev.changedTouches;
    for (let i = 0; i < touches.length; ++i) {
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
    ev.preventDefault();
  }

  function onEnd(s: SyntheticNativeEvent<TouchEvent>) {
    const ev = s.native;
    const touches = ev.changedTouches;
    for (let i = 0; i < touches.length; ++i) {
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
    if (pointers.size === 0 && (currentFlags & NativeEventListenerFlags.TrackMove)) {
      removeBeforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
    }
  }

  function onCancel(s: SyntheticNativeEvent<TouchEvent>) {
    const ev = s.native;
    const touches = ev.changedTouches;
    for (let i = 0; i < touches.length; ++i) {
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
    if (pointers.size === 0 && (currentFlags & NativeEventListenerFlags.TrackMove)) {
      removeBeforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
    }
  }

  return {
    activate: () => {
      mouseListener.activate();
      // touchstart should be active, otherwise touchmove can't be canceled.
      beforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_START, onStart);
      beforeNativeEvent(EVENT_DISPATCHER_TOUCH_END, onEnd);
      beforeNativeEvent(EVENT_DISPATCHER_TOUCH_CANCEL, onCancel);
    },
    deactivate: () => {
      removeBeforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_START, onStart);
      removeBeforeNativeEvent(EVENT_DISPATCHER_TOUCH_END, onEnd);
      removeBeforeNativeEvent(EVENT_DISPATCHER_TOUCH_CANCEL, onCancel);
      mouseListener.deactivate();
    },
    set: (flags: NativeEventListenerFlags) => {
      if (flags & NativeEventListenerFlags.TrackMove) {
        if (!(currentFlags & NativeEventListenerFlags.TrackMove)) {
          beforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
        }
      }
      currentFlags |= flags;
    },
    clear: (flags: NativeEventListenerFlags) => {
      if (flags & NativeEventListenerFlags.TrackMove) {
        if (currentFlags & NativeEventListenerFlags.TrackMove) {
          removeBeforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
        }
      }
      currentFlags &= ~flags;
    },
  };
}

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
