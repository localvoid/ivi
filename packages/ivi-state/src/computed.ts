/**
 * computed creates computed functions that are using previous result to determine when they need to reevaluate
 * computation.
 *
 * @param fn Computed function that retrieves previous result as a first argument.
 * @returns Computed function.
 */
export function computed<T>(fn: (prev: T | null) => T): () => T {
  let prev: T | null = null;
  return () => prev = fn(prev);
}
