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
 * map creates a new array with the results of calling a provided function on every element in the calling array.
 *
 * @param items Array.
 * @param fn Function that produces an element of the new Array.
 */
export function map<T, U>(array: Array<T>, fn: (item: T, index: number) => VNode<U>): VNode<U> | null {
  if (array.length) {
    const first = fn(array[0], 0);
    let prev = first;
    for (let i = 1; i < array.length; i++) {
      const vnode = fn(array[i], i);
      vnode._prev = prev;
      prev._next = vnode;
      prev = vnode;
    }
    first._prev = prev;
    first._flags |= VNodeFlags.KeyedList;
    return first;
  }
  return null;
}

/**
 * mapRange creates a new array with the results of calling a provided function on every number in the provided range.
 *
 * @param start Range start.
 * @param end Range end.
 * @param fn Function that produces an element for the new Array.
 */
export function mapRange<T>(start: number, end: number, fn: (idx: number) => VNode<T>): VNode<T> | null {
  const length = end - start;
  if (length) {
    const first = fn(start);
    let prev = first;
    for (let i = 1; i < length; ++i) {
      const vnode = fn(start + i);
      vnode._prev = prev;
      prev._next = vnode;
      prev = vnode;
    }
    first._prev = prev;
    first._flags |= VNodeFlags.KeyedList;
    return first;
  }
  return null;
}

export function mapFilter<T, U>(array: Array<T>, fn: (item: T, index: number) => VNode<U> | null): VNode<U> | null {
  if (array.length) {
    let first: VNode<any> | null = null;
    let vnode: VNode<any> | null;
    let i = 0;
    while (i < array.length) {
      vnode = fn(array[i], i++);
      if (vnode !== null) {
        first = vnode;
        break;
      }
    }
    if (first !== null) {
      let prev = first;
      while (i < array.length) {
        vnode = fn(array[i], i++);
        if (vnode !== null) {
          vnode._prev = prev;
          prev._next = vnode;
          prev = vnode;
        }
      }
      first._prev = prev;
      first._flags |= VNodeFlags.KeyedList;
      return first;
    }
  }
  return null;
}
