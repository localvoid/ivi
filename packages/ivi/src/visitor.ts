import type { SNode } from "./index.js";
import { Flags } from "./index.js";

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

