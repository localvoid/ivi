import { nodeGetParentElement } from "ivi-dom";
import { EventHandler } from "./event_handler";
import { DispatchTarget } from "./dispatch";
import { getEventHandlersFromDOMNode } from "./utils";

/**
 * accumulateDispatchTargetsFromElement accumulates matching Event Handlers in `result` array from the `target` Element.
 *
 * @param result Accumulated Dispatch Targets.
 * @param target Target Element.
 * @param match Matching function.
 */
export function accumulateDispatchTargetsFromElement(
  result: DispatchTarget[],
  target: Element,
  match: (h: EventHandler) => boolean,
): void {
  const events = getEventHandlersFromDOMNode(target);
  if (events !== null && events !== undefined) {
    let matches: EventHandler[] | EventHandler | undefined;
    if (typeof events === "function") {
      if (match(events) === true) {
        matches = events;
      }
    } else {
      let count = 0;
      for (let i = 0; i < events.length; ++i) {
        const h = events[i];
        if (h !== null && match(h) === true) {
          if (count === 0) {
            matches = h;
          } else if (count === 1) {
            matches = [matches as EventHandler, h];
          } else {
            (matches as EventHandler[]).push(h);
          }
          ++count;
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
 * accumulateDispatchTargets traverses the DOM tree from the `target` Element to the document top and accumulates
 * matching Event Handlers in `result` array.
 *
 * @param result Accumulated Dispatch Targets.
 * @param target Target DOM Element.
 * @param match Matching function.
 */
export function accumulateDispatchTargets(
  result: DispatchTarget[],
  target: Element | null,
  match: (h: EventHandler) => boolean,
): void {
  while (target !== null) {
    accumulateDispatchTargetsFromElement(result, target, match);
    target = nodeGetParentElement(target);
  }
}
