import { VNode } from "./vnode";

export type DetachedHook = () => void;

export interface ComponentHandle<P = any> {
  dirty: boolean;
  render: null | ((props: P) => VNode);
  select: null | ((context: {}) => void) | ((context: {}) => void)[];
  detached: null | DetachedHook | DetachedHook[];
}

/**
 * Component Descriptor.
 */
export interface ComponentDescriptor<P = any> {
  /**
   * Lifecycle hook `c()`.
   *
   * @param h - Component handle.
   * @returns render function
   */
  c(h: ComponentHandle<P>): (props: P) => VNode;

  /**
   * Lifecycle hook `shouldUpdate()` is used as a hint to reduce unnecessary updates.
   *
   * @param prev - Previous properties
   * @param next - Next properties
   * @returns `true` when changes in props should trigger update
   */
  shouldUpdate: null | ((prev: P, next: P) => boolean);
}
