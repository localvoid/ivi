import { EventHandlerFlags } from "./flags";
import { SyntheticEvent } from "./synthetic_event";
import { EventSource } from "./event_source";

/**
 * EventHandler.
 *
 * EventHandler objects should always have exactly the same shape as described in this interface to make sure that
 * all call sites that accessing this callbacks are monomorphic.
 *
 * @final
 */
export interface EventHandler<E extends SyntheticEvent = SyntheticEvent, P = any, S = any> {
  /**
   * Reference to the event source that will dispatch events for this event handler.
   */
  source: EventSource;
  /**
   * See `EventHandlerFlags` for details.
   */
  flags: EventHandlerFlags;
  /**
   * Event Handler function call interface.
   */
  handler(ev: E): void;
  /**
   * Number of active listeners.
   */
  listeners: number;
  /**
   * Event Handler props.
   */
  props: P;
  /**
   * Event Handler state.
   *
   * Internal state that can be used to store gesture recognizers state.
   */
  state: S | null;
}
