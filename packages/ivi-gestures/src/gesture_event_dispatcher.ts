import {
  TOUCH_EVENTS, catchError,
  DispatchTarget, accumulateDispatchTargets, SyntheticEvent, EventDispatcher, EventHandler, dispatchEvent,
} from "ivi";
import { scheduleMicrotask } from "ivi-scheduler";
import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureBehavior } from "./gesture_behavior";
import { createMouseEventListener } from "./mouse_event_listener";
import { createTouchEventListener } from "./touch_event_listener";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureControllerAction, GestureController } from "./gesture_controller";
import { NativeEventListenerFlags } from "./native_event_listener";
import { debugPubDispatcherState } from "./debug";

export function createGestureEventDispatcher(): EventDispatcher {
  let dependencies = 0;

  const src = {
    add(h: EventHandler) {
      if (dependencies++ === 0) {
        listener.activate();
      }
      ++h.listeners;

    },
    remove(h: EventHandler) {
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
  const recognizers: GestureRecognizer<any>[] = [];
  const resolvedRecognizers: GestureRecognizer<any>[] = [];
  let acceptedRecognizer: GestureRecognizer<any> | null = null;
  let conflictResolverClosed = false;
  let activeRecognizersCounter = 0;
  let resolvedRecognizersCounter = 0;

  if (DEBUG) {
    debugPubDispatcherState({
      pointers,
      recognizers,
      resolvedRecognizers,
      acceptedRecognizer,
      conflictResolverClosed,
      activeRecognizersCounter,
      resolvedRecognizersCounter,
    });
  }

  let pendingResolveConflicts = false;
  const resolveConflicts = () => {
    if (!acceptedRecognizer && activeRecognizersCounter > 0) {
      if (activeRecognizersCounter === 1) {
        for (const recognizer of recognizers) {
          if (recognizer.state & GestureRecognizerState.Active) {
            recognizer.accept();
            break;
          }
        }
      } else if (resolvedRecognizersCounter > 0) {
        let wait = 0;
        for (const recognizer of recognizers) {
          if (recognizer.state & GestureRecognizerState.Active) {
            if (recognizer.shouldWait()) {
              wait = 1;
              break;
            }
          }
        }
        if (!wait || ((activeRecognizersCounter - resolvedRecognizersCounter) === 0)) {
          let accepted = null;
          let i = resolvedRecognizers.length - 1;
          while (i >= 0) {
            const recognizer = resolvedRecognizers[i--];
            if (recognizer.state & GestureRecognizerState.Active) {
              if (accepted === null || (accepted.nPointers < recognizer.nPointers)) {
                accepted = recognizer;
              }
            }
          }
          accepted!.accept();
          for (const recognizer of recognizers) {
            if (recognizer !== accepted && (recognizer.state & GestureRecognizerState.Active)) {
              recognizer.reject();
            }
          }
        }
      }
    }

    pendingResolveConflicts = false;
    if (activeRecognizersCounter === 0) {
      listener.clear(NativeEventListenerFlags.TrackMove | NativeEventListenerFlags.PreventDefault);
      recognizers.length = 0;
      resolvedRecognizers.length = 0;
      acceptedRecognizer = null;
      conflictResolverClosed = false;
      resolvedRecognizersCounter = 0;
    }

    if (DEBUG) {
      debugPubDispatcherState({
        pointers,
        recognizers,
        resolvedRecognizers,
        acceptedRecognizer,
        conflictResolverClosed,
        activeRecognizersCounter,
        resolvedRecognizersCounter,
      });
    }
  };

  const conflictResolver: GestureController =
    (recognizer: GestureRecognizer<any>, action: GestureControllerAction) => {
      switch (action) {
        case GestureControllerAction.Activate: {
          listener.set(NativeEventListenerFlags.TrackMove);
          recognizers.push(recognizer);
          activeRecognizersCounter++;
          break;
        }
        case GestureControllerAction.Deactivate: {
          activeRecognizersCounter--;
          if (recognizer.state & GestureRecognizerState.Resolved) {
            resolvedRecognizersCounter--;
          }
          break;
        }
        case GestureControllerAction.Resolve: {
          resolvedRecognizers.push(recognizer);
          resolvedRecognizersCounter++;
          break;
        }
        case GestureControllerAction.Accept: {
          acceptedRecognizer = recognizer;
          if (recognizer.resolveAction & GestureBehavior.Native) {
            listener.clear(NativeEventListenerFlags.TrackMove | NativeEventListenerFlags.PreventDefault);
          } else {
            listener.set(NativeEventListenerFlags.PreventDefault);
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
          if (conflictResolverClosed) {
            if (recognizer !== null && (recognizer.state & GestureRecognizerState.Active)) {
              recognizer.handleEvent(e);
            }
          } else {
            if (recognizer === null) {
              h.state = recognizer = h.props(conflictResolver, h.handler);
            }
            recognizer.handleEvent(e);
          }
        });
        if (activeRecognizersCounter) {
          conflictResolverClosed = true;

          // override recognizer actions
          let i = recognizers.length - 1;
          while (i > 0) {
            const right = recognizers[i--];
            let preventAction = right.preventAction;
            if (preventAction !== 0) {
              preventAction = ~preventAction;
              let j = i;
              while (j >= 0) {
                const left = recognizers[j--];
                left.resolveAction &= preventAction;
              }
            }
          }

          let preventDefault = true;
          while (i < recognizers.length) {
            const r = recognizers[i++];
            if ((r.resolveAction & ~GestureBehavior.Native) === 0) {
              r.reject();
            } else if (r.resolveAction & GestureBehavior.Native) {
              // if there is native behavior, don't trigger preventDefault
              preventDefault = false;
            }
          }

          if (preventDefault) {
            listener.set(NativeEventListenerFlags.PreventDefault);
          }
        }
      }
    } else if (conflictResolverClosed) {
      if (activeRecognizersCounter) {
        if (acceptedRecognizer) {
          acceptedRecognizer.handleEvent(ev);
        } else {
          for (const recognizer of recognizers) {
            if (recognizer.state & GestureRecognizerState.Active) {
              recognizer.handleEvent(ev);
            }
          }
        }
      }
    }

    if (DEBUG) {
      debugPubDispatcherState({
        pointers,
        recognizers,
        resolvedRecognizers,
        acceptedRecognizer,
        conflictResolverClosed,
        activeRecognizersCounter,
        resolvedRecognizersCounter,
      });
    }
  });

  const listener = TOUCH_EVENTS ?
    createTouchEventListener(pointers, dispatch) :
    createMouseEventListener(dispatch);

  return src;
}
