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
export function selector<T, P, C>(
  s: (props: P, context: C, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (c: Component) => undefined extends P ? () => T : (props: P) => T {
  return (c: Component) => useSelect(c, s, shouldUpdate);
}

/**
 * mutation creates a mutation factory.
 *
 * @example
 *
 *     interface Entry {
 *       _dirty: number;
 *       title: string;
 *     }
 *     const m = mutation((entry: Entry) => { entry._dirty = dirty(); });
 *     const useEntry = selector((entry: Entry) => entry._dirty);
 *     const entrySetTitle = m((entry: Entry, title: string) => { entry.title = title; });
 *
 *     const EntryView = component<Entry>((c) => {
 *       const dirtyCheckEntry = useEntry(c);
 *
 *       return (entry) => div().t(entry.title);
 *     });
 *
 * @param s - Selector function.
 * @param shouldUpdate - Should update function.
 * @returns selector factory.
 */
export function mutation<T, U extends any[], V>(m: (v: T, flags?: V) => void):
  (fn: (v: T, ...args: U) => void) => (v: T, ...args: U) => void | V {
  return (fn: (v: T, ...args: U) => void | V) => {
    return function () {
      const r = fn.apply(void 0, arguments);
      if (r === void 0 || r > 0) {
        m(arguments[0], r);
      }
    };
  };
}
