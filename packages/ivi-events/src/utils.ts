import { FEATURES, FeatureFlags } from "ivi-core";
import { NativeEventSourceFlags } from "./flags";
import { EventHandler } from "./event_handler";

/**
 * Extends Element interface with a special property that is used to assign synthetic event handlers list.
 */
declare global {
  interface Element {
    _ev: Array<EventHandler | null> | EventHandler | null | undefined;
  }
}

/**
 * getEventTarget retrieves target element from an event.
 *
 * There are still some differences in modern browsers, so we need to use this function to retrieve event targets.
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
 * `{ capture: true, passive: true }` object that should be used as a 3rd parameter for `addEventListener` method.
 */
export const EVENT_CAPTURE_PASSIVE_OPTIONS =
  ((FEATURES & FeatureFlags.PassiveEvents) !== 0) ?
    { "capture": true, "passive": true } :
    true;

/**
 * `{ passive: true }` object that should be used as a 3rd parameter for `addEventListener` method.
 */
export const EVENT_PASSIVE_OPTIONS =
  ((FEATURES & FeatureFlags.PassiveEvents) !== 0) ?
    { "passive": true } :
    false;

/**
 * getNativeEventOptions converts `NativeEventSourceFlags` to event options that can be used as a 3rd parameter
 * for `addEventListener` method.
 *
 * #quirks
 *
 * @param flags See `NativeEventSourceFlags` for details.
 * @returns Option object that can be used as a 3rd parameter for `addEventListener` method.
 */
export function getNativeEventOptions(
  flags: NativeEventSourceFlags,
): boolean | { capture?: boolean, passive?: boolean } {
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
 * setEventHandlersToDOMNode assigns a event handlers to the DOM node.
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
 * getEventHandlersFromDOMNode retrieves event handlers from the DOM node.
 *
 * @param node DOM Node.
 * @returns Event Handlers.
 */
export function getEventHandlersFromDOMNode(
  node: Element,
): Array<EventHandler | null> | EventHandler | undefined | null {
  return node._ev;
}
