import { strictEqual, shallowEqual, shallowEqualArray } from "./equal";

/**
 * lazy creates a lazy value.
 *
 * @typeparam T return type.
 * @param fn value constructor.
 * @returns a function that returns a lazy value.
 */
export const lazy = <T>(fn: () => T, v?: T) => () => v === void 0 ? v = fn() : v!;

/**
 * memo creates a memoized function.
 *
 * @typeparam T input type.
 * @typeparam U output type.
 * @param fn
 * @param areEqual `areEqual` function.
 * @returns memoized function.
 */
export function memo<T, U>(
  fn: (props: T) => U,
  areEqual: (prev: T, next: T) => boolean = strictEqual,
): (props: T) => U {
  let prev: T | undefined;
  let v: U | undefined;
  return (props: T) => {
    if (v === void 0 || areEqual(prev!, props) !== true) {
      prev = props;
      v = fn(props);
    }
    return v;
  };
}

/**
 * memoObject creates a memoized function with {@link shallowEqual} as a `areEqual` function.
 *
 * @typeparam T input type.
 * @typeparam U output type.
 * @param fn
 * @returns memoized function.
 */
export const memoObject = <T extends {}, U>(fn: (props: T) => U) => memo<T, U>(fn, shallowEqual);

/**
 * memoArray creates a memoized function with {@link shallowEqualArray} as a `areEqual` function.
 *
 * @typeparam T input type.
 * @typeparam U output type.
 * @param fn
 * @returns memoized function.
 */
export const memoArray = <T extends any[], U>(fn: (props: T) => U) => memo<T, U>(fn, shallowEqualArray);
