import { EventDispatcher } from "./event_dispatcher";
import { EventHandler } from "./event_handler";
import { getEventHandlerListFromDOMNode } from "./utils";

/**
 * Dispatch Target.
 */
export interface DispatchTarget {
    /**
     * Target Element.
     */
    target: Element;
    /**
     * Matched Event Handlers.
     */
    handlers: EventHandler<any>[];
}

/**
 * Accumulate Event Handlers that has a matching Event Dispatcher.
 *
 * @param result Result array.
 * @param target Target Element.
 * @param dispatcher Event Dispatcher.
 */
export function accumulateDispatchTargetsFromElement(
    result: DispatchTarget[],
    target: Element,
    dispatcher: EventDispatcher,
): void {
    const events = getEventHandlerListFromDOMNode(target);
    if (events) {
        let matches: EventHandler[] | undefined;
        if (typeof events === "function") {
            if (events.dispatcher === dispatcher) {
                matches = [events];
            }
        } else {
            for (let i = 0; i < events.length; i++) {
                const h = events[i];
                if (h && h.dispatcher === dispatcher) {
                    if (!matches) {
                        matches = [h];
                    } else {
                        matches.push(h);
                    }
                }
            }
        }
        if (matches) {
            result.push({
                target: target,
                handlers: matches,
            });
        }
    }
}

/**
 * Traverses the DOM tree from the target Element to the document top and accumulates Dispatch Targets that has matching
 * Event Dispatcher.
 *
 * @param target DOM Element.
 * @param dispatcher Event Dispatcher instance.
 * @returns An array of Dispatch Targets.
 */
export function accumulateDispatchTargets(
    target: Element | null,
    dispatcher: EventDispatcher,
): DispatchTarget[] {
    const result: DispatchTarget[] = [];

    while (target) {
        accumulateDispatchTargetsFromElement(result, target, dispatcher);
        target = target.parentElement;
    }

    return result;
}
