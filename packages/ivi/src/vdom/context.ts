/**
 * Current context.
 */
let _context = {};

/**
 * setContext assigns current context.
 *
 * Should be executed before going deeper into Context node.
 *
 * @param c - Current context.
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
 * @param c - Previous context.
 */
export function restoreContext(c: {}): void {
  _context = c;
}

/**
 * context retrieves current context.
 *
 * @returns current context
 */
export function context<T extends {}>(): T {
  return _context as T;
}
