/**
 * QueryResult is an object that contains a result of a query.
 */
export interface QueryResult<T> {
  /**
   * Query result.
   */
  readonly result: T;
}

/**
 * cachedQuery creates a query that will cache its results.
 *
 * @param fn Query function.
 * @returns Cached query.
 */
export function cachedQuery<T>(fn: () => T): { get: () => QueryResult<T>, reset: () => void } {
  let result: QueryResult<T> | null = null;
  return {
    get: () => result === null ? result = { result: fn() } : result,
    reset: () => { result = null; },
  };
}

/**
 * computedQuery creates a query that can use previous result to determine when it needs to reevaluate its
 * computation.
 *
 * @param fn Query function.
 * @returns Computed query.
 */
export function computedQuery<T>(fn: (prev: T | null) => T): { get: () => T, reset: () => void } {
  let prev: T | null = null;
  return {
    get: () => prev = fn(prev),
    reset: () => { prev = null; },
  };
}
