import { Box } from "ivi-shared";
import { OpState } from "./state";
import { Component } from "./component";
import { useSelect } from "./hooks";
import { getDOMNode } from "./reconciler";

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
 * interface Entry {
 *   title: string;
 * }
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
