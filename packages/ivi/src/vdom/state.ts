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
  o: Op;
  /**
   * See {@link NodeFlags} for details.
   */
  f: NodeFlags;
  /**
   * State for children operations.
   */
  c: OpState | Array<OpState | null> | null;
  /**
   * Current state.
   */
  s: Node | ComponentHooks | {} | null;
}

/**
 * createStateNode creates a {@link StateNode} instance.
 *
 * @param op Operation.
 * @returns {@link StateNode} instance.
 */
export const createStateNode = (o: Op): OpState => (
  { o, f: 0, c: null, s: null }
);
