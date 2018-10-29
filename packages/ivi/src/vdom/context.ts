/**
 * Current context.
 */
let _context = {};

/**
 * setContext assigns current context.
 *
 * Should be executed before going deeper into Context node.
 *
 * @param context - Current context.
 * @returns previous context
 */
export function setContext(context: {}): {} {
  const tmp = _context;
  _context = context;
  return tmp;
}

/**
 * restoreContext restores previous context.
 *
 * Should be executed after processing Context node.
 *
 * @param context - Previous context.
 */
export function restoreContext(context: {}): void {
  _context = context;
}

/**
 * getContext retrieves current context.
 *
 * @returns current context
 */
export function getContext(): {} {
  return _context;
}
