import { Op } from "./operations";
import { OpState } from "./state";
import { SelectToken, UnmountToken } from "./reconciler";

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
  s: null | ((token: SelectToken) => boolean);
  /**
   * Unmount hooks.
   */
  u: null | ((token: UnmountToken) => void) | ((token: UnmountToken) => void)[];
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
   * `areEqual` is a function that checks if `prev` and `next` props are equal, it is used as a hint to reduce
   * unnecessary updates.
   *
   * @param prev Previous properties.
   * @param next Next properties.
   * @returns `true` when props are equal.
   */
  readonly e: undefined | ((prev: P, next: P) => boolean);
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
   * `areEqual` is a function that checks if `prev` and `next` props are equal, it is used as a hint to reduce
   * unnecessary updates.
   *
   * @param prev Previous properties.
   * @param next Next properties.
   * @returns `true` when props are equal.
   */
  readonly e: undefined | ((prev: P, next: P) => boolean);
}

export type Component = OpState<ComponentHooks>;
