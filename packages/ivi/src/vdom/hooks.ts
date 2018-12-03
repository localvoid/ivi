import { EMPTY_OBJECT } from "ivi-shared";
import { NodeFlags } from "./node_flags";
import { ComponentHooks, Component } from "./component";
import { getContext } from "./context";
import { clock, scheduleMicrotask, scheduleMutationEffect, scheduleLayoutEffect } from "../scheduler";
import { OpState } from "./state";
import { Portal } from "./root";
import { Op } from "./operations";

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
 *     const C = component<number>((h) => {
 *       const selector = useSelect<string, number, { data: string[] }>(c,
 *         (id, context) => context.data[id],
 *       );
 *
 *       return (id) => div(_, _, selector(id));
 *     });
 *
 * @param stateNode Component instance.
 * @param selector Selector function.
 * @returns Selector hook.
 */
export function useSelect<T>(
  stateNode: OpState,
  selector: (props?: undefined, context?: undefined, prev?: T | undefined) => T,
): () => T;

/**
 * useSelect creates a selector hook.
 *
 * @example
 *
 *     const C = component<number>((h) => {
 *       const selector = useSelect<string, number, { data: string[] }>(c,
 *         (id, context) => context.data[id],
 *       );
 *
 *       return (id) => div(_, _, selector(id));
 *     });
 *
 * @param stateNode Component instance.
 * @param selector Selector function.
 * @returns Selector hook.
 */
export function useSelect<T, P>(
  stateNode: OpState,
  selector: (props: P, context?: undefined, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;

/**
 * useSelect creates a selector hook.
 *
 * @example
 *
 *     const C = component<number>((h) => {
 *       const selector = useSelect<string, number, { data: string[] }>(c,
 *         (id, context) => context.data[id],
 *       );
 *
 *       return (id) => div(_, _, selector(id));
 *     });
 *
 * @param stateNode Component instance.
 * @param selector Selector function.
 * @returns Selector hook.
 */
export function useSelect<T, P, C>(
  stateNode: OpState,
  selector: (props: P, context: C, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;

/**
 * useSelect creates a selector hook.
 *
 * @example
 *
 *     const C = component<number>((c) => {
 *       const selector = useSelect<string, number, { data: string[] }>(c,
 *         (id, context) => context.data[id],
 *       );
 *
 *       return (id) => div(_, _, selector(id));
 *     });
 *
 * @param stateNode Component instance.
 * @param selector Selector function.
 * @returns Selector hook.
 */
export function useSelect<T, P, C extends {}>(
  stateNode: OpState,
  selector: (props: P, context: C, prev: T | undefined) => T,
  shouldUpdate?: (prev: P, next: P) => boolean,
): (props: P) => T {
  /* istanbul ignore next */
  if (TARGET === "ssr") {
    return (nextProps: P) => selector(nextProps, getContext() as C, void 0);
  }

  const prevSelector = (stateNode.s as ComponentHooks).s;
  let lastChecked = 0;
  let state: T | undefined;
  let props: P;

  (stateNode.s as ComponentHooks).s = (context: {}) => {
    if (prevSelector !== null && prevSelector(context) === true) {
      return true;
    }
    if (state !== void 0) {
      const nextState = selector(props, context as C, state);
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
      state = selector(nextProps, getContext() as C, state);
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
 *     const C = component((h) => {
 *       useUnmount(h, () => {
 *         console.log("unmounted");
 *       });
 *
 *       return () => div();
 *     });
 *
 * @param stateNode Component instance.
 * @param hook Unmount hook.
 */
export function useUnmount(stateNode: OpState, hook: () => void): void {
  /* istanbul ignore else */
  if (TARGET !== "ssr") {
    stateNode.f |= NodeFlags.Unmount;
    const hooks = stateNode.s as ComponentHooks;
    hooks.u = addHook(hooks.u, hook);
  }
}

function withEffect<P>(fn: (effect: () => void) => void): (
  stateNode: OpState,
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
 * @param stateNode Component instance.
 * @param hook Side effect function.
 * @param shouldUpdate Should update function.
 * @returns Side effect hook
 */
export const useEffect: <T = undefined>(
  stateNode: OpState,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  shouldUpdate?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = TARGET === "ssr" ?
    /* istanbul ignore next */(props: any) => { /**/ } :
    (/*#__PURE__*/withEffect(scheduleMicrotask)) as any;

/**
 * useMutationEffect creates a DOM mutation effect hook.
 *
 * @param stateNode Component instance.
 * @param hook DOM mutation function.
 * @param shouldUpdate Should update function.
 * @returns Side effect hook
 */
export const useMutationEffect: <T = undefined>(
  stateNode: OpState,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  shouldUpdate?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = TARGET === "ssr" ?
    /* istanbul ignore next */(props: any) => { /**/ } :
    (/*#__PURE__*/withEffect(scheduleMutationEffect)) as any;

/**
 * useLayoutEffect creates a DOM layout effect hook.
 *
 * @param component Component state.
 * @param hook DOM layout function.
 * @param shouldUpdate Should update function.
 * @returns Side effect hook
 */
export const useLayoutEffect: <T = undefined>(
  component: Component,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  shouldUpdate?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = TARGET === "ssr" ?
    /* istanbul ignore next */(props: any) => { /**/ } :
    (/*#__PURE__*/withEffect(scheduleLayoutEffect)) as any;

/**
 * usePortal creates a portal entry.
 *
 * @param component Component state.
 * @param portal Portal.
 * @returns Portal entry.
 */
export function usePortal(component: Component, portal: Portal) {
  let unmount = false;
  return (op: Op) => {
    if (portal.container !== null) {
      portal.next = op;
      if (unmount === false) {
        unmount = true;
        useUnmount(component, () => {
          if (op !== null) {
            portal.next = null;
          }
        });
      }
    }
  };
}
