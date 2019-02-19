/**
 * strictEqual returns `true` when `a` and `b` are strictly equal `===`.
 *
 * @param a
 * @param b
 * @returns `true` when `a` and `b` are strictly equal `===`.
 */
export const strictEqual = <T>(a: T, b: T) => a === b;

/**
 * strictNotEqual returns `true` when `a` and `b` are strictly not equal `!==`.
 *
 * @param a
 * @param b
 * @returns `true` when `a` and `b` are strictly not equal `!==`.
 */
export const strictNotEqual = <T>(a: T, b: T) => a !== b;

/**
 * shallowEqual returns `true` when objects are shallow equal.
 *
 * @param a
 * @param b
 * @returns `true` when props are shallow equal.
 */
export function shallowEqual<T>(a: T, b: T): boolean {
  if (a !== b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (let i = 0; i < aKeys.length; ++i) {
      const key = aKeys[i];
      if ((a as any)[key] !== (b as any)[key]) {
        return false;
      }
    }
  }

  return true;
}

/**
 * shallowNotEqual returns `true` when objects aren't shallow equal.
 *
 * @param a
 * @param b
 * @returns `true` when props aren't shallow equal.
 */
export const shallowNotEqual = <T>(a: T, b: T) => !shallowEqual(a, b);

/**
 * shallowEqualArray returns `true` when arrays are shallow equal.
 *
 * @param a
 * @param b
 * @returns `true` when arrays are shallow equal.
 */
export function shallowEqualArray<T extends any[]>(a: T, b: T): boolean {
  if (a !== b) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
  }

  return true;
}

/**
 * shallowNotEqualArray returns `true` when arrays aren't shallow equal.
 *
 * @param a
 * @param b
 * @returns `true` when arrays aren't shallow equal.
 */
export const shallowNotEqualArray = <T extends any[]>(a: T, b: T) => !shallowEqualArray(a, b);
