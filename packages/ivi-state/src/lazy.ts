/**
 * lazy creates a lazy value.
 *
 * @param fn value constructor.
 * @returns a function that returns a lazy value.
 */
export const lazy = <T>(fn: () => T, v?: T) => () => v === void 0 ? v = fn() : v!;
