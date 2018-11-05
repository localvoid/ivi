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
 * Find root node of a container.
 *
 * @param container - DOM Node that contains root node
 * @returns root node or undefined when root node doesn't exist
 */
export const findRoot = (container: Element) => ROOTS.find((r) => r.container === container);
