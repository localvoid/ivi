import { StateNode } from "./state";
import { useSelect } from "./hooks";

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
): (stateNode: StateNode) => () => T;

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
  s: (props: P, context: undefined, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (stateNode: StateNode) => undefined extends P ? () => T : (props: P) => T;

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
export function selector<T, P, C>(
  s: (props: P, context: C, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (stateNode: StateNode) => undefined extends P ? () => T : (props: P) => T;

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
export function selector<T, P, C>(
  s: (props: P, context: C, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (c: StateNode) => undefined extends P ? () => T : (props: P) => T {
  return (stateNode: StateNode) => useSelect(stateNode, s, shouldUpdate);
}
