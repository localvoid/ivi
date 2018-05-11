import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * element creates an virtual DOM node factory that produces elements with predefined attributes.
 *
 *     const DivWithIdAttribute = element(
 *       h.div().a({
 *         "id": "predefined-id",
 *       });
 *     );
 *
 *     render(
 *       DivWithIdAttribute(),
 *       DOMContainer,
 *     );
 *
 * @param proto virtual DOM element prototype.
 * @returns factory that produces elements with predefined attributes.
 */
export function element<P, N>(proto: VNode<P, N>): (className?: string) => VNode<P, N> {
  const flags = proto.flags | VNodeFlags.ElementFactory;
  return function (className?: string) {
    return new VNode<P, N>(
      flags,
      proto,
      void 0,
      className,
      null,
    );
  };
}
