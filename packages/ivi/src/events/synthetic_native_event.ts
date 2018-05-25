import { SyntheticEventFlags } from "./flags";
import { SyntheticEvent } from "./synthetic_event";

/**
 * SyntheticNativeEvent is a wrapper for native events.
 */
export class SyntheticNativeEvent<E extends Event> extends SyntheticEvent {
  /**
   * Event target.
   */
  readonly target: EventTarget;
  /**
   * Native event.
   */
  readonly native: E;

  constructor(
    flags: SyntheticEventFlags,
    target: EventTarget,
    timestamp: number,
    native: E,
  ) {
    super(flags, timestamp);
    this.target = target;
    this.native = native;
  }
}
