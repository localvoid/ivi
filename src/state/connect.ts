import { Context } from "../common/types";
import { IVNode } from "../vdom/ivnode";
import { SelectorData } from "../vdom/connect_descriptor";
import { ComponentClass, isComponentClass } from "../vdom/component";
import { VNode, $c, $connect } from "../vdom/vnode";

export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: null | void, context: Context) => SelectorData<I, O>,
    render: ComponentClass<O>,
): () => VNode<P>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: null | void, context: Context) => SelectorData<I, O>,
    render: (props: O) => IVNode<any>,
): () => VNode<P>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: P, context: Context) => SelectorData<I, O>,
    render: ComponentClass<O>,
): (props: P) => VNode<P>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: P, context: Context) => SelectorData<I, O>,
    render: (props: O) => IVNode<any>,
): (props: P) => VNode<P>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: null | void) => SelectorData<I, O>,
    render: ComponentClass<O>,
): () => VNode<null>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: null | void) => SelectorData<I, O>,
    render: (props: O) => IVNode<any>,
): () => VNode<null>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null) => SelectorData<I, O>,
    render: ComponentClass<O>,
): () => VNode<null>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null) => SelectorData<I, O>,
    render: (props: O) => IVNode<any>,
): () => VNode<null>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: P, context: Context) => SelectorData<I, O>,
    render: ComponentClass<O> | ((props: O) => IVNode<any>),
): (props: P) => VNode<P> {
    const descriptor = {
        select,
        render: (isComponentClass(render)) ?
            function (props: O): IVNode<O> {
                return $c(render, props);
            } :
            render,
    };
    return function (props: P): VNode<P> {
        return $connect(descriptor, props);
    };
}
