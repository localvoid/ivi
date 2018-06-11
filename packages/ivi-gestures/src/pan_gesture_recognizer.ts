import { SyntheticEvent, SyntheticEventFlags } from "ivi";
import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController } from "./gesture_controller";
import { GestureConstants } from "./constants";

export const enum PanGestureAction {
  Start = 1,
  Update = 1 << 1,
  End = 1 << 2,
  Cancel = 1 << 3,
}

export class PanGestureEvent extends SyntheticEvent {
  readonly action: PanGestureAction;
  readonly x0: number;
  readonly y0: number;
  readonly dx: number;
  readonly dy: number;

  constructor(
    flags: SyntheticEventFlags,
    timestamp: number,
    action: PanGestureAction,
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

export class PanGestureRecognizer extends GestureRecognizer<PanGestureEvent> {
  private x0 = 0;
  private y0 = 0;
  private dx = 0;
  private dy = 0;
  private pointerId: number = -1;

  constructor(controller: GestureController, handler: (ev: PanGestureEvent) => void, behavior: GestureBehavior) {
    super(
      controller,
      handler,
      behavior,
      behavior,
      1,
    );
  }

  handleEvent(event: GesturePointerEvent) {
    const state = this.state;
    if (event.action & GesturePointerAction.Down) {
      if (!(state & GestureRecognizerState.Active)) {
        this.x0 = event.pageX;
        this.y0 = event.pageY;
        this.dx = 0;
        this.dy = 0;
        this.pointerId = event.id;
        this.activate();
      }
    } else {
      if (this.pointerId === event.id) {
        if (event.action & GesturePointerAction.Move) {
          this.dx = event.pageX - this.x0;
          this.dy = event.pageY - this.y0;
          if (!(state & GestureRecognizerState.Resolved)) {
            const resolveAction = this.resolveAction;
            if (
              (((resolveAction & GestureBehavior.PanUp) && (this.dy <= -GestureConstants.PanDistance))) ||
              (((resolveAction & GestureBehavior.PanDown) && (this.dy >= GestureConstants.PanDistance))) ||
              (((resolveAction & GestureBehavior.PanLeft) && (this.dx <= -GestureConstants.PanDistance))) ||
              (((resolveAction & GestureBehavior.PanRight) && (this.dx >= GestureConstants.PanDistance)))
            ) {
              this.resolve();
            }
          } else {
            this.updated();
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

  started() {
    this.x0 += this.dx;
    this.y0 += this.dy;
    this.dx = 0;
    this.dy = 0;
    this.emit(PanGestureAction.Start);
  }

  updated() {
    this.emit(PanGestureAction.Update);
  }

  ended() {
    this.emit(PanGestureAction.End);
  }

  canceled() {
    this.emit(PanGestureAction.Cancel);
  }

  private emit(action: PanGestureAction): void {
    this.handler(new PanGestureEvent(0, performance.now(), action, this.x0, this.y0, this.dx, this.dy));
  }
}
