import { DispatchTarget } from "./dispatch_target";
import { EventHandler } from "./event_handler";
import { NodeFlags } from "../vdom/node_flags";
import { OpState } from "../vdom/state";
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
  stateNode: OpState | null,
): OpState | null {
  const parentElement = element.parentNode! as Element;
  return (parentElement === root || (stateNode = visitUp(result, match, parentElement, root, stateNode)) !== null) ?
    visitDown(result, match, element, stateNode!) :
    null;
}

function visitDown(
  result: DispatchTarget[],
  match: (h: EventHandler) => boolean,
  element: Element,
  stateNode: OpState | null,
): OpState | null {
  if (stateNode === null) {
    return null;
  }
  const { f, c } = stateNode;
  let r;
  if ((f & NodeFlags.Element) !== 0) {
    if (stateNode.s === element) {
      return stateNode;
    }
    if (c !== null) {
      return visitDown(result, match, element, c as OpState);
    }
  } else if ((f & (NodeFlags.Events | NodeFlags.Component | NodeFlags.Context | NodeFlags.Ref)) !== 0) {
    if ((r = visitDown(result, match, element, stateNode.c as OpState)) !== null) {
      if ((f & NodeFlags.Events) !== 0) {
        accumulateDispatchTargetsFromEventsOpNode(result, stateNode, match);
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

  return null;
}

/**
 * accumulateDispatchTargetsFromElement accumulates matching Event Handlers in `result` array from the `target`
 * Virtual DOM Element.
 *
 * @param result Accumulated Dispatch Targets.
 * @param t Target Virtual DOM Element.
 * @param match Matching function.
 */
function accumulateDispatchTargetsFromEventsOpNode(
  result: DispatchTarget[],
  t: OpState,
  match: (h: EventHandler) => boolean,
): void {
  const events = (t.o as OpNode<OpData>).d.v;
  if (events !== null) {
    let h: EventHandler[] | EventHandler | undefined;
    if (events instanceof Array) {
      let count = 0;
      for (let i = 0; i < events.length; i++) {
        const ev = events[i];
        if (ev !== null && match(ev) === true) {
          if (count === 0) {
            h = ev;
          } else if (count === 1) {
            h = [h as EventHandler, ev];
          } else {
            (h as EventHandler[]).push(ev);
          }
          ++count;
        }
      }
    } else if (match(events) === true) {
      h = events;
    }
    if (h !== void 0) {
      result.push({ t, h });
    }
  }
}
