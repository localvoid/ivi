import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * elementFactory creates an element factory for an element with predefined attributes.
 *
 * @param element Element prototype.
 * @returns VNode factory function.
 */
export function elementFactory<P, N>(element: VNode<P, N>): (className?: string) => VNode<P, N> {
  const flags = element._flags | VNodeFlags.ElementFactory;
  return function (className?: string) {
    return new VNode<P, N>(
      flags,
      element,
      void 0,
      className,
      null,
    );
  };
}
