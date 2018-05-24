import { GestureRecognizer } from "./gesture_recognizer";
import { GestureArenaFlags, GESTURE_ARENA } from "./arena";

export abstract class NativeGestureRecognizer extends GestureRecognizer {
  /**
   * Native Gesture Recognizer is accepted.
   */
  accepted(): void {
    GESTURE_ARENA.flags |= GestureArenaFlags.NativeGestureAccepted;
  }

  /**
   * Native Gesture Recognizer is rejected.
   */
  rejected(): void {
    GESTURE_ARENA.flags |= GestureArenaFlags.NativeGestureRejected;
  }
}
