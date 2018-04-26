import { VNode } from "./vnode";
import { VNodeFlags } from "..";

export function elementFactory<P, N>(element: VNode<P, N>): (className?: string) => VNode<P, N> {
  const flags = element._flags | VNodeFlags.ElementFactory;
  return function (className?: string) {
    return new VNode<P, N>(
      flags,
      element,
      null,
      className === undefined ? null : className,
      null,
    );
  };
}
