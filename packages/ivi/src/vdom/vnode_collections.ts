import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";

export function children(...args: Array<VNode | string | number | null>): VNode | null;
export function children(): VNode | null {
  const args = arguments;
  let first: VNode<any> | null = null;
  let prev: VNode<any> | null = null;

  for (let i = 0; i < args.length; ++i) {
    let n = args[i];

    if (n !== null) {
      if (typeof n !== "object") {
        n = new VNode<null>(VNodeFlags.Text, null, null, void 0, n);
      }
      const last = n._prev;
      if (prev !== null) {
        n._prev = prev;
        prev._next = n;
      } else {
        first = n;
      }
      prev = last;
    }
  }
  if (first !== null) {
    first._prev = prev!;
  }

  return first;
}

/**
 * map creates a children collection with the results of calling a provided function on every element in the calling
 * array.
 *
 * @param items Array.
 * @param fn Function that produces an element for the children collection.
 */
export function map<T, U>(array: Array<T>, fn: (item: T, index: number) => VNode<U> | null): VNode<U> | null {
  if (array.length) {
    let first: VNode<any> | null = null;
    let prev: VNode<any> | null = null;
    for (let i = 0; i < array.length; ++i) {
      const n = fn(array[i], i);
      if (n !== null) {
        if (DEBUG) {
          if ((n._flags & VNodeFlags.Key) === 0) {
            throw new Error(`VNodes created with a map() function should have an explicit key`);
          }
          if (n._prev !== n) {
            throw new Error(`VNodes created with a map() function should be a singular nodes`);
          }
        }
        if (prev !== null) {
          n._prev = prev;
          prev._next = n;
        } else {
          first = n;
        }
        prev = n;
      }
    }
    if (first !== null) {
      first._prev = prev!;
      first._flags |= VNodeFlags.KeyedList;
      return first;
    }
  }
  return null;
}

/**
 * mapRange creates a children collection with the results of calling a provided function on every number in the
 * provided range.
 *
 * @param start Range start.
 * @param end Range end.
 * @param fn Function that produces an element for the children collection.
 */
export function mapRange<T>(start: number, end: number, fn: (idx: number) => VNode<T> | null): VNode<T> | null {
  const length = end - start;
  if (length) {
    let first: VNode<any> | null = null;
    let prev: VNode<any> | null = null;
    do {
      const n = fn(start++);
      if (n !== null) {
        if (DEBUG) {
          if ((n._flags & VNodeFlags.Key) === 0) {
            throw new Error(`VNodes created with a mapRange() function should have an explicit key`);
          }
          if (n._prev !== n) {
            throw new Error(`VNodes created with a mapRange() function should be a singular nodes`);
          }
        }
        if (prev !== null) {
          n._prev = prev;
          prev._next = n;
        } else {
          first = n;
        }
        prev = n;
      }
    } while (start < length);
    if (first !== null) {
      first._prev = prev!;
      first._flags |= VNodeFlags.KeyedList;
      return first;
    }
  }
  return null;
}
