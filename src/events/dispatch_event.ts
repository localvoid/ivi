import { EventHandlerFlags, SyntheticEventFlags } from "./flags";
import { SyntheticEvent } from "./synthetic_event";
import { DispatchTarget } from "./traverse_dom";

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

    for (let j = 0; j < dispatchTarget.handlers.length; j++) {
        const handler = dispatchTarget.handlers[j];
        if ((handler.flags & matchFlags) !== 0) {
            handler(event);
            if ((event._flags & SyntheticEventFlags.StoppedImmediatePropagation) !== 0) {
                return;
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
    dispatchTargets: DispatchTarget[],
    event: E,
    bubble: boolean,
): void {
    let i = dispatchTargets.length - 1;
    let dispatchTarget;

    // capture phase
    while (i >= 0) {
        dispatchTarget = dispatchTargets[i];
        if (dispatchTarget.target !== event.target) {
            dispatchEventToLocalEventHandlers(dispatchTargets[i--], event, EventHandlerFlags.Capture);
            if ((event._flags & SyntheticEventFlags.StoppedPropagation) !== 0) {
                return;
            }
        } else {
            break;
        }
    }

    // target phase
    dispatchTarget = dispatchTargets[0];
    if (dispatchTarget.target === event.target) {
        event._flags |= SyntheticEventFlags.AtTargetPhase;
        dispatchEventToLocalEventHandlers(
            dispatchTarget,
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
        while (i < dispatchTargets.length) {
            dispatchEventToLocalEventHandlers(dispatchTargets[i++], event, EventHandlerFlags.Bubble);
            if ((event._flags & SyntheticEventFlags.StoppedPropagation) !== 0) {
                return;
            }
        }
    }
}
