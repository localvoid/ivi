
/**
 * Remove element from an array with O(1) complexity.
 *
 * Swaps element at `index` position with the last element and removes the last one.
 *
 * Elements order will be changed after element removal.
 *
 * @param array Array
 * @param index Index of an element to remove
 */
export function unorderedArrayDelete<T>(array: T[], index: number): void {
    const length = array.length - 1;
    const last = array.pop();
    if (index !== length) {
        array[index] = last!;
    }
}
