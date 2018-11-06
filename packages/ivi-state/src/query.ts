/**
 * QueryResult is an object that contains a result of a query.
 */
export interface QueryResult<T> {
  /**
   * Query result.
   */
  readonly result: T;
}

export interface Query<T> {
  get(): T;
  reset(): void;
}

/**
 * cachedQuery creates a query that will cache its results.
 *
 * @param fn Query function.
 * @returns Cached query.
 */
export const cachedQuery = <T>(fn: () => T, result?: QueryResult<T>): Query<QueryResult<T>> => ({
  get: () => result === void 0 ? result = { result: fn() } : result,
  reset: () => { result = void 0; },
});

/**
 * computedQuery creates a query that can use previous result to determine when it needs to reevaluate its
 * computation.
 *
 * @param fn Query function.
 * @returns Computed query.
 */
export const computedQuery = <T>(fn: (prev: T | undefined) => T, prev?: T): Query<T> => ({
  get: () => prev = fn(prev),
  reset: () => { prev = void 0; },
});
