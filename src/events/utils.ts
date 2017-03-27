import { FEATURES, FeatureFlags } from "../common/feature_detection";
import { NativeEventSourceFlags } from "./flags";
import { EventHandler } from "./event_handler";

declare global {
    interface Element {
        _ev: Array<EventHandler | null> | EventHandler | null | undefined;
    }
}

/**
 * `{ capture: true, passive: true }` object that should be used as a third parameter in `addEventListener`.
 */
export const EVENT_CAPTURE_PASSIVE_OPTIONS =
    ((FEATURES & FeatureFlags.PassiveEvents) !== 0) ?
        { "capture": true, "passive": true } :
        true;

/**
 * `{ passive: true }` object that should be used as a third parameter in `addEventListener`.
 */
export const EVENT_PASSIVE_OPTIONS =
    ((FEATURES & FeatureFlags.PassiveEvents) !== 0) ?
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
export function getEventOptions(flags: NativeEventSourceFlags): boolean | { capture?: boolean, passive?: boolean } {
    if ((flags & NativeEventSourceFlags.Passive) !== 0) {
        if ((flags & NativeEventSourceFlags.Capture) !== 0) {
            return EVENT_CAPTURE_PASSIVE_OPTIONS;
        }
        return EVENT_PASSIVE_OPTIONS;
    }
    if ((flags & NativeEventSourceFlags.Capture) !== 0) {
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
export function setEventHandlersToDOMNode(
    node: Element,
    events: Array<EventHandler | null> | EventHandler | null,
): void {
    node._ev = events;
}

/**
 * Get Event Handlers from DOM Node.
 *
 * @param node DOM Node.
 * @returns Event Handlers.
 */
export function getEventHandlersFromDOMNode(
    node: Element,
): Array<EventHandler | null> | EventHandler | undefined | null {
    return node._ev;
}
