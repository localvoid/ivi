import { SyntheticEventFlags } from "./flags";
import { SyntheticEvent } from "./synthetic_event";
import { OpNodeState } from "../vdom/state";

/**
 * SyntheticNativeEvent is a wrapper for native events.
 */
export interface SyntheticNativeEvent<E extends Event> extends SyntheticEvent {
  readonly native: E;
}

/**
 * createNativeEvent creates a wrapper for a native event.
 */
export function createNativeEvent<E extends Event>(
  flags: SyntheticEventFlags,
  timestamp: number,
  node: OpNodeState | null,
  native: E,
): SyntheticNativeEvent<E> {
  return { flags, timestamp, node, native };
}
