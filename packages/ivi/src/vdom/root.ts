import { VNode } from "./vnode";

/**
 * Root.
 */
export interface Root {
  /**
   * Container element.
   */
  container: Element;
  /**
   * Next virtual DOM node.
   */
  next: VNode | null | undefined;
  /**
   * Current virtual DOM node.
   */
  current: VNode | null;
}

/**
 * Root nodes.
 */
export const ROOTS = [] as Root[];

/**
 * Find Root node in container.
 *
 * @param container - DOM Node that contains root node
 * @returns root node or undefined when root node doesn't exist
 */
export function findRoot(container: Element): Root | void {
  for (const root of ROOTS) {
    if (root.container === container) {
      return root;
    }
  }
}
