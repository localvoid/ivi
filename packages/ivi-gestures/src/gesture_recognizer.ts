import { GesturePointerEvent } from "./pointer_event";

/**
 * Gesture Recognizer.
 */
export abstract class GestureRecognizer {
  /**
   * Activate Gesture Recognizer.
   *
   * When Gesture Recognizer is activated it should return `true` value.
   */
  abstract activate(event: GesturePointerEvent): boolean;

  /**
   * Invoked when Gesture Recognizer is accepted.
   */
  abstract accepted(): void;

  /**
   * Invoked when Gesture Recognizer is rejected.
   */
  abstract rejected(): void;

  /**
   * Add pointer.
   */
  addPointer(event: GesturePointerEvent): boolean {
    // Ignore all non-primary events by default.
    return false;
  }

  /**
   * Invoked when pointer is moved or released.
   */
  abstract handleEvent(event: GesturePointerEvent): void;

  /**
   * Dispose Gesture Recognizer.
   */
  abstract dispose(): void;
}
