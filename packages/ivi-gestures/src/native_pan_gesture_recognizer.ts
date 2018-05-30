import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureRecognizer, GestureRecognizerState, GestureRecognizerUpdateAction } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController } from "./gesture_controller";

export class NativePanGestureRecognizer extends GestureRecognizer {
  private startX = 0;
  private startY = 0;
  private pointerId: number = -1;

  constructor(controller: GestureController) {
    super(
      controller,
      GestureBehavior.Pan | GestureBehavior.Native,
      GestureBehavior.Pan,
      1,
    );
  }

  update(action: GestureRecognizerUpdateAction, data: GesturePointerEvent) {
    if (action === GestureRecognizerUpdateAction.Accepted) {
      if (!(this.state & GestureRecognizerState.Resolved)) {
        this.resolve();
      }
    } else if (action === GestureRecognizerUpdateAction.HandleEvent) {
      const evAction = data.action;
      if (evAction & GesturePointerAction.Down) {
        if (!(this.state & GestureRecognizerState.Active)) {
          this.startX = data.pageX;
          this.startY = data.pageY;
          this.pointerId = data.id;
          this.activate();
        }
      } else if (evAction & (GesturePointerAction.Move | GesturePointerAction.Up)) {
        if (this.pointerId === data.id) {
          if (evAction & GesturePointerAction.Move) {
            if (!(this.state & (GestureRecognizerState.Resolved | GestureRecognizerState.Accepted))) {
              if (Math.abs(this.startX - data.pageX) >= 8) {
                this.resolve();
              } else {
                if (Math.abs(this.startY - data.pageY) >= 8) {
                  this.resolve();
                }
              }
            }
          } else {
            if (this.state & (GestureRecognizerState.Accepted | GestureRecognizerState.Resolved)) {
              this.finish();
            } else {
              this.cancel();
            }
          }
        }
      }
    }
  }
}
