import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController } from "./gesture_controller";

const enum TapConstants {
  Delay = 300,
}

/**
 * Events:
 *
 * Begin
 * End
 * Cancel
 */

export class TapGestureRecognizer extends GestureRecognizer<any> {
  private startX = 0;
  private startY = 0;
  private pointerId = -1;
  private timeoutHandle = 0;
  private timeoutHandler = () => {
    if (this.state & GestureRecognizerState.Active) {
      this.cancel();
    }
  }

  constructor(controller: GestureController, handler: (ev: any) => void) {
    super(
      controller,
      handler,
      GestureBehavior.Tap,
      0,
      1,
    );
  }

  accepted() {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = 0;
  }

  handleEvent(event: GesturePointerEvent) {
    const action = event.action;
    if (action & GesturePointerAction.Down) {
      if (!(this.state & GestureRecognizerState.Active)) {
        this.pointerId = event.id;
        this.startX = event.pageX;
        this.startY = event.pageY;
        this.activate();
        setTimeout(this.timeoutHandler, TapConstants.Delay);
      }
    } else if (action & (GesturePointerAction.Move | GesturePointerAction.Up)) {
      if (this.pointerId === event.id) {
        if (action & GesturePointerAction.Move) {
          if (!(this.state & GestureRecognizerState.Resolved)) {
            let delta = Math.abs(this.startX - event.pageX);
            if (delta >= 8) {
              this.cancel();
            } else {
              delta = Math.abs(this.startY - event.pageY);
              if (delta >= 8) {
                this.cancel();
              }
            }
          }
        } else {
          this.resolve();
          this.finish();
        }
      }
    }
  }

  reset() {
    super.reset();
    if (this.timeoutHandle !== -1) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = -1;
    }
  }
}
