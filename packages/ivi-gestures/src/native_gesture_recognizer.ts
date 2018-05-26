import { GestureRecognizer } from "./gesture_recognizer";

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
    //
  }

  /**
   * NativeGestureRecognizer is rejected.
   */
  rejected(): void {
    //
  }
}
