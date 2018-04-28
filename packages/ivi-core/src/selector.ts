/**
 * memoizeSelector creates memoized selector.
 *
 * @param select Selector function.
 * @param ref Ref callback that retrieves and assigns memoized value.
 * @returns Memoized selector.
 */
export function memoizeSelector<T>(
  select: (prev: T | null) => T,
  ref: (v?: T | null, context?: {}) => T | null,
): (prev: T | null) => T;
export function memoizeSelector<T, P>(
  select: (prev: T | null, props: P) => T,
  ref: (v?: T | null, context?: {}) => T | null,
): (prev: T | null, props: P) => T;
export function memoizeSelector<T, P>(
  select: (prev: T | null, props: P, context: {}) => T,
  ref: (v?: T | null, context?: {}) => T | null,
): (prev: T | null, props: P, context: {}) => T {
  if (DEBUG) {
    const fn = function (prev: T | null, props: P, context: {}) {
      const state = select(ref(undefined, context), props, context);
      ref(state, context);
      return state;
    };
    fn.displayName = select.name;
    return fn;
  }
  return function (prev: T | null, props: P, context: {}) {
    const state = select(ref(undefined, context), props, context);
    ref(state, context);
    return state;
  };
}
