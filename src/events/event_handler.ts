import { EventHandlerFlags } from "./flags";
import { EventDispatcher } from "./event_dispatcher";
import { SyntheticEvent } from "./synthetic_event";

/**
 * Event Handler.
 */
export interface EventHandler<E extends SyntheticEvent<any> = SyntheticEvent<any>> {
    /**
     * Event Handler function call interface.
     */
    (ev: E): void;
    /**
     * Event Dispatcher instance.
     */
    dispatcher: EventDispatcher;
    /**
     * See `EventHandlerFlags` for details.
     */
    flags: EventHandlerFlags;
    /**
     * Event Handler options.
     */
    options?: any;
}

/**
 * Event Handler List.
 */
export type EventHandlerList = Array<EventHandler | null>;
