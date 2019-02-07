import { DispatchTarget } from "./dispatch_target";
import { EventHandlerNode, EventHandler } from "./event_handler";
import { NodeFlags } from "../vdom/node_flags";
import { OpState } from "../vdom/state";
import { findRoot } from "../vdom/root";
import { OpNode, EventsData } from "../vdom/operations";

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
  match: (h: EventHandlerNode) => boolean,
): void {
  const root = findRoot((r) => r.container!.contains(target));
  if (root) {
    const container = root.container;
    if (container !== target) {
      visitUp(result, match, target, container!, root.state);
    }
  }
}

function visitUp(
  result: DispatchTarget[],
  match: (h: EventHandlerNode) => boolean,
  element: Element,
  root: Element,
  stateNode: OpState | null,
): OpState | null {
  const parentElement = element.parentNode! as Element;
  return (parentElement === root || (stateNode = visitUp(result, match, parentElement, root, stateNode)) !== null) ?
    visitDown(result, match, element, stateNode!) :
    null;
}

function visitDown(
  result: DispatchTarget[],
  match: (h: EventHandlerNode) => boolean,
  element: Element,
  stateNode: OpState | null,
): OpState | null {
  if (stateNode !== null) {
    const { f, c } = stateNode;
    let r;
    if ((f & NodeFlags.Element) !== 0) {
      if (stateNode.s === element) {
        return stateNode;
      }
      if (c !== null) {
        return visitDown(result, match, element, c as OpState);
      }
    } else if ((f & (NodeFlags.Events | NodeFlags.Component | NodeFlags.Context)) !== 0) {
      if ((r = visitDown(result, match, element, stateNode.c as OpState)) !== null) {
        if ((f & NodeFlags.Events) !== 0) {
          accumulateDispatchTargetsFromEventsOpNode(result, stateNode, (stateNode.o as OpNode<EventsData>).d.v, match);
        }
        return r;
      }
    } else if ((f & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
      for (let i = 0; i < (c as OpState[]).length; i++) {
        if ((r = visitDown(result, match, element, (c as OpState[])[i])) !== null) {
          return r;
        }
      }
    }
  }

  return null;
}

/**
 * accumulateDispatchTargetsFromElement accumulates matching Event Handlers in `result` array from the `target`
 * operation state.
 *
 * @param result Accumulated Dispatch Targets.
 * @param t Target operation state.
 * @param h Event handler.
 * @param match Matching function.
 */
function accumulateDispatchTargetsFromEventsOpNode(
  result: DispatchTarget[],
  t: OpState,
  h: EventHandler,
  match: (h: EventHandlerNode) => boolean,
): void {
  if (h !== null) {
    if (h instanceof Array) {
      for (let i = 0; i < h.length; ++i) {
        accumulateDispatchTargetsFromEventsOpNode(result, t, h[i], match);
      }
    } else if (match(h) === true) {
      result.push({ t, h });
    }
  }
}
