import { DEV } from "ivi-vars";
import { Context } from "ivi-core";
import { KeepAliveHandler } from "./keep_alive";
import { StatelessComponent, ComponentClass, isComponentClass } from "./component";
import { VNodeFlags, VNode } from "./vnode";
import { BlueprintNode } from "./blueprint";

/**
 * componentFactory creates a component factory for stateful and stateless components.
 *
 * @param c Stateful or stateless component.
 * @returns ComponentFactory.
 */
export function componentFactory(c: StatelessComponent<void>): () => VNode<null>;
export function componentFactory(c: StatelessComponent<null>): () => VNode<null>;
export function componentFactory<P, U extends P>(c: StatelessComponent<P>): (props: U) => VNode<P>;
export function componentFactory(c: ComponentClass<void>): () => VNode<null>;
export function componentFactory(c: ComponentClass<null>): () => VNode<null>;
export function componentFactory<P, U extends P>(c: ComponentClass<P>): (props: U) => VNode<P>;
export function componentFactory<P>(c: ComponentClass<P> | StatelessComponent<P>): (props: P) => VNode<P> {
  let linkedBlueprint: BlueprintNode | null = null;
  function linkBlueprint(blueprint: BlueprintNode): void {
    linkedBlueprint = blueprint;
  }
  const r = isComponentClass(c) ?
    function (props: P): VNode<P> {
      if (linkedBlueprint === null) {
        return new VNode<P>(
          VNodeFlags.ComponentClass,
          c,
          props!,
          null,
          null,
          null,
        );
      }
      const v = new VNode<P>(
        VNodeFlags.ComponentClass | VNodeFlags.LinkedBlueprint,
        c,
        props!,
        null,
        null,
        null,
      );
      v._style = linkedBlueprint;
      return v;
    } :
    (c as StatelessComponent<P>).isPropsChanged === undefined ?
      function (props: P): VNode<P> {
        if (linkedBlueprint === null) {
          return new VNode<P>(
            VNodeFlags.ComponentFunction,
            c,
            props!,
            null,
            null,
            null,
          );
        }
        const v = new VNode<P>(
          VNodeFlags.ComponentFunction | VNodeFlags.LinkedBlueprint,
          c,
          props!,
          null,
          null,
          null,
        );
        v._style = linkedBlueprint;
        return v;
      } :
      function (props: P): VNode<P> {
        if (linkedBlueprint === null) {
          return new VNode<P>(
            VNodeFlags.ComponentFunction | VNodeFlags.CheckChangedProps,
            c,
            props!,
            null,
            null,
            null,
          );
        }
        const v = new VNode<P>(
          VNodeFlags.ComponentFunction | VNodeFlags.CheckChangedProps | VNodeFlags.LinkedBlueprint,
          c,
          props!,
          null,
          null,
          null,
        );
        v._style = linkedBlueprint;
        return v;
      };
  (r as any).linkBlueprint = linkBlueprint;
  return r;
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
 * @param ctx Context.
 * @param child Child VNode.
 * @returns VNodeBuilder object.
 */
export function context<T = {}>(ctx: Context<T>, child: VNode<any>): VNode<Context<T>> {
  return new VNode<Context<T>>(
    VNodeFlags.ComponentFunction | VNodeFlags.UpdateContext,
    DEV ? UpdateContext as () => VNode<any> : null,
    ctx,
    null,
    child,
    null,
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
      VNodeFlags.ComponentFunction | VNodeFlags.Connect,
      descriptor,
      props,
      null,
      null,
      null,
    );
  };
}

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
