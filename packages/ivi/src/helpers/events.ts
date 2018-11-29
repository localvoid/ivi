import { SyntheticNativeEvent } from "../events/synthetic_native_event";
import { visitNodes } from "../vdom/reconciler";
import { NodeFlags } from "../vdom/node_flags";

export function containsRelatedTarget(ev: SyntheticNativeEvent<MouseEvent>): boolean {
  const related = ev.native.relatedTarget as Node;
  return visitNodes(ev.node!, NodeFlags.Element, (node) => (node.state as Element).contains(related));
}
