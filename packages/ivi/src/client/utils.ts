import { type SNode, type STemplate, Flags } from "./core.js";

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
