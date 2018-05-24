/**
 * Getting touchy - everything you (n)ever wanted to know about touch and pointer events
 *   https://patrickhlauke.github.io/getting-touchy-presentation/
 *
 * Issues with touch events
 *   https://docs.google.com/document/d/12-HPlSIF7-ISY8TQHtuQ3IqDi-isZVI0Yzv5zwl90VU
 */

import { TOUCH_EVENTS, catchError } from "ivi-core";
import {
  DispatchTarget, accumulateDispatchTargets, SyntheticEvent, EventSource, EventHandler, dispatchEvent,
} from "ivi-events";
import { GesturePointerEvent, GesturePointerAction } from "./pointer_event";
import {
  GESTURE_ARENA, addRecognizerToArena, closeArena, sweepArena, cancelArena, dispatchEventToRecognizers,
} from "./arena";
import { createMouseEventListener } from "./mouse_event_listener";
import { createTouchEventListener } from "./touch_event_listener";

export interface NativeEventListener {
  activate(): void;
  deactivate(): void;
  startMoveTracking(ev: GesturePointerEvent, target: Element): void;
  stopMoveTracking(ev: GesturePointerEvent): void;
}

export function createGestureEventSource(): EventSource {
  let dependencies = 0;
  const pointers = new Map<number, GesturePointerEvent>();

  const src = {
    add: (h: EventHandler) => {
      if (dependencies++ === 0) {
        listener.activate();
      }
      ++h.listeners;

    },
    remove: (h: EventHandler) => {
      if (--dependencies === 0) {
        listener.deactivate();
      }
      if (--h.listeners === 0) {
        if (h.state !== null) {
          h.state.dispose();
          h.state = null;
        }
      }
    },
  };

  const matchEventSource = (h: EventHandler) => (h.src === src);

  const dispatch = catchError((ev: GesturePointerEvent, target?: Element) => {
    const action = ev.action;

    if (action === GesturePointerAction.Down) {
      pointers.set(ev.id, ev);

      const targets: DispatchTarget[] = [];
      accumulateDispatchTargets(targets, target!, matchEventSource);

      if (targets.length > 0) {
        let capture = false;
        dispatchEvent(targets, ev, true, (h: EventHandler, e: SyntheticEvent) => {
          if (h.state === null) {
            h.state = h.props(h);
          }
          if (h.state.activate(e)) {
            addRecognizerToArena(h.state);
            capture = true;
          }
        });
        if (capture) {
          listener.startMoveTracking(ev, target!);
          closeArena();
        }
      }
    } else {
      // Dispatch event to Gesture Recognizers.
      if (GESTURE_ARENA.activeRecognizers > 0) {
        if (GESTURE_ARENA.primaryPointer!.id === ev.id) {
          GESTURE_ARENA.primaryPointer = ev;
        }
        if ((action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) !== 0) {
          if ((action & GesturePointerAction.Up) !== 0) {
            dispatchEventToRecognizers(ev);
            if (GESTURE_ARENA.primaryPointer!.id === ev.id) {
              sweepArena(ev);
            }
          } else {
            cancelArena();
          }
        } else {
          dispatchEventToRecognizers(ev);
        }
      }

      if ((action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) !== 0) {
        listener.stopMoveTracking(ev);
        pointers.delete(ev.id);
      } else {
        pointers.set(ev.id, ev);
      }
    }
  });

  const listener = TOUCH_EVENTS ?
    createTouchEventListener(pointers, dispatch) :
    createMouseEventListener(dispatch);

  return src;
}
