import { DispatchTarget } from "./dispatch_target";
import { EventHandler } from "./event_handler";
import { VNodeFlags, VNode } from "../vdom/vnode";
import { ROOTS } from "../vdom/root";

/**
 * accumulateDispatchTargets traverses the DOM tree from the `target` Element to the document top, then goes down
 * through Virtual DOM tree and accumulates matching Event Handlers in `result` array.
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
  for (let i = 0; i < ROOTS.length; i++) {
    const { container, current } = ROOTS[i];
    if (container.contains(target)) {
      visitUp(result, match, target, container, current!);
      break;
    }
  }
}

function visitUp(
  result: DispatchTarget[],
  match: (h: EventHandler) => boolean,
  element: Element,
  root: Element,
  vnode: VNode | null,
): VNode | null {
  const parent = element.parentNode! as Element;
  if (parent !== root) {
    vnode = visitUp(result, match, parent, root, vnode);

    if (vnode !== null &&
      (vnode._f & (VNodeFlags.Children | VNodeFlags.Component | VNodeFlags.UpdateContext)) !== 0) {
      let child = vnode._c;
      while (child !== null) {
        const r = visitDown(result, match, element, child as VNode);
        if (r) {
          return r;
        }
        child = (child as VNode)._r;
      }
    }
    return null;
  }

  return visitDown(result, match, element, vnode!);
}

function visitDown(
  result: DispatchTarget[],
  match: (h: EventHandler) => boolean,
  element: Element,
  vnode: VNode,
): VNode | null {
  const flags = vnode._f;
  let r;
  if ((flags & VNodeFlags.Element) !== 0) {
    if (vnode._i === element) {
      accumulateDispatchTargetsFromVNode(result, vnode, match);
      return vnode;
    }
  } else if ((flags & (VNodeFlags.Component | VNodeFlags.UpdateContext)) !== 0) {
    r = visitDown(result, match, element, vnode._c as VNode);
    if (r) {
      accumulateDispatchTargetsFromVNode(result, vnode, match);
      return r;
    }
  }

  return null;
}

/**
 * accumulateDispatchTargetsFromElement accumulates matching Event Handlers in `result` array from the `target`
 * Virtual DOM Element.
 *
 * @param result Accumulated Dispatch Targets.
 * @param target Target Virtual DOM Element.
 * @param match Matching function.
 */
function accumulateDispatchTargetsFromVNode(
  result: DispatchTarget[],
  target: VNode,
  match: (h: EventHandler) => boolean,
): void {
  const events = target._e;
  if (events !== null) {
    let handlers: EventHandler[] | EventHandler | undefined;
    if (events instanceof Array) {
      let count = 0;
      for (let i = 0; i < events.length; i++) {
        const h = events[i];
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
