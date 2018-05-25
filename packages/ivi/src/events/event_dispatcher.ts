import { EventHandler } from "./event_handler";

/**
 * EventDispatcher provides an interface for adding and removing event handlers.
 *
 * EventDispatcher objects should always have exactly the same shape as described in this interface to make sure that
 * all call sites that accessing this methods are monomorphic.
 *
 * @final
 */
export interface EventDispatcher {
  /**
   * Adds event handler to the event dispatcher.
   *
   * @param handler - Event handler
   */
  add(handler: EventHandler): void;
  /**
   * Removes event handler from the event dispatcher.
   *
   * @param handler - Event handler
   */
  remove(handler: EventHandler): void;
}
