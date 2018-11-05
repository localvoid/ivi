import { Component } from "./component";
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
 *       return (entry) => div().t(getEntryTitle(entry));
 *     });
 *
 * @param s - Selector function.
 * @param shouldUpdate - Should update function.
 * @returns selector factory.
 */
export const selector = <T, P, C>(
  s: (props: P, context: C, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
) => (c: Component) => useSelect(c, s, shouldUpdate);
