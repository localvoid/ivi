import { VNode, t } from "./vnode";

/**
 * fragment is a variadic function that creates a children collection.
 *
 * @example
 *
 *     const content = children(
 *       p().c("Paragraph 1"),
 *       p().c("Paragraph 2"),
 *     );
 *
 *     render(
 *       div().c(
 *         h1().c("Title"),
 *         content,
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param args - Children
 * @returns Virtual DOM collection
 */
export function fragment(...args: Array<VNode | string | number | null>): VNode | null;

/**
 * fragment is a variadic function that creates a children collection.
 *
 * @example
 *
 *     const content = children(
 *       p().c("Paragraph 1"),
 *       p().c("Paragraph 2"),
 *     );
 *
 *     render(
 *       div().c(
 *         h1().c("Title"),
 *         content,
 *       ),
 *       DOMContainer,
 *     );
 *
 * @returns Virtual DOM collection
 */
export function fragment(): VNode | null {
  const args: Array<VNode | string | number | null> = arguments as any;
  let first: VNode<any> | null = null;
  let prev: VNode<any> | null = null;

  for (let i = 0; i < args.length; ++i) {
    let n = args[i];

    if (n !== null) {
      if (typeof n !== "object") {
        n = t(n);
      }
      const last = n._l;
      if (prev !== null) {
        n._l = prev;
        prev._r = n;
      } else {
        first = n;
      }
      prev = last;
    }
  }
  if (first !== null) {
    first._l = prev!;
  }

  return first;
}
