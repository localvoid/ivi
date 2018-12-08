import { OpState } from "./state";
import { useSelect } from "./hooks";
import { getDOMNode } from "./reconciler";
import { Box } from "ivi-shared";

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
 * @param s Selector function.
 * @param shouldUpdate Should update function.
 * @returns Selector factory.
 */
export function selector<T>(
  s: () => T,
): (stateNode: OpState) => () => T;

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
 * @param s Selector function.
 * @param shouldUpdate Should update function.
 * @returns Selector factory.
 */
export function selector<T, P>(
  s: (props: P, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (stateNode: OpState) => undefined extends P ? () => T : (props: P) => T;

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
 * @param s Selector function.
 * @param shouldUpdate Should update function.
 * @returns Selector factory.
 */
export function selector<T, P>(
  s: (props: P, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (stateNode: OpState) => undefined extends P ? () => T : (props: P) => T;

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
 * @param s Selector function.
 * @param shouldUpdate Should update function.
 * @returns Selector factory.
 */
export function selector<T, P>(
  s: (props: P, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (c: OpState) => undefined extends P ? () => T : (props: P) => T {
  return (stateNode: OpState) => useSelect(stateNode, s, shouldUpdate);
}

/**
 * findDOMNode finds a closest DOM node.
 *
 * @param box Boxed op node state.
 * @returns DOM Node or a `null` value.
 */
export const findDOMNode = <T extends Node>(
  box: Box<OpState | null>,
) => box.v === null ? null : getDOMNode(box.v) as T;
