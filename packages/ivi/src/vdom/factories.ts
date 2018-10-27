import { CSSStyleProps } from "../dom/style";
import { VNodeFlags } from "./flags";
import { ComponentDescriptor, ComponentHandle } from "./component";
import { VNode } from "./vnode";

function _apply<P>(
  d: ComponentDescriptor<P>,
  ...options: Array<(d: ComponentDescriptor<P>) => ComponentDescriptor<P>>
): ComponentDescriptor<P> {
  for (let i = 0; i < options.length; i++) {
    d = options[i](d);
  }
  return d;
}

function _createDescriptor<P>(
  render: ((h: ComponentHandle<P>) => (props: P) => VNode) | ((props: P) => VNode),
  shouldUpdate: null | ((prev: P, next: P) => boolean),
  select: null | Function,
): ComponentDescriptor<P> {
  return { render, shouldUpdate, select };
}

/**
 * withShouldUpdate creates a function that assigns a `shouldUpdate` options to `ComponentDescriptor`.
 *
 * @example
 *
 *     const A = statelessComponent<{ text: string }>(
 *       ({ text }) => div().c(text),
 *       withShouldUpdate((prev, next) => prev.text !== next.text),
 *     );
 *
 * @param shouldUpdate - Function that performs an early check that prevent unnecessary updates
 * @returns function that assigns a `shouldUpdate` option
 */
export function withShouldUpdate<P>(
  shouldUpdate: (oldProps: P, newProps: P) => boolean,
): (d: ComponentDescriptor<P>) => ComponentDescriptor<P> {
  return (d) => (d.shouldUpdate = shouldUpdate, d);
}

/**
 * `element()` creates a virtual DOM node factory that produces elements with predefined attributes and styles.
 *
 * @example
 *
 *     const DivWithIdAttribute = element(div("", { id: "predefined-id" }));
 *
 *     render(
 *       DivWithIdAttribute(),
 *       document.getElementById("app")!,
 *     );
 *
 * @param proto - Virtual DOM prototype
 * @returns factory that produces elements with predefined attributes
 */
export function element<P, N>(proto: VNode<P, N>): (className?: string, attrs?: P, css?: CSSStyleProps) => VNode<P, N> {
  const flags = proto._f | VNodeFlags.ElementFactory;
  return (className?: string, attrs?: P, css?: CSSStyleProps) => (
    new VNode<P, N>(flags, proto, attrs, className, css)
  );
}

/**
 * statelessComponent creates a virtual DOM node factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<{ text: string }>(
 *       (props) => div().c(props.text),
 *     );
 *
 *     render(
 *       A({ text: "Hello" }),
 *       DOMContainer,
 *     );
 *
 * @param render - Render function
 * @returns factory that produces stateless component nodes
 */
export function component(
  c: () => VNode,
  ...options: Array<(d: ComponentDescriptor<undefined>) => ComponentDescriptor<undefined>>
): () => VNode<undefined>;

/**
 * statelessComponent creates a virtual DOM node factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<{ text: string }>(
 *       (props) => div().c(props.text),
 *     );
 *
 *     render(
 *       A({ text: "Hello" }),
 *       DOMContainer,
 *     );
 *
 * @param render - Render function
 * @returns factory that produces stateless component nodes
 */
