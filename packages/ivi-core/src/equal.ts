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
    const aValue = a[key];
    const bValue = b[key];
    if (aValue !== bValue) {
      return false;
    }
  }

  return true;
}
