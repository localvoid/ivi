
/**
 * Mutable type.
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * mut creates a function for object mutations.
 *
 * @example
 *
 *     interface Entry {
 *       readonly _dirty: number;
 *       readonly title: string;
 *     }
 *     const useEntry = selector((entry: Entry) => entry._dirty);
 *     const m = (entry: Mutable<Entry>) => { entry._dirty = dirty(); };
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
 * @param dirty - Dirty function.
 * @param m - Mutate function.
 * @returns mutate function.
 */
export const mut = <T, U extends any[], V>(dirty: (v: T, flags?: V) => void, m: (v: T, ...args: U) => void | V) => (
  function () {
    const r = m.apply(void 0, arguments);
    if (r === void 0 || r > 0) {
      dirty(arguments[0], r);
    }
  } as (v: T, ...args: U) => void | V
);
