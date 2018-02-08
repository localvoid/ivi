import { DEV } from "ivi-vars";
import { Context } from "ivi-core";
import { KeepAliveHandler } from "./keep_alive";
import { VNodeFlags } from "./flags";
import { StatelessComponent, ComponentClass, isComponentClass } from "./component";
import { VNode } from "./vnode";
import { ConnectDescriptor } from "..";

export interface ComponentFactory<P> {
  (props?: P): VNode<P>;
  __ComponentFactory__?: ComponentClass<P> | StatelessComponent<P>;
}

export function isComponentFactory(o: object): o is ComponentFactory<any> {
  return (o as ComponentFactory<any>).__ComponentFactory__ !== undefined;
}

export function componentFactory(c: StatelessComponent<void>): () => VNode<null>;
export function componentFactory(c: StatelessComponent<null>): () => VNode<null>;
export function componentFactory<P, U extends P>(c: StatelessComponent<P>): (props: U) => VNode<P>;
export function componentFactory(c: ComponentClass<void>): () => VNode<null>;
export function componentFactory(c: ComponentClass<null>): () => VNode<null>;
export function componentFactory<P, U extends P>(c: ComponentClass<P>): (props: U) => VNode<P>;
export function componentFactory<P>(c: ComponentClass<P> | StatelessComponent<P>): (props: P) => VNode<P> {
  const f = isComponentClass(c) ?
    function (props: P): VNode<P> {
      return new VNode<P>(
        VNodeFlags.ComponentClass,
        c,
        props!,
        null,
        null,
      );
    } :
    (c as StatelessComponent<P>).isPropsChanged === undefined ?
      function (props: P): VNode<P> {
        return new VNode<P>(
          VNodeFlags.ComponentFunction,
          c,
          props!,
          null,
          null,
        );
      } :
      function (props: P): VNode<P> {
        return new VNode<P>(
          VNodeFlags.ComponentFunction | VNodeFlags.CheckChangedProps,
          c,
          props!,
          null,
          null,
        );
      };
  if (DEV) {
    (f as ComponentFactory<P>).__ComponentFactory__ = c;
  }
  return f;
}

/**
 * UpdateContext is a placeholder function for update context components.
 *
 * It is used only in Dev Mode for stack traces.
 */
function UpdateContext() {
  /* tslint:disable:no-empty */
  /* tslint:enable:no-empty */
}

/**
 * context creates an update context VNode.
 *
 * @param ctx Context.
 * @param child Child VNode.
 * @returns VNodeBuilder object.
 */
export function context<T = {}>(ctx: Context<T>, child: VNode): VNode<Context<T>> {
  return new VNode<Context<T>>(
    VNodeFlags.UpdateContext,
    DEV ? UpdateContext as () => VNode : null,
    ctx,
    null,
    child,
  );
}

export function connect<T, C extends Context>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: null, context: C) => T,
): () => VNode<null>;
export function connect<T, P, C extends Context>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: P, context: C) => T,
): (props: P) => VNode<P>;
export function connect<T>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: null) => T,
): () => VNode<null>;
export function connect<T, P>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: P) => T,
): (props: P) => VNode<P>;
export function connect<T>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null) => T,
): () => VNode<null>;
export function connect<T, P, C extends Context>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: P, context: C) => T,
): (props: P) => VNode<P> {
  const descriptor = { select, render };
  return function (props: P): VNode<P> {
    return new VNode<P>(
      VNodeFlags.Connect,
      descriptor as ConnectDescriptor<any, any, Context>,
      props,
      null,
      null,
    );
  };
}

/**
 * keepAlive creates keep alive VNode.
 *
 * @param handler Keep Alive Handler.
 * @param child Child VNode.
 * @param props Props.
 * @returns VNodeBuilder object.
 */
export function keepAlive<P>(
  handler: (disposed: VNode | null, props: P) => VNode | null,
  child: VNode,
  props: P,
): VNode<P>;
export function keepAlive(
  handler: (disposed: VNode | null) => VNode | null,
  child: VNode,
): VNode<null>;
export function keepAlive<P>(
  handler: KeepAliveHandler,
  child: VNode,
  props?: P,
): VNode<P> {
  return new VNode<P>(
    VNodeFlags.KeepAlive,
    handler,
    props === undefined ? null : props,
    null,
    child,
  );
}
