import { Context, SelectorData } from "ivi-core";
import { VNode } from "./vnode";

export interface ConnectDescriptor<I, O, P, C extends Context> {
  select: (prev: SelectorData<I, O> | null, props: P, context: C) => SelectorData<I, O>;
  render: (props: O) => VNode<any>;
}
