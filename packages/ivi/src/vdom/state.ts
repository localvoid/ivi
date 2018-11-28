import { NodeFlags } from "./node_flags";
import { OpChildren } from "./operations";
import { ComponentHooks } from "./component";

/**
 * Operation state.
 */
export interface OpNodeState {
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
  children: OpNodeState | Array<OpNodeState | null> | null;
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
export const createStateNode = (op: OpChildren): OpNodeState => (
  { op, flags: 0, children: null, state: null }
);
