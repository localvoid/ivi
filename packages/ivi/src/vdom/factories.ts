// import { CSSStyleProps } from "../dom/style";
import { NodeFlags } from "./node_flags";
import { OpNode, OpChildren, ElementData, createOpNode, createOpType } from "./operations";
import { StateNode } from "./state";

function element<T, U>(tag: string, svg: boolean) {
  const type = createOpType(
    svg === true ? (NodeFlags.Element | NodeFlags.Svg) : NodeFlags.Element,
    tag,
  );
  return (
    className?: string,
    attrs?: {},
    children: OpChildren = null,
  ) => (
      createOpNode<ElementData>(type, { className, attrs, children })
    );
}

export const htmlElement: <T, U>(tag: string) => (
  className?: string,
  attrs?: {},
  children?: OpChildren,
) => OpNode<ElementData<T>> = (tag: string) => element(tag, false);
export const svgElement: <T, U>(tag: string) => (
  className?: string,
  attrs?: {},
  children?: OpChildren,
) => OpNode<ElementData<T>> = (tag: string) => element(tag, true);

/**
 * `element()` creates a factory that produces elements with predefined attributes.
 *
 * @example
 *
 *     const DivWithIdAttribute = element(div(_, { id: "predefined-id" }));
 *
 *     render(
 *       DivWithIdAttribute("class-name", { title: "Title" }, "Hello World"),
 *       document.getElementById("app")!,
 *     );
 *
 * @param proto - Element prototype
 * @returns factory that produces elements with predefined attributes
 */
export function elementProto<P>(proto: OpNode<P>) {
  const type = createOpType(proto.type.flags | NodeFlags.ElementProto, { node: null, proto });
  return (
    className?: string,
    attrs?: {},
    children: OpChildren = null,
  ) => createOpNode<ElementData>(type, { className, attrs, children });
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
  c: (c: StateNode) => () => OpNode,
): () => OpNode<undefined>;

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
  c: (c: StateNode) => (props: P) => OpNode,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? (props?: P) => OpNode<P> : (props: P) => OpNode<P>;

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
  c: (c: StateNode) => (props: P) => OpNode,
  shouldUpdate?: (prev: P, next: P) => boolean,
): (props: P) => OpNode<P> {
  const type = createOpType(NodeFlags.Component, { c, shouldUpdate });
  return (props: P) => createOpNode(type, props);
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
  update: () => OpNode,
): () => OpNode<undefined>;

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
  update: (props: P) => OpNode,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? (props?: P) => OpNode<P> : (props: P) => OpNode<P>;

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
  update: (props: P) => OpNode,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (props: P) => OpNode<P> {
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
// export function context<T = {}>(ctx: T, child: OpNode): OpNode<T> {
//   /* istanbul ignore else */
//   if (DEBUG) {
//     if (child._l !== child) {
//       throw new Error("Context node contains an invalid child. Child should be a singular VNode.");
//     }
//   }
//   const n = new OpNode<T>(
//     VNodeFlags.UpdateContext,
//     null,
//     ctx,
//     "",
//     void 0,
//   );
//   n._c = child;
//   return n;
// }
