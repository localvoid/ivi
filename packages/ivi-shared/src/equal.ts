/**
 * shallowEqual returns `true` when objects are shallow equal.
 *
 * @param a
 * @param b
 * @returns `true` when props are shallow equal.
 */
export function shallowEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

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

  return true;
}
