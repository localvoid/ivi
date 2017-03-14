import { IVNode } from "./ivnode";

export type KeepAliveHandler<P = any> = (
    removed: IVNode<any> | undefined,
    props?: P,
) => boolean | IVNode<any> | null;
