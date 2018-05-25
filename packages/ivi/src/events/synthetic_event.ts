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
