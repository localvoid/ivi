import { CSSStyleProps } from "ivi-core";
import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * `element()` creates a virtual DOM node factory that produces elements with predefined attributes.
 *
 * @example
 *
 *     const DivWithIdAttribute = element(
 *       div("", {
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
export function element<P, N>(proto: VNode<P, N>): (className?: string, attrs?: P, css?: CSSStyleProps) => VNode<P, N> {
  const flags = proto._f | VNodeFlags.ElementFactory;
  return (className?: string, attrs?: P, css?: CSSStyleProps) => (
    new VNode<P, N>(
      flags,
      proto,
      attrs,
      className === void 0 ? "" : className,
      css,
    )
  );
}
