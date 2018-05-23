import { SyntheticEventFlags } from "./flags";

/**
 * SyntheticEvent is a base class for all synthetic events.
 */
export class SyntheticEvent {
  /**
   * See {@link SyntheticEventFlags} for details.
   */
  flags: SyntheticEventFlags;
  /**
   * Timestamp when event was created.
   */
  readonly timestamp: number;

  constructor(
    flags: SyntheticEventFlags,
    timestamp: number,
  ) {
    this.flags = flags;
    this.timestamp = timestamp;
  }
}

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
