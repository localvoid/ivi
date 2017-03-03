import { Context } from "../common/types";
import { IVNode } from "./ivnode";

export interface SelectData<T = {}, U = {}> {
    in: T;
    out: U;
}

export interface ConnectDescriptor<T, U> {
    select: (prev: SelectData<{}, U> | null | boolean, props: T, context: Context) => U;
    render: (props: U, context: Context) => IVNode<U>;
}
