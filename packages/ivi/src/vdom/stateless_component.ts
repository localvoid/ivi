import { VNode } from "./vnode";

/**
 * Stateless Component descriptor.
 */
export interface StatelessComponent<P = undefined> {
  /**
   * Lifecycle hook `render()` should return virtual DOM representation or the component.
   *
   * @param props - Properties
   * @returns Virtual DOM representation
   */
  render(props: P): VNode;

  /**
   * Lifecycle hook `shouldUpdate()` is used as a hint to reduce unnecessary updates.
   *
   * @param prev - Previous properties
   * @param next - Next properties
   * @returns `true` when changes in props should trigger update
   */
  shouldUpdate: ((prev: P, next: P) => boolean) | null;
}
