/**
 * isPropsNotShallowEqual returns `true` when props aren't shallow equal.
 *
 * @param oldProps
 * @param newProps
 * @returns `true` when props are not shallow equal.
 */
export function isPropsNotShallowEqual<P>(oldProps: P, newProps: P): boolean {
  if (oldProps === newProps) {
    return false;
  }

  const aKeys = Object.keys(oldProps);
  const bKeys = Object.keys(newProps);

  if (aKeys.length !== bKeys.length) {
    return true;
  }

  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i] as keyof P;
    const aValue = oldProps[key];
    const bValue = newProps[key];
    if (aValue !== bValue) {
      return true;
    }
  }

  return false;
}
