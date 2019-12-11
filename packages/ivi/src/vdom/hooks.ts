import { EMPTY_OBJECT, TaskToken, TASK_TOKEN, UnmountToken, UNMOUNT_TOKEN } from "../core";
import { scheduleMutationEffect, scheduleLayoutEffect, invalidate } from "../scheduler";
import { Component } from "./component";

function addHook<T extends Function>(hooks: null | T | T[], hook: T): T | T[] {
  if (hooks === null) {
    return hook;
  }
  if (typeof hooks === "function") {
    return [hooks, hook];
  }
  hooks.push(hook);
  return hooks;
}

/**
 * useUnmount creates an unmount hook.
 *
 * @example
 *
 *     const C = component((c) => {
 *       useUnmount(c, () => {
 *         console.log("unmounted");
 *       });
 *
 *       return () => div();
 *     });
 *
 * @param component Component instance.
 * @param hook Unmount hook.
 */
export function useUnmount(component: Component, hook: (token: UnmountToken) => void): void {
  /* istanbul ignore else */
  const hooks = component.s;
  hooks.u = addHook(hooks.u, hook);
}

function withEffect<P>(scheduleTask: (task: (token: TaskToken) => void) => void): (
  component: Component | undefined,
  hook: (props?: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean,
) => (props: P) => void {
  return (component, hook, areEqual) => {
    let reset: (() => void) | void;
    let props: P | undefined = EMPTY_OBJECT as P;
    const handler = (p: UnmountToken | TaskToken | P) => {
      if (p === TASK_TOKEN || p === UNMOUNT_TOKEN) {
        if (reset !== void 0) {
          reset();
        }
        if (p !== UNMOUNT_TOKEN) {
          reset = hook(props);
          if (reset !== void 0 && component !== void 0) {
            useUnmount(component, handler);
            // remove component reference to indicate that unmount hook is registered.
            component = void 0;
          }
        }
      } else if (
        (props === EMPTY_OBJECT) ||
        (
          (props !== p) &&
          (areEqual === void 0 || areEqual(props as P, p as P) !== true)
        )
      ) {
        props = p as P;
        scheduleTask(handler);
      }
    };

    return handler;
  };
}

/**
 * useEffect creates a side effect hook.
 *
 * @example
 *
 *     const Counter = component<number>((c) => {
 *       let i = 0;
 *       const timer = useEffect<number>(c, (delay) => {
 *         const tid = setInterval(() => {
 *           i++;
 *           invalidate(c);
 *         }, delay);
 *         return () => { clearInterval(tid); };
 *       });
 *
 *       return (delay) => (
 *         timer(delay),
 *
 *         div(_, _, i),
 *       );
 *     });
 *
 * @typeparam T Hook props type.
 * @param component Component instance.
 * @param hook Side effect function.
 * @param areEqual `areEqual` function.
 * @returns Side effect hook.
 */
export const useEffect: <T = undefined>(
  component: Component,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  areEqual?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = (
  /*#__PURE__*/withEffect((task) => { task(TASK_TOKEN); })
) as any;

/**
 * useMutationEffect creates a DOM mutation effect hook.
 *
 * @typeparam T Hook props type.
 * @param stateNode Component instance.
 * @param hook DOM mutation function.
 * @param areEqual `areEqual` function.
 * @returns Side effect hook.
 */
export const useMutationEffect: <T = undefined>(
  component: Component,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  areEqual?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = (
  /*#__PURE__*/withEffect(scheduleMutationEffect)
) as any;

/**
 * useLayoutEffect creates a DOM layout effect hook.
 *
 * @typeparam T Hook props type.
 * @param component Component instance.
 * @param hook DOM layout function.
 * @param areEqual `areEqual` function.
 * @returns Side effect hook.
 */
export const useLayoutEffect: <T = undefined>(
  component: Component,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  areEqual?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = (
  /*#__PURE__*/withEffect(scheduleLayoutEffect)
) as any;

/**
 * useReducer creates a state reducer.
 *
 * @typeparam T State type.
 * @typeparam U Reducer type.
 * @param component Component instance.
 * @param reducer Reducer function.
 * @param state Initial state.
 * @returns State reducer.
 */
export const useReducer = <T, U>(component: Component, reducer: (state: T, action: U) => T, state: T) => (
  (action?: U) => {
    if (action !== void 0) {
      const nextState = reducer(state, action);
      if (state !== nextState) {
        state = nextState;
        invalidate(component);
      }
    }
    return state;
  }
);
