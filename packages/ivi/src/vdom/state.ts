import { NodeFlags } from "./node_flags";
import { Op } from "./operations";

/**
 * Operation state.
 */
export interface OpState<T = any> {
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
  s: T;
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
