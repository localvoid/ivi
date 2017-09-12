import { EventHandlerFlags, SyntheticEventFlags } from "./flags";
import { EventHandler } from "./event_handler";
import { SyntheticEvent } from "./synthetic_event";

/**
 * DispatchTarget.
 */
export interface DispatchTarget {
  /**
   * Target.
   */
  target: any;
  /**
   * Matched Event Handlers.
   */
  handlers: EventHandler | EventHandler[];
}

/**
 * dispatchEventToLocalEventHandlers dispatches event to local(at the same DOM Node) event handlers.
 *
 * @param target Dispatch Target.
 * @param event Synthetic Event.
 * @param matchFlags Flags that should match to deliver event.
 * @param dispatch Dispatch callback.
 */
function dispatchEventToLocalEventHandlers(
  target: DispatchTarget,
  event: SyntheticEvent,
  matchFlags: EventHandlerFlags,
  dispatch: ((h: EventHandler, ev: SyntheticEvent) => void) | undefined,
): void {
  const handlers = target.handlers;

  if (handlers.constructor !== Array) {
    if (((handlers as EventHandler).flags & matchFlags) !== 0) {
      if (dispatch === undefined) {
        (handlers as EventHandler).handler(event);
      } else {
        dispatch((handlers as EventHandler), event);
      }
    }
  } else {
    for (let j = 0; j < (handlers as EventHandler[]).length; ++j) {
      const handler = (handlers as EventHandler[])[j];
      if ((handler.flags & matchFlags) !== 0) {
        if (dispatch === undefined) {
          handler.handler(event);
        } else {
          dispatch(handler, event);
        }
      }
    }
  }
}

/**
 * dispatchEvent dispatches event to the list of dispatch targets.
 *
 * Simplified version of w3 Events flow algorithm. This algorithm doesn't include target phase, only capture and
 * bubbling phases. We don't care too much about w3 events compatibility, and there aren't any use cases that require
 * target phase.
 *
 * https://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 *
 * @param targets Dispatch targets.
 * @param event Event to dispatch.
 * @param bubble Use bubbling phase.
 * @param dispatch Dispatch callback.
 */
export function dispatchEvent(
  targets: DispatchTarget[],
  event: SyntheticEvent,
  bubble: boolean,
  dispatch?: (h: EventHandler, ev: SyntheticEvent) => void,
): void {
  let i = targets.length - 1;
  let target;

  // capture phase
  while (i >= 0) {
    target = targets[i--];
    dispatchEventToLocalEventHandlers(target, event, EventHandlerFlags.Capture, dispatch);
    if ((event.flags & SyntheticEventFlags.StoppedPropagation) !== 0) {
      return;
    }
  }

  // bubble phase
  if (bubble === true) {
    event.flags |= SyntheticEventFlags.BubblePhase;
    for (i = 0; i < targets.length; ++i) {
      dispatchEventToLocalEventHandlers(targets[i], event, EventHandlerFlags.Bubble, dispatch);
      if ((event.flags & SyntheticEventFlags.StoppedPropagation) !== 0) {
        return;
      }
    }
  }
}
