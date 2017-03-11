import { Context } from "../common/types";
import { IVNode } from "./ivnode";

export interface SelectorData<T = {}, U = {}> {
    in: T;
    out: U;
}

export interface ConnectDescriptor<T, U, K> {
    select: (prev: SelectorData<K, U> | null, props: T, context: Context) => SelectorData<K, U>;
    render: (props: U) => IVNode<any>;
}
