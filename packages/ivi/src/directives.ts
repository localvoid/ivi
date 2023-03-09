import type { Directive } from "./index.js";

/**
 * Creates a directive that invokes a ref function when DOM element is
 * intantiated.
 *
 * @example
 *
 *     const InnerElement = component((c) => {
 *       const onDOMNodeCreated = domRef((element) => {
 *         // ..
 *       });
 *
 *       return () => htm`
 *         div.Outer
 *           div.Inner $${onDOMNodeCreated}
 *       `;
 *     });
 *
 * @param ref Ref function.
 * @returns {@link Directive}.
 */
export const domRef = (ref: (element: Element) => void): Directive => {
  var ready = false;
  return (element: Element) => {
    if (ready === false) {
      ready = true;
      ref(element);
    }
  };
};
