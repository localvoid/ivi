import { GestureRecognizer } from "./gesture_recognizer";

/**
 * Gesture conflict resolution status.
 */
export const enum GestureConflictResolutionStatus {
  /**
   * Participate in the "last recognized gesture wins" strategy.
   */
  LastRecognizerWins = 1,
  /**
   * Recognizer wants to wait a little bit more, until more data is gathered.
   */
  Wait = 1 << 1,
  /**
   * Recognizer detects that gestures with a higher priority were resolved, so it just bails out.
   */
  Cancel = 1 << 2,
}

export const enum GestureConflictResolverAction {
  Activate,
  Resolve,
  Cancel,
  Finish,
}

export type GestureConflictResolver = (recognizer: GestureRecognizer, action: GestureConflictResolverAction) => void;
