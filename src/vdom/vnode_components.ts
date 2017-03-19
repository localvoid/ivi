import { Context } from "../common/types";
import { ConnectDescriptor } from "./connect_descriptor";
import { KeepAliveHandler } from "./keep_alive";
import { VNodeFlags } from "./flags";
import { ComponentFunction, ComponentClass } from "./component";
import { IVNode } from "./ivnode";
import { VNode } from "./vnode";

/**
 * Create a VNodeBuilder representing a Component node.
 *
 * @param c Component factory.
 * @param props Component props.
 * @returns VNodeBuilder object.
 */
export function $c(c: ComponentFunction<void> | ComponentClass<void>): VNode<void>;
export function $c(c: ComponentFunction<null> | ComponentClass<null>): VNode<null>;
export function $c<P, U extends P>(c: ComponentFunction<P> | ComponentClass<P>, props: U): VNode<P>;
export function $c<P>(c: ComponentFunction<P> | ComponentClass<P>, props?: P): VNode<P> {
    return new VNode<P>(
        (c.prototype.render) ? VNodeFlags.ComponentClass : VNodeFlags.ComponentFunction,
        c,
        props!,
        null,
        null);
}

export function $connect<I, O, P>(
    connectDescriptor: ConnectDescriptor<I, O, P>,
    props: P,
): VNode<P> {
    return new VNode<P>(
        VNodeFlags.ComponentFunction | VNodeFlags.Connect,
        connectDescriptor,
        props,
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
export function $ctx<T = {}>(context: Context<T>, child: IVNode<any>): VNode<Context<T>> {
    return new VNode<Context<T>>(
        VNodeFlags.ComponentFunction | VNodeFlags.UpdateContext,
        __IVI_DEV__ ? UpdateContext as () => IVNode<any> : null,
        context,
        null,
        child);
}

/**
 * Create Keep Alive VNode.
 *
 * @param handler Keep Alive Handler.
 * @param child Child VNode.
 * @param props Props.
 * @returns VNodeBuilder object.
 */
export function $keepAlive<P>(
    handler: (disposed: IVNode<any> | null, props: P) => IVNode<any> | null,
    child: VNode<any>,
    props: P,
): VNode<P>;
export function $keepAlive(
    handler: (disposed: IVNode<any> | null) => IVNode<any> | null,
    child: VNode<any>,
): VNode<null>;
export function $keepAlive<P>(
    handler: KeepAliveHandler,
    child: VNode<any>,
    props?: P,
): VNode<P> {
    return new VNode<P>(
        VNodeFlags.ComponentFunction | VNodeFlags.KeepAlive,
        handler,
        props === undefined ? null : props,
        null,
        child);
}
