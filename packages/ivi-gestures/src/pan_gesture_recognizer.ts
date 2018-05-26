import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureConflictResolver } from "./gesture_conflict_resolver";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";

export class PanGestureRecognizer extends GestureRecognizer {
  constructor(resolver: GestureConflictResolver) {
    super(resolver, GestureBehavior.Pan);
  }

  accepted() {
    console.log("pan accepted");
  }

  rejected() {
    console.log("pan rejected");
  }

  handleEvent(event: GesturePointerEvent) {
    console.log("pan handleEvent");
    if (event.action & GesturePointerAction.Down) {
      this.activate();
      this.resolve();
    }
  }

  dispose() {
    console.log("pan dispose");
    if (this.state & GestureRecognizerState.Active) {
      this.cancel();
    }
  }
}
