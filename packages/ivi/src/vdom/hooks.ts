import { Component } from "./component";
import { getContext } from "./context";

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
 *       const selector = useSelect<string, number, { data: string[] }>((prev, id, context) => context.data[id]);
 *
 *       return (id) => div().t(selector(id));
 *     });
 *
 * @param c - ComponentHandle.
 * @param selector - Selector function.
 * @returns Selector hook.
 */
export function useSelect<T>(
  c: Component,
  selector: (prev: T | undefined) => T,
): () => T;

/**
 * useSelect creates a selector hook.
 *
 * @example
 *
 *     const C = component<number>((h) => {
 *       const selector = useSelect<string, number, { data: string[] }>((prev, id, context) => context.data[id]);
 *
 *       return (id) => div().t(selector(id));
 *     });
 *
 * @param c - ComponentHandle.
 * @param selector - Selector function.
 * @returns Selector hook.
 */
export function useSelect<T, P>(
  c: Component,
  selector: undefined extends P ? (prev: T | undefined, props?: P) => T : (prev: T | null, props: P) => T,
): undefined extends P ? () => T : (props: P) => T;

/**
 * useSelect creates a selector hook.
 *
 * @example
 *
 *     const C = component<number>((h) => {
 *       const selector = useSelect<string, number, { data: string[] }>((prev, id, context) => context.data[id]);
 *
 *       return (id) => div().t(selector(id));
 *     });
 *
 * @param c - ComponentHandle.
 * @param selector - Selector function.
 * @returns Selector hook.
 */
export function useSelect<T, P, C>(
  c: Component,
  selector: (prev: T | undefined, props: P, context: C) => T,
): undefined extends P ? () => T : (props: P) => T;

/**
 * useSelect creates a selector hook.
 *
 * @example
 *
 *     const C = component<number>((h) => {
 *       const selector = useSelect<string, number, { data: string[] }>((prev, id, context) => context.data[id]);
 *
 *       return (id) => div().t(selector(id));
 *     });
 *
 * @param c - ComponentHandle.
 * @param selector - Selector function.
 * @returns Selector hook.
 */
export function useSelect<T, P, C extends {}>(
  c: Component,
  selector: (prev: T | undefined, props: P, context: C) => T,
): (props: P) => T {
  const prevSelector = c.select;
  let prevState: T | undefined;
  let prevProps: P;

  c.select = (context: {}) => {
    if (prevSelector !== null) {
      prevSelector(context);
    }
    if (prevState !== void 0) {
      const nextState = selector(prevState, prevProps, context as C);
      if (prevState !== nextState) {
        c.dirty = true;
      }
      prevState = nextState;
    }
  };

  return (nextProps: P) => {
    prevProps = nextProps;
    if (prevState === void 0) {
      return prevState = selector(void 0, nextProps, getContext() as C);
    }
    return prevState;
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
 * @param c - ComponentHandle.
 * @param hook - Detached hook.
 */
export function useDetached(c: Component, hook: () => void): void {
  c.detached = addHook(c.detached, hook);
}
