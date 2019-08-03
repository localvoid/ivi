import { checkElement } from "../debug/element";
import { NodeFlags } from "./node_flags";
import { Op, DOMElementOp, ComponentOp, createOpType, createDOMElementOp, createContainerOp } from "./operations";
import { Component } from "./component";

/**
 * elementFactory creates a factory for DOM elements.
 *
 * @param tag HTML element tag name.
 * @param flags Node flags.
 * @returns HTML element operation factory.
 */
export function elementFactory<T, U>(tag: string, flags: NodeFlags) {
  const t = createOpType(flags, tag);
  return process.env.NODE_ENV !== "production" ?
    (n?: string, v?: T, c: Op = null) => {
      checkElement(tag, v, (flags & NodeFlags.Svg) !== 0);
      return createDOMElementOp(t, v, c, n);
    } :
    /* istanbul ignore next */(n?: string, v?: T, c: Op = null) => createDOMElementOp(t, v, c, n);
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
) => DOMElementOp<T | undefined> = (tag: string) => elementFactory(tag, NodeFlags.Element);

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
) => DOMElementOp<T | undefined> = (tag: string) => elementFactory(tag, NodeFlags.Element | NodeFlags.Svg);

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
export function elementProto<T>(p: DOMElementOp<T>) {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (p.c !== null) {
      throw new Error(`Invalid OpNode, element prototypes can't have any children`);
    }
    checkElement(p.t.d as string, p.v, (p.t.f & NodeFlags.Svg) !== 0);
  }
  const t = createOpType(p.t.f | NodeFlags.ElementProto, { n: null, p });
  return (n?: string, v?: T, c: Op = null) => createDOMElementOp(t, v, c, n);
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
): () => ComponentOp<undefined>;

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
 * @param e1 `areEqual` function that checks `p1` for equality.
 * @param e2 `areEqual` function that checks `p2` for equality.
 * @returns Factory that produces component nodes.
 */
export function component<P1, P2 = undefined>(
  c: (c: Component) => (p1: P1, p2: P2) => Op,
  areEqual1?: undefined extends P1 ? undefined : (prev: P1, next: P1) => boolean,
  areEqual2?: undefined extends P2 ? undefined : (prev: P2, next: P2) => boolean,
): undefined extends P1 ?
  (undefined extends P2 ? (p1?: P1, p2?: P2) => ComponentOp<P1, P2> : (p1: P1, p2: P2) => ComponentOp<P1, P2>) :
  (undefined extends P2 ? (p1?: P1, p2?: P2) => ComponentOp<P1, P2> : (p1: P1, p2: P2) => ComponentOp<P1, P2>);

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
 * @param e1 `areEqual` function that checks `p1` for equality.
 * @param e2 `areEqual` function that checks `p2` for equality.
 * @returns Factory that produces component nodes.
 */
export function component<P1, P2 = undefined>(
  c: (c: Component) => (p1: P1, p2: P2) => Op,
  e1?: (prev: P1, next: P1) => boolean,
  e2?: (prev: P2, next: P2) => boolean,
): (p1: P1, p2: P2) => ComponentOp<P1, P2> {
  const type = createOpType(NodeFlags.Component, { c, e1, e2 });
  return (p1: P1, p2: P2) => createContainerOp(type, p1, p2);
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
): () => ComponentOp<undefined>;

/**
 * statelessComponent creates an factory that produces stateless components nodes.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param update Update function.
 * @param areEqual1 `areEqual` function that checks `p1` for equality.
 * @param areEqual1 `areEqual` function that checks `p2` for equality.
 * @returns Factory that produces stateless component nodes.
 */
export function statelessComponent<P1, P2 = undefined>(
  update: (p1: P1, p2: P2) => Op,
  areEqual1?: undefined extends P1 ? undefined : (prev: P1, next: P1) => boolean,
  areEqual2?: undefined extends P2 ? undefined : (prev: P2, next: P2) => boolean,
): undefined extends P1 ?
  (undefined extends P2 ? (p1?: P1, p2?: P2) => ComponentOp<P1, P2> : (p1: P1, p2: P2) => ComponentOp<P1, P2>) :
  (undefined extends P2 ? (p1?: P1, p2?: P2) => ComponentOp<P1, P2> : (p1: P1, p2: P2) => ComponentOp<P1, P2>);

/**
 * statelessComponent creates an factory that produces stateless components nodes.
 *
 * @example
 *
 *     const A = statelessComponent<string>((text) => div(_, _, text));
 *
 * @param c Update function.
 * @param e1 `areEqual` function that checks `p1` for equality.
 * @param e2 `areEqual` function that checks `p2` for equality.
 * @returns Factory that produces stateless component nodes.
 */
export function statelessComponent<P1, P2 = undefined>(
  c: (p1: P1, p2: P2) => Op,
  e1?: undefined extends P1 ? undefined : (prev: P1, next: P1) => boolean,
  e2?: undefined extends P2 ? undefined : (prev: P2, next: P2) => boolean,
): (p1: P1, p2: P2) => ComponentOp<P1, P2> {
  const f = (_: Component) => c;
  return component(f, e1, e2);
}
