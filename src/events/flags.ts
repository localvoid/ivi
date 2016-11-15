
/**
 * Native Event Dispatcher Flags.
 */
export const enum NativeEventDispatcherFlags {
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
 * Event Handler flags.
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

/**
 * Synthetic Event Flags.
 */
export const enum SyntheticEventFlags {
    /**
     * Propagation is stopped.
     */
    StoppedPropagation = 1,
    /**
     * Immediate propagation is stopped.
     */
    StoppedImmediatePropagation = 1 << 1,
    /**
     * Default behaviour should be prevented.
     */
    PreventedDefault = 1 << 2,

    /**
     * Event can bubble up through the DOM.
     */
    Bubbles = 1 << 3,
    /**
     * Event is cancelable.
     */
    Cancelable = 1 << 4,
    /**
     * Event was initiated by the browser.
     */
    IsTrusted = 1 << 5,

    /**
     * Event at target phase.
     */
    AtTargetPhase = 1 << 6,
    /**
     * Event at bubbling phase.
     */
    BubblePhase = 1 << 7,
}
