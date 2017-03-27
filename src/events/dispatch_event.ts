import { EventHandlerFlags, SyntheticEventFlags } from "./flags";
import { SyntheticEvent } from "./synthetic_event";
import { DispatchTarget } from "./dispatch_target";

/**
 * Dispatch event to local(on the same DOM Node) Event Handlers.
 *
 * It will stop dispatching when event has `StopImmediatePropagation` flag.
 *
 * @param localHandlers Local Event Handlers.
 * @param event Synthetic Event.
 */
function dispatchEventToLocalEventHandlers<E extends SyntheticEvent<any>>(
    dispatchTarget: DispatchTarget,
    event: E,
    matchFlags: EventHandlerFlags,
): void {
    event.currentTarget = dispatchTarget.target;
    const handlers = dispatchTarget.handlers;

    if (typeof handlers === "function") {
        if ((handlers.flags & matchFlags) !== 0) {
            handlers(event);
        }
    } else {
        for (let j = 0; j < handlers.length; j++) {
            const handler = handlers[j];
            if ((handler.flags & matchFlags) !== 0) {
                handler(event);
                if ((event._flags & SyntheticEventFlags.StoppedImmediatePropagation) !== 0) {
                    return;
                }
            }
        }
    }
}

/**
 * Dispatch event to Dispatch Targets.
 *
 * https://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 *
 * @param dispatchTarget Dispatch Targets.
 * @param event Event to dispatch.
 */
export function dispatchEvent<E extends SyntheticEvent<any>>(
    targets: DispatchTarget[],
    event: E,
    bubble: boolean,
): void {
    let i = targets.length - 1;
    let target;

    // capture phase
    while (i >= 0) {
        target = targets[i];
        if (target.target !== event.target) {
            dispatchEventToLocalEventHandlers(targets[i--], event, EventHandlerFlags.Capture);
            if ((event._flags & SyntheticEventFlags.StoppedPropagation) !== 0) {
                return;
            }
        } else {
            break;
        }
    }

    // target phase
    target = targets[0];
    if (target.target === event.target) {
        event._flags |= SyntheticEventFlags.AtTargetPhase;
        dispatchEventToLocalEventHandlers(
            target,
            event,
            EventHandlerFlags.Capture | EventHandlerFlags.Bubble,
        );
        if ((event._flags & SyntheticEventFlags.StoppedPropagation) !== 0) {
            return;
        }
        event._flags &= ~SyntheticEventFlags.AtTargetPhase;
        i = 1;
    } else {
        i = 0;
    }

    // bubble phase
    if (bubble === true) {
        event._flags |= SyntheticEventFlags.BubblePhase;
        while (i < targets.length) {
            dispatchEventToLocalEventHandlers(targets[i++], event, EventHandlerFlags.Bubble);
            if ((event._flags & SyntheticEventFlags.StoppedPropagation) !== 0) {
                return;
            }
        }
    }
}
