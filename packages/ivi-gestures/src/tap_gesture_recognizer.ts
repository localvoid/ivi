import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureConflictResolver } from "./gesture_conflict_resolver";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";

export class TapGestureRecognizer extends GestureRecognizer {
  constructor(resolver: GestureConflictResolver) {
    super(resolver, GestureBehavior.Tap);
  }

  accepted() {
    console.log("tap accepted");
  }

  rejected() {
    console.log("tap rejected");
  }

  handleEvent(event: GesturePointerEvent) {
    console.log("tap handleEvent");
    if (event.action & GesturePointerAction.Down) {
      this.activate();
      this.resolve();
    }
  }

  dispose() {
    console.log("tap dispose");
    if (this.state & GestureRecognizerState.Active) {
      this.cancel();
    }
  }
}
