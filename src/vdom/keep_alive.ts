import { IVNode } from "./ivnode";

export type KeepAliveHandler<P = any> = (
    disposed: IVNode<any> | null,
    props: P,
) => IVNode<any> | null;
