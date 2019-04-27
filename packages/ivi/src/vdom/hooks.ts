import { EMPTY_OBJECT, TaskToken, TASK_TOKEN, SelectToken, UnmountToken, SELECT_TOKEN, UNMOUNT_TOKEN } from "../core";
import { clock, scheduleMicrotask, scheduleMutationEffect, scheduleLayoutEffect } from "../scheduler";
import { NodeFlags } from "./node_flags";
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
 * useSelect creates a selector hook.
 *
 * @example
 *
 *     const C = component<number>((c) => {
 *       const selector = useSelect<string, number>(c,
 *         (id, context) => getContext<{ data: string[] }>.data[id],
 *       );
 *
 *       return (id) => div(_, _, selector(id));
 *     });
 *
 * @typeparam T Selector result type.
 * @param component Component instance.
 * @param selector Selector function.
 * @returns Selector hook.
 */
export function useSelect<T>(
  component: Component,
  selector: (props?: undefined, prev?: T | undefined) => T,
): () => T;

/**
 * useSelect creates a selector hook.
 *
 * @example
 *
 *     const C = component<number>((c) => {
 *       const selector = useSelect<string, number>(c,
 *         (id, context) => getContext<{ data: string[] }>.data[id],
 *       );
 *
 *       return (id) => div(_, _, selector(id));
 *     });
 *
 * @typeparam T Selector result type.
 * @typeparam P Selector props type.
 * @param component Component instance.
 * @param selector Selector function.
 * @param areEqual `areEqual` function.
 * @returns Selector hook.
 */
export function useSelect<T, P>(
  component: Component,
  selector: (props: P, prev?: T | undefined) => T,
  areEqual?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;

export function useSelect<T, P>(
  component: Component,
  selector: (props: P, prev: T | undefined) => T,
  areEqual?: (prev: P, next: P) => boolean,
): (props: P) => T {
  /* istanbul ignore next */
  if (process.env.IVI_TARGET === "ssr") {
    return (nextProps: P) => selector(nextProps, void 0);
  }

  let lastChecked = 0;
  let state: T | undefined;
  let props: P;
  const prevSelector = component.s.s;
  const hook = (p: SelectToken | P) => {
    if (p === SELECT_TOKEN) {
      if (prevSelector !== null && prevSelector(SELECT_TOKEN) === true) {
        return true;
      }
      if (state !== void 0) {
        p = selector(props, state);
        lastChecked = clock();
        if (state !== p) {
          state = p as T;
          return true;
        }
      }
      return false;
    }

    if (
      (state !== void 0) &&
      (
        (props !== p) &&
        (areEqual === void 0 || areEqual(props, p as P) !== true)
      )
    ) {
      state = void 0;
    }
    if (state === void 0 || lastChecked < clock()) {
      state = selector(p as P, state);
    }
    props = p as P;
    return state;
  };

  component.s.s = hook as (token: SelectToken) => boolean;
  return hook as (p: P) => T;
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
  if (process.env.IVI_TARGET !== "ssr") {
    component.f |= NodeFlags.Unmount;
    const hooks = component.s;
    hooks.u = addHook(hooks.u, hook);
  }
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
) => undefined extends T ? () => void : (props: T) => void = process.env.IVI_TARGET === "ssr" ?
    /* istanbul ignore next */(props: any) => { /**/ } :
    (/*#__PURE__*/withEffect(scheduleMicrotask)) as any;

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
) => undefined extends T ? () => void : (props: T) => void = process.env.IVI_TARGET === "ssr" ?
    /* istanbul ignore next */(props: any) => { /**/ } :
    (/*#__PURE__*/withEffect(scheduleMutationEffect)) as any;

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
) => undefined extends T ? () => void : (props: T) => void = process.env.IVI_TARGET === "ssr" ?
    /* istanbul ignore next */(props: any) => { /**/ } :
    (/*#__PURE__*/withEffect(scheduleLayoutEffect)) as any;
