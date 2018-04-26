export type Predicate<T> = (value: T) => boolean;

export type MaybeUndefined<T> = {
  [P in keyof T]: T[P] | undefined;
};
