import { OpState } from "../vdom/state";
import { visitNodes, VisitNodesFlags } from "../vdom/reconciler";
import { NodeFlags } from "../vdom/node_flags";
import { containsNode } from "../vdom/utils";

export function containsRelatedTarget(event: MouseEvent, currentTarget: OpState): boolean {
  return containsNode(currentTarget, event.relatedTarget as Node);
}

export function isCurrentTarget(event: Event, currentTarget: OpState): boolean {
  const target = event.target;
  let result = false;
  visitNodes(currentTarget, (node) => {
    if ((node.f & NodeFlags.Element) !== 0) {
      return (node.s === target) ?
        (result = true, VisitNodesFlags.StopImmediate) :
        VisitNodesFlags.Stop;
    }
    return VisitNodesFlags.Continue;
  });
  return result;
}
