import { OpNode } from "./operations";
import { StateNode } from "./state";

/**
 * Component state.
 */
export interface ComponentHooks<T = any> {
  /**
   * Update function.
   */
  update: null | ((props: T) => OpNode);
  /**
   * Selector hooks.
   */
  dirtyCheck: null | ((context: {}) => boolean);
  /**
   * Detached hooks.
   */
  unmount: null | ((detached?: boolean) => void) | ((detached?: boolean) => void)[];
}

/**
 * Component Descriptor.
 */
export interface ComponentDescriptor<P = any> {
  /**
   * Lifecycle hook `c()`.
   *
   * @param state - Component state.
   * @returns update function
   */
  c(state: StateNode): (props: P) => OpNode;

  /**
   * Lifecycle hook `shouldUpdate()` is used as a hint to reduce unnecessary updates.
   *
   * @param prev - Previous properties
   * @param next - Next properties
   * @returns `true` when changes in props should trigger update
   */
  shouldUpdate: undefined | ((prev: P, next: P) => boolean);
}
