import { SyntheticEvent } from "./synthetic_event";
import { OpState } from "../vdom/state";

/**
 * SyntheticNativeEvent is a wrapper for native events.
 *
 * @typeparam E Native event type.
 */
export interface SyntheticNativeEvent<E extends Event> extends SyntheticEvent {
  readonly native: E;
}

/**
 * createNativeEvent creates a wrapper for a native event.
 *
 * @typeparam E Native event type.
 */
export function createNativeEvent<E extends Event>(
  timestamp: number,
  node: OpState | null,
  native: E,
): SyntheticNativeEvent<E> {
  return { timestamp, node, native };
}
