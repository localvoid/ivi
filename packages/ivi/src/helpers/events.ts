import { SyntheticNativeEvent } from "../events/synthetic_native_event";
import { visitNodes, VisitNodesFlags } from "../vdom/reconciler";
import { NodeFlags } from "../vdom/node_flags";

export function containsRelatedTarget(ev: SyntheticNativeEvent<MouseEvent>): boolean {
  const related = ev.native.relatedTarget as Node;
  let result = false;
  visitNodes(ev.node!, (node) => {
    if ((node.f & NodeFlags.Element) !== 0) {
      return ((node.s as Element).contains(related)) === true ?
        (result = true, VisitNodesFlags.StopImmediate) :
        VisitNodesFlags.Stop;
    }
    return VisitNodesFlags.Continue;
  });
  return result;
}

export function isCurrentTarget(ev: SyntheticNativeEvent<Event>): boolean {
  const target = ev.native.target;
  let result = false;
  visitNodes(ev.node!, (node) => {
    if ((node.f & NodeFlags.Element) !== 0) {
      return (node.s === target) ?
        (result = true, VisitNodesFlags.StopImmediate) :
        VisitNodesFlags.Stop;
    }
    return VisitNodesFlags.Continue;
  });
  return result;
}
