import { VNode } from "./vnode";
import { VNodeFlags } from "..";

export function elementFactory<P, N>(element: VNode<P, N>): (className?: string) => VNode<P, N> {
  return function (className?: string) {
    return new VNode<P, N>(
      element._flags | VNodeFlags.ElementFactory,
      element,
      null,
      className === undefined ? null : className,
      null,
    );
  };
}
