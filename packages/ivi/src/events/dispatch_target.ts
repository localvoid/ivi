import { EventHandlerNode } from "./event_handler";

/**
 * DispatchTarget.
 */
export interface DispatchTarget<H = any> {
  /**
   * Target.
   */
  readonly t: any;
  /**
   * Matched Event Handlers.
   */
  readonly h: EventHandlerNode<H>;
}
