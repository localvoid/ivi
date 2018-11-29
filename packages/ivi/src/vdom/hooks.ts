import { EMPTY_OBJECT } from "ivi-shared";
import { NodeFlags } from "./node_flags";
import { ComponentHooks } from "./component";
import { getContext } from "./context";
import { clock, scheduleMicrotask, scheduleMutationEffect, scheduleLayoutEffect } from "../scheduler";
import { OpState } from "./state";

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
  const prevSelector = (stateNode.state as ComponentHooks).dirtyCheck;
  let lastChecked = 0;
  let state: T | undefined;
  let props: P;

  (stateNode.state as ComponentHooks).dirtyCheck = (context: {}) => {
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
 * useDetached creates a detached hook.
 *
 * @example
 *
 *     const C = component((h) => {
 *       useDetached(h, () => {
 *         console.log("detached");
 *       });
 *
 *       return () => div();
 *     });
 *
 * @param stateNode Component instance.
 * @param hook Detached hook.
 */
export function useDetached(stateNode: OpState, hook: () => void): void {
  stateNode.flags |= NodeFlags.Unmount;
  const hooks = stateNode.state as ComponentHooks;
  hooks.unmount = addHook(hooks.unmount, hook);
}

function withEffect<P>(fn: (effect: () => void) => void): (
  stateNode: OpState,
  hook: (props?: P) => (() => void) | void,
  shouldUpdate?: (prev: P, next: P) => boolean,
) => (props: P) => void {
  return (stateNode, hook, shouldUpdate) => {
    let reset: (() => void) | void;
    let props: P | undefined = EMPTY_OBJECT as P;
    let detached = false;
    const handler = (d?: boolean) => {
      if (reset !== void 0) {
        reset();
      }
      if (d !== true) {
        reset = hook(props);
        if (reset !== void 0 && !detached) {
          detached = true;
          useDetached(stateNode, handler);
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
) => undefined extends T ? () => void : (props: T) => void = (/*#__PURE__*/withEffect(scheduleMicrotask)) as any;

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
) => undefined extends T ? () => void : (props: T) => void = (/*#__PURE__*/withEffect(scheduleMutationEffect)) as any;

/**
 * useLayoutEffect creates a DOM layout effect hook.
 *
 * @param stateNode Component instance.
 * @param hook DOM layout function.
 * @param shouldUpdate Should update function.
 * @returns Side effect hook
 */
export const useLayoutEffect: <T = undefined>(
  stateNode: OpState,
  hook: undefined extends T ? () => (() => void) | void : (props: T) => (() => void) | void,
  shouldUpdate?: undefined extends T ? undefined : (prev: T, next: T) => boolean,
) => undefined extends T ? () => void : (props: T) => void = (/*#__PURE__*/withEffect(scheduleLayoutEffect)) as any;
