import { VNodeFlags } from "./flags";
import { StatefulComponent } from "./component";
import { VNode } from "./vnode";
import { ConnectDescriptor } from "./connect_descriptor";

export function statelessComponentFactory(c: () => VNode): () => VNode<undefined>;
export function statelessComponentFactory<P>(
  render: undefined extends P ? (props?: P) => VNode<any> : (props: P) => VNode<any>,
  shouldUpdate?: (oldProps: P, newProps: P) => boolean,
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;
export function statelessComponentFactory<P>(
  render: (props: P) => VNode<any>,
  shouldUpdate?: (oldProps: P, newProps: P) => boolean,
): (props: P) => VNode<P> {
  const d = { render, shouldUpdate };
  if (shouldUpdate === undefined) {
    return function (props: P): VNode<P> {
      return new VNode<P>(
        VNodeFlags.StatelessComponent,
        d,
        props,
        void 0,
        null,
      );
    };
  }
  return function (props: P): VNode<P> {
    return new VNode<P>(
      VNodeFlags.StatelessComponent | VNodeFlags.ShouldUpdateHint,
      d,
      props,
      void 0,
      null,
    );
  };
}

export function componentFactory(c: StatefulComponent<undefined>): () => VNode<undefined>;
export function componentFactory<P>(
  c: StatefulComponent<P>,
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;
export function componentFactory<P>(
  c: StatefulComponent<P>,
): (props: P) => VNode<P> {
  return function (props: P): VNode<P> {
    return new VNode<P>(
      VNodeFlags.StatefulComponent,
      c,
      props,
      void 0,
      null,
    );
  };
}

/**
 * context creates a VNode that modifies current context.
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
    void 0,
    child,
  );
}

export function connect<T>(
  select: (prev: T | null) => T,
  render: (props: T) => VNode<any>,
): () => VNode<undefined>;
export function connect<T, P>(
  select: undefined extends P ? (prev: T | null, props?: P) => T : (prev: T | null, props: P) => T,
  render: (props: T) => VNode<any>,
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;
export function connect<T, P, C>(
  select: (prev: T | null, props: P, context: C) => T,
  render: (props: T) => VNode<any>,
): undefined extends P ? () => VNode<P> : (props: P) => VNode<P>;
export function connect<T, P, C>(
  select: (prev: T | null, props: P, context: C) => T,
  render: (props: T) => VNode<any>,
): (props: P) => VNode<P> {
  const descriptor = { select, render };
  return function (props: P): VNode<P> {
    return new VNode<P>(
      VNodeFlags.Connect,
      descriptor as ConnectDescriptor<any, any, {}>,
      props,
      void 0,
      null,
    );
  };
}
