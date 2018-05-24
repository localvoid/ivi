import { GestureRecognizer } from "./gesture_recognizer";
import { GestureArenaFlags, GESTURE_ARENA } from "./arena";

/**
 * Native gesture recognizers are used to recognize native gestures and cancel all concurrent recognizers. When native
 * gesture is recognized, it will remove all active event listeners to make sure that scrolling thread doesn't need to
 * wait for a response from an UI thread.
 */
export abstract class NativeGestureRecognizer extends GestureRecognizer {
  /**
   * NativeGestureRecognizer is accepted.
   */
  accepted(): void {
    GESTURE_ARENA.flags |= GestureArenaFlags.NativeGestureAccepted;
  }

  /**
   * NativeGestureRecognizer is rejected.
   */
  rejected(): void {
    GESTURE_ARENA.flags |= GestureArenaFlags.NativeGestureRejected;
  }
}
