import { EventHandlerFlags, SyntheticEventFlags } from "./flags";
import { EventHandler } from "./event_handler";
import { SyntheticEvent } from "./synthetic_event";
import { DispatchTarget } from "./dispatch_target";

/**
 * Dispatch event to local(on the same DOM Node) Event Handlers.
 *
 * @param target Dispatch Target.
 * @param event Synthetic Event.
 * @param matchFlags Flags that should match to deliver event.
 */
function dispatchEventToLocalEventHandlers(
    target: DispatchTarget,
    event: SyntheticEvent,
    matchFlags: EventHandlerFlags,
    dispatch: ((h: EventHandler, ev: SyntheticEvent) => void) | undefined,
): void {
    const handlers = target.handlers;

    if (typeof handlers === "function") {
        if ((handlers.flags & matchFlags) !== 0) {
            if (dispatch === undefined) {
                handlers(event);
            } else {
                dispatch(handlers, event);
            }
        }
    } else {
        for (let j = 0; j < handlers.length; j++) {
            const handler = handlers[j];
            if ((handler.flags & matchFlags) !== 0) {
                if (dispatch === undefined) {
                    handler(event);
                } else {
                    dispatch(handler, event);
                }
            }
        }
    }
}

/**
 * Dispatch event to Dispatch Targets.
 *
 * Simplified version of w3 Events flow algorithm. This algorithm doesn't include target phase, only capture and
 * bubbling phases. We don't care too much about w3 events compatibility, and there aren't any use cases that require
 * target phase.
 *
 * https://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 *
 * @param targets Dispatch Targets.
 * @param event Event to dispatch.
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
        i = 0;
        event.flags |= SyntheticEventFlags.BubblePhase;
        while (i < targets.length) {
            dispatchEventToLocalEventHandlers(targets[i++], event, EventHandlerFlags.Bubble, dispatch);
            if ((event.flags & SyntheticEventFlags.StoppedPropagation) !== 0) {
                return;
            }
        }
    }
}
