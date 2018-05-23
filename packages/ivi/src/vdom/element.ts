import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * `element()` creates a virtual DOM node factory that produces elements with predefined attributes.
 *
 * @example
 *
 *     const DivWithIdAttribute = element(
 *       div().a({
 *         id: "predefined-id",
 *       });
 *     );
 *
 *     render(
 *       DivWithIdAttribute(),
 *       document.getElementById("app")!,
 *     );
 *
 * @param proto - Virtual DOM prototype
 * @returns factory that produces elements with predefined attributes
 */
export function element<P, N>(proto: VNode<P, N>): (className?: string) => VNode<P, N> {
  const flags = proto._f | VNodeFlags.ElementFactory;
  return (className?: string) => (
    new VNode<P, N>(
      flags,
      proto,
      void 0,
      className,
      null,
    )
  );
}
