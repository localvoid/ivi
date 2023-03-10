import type { SNode, STemplate, SText } from "./index.js";
import { Flags } from "./index.js";
import { VisitNodesDirective, visitNodes } from "./visitor.js";

/**
 * Finds the closest DOM node from the {@link SNode} instance.
 *
 * @typeparam T DOM node type.
 * @param sNode {@link SNode} instance.
 * @returns DOM node.
 */
export const findDOMNode = <T extends Node | Text>(
  sNode: SNode | null,
): T | null => {
  if (sNode === null) {
    return null;
  }

  var i = (sNode as SNode).f;
  var c: SNode | Node | null;
  if (i & (Flags.Template | Flags.Text)) {
    return (i & Flags.Template)
      ? (sNode as STemplate).s[0] as T
      : (sNode as SText).s as T;
  }
  sNode = (sNode as SNode).c as any;
  if (i & (Flags.Array | Flags.List)) {
    for (i = 0; i < (sNode as any as Array<SNode | null>).length; i++) {
      if ((c = findDOMNode((sNode as any as Array<SNode | null>)[i])) !== null) {
        return c as T;
      }
    }
    return null;
  }
  return findDOMNode(sNode as SNode);
};

/**
 * Checks if {@link SNode} contains a DOM element.
 *
 * @param parent {@link SNode}.
 * @param element DOM element.
 * @returns true when parent contains an element.
 */
export const containsDOMElement = (
  parent: SNode,
  element: Element,
): boolean => {
  var result = false;
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
 * Checks if {@link SNode} has a child DOM element.
 *
 * @param parent {@link SNode}.
 * @param child DOM element.
 * @returns true when parent has a DOM element child.
 */
export const hasDOMElement = (
  parent: SNode,
  child: Element,
): boolean => {
  var result = false;
  visitNodes(parent, (sNode) => (
    (sNode.f & Flags.Template)
      ? (((sNode as SNode).s[0] === child)
        ? (result = true, VisitNodesDirective.StopImmediate)
        : VisitNodesDirective.Stop)
      : VisitNodesDirective.Continue
  ));
  return result;
};
