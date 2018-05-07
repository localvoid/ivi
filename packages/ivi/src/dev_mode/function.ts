/* tslint:disable:ban-types */
/**
 * Get function name.
 *
 * @param fn Function.
 * @returns Function name.
 */
export function getFunctionName(fn: Function): string {
  return fn.displayName || fn.name || "(anonymous function)";
}
/* tslint:enable:ban-types */
