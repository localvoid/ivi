import { clock } from "./clock";
import { DirtyCheckToken, DIRTY_CHECK_TOKEN } from "./token";

/**
 * Observable value.
 */
export interface Observable<T> {
  /**
   * Time.
   */
  t: number;
  /**
   * Value.
   */
  v: T;
}

/**
 * List of observable dependencies.
 *
 * First value in an array contains time of the last update.
 */
export type WatchList = null | [number, ...Array<Observable<any> | ((token?: DirtyCheckToken, time?: number) => any)>];

let _deps: WatchList = null;

/**
 * Creates an observable value.
 *
 * @param v Value.
 * @returns {@link Observable} value.
 */
export const observable = <T>(v: T): Observable<T> => ({ t: clock(), v });

/**
 * apply applies a function to an observable value.
 *
 * @param v Observable value.
 * @param fn Function to apply.
 */
export function apply<T>(v: Observable<T>, fn: (v: T) => T): void {
  v.t = clock();
  v.v = fn(v.v);
}

/**
 * assign assigns a new value to an observable value.
 *
 * @param v Observable value.
 * @param n New value.
 */
export function assign<T>(v: Observable<T>, n: T): void {
  v.t = clock();
  v.v = n;
}

/**
 * Creates an observable signal.
 *
 * @returns {@link Observable} value.
 */
export const signal = (): Observable<null> => observable(null);

/**
 * Emits a signal.
 */
export function emit(s: Observable<null>): void {
  s.t = clock();
}

/**
 * watch adds an observable to the list of dependencies.
 *
 * @param v Observable or computed value.
 */
export function watch<T extends Observable<any> | (() => any)>(v: T): T {
  if (process.env.IVI_TARGET !== "ssr") {
    if (_deps === null) {
      _deps = [clock(), v];
    } else {
      _deps.push(v);
    }
  }
  return v;
}

/**
 * saveObservableDependencies returns a {@link WatchList} and resets current dependencies.
 *
 * @returns Current {@link WatchList}.
 */
export function saveObservableDependencies(): WatchList {
  const deps = _deps;
  _deps = null;
  return deps;
}

export function restoreObservableDependencies(deps: WatchList): void {
  _deps = deps;
}

export function dirtyCheckWatchList(deps: WatchList): boolean {
  const t = deps![0];
  for (let i = 1; i < deps!.length; i++) {
    const v = deps![i];
    if (typeof v === "object") {
      if (v.t > t) {
        return true;
      }
    } else if ((v as (token?: DirtyCheckToken, time?: number) => any)(DIRTY_CHECK_TOKEN, t) === true) {
      return true;
    }
  }
  return false;
}

/**
 * computed creates a computed value.
 *
 * @param fn Computed function.
 * @returns Computed value.
 */
export function computed<T>(fn: (prev?: T) => T): () => T {
  let lastCheck = 0;
  let lastUpdate = 0;
  let value: T | undefined = void 0;
  let deps: WatchList = null;
  return ((token?: DirtyCheckToken, time?: number) => {
    const now = clock();
    if (lastCheck < now) {
      lastCheck = now;
      if (deps === null || dirtyCheckWatchList(deps) === true) {
        const prevDeps = saveObservableDependencies();
        const nextValue = fn(value);
        deps = saveObservableDependencies();
        restoreObservableDependencies(prevDeps);
        if (value !== nextValue) {
          value = nextValue;
          lastUpdate = now;
        }
      }
    }
    return (token === DIRTY_CHECK_TOKEN) ? lastUpdate > time! : value;
  }) as () => T;
}
