/**
 * Getting touchy - everything you (n)ever wanted to know about touch and pointer events
 *   https://patrickhlauke.github.io/getting-touchy-presentation/
 *
 * Issues with touch events
 *   https://docs.google.com/document/d/12-HPlSIF7-ISY8TQHtuQ3IqDi-isZVI0Yzv5zwl90VU
 */

import { TOUCH_EVENTS, catchError } from "ivi-core";
import {
  DispatchTarget, accumulateDispatchTargets, SyntheticEvent, EventDispatcher, EventHandler, dispatchEvent,
} from "ivi";
import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureBehavior } from "./gesture_behavior";
import { createMouseEventListener } from "./mouse_event_listener";
import { createTouchEventListener } from "./touch_event_listener";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import {
  GestureConflictResolverAction, GestureConflictResolutionStatus, GestureConflictResolver,
} from "./gesture_conflict_resolver";
import { scheduleMicrotask } from "ivi-scheduler";
import { NativeEventListenerFlags } from "./native_event_listener";

export function createGestureEventDispatcher(): EventDispatcher {
  let dependencies = 0;

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

  const pointers = new Map<number, GesturePointerEvent>();
  const recognizers: GestureRecognizer[] = [];
  const resolvedRecognizers: GestureRecognizer[] = [];
  let resolvedRecognizer: GestureRecognizer | null = null;
  let closed = false;
  let activeRecognizersCounter = 0;
  let resolvedRecognizersCounter = 0;
  let resolvedBehavior: GestureBehavior = 0;

  let pendingResolveConflicts = false;

  /**
   * Gesture conflict resolution algorithm is used to resolve conflicts when there are multiple concurrent gestures.
   *
   * This algorithm is using two strategies to resolve conflicts.
   *
   * First strategy is using a simple protocol to communicate with concurrent recognizers. It broadcasts information
   * about different types of behavior that were recognized by all concurrent recognizers and they should decide how
   * to respond in such situations.
   *
   * Examples:
   *
   *  [Tap, Pan]: when Tap is recognized, recognizer with a Pan behavior should respond by canceling, because taping has
   *   a higher priority.
   *
   *  [Tap, MultiTap]: when Tap is recognized, MultiTap can respond by asking to wait some time, until it is certain
   *   that there are no multi tapping behavior recognized.
   *
   *
   * Second strategy is a "Last resolved recognizer wins". When first strategy is unable to resolve conflicts and there
   * are still multiple concurrent recognizers, we just pick the last one that were resolved.
   *
   * Examples:
   *
   *  [Tap, MultiTap]: when Tap and MultiTap are resolved, MultiTap should be resolved after Tap and so MultiTap wins.
   *
   *  [Pan, Pan]: when two Pans are resolved, the second one will be from the deepest element in the DOM hierarchy
   *   because they were added during capture phase of the event flow algorithm.
   */
  const resolveConflicts = () => {
    pendingResolveConflicts = false;
    if (!resolvedRecognizer && resolvedRecognizersCounter > 0) {
      let wait = false;
      if (activeRecognizersCounter > 1) {
        for (const recognizer of recognizers) {
          if (recognizer.state & GestureRecognizerState.Active) {
            const resolution = recognizer.resolveConflict(resolvedBehavior);
            if (resolution & GestureConflictResolutionStatus.Cancel) {
              recognizer.state &= ~GestureRecognizerState.Active;
              activeRecognizersCounter--;
              if (recognizer.state & GestureRecognizerState.Resolved) {
                resolvedRecognizersCounter--;
              }
              recognizer.rejected();
            }
            if (resolution & GestureConflictResolutionStatus.Wait) {
              wait = true;
            }
          }
        }
      }

      if (!wait || ((activeRecognizersCounter - resolvedRecognizersCounter) === 0)) {
        let i = resolvedRecognizers.length - 1;
        while (i-- >= 0) {
          const recognizer = resolvedRecognizers[i];
          if (recognizer.state & GestureRecognizerState.Active) {
            resolvedRecognizer = recognizer;
            recognizer.accepted();
            if (recognizer.behavior & GestureBehavior.Native) {
              listener.clear(NativeEventListenerFlags.TrackMove);
            }
          }
        }
        for (i = 0; i < recognizers.length; i++) {
          const recognizer = recognizers[i];
          if ((recognizer !== resolvedRecognizer) && (recognizer.state & GestureRecognizerState.Active)) {
            activeRecognizersCounter--;
            recognizer.rejected();
          }
        }
      }
    }

    if (activeRecognizersCounter === 0) {
      listener.clear(NativeEventListenerFlags.TrackMove);
      recognizers.length = 0;
      resolvedRecognizers.length = 0;
      resolvedRecognizer = null;
      closed = false;
      resolvedRecognizersCounter = 0;
      resolvedBehavior = 0;
    }
  };

  const conflictResolver: GestureConflictResolver =
    (recognizer: GestureRecognizer, action: GestureConflictResolverAction) => {
      switch (action) {
        case GestureConflictResolverAction.Activate: {
          recognizer.state |= GestureRecognizerState.Active;
          listener.set(NativeEventListenerFlags.TrackMove);
          recognizers.push(recognizer);
          activeRecognizersCounter++;
          break;
        }
        case GestureConflictResolverAction.Resolve: {
          recognizer.state |= GestureRecognizerState.Resolved;
          resolvedBehavior |= recognizer.behavior;
          resolvedRecognizers.push(recognizer);
          resolvedRecognizersCounter++;
          break;
        }
        case GestureConflictResolverAction.Cancel: {
          recognizer.state &= ~GestureRecognizerState.Active;
          activeRecognizersCounter--;
          if (recognizer.state & GestureRecognizerState.Resolved) {
            resolvedRecognizersCounter--;
          }
          recognizer.rejected();
          break;
        }
        case GestureConflictResolverAction.Finish: {
          recognizer.state &= ~GestureRecognizerState.Active;
          activeRecognizersCounter--;
          if (recognizer.state & GestureRecognizerState.Resolved) {
            resolvedRecognizersCounter--;
          }
          break;
        }
      }

      if (!pendingResolveConflicts) {
        pendingResolveConflicts = true;
        scheduleMicrotask(resolveConflicts);
      }
    };

  const dispatch = catchError((ev: GesturePointerEvent, target?: Element) => {
    const action = ev.action;

    if (action & (GesturePointerAction.Move | GesturePointerAction.Down)) {
      pointers.set(ev.id, ev);
    } else { // GesturePointerAction.Up | GesturePointerAction.Cancel
      pointers.delete(ev.id);
    }

    if (action === GesturePointerAction.Down) {
      const targets: DispatchTarget[] = [];
      accumulateDispatchTargets(targets, target!, matchEventSource);
      if (targets.length > 0) {
        dispatchEvent(targets, ev, false, (h: EventHandler, e: SyntheticEvent) => {
          let recognizer = h.state;
          if (closed) {
            if (recognizer !== null && (recognizer.state & GestureRecognizerState.Active)) {
              recognizer.handleEvent(e);
            }
          } else {
            if (recognizer === null) {
              h.state = recognizer = h.props(conflictResolver, h);
            }
            recognizer.handleEvent(e);
          }
        });
      }
    } else if (closed) {
      if (activeRecognizersCounter) {
        if (resolvedRecognizer) {
          resolvedRecognizer.handleEvent(ev);
        } else {
          for (const recognizer of recognizers) {
            if (recognizer.state & GestureRecognizerState.Active) {
              recognizer.handleEvent(ev);
            }
          }
        }
      }
    }
  });

  const listener = TOUCH_EVENTS ?
    createTouchEventListener(pointers, dispatch) :
    createMouseEventListener(dispatch);

  return src;
}
