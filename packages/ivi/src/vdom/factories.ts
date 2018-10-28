import { CSSStyleProps } from "../dom/style";
import { VNodeFlags } from "./flags";
import { ComponentDescriptor, ComponentHandle } from "./component";
import { VNode } from "./vnode";

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
 * component creates a virtual DOM node factory that produces nodes for components.
 *
 * @example
 *
 *     const A = component<string>(() => {
 *       const click = onClick((ev) => console.log(text));
 *
 *       return (text) => (
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
  c: (h: ComponentHandle<undefined>) => () => VNode,
  ...options: Array<(d: ComponentDescriptor<undefined>) => ComponentDescriptor<undefined>>
): () => VNode<undefined>;

/**
 * component creates a virtual DOM node factory that produces nodes for components.
 *
 * @example
 *
 *     const A = component<string>(() => {
 *       const click = onClick((ev) => console.log(text));
 *
 *       return (text) => (
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
  c: (h: ComponentHandle<P>) => (props: P) => VNode,
  ...options: Array<(d: ComponentDescriptor<P>) => ComponentDescriptor<P>>
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;

/**
 * component creates a virtual DOM node factory that produces nodes for components.
 *
 * @example
 *
 *     const A = component<string>(() => {
 *       const click = onClick((ev) => console.log(text));
 *
 *       return (text) => (
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
  c: (h: ComponentHandle<P>) => (props: P) => VNode,
  ...options: Array<(d: ComponentDescriptor<P>) => ComponentDescriptor<P>>
): (props: P) => VNode<P> {
  const d = { c, shouldUpdate: null };
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
