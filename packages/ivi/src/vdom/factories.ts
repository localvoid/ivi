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
 * @param shouldUpdate - `shouldUpdate` function.
 * @returns factory that produces component nodes
 */
export function component(
  c: (c: Component<undefined>) => () => VNode,
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
 * @param shouldUpdate - `shouldUpdate` function.
 * @returns factory that produces component nodes
 */
export function component<P>(
  c: (c: Component<P>) => (props: P) => VNode,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
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
 * @param shouldUpdate - `shouldUpdate` function.
 * @returns factory that produces component nodes
 */
export function component<P>(
  c: (c: Component<P>) => (props: P) => VNode,
  shouldUpdate?: (prev: P, next: P) => boolean,
): (props: P) => VNode<P> {
  const d: ComponentDescriptor<P> = { c, shouldUpdate };
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
 * @param shouldUpdate - `shouldUpdate` function.
 * @returns factory that produces stateless component nodes
 */
export function statelessComponent(
  update: () => VNode,
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
 * @param shouldUpdate - `shouldUpdate` function.
 * @returns factory that produces stateless component nodes
 */
export function statelessComponent<P>(
  update: (props: P) => VNode,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
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
 * @param shouldUpdate - `shouldUpdate` function.
 * @returns factory that produces stateless component nodes
 */
export function statelessComponent<P>(
  update: (props: P) => VNode,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (props: P) => VNode<P> {
  return component(() => update, shouldUpdate);
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
