import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController } from "./gesture_controller";
import { GestureConstants } from "./constants";

export class NativePanGestureRecognizer extends GestureRecognizer<any> {
  private x0 = 0;
  private y0 = 0;
  private pointerId: number = -1;

  constructor(controller: GestureController, handler: (ev: any) => void, behavior: GestureBehavior) {
    super(
      controller,
      handler,
      behavior | GestureBehavior.Native,
      behavior,
      1,
    );
  }

  handleEvent(event: GesturePointerEvent) {
    const pointerId = event.id;
    if (pointerId !== 1) { // ignore mouse events
      const state = this.state;
      if (event.action & GesturePointerAction.Down) {
        if (!(state & GestureRecognizerState.Active)) {
          this.x0 = event.pageX;
          this.y0 = event.pageY;
          this.pointerId = pointerId;
          this.activate();
        }
      } else {
        if (this.pointerId === pointerId) {
          if (event.action & GesturePointerAction.Move) {
            if (!(state & GestureRecognizerState.Resolved)) {
              const dx = event.pageX - this.x0;
              const dy = event.pageY - this.y0;
              const resolveAction = this.resolveAction;
              if (
                (((resolveAction & GestureBehavior.PanUp) && (dy <= -GestureConstants.PanDistance))) ||
                (((resolveAction & GestureBehavior.PanDown) && (dy >= GestureConstants.PanDistance))) ||
                (((resolveAction & GestureBehavior.PanLeft) && (dx <= -GestureConstants.PanDistance))) ||
                (((resolveAction & GestureBehavior.PanRight) && (dx >= GestureConstants.PanDistance)))
              ) {
                this.resolve();
              }
            }
          } else {
            if ((state & GestureRecognizerState.Started) && !(event.action & GesturePointerAction.Cancel)) {
              this.end();
            } else {
              this.cancel();
            }
            this.deactivate();
            this.reset();
          }
        }
      }
    }
  }

  accepted() {
    if (this.state & GestureRecognizerState.Resolved) {
      this.start();
    } else {
      this.resolve();
    }
  }

  resolved() {
    if (this.state & GestureRecognizerState.Accepted) {
      this.start();
    }
  }
}
