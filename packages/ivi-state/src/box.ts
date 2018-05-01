
/**
 * Box is a mutable container for immutable objects.
 */
export interface Box<T> {
  /**
   * Value.
   */
  value: T;
}

/**
 * BoxSnapshot contains a boxed value snapshot.
 */
export interface BoxSnapshot<T> extends Box<T> {
  /**
   * Box that was used to create a snapshot.
   */
  readonly box: Box<T>;
}

/**
 * createBox creates a new Box for a `value`.
 *
 * @param value value.
 * @returns a new boxed value.
 */
export function createBox<T>(value: T): Box<T> {
  return { value };
}

/**
 * createBoxSnapshot creates a boxed value snapshot.
 *
 * @param box box.
 * @returns a boxed value snapshot.
 */
export function createBoxSnapshot<T>(box: Box<T>): BoxSnapshot<T> {
  return { box, value: box.value };
}
