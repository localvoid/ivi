import { SyntheticEvent, SyntheticEventFlags } from "ivi";
import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController } from "./gesture_controller";
import { GestureConstants } from "./constants";

export const enum LongPressGestureAction {
  PointerDown = 1,
  Start = 1 << 1,
  Update = 1 << 2,
  End = 1 << 3,
  Cancel = 1 << 4,
}

export class LongPressGestureEvent extends SyntheticEvent {
  readonly action: LongPressGestureAction;
  readonly x0: number;
  readonly y0: number;
  readonly dx: number;
  readonly dy: number;

  constructor(
    flags: SyntheticEventFlags,
    timestamp: number,
    action: LongPressGestureAction,
    x0: number,
    y0: number,
    dx: number,
    dy: number,
  ) {
    super(flags, timestamp);
    this.action = action;
    this.x0 = x0;
    this.y0 = y0;
    this.dx = dx;
    this.dy = dy;
  }
}

export class LongPressGestureRecognizer extends GestureRecognizer<LongPressGestureEvent> {
  private x0 = 0;
  private y0 = 0;
  private dx = 0;
  private dy = 0;
  private pointerId: number = -1;
  private timeoutHandle: number = 0;

  constructor(controller: GestureController, handler: (ev: LongPressGestureEvent) => void) {
    super(
      controller,
      handler,
      GestureBehavior.Press,
      0,
      1,
    );
  }

  private handleTimeout = () => {
    this.timeoutHandle = 0;
    if (this.state & GestureRecognizerState.Active) {
      this.resolve();
    }
  }

  handleEvent(event: GesturePointerEvent) {
    if (event.action & GesturePointerAction.Down) {
      if (!(this.state & GestureRecognizerState.Active)) {
        this.x0 = event.pageX;
        this.y0 = event.pageY;
        this.dx = 0;
        this.dy = 0;
        this.pointerId = event.id;
        this.timeoutHandle = window.setTimeout(this.handleTimeout, GestureConstants.LongPressDelay);
        this.activate();
      }
    } else {
      if (this.pointerId === event.id) {
        if (event.action & GesturePointerAction.Move) {
          this.dx = event.pageX - this.x0;
          this.dy = event.pageY - this.y0;
          if (this.state & GestureRecognizerState.Resolved) {
            this.updated();
          } else {
            if (
              (Math.abs(this.dx) >= GestureConstants.PanDistance) ||
              (Math.abs(this.dy) >= GestureConstants.PanDistance)
            ) {
              this.cancel();
            }
          }
        } else {
          if (
            (this.state & GestureRecognizerState.Accepted) &&
            !(event.action & GesturePointerAction.Cancel)
          ) {
            this.end();
          } else {
            this.cancel();
          }
        }
      }
    }
  }

  activated() {
    this.emit(LongPressGestureAction.PointerDown);
  }

  accepted() {
    if (this.state & GestureRecognizerState.Resolved) {
      this.started();
    } else {
      this.resolve();
    }
  }

  resolved() {
    if (this.state & GestureRecognizerState.Accepted) {
      this.started();
    }
  }

  started() {
    this.x0 += this.dx;
    this.y0 += this.dy;
    this.dx = 0;
    this.dy = 0;
    this.emit(LongPressGestureAction.Start);
  }

  updated() {
    this.emit(LongPressGestureAction.Update);
  }

  ended() {
    this.emit(LongPressGestureAction.End);
  }

  canceled() {
    this.emit(LongPressGestureAction.Cancel);
  }

  reset() {
    super.reset();
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = 0;
    }
  }

  private emit(action: LongPressGestureAction): void {
    this.handler(new LongPressGestureEvent(0, performance.now(), action, this.x0, this.y0, this.dx, this.dy));
  }
}
