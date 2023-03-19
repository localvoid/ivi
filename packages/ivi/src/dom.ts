import type { SNode, STemplate, SText } from "./index.js";
import { Flags } from "./index.js";
import { VisitNodesDirective, visitNodes } from "./visitor.js";

/**
 * Finds the closest DOM node from a Stateful Tree {@link SNode}.
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

  let flags: number = sNode.f;
  if (flags & (Flags.Template | Flags.Text)) {
    return (flags & Flags.Template)
      ? (sNode as STemplate).s[0] as T
      : (sNode as SText).s as T;
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
 * Checks if a Stateful Tree {@link SNode} contains a DOM element.
 *
 * @param parent Stateful Tree {@link SNode}.
 * @param element DOM element.
 * @returns True when parent contains an element.
 */
export const containsDOMElement = (
  parent: SNode,
  element: Element,
): boolean => {
  let result = false;
  visitNodes(parent, (sNode) => (
    (sNode.f & Flags.Template)
      ? ((((sNode as STemplate).s[0] as Element).contains(element) === true)
        ? (result = true, VisitNodesDirective.StopImmediate)
        : VisitNodesDirective.Stop)
      : VisitNodesDirective.Continue
  ));
  return result;
};

/**
 * Checks if a Stateful Tree {@link SNode} has a child DOM element.
 *
 * @param parent Stateful Tree {@link SNode}.
 * @param child DOM element.
 * @returns True when parent has a DOM element child.
 */
export const hasDOMElement = (
  parent: SNode,
  child: Element,
): boolean => {
  let result = false;
  visitNodes(parent, (sNode) => (
    (sNode.f & Flags.Template)
      ? (((sNode as STemplate).s[0] === child)
        ? (result = true, VisitNodesDirective.StopImmediate)
        : VisitNodesDirective.Stop)
      : VisitNodesDirective.Continue
  ));
  return result;
};
