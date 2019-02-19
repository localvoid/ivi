import { strictNotEqual, shallowNotEqual, shallowNotEqualArray } from "./equal";

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
 * @param shouldUpdate
 * @returns memoized function.
 */
export function memo<T, U>(
  fn: (props: T) => U,
  shouldUpdate: (prev: T, next: T) => boolean = strictNotEqual,
): (props: T) => U {
  let prev: T | undefined;
  let v: U | undefined;
  return (props: T) => {
    if (v === void 0 || shouldUpdate(prev!, props) === true) {
      prev = props;
      v = fn(props);
    }
    return v;
  };
}

/**
 * memoObject creates a memoized function with {@link shallowNotEqual} as a `shouldUpdate` function.
 *
 * @typeparam T input type.
 * @typeparam U output type.
 * @param fn
 * @returns memoized function.
 */
export const memoObject = <T extends {}, U>(fn: (props: T) => U) => memo<T, U>(fn, shallowNotEqual);

/**
 * memoObject creates a memoized function with {@link shallowNotEqualArray} as a `shouldUpdate` function.
 *
 * @typeparam T input type.
 * @typeparam U output type.
 * @param fn
 * @returns memoized function.
 */
export const memoArray = <T extends any[], U>(fn: (props: T) => U) => memo<T, U>(fn, shallowNotEqualArray);
