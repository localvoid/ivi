import { Context, SelectorData } from "ivi-core";
import { ConnectDescriptor } from "./connect_descriptor";
import { KeepAliveHandler } from "./keep_alive";
import { StatelessComponent, ComponentClass, isComponentClass } from "./component";
import { VNodeFlags, VNode } from "./vnode";

export function componentFactory(c: ComponentClass<void>): () => VNode<null>;
export function componentFactory(c: ComponentClass<null>): () => VNode<null>;
export function componentFactory<P, U extends P>(c: ComponentClass<P>): (props: U) => VNode<P>;
export function componentFactory<P>(c: ComponentClass<P>): (props?: P) => VNode<P> {
    return function (props: P): VNode<P> {
        return new VNode<P>(
            VNodeFlags.ComponentClass,
            c,
            props!,
            null,
            null,
            null,
        );
    };
}

export function statelessComponentFactory(c: StatelessComponent<void>): () => VNode<null>;
export function statelessComponentFactory(c: StatelessComponent<null>): () => VNode<null>;
export function statelessComponentFactory<P, U extends P>(c: StatelessComponent<P>): (props: U) => VNode<P>;
export function statelessComponentFactory<P>(c: StatelessComponent<P>): (props?: P) => VNode<P> {
    return function (props: P): VNode<P> {
        return new VNode<P>(
            VNodeFlags.ComponentFunction,
            c,
            props!,
            null,
            null,
            null,
        );
    };
}

/**
 * Create a VNode representing a Component node.
 *
 * @param c Component Class.
 * @returns VNode object.
 */
export function component(c: ComponentClass<void>): VNode<null>;
export function component(c: ComponentClass<null>): VNode<null>;
export function component<P, U extends P>(c: ComponentClass<P>, props: U): VNode<P>;
export function component<P>(c: ComponentClass<P>, props?: P): VNode<P> {
    return new VNode<P>(
        (c.prototype.render === undefined) ? VNodeFlags.ComponentFunction : VNodeFlags.ComponentClass,
        c,
        props!,
        null,
        null,
        null,
    );
}

/**
 * Create a VNode representing a Stateless Component node.
 *
 * @param c Component Class.
 * @returns VNode object.
 */
export function statelessComponent(c: StatelessComponent<void>): VNode<null>;
export function statelessComponent(c: StatelessComponent<null>): VNode<null>;
export function statelessComponent<P, U extends P>(c: StatelessComponent<P>, props: U): VNode<P>;
export function statelessComponent<P>(c: StatelessComponent<P>, props?: P): VNode<P> {
    return new VNode<P>(
        VNodeFlags.ComponentFunction,
        c,
        props!,
        null,
        null,
        null,
    );
}

/**
 * Placeholder function for Update Context components.
 *
 * It is used only in Dev Mode for stack traces.
 */
function UpdateContext() {
    /* tslint:disable:no-empty */
    /* tslint:enable:no-empty */
}

/**
 * Create an update context VNode.
 *
 * @param context Context.
 * @param child Child VNode.
 * @returns VNodeBuilder object.
 */
export function context<T = {}>(context: Context<T>, child: VNode<any>): VNode<Context<T>> {
    return new VNode<Context<T>>(
        VNodeFlags.ComponentFunction | VNodeFlags.UpdateContext,
        __IVI_DEV__ ? UpdateContext as () => VNode<any> : null,
        context,
        null,
        child,
        null,
    );
}

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
                return new VNode<O>(
                    VNodeFlags.ComponentClass,
                    render as ComponentClass<any>,
                    props!,
                    null,
                    null,
                    null,
                );
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
                    return new VNode<O>(
                        VNodeFlags.ComponentClass,
                        render as ComponentClass<any>,
                        props!,
                        null,
                        null,
                        null,
                    );
                } :
                render,
        };
    }
    return function (props: P): VNode<P> {
        return new VNode<P>(
            VNodeFlags.ComponentFunction | VNodeFlags.Connect,
            descriptor,
            props,
            null,
            null,
            null,
        );
    };
}
/* tslint:enable:unified-signatures */

/**
 * Create Keep Alive VNode.
 *
 * @param handler Keep Alive Handler.
 * @param child Child VNode.
 * @param props Props.
 * @returns VNodeBuilder object.
 */
export function keepAlive<P>(
    handler: (disposed: VNode<any> | null, props: P) => VNode<any> | null,
    child: VNode<any>,
    props: P,
): VNode<P>;
export function keepAlive(
    handler: (disposed: VNode<any> | null) => VNode<any> | null,
    child: VNode<any>,
): VNode<null>;
export function keepAlive<P>(
    handler: KeepAliveHandler,
    child: VNode<any>,
    props?: P,
): VNode<P> {
    // SSR implementation should just ignore keepAlive and return `child`.
    return child;
}
