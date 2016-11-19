import { nodeDepth } from "../common/dom";
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
    dispatcher: EventDispatcher<any>,
): void {
    const events = getEventHandlerListFromDOMNode(target);
    if (events) {
        let matches: EventHandler<any>[] | undefined;
        const keys = Object.keys(events);
        for (let i = 0; i < keys.length; i++) {
            const ev = events[keys[i]];
            if (ev.dispatcher === dispatcher) {
                if (!matches) {
                    matches = [ev];
                } else {
                    matches.push(ev);
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
    dispatcher: EventDispatcher<any>,
): DispatchTarget[] {
    const result: DispatchTarget[] = [];

    while (target) {
        accumulateDispatchTargetsFromElement(result, target, dispatcher);
        target = target.parentElement;
    }

    return result;
}

/**
 * Dispatch targets beneath common ancestor.
 */
export interface DispatchTargetsWithCommonAncestor {
    /**
     * Left subtree.
     */
    a: DispatchTarget[];
    /**
     * Right subtree.
     */
    b: DispatchTarget[];
}

/**
 * Traverses the DOM from the two targets and accumulates Dispatch Targets that has matching Event Dispatchers until it
 * finds the common ancestor.
 *
 * @param a Left element.
 * @param b Right element.
 * @param aDispatcher Left Event Dispatcher.
 * @param bDispatcher Right Event Dispatcher.
 * @returns Object with a collection of DispatchTargets for left and right subtree.
 */
export function accumulateDispatchTargetsUntilCommonAncestor(
    a: Element,
    b: Element,
    aDispatcher: EventDispatcher<any>,
    bDispatcher: EventDispatcher<any>,
): DispatchTargetsWithCommonAncestor {

    const result: DispatchTargetsWithCommonAncestor = {
        a: [],
        b: [],
    };

    let aDepth = nodeDepth(a);
    let bDepth = nodeDepth(b);

    while (aDepth - bDepth > 0) {
        accumulateDispatchTargetsFromElement(result.a, a, aDispatcher);
        a = a.parentNode as Element;
        aDepth--;
    }

    while (bDepth - aDepth > 0) {
        accumulateDispatchTargetsFromElement(result.b, b, bDispatcher);
        b = b.parentNode as Element;
        bDepth--;
    }

    while (aDepth-- > 0) {
        if (a === b) {
            break;
        }
        accumulateDispatchTargetsFromElement(result.a, a, aDispatcher);
        accumulateDispatchTargetsFromElement(result.b, b, bDispatcher);
        a = a.parentNode as Element;
        b = b.parentNode as Element;
    }

    return result;
}
