import { EventFlags } from "./flags";
import { SyntheticEvent } from "./synthetic_event";

/**
 * EventHandlerFlags.
 */
export const enum EventHandlerFlags {
  /**
   * Capture flag that indicates that events of this type will be dispatched to the registered listener before
   * being dispatched to any EventTarget beneath it in the DOM tree.
   */
  Capture = 1,
  /**
   * Bubbles flag indicating that the events of this type will be dispatched to the registered listener in the
   * bubbling phase.
   */
  Bubble = 1 << 1,
}

export interface EventHandlerDescriptor {
  /**
   * Reference to the event source that will dispatch events for this event handler.
   */
  readonly src: any;
  /**
   * See {@link EventHandlerFlags} for details.
   */
  readonly flags: EventHandlerFlags;
}

/**
 * Event Handler.
 */
export interface EventHandlerNode<E extends SyntheticEvent = any> {
  /**
   * Event Handler Descriptor.
   */
  readonly d: EventHandlerDescriptor;
  /**
   * Event Handler function.
   */
  readonly h: (ev: E) => EventFlags | void;
}

export type EventHandler = EventHandlerNode | Array<EventHandlerNode | null> | null;
