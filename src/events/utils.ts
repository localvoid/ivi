import { FEATURES, FeatureFlags } from "../common/feature_detection";
import { NativeEventDispatcherFlags } from "./flags";
import { EventHandlerList } from "./event_handler";

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
 * Set Event Handler list to DOM Node.
 *
 * @param node DOM Node.
 * @param events Event Handler List.
 */
export function setEventHandlerListToDOMNode(node: Node, events: EventHandlerList | undefined): void {
    (node as any)[DOM_NODE_EVENTS_PROPERTY] = events;
}

/**
 * Get Event Handler list from DOM Node.
 *
 * @param node DOM Node.
 * @returns EventHandlerList or undefined if DOM Node doesn't listen for any events.
 */
export function getEventHandlerListFromDOMNode(node: Node): EventHandlerList | undefined {
    return (node as any)[DOM_NODE_EVENTS_PROPERTY];
}
