import { FEATURES, FeatureFlags } from "../common/feature_detection";
import { NativeEventDispatcherFlags } from "./flags";
import { EventHandlerList, EventHandler } from "./event_handler";

/**
 * `{ capture: true, passive: true }` object that should be used as a third parameter in `addEventListener`.
 */
export const EVENT_CAPTURE_PASSIVE_OPTIONS =
    (FEATURES & FeatureFlags.PassiveEvents) ?
        { "capture": true, "passive": true } :
        true;

/**
 * `{ passive: true }` object that should be used as a third parameter in `addEventListener`.
 */
export const EVENT_PASSIVE_OPTIONS =
    (FEATURES & FeatureFlags.PassiveEvents) ?
        { "passive": true } :
        false;

/**
 * Get Event options that should be used when adding Event Listener.
 *
 * #quirks
 *
 * @param flags See `EventDispatcherFlags` for details.
 * @returns Option object that can be used as a 3rd parameter in `addEventListener` call.
 */
export function getEventOptions(flags: NativeEventDispatcherFlags): boolean | { capture?: boolean, passive?: boolean } {
    if (flags & NativeEventDispatcherFlags.Passive) {
        if (flags & NativeEventDispatcherFlags.Capture) {
            return EVENT_CAPTURE_PASSIVE_OPTIONS;
        }
        return EVENT_PASSIVE_OPTIONS;
    }
    if (flags & NativeEventDispatcherFlags.Capture) {
        return true;
    }
    return false;
}

/**
 * Property that is used on DOM Nodes to store EventProps object.
 */
export const DOM_NODE_EVENTS_PROPERTY = "_ev";

/**
 * Set Event Handlers to DOM Node.
 *
 * @param node DOM Node.
 * @param events Event Handlers.
 */
export function setEventHandlersToDOMNode(node: Node, events: EventHandlerList | EventHandler | null): void {
    (node as any)[DOM_NODE_EVENTS_PROPERTY] = events;
}

/**
 * Get Event Handlers from DOM Node.
 *
 * @param node DOM Node.
 * @returns Event Handlers.
 */
export function getEventHandlersFromDOMNode(node: Node): EventHandlerList | EventHandler | undefined | null {
    return (node as any)[DOM_NODE_EVENTS_PROPERTY];
}
