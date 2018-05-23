import { SyntheticEventFlags } from "./flags";

/**
 * SyntheticEvent is a base class for all synthetic events.
 */
export class SyntheticEvent {
  /**
   * See `SyntheticEventFlags` for details.
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

export class SyntheticNativeEvent<E extends Event> extends SyntheticEvent {
  readonly target: any;
  native: E;

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
