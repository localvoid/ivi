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

/**
 * Finds index for insert in an ordered array.
 *
 * @example
 *
 *     const a = [1, 3, 4];
 *     a.splice(orderedArrayFindIndexForInsert(a, (a, b) => a - b, 2), 0, 2);
 *
 * @param array Ordered array.
 * @param cmp Comparator function.
 * @param value Value.
 * @returns Index for insert.
 */
export function orderedArrayFindIndexForInsert<T>(array: T[], cmp: (a: T, b: T) => number, value: T): number {
  let low = 0;
  let high = array.length;
  let mid;
  let c;

  while (low < high) {
    mid = (low + high) >>> 1;
    c = cmp(array[mid], value);
    if (c < 0) {
      low = mid + 1;
    } else if (c > 0) {
      high = mid;
    } else {
      return mid + 1; // one less item to shift
    }
  }
  return low;
}
