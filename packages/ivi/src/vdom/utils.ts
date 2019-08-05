import { Box } from "../core";
import { NodeFlags } from "./node_flags";
import { OpState } from "./state";
import { getDOMNode, VisitNodesDirective, visitNodes } from "./reconciler";

/**
 * findDOMNode finds a closest DOM node.
 *
 * @typeparam T DOM Node type.
 * @param box Boxed op node state.
 * @returns DOM Node or a `null` value.
 */
export const findDOMNode = <T extends Node>(
  box: Box<OpState | null>,
) => box.v === null ? null : getDOMNode(box.v) as T;

/**
 * containsDOMElement returns `true` when `parent` contains a DOM element `element`.
 *
 * @param parent Op state node.
 * @param element DOM element.
 * @returns `true` when `parent` contains a DOM element `element`.
 */
export function containsDOMElement(parent: OpState, element: Element): boolean {
  let result = false;
  visitNodes(parent, (node) => (
    ((node.f & NodeFlags.Element) !== 0) ?
      (((node.s as Element).contains(element) === true) ?
        (result = true, VisitNodesDirective.StopImmediate) :
        VisitNodesDirective.Stop) :
      VisitNodesDirective.Continue
  ));
  return result;
}

/**
 * hasDOMElementChild returns `true` when `parent` has a DOM element child `child`.
 *
 * @param parent Op state node.
 * @param child DOM element.
 * @returns `true` when `parent` has a DOM element child `child`.
 */
export function hasDOMElementChild(parent: OpState, child: Element): boolean {
  let result = false;
  visitNodes(parent, (node) => (
    ((node.f & NodeFlags.Element) !== 0) ?
      ((node.s === child) ?
        (result = true, VisitNodesDirective.StopImmediate) :
        VisitNodesDirective.Stop) :
      VisitNodesDirective.Continue
  ));
  return result;
}
