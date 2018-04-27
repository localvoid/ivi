
/**
 * Boxed value.
 *
 * @final
 */
export interface Box<T> {
  /**
   * Reference to a value.
   */
  ref: T;
}

/**
 * box creates a new boxed value.
 *
 * @param ref value.
 * @returns a new boxed value.
 */
export function box<T>(ref: T): Box<T> {
  return { ref };
}
