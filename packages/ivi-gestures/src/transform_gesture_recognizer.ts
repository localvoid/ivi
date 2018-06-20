import { V2, v2, V2_ZERO, v2Sub, v2Distance } from "ivi-math";
import { unorderedArrayDelete, SyntheticEvent, SyntheticEventFlags } from "ivi";
import { GesturePointerEvent, GesturePointerAction } from "./gesture_pointer_event";
import { GestureRecognizer, GestureRecognizerState } from "./gesture_recognizer";
import { GestureController } from "./gesture_controller";

export const enum TransformGestureAction {
  Start = 1,
  Update = 1 << 1,
  End = 1 << 2,
  Cancel = 1 << 3,
}

export class TransformGestureEvent extends SyntheticEvent {
  readonly action: TransformGestureAction;
  readonly focalPoint: V2;
  readonly scale: number;

  constructor(
    flags: SyntheticEventFlags,
    timestamp: number,
    action: TransformGestureAction,
    focalPoint: V2,
    scale: number,
  ) {
    super(flags, timestamp);
    this.action = action;
    this.focalPoint = focalPoint;
    this.scale = scale;
  }
}

function calcFocalPoint(events: GesturePointerEvent[]): V2 {
  let x = 0;
  let y = 0;
  const length = events.length;
  for (let i = 0; i < length; ++i) {
    const ev = events[i];
    x += ev.pageX;
    y += ev.pageY;
  }
  return v2(x / length, y / length);
}

function avgDeviation(fp: V2, events: GesturePointerEvent[]): number {
  let totalDeviation = 0;
  const x0 = fp.x;
  const y0 = fp.y;
  const length = events.length;
  for (let i = 0; i < length; ++i) {
    const ev = events[i];
    const x = x0 - ev.pageX;
    const y = y0 - ev.pageY;
    totalDeviation += Math.sqrt(x * x + y * y);
  }
  return totalDeviation / length;
}

function findPointerById(pointers: GesturePointerEvent[], id: number): number {
  for (let i = 0; i < pointers.length; ++i) {
    if (pointers[i].id === id) {
      return i;
    }
  }
  return -1;
}

export class TransformGestureRecognizer extends GestureRecognizer<TransformGestureEvent> {
  private pointers: GesturePointerEvent[] = [];
  private focalPoint0 = V2_ZERO;
  private focalPoint = V2_ZERO;
  private span0 = 0;
  private span = 0;

  constructor(controller: GestureController, handler: (ev: TransformGestureEvent) => void) {
    super(
      controller,
      handler,
      0,
      0,
      2,
    );
  }

  handleEvent(event: GesturePointerEvent) {
    const pointerId = event.id;
    if (pointerId !== 1) { // ignore mouse events
      const state = this.state;
      const pointers = this.pointers;
      const nPointers = this.nPointers;

      if (event.action & GesturePointerAction.Down) {
        if (state & GestureRecognizerState.Active) {
          if (pointers.length < nPointers) {
            pointers.push(event);
          } else {
            this.start();
          }
        } else {
          pointers.push(event);
          this.activate();
        }
      } else {
        const idx = findPointerById(pointers, pointerId);
        if (idx !== -1) {
          if (event.action & GesturePointerAction.Move) {
            pointers[idx] = event;
            if (!(state & GestureRecognizerState.Resolved)) {
              if (
                (Math.abs(this.span - this.span0)) > 8 ||
                v2Distance(v2Sub(this.focalPoint, this.focalPoint0)) >= 8
              ) {
                this.resolve();
              }
            } else if (state & GestureRecognizerState.Started) {
              this.update();
            }
          } else {
            unorderedArrayDelete(pointers, idx);
            if ((state & GestureRecognizerState.Started) && !(event.action & GesturePointerAction.Cancel)) {
              this.end();
            } else {
              this.cancel();
            }
            if (pointers.length === 0) {
              this.deactivate();
              this.reset();
            }
          }
        }
      }
    }
  }

  protected update() {
    this.focalPoint = calcFocalPoint(this.pointers);
    this.span = avgDeviation(this.focalPoint, this.pointers);
    this.emit(TransformGestureAction.Update);
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
    this.focalPoint0 = this.focalPoint = calcFocalPoint(this.pointers);
    this.span0 = this.span = avgDeviation(this.focalPoint, this.pointers);
    this.emit(TransformGestureAction.Start);
  }

  ended() {
    this.emit(TransformGestureAction.End);
  }

  canceled() {
    this.emit(TransformGestureAction.Cancel);
  }

  private emit(action: TransformGestureAction): void {
    this.handler(new TransformGestureEvent(0, performance.now(), action, this.focalPoint, this.span0 / this.span));
  }
}
