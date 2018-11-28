import { EventHandler } from "ivi";

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
    .map(c => c.trim())
    .some(c => c === className);
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
  dispatcher: any,
): boolean {
  if (handlers !== null) {
    if (handlers instanceof Array) {
      for (let i = 0; i < handlers.length; ++i) {
        const h = handlers[i];
        if (h !== null && h === dispatcher) {
          return true;
        }
      }
    } else {
      return (handlers === dispatcher);
    }
  }
  return false;
}
