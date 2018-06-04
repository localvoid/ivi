import { EventHandler, EventDispatcher, VNode, VNodeFlags } from "ivi";

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
  props: { [key: string]: any } | null | undefined,
  match: { [key: string]: any } | null | undefined,
): boolean {
  if (match) {
    const keys = Object.keys(match);
    if (keys.length > 0) {
      if (!props) {
        return false;
      }
      for (const key of keys) {
        if (!props.hasOwnProperty(key) || props[key] !== match[key]) {
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
  props: { [key: string]: any } | null | undefined,
  match: { [key: string]: boolean },
): boolean {
  const keys = Object.keys(match);
  if (keys.length > 0) {
    if (!props) {
      return false;
    }
    for (const key of keys) {
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
 * @param handlers Event handlers.
 * @param dispatcher Event source.
 * @returns true when event handlers contain an event source.
 */
export function containsEventHandler(
  handlers: Array<EventHandler | null> | EventHandler | null,
  dispatcher: EventDispatcher,
): boolean {
  if (handlers !== null) {
    if (Array.isArray(handlers)) {
      for (const h of handlers) {
        if (h !== null && h.src === dispatcher) {
          return true;
        }
      }
    } else {
      return (handlers.src === dispatcher);
    }
  }
  return false;
}

const VNodeLooseMatchFlags = 0
  | VNodeFlags.Text
  | VNodeFlags.Element
  | VNodeFlags.StatelessComponent
  | VNodeFlags.StatefulComponent
  | VNodeFlags.InputElement
  | VNodeFlags.TextAreaElement
  | VNodeFlags.MediaElement
  | VNodeFlags.SvgElement
  | VNodeFlags.Connect
  | VNodeFlags.UpdateContext
  | VNodeFlags.VoidElement;

/**
 * isVNodeLooseMatch performs a loose match on VNodes.
 *
 * @param a VNode.
 * @param b VNode.
 * @returns true when VNode are loosely matching.
 */
export function isVNodeLooseMatch(a: VNode, b: VNode): boolean {
  const aFlags = a._f;
  const bFlags = b._f;
  if (((aFlags ^ bFlags) & VNodeLooseMatchFlags) !== 0) {
    return false;
  }

  if (a._t !== b._t) {
    return false;
  }

  if ((bFlags & VNodeFlags.Element) !== 0) {
    if (!matchValues(a._p, b._p)) {
      return false;
    }
    if (!matchValues(a._s, b._s)) {
      return false;
    }
  }
  return true;
}
