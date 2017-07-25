/**
 * append pushes item to an array and automatically create a new array when it doesn't exist.
 *
 * @param array Array
 * @param item Item
 * @returns Array
 */
export function append<T>(array: T[] | null, item: T): T[] {
  if (array === null) {
    return [item];
  }
  array.push(item);
  return array;
}

/**
 * unorderedArrayDelete deletes element from an array with O(1) complexity.
 *
 * It swaps element at `index` position with the last element and removes the last one.
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

/**
 * map creates a new array with the results of calling a provided function on every element in the calling array.
 *
 * @param items Array.
 * @param fn Function that produces an element of the new Array.
 */
export function map<I, O>(items: I[], fn: (item: I, idx: number) => O): O[] {
  const result = new Array(items.length);
  for (let i = 0; i < items.length; i++) {
    result[i] = fn(items[i], i);
  }
  return result;
}

/**
 * mapRange creates a new array with the results of calling a provided function on every number in the provided range.
 *
 * @param start Range start.
 * @param end Range end.
 * @param fn Function that produces an element for the new Array.
 */
export function mapRange<O>(start: number, end: number, fn: (idx: number) => O): O[] {
  const length = end - start;
  const result = new Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = fn(i + start);
  }
  return result;
}

/**
 * map creates a new array with the results of calling a provided function on every element in the calling array and
 * filters `undefined` values.
 *
 * @param items Array.
 * @param fn Function that produces an element of the new Array.
 */
export function mapFilterUndefined<I, O>(items: I[], fn: (item: I, idx: number) => O | undefined): O[] {
  const result = [];
  for (let i = 0; i < items.length; i++) {
    const r = fn(items[i], i);
    if (r !== undefined) {
      result.push(r);
    }
  }
  return result;
}
