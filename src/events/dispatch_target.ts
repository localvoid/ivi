import { EventHandler } from "./event_handler";

/**
 * Dispatch Target.
 */
export interface DispatchTarget {
    /**
     * Target.
     */
    target: any;
    /**
     * Matched Event Handlers.
     */
    handlers: EventHandler | EventHandler<any>[];
}
