import { Context } from "../common/types";
import { IVNode } from "./ivnode";

export interface SelectorData<I = {}, O = I> {
    in: I;
    out: O;
}

export interface ConnectDescriptor<I, O, P> {
    select: (prev: SelectorData<I, O> | null, props: P, context: Context) => SelectorData<I, O>;
    render: (props: O) => IVNode<any>;
}
