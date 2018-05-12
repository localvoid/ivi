import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * fragment is a variadic function that creates a children collection.
 *
 *     const content = children(
 *       h.p().c("Paragraph 1"),
 *       h.p().c("Paragraph 2"),
 *     );
 *
 *     render(
 *       h.div().c(
 *         h.h1().c("Title"),
 *         content,
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param args children.
 * @returns children collection.
 */
export function fragment(...args: Array<VNode | string | number | null>): VNode | null;

/**
 * fragment is a variadic function that creates a children collection.
 *
 *     const content = children(
 *       h.p().c("Paragraph 1"),
 *       h.p().c("Paragraph 2"),
 *     );
 *
 *     render(
 *       h.div().c(
 *         h.h1().c("Title"),
 *         content,
 *       ),
 *       DOMContainer,
 *     );
 *
 * @returns children collection.
 */
export function fragment(): VNode | null {
  const args: Array<VNode | string | number | null> = arguments as any;
  let first: VNode<any> | null = null;
  let prev: VNode<any> | null = null;

  for (let i = 0; i < args.length; ++i) {
    let n = args[i];

    if (n !== null) {
      if (typeof n !== "object") {
        n = new VNode<null>(VNodeFlags.Text, null, null, void 0, n);
      }
      const last = n.prev;
      if (prev !== null) {
        n.prev = prev;
        prev.next = n;
      } else {
        first = n;
      }
      prev = last;
    }
  }
  if (first !== null) {
    first.prev = prev!;
  }

  return first;
}

/**
 * map creates a children collection with the results of calling a provided function on every element in the calling
 * array.
 *
 *     render(
 *       h.div().c(
 *         map([1, 2, 3], (item) => h.div().k(item)),
 *       ),
 *       DOMContainer,
 *     );
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
        /* istanbul ignore else */
        if (DEBUG) {
          if ((n.flags & VNodeFlags.Key) === 0) {
            throw new Error(`VNodes created with a map() function should have an explicit key`);
          }
          if (n.prev !== n) {
            throw new Error(`VNodes created with a map() function should be a singular nodes`);
          }
        }
        if (prev !== null) {
          n.prev = prev;
          prev.next = n;
        } else {
          first = n;
        }
        prev = n;
      }
    }
    if (first !== null) {
      first.prev = prev!;
      first.flags |= VNodeFlags.KeyedList;
      return first;
    }
  }
  return null;
}

/**
 * mapRange creates a children collection with the results of calling a provided function on every number in the
 * provided range.
 *
 *     const items = [1, 2, 3];
 *
 *     render(
 *       h.div().c(
 *         mapRange(0, items.length, (i) => h.div().k(items[i])),
 *       ),
 *       DOMContainer,
 *     );
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
        /* istanbul ignore else */
        if (DEBUG) {
          if ((n.flags & VNodeFlags.Key) === 0) {
            throw new Error(`VNodes created with a mapRange() function should have an explicit key`);
          }
          if (n.prev !== n) {
            throw new Error(`VNodes created with a mapRange() function should be a singular nodes`);
          }
        }
        if (prev !== null) {
          n.prev = prev;
          prev.next = n;
        } else {
          first = n;
        }
        prev = n;
      }
    } while (start < length);
    if (first !== null) {
      first.prev = prev!;
      first.flags |= VNodeFlags.KeyedList;
      return first;
    }
  }
  return null;
}
