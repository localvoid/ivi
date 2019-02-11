import { EventHandlerNode } from "./event_handler";

/**
 * DispatchTarget.
 */
export interface DispatchTarget {
  /**
   * Target.
   */
  readonly t: any;
  /**
   * Matched Event Handlers.
   */
  readonly h: EventHandlerNode;
}
