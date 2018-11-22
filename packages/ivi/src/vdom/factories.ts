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
export function elementProto<P>(proto: OpNode<ElementData<P>>) {
  if (DEBUG) {
    if (proto.data.children !== null) {
      throw new Error(`Invalid OpNode, element prototypes can't have any children`);
    }
  }
  const type = createOpType(proto.type.flags | NodeFlags.ElementProto, { node: null, proto });
  return (
    className?: string,
    attrs?: {},
    children: OpChildren = null,
  ) => createOpNode<ElementData>(type, { className, attrs, children });
}

/**
 * component creates an OpNode factory that produces nodes for components.
 *
 * @example
 *
 *     const A = component<string>(() => {
 *       let _text;
 *       const click = onClick(() => { console.log(_text); });
 *
 *       return (text) => (
 *         _text = text,
 *         Events(click,
 *           button(_, _, "Click Me"),
 *         )
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
 * component creates an OpNode factory that produces nodes for components.
 *
 * @example
 *
 *     const A = component<string>(() => {
 *       let _text;
 *       const click = onClick(() => { console.log(_text); });
 *
 *       return (text) => (
 *         _text = text,
 *         Events(click,
 *           button(_, _, "Click Me"),
 *         )
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
 * component creates an OpNode factory that produces nodes for components.
 *
 * @example
 *
 *     const A = component<string>(() => {
 *       let _text;
 *       const click = onClick(() => { console.log(_text); });
 *
 *       return (text) => (
 *         _text = text,
 *         Events(click,
 *           button(_, _, "Click Me"),
 *         )
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
  const type = createOpType(NodeFlags.Component | NodeFlags.DirtyCheck, { c, shouldUpdate });
  return (props: P) => createOpNode(type, props);
}

/**
 * statelessComponent creates an OpNode factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param update - Update function.
 * @param shouldUpdate - `shouldUpdate` function.
 * @returns factory that produces stateless component nodes
 */
export function statelessComponent(
  update: () => OpNode,
): () => OpNode<undefined>;

/**
 * statelessComponent creates an OpNode factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
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
 * statelessComponent creates an OpNode factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param update - Update function.
 * @param shouldUpdate - `shouldUpdate` function.
 * @returns factory that produces stateless component nodes
 */
export function statelessComponent<P>(
  update: (props: P) => OpNode,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (props: P) => OpNode<P> {
  const type = createOpType(NodeFlags.Component, { c: () => update, shouldUpdate });
  return (props: P) => createOpNode(type, props);
}
