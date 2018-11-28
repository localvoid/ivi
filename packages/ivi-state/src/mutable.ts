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
 *     const entrySetTitle = mut(m, (entry, title: string) => { entry.title = title; });
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
export const mut = <T, U extends any[], V>(
  dirty: (v: T, flags: V) => void,
  m: (v: T, ...args: U) => V,
) => (
    function () {
      const a = arguments;
      dirty(a[0], m.apply(void 0, a));
    } as (v: T, ...args: U) => void
  );

/**
 * pipe creates a function that will pipe data from one function into another.
 *
 *     let _title = "Title";
 *     const useTitle = selector(() => _title);
 *     const m = () => { requestDirtyChecking() };
 *     const setTitle = pipe(m, (title: string) => { _title = title; });
 *
 *     const TitleView = component((c) => {
 *       const getTitle = useTitle(c);
 *
 *       return () => div().t(getTitle());
 *     });
 *
 * @param to - Function
 * @param from - Function
 * @returns piped function
 */
export const pipe = <U extends any[], V>(
  to: (ret: V) => void,
  from: (...args: U) => V,
) => (
    function () {
      to(from.apply(void 0, arguments));
    } as (...args: U) => void
  );
