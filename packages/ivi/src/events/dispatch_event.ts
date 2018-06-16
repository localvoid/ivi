import { EventHandlerFlags, EventFlags, SyntheticEventFlags } from "./flags";
import { DispatchTarget } from "./dispatch_target";
import { EventHandler } from "./event_handler";
import { SyntheticEvent } from "./synthetic_event";

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
  dispatch?: (h: EventHandler, ev: SyntheticEvent) => EventFlags | void,
): void {
  let i = targets.length;

  // capture phase
  while (--i >= 0) {
    dispatchEventToLocalEventHandlers(targets[i], event, EventHandlerFlags.Capture, dispatch);
    if (event.flags & SyntheticEventFlags.StoppedPropagation) {
      return;
    }
  }

  // bubble phase
  if (bubble) {
    while (++i < targets.length) {
      dispatchEventToLocalEventHandlers(targets[i], event, EventHandlerFlags.Bubble, dispatch);
      if (event.flags & SyntheticEventFlags.StoppedPropagation) {
        return;
      }
    }
  }
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
  dispatch: ((h: EventHandler, ev: SyntheticEvent) => EventFlags | void) | undefined,
): void {
  const handlers = target.handlers;
  let flags: EventFlags = 0;

  if (handlers instanceof Array) {
    for (const handler of handlers) {
      if (handler.flags & matchFlags) {
        flags |= _dispatch(handler, dispatch, event);
      }
    }
  } else if (handlers.flags & matchFlags) {
    flags = _dispatch(handlers, dispatch, event);
  }

  event.flags |= flags;
}

function _dispatch(
  handler: EventHandler,
  dispatch: ((h: EventHandler, ev: SyntheticEvent) => EventFlags | void) | undefined,
  event: SyntheticEvent,
): EventFlags {
  const flags = (dispatch === void 0) ? handler.handler(event) : dispatch(handler, event);
  if (DEBUG) {
    if (flags !== void 0) {
      if (flags & ~(EventFlags.PreventDefault | EventFlags.StopPropagation)) {
        throw new Error(`Invalid event flags: ${flags}`);
      }
    }
  }
  return (flags === void 0) ? 0 : flags;
}
