import { NodeFlags } from "./node_flags";
import { OpChildren } from "./operations";
import { ComponentHooks } from "./component";

/**
 * Operation state.
 */
export interface StateNode {
  /**
   * Operation.
   */
  op: OpChildren;
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
export const createStateNode = (op: OpChildren): StateNode => (
  { op, flags: 0, children: null, state: null }
);

/**
 * getDOMNode retrieves closest DOM node from the node state.
 *
 * @param node State node.
 * @return DOM node.
 */
export function getDOMNode(node: StateNode): Node | null {
  const flags = node.flags;
  if ((flags & (NodeFlags.Element | NodeFlags.Text)) === 0) {
    const children = node.children;
    if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
      for (let i = 0; i < (children as Array<StateNode | null>).length; i++) {
        const cs = (children as Array<StateNode | null>)[i];
        if (cs !== null) {
          const c = getDOMNode(cs);
          if (c !== null) {
            return c;
          }
        }
      }
      return null;
    }
    if (children === null) {
      return null;
    }
    return getDOMNode(children as StateNode);
  }
  return node.state as Node;
}
