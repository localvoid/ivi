import { EventHandler, EventSource } from "ivi-events";
import { VNode, VNodeFlags } from "ivi";

/**
 * containsClassName checks if className list contains a className.
 *
 * @param classNames className list in a HTML format with all values separated by space characters.
 * @param className className to check.
 * @returns true when className list contains a className.
 */
export function containsClassName(classNames: string, className: string): boolean {
  return classNames
    .split(" ")
    .map((c) => c.trim())
    .some((c) => c === className);
}

/**
 * matchValues checks property values for matching. Properties that aren't in `match` property are ignored.
 *
 * @param props Properties that should be matched against `match` property.
 * @param match Is a map of values that should match.
 * @returns true when properties are matching.
 */
export function matchValues(
  props: { [key: string]: any } | null,
  match: { [key: string]: any } | null,
): boolean {
  if (match !== null) {
    const keys = Object.keys(match);
    if (keys.length > 0) {
      if (props === null) {
        return false;
      }
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (props.hasOwnProperty(key) === false || props[key] !== match[key]) {
          return false;
        }
      }
    }
  }
  return true;
}

/**
 * matchKeys checks that property keys are existing.
 *
 * @param props Properties that should be checked against `match` property.
 * @param match Is a map of keys that should exist.
 * @returns true when matching properties are existing.
 */
export function matchKeys(
  props: { [key: string]: any } | null,
  match: { [key: string]: boolean },
): boolean {
  const keys = Object.keys(match);
  if (keys.length > 0) {
    if (props === null) {
      return false;
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (match[key] !== props.hasOwnProperty(key)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * containsEventHandler checks if event handler list contain an event source.
 *
 * @param eventHandlers Event handlers.
 * @param eventSource Event source.
 * @returns true when event handlers contain an event source.
 */
export function containsEventHandler(
  eventHandlers: Array<EventHandler | null> | EventHandler | null,
  eventSource: EventSource,
): boolean {
  if (eventHandlers !== null) {
    if (Array.isArray(eventHandlers)) {
      for (let i = 0; i < eventHandlers.length; i++) {
        const h = eventHandlers[i];
        if (h !== null && h.source === eventSource) {
          return true;
        }
      }
    } else {
      return (eventHandlers.source === eventSource);
    }
  }
  return false;
}

const VNodeLooseMatchFlags = 0
  | VNodeFlags.Text
  | VNodeFlags.Element
  | VNodeFlags.ComponentFunction
  | VNodeFlags.ComponentClass
  | VNodeFlags.InputElement
  | VNodeFlags.TextAreaElement
  | VNodeFlags.MediaElement
  | VNodeFlags.SvgElement
  | VNodeFlags.Connect
  | VNodeFlags.UpdateContext
  | VNodeFlags.KeepAlive
  | VNodeFlags.VoidElement;

/**
 * isVNodeLooseMatch performs a loose match on VNodes.
 *
 * @param a VNode.
 * @param b VNode.
 * @returns true when VNode are loosely matching.
 */
export function isVNodeLooseMatch(a: VNode<any>, b: VNode<any>): boolean {
  const bFlags = b._flags;
  if (((a._flags ^ bFlags) & VNodeLooseMatchFlags) !== 0) {
    return false;
  }

  if (a._tag !== b._tag) {
    return false;
  }

  if ((bFlags & VNodeFlags.Element) !== 0) {
    if (b._props !== null) {
      if (a._props === null) {
        return false;
      }

      if (matchValues(a._props.attrs, b._props.attrs) === false) {
        return false;
      }
      if (matchValues(a._props.syle, b._props.style) === false) {
        return false;
      }

    }
  }
  return true;
}
