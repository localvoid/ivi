import { EventHandlerFlags } from "./flags";
import { EventDispatcher } from "./event_dispatcher";
import { SyntheticEvent } from "./synthetic_event";

/**
 * Event Handler.
 */
export interface EventHandler<E extends SyntheticEvent<any>> {
    /**
     * Event Dispatcher instance.
     */
    dispatcher: EventDispatcher<any, any>;
    /**
     * See `EventHandlerFlags` for details.
     */
    flags: EventHandlerFlags;
    /**
     * Event Handler function.
     */
    fn: (ev: E) => void;
    /**
     * Event Handler options.
     */
    options?: any;
}

/**
 * Event List.
 */
export interface EventHandlerList {
    [key: string]: EventHandler<SyntheticEvent<any>>;
};
