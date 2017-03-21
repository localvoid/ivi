import { FEATURES, FeatureFlags } from "../common/feature_detection";
import { NativeEventDispatcherFlags } from "./flags";
import { EventHandlerList, EventHandler } from "./event_handler";

declare global {
    interface Element {
        _ev: EventHandlerList | EventHandler | null | undefined;
    }
}

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
export function setEventHandlersToDOMNode(node: Element, events: EventHandlerList | EventHandler | null): void {
    node._ev = events;
}

/**
 * Get Event Handlers from DOM Node.
 *
 * @param node DOM Node.
 * @returns Event Handlers.
 */
export function getEventHandlersFromDOMNode(node: Element): EventHandlerList | EventHandler | undefined | null {
    return node._ev;
}
