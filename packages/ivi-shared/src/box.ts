/**
 * Boxed value.
 *
 * @typeparam T Value type.
 */
export interface Box<T> {
  v: T;
}

/**
 * box creates a boxed value.
 *
 * @typeparam T Value type.
 * @param v Value.
 * @returns Boxed value.
 */
export const box = <T>(v: T) => ({ v });
