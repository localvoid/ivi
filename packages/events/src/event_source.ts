import { EventHandler } from "./event_handler";

/**
 * Event Source.
 *
 * Note for Event Extensions Developers: Event Source objects should always have exactly the same shape as described in
 * this interface. It is necessary for performance, because event source objects will be accessed quite often during
 * virtual dom synchronization.
 *
 * @final
 */
export interface EventSource {
    addListener(handler: EventHandler): void;
    removeListener(handler: EventHandler): void;
}
