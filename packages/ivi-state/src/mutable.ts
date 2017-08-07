
/**
 * Mutable wrapper.
 *
 * @final
 */
export interface Mutable<T> {
  ref: T;
}

/**
 * Creates a new object instance that wraps mutable object.
 *
 * @param ref Mutable object.
 * @returns a new mutable wrapper instance.
 */
export function mut<T>(ref: T): Mutable<T> {
  return { ref };
}
