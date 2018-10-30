import { VNode } from "./vnode";

/**
 * Component instance.
 */
export interface Component<P = any> {
  /**
   * dirty flag indicates that component should be updated.
   */
  dirty: boolean;
  /**
   * Update function.
   */
  update: null | ((props: P) => VNode);
  /**
   * Selector hooks.
   */
  select: null | ((context: {}) => boolean);
  /**
   * Detached hooks.
   */
  detached: null | (() => void) | (() => void)[];
}

/**
 * Component Descriptor.
 */
export interface ComponentDescriptor<P = any> {
  /**
   * Lifecycle hook `c()`.
   *
   * @param c - Component instance.
   * @returns update function
   */
  c(c: Component<P>): (props: P) => VNode;

  /**
   * Lifecycle hook `shouldUpdate()` is used as a hint to reduce unnecessary updates.
   *
   * @param prev - Previous properties
   * @param next - Next properties
   * @returns `true` when changes in props should trigger update
   */
  shouldUpdate: undefined | ((prev: P, next: P) => boolean);
}
