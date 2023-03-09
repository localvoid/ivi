import type { Component } from "./index.js";

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
 *       return () => null;
 *     });
 *
 * @param component Component instance.
 * @param hook Unmount hook.
 */
export const useUnmount = (component: Component, hook: () => void): void => {
  var s = component.s;
  var hooks = s.u;
  s.u = (hooks === null)
    ? hook
    : (typeof hooks === "function")
      ? [hooks, hook]
      : (hooks.push(hook), hooks);
};

/**
 * useEffect creates a side effect hook.
 *
 * @example
 *
 *     const Counter = component((c) => {
 *       let i = 0;
 *       const timer = useEffect(c,
 *         (delay) => {
 *           const tid = setInterval(() => {
 *             i++;
 *             invalidate(c);
 *           }, delay);
 *           return () => { clearInterval(tid); };
 *         },
 *         (prev, next) => prev !== next,
 *       );
 *
 *       return (delay) => (
 *         timer(delay),
 *
 *         htm`span.Counter ${i}`
 *       );
 *     });
 *
 * @typeparam T Hook props type.
 * @param component Component instance.
 * @param hook Side effect function.
 * @param areEqual `areEqual` function.
 * @returns Side effect hook.
 */
export const useEffect = <P>(
  component: Component,
  hook: (props?: P) => (() => void) | void,
  areEqual: (prev: P, next: P) => boolean,
): (props: P) => void => {
  var reset: (() => void) | void;
  var prev: P | undefined;
  return (next: P) => {
    if (areEqual(prev as P, next as P) !== true) {
      if (reset !== void 0) {
        reset();
      }
      reset = hook(next);
      prev = next;
      if (component !== void 0 && reset !== void 0) {
        useUnmount(component, () => {
          if (reset !== void 0) {
            reset();
          }
        });
        component = (void 0)!;
      }
    }
  };
};
