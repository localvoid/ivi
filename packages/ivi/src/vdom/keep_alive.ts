import { VNode } from "./vnode";

export type KeepAliveHandler<P = any> = (
  disposed: VNode | null,
  props: P,
) => VNode | null;
