import { Op } from "./operations";
import { OpState } from "./state";

/**
 * Component state.
 *
 * @typeparam P Props type.
 */
export interface ComponentHooks<P = any> {
  /**
   * Render function.
   */
  r: null | ((props: P) => Op);
  /**
   * Selector hooks.
   */
  s: null | (() => boolean);
  /**
   * Unmount hooks.
   */
  u: null | ((unmount?: boolean) => void) | ((unmount?: boolean) => void)[];
}

/**
 * Component Descriptor.
 *
 * @typeparam P Props type.
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
  readonly su: undefined | ((prev: P, next: P) => boolean);
}

/**
 * Stateless Component Descriptor.
 *
 * @typeparam P Props type.
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
  readonly su: undefined | ((prev: P, next: P) => boolean);
}

export type Component = OpState<ComponentHooks>;
