import { KeepAliveHandler } from "./keep_alive";
import { VNodeFlags } from "./flags";
import { ComponentClass } from "./component";
import { VNode } from "./vnode";
import { ConnectDescriptor } from "..";

export function statelessComponentFactory(c: () => VNode): () => VNode<null>;
export function statelessComponentFactory<P, U extends P>(
  c: (props: U | undefined) => VNode<any>,
  isPropsChanged?: (oldProps: P, newProps: P) => boolean,
): (props?: U) => VNode<P>;
export function statelessComponentFactory<P, U extends P>(
  c: (props: U) => VNode<any>,
  isPropsChanged?: (oldProps: P, newProps: P) => boolean,
): (props: U) => VNode<P>;
export function statelessComponentFactory<P>(
  c: (props: P) => VNode<any>,
  isPropsChanged?: (oldProps: P, newProps: P) => boolean,
): (props: P) => VNode<P> {
  const d = {
    render: c,
    isPropsChanged,
  };
  if (isPropsChanged === undefined) {
    return function (props: P): VNode<P> {
      return new VNode<P>(
        VNodeFlags.ComponentFunction,
        d,
        props,
        null,
        null,
      );
    };
  }
  return function (props: P): VNode<P> {
    return new VNode<P>(
      VNodeFlags.ComponentFunction | VNodeFlags.CheckChangedProps,
      d,
      props,
      null,
      null,
    );
  };
}

export function componentFactory(c: ComponentClass<void>): () => VNode<null>;
export function componentFactory(c: ComponentClass<null>): () => VNode<null>;
export function componentFactory<P, U extends P>(c: ComponentClass<P | undefined>): (props?: U) => VNode<P>;
export function componentFactory<P, U extends P>(c: ComponentClass<P>): (props: U) => VNode<P>;
export function componentFactory<P>(c: ComponentClass<P>): (props: P) => VNode<P> {
  return function (props: P): VNode<P> {
    return new VNode<P>(
      VNodeFlags.ComponentClass,
      c,
      props,
      null,
      null,
    );
  };
}

/**
 * context creates an update context VNode.
 *
 * @param ctx Context.
 * @param child Child VNode.
 * @returns VNodeBuilder object.
 */
export function context<T = {}>(ctx: T, child: VNode): VNode<T> {
  return new VNode<T>(
    VNodeFlags.UpdateContext,
    null,
    ctx,
    null,
    child,
  );
}

export function connect<T, C>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: undefined, context: C) => T,
): () => VNode<null>;
export function connect<T, P, C>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: P, context: C) => T,
): (props: P) => VNode<P>;
export function connect<T>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: undefined) => T,
): () => VNode<null>;
export function connect<T, P>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: P) => T,
): (props: P) => VNode<P>;
export function connect<T>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null) => T,
): () => VNode<null>;
export function connect<T, P, C>(
  render: (props: T) => VNode<any>,
  select: (prev: T | null, props: P, context: C) => T,
): (props: P) => VNode<P> {
  const descriptor = { select, render };
  return function (props: P): VNode<P> {
    return new VNode<P>(
      VNodeFlags.Connect,
      descriptor as ConnectDescriptor<any, any, {}>,
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
