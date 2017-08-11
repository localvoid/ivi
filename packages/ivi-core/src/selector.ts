import { DEV } from "ivi-vars";
import { Context } from "./types";

/**
 * SelectorData.
 */
export interface SelectorData<I = {}, O = I> {
  /**
   * Input data.
   */
  in: I;
  /**
   * Output data.
   */
  out: O;
}

/**
 * SelectorDataRef.
 */
export interface SelectorDataRef<T extends SelectorData> {
  ref: T | null;
}

/**
 * selectorDataRef creates SelectorDataRef.
 *
 * @param ref SelectorData reference.
 */
export function selectorDataRef<T extends SelectorData>(ref: T | null = null): SelectorDataRef<T> {
  return { ref };
}

/**
 * selectorData creates SelectorData instances.
 *
 * @param i Input data.
 * @param o Output data. When output data isn't specified, input data will be used as an output data.
 * @returns SelectorData instance.
 */
export function selectorData<I>(i: I): SelectorData<I, I>;
export function selectorData<I, O>(i: I, o: O): SelectorData<I, O>;
export function selectorData<I, O>(i: I, o?: O): SelectorData<I, O> {
  return {
    in: i,
    out: (o === undefined ? i : o) as O,
  };
}

/**
 * memoizeSelector creates memoized selector.
 *
 * @param select Selector function.
 * @param ref Ref callback that retrieves and assigns memoized value.
 * @returns Memoized selector.
 */
export function memoizeSelector<T, U extends SelectorData>(
  select: (prev: U | null) => U,
  ref: (v?: U | null, context?: Context) => U | null,
): (prev: U | null) => U;
export function memoizeSelector<T, U extends SelectorData>(
  select: (prev: U | null, props: T) => U,
  ref: (v?: U | null, context?: Context) => U | null,
): (prev: U | null, props: T) => U;
export function memoizeSelector<T, U extends SelectorData>(
  select: (prev: U | null, props: T, context: Context) => U,
  ref: (v?: U | null, context?: Context) => U | null,
): (prev: U | null, props: T, context: Context) => U {
  if (DEV) {
    const fn = function (prev: U | null, props: T, context: Context) {
      const state = select(ref(undefined, context), props, context);
      ref(state, context);
      return state;
    };
    fn.displayName = select.name;
    return fn;
  }
  return function (prev: U | null, props: T, context: Context) {
    const state = select(ref(undefined, context), props, context);
    ref(state, context);
    return state;
  };
}
