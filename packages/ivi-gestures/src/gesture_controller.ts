import { GestureRecognizer } from "./gesture_recognizer";

export const enum GestureConflictResolverAction {
  Activate,
  Resolve,
  Cancel,
  Finish,
}

export type GestureController = (recognizer: GestureRecognizer<any>, action: GestureConflictResolverAction) => void;
