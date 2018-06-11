import { SyntheticEvent, SyntheticEventFlags } from "ivi";
import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController } from "./gesture_controller";
import { GestureConstants } from "./constants";

export const enum TapGestureAction {
  PointerDown = 1,
  Tap = 1 << 1,
  Cancel = 1 << 2,
}

export class TapGestureEvent extends SyntheticEvent {
  readonly action: TapGestureAction;
  readonly x0: number;
  readonly y0: number;

  constructor(
    flags: SyntheticEventFlags,
    timestamp: number,
    action: TapGestureAction,
    x0: number,
    y0: number,
  ) {
    super(flags, timestamp);
    this.action = action;
    this.x0 = x0;
    this.y0 = y0;
  }
}

export class TapGestureRecognizer extends GestureRecognizer<TapGestureEvent> {
  private x0 = 0;
  private y0 = 0;
  private pointerId = -1;
  private timeoutHandle = 0;
  private timeoutHandler = () => {
    if (this.state & GestureRecognizerState.Active) {
      this.cancel();
      this.deactivate();
      this.reset();
    }
  }

  constructor(controller: GestureController, handler: (ev: TapGestureEvent) => void) {
    super(
      controller,
      handler,
      GestureBehavior.Tap,
      0,
      1,
    );
  }

  shouldWait() {
    if (this.state & GestureRecognizerState.Resolved) {
      return false;
    }
    return true;
  }

  handleEvent(event: GesturePointerEvent) {
    const action = event.action;
    const state = this.state;
    if (action & GesturePointerAction.Down) {
      if (!(state & GestureRecognizerState.Active)) {
        this.pointerId = event.id;
        this.x0 = event.pageX;
        this.y0 = event.pageY;
        this.activate();
        this.start();
        setTimeout(this.timeoutHandler, GestureConstants.TapDelay);
      }
    } else if (action & (GesturePointerAction.Move | GesturePointerAction.Up)) {
      if (this.pointerId === event.id) {
        if (action & GesturePointerAction.Move) {
          if (!(state & GestureRecognizerState.Resolved)) {
            if (
              (Math.abs(this.x0 - event.pageX) >= GestureConstants.PanDistance) ||
              (Math.abs(this.y0 - event.pageY) >= GestureConstants.PanDistance)
            ) {
              this.cancel();
              this.deactivate();
              this.reset();
            }
          }
        } else {
          this.resolve();
        }
      }
    }
  }

  accepted() {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = 0;
    if (this.state & GestureRecognizerState.Resolved) {
      this.end();
      this.deactivate();
      this.reset();
    } else {
      this.resolve();
    }
  }

  resolved() {
    if (this.state & GestureRecognizerState.Accepted) {
      this.end();
      this.deactivate();
      this.reset();
    }
  }

  started() {
    this.emit(TapGestureAction.PointerDown);
  }

  ended() {
    this.emit(TapGestureAction.Tap);
  }

  canceled() {
    this.emit(TapGestureAction.Cancel);
  }

  reset() {
    super.reset();
    if (this.timeoutHandle !== 0) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = 0;
    }
  }

  private emit(action: TapGestureAction): void {
    this.handler(new TapGestureEvent(0, performance.now(), action, this.x0, this.y0));
  }
}
