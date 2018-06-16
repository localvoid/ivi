import { INPUT_DEVICE_CAPABILITIES, IOS_GESTURE_EVENT, NOOP } from "ivi-core";
import {
  SyntheticEventFlags, SyntheticNativeEvent,
  EVENT_DISPATCHER_ACTIVE_TOUCH_START, EVENT_DISPATCHER_TOUCH_END, EVENT_DISPATCHER_TOUCH_CANCEL,
  EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE,
  removeBeforeNativeEvent, beforeNativeEvent,
} from "ivi";
import { GesturePointerAction, GesturePointerEvent } from "./gesture_pointer_event";
import { NativeEventListener, NativeEventListenerFlags } from "./native_event_listener";
import { createMouseEventListener } from "./mouse_event_listener";
import { debugPubTouchState } from "./debug";
import { beforeUpdate } from "ivi-scheduler";

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
  let target: EventTarget | null = null;
  let currentFlags: NativeEventListenerFlags = 0;
  let removeTarget = false;
  let preventFirstMove = false;
  let moveTrackingEnabled = false;
  let eventTimeOffset = 0;

  if (DEBUG) {
    debugPubTouchState({ currentFlags, primaryPointers, primaryTouch, eventTimeOffset, moveTrackingEnabled });
  }

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
    if (DEBUG) {
      debugPubTouchState({ currentFlags, primaryPointers, primaryTouch, eventTimeOffset, moveTrackingEnabled });
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

    if (ev.cancelable) {
      const touches = ev.changedTouches;

      if ((pointers.size === 0) || (pointers.size === 1 && pointers.get(1) !== void 0)) {
        primaryTouch = touches[0];
        target = ev.target;
        if (!moveTrackingEnabled && (currentFlags & NativeEventListenerFlags.TrackMove)) {
          moveTrackingEnabled = true;
          beforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
        }
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
    if (DEBUG) {
      debugPubTouchState({ currentFlags, primaryPointers, primaryTouch, eventTimeOffset, moveTrackingEnabled });
    }
  }

  function onMove(s: SyntheticNativeEvent<TouchEvent>) {
    const ev = s.native;
    if (ev.cancelable) {
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
      if (
        (currentFlags & NativeEventListenerFlags.PreventDefault) ||
        (preventFirstMove && !IOS_GESTURE_EVENT) ||
        (IOS_GESTURE_EVENT && ev.scale !== 1)
      ) {
        s.flags |= SyntheticEventFlags.PreventedDefault;
        preventFirstMove = false;
      }
    } else {
      onCancel(s);
    }
    if (DEBUG) {
      debugPubTouchState({ currentFlags, primaryPointers, primaryTouch, eventTimeOffset, moveTrackingEnabled });
    }
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
    if (pointers.size === 0) {
      if (removeTarget) {
        removeTarget = false;
        document.documentElement.removeChild(target as Element);
      }
      target = null;
      if (moveTrackingEnabled) {
        moveTrackingEnabled = false;
        removeBeforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
      }
    }
    if (DEBUG) {
      debugPubTouchState({ currentFlags, primaryPointers, primaryTouch, eventTimeOffset, moveTrackingEnabled });
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
    if (pointers.size === 0) {
      if (removeTarget) {
        removeTarget = false;
        document.documentElement.removeChild(target as Element);
      }
      target = null;
      if (moveTrackingEnabled) {
        moveTrackingEnabled = false;
        removeBeforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
      }
    }
    if (DEBUG) {
      debugPubTouchState({ currentFlags, primaryPointers, primaryTouch, eventTimeOffset, moveTrackingEnabled });
    }
  }

  function onBeforeUpdate() {
    if (target !== null) {
      if (!document.contains(target as Element)) {
        removeTarget = true;
        (target as HTMLElement).style.display = "none";
        document.documentElement.appendChild(target as Element);
      }
      return true;
    }
    return false;
  }

  return {
    activate: () => {
      mouseListener.activate();
      // touchstart should be active, otherwise touchmove can't be canceled.
      beforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_START, onStart);
      beforeNativeEvent(EVENT_DISPATCHER_TOUCH_END, onEnd);
      beforeNativeEvent(EVENT_DISPATCHER_TOUCH_CANCEL, onCancel);
      beforeUpdate(onBeforeUpdate);
      /**
       * Safari just being safari: https://bugs.webkit.org/show_bug.cgi?id=182521
       */
      if (IOS_GESTURE_EVENT) {
        beforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, NOOP);
      }
    },
    deactivate: () => {
      if (IOS_GESTURE_EVENT) {
        removeBeforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, NOOP);
      }
      removeBeforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_START, onStart);
      removeBeforeNativeEvent(EVENT_DISPATCHER_TOUCH_END, onEnd);
      removeBeforeNativeEvent(EVENT_DISPATCHER_TOUCH_CANCEL, onCancel);
      mouseListener.deactivate();
    },
    set: (flags: NativeEventListenerFlags) => {
      if (flags & NativeEventListenerFlags.TrackMove) {
        if (!moveTrackingEnabled) {
          preventFirstMove = true;
          moveTrackingEnabled = true;
          beforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
        }
      }
      currentFlags |= flags;
      if (DEBUG) {
        debugPubTouchState({ currentFlags, primaryPointers, primaryTouch, eventTimeOffset, moveTrackingEnabled });
      }
    },
    clear: (flags: NativeEventListenerFlags) => {
      if (flags & NativeEventListenerFlags.TrackMove) {
        if (moveTrackingEnabled) {
          moveTrackingEnabled = false;
          removeBeforeNativeEvent(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE, onMove);
        }
      }
      currentFlags &= ~flags;
      if (DEBUG) {
        debugPubTouchState({ currentFlags, primaryPointers, primaryTouch, eventTimeOffset, moveTrackingEnabled });
      }
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
    0,
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
