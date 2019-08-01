import { UnmountToken } from "../core";
import { WatchList } from "../core/observable";
import { Op } from "./operations";
import { OpState } from "./state";

/**
 * Component state.
 *
 * @typeparam P Props type.
 */
export interface ComponentState<P = any, C = any> {
  /**
   * Render function.
   */
  r: null | ((props: P, children: C) => Op);
  /**
   * Observable dependencies.
   */
  d: WatchList;
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
export interface ComponentDescriptor<P = any, C = any> {
  /**
   * Lifecycle hook `create`.
   *
   * @param state Component state.
   * @returns update function.
   */
  c(state: OpState): (props: P, children: C) => Op;

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

export type Component = OpState<ComponentState>;
