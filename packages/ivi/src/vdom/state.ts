import { NodeFlags } from "./node_flags";
import { OpNode } from "./operations";
import { ComponentHooks } from "./component";

/**
 * Operation state.
 */
export interface StateNode {
  /**
   * Operation.
   */
  op: OpNode | string | number;
  /**
   * See {@link NodeFlags} for details.
   */
  flags: NodeFlags;
  /**
   * State for children operations.
   */
  children: StateNode | Array<StateNode | null> | null;
  /**
   * Current state.
   */
  state: Node | ComponentHooks | {} | null;
}

/**
 * createStateNode creates a {@link StateNode} instance.
 *
 * @param op Operation.
 * @returns {@link StateNode} instance.
 */
export const createStateNode = (op: OpNode | string | number): StateNode => (
  { op, flags: 0, children: null, state: null }
);

/**
 * getDOMNode retrieves closest DOM node from the node state.
 *
 * @param node State node.
 * @return DOM node.
 */
export function getDOMNode(node: StateNode): Node | null {
  if ((node.flags & (NodeFlags.Element | NodeFlags.Text)) === 0) {
    const c = node.children;
    if (c === null) {
      return null;
    }
    return getDOMNode(c as StateNode);
  }
  return node.state as Node;
}
