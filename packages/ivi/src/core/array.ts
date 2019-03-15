/**
 * append pushes item to an array and automatically creates a new array when it doesn't exist.
 *
 * @typeparam T Item type.
 * @param array Array.
 * @param item Item to append.
 * @returns Array.
 */
export const append = <T>(array: T[] | null, item: T) => array === null ? [item] : (array.push(item), array);

/**
 * unorderedArrayDeleteByIndex deletes item from an array with O(1) complexity.
 *
 * It swaps item at `index` position with the last item and removes the last one.
 *
 * @typeparam T Item type.
 * @param array Array.
 * @param index Index of an item to delete.
 */
export function unorderedArrayDeleteByIndex<T>(array: T[], index: number): void {
  const length = array.length - 1;
  const last = array.pop();
  if (index !== length) {
    array[index] = last!;
  }
}

/**
 * unorderedArrayDelete deletes item from an array with O(1) complexity.
 *
 * It swaps item at `index` position with the last item and deletes the last one.
 *
 * @typeparam T Item type.
 * @param array Array.
 * @param item Item to delete.
 */
export function unorderedArrayDelete<T>(array: T[], item: T): void {
  const index = array.indexOf(item);
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (index === -1) {
      throw new Error(`Failed to delete an item from an array, item doesn't exist in the array`);
    }
  }
  unorderedArrayDeleteByIndex(array, index);
}
