import { Context } from "../common/types";
import { IVNode } from "../vdom/ivnode";
import { SelectorData } from "../vdom/connect_descriptor";
import { ComponentClass, isComponentClass } from "../vdom/component";
import { VNode, $c, $connect } from "../vdom/vnode";

export function connect<U, K>(
    select: (prev: SelectorData<K, U> | null) => SelectorData<K, U>,
    render: ComponentClass<U> | ((props: U) => IVNode<any>),
): () => VNode<null>;
export function connect<U, K>(
    select: (prev: SelectorData<K, U> | null, props: null, context: Context) => SelectorData<K, U>,
    render: ComponentClass<U> | ((props: U) => IVNode<any>),
): () => VNode<null>;
export function connect<T, U, K>(
    select: (prev: SelectorData<K, U> | null, props: null, context: Context) => SelectorData<K, U>,
    render: ComponentClass<U> | ((props: U) => IVNode<any>),
): (props: null) => VNode<T>;
export function connect<T, U, K>(
    select: (prev: SelectorData<K, U> | null, props: null | T, context: Context) => SelectorData<K, U>,
    render: ComponentClass<U> | ((props: U) => IVNode<any>),
): (props: null | T) => VNode<T> {
    if (isComponentClass(render)) {
        render = function (props: U): IVNode<U> {
            return $c(render, props);
        };
    }
    const descriptor = {
        select,
        render,
    };
    return function (props: T): VNode<T> {
        return $connect(descriptor, props);
    };
}
