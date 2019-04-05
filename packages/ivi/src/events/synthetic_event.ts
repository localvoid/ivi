import { OpState } from "../vdom/state";

/**
 * SyntheticEvent is an interface that should be supported by all synthetic events.
 */
export interface SyntheticEvent {
  /**
   * Timestamp when event was created.
   */
  readonly timestamp: number;
  /**
   * State node.
   */
  node: OpState | null;
}
