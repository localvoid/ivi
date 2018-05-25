import { EventHandlerFlags, EventFlags } from "./flags";
import { SyntheticEvent } from "./synthetic_event";
import { EventDispatcher } from "./event_dispatcher";

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
  src: EventDispatcher;
  /**
   * See {@link EventHandlerFlags} for details.
   */
  flags: EventHandlerFlags;
  /**
   * Event Handler function.
   */
  handler(ev: E): EventFlags | void;
  /**
   * Number of active listeners.
   */
  listeners: number;
  /**
   * Event Handler props.
   *
   * Gestures are using it to store factory function that instantiates gesture recognizer.
   */
  props: P;
  /**
   * Event Handler state.
   *
   * Internal state that can be used to store gesture recognizers state.
   */
  state: S | null;
}
