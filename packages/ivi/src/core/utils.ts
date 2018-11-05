/**
 * mut mutates an object.
 *
 * @example
 *
 *     interface Entry {
 *       _dirty: number;
 *       title: string;
 *     }
 *     const m = (entry: Entry) => { entry._dirty = dirty(); };
 *     const useEntry = selector((entry: Entry) => entry._dirty);
 *     const entrySetTitle = mut(m, (entry: Entry, title: string) => { entry.title = title; });
 *
 *     const EntryView = component<Entry>((c) => {
 *       const dirtyCheckEntry = useEntry(c);
 *
 *       return (entry) => (
 *         dirtyCheckEntry(entry),
 *
 *         div().t(entry.title)
 *       )
 *     });
 *
 * @param s - Selector function.
 * @param shouldUpdate - Should update function.
 * @returns selector factory.
 */
export const mut = <T, U extends any[], V>(d: (v: T, flags?: V) => void, fn: (v: T, ...args: U) => void | V) => (
  function () {
    const r = fn.apply(void 0, arguments);
    if (r === void 0 || r > 0) {
      d(arguments[0], r);
    }
  } as (v: T, ...args: U) => void | V
);
