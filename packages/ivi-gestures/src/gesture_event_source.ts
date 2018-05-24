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
  GESTURE_ARENA, addRecognizerToArena, closeArena, sweepArena, cancelArena, dispatchMoveEventToRecognizers,
  dispatchReleaseEventToRecognizers,
} from "./arena";
import { createMouseEventListener } from "./mouse_event_listener";
import { createTouchEventListener } from "./touch_event_listener";

export interface GestureNativeEventSource {
  activate(): void;
  deactivate(): void;
  startMoveTracking(ev: GesturePointerEvent, target: Element): void;
  stopMoveTracking(ev: GesturePointerEvent): void;
}

export class GestureEventSource {
  readonly src: EventSource;
  private dependencies: number;
  private readonly pointers: Map<number, GesturePointerEvent>;
  private readonly listener: GestureNativeEventSource;

  constructor() {
    this.src = {
      add: this.addGestureListener,
      remove: this.removeGestureListener,
    };
    this.dependencies = 0;
    this.pointers = new Map<number, GesturePointerEvent>();
    this.listener = TOUCH_EVENTS ?
      createTouchEventListener(this.pointers, this.dispatch) :
      createMouseEventListener(this.dispatch);
  }

  private addGestureListener = (h: EventHandler) => {
    if (this.dependencies++ === 0) {
      this.listener.activate();
    }
    ++h.listeners;
  }

  private removeGestureListener = (h: EventHandler) => {
    if (--this.dependencies === 0) {
      this.listener.deactivate();
    }
    if (--h.listeners === 0) {
      if (h.state !== null) {
        h.state.dispose();
        h.state = null;
      }
    }
  }

  private matchEventSource = (h: EventHandler) => (h.src === this.src);

  private dispatch = catchError((ev: GesturePointerEvent, target?: Element) => {
    const action = ev.action;

    if (action === GesturePointerAction.Down) {
      this.pointers.set(ev.id, ev);

      const targets: DispatchTarget[] = [];
      accumulateDispatchTargets(targets, target!, this.matchEventSource);

      if (targets.length > 0) {
        let capture = false;
        dispatchEvent(targets, ev, true, (h: EventHandler, e: SyntheticEvent) => {
          if (h.state === null) {
            h.state = h.props(h);
          }
          if (h.state.activate(e) === true) {
            addRecognizerToArena(h.state);
            capture = true;
          }
        });
        if (capture) {
          this.listener.startMoveTracking(ev, target!);
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
            dispatchReleaseEventToRecognizers(ev);
            if (GESTURE_ARENA.primaryPointer!.id === ev.id) {
              sweepArena(ev);
            }
          } else {
            cancelArena();
          }
        } else {
          dispatchMoveEventToRecognizers(ev);
        }
      }

      if ((action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) !== 0) {
        this.listener.stopMoveTracking(ev);
        this.pointers.delete(ev.id);
      } else {
        this.pointers.set(ev.id, ev);
      }
    }
  });
}
