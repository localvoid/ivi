import { clock } from "./clock";
import { DirtyCheckToken, NotModifiedToken, DIRTY_CHECK_TOKEN, NOT_MODIFIED } from "./token";

/**
 * Coarse-grained observables (directed graph, pull) and dirty checking.
 *
 * IMPLEMENTATION DETAILS:
 *
 * Observable values are simple objects that store a time (monotonically increasing clock) `t` when they were updated
 * last time and a value `v`. Computed values and side effects create a directed graph with edges pointing to
 * observables and other computed values. Each time any observable value is modified, dirty checking algorithm goes
 * through all side effects and checks if any of the dependencies were modified and when one of the dependencies is
 * modified it will rerun side effect.
 *
 * Computeds and side effects automatically reset all edges every time they are reevaluated.
 *
 * CAVEATS:
 *
 * - "memory leaking" computed values. All glitch-free solutions that pull data in side effects are having the same
 *   issue, previous value is always stored to prevent unnecessary computations when dependencies are changed but the
 *   resulting value is the same. One of the solutions to deal with computeds that can store a lot of outdated data
 *   could be to create a custom garbage collector that will nullify outdated computed values (`lastCheck < clock()`).
 * - Large number of side effects can cause performance problems. Dirty checking algorithm checks all side effects each
 *   time something is updated.
 *
 * TRADEOFFS:
 *
 * vs redux-like selectors (directed graph, pull) (`useSelect()` in ivi < 0.28.0)
 *
 * PROS:
 *
 * - Slightly better performance and less memory consumption.
 * - Less verbose API, especially when working with mutable data structures.
 * - Composable API.
 *
 * vs fine-grained observables (undirected graph, push-pull) and autotracking (Vue, MobX)
 *
 * PROS:
 *
 * - Significantly better performance with complex data processing algorithms (especially with map/reduce algorithms).
 * - Significantly less memory consumption.
 *
 * CONS:
 *
 * - Verbose API, all edges are created explicitly with `watch()` function. Autotracking solutions implicitly create
 *   all edges.
 * - Dirty checking requires to check all side effects each time something is updated. Push-pull solutions are creating
 *   undirected graphs so that when observable value is updated they can go through the graph and find all side effects
 *   that use this observable value.
 * - Complex use cases that can be easily solved with Vue or MobX require completely different solutions. For example,
 *   when we need to sort a list of items, instead of watching every item, we will need to create a `signal()` that will
 *   be emitted each time when observable value is modified. Use cases like "highlighting all items that match a list of
 *   rules" would require creating custom data structures like inverted indexes, ordered maps(rb-tree), etc.
 * - Significantly higher learning curve (requires basic knowledge of data structures and algorithms).
 *
 * @example
 *     // Computed value
 *     const a = observable(1);
 *     const b = observable(2);
 *     const sum = computed(() => watch(a) + watch(b));
 *     const A = statelessComponent(() => div(_, _, watch(sum)()));
 *
 *     // Basic selector with immutable state
 *     const A = component((c) => {
 *       const getValue = selector(() => STATE.value);
 *       return () => div(_, _, watch(getValue)());
 *     });
 *
 *     // Memoized selector with immutable state
 *     const A = component((c) => {
 *       const getValue = selector((prev) => (
 *         prev !== void 0 && prev.a === STATE.a && prev.b === STATE.b ? prev :
 *           { a: STATE.a, b: STATE.b, result: STATE.a + STATE.b };
 *       ));
 *       return () => div(_, _, watch(getValue)());
 *     });
 *
 *     // Composition
 *     const a = observable(1);
 *     const A = component((c) => {
 *       const getValue = memo((i) => computed(() => watch(a) + i));
 *       return (i) => div(_, _, watch(getValue(i))());
 *     });
 */

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
 * Infers observable value type.
 */
export type ObservableValue<T> = T extends Observable<infer U> ? U : never;

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
 * Applies a function to an observable value.
 *
 * @example
 *     const a = observable(1);
 *     apply(a, (v) => v + 1);
 *
 * @param v Observable value.
 * @param fn Function to apply.
 */
export function apply<T>(v: Observable<T>, fn: (v: T) => T): void {
  v.t = clock();
  v.v = fn(v.v);
}

/**
 * Assigns a new value to an observable value.
 *
 * @example
 *     const a = observable(1);
 *     assign(a, 2);
 *
 * @param v Observable value.
 * @param n New value.
 */
export function assign<T>(v: Observable<T>, n: T): void {
  v.t = clock();
  v.v = n;
}

/**
 * Mutates observable value.
 *
 * @example
 *     const a = observable({ value: 1 });
 *     mut(a).value = 2;
 *
 * @param v Observable value.
 * @returns Stored value.
 */
export const mut = <T>(v: Observable<T>): T => (v.t = clock(), v.v);

/**
 * Creates an observable mutator function.
 *
 * @param fn Mutator function.
 * @returns Mutator function.
 */
export const mutator = <T, U extends any[]>(fn: (v: T, ...args: U) => T | NotModifiedToken | void) => function () {
  const v = (fn as any).apply(void 0, arguments as any);
  if (v !== NOT_MODIFIED) {
    const o = arguments[0];
    o.t = clock();
    if (v !== void 0) {
      o.v = v;
    }
  }
} as (v: Observable<T>, ...args: U) => void;

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
export function watch<T extends () => any>(v: T): T;
export function watch<T extends Observable<any>>(v: T): ObservableValue<T>;
export function watch<T extends Observable<any> | (() => any)>(v: T): any {
  if (process.env.IVI_TARGET !== "ssr") {
    if (_deps === null) {
      _deps = [clock(), v];
    } else {
      _deps.push(v);
    }
  }
  return typeof v === "function" ? v : (v as Observable<any>).v;
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

/**
 * selector creates a dirty checking selector.
 *
 * @param fn Computed function.
 * @returns Computed value.
 */
export function selector<T>(fn: (prev?: T) => T): () => T {
  let lastCheck = 0;
  let lastUpdate = 0;
  let value: T | undefined = void 0;
  return ((token?: DirtyCheckToken, time?: number) => {
    const now = clock();
    if (lastCheck < now) {
      lastCheck = now;
      const nextValue = fn(value);
      if (value !== nextValue) {
        value = nextValue;
        lastUpdate = now;
      }
    }
    return (token === DIRTY_CHECK_TOKEN) ? lastUpdate > time! : value;
  }) as () => T;
}
