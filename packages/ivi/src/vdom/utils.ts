import { Box } from "../core";
import { NodeFlags } from "./node_flags";
import { OpState } from "./state";
import { Component } from "./component";
import { useSelect } from "./hooks";
import { getDOMNode, VisitNodesDirective, visitNodes } from "./reconciler";

/**
 * selector creates a selector factory.
 *
 * @example
 *
 *     interface Entry {
 *       title: string;
 *     }
 *     const useEntryTitle = selector((entry: Entry) => entry.title);
 *
 *     const EntryView = component<Entry>((c) => {
 *       const getEntryTitle = useEntryTitle(c);
 *
 *       return (entry) => div(_, _, getEntryTitle(entry));
 *     });
 *
 * @typename T Selector value type.
 * @param s Selector function.
 * @returns Selector factory.
 */
export function selector<T>(
  s: () => T,
): (component: Component) => () => T;

/**
 * selector creates a selector factory.
 *
 * @example
 *
 *     interface Entry {
 *       title: string;
 *     }
 *     const useEntryTitle = selector((entry: Entry) => entry.title);
 *
 *     const EntryView = component<Entry>((c) => {
 *       const getEntryTitle = useEntryTitle(c);
 *
 *       return (entry) => div(_, _, getEntryTitle(entry));
 *     });
 *
 * @typename T Selector value type.
 * @param s Selector function.
 * @param shouldUpdate Should update function.
 * @returns Selector factory.
 */
export function selector<T, P>(
  s: (props: P, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (component: Component) => undefined extends P ? () => T : (props: P) => T;

export function selector<T, P>(
  s: (props: P, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (component: Component) => undefined extends P ? () => T : (props: P) => T {
  return (component: Component) => useSelect(component, s, shouldUpdate);
}

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
  visitNodes(parent, (node) => {
    if ((node.f & NodeFlags.Element) !== 0) {
      return ((node.s as Element).contains(element)) === true ?
        (result = true, VisitNodesDirective.StopImmediate) :
        VisitNodesDirective.Stop;
    }
    return VisitNodesDirective.Continue;
  });
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
  visitNodes(parent, (node) => {
    if ((node.f & NodeFlags.Element) !== 0) {
      return (node.s === child) ?
        (result = true, VisitNodesDirective.StopImmediate) :
        VisitNodesDirective.Stop;
    }
    return VisitNodesDirective.Continue;
  });
  return result;
}