export function component<P>(
  render: undefined extends P ? (props?: P) => VNode<any> : (props: P) => VNode<any>,
  ...options: Array<(d: ComponentDescriptor<P>) => ComponentDescriptor<P>>
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;

/**
 * statelessComponent creates a virtual DOM node factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<{ text: string }>(
 *       (props) => div().c(props.text),
 *     );
 *
 *     render(
 *       A({ text: "Hello" }),
 *       DOMContainer,
 *     );
 *
 * @param render - Render function
 * @returns factory that produces stateless component nodes
 */
export function component<P>(
  render: (props: P) => VNode<any>,
  ...options: Array<(d: ComponentDescriptor<P>) => ComponentDescriptor<P>>
): (props: P) => VNode<P> {
  const d = _apply(_createDescriptor(render, null, null), ...options);
  const f = (props: P) => {
    const n = new VNode<P>(VNodeFlags.Component, d, props, "", void 0);
    /* istanbul ignore else */
    if (DEBUG) {
      n.factory = f;
    }
    return n;
  };
  return f;
}

/**
 * statefulComponent creates a virtual DOM node factory that produces nodes for stateful components.
 *
 * @example
 *
 *     const A = statefulComponent<string>(() => {
 *       const click = onClick((ev, text) => console.log(text));
 *
 *       return (text) => (
 *         button()
 *           .e(click(text))
 *           .t("Click Me")
 *       );
 *     });
 *
 *     render(
 *       A("click me"),
 *       DOMContainer,
 *     );
 *
 * @param c - Stateful component
 * @returns factory that produces stateful component nodes
 */
export function statefulComponent(
  render: (h: ComponentHandle<undefined>) => () => VNode,
  ...options: Array<(d: ComponentDescriptor<undefined>) => ComponentDescriptor<undefined>>
): () => VNode<undefined>;

/**
 * statefulComponent creates a virtual DOM node factory that produces nodes for stateful components.
 *
 * @example
 *
 *     const A = statefulComponent<string>(() => {
 *       const click = onClick((ev, text) => console.log(text));
 *
 *       return (text) => (
 *         button()
 *           .e(click(text))
 *           .t("Click Me")
 *       );
 *     });
 *
 *     render(
 *       A("click me"),
 *       DOMContainer,
 *     );
 *
 * @param c - Stateful component
 * @returns factory that produces stateful component nodes
 */
export function statefulComponent<P>(
  render: (h: ComponentHandle<P>) => (props: P) => VNode,
  ...options: Array<(d: ComponentDescriptor<P>) => ComponentDescriptor<P>>
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;

/**
 * statefulComponent creates a virtual DOM node factory that produces nodes for stateful components.
 *
 * @example
 *
 *     const A = statefulComponent<string>(() => {
 *       const click = onClick((ev, text) => console.log(text));
 *
 *       return (text) => (
 *         button()
 *           .e(click(text))
 *           .t("Click Me")
 *       );
 *     });
 *
 *     render(
 *       A("click me"),
 *       DOMContainer,
 *     );
 *
 * @param render - Stateful component
 * @returns factory that produces stateful component nodes
 */
export function statefulComponent<P>(
  render: (h: ComponentHandle<P>) => (props: P) => VNode,
  ...options: Array<(d: ComponentDescriptor<P>) => ComponentDescriptor<P>>
): (props: P) => VNode<P> {
  const d = _apply(_createDescriptor(render, null, null), ...options);
  const f = (props: P) => {
    const n = new VNode<P>(VNodeFlags.Component | VNodeFlags.StatefulComponent, d, props, "", void 0);
    /* istanbul ignore else */
    if (DEBUG) {
      n.factory = f;
    }
    return n;
  };
  return f;
}

/**
 * connect creates a virtual DOM node factory that produces connector nodes.
 *
 * @example
 *
 *     const Connector = connect<string, undefined, { result: string }>(
 *       (prev, props, context) => {
 *         const result = context.result;
 *
 *         return (prev !== null && prev === result) ? prev :
 *           result;
 *       },
 *       (text) => div().c(text),
 *     );
 *
 *     render(
 *       context({ result: "text" },
 *         Connector(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param select - Selector function
 * @param render - Render function
 * @returns factory that produces connector nodes
 */
export function connect<T>(
  select: (prev: T | null) => T,
  componentFactory: (props: T) => VNode,
): () => VNode<undefined>;

/**
 * connect creates a virtual DOM node factory that produces connector nodes.
 *
 * @example
 *
 *     const Connector = connect<string, undefined, { result: string }>(
 *       (_prev, _props, context) => context.result,
 *       statelessComponent<string>((text) => div().c(text)),
 *     );
 *
 *     render(
 *       context({ result: "text" },
 *         Connector(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param select - Selector function
 * @param componentFactory - Component factory
 * @returns factory that produces connector nodes
 */
export function connect<T, P>(
  select: undefined extends P ? (prev: T | null, props?: P) => T : (prev: T | null, props: P) => T,
  componentFactory: (props: T) => VNode,
): undefined extends P ? () => VNode<P> : (props: P) => VNode<P>;

/**
 * connect creates a virtual DOM node factory that produces connector nodes.
 *
 * @example
 *
 *     const Connector = connect<string, undefined, { result: string }>(
 *       (_prev, _props, context) => context.result,
 *       statelessComponent<string>((text) => div().c(text)),
 *     );
 *
 *     render(
 *       context({ result: "text" },
 *         Connector(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param select - Selector function
 * @param componentFactory - Component factory
 * @returns factory that produces connector nodes
 */
export function connect<T, P, C>(
  select: (prev: T | null, props: P, context: C) => T,
  componentFactory: (props: T) => VNode,
): undefined extends P ? () => VNode<P> : (props: P) => VNode<P>;

/**
 * connect creates a virtual DOM node factory that produces connector nodes.
 *
 * @example
 *
 *     const Connector = connect<string, undefined, { result: string }>(
 *       (_prev, _props, context) => context.result,
 *       statelessComponent<string>((text) => div().c(text)),
 *     );
 *
 *     render(
 *       context({ result: "text" },
 *         Connector(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param select - Selector function
 * @param componentFactory - Component factory
 * @returns factory that produces connector nodes
 */
export function connect<T, P, C>(
  select: (prev: T | null, props: P, context: C) => T,
  componentFactory: (props: T) => VNode<T>,
): (props: P) => VNode<P> {
  const vnode = componentFactory(undefined as any);
  const flags = vnode._f | VNodeFlags.Connect;
  const descriptor = _createDescriptor(
    (vnode._t as ComponentDescriptor<T>).render,
    (vnode._t as ComponentDescriptor<T>).shouldUpdate,
    select,
  );
  const f = (props: P) => {
    const n = new VNode<P>(flags, descriptor, props, "", void 0);
    /* istanbul ignore else */
    if (DEBUG) {
      n.factory = f;
    }
    return n;
  };
  return f;
}

/**
 * context creates a virtual DOM node that will modify current context.
 *
 * @example
 *
 *     render(
 *       context({ key: 123 },
 *         ChildComponent(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param ctx - Context object
 * @param child - child Virtual DOM node
 * @returns context node
 */
export function context<T = {}>(ctx: T, child: VNode): VNode<T> {
  /* istanbul ignore else */
  if (DEBUG) {
    if (child._l !== child) {
      throw new Error("Context node contains an invalid child. Child should be a singular VNode.");
    }
  }
  const n = new VNode<T>(
    VNodeFlags.UpdateContext,
    null,
    ctx,
    "",
    void 0,
  );
  n._c = child;
  return n;
}
