/**
 * append pushes item to an array and automatically create a new array when it doesn't exist.
 *
 * @param array - Array
 * @param item - Item
 * @returns Array
 */
export const append = <T>(array: T[] | null, item: T) => array === null ? [item] : (array.push(item), array);

/**
 * unorderedArrayDelete deletes element from an array with O(1) complexity.
 *
 * It swaps element at `index` position with the last element and removes the last one.
 *
 * @param array - Array
 * @param index - Index of an element to remove
 */
export function unorderedArrayDelete<T>(array: T[], index: number): void {
  const length = array.length - 1;
  const last = array.pop();
  if (index !== length) {
    array[index] = last!;
  }
}
