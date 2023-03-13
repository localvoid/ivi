/**
 * Checks if values are equal with a strict equality operator `===`.
 *
 * @param a
 * @param b
 * @returns True when values are strictly equal.
 */
export const strictEq = <T>(a: T, b: T): boolean => a === b;

const objectKeys = Object.keys;

/**
 * Checks if objects are shallow equal.
 *
 * shallowEq algorithm is using strict equality operator `===` to
 * compare object values.
 *
 * @param a
 * @param b
 * @returns True when objects are shallow equal.
 */
export const shallowEq = <T extends object>(a: T, b: T): boolean => {
  if (a !== b) {
    const aKeys = objectKeys(a);
    const bKeys = objectKeys(b);

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
};

/**
 * Checks if arrays are shallow equal.
 *
 * shallowEqArray algorithm is using strict equality operator `===` to
 * compare array values.
 *
 * @param a
 * @param b
 * @returns True whan arrays are shallow equal.
 */
export const shallowEqArray = <T>(a: T[], b: T[]): boolean => {
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
};
