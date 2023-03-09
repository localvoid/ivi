import type { SNode, STemplate, SText } from "./index.js";
import { Flags } from "./index.js";

/**
 * VisitNodesDirective controls the traversal algorithm {@link visitNodes}`.
 */
export const enum VisitNodesDirective {
  /** Continue traversing the tree. */
  Continue = 0,
  /** Stops immediately. */
  StopImmediate = 1,
  /** Stops traversing through children nodes and continues trversing through adjacent nodes. */
  Stop = 1 << 1,
}

/**
 * visitNodes traverses the operation state tree and invokes `visitor` function for each state node.
 *
 * @param opState State node.
 * @param visitor Visitor function.
 * @returns {@link VisitNodesDirective}
 */
export const visitNodes = (
  opState: SNode,
  visitor: (opState: SNode) => VisitNodesDirective,
): VisitNodesDirective => {
  var i = visitor(opState!);
  if (i !== VisitNodesDirective.Continue) {
    return (i & VisitNodesDirective.StopImmediate);
  }

  var { f, c } = opState!;
  if (f & (Flags.Array | Flags.List)) {
    for (i = 0; i < (c as Array<SNode | null>).length; i++) {
      if (
        (opState = (c as Array<SNode | null>)[i]!) !== null &&
        (visitNodes(opState, visitor) & VisitNodesDirective.StopImmediate)
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
 * getDOMNode retrieves closest DOM node from the {@link SNode} instance.
 *
 * @typeparam T DOM node type.
 * @param sNode State node.
 * @returns DOM node.
 */
export const getDOMNode = <T extends Node | Text>(
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
      if ((c = getDOMNode((sNode as any as Array<SNode | null>)[i])) !== null) {
        return c as T;
      }
    }
    return null;
  }
  return getDOMNode(sNode as SNode);
};

/**
 * containsElement returns `true` when `parent` contains a DOM element `element`.
 *
 * @param parent Op state node.
 * @param element DOM element.
 * @returns `true` when `parent` contains a DOM element `element`.
 */
export const containsElement = (
  parent: SNode,
  element: Element,
): boolean => {
  var result = false;
  visitNodes(parent, (node) => (
    (node.f & Flags.Template)
      ? (((node.s as Element).contains(element) === true)
        ? (result = true, VisitNodesDirective.StopImmediate)
        : VisitNodesDirective.Stop)
      : VisitNodesDirective.Continue
  ));
  return result;
};

/**
 * hasChildElement returns `true` when `parent` has a DOM element child `child`.
 *
 * @param parent Op state node.
 * @param child DOM element.
 * @returns `true` when `parent` has a DOM element child `child`.
 */
export const hasElementChild = (
  parent: SNode,
  child: Element,
): boolean => {
  var result = false;
  visitNodes(parent, (node) => (
    (node.f & Flags.Template)
      ? ((node.s === child)
        ? (result = true, VisitNodesDirective.StopImmediate)
        : VisitNodesDirective.Stop)
      : VisitNodesDirective.Continue
  ));
  return result;
}

