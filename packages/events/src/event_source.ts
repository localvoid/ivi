import { EventHandler } from "./event_handler";

/**
 * EventSource provides an interface for adding and removing event handlers for the event source.
 *
 * EventSource objects should always have exactly the same shape as described in this interface to make sure that
 * all call sites that accessing this callbacks are monomorphic.
 *
 * @final
 */
export interface EventSource {
    /**
     * addListener adds event handler to the event source.
     *
     * @param handler Event handler.
     */
    addListener(handler: EventHandler): void;
    /**
     * removeListener removes event handler from the event source.
     *
     * @param handler Event handler.
     */
    removeListener(handler: EventHandler): void;
}
