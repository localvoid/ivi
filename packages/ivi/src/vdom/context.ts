import { EMPTY_OBJECT } from "../core";

/**
 * Current context.
 */
let _context = EMPTY_OBJECT;

/**
 * Used for detecting invalid `context()` invocations in DEBUG mode.
 */
let _contextEnabled = false;

/**
 * Enable checking for invalid `context()` invocations in DEBUG mode.
 */
export function enableContext() {
  _contextEnabled = true;
}

/**
 * Disable checking for invalid `context()` invocations in DEBUG mode.
 */
export function disableContext() {
  _contextEnabled = false;
}

/**
 * setContext assigns current context.
 *
 * Should be executed before going deeper into Context node.
 *
 * @param c Current context.
 * @returns previous context
 */
export function setContext(c: {}): {} {
  const tmp = _context;
  _context = c;
  return tmp;
}

/**
 * restoreContext restores previous context.
 *
 * Should be executed after processing Context node.
 *
 * @param c Previous context.
 */
export function restoreContext(c: {}): void {
  _context = c;
}

/**
 * context retrieves current context.
 *
 * @typeparam Context type.
 * @returns current context
 */
export function context<T extends {}>(): T {
  /* istanbul ignore else */
  if (__IVI_DEBUG__) {
    if (!_contextEnabled) {
      throw new Error(`Invalid context() invocation. Context can't be used outside of a reconciliation phase`);
    }
  }
  return _context as T;
}
