/**
 * lazy creates a lazy value.
 *
 * @param fn value constructor.
 * @returns a function that returns a lazy value.
 */
export function lazy<T>(fn: () => T): () => T {
  let v: T | undefined;
  return () => v === void 0 ? v = fn() : v!;
}
