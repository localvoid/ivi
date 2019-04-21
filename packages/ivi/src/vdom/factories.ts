import { checkElement } from "../debug/element";
import { NodeFlags } from "./node_flags";
import { OpNode, Op, ElementData, createOpNode, createOpType } from "./operations";
import { Component } from "./component";

/**
 * elementFactory creates a factory for DOM elements.
 *
 * @param tag HTML element tag name.
 * @param flags Node flags.
 * @returns HTML element operation factory.
 */
export function elementFactory<T, U>(tag: string, flags: NodeFlags) {
  const type = createOpType(flags, tag);
  return process.env.NODE_ENV !== "production" ?
    (n?: string, a?: T, c: Op = null) => {
      checkElement(tag, a, (flags & NodeFlags.Svg) !== 0);
      return createOpNode<ElementData<T>>(type, { n, a, c });
    } :
    /* istanbul ignore next */(n?: string, a?: T, c: Op = null) => createOpNode<ElementData<T>>(type, { n, a, c });
}

/**
 * htmlElementFactory creates a factory for HTML elements.
 *
 * @param tag HTML element tag name.
 * @returns HTML element operation factory.
 */
export const htmlElementFactory: <T, U>(tag: string) => (
  className?: string,
  attrs?: T,
  children?: Op,
) => OpNode<ElementData<T>> = (tag: string) => elementFactory(tag, NodeFlags.Element);

/**
 * svgElementFactory creates a factory for SVG elements.
 *
 * @param tag SVG element tag name.
 * @returns SVG element operation factory.
 */
export const svgElementFactory: <T, U>(tag: string) => (
  className?: string,
  attrs?: T,
  children?: Op,
) => OpNode<ElementData<T>> = (tag: string) => elementFactory(tag, NodeFlags.Element | NodeFlags.Svg);

/**
 * `elementProto()` creates a factory that produces elements with predefined attributes.
 *
 * @example
 *
 *     const DivWithIdAttribute = elementProto(div(_, { id: "predefined-id" }));
 *
 *     render(
 *       DivWithIdAttribute("class-name", { title: "Title" }, "Hello World"),
 *       document.getElementById("app")!,
 *     );
 *
 * @param p Element prototype.
 * @returns Factory that produces elements with predefined attributes.
 */
export function elementProto<T>(p: OpNode<ElementData<T>>) {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (p.d.c !== null) {
      throw new Error(`Invalid OpNode, element prototypes can't have any children`);
    }
    checkElement(p.t.d as string, p.d.a, (p.t.f & NodeFlags.Svg) !== 0);
  }
  const type = createOpType(p.t.f | NodeFlags.ElementProto, { n: null, p });
  return (n?: string, a?: T, c: Op = null) => createOpNode<ElementData<T>>(type, { n, a, c });
}

/**
 * component creates a factory that produces component nodes.
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
 * @returns Factory that produces component nodes.
 */
export function component(
  c: (c: Component) => () => Op,
): () => OpNode<undefined>;

/**
 * component creates a factory that produces component nodes.
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
 * @param areEqual `areEqual` function.
 * @returns Factory that produces component nodes.
 */
export function component<P>(
  c: (c: Component) => (props: P) => Op,
  areEqual?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? (props?: P) => OpNode<P> : (props: P) => OpNode<P>;

/**
 * component creates a factory that produces component nodes.
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
 * @param e `areEqual` function.
 * @returns Factory that produces component nodes.
 */
export function component<P>(
  c: (c: Component) => (props: P) => Op,
  e?: (prev: P, next: P) => boolean,
): (props: P) => OpNode<P> {
  const type = createOpType(NodeFlags.Component | NodeFlags.Stateful | NodeFlags.DirtyCheck, { c, e });
  return (props: P) => createOpNode(type, props);
}

/**
 * statelessComponent creates an factory that produces stateless components nodes.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param update Update function.
 * @returns Factory that produces stateless component nodes.
 */
export function statelessComponent(
  update: () => Op,
): () => OpNode<undefined>;

/**
 * statelessComponent creates an factory that produces stateless components nodes.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param update Update function.
 * @param areEqual `areEqual` function.
 * @returns Factory that produces stateless component nodes.
 */
export function statelessComponent<P>(
  update: (props: P) => Op,
  areEqual?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? (props?: P) => OpNode<P> : (props: P) => OpNode<P>;

/**
 * statelessComponent creates an factory that produces stateless components nodes.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param c Update function.
 * @param e `areEqual` function.
 * @returns Factory that produces stateless component nodes.
 */
export function statelessComponent<P>(
  c: (props: P) => Op,
  e?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): (props: P) => OpNode<P> {
  const type = createOpType(NodeFlags.Component, { c, e });
  return (props: P) => createOpNode(type, props);
}
