import { Context, SelectorData } from "ivi-core";
import { VNode } from "./vnode";

export interface ConnectDescriptor<I, O, P> {
  select: (prev: SelectorData<I, O> | null, props: P, context: Context) => SelectorData<I, O>;
  render: (props: O) => VNode<any>;
}
