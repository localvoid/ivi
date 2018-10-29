import { CSSStyleProps } from "../dom/style";
import { ComponentDescriptor, Component } from "./component";
import { VNodeFlags, VNode } from "./vnode";

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
 * component creates a virtual DOM node factory that produces nodes for components.
 *
 * @example
 *
 *     const A = component<string>(() => {
 *       let _text;
 *       const click = onClick((ev) => console.log(_text));
 *
 *       return (text) => (
 *         _text = text,
 *         button()
 *           .e(click(text))
 *           .t("Click Me")
 *       );
 *     });
 *
 * @param c - Component function.
 * @param options - Component options.
 * @returns factory that produces component nodes
 */
export function component(
  c: (c: Component<undefined>) => () => VNode,
  ...options: Array<(d: ComponentDescriptor<undefined>) => void>
): () => VNode<undefined>;

/**
 * component creates a virtual DOM node factory that produces nodes for components.
 *
 * @example
 *
 *     const A = component<string>(() => {
 *       let _text;
 *       const click = onClick((ev) => console.log(_text));
 *
 *       return (text) => (
 *         _text = text,
 *         button()
 *           .e(click(text))
 *           .t("Click Me")
 *       );
 *     });
 *
 * @param c - Component function.
 * @param options - Component options.
 * @returns factory that produces component nodes
 */
export function component<P>(
  c: (c: Component<P>) => (props: P) => VNode,
  ...options: Array<(d: ComponentDescriptor<P>) => void>
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;

/**
 * component creates a virtual DOM node factory that produces nodes for components.
 *
 * @example
 *
 *     const A = component<string>(() => {
 *       let _text;
 *       const click = onClick((ev) => console.log(_text));
 *
 *       return (text) => (
 *         _text = text,
 *         button()
 *           .e(click(text))
 *           .t("Click Me")
 *       );
 *     });
 *
 * @param c - Component function.
 * @param options - Component options.
 * @returns factory that produces component nodes
 */
export function component<P>(
  c: (c: Component<P>) => (props: P) => VNode,
  ...options: Array<(d: ComponentDescriptor<P>) => void>
): (props: P) => VNode<P> {
  const d: ComponentDescriptor<P> = { c, shouldUpdate: null };
  for (let i = 0; i < options.length; i++) {
    options[i](d);
  }
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
 * statelessComponent creates a virtual DOM node factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<string>(() => {
 *       return (text) => div().t(text);
 *     });
 *
 * @param update - Update function.
 * @param options - Component options.
 * @returns factory that produces stateless component nodes
 */
export function statelessComponent(
  update: () => VNode,
  ...options: Array<(d: ComponentDescriptor<undefined>) => void>
): () => VNode<undefined>;

/**
 * statelessComponent creates a virtual DOM node factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<string>(() => {
 *       return (text) => div().t(text);
 *     });
 *
 * @param update - Update function.
 * @param options - Component options.
 * @returns factory that produces stateless component nodes
 */
export function statelessComponent<P>(
  update: (props: P) => VNode,
  ...options: Array<(d: ComponentDescriptor<P>) => void>
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;

/**
 * statelessComponent creates a virtual DOM node factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<string>(() => {
 *       return (text) => div().t(text);
 *     });
 *
 * @param update - Update function.
 * @param options - Component options.
 * @returns factory that produces stateless component nodes
 */
export function statelessComponent<P>(
  update: (props: P) => VNode,
  ...options: Array<(d: ComponentDescriptor<P>) => void>
): (props: P) => VNode<P> {
  return component(() => update, ...options);
}

/**
 * withShouldUpdate creates a function that assigns a `shouldUpdate` options to a `ComponentDescriptor`.
 *
 * @example
 *
 *     const A = component<{ text: string }>(
 *       () => ({ text }) => div().c(text),
 *       withShouldUpdate((prev, next) => prev.text !== next.text),
 *     );
 *
 * @param shouldUpdate - Function that performs an early check that prevent unnecessary updates
 * @returns function that assigns a `shouldUpdate` option
 */
export function withShouldUpdate<P>(
  shouldUpdate: (oldProps: P, newProps: P) => boolean,
): (d: ComponentDescriptor<P>) => void {
  return (d) => { d.shouldUpdate = shouldUpdate; };
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
