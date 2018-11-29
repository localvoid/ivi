// import { CSSStyleProps } from "../dom/style";
import { NodeFlags } from "./node_flags";
import { OpNode, Op, ElementData, createOpNode, createOpType } from "./operations";
import { OpState } from "./state";

function element<T, U>(tag: string, svg: boolean) {
  const type = createOpType(
    svg === true ? (NodeFlags.Element | NodeFlags.Svg) : NodeFlags.Element,
    tag,
  );
  return (
    n?: string,
    a?: {},
    c: Op = null,
  ) => (
      createOpNode<ElementData>(type, { n, a, c })
    );
}

/**
 * htmlElement create a HTML element operation factories.
 *
 * @param tag HTML element tag name.
 * @returns HTML element operation factory.
 */
export const htmlElement: <T, U>(tag: string) => (
  className?: string,
  attrs?: {},
  children?: Op,
) => OpNode<ElementData<T>> = (tag: string) => element(tag, false);

/**
 * htmlElement create a SVG element operation factories.
 *
 * @param tag SVG element tag name.
 * @returns SVG element operation factory.
 */
export const svgElement: <T, U>(tag: string) => (
  className?: string,
  attrs?: {},
  children?: Op,
) => OpNode<ElementData<T>> = (tag: string) => element(tag, true);

/**
 * `elementProto()` creates a factory that produces elements with predefined attributes.
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
 * @param proto Element prototype.
 * @returns Factory that produces elements with predefined attributes.
 */
export function elementProto<P>(proto: OpNode<ElementData<P>>) {
  /* istanbul ignore else */
  if (DEBUG) {
    if (proto.d.c !== null) {
      throw new Error(`Invalid OpNode, element prototypes can't have any children`);
    }
  }
  const type = createOpType(proto.t.f | NodeFlags.ElementProto, { node: null, proto });
  return (
    n?: string,
    a?: {},
    c: Op = null,
  ) => createOpNode<ElementData>(type, { n, a, c });
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
 * @param c Component function.
 * @param shouldUpdate `shouldUpdate` function.
 * @returns Factory that produces component nodes.
 */
export function component(
  c: (c: OpState) => () => Op,
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
 * @param c Component function.
 * @param shouldUpdate `shouldUpdate` function.
 * @returns Factory that produces component nodes.
 */
export function component<P>(
  c: (c: OpState) => (props: P) => Op,
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
 * @param c Component function.
 * @param shouldUpdate `shouldUpdate` function.
 * @returns Factory that produces component nodes.
 */
export function component<P>(
  c: (c: OpState) => (props: P) => Op,
  shouldUpdate?: (prev: P, next: P) => boolean,
): (props: P) => OpNode<P> {
  const type = createOpType(NodeFlags.Component | NodeFlags.Stateful | NodeFlags.DirtyCheck, { c, shouldUpdate });
  return (props: P) => createOpNode(type, props);
}

/**
 * statelessComponent creates an OpNode factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param update Update function.
 * @param shouldUpdate `shouldUpdate` function.
 * @returns Factory that produces stateless component nodes.
 */
export function statelessComponent(
  update: () => Op,
): () => OpNode<undefined>;

/**
 * statelessComponent creates an OpNode factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param update Update function.
 * @param shouldUpdate `shouldUpdate` function.
 * @returns Factory that produces stateless component nodes.
 */
export function statelessComponent<P>(
  update: (props: P) => Op,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? (props?: P) => OpNode<P> : (props: P) => OpNode<P>;

/**
 * statelessComponent creates an OpNode factory that produces nodes for stateless components.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param c Update function.
 * @param shouldUpdate `shouldUpdate` function.
 * @returns Factory that produces stateless component nodes.
 */
export function statelessComponent<P>(
  c: (props: P) => Op,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (props: P) => OpNode<P> {
  const type = createOpType(NodeFlags.Component, { c, shouldUpdate });
  return (props: P) => createOpNode(type, props);
}
