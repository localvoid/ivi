import { Context } from "ivi-core";
import { VNode } from "./vnode";

export interface ConnectDescriptor<T, P, C extends Context> {
  select: (prev: T | null, props: P, context: C) => T;
  render: (props: T) => VNode<any>;
}
