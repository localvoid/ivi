import { DispatchTarget } from "./dispatch_target";
import { EventHandler } from "./event_handler";
import { NodeFlags } from "../vdom/node_flags";
import { OpNodeState } from "../vdom/state";
import { ROOTS } from "../vdom/root";
import { OpNode, OpData } from "../vdom/operations";

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
    const { container, state } = ROOTS[i];
    if (container.contains(target)) {
      if (container !== target) {
        visitUp(result, match, target, container, state!);
      }
      break;
    }
  }
}

function visitUp(
  result: DispatchTarget[],
  match: (h: EventHandler) => boolean,
  element: Element,
  root: Element,
  stateNode: OpNodeState | null,
): OpNodeState | null {
  const parentElement = element.parentNode! as Element;
  return (parentElement === root || (stateNode = visitUp(result, match, parentElement, root, stateNode)) !== null) ?
    visitDown(result, match, element, stateNode!) :
    null;
}

function visitDown(
  result: DispatchTarget[],
  match: (h: EventHandler) => boolean,
  element: Element,
  stateNode: OpNodeState | null,
): OpNodeState | null {
  if (stateNode === null) {
    return null;
  }
  const { flags, children } = stateNode;
  let r;
  if ((flags & NodeFlags.Element) !== 0) {
    if (stateNode.state === element) {
      return stateNode;
    }
    if (children !== null) {
      return visitDown(result, match, element, children as OpNodeState);
    }
  } else if ((flags & (NodeFlags.Events | NodeFlags.Component | NodeFlags.Context | NodeFlags.Ref)) !== 0) {
    if ((r = visitDown(result, match, element, stateNode.children as OpNodeState)) !== null) {
      if ((flags & NodeFlags.Events) !== 0) {
        accumulateDispatchTargetsFromEventsOpNode(result, stateNode, match);
      }
      return r;
    }
  } else if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
    for (let i = 0; i < (children as OpNodeState[]).length; i++) {
      if ((r = visitDown(result, match, element, (children as OpNodeState[])[i])) !== null) {
        return r;
      }
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
function accumulateDispatchTargetsFromEventsOpNode(
  result: DispatchTarget[],
  target: OpNodeState,
  match: (h: EventHandler) => boolean,
): void {
  const events = (target.op as OpNode<OpData>).data.data;
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
    } else if (match(events) === true) {
      handlers = events;
    }
    if (handlers !== void 0) {
      result.push({ target, handlers });
    }
  }
}
