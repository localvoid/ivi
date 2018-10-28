import { ComponentHandle, DetachedHook } from "./component";
import { currentContext } from "./sync";

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
 * @param h - ComponentHandle.
 * @param selector - Selector function.
 * @returns Selector hook.
 */
export function useSelect<T>(
  h: ComponentHandle,
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
 * @param h - ComponentHandle.
 * @param selector - Selector function.
 * @returns Selector hook.
 */
export function useSelect<T, P>(
  h: ComponentHandle,
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
 * @param h - ComponentHandle.
 * @param selector - Selector function.
 * @returns Selector hook.
 */
export function useSelect<T, P, C>(
  h: ComponentHandle,
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
 * @param h - ComponentHandle.
 * @param selector - Selector function.
 * @returns Selector hook.
 */
export function useSelect<T, P, C extends {}>(
  h: ComponentHandle,
  selector: (prev: T | undefined, props: P, context: C) => T,
): (props: P) => T {
  let prev: T | undefined;
  let props: P;

  return (p: P) => {
    props = p;
    if (prev === void 0) {
      h.select = addHook(h.select, (context: {}) => {
        const next = selector(prev, props, context as C);
        if (prev !== next) {
          h.dirty = true;
        }
        prev = next;
      });

      return prev = selector(void 0, p, currentContext() as C);
    }
    return prev;
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
 * @param h - ComponentHandle.
 * @param hook - Detached hook.
 */
export function useDetached(h: ComponentHandle, hook: DetachedHook): void {
  h.detached = addHook(h.detached, hook);
}
