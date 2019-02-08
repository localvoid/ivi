/**
 * getFunctionName retrieves a function name from `displayName` or `name` property.
 *
 * @param fn Function.
 * @returns Function name.
 */
export const getFunctionName = (fn: Function) => fn.displayName || fn.name || "(anonymous function)";
