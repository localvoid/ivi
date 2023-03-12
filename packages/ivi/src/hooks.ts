import type { Component } from "./index.js";
import { useUnmount } from "./index.js";

/**
 * Creates a side effect hook.
 *
 * @example
 *
 *     const Example = component((c) => {
 *       const [count, setCount] = useState(0);
 *       const timer = useEffect(c, shallowEq, ({ interval }) => {
 *         const tid = setInterval(() => { setCount(count() + 1); }, interval);
 *         return () => { clearInterval(tid); };
 *       });
 *
 *       return (interval) => (
 *         timer({ interval }),
 *
 *         htm`span.Counter ${i}`
 *       );
 *     });
 *
 * @typeparam T Hook props type.
 * @param component Component instance.
 * @param areEqual Function that checks if input value hasn't changed.
 * @param hook Side effect function.
 * @returns Side effect hook.
 */
export const useEffect = <P>(
  component: Component,
  areEqual: (prev: P, next: P) => boolean,
  hook: (props?: P) => (() => void) | void,
): (props: P) => void => {
  var reset: (() => void) | void;
  var prev: P | undefined;
  return (next: P) => {
    if (areEqual(prev as P, next as P) !== true) {
      if (reset !== void 0) {
        reset();
      }
      reset = hook(next);
      if (component !== void 0 && reset !== void 0) {
        useUnmount(component, () => {
          if (reset !== void 0) {
            reset();
          }
        });
        component = (void 0)!;
      }
    }
    prev = next;
  };
};
