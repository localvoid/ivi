import { FEATURES, FeatureFlags } from "ivi-core";
import { NativeEventSourceFlags } from "./flags";
import { EventHandler } from "./event_handler";

declare global {
    interface Element {
        _ev: Array<EventHandler | null> | EventHandler | null | undefined;
    }
}

/**
 * Gets target element from an Event.
 *
 * There are still some differences in modern browsers, so we need to get event targets with this function.
 *
 * #quirks
 *
 * @param ev Event.
 * @returns Target Element.
 */
export function getEventTarget(ev: Event): EventTarget {
    let target = ev.target || window;

    /**
     * Some browsers are implementing it according to SVG 1.1 specs:
     *
     * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7998724/
     *
     * "If event attributes are assigned to referenced elements, then the actual target for the event will be the
     * SVGElementInstance object within the 'instance tree' corresponding to the given referenced element."
     *
     * https://www.w3.org/TR/SVG/struct.html#UseElement
     *
     * SVG 2 redefined the use event handling model:
     *
     * - Removed the SVGElementInstance and SVGElementInstanceList interfaces, and the corresponding attributes on the
     *   SVGUseElement interface.
     * - Changed the ‘use’ element event flow to follow the Shadow DOM spec.
     *
     * https://www.w3.org/TR/SVG2/changes.html#structure
     */
    if ((target as any).correspondingUseElement !== undefined) {
        target = (target as any).correspondingUseElement;
    }

    /**
     * Safari fires events on Text Nodes.
     *
     * http://www.quirksmode.org/js/events_properties.html
     */
    return (target as Node).nodeType === 3 ? (target as Node).parentNode! : target;
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
