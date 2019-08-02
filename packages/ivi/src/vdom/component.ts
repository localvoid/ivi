import { UnmountToken } from "../core";
import { WatchList } from "../core/observable";
import { Op } from "./operations";
import { OpState } from "./state";

/**
 * Component state.
 *
 * @typeparam P Props type.
 */
export interface ComponentState<P1 = any, P2 = any> {
  /**
   * Render function.
   */
  r: null | ((p1: P1, p2: P2) => Op);
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
export interface ComponentDescriptor<P1 = any, P2 = any> {
  /**
   * Lifecycle hook `create`.
   *
   * @param state Component state.
   * @returns update function.
   */
  c(state: OpState): (p1: P1, p2: P2) => Op;

  /**
   * `areEqual1` is a function that checks if `prev` and `next` props (p1) are equal, it is used as a hint to reduce
   * unnecessary updates.
   *
   * @param prev Previous properties.
   * @param next Next properties.
   * @returns `true` when props are equal.
   */
  readonly e1: undefined | ((prev: P1, next: P1) => boolean);

  /**
   * `areEqual2` is a function that checks if `prev` and `next` props (p2) are equal, it is used as a hint to reduce
   * unnecessary updates.
   *
   * @param prev Previous properties.
   * @param next Next properties.
   * @returns `true` when props are equal.
   */
  readonly e2: undefined | ((prev: P2, next: P2) => boolean);
}

export type Component = OpState<ComponentState>;
