import { VNode } from "./vnode";

export type KeepAliveHandler<P = any> = (
    disposed: VNode<any> | null,
    props: P,
) => VNode<any> | null;
