import { EventHandlerFlags } from "./flags";
import { EventDispatcher } from "./event_dispatcher";
import { SyntheticEvent } from "./synthetic_event";

/**
 * Event Handler.
 */
export interface EventHandler<I, O extends SyntheticEvent<any>> {
    /**
     * Event Dispatcher instance.
     */
    dispatcher: EventDispatcher<I, O>;
    /**
     * See `EventHandlerFlags` for details.
     */
    flags: EventHandlerFlags;
    /**
     * Event Handler function.
     */
    fn: (ev: O) => void;
}

/**
 * Event List.
 */
export interface EventHandlerList {
    [key: string]: EventHandler<any, any>;
};
