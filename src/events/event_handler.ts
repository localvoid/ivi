import { EventHandlerFlags } from "./flags";
import { SyntheticEvent } from "./synthetic_event";
import { EventSource } from "./event_source";

/**
 * Event Handler.
 */
export interface EventHandler<E extends SyntheticEvent<any> = SyntheticEvent<any>> {
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
     * Event Handler options.
     */
    options?: any;
}
