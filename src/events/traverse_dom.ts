import { EventHandler } from "./event_handler";
import { EventSource } from "./event_source";
import { DispatchTarget } from "./dispatch_target";
import { getEventHandlersFromDOMNode } from "./utils";

/**
 * Accumulate Event Handlers that has a matching Event Source.
 *
 * @param result Result array.
 * @param target Target Element.
 * @param source Event Source.
 */
export function accumulateDispatchTargetsFromElement(
    result: DispatchTarget[],
    target: Element,
    source: EventSource,
): void {
    const events = getEventHandlersFromDOMNode(target);
    if (events !== null && events !== undefined) {
        let matches: EventHandler[] | EventHandler | undefined;
        if (typeof events === "function") {
            if (events.source === source) {
                matches = events;
            }
        } else {
            let count = 0;
            for (let i = 0; i < events.length; i++) {
                const h = events[i];
                if (h !== null && h.source === source) {
                    if (count === 0) {
                        matches = h;
                    } else if (count === 1) {
                        matches = [matches as EventHandler, h];
                    } else {
                        (matches as EventHandler[]).push(h);
                    }
                    count++;
                }
            }
        }
        if (matches !== undefined) {
            result.push({
                target: target,
                handlers: matches,
            });
        }
    }
}

/**
 * Traverses the DOM tree from the target Element to the document top and accumulates Dispatch Targets that has matching
 * Event Source.
 *
 * @param result Result array.
 * @param target DOM Element.
 * @param source Event Source.
 */
export function accumulateDispatchTargets(
    result: DispatchTarget[],
    target: Element | null,
    source: EventSource,
): void {
    while (target !== null) {
        accumulateDispatchTargetsFromElement(result, target, source);
        target = target.parentElement;
    }
}
