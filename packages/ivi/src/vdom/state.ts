import { NodeFlags } from "./node_flags";
import { Op } from "./operations";
import { ComponentHooks } from "./component";

/**
 * Operation state.
 */
export interface OpState {
  /**
   * Operation.
   */
  op: Op;
  /**
   * See {@link NodeFlags} for details.
   */
  flags: NodeFlags;
  /**
   * State for children operations.
   */
  children: OpState | Array<OpState | null> | null;
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
export const createStateNode = (op: Op): OpState => (
  { op, flags: 0, children: null, state: null }
);
