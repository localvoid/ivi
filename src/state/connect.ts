import { Context } from "../common/types";
import { ConnectDescriptor, SelectorData } from "../vdom/connect_descriptor";
import { ComponentClass, isComponentClass } from "../vdom/component";
import { VNode } from "../vdom/vnode";
import { $c, $connect } from "../vdom/vnode_components";

/* tslint:disable:unified-signatures */
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: null | void, context: Context) => SelectorData<I, O>,
    render: ComponentClass<O>,
): () => VNode<P>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: null | void, context: Context) => SelectorData<I, O>,
    render: (props: O) => VNode<any>,
): () => VNode<P>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: P, context: Context) => SelectorData<I, O>,
    render: ComponentClass<O>,
): (props: P) => VNode<P>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: P, context: Context) => SelectorData<I, O>,
    render: (props: O) => VNode<any>,
): (props: P) => VNode<P>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: null | void) => SelectorData<I, O>,
    render: ComponentClass<O>,
): () => VNode<null>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: null | void) => SelectorData<I, O>,
    render: (props: O) => VNode<any>,
): () => VNode<null>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null) => SelectorData<I, O>,
    render: ComponentClass<O>,
): () => VNode<null>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null) => SelectorData<I, O>,
    render: (props: O) => VNode<any>,
): () => VNode<null>;
export function connect<I, O, P>(
    select: (prev: SelectorData<I, O> | null, props: P, context: Context) => SelectorData<I, O>,
    render: ComponentClass<O> | ((props: O) => VNode<any>),
): (props: P) => VNode<P> {
    let descriptor: ConnectDescriptor<I, O, P>;
    if (__IVI_DEV__) {
        if (isComponentClass(render)) {
            const fn = function (props: O): VNode<O> {
                return $c(render, props);
            };
            fn.displayName = render.constructor.name;
            descriptor = {
                select,
                render: fn,
            };
        } else {
            descriptor = {
                select,
                render,
            };
        }
    } else {
        descriptor = {
            select,
            render: (isComponentClass(render)) ?
                function (props: O): VNode<O> {
                    return $c(render, props);
                } :
                render,
        };
    }
    return function (props: P): VNode<P> {
        return $connect(descriptor, props);
    };
}
/* tslint:enable:unified-signatures */
