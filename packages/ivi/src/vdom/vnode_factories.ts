import { DEV } from "ivi-vars";
import { Context, SelectorData } from "ivi-core";
import { ConnectDescriptor } from "./connect_descriptor";
import { KeepAliveHandler } from "./keep_alive";
import { VNodeFlags } from "./flags";
import { StatelessComponent, ComponentClass, isComponentClass } from "./component";
import { VNode } from "./vnode";

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
export function componentFactory<P>(c: ComponentClass<P> | StatelessComponent<P>): (props?: P) => VNode<P> {
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
export function context<T = {}>(ctx: Context<T>, child: VNode<any>): VNode<Context<T>> {
  return new VNode<Context<T>>(
    VNodeFlags.UpdateContext,
    DEV ? UpdateContext as () => VNode<any> : null,
    ctx,
    null,
    child,
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
  if (DEV) {
    if (isComponentClass(render)) {
      const fn = function (props: O): VNode<O> {
        return new VNode<O>(
          VNodeFlags.ComponentClass,
          render as ComponentClass<any>,
          props!,
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
      render: isComponentClass(render) ?
        function (props: O): VNode<O> {
          return new VNode<O>(
            VNodeFlags.ComponentClass,
            render as ComponentClass<any>,
            props!,
            null,
            null,
          );
        } :
        render,
    };
  }
  return function (props: P): VNode<P> {
    return new VNode<P>(
      VNodeFlags.Connect,
      descriptor,
      props,
      null,
      null,
    );
  };
}
/* tslint:enable:unified-signatures */

/**
 * keepAlive creates keep alive VNode.
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
  return new VNode<P>(
    VNodeFlags.KeepAlive,
    handler,
    props === undefined ? null : props,
    null,
    child,
  );
}
