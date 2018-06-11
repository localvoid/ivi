import { GestureRecognizer } from "./gesture_recognizer";

export const enum GestureControllerAction {
  Activate,
  Deactivate,
  Resolve,
  Accept,
}

export type GestureController = (recognizer: GestureRecognizer<any>, action: GestureControllerAction) => void;
