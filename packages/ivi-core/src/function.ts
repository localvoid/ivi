/**
 * getFunctionName retrieves a function name.
 *
 * @param fn - Function
 * @returns Function name
 */
export function getFunctionName(fn: Function): string {
  return fn.displayName || fn.name || "(anonymous function)";
}
