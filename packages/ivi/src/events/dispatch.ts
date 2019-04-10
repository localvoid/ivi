import { NodeFlags } from "../vdom/node_flags";
import { OpState } from "../vdom/state";
import { findRoot } from "../vdom/root";
import { OpNode, EventsData } from "../vdom/operations";
import { EventHandlerFlags, EventHandler, EventHandlerNode } from "./event_handler";

/**
 * DispatchTarget.
 */
export interface DispatchTarget<H = any> {
  /**
   * Target.
   */
  readonly t: any;
  /**
   * Matched Event Handlers.
   */
  readonly h: EventHandlerNode<H>;
}

/**
 * collectDispatchTargets traverses the DOM tree from the `target` Element to the root element, then goes down
 * through Virtual DOM tree and accumulates matching Event Handlers in `result` array.
 *
 * @param result Accumulated Dispatch Targets.
 * @param target Target DOM Element.
 * @param match Matching event source.
 */
function collectDispatchTargets(target: Element, match: {}): DispatchTarget[] {
  const targets = [] as DispatchTarget[];
  const root = findRoot((r) => r.container!.contains(target));
  if (root) {
    const container = root.container;
    if (container !== target) {
      visitUp(targets, match, target, container!, root.state);
    }
  }

  return targets;
}

function visitUp(
  result: DispatchTarget[],
  match: {},
  element: Element,
  root: Element,
  stateNode: OpState | null,
): OpState | null {
  const parentElement = element.parentNode! as Element;
  return (parentElement === root || (stateNode = visitUp(result, match, parentElement, root, stateNode)) !== null) ?
    visitDown(result, match, element, stateNode!) :
    null;
}

function visitDown(result: DispatchTarget[], match: {}, element: Element, stateNode: OpState | null): OpState | null {
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
          collectDispatchTargetsFromEventsOpState(result, stateNode, (stateNode.o as OpNode<EventsData>).d.v, match);
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
 * collectDispatchTargetsFromEventsOpState accumulates matching Event Handlers in `result` array from the `target`
 * operation state.
 *
 * @param result Accumulated Dispatch Targets.
 * @param t Target operation state.
 * @param h Event handler.
 * @param match Matching function.
 */
function collectDispatchTargetsFromEventsOpState(
  result: DispatchTarget[],
  t: OpState,
  h: EventHandler,
  match: {},
): void {
  if (h !== null) {
    if (h instanceof Array) {
      for (let i = 0; i < h.length; ++i) {
        collectDispatchTargetsFromEventsOpState(result, t, h[i], match);
      }
    } else if (h.d.s === match) {
      result.push({ t, h });
    }
  }
}

/**
 * dispatchEvent dispatches event to the list of dispatch targets.
 *
 * Simplified version of w3 Events flow algorithm. This algorithm doesn't include target phase, only capture and
 * bubbling phases. We don't care too much about w3 events compatibility, and there aren't any use cases that require
 * target phase.
 *
 * https://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 *
 * @param src Event source.
 * @param targets Dispatch targets.
 * @param event Event to dispatch.
 * @param bubble Use bubbling phase.
 * @param dispatch Dispatch handler.
 */
export function dispatchEvent<E>(
  src: {},
  target: Element,
  event: E,
  bubble: boolean,
): void {
  const targets = collectDispatchTargets(target, src);
  let i = targets.length;
  let currentTarget;
  let descriptor;

  if (i > 0) {
    // capture phase
    while (--i >= 0) {
      currentTarget = targets[i];
      descriptor = currentTarget.h.d;
      if ((descriptor.f & EventHandlerFlags.Capture) !== 0) {
        if (descriptor.h(event, currentTarget, src) === true) {
          return;
        }
      }
    }

    // bubble phase
    if (bubble) {
      while (++i < targets.length) {
        currentTarget = targets[i];
        descriptor = currentTarget.h.d;
        if ((descriptor.f & EventHandlerFlags.Capture) === 0) {
          if (descriptor.h(event, currentTarget, src) === true) {
            return;
          }
        }
      }
    }
  }
}
