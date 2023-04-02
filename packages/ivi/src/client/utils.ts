import {
  type SNode, type Component, type STemplate, type SText,
  Flags
} from "./core.js";

/**
 * Emit options.
 */
export interface EmitOptions {
  /**
   * Option indicating whether the event bubbles. The default is `false`.
   */
  bubbles?: boolean;
  /**
   * Option indicating whether the event can be cancelled. The default is
   * `false`.
   */
  cancelable?: boolean;
  /**
   * Option indicating whether the event will trigger listeners outside of a
   * shadow root. The default is `false`.
   */
  composed?: boolean;
}

/**
 * Finds the closest child DOM node and emits a CustomEvent with
 * `EventTarget.dispatchEvent()` method.
 *
 * Emit invokes event handlers synchronously. All event handlers are invoked
 * before `emit()` returns.
 *
 * *SSR: Throws an exception.*
 *
 * @typeparam T Data type.
 * @param component Component node.
 * @param eventType Event type.
 * @param detail Event data.
 * @param options {@link EmitOptions}.
 * @returns `false` if event is cancelable, and at least one of the event
 *   handlers which received event called `Event.preventDefault()`. Otherwise
 *   `true`.
 */
export const emit = <T>(
  component: Component,
  eventType: string,
  detail: T,
  options?: EmitOptions,
): boolean => (
  findDOMNode(component)!.dispatchEvent(new _CustomEvent(eventType, {
    ...options,
    detail,
  }))
);

const _CustomEvent = CustomEvent;

/**
 * Finds the closest DOM node from a Stateful Tree {@link SNode}.
 *
 * *SSR: Throws an exception.*
 *
 * @typeparam T DOM node type.
 * @param sNode Stateful Tree {@link SNode}.
 * @returns DOM node.
 */
export const findDOMNode = <T extends Node | Text>(
  sNode: SNode | null,
): T | null => {
  if (sNode === null) {
    return null;
  }

  let flags: number = sNode.f; // polymorphic call-site
  if (flags & (Flags.Template | Flags.Text)) {
    return (flags & Flags.Template)
      ? (sNode as STemplate).s1[0] as T
      : (sNode as SText).s1 as T;
  }
  const children = sNode.c;
  if (flags & (Flags.Array | Flags.List)) {
    for (let i = 0; i < (children as Array<SNode | null>).length; i++) {
      const c = findDOMNode((children as Array<SNode | null>)[i]);
      if (c !== null) {
        return c as T;
      }
    }
    return null;
  }
  return findDOMNode(children as SNode | null);
};

/**
 * VisitNodesDirective controls the {@link visitNodes} traversal algorithm.
 */
export const enum VisitNodesDirective {
  /** Continue traversing the tree. */
  Continue = 0,
  /** Stops immediately. */
  StopImmediate = 1,
  /**
   * Stops traversing through children nodes and continues trversing through
   * adjacent nodes.
   */
  Stop = 1 << 1,
}

/**
 * Traverses stateful tree and invokes `visitor` function on each {@link SNode}.
 *
 * @param sNode {@link SNode}.
 * @param visitor Visitor function.
 * @returns {@link VisitNodesDirective}
 */
export const visitNodes = (
  sNode: SNode,
  visitor: (opState: SNode) => VisitNodesDirective,
): VisitNodesDirective => {
  let i = visitor(sNode);
  if (i !== VisitNodesDirective.Continue) {
    return (i & VisitNodesDirective.StopImmediate);
  }

  const { f, c } = sNode; // polymorphic call-site
  if (f & (Flags.Array | Flags.List)) {
    for (i = 0; i < (c as Array<SNode | null>).length; i++) {
      if (
        (sNode = (c as Array<SNode | null>)[i]!) !== null &&
        (visitNodes(sNode, visitor) & VisitNodesDirective.StopImmediate)
      ) {
        return VisitNodesDirective.StopImmediate;
      }
    }
  } else if (c !== null) {
    return visitNodes(c as SNode, visitor);
  }
  return VisitNodesDirective.Continue;
};

/**
 * Checks if a Stateful Tree {@link SNode} contains a DOM element.
 *
 * *SSR: Throws an exception.*
 *
 * @param node Stateful Tree {@link SNode}.
 * @param element DOM element.
 * @returns True when parent contains an element.
 */
export const containsDOMElement = (
  node: SNode,
  element: Element,
): boolean => {
  var result = false;
  visitNodes(node, (sNode) => (
    (sNode.f & Flags.Template) // polymorphic call-site
      ? ((((sNode as STemplate).s1[0] as Element).contains(element) === true)
        ? (result = true, VisitNodesDirective.StopImmediate)
        : VisitNodesDirective.Stop)
      : VisitNodesDirective.Continue
  ));
  return result;
};

/**
 * Checks if a Stateful Tree {@link SNode} has a child DOM element.
 *
 * *SSR: Throws an exception.*
 *
 * @param node Stateful Tree {@link SNode}.
 * @param child DOM element.
 * @returns True when parent has a DOM element child.
 */
export const hasDOMElement = (
  node: SNode,
  child: Element,
): boolean => {
  var result = false;
  visitNodes(node, (sNode) => (
    (sNode.f & Flags.Template) // polymorphic call-site
      ? (((sNode as STemplate).s1[0] === child)
        ? (result = true, VisitNodesDirective.StopImmediate)
        : VisitNodesDirective.Stop)
      : VisitNodesDirective.Continue
  ));
  return result;
};
