import { Box } from "../core";
import { NodeFlags } from "./node_flags";
import { OpState } from "./state";
import { getDOMNode, VisitNodesDirective, visitNodes } from "./reconciler";
import { Component } from "./component";
import { useReducer } from "./hooks";

/**
 * findDOMNode finds a closest DOM node.
 *
 * @typeparam T DOM Node type.
 * @param box Boxed op node state.
 * @returns DOM Node or a `null` value.
 */
export const findDOMNode = <T extends Node>(
  box: Box<OpState | null>,
) => box.v === null ? null : getDOMNode<T>(box.v);

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

/**
 * reducer creates a state reducer hook.
 *
 * @typeparam T State type.
 * @typeparam U Reducer type.
 * @param reducerFn Reducer function.
 * @param initialState Initial state.
 * @returns State reducer hook.
 */
export const reducer = <T, U>(reducerFn: (state: T, action: U) => T, initialState: T) => (
  (component: Component) => useReducer(component, reducerFn, initialState)
);
