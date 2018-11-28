import { SyntheticEventFlags } from "./flags";
import { OpNodeState } from "../vdom/state";

/**
 * SyntheticEvent is an interface that should be supported by all synthetic events.
 */
export interface SyntheticEvent {
  /**
   * See {@link SyntheticEventFlags} for details.
   */
  flags: SyntheticEventFlags;
  /**
   * Timestamp when event was created.
   */
  readonly timestamp: number;
  /**
   * State node.
   */
  node: OpNodeState | null;
}
