import { DispatchEventDirective } from "./dispatch_event";

export const enum EventFlags {
  /**
   * Stops event propagation.
   */
  StopPropagation = DispatchEventDirective.StopPropagation,
  /**
   * Prevents default behavior.
   */
  PreventDefault = 1 << 1,
}

/**
 * Prevents default behavior for an event.
 */
export const PREVENT_DEFAULT = EventFlags.PreventDefault;

/**
 * Stops event propagation.
 */
export const STOP_PROPAGATION = EventFlags.StopPropagation;

/**
 * NativeEventSourceFlags.
 */
export const enum NativeEventSourceFlags {
  /**
   * Capture flag that indicates that events of this type will be dispatched to the registered listener before
   * being dispatched to any EventTarget beneath it in the DOM tree.
   */
  Capture = 1,
  /**
   * Passive flag indicating that the listener will never call `preventDefault()`. If it does, the user agent
   * should ignore it.
   */
  Passive = 1 << 1,
  /**
   * Bubbles flag indicating that the event is bubbling.
   */
  Bubbles = 1 << 2,
}
