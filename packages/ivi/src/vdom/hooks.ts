import { EMPTY_OBJECT } from "../core";
import { NodeFlags } from "./node_flags";
import { Component } from "./component";
import { clock, scheduleMicrotask, scheduleMutationEffect, scheduleLayoutEffect } from "../scheduler";

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
 * @param shouldUpdate Should update fucntion.
 * @returns Selector hook.
 */
export function useSelect<T, P>(
  component: Component,
  selector: (props: P, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;

export function useSelect<T, P>(
  component: Component,
  selector: (props: P, prev: T | undefined) => T,
  shouldUpdate?: (prev: P, next: P) => boolean,
): (props: P) => T {
  /* istanbul ignore next */
  if (__IVI_TARGET__ === "ssr") {
    return (nextProps: P) => selector(nextProps, void 0);
  }

  const prevSelector = component.s.s;
  let lastChecked = 0;
  let state: T | undefined;
  let props: P;

  component.s.s = () => {
    if (prevSelector !== null && prevSelector() === true) {
      return true;
    }
    if (state !== void 0) {
      const nextState = selector(props, state);
      lastChecked = clock();
      if (state !== nextState) {
        state = nextState;
        return true;
      }
    }
    return false;
  };

  return (nextProps: P) => {
    if (
      (state !== void 0) &&
      ((shouldUpdate !== void 0 && shouldUpdate(props, nextProps) === true) || (props !== nextProps))
    ) {
      state = void 0;
    }
    if (state === void 0 || lastChecked < clock()) {
      state = selector(nextProps, state);
    }
    props = nextProps;
    return state;
  };
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
export function useUnmount(component: Component, hook: () => void): void {
  /* istanbul ignore else */
  if (__IVI_TARGET__ !== "ssr") {
    component.f |= NodeFlags.Unmount;
    const hooks = component.s;
    hooks.u = addHook(hooks.u, hook);
  }
}

function withEffect<P>(fn: (effect: () => void) => void): (
  component: Component,
  hook: (props?: P) => (() => void) | void,
  shouldUpdate?: (prev: P, next: P) => boolean,
) => (props: P) => void {
  return (stateNode, hook, shouldUpdate) => {
    let reset: (() => void) | void;
    let props: P | undefined = EMPTY_OBJECT as P;
    let unmount = false;
    const handler = (d?: boolean) => {
      if (reset !== void 0) {
        reset();
      }
      if (d !== true) {
        reset = hook(props);
        if (reset !== void 0 && !unmount) {
          unmount = true;
          useUnmount(stateNode, handler);
        }
      }
    };

    return (nextProps: P) => {
      if (
        props === EMPTY_OBJECT ||
        (shouldUpdate !== void 0 && shouldUpdate(props as P, nextProps) === true) ||
        props !== nextProps
      ) {
        props = nextProps;
        fn(handler);
      }
    };
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
 * @param shouldUpdate Should update function.
 * @returns Side effect hook
 */
export const useEffect: <T = undefined>(
  component: Component,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  shouldUpdate?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = __IVI_TARGET__ === "ssr" ?
    /* istanbul ignore next */(props: any) => { /**/ } :
    (/*#__PURE__*/withEffect(scheduleMicrotask)) as any;

/**
 * useMutationEffect creates a DOM mutation effect hook.
 *
 * @typeparam T Hook props type.
 * @param stateNode Component instance.
 * @param hook DOM mutation function.
 * @param shouldUpdate Should update function.
 * @returns Side effect hook
 */
export const useMutationEffect: <T = undefined>(
  component: Component,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  shouldUpdate?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = __IVI_TARGET__ === "ssr" ?
    /* istanbul ignore next */(props: any) => { /**/ } :
    (/*#__PURE__*/withEffect(scheduleMutationEffect)) as any;

/**
 * useLayoutEffect creates a DOM layout effect hook.
 *
 * @typeparam T Hook props type.
 * @param component Component instance.
 * @param hook DOM layout function.
 * @param shouldUpdate Should update function.
 * @returns Side effect hook
 */
export const useLayoutEffect: <T = undefined>(
  component: Component,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  shouldUpdate?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = __IVI_TARGET__ === "ssr" ?
    /* istanbul ignore next */(props: any) => { /**/ } :
    (/*#__PURE__*/withEffect(scheduleLayoutEffect)) as any;
