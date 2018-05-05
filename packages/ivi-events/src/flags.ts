
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
  /**
   * Active flag indicates that Event Handler is activated. Available only in Dev Mode.
   */
  Active = 1 << 2,
}

/**
 * SyntheticEventFlags.
 */
export const enum SyntheticEventFlags {
  /**
   * Default behaviour should be prevented.
   */
  PreventedDefault = 1,
  /**
   * Propagation is stopped.
   */
  StoppedPropagation = 1 << 1,

  /**
   * Event can bubble up through the DOM.
   */
  Bubbles = 1 << 2,
  /**
   * Event is cancelable.
   */
  Cancelable = 1 << 3,
  /**
   * Event was initiated by the browser.
   */
  IsTrusted = 1 << 4,

  /**
   * Event at bubbling phase.
   */
  BubblePhase = 1 << 5,
}

export const enum EventFlags {
  PreventDefault = SyntheticEventFlags.PreventedDefault,
  StopPropagation = SyntheticEventFlags.StoppedPropagation,
}
