import { EventHandlerFlags } from "./flags";
import { SyntheticEvent } from "./synthetic_event";
import { EventSource } from "./event_source";

/**
 * Event Handler.
 *
 * Note for Event Extensions Developers: Event Handler objects should always have exactly the same shape as described in
 * this interface. It is necessary for performance, because event handler objects will be accessed quite often during
 * virtual dom synchronization.
 *
 * @final
 */
export interface EventHandler<E extends SyntheticEvent = SyntheticEvent> {
    /**
     * Event Handler function call interface.
     */
    (ev: E): void;
    /**
     * Event Source.
     */
    source: EventSource;
    /**
     * See `EventHandlerFlags` for details.
     */
    flags: EventHandlerFlags;
    /**
     * Event Handler props.
     */
    props?: any;
    /**
     * Event Handler state.
     *
     * Internal state that can be used to store gesture recognizers state.
     */
    state?: any;
}
