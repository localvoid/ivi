import { VNode } from "./vnode";

/**
 * ConnectDescriptor is a descriptor for connector objects.
 */
export interface ConnectDescriptor<T, P, C> {
  /**
   * Lifecycle hook `select()` should return current state.
   *
   * @param prev - Previous state
   * @param props - Properties
   * @param context - Current context
   * @returns Current state
   */
  select(prev: T | null, props: P, context: C): T;

  /**
   * Lifecycle hook `render()` should return virtual DOM representation or the connector component.
   *
   * @param state - State
   * @returns Virtual DOM representation
   */
  render(state: T): VNode<any>;
}
