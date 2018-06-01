/**
 * Gesture Disambiguation Algorithm:
 *
 * When first pointer is down, event dispatcher will instantiate gesture recognizers that should receive pointer event
 * (lazy initialization), then it will dispatch pointer event to them. Gesture recognizers in response should activate
 * itself through a {@link GestureController} function that available on all gesture recognizers through `controller`
 * property.
 *
 * Then we need to immediately reject conflicting recognizers that can't be recognized. For example, if we have two Pan
 * recognizers, then first one will never be recognized. This step is important when we completely override native
 * gestures, because on iOS Safari we always need to invoke `preventDefault()` on the first `TouchMove` event, otherwise
 * it can start sending non-cancelable events.
 *
 * Then if there are still conflicting recognizers, we are starting to wait until recognizers will respond that they
 * recognized a gesture.
 *
 * Then we need to check that other active recognizers doesn't depend on the time, so we are invoking lifecycle method
 * `shouldWait()` and if someone needs to wait, disambiguation algorithm will wait until all awaiting recognizers either
 * resolved or canceled.
 *
 * Then if there are still several conflicting resolved recognizers, we just use "last recognizer wins" strategy. This
 * strategy works perfectly in all scenarios. If there are two Tap recognizers, innermost one will win because we are
 * dispatching pointer events in a capture mode.
 *
 *
 * Important browser quirks:
 *
 * Chrome doesn't send touch move events after the first one until 15px slop region is exceeded
 * {@link https://developers.google.com/web/updates/2014/05/A-More-Compatible-Smoother-Touch}. But we need this events,
 * so that we can use them to resolve conflicts between native and custom gestures, and the trick is to invoke
 * `preventDefault()` on the first `TouchMove` event, then it will start sending all touch move events. The good news is
 * that invoking `preventDefault()` on the first `TouchMove` doesn't stop native gestures from recognizing, so we can
 * just stop listening touch move events when we were able to recognize native gesture.
 *
 *
 * Additional information:
 *
 * Getting touchy - everything you (n)ever wanted to know about touch and pointer events
 * {@link https://patrickhlauke.github.io/getting-touchy-presentation/}
 *
 * Touch Event behavior details across browsers
 * {@link https://docs.google.com/document/d/12k_LL_Ot9GjF8zGWP9eI_3IMbSizD72susba0frg44Y}
 *
 * Issues with touch events
 * {@link https://docs.google.com/document/d/12-HPlSIF7-ISY8TQHtuQ3IqDi-isZVI0Yzv5zwl90VU}
 *
 * Gesture Recognition Systems:
 *
 * iOS
 * {@link https://developer.apple.com/documentation/uikit/uigesturerecognizer}
 *
 * Android
 * {@link https://developer.android.com/training/gestures/}
 *
 * Flutter - Automatic gesture disambiguation algorithm. ivi-gestures implementation were heavily inspired by the ideas
 * from this project, but now it is using different heuristics for gesture disambiguation.
 * {@link https://github.com/flutter/flutter/tree/master/packages/flutter/lib/src/gestures}
 *
 * TouchScript - Unity. Inspired by iOS API. Amazing documentation.
 * {@link https://github.com/TouchScript/TouchScript/wiki}
 *
 * Hammer.js - Most popular gesture recognition lib for the web platform. Unable to handle complex scenarios, flawed
 * architecture.
 * {@link https://github.com/hammerjs/hammer.js}
 *
 * Non-standard recognizers:
 *
 * Pinch-to-Zoom plus
 * {@link https://www.youtube.com/watch?v=x-hFyzdwoL8}
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
import { GestureConflictResolverAction, GestureController } from "./gesture_controller";
import { scheduleMicrotask } from "ivi-scheduler";
import { NativeEventListenerFlags } from "./native_event_listener";
import { debugPubDispatcherState } from "./debug";
import { NativePanGestureRecognizer } from "./native_pan_gesture_recognizer";

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
    pendingResolveConflicts = false;
    if (!acceptedRecognizer && resolvedRecognizersCounter > 0) {
      let wait = 0;
      for (let i = 0; i < recognizers.length; i++) {
        const recognizer = recognizers[i];
        if (recognizer.state & GestureRecognizerState.Active) {
          if (recognizer.shouldWait()) {
            wait = 1;
          }
        }
      }
      if (wait || ((activeRecognizersCounter - resolvedRecognizersCounter) === 0)) {
        let i = resolvedRecognizers.length - 1;
        while (i >= 0) {
          const recognizer = resolvedRecognizers[i--];
          if (recognizer.state & GestureRecognizerState.Active) {
            acceptedRecognizer = recognizer;
            recognizer.accepted();
            if (recognizer instanceof NativePanGestureRecognizer) {
              listener.clear(NativeEventListenerFlags.TrackMove | NativeEventListenerFlags.PreventDefault);
            } else {
              listener.set(NativeEventListenerFlags.PreventDefault);
            }
            break;
          }
        }
        for (i = 0; i < recognizers.length; i++) {
          const recognizer = recognizers[i];
          if (recognizer !== acceptedRecognizer && (recognizer.state & GestureRecognizerState.Active)) {
            activeRecognizersCounter--;
            recognizer.state &= ~GestureRecognizerState.Active;
            recognizer.rejected();
          }
        }
      }
    }

    if (activeRecognizersCounter === 0) {
      for (const recognizer of recognizers) {
        recognizer.reset();
      }
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
    (recognizer: GestureRecognizer<any>, action: GestureConflictResolverAction) => {
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
              r.state &= ~GestureRecognizerState.Active;
              activeRecognizersCounter--;
              if (r.state & GestureRecognizerState.Resolved) {
                resolvedRecognizersCounter--;
              }
              r.rejected();
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
