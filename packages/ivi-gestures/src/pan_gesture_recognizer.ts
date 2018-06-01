import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController } from "./gesture_controller";

export class PanGestureRecognizer extends GestureRecognizer<any> {
  private x0 = 0;
  private y0 = 0;
  // dx
  // dy
  // vx - velocity
  // vy
  private pointerId: number = -1;
  // minPointers

  constructor(controller: GestureController, handler: (ev: any) => void, behavior: GestureBehavior) {
    super(
      controller,
      handler,
      behavior,
      behavior,
      1,
    );
  }

  handleEvent(data: GesturePointerEvent) {
    if (data.action & GesturePointerAction.Down) {
      if (!(this.state & GestureRecognizerState.Active)) {
        this.x0 = data.pageX;
        this.y0 = data.pageY;
        this.pointerId = data.id;
        this.activate();
      }
    } else {
      if (this.pointerId === data.id) {
        if (data.action & GesturePointerAction.Move) {
          if (!(this.state & (GestureRecognizerState.Resolved | GestureRecognizerState.Accepted))) {
            const dx = this.x0 - data.pageX;
            const dy = this.y0 - data.pageY;
            const resolveAction = this.resolveAction;
            if (
              (((resolveAction & GestureBehavior.PanUp) && (dy >= 8))) ||
              (((resolveAction & GestureBehavior.PanDown) && (dy <= -8))) ||
              (((resolveAction & GestureBehavior.PanLeft) && (dx >= 8))) ||
              (((resolveAction & GestureBehavior.PanRight) && (dx <= -8)))
            ) {
              this.resolve();
            }
          }
        } else {
          if (
            (this.state & (GestureRecognizerState.Accepted | GestureRecognizerState.Resolved)) &&
            !(data.action & GesturePointerAction.Cancel)
          ) {
            this.finish();
          } else {
            this.cancel();
          }
        }
      }
    }
  }

  accepted() {
    if (!(this.state & GestureRecognizerState.Resolved)) {
      this.resolve();
    }
  }

  rejected() {
    this.cancel();
  }
}
