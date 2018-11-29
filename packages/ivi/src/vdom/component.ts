import { Op } from "./operations";
import { OpState } from "./state";

/**
 * Component state.
 */
export interface ComponentHooks<T = any> {
  /**
   * Render function.
   */
  r: null | ((props: T) => Op);
  /**
   * Selector hooks.
   */
  s: null | ((context: {}) => boolean);
  /**
   * Unmount hooks.
   */
  u: null | ((detached?: boolean) => void) | ((detached?: boolean) => void)[];
}

/**
 * Component Descriptor.
 */
export interface ComponentDescriptor<P = any> {
  /**
   * Lifecycle hook `create`.
   *
   * @param state Component state.
   * @returns update function.
   */
  c(state: OpState): (props: P) => Op;

  /**
   * Lifecycle hook `shouldUpdate` is used as a hint to reduce unnecessary updates.
   *
   * @param prev Previous properties.
   * @param next Next properties.
   * @returns `true` when changes in props should trigger update.
   */
  su: undefined | ((prev: P, next: P) => boolean);
}

/**
 * Stateless Component Descriptor.
 */
export interface StatelessComponentDescriptor<P = any> {
  /**
   * Lifecycle hook `create`.
   *
   * @param props Component props.
   * @returns OpNode.
   */
  c(props: P): Op;

  /**
   * Lifecycle hook `shouldUpdate` is used as a hint to reduce unnecessary updates.
   *
   * @param prev Previous properties.
   * @param next Next properties.
   * @returns `true` when changes in props should trigger update.
   */
  su: undefined | ((prev: P, next: P) => boolean);
}
