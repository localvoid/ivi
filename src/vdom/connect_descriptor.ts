import { Context } from "../common/types";
import { IVNode } from "./ivnode";

export interface SelectData<T = {}, U = {}> {
    in: T;
    out: U;
}

export interface ConnectDescriptor<T, U, K> {
    select: (prev: SelectData<K, U> | null, props: T, context: Context) => SelectData<K, U>;
    render: (props: U) => IVNode<any>;
}
