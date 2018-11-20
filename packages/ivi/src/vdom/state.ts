import { NodeFlags } from "./node_flags";
import { OpNode } from "./operations";
import { ComponentHooks } from "./component";

export interface StateNode {
  op: OpNode | string | number;
  flags: NodeFlags;
  children: StateNode | Array<StateNode | null> | null;
  state: Node | ComponentHooks | {} | null;
}

export const createStateNode = (op: OpNode | string | number): StateNode => (
  { op, flags: 0, children: null, state: null }
);

export function getDOMNode(node: StateNode): Node {
  if ((node.flags & (NodeFlags.Element | NodeFlags.Text)) === 0) {
    return getDOMNode(node.children as StateNode);
  }
  return node.state as Node;
}
