import { EventHandler } from "./event_handler";
import { DispatchTarget } from "./dispatch";

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
  const events = target._ev;
  if (events) {
    let handlers: EventHandler[] | EventHandler | undefined;
    if (Array.isArray(events)) {
      let count = 0;
      for (const h of events) {
        if (h !== null && match(h) === true) {
          if (count === 0) {
            handlers = h;
          } else if (count === 1) {
            handlers = [handlers as EventHandler, h];
          } else {
            (handlers as EventHandler[]).push(h);
          }
          ++count;
        }
      }
    } else {
      if (match(events) === true) {
        handlers = events;
      }
    }
    if (handlers !== void 0) {
      result.push({ target, handlers });
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
    target = target.parentElement;
  }
}
