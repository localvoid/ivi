declare global {
  /**
   * Additional properties on iOS.
   */
  interface TouchEvent {
    rotation: number;
    scale: number;
  }
}

/**
 * iOS proprietary GestureEvent.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/GestureEvent}
 */
export const IOS_GESTURE_EVENT = (TARGET !== "electron") && ("GestureEvent" in window);
