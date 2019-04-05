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
export interface EventHandlerNode<H = any> {
  /**
   * Event Handler Descriptor.
   */
  readonly d: EventHandlerDescriptor;
  /**
   * Event Handler function.
   */
  readonly h: H;
}

/**
 * Event handler.
 */
export type EventHandler = EventHandlerNode | EventHandlerArray | null;

/**
 * Recursive event handler array.
 */
export interface EventHandlerArray extends Array<EventHandler> { }
