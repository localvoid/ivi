
/**
 * Mutable type.
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
