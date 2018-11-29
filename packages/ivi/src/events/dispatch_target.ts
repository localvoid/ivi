import { EventHandlerNode } from "./event_handler";

/**
 * DispatchTarget.
 */
export interface DispatchTarget {
  /**
   * Target.
   */
  t: any;
  /**
   * Matched Event Handlers.
   */
  h: EventHandlerNode;
}
