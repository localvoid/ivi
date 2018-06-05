import { GestureRecognizer } from "./gesture_recognizer";

export const enum GestureConflictResolverAction {
  Activate,
  Resolve,
  Accept,
  Reject,
  Cancel,
  End,
}

export type GestureController = (recognizer: GestureRecognizer<any>, action: GestureConflictResolverAction) => void;
