import { DispatchTarget } from "./dispatch_target";
import { EventHandler } from "./event_handler";
import { VNodeFlags } from "../vdom/flags";
import { VNode } from "../vdom/vnode";
import { ROOTS } from "../vdom/root";

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
  target: Element,
  match: (h: EventHandler) => boolean,
): void {
  // Find a root element that contains a `target` node.
  for (const root of ROOTS) {
    const container = root.container;
    if (container.contains(target)) {
      // Build an array with all parent elements.
      const domTargets: Element[] = [];
      while (target !== container) {
        domTargets.push(target!);
        target = target.parentNode! as Element;
      }
      // Visit virtual DOM nodes that correspond to the list of all parent elements that were extracted from `target`.
      visitMatchingDOMTargets(result, match, root.currentVNode!, domTargets, domTargets.length - 1);
      break;
    }
  }
}

function visitMatchingDOMTargets(
  result: DispatchTarget[],
  match: (h: EventHandler) => boolean,
  vnode: VNode,
  nodes: Element[],
  index: number,
): 0 | 1 {
  const flags = vnode._f;
  if (flags & (VNodeFlags.Element | VNodeFlags.ElementFactory)) {
    if (vnode._i === nodes[index]) {
      if (index === 0) {
        accumulateDispatchTargetsFromVNode(result, vnode, match);
        return 1;
      } else {
        --index;
        let child = vnode._c as VNode | null;
        while (child !== null) {
          if (visitMatchingDOMTargets(result, match, child, nodes, index)) {
            accumulateDispatchTargetsFromVNode(result, vnode, match);
            return 1;
          }
          child = child._r;
        }
      }
    }
  } else if (flags & (
    VNodeFlags.StatelessComponent |
    VNodeFlags.StatefulComponent |
    VNodeFlags.Connect |
    VNodeFlags.UpdateContext
  )) {
    if (visitMatchingDOMTargets(result, match, vnode._c as VNode, nodes, index)) {
      accumulateDispatchTargetsFromVNode(result, vnode, match);
      return 1;
    }
  }

  return 0;
}

/**
 * accumulateDispatchTargetsFromElement accumulates matching Event Handlers in `result` array from the `target` Element.
 *
 * @param result Accumulated Dispatch Targets.
 * @param target Target Element.
 * @param match Matching function.
 */
function accumulateDispatchTargetsFromVNode(
  result: DispatchTarget[],
  target: VNode,
  match: (h: EventHandler) => boolean,
): void {
  const events = target._e;
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
