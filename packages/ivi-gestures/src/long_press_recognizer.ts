import { SyntheticEvent, SyntheticEventFlags } from "ivi";
import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController } from "./gesture_controller";

export const enum LongPressGestureAction {
  Begin = 1,
  Change = 1 << 1,
  End = 1 << 2,
  Cancel = 1 << 3,
}

export class LongPressGestureEvent extends SyntheticEvent {
  readonly action: LongPressGestureAction;

  constructor(
    flags: SyntheticEventFlags,
    timestamp: number,
    action: LongPressGestureAction,
  ) {
    super(flags, timestamp);
    this.action = action;
  }
}

function createEvent(action: LongPressGestureAction): LongPressGestureEvent {
  return new LongPressGestureEvent(0, performance.now(), action);
}

export class LongPressGestureRecognizer extends GestureRecognizer<any> {
  private startX = 0;
  private startY = 0;
  private pointerId: number = -1;
  private timeoutHandle: number = 0;
  // minDuration
  // minPointers
  // maxDistance

  constructor(controller: GestureController, handler: (ev: any) => void) {
    super(
      controller,
      handler,
      GestureBehavior.Press,
      0,
      1,
    );
  }

  private handleTimeout = () => {
    const state = this.state;
    this.timeoutHandle = 0;
    if (state & GestureRecognizerState.Active) {
      this.resolve();
      if (state & GestureRecognizerState.Accepted) {
        this.handler(createEvent(LongPressGestureAction.Begin));
      }
    }
  }

  handleEvent(event: GesturePointerEvent) {
    if (event.action & GesturePointerAction.Down) {
      if (!(this.state & GestureRecognizerState.Active)) {
        this.startX = event.pageX;
        this.startY = event.pageY;
        this.pointerId = event.id;
        this.timeoutHandle = window.setTimeout(this.handleTimeout, 500);
        this.activate();
      }
    } else {
      if (this.pointerId === event.id) {
        if (event.action & GesturePointerAction.Move) {
          if (!(this.state & (GestureRecognizerState.Resolved | GestureRecognizerState.Accepted))) {
            if (
              (Math.abs(this.startX - event.pageX) >= 8) ||
              (Math.abs(this.startY - event.pageY) >= 8)
            ) {
              this.cancel();
            }
          } else {
            this.handler(event);
          }
        } else {
          if (
            (this.state & (GestureRecognizerState.Accepted | GestureRecognizerState.Resolved)) &&
            !(event.action & GesturePointerAction.Cancel)
          ) {
            this.finish();
            this.handler(createEvent(LongPressGestureAction.End));
          } else {
            this.cancel();
            this.handler(createEvent(LongPressGestureAction.Cancel));
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

  reset() {
    super.reset();
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = 0;
    }
  }
}
