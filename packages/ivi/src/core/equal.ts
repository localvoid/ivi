/**
 * shallowEqual returns `true` when objects are shallow equal.
 *
 * @param a
 * @param b
 * @returns `true` when props are shallow equal.
 */
export function shallowEqual(a: any, b: any): boolean {
  if (a !== b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (let i = 0; i < aKeys.length; ++i) {
      const key = aKeys[i];
      if (a[key] !== b[key]) {
        return false;
      }
    }
  }

  return true;
}

/**
 * shallowEqualArray returns `true` when arrays are shallow equal.
 *
 * @param a
 * @param b
 * @returns `true` when arrays are shallow equal.
 */
export function shallowEqualArray(a: any[], b: any): boolean {
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
