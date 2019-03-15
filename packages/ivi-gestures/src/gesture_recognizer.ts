import { GesturePointerEvent } from "./gesture_pointer_event";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController, GestureControllerAction } from "./gesture_controller";

export const enum GestureRecognizerState {
  Active = 1,
  Resolved = 1 << 1,
  Accepted = 1 << 2,
  Started = 1 << 3,
  Native = 1 << 4,

  StateFlags = Active | Resolved | Accepted | Started,
}

/**
 * Gesture Recognizer.
 */
export abstract class GestureRecognizer<T> {
  /**
   * See {@link GestureRecognizerState} for details.
   */
  public state: GestureRecognizerState;
  /**
   * Action that is required to resolve this gesture.
   */
  public resolveAction: GestureBehavior;
  /**
   * Actions that should be prevented in recognizers with lower priority.
   */
  public preventAction: GestureBehavior;
  /**
   * Number of pointers required to recognize this gesture.
   */
  public nPointers: number;
  /**
   * {@link GestureController}
   */
  private readonly controller: GestureController;
  protected readonly handler: (ev: T) => void;

  constructor(
    controller: GestureController,
    handler: (ev: T) => void,
    resolveAction: GestureBehavior,
    preventAction: GestureBehavior,
    nPointers: number,
  ) {
    this.state = 0;
    this.resolveAction = resolveAction;
    this.preventAction = preventAction;
    this.nPointers = nPointers;
    this.controller = controller;
    this.handler = handler;
  }

  reset() {
    this.state = 0;
  }

  shouldWait(): boolean {
    return false;
  }

  activated(): void {
    //
  }

  deactivated(): void {
    //
  }

  accepted(): void {
    //
  }

  rejected(): void {
    //
  }

  resolved(): void {
    //
  }

  canceled(): void {
    //
  }

  started(): void {
    //
  }

  ended(): void {
    //
  }

  disposed(): void {
    //
  }

  abstract handleEvent(event: GesturePointerEvent): void;

  accept() {
    this.state |= GestureRecognizerState.Accepted;
    this.controller(this, GestureControllerAction.Accept);
    this.accepted();
  }

  reject() {
    this.controller(this, GestureControllerAction.Deactivate);
    this.rejected();
    this.reset();
  }

  /**
   * Dispose recognizer.
   */
  dispose() {
    if (this.state & GestureRecognizerState.Started) {
      this.cancel();
    }
    if (this.state & GestureRecognizerState.Active) {
      this.deactivate();
    }
    this.disposed();
  }

  protected activate() {
    if (process.env.NODE_ENV !== "production") {
      if (this.state & GestureRecognizerState.Active) {
        throw new Error("Unable to activate gesture recognizer, gesture recognizer is already activated");
      }
      if (this.state !== 0) {
        throw new Error("Unable to activate gesture recognizer, gesture recognizer has invalid state");
      }
    }
    this.state |= GestureRecognizerState.Active;
    this.controller(this, GestureControllerAction.Activate);
    this.activated();
  }

  protected deactivate() {
    if (process.env.NODE_ENV !== "production") {
      if (!(this.state & GestureRecognizerState.Active)) {
        throw new Error("Unable to deactivate gesture recognizer, gesture recognizer should be active");
      }
    }
    this.controller(this, GestureControllerAction.Deactivate);
    this.state &= ~GestureRecognizerState.Active;
    this.deactivated();
  }

  protected resolve() {
    if (process.env.NODE_ENV !== "production") {
      if (!(this.state & GestureRecognizerState.Active)) {
        throw new Error("Unable to resolve gesture recognizer, gesture recognizer should be active");
      }
      if (this.state & GestureRecognizerState.Resolved) {
        throw new Error("Unable to resolve gesture recognizer, gesture recognizer is already resolved");
      }
    }
    this.state |= GestureRecognizerState.Resolved;
    this.controller(this, GestureControllerAction.Resolve);
    this.resolved();
  }

  protected cancel() {
    if (process.env.NODE_ENV !== "production") {
      if (!(this.state & GestureRecognizerState.Active)) {
        throw new Error("Unable to cancel gesture recognizer, gesture recognizer should be active");
      }
    }
    this.canceled();
  }

  protected start() {
    if (process.env.NODE_ENV !== "production") {
      if (!(this.state & GestureRecognizerState.Active)) {
        throw new Error("Unable to start gesture recognizer, gesture recognizer should be active");
      }
    }
    this.state |= GestureRecognizerState.Started;
    this.started();
  }

  protected end() {
    if (process.env.NODE_ENV !== "production") {
      if (!(this.state & GestureRecognizerState.Active)) {
        throw new Error("Unable to end gesture recognizer, gesture recognizer should be active");
      }
      if (!(this.state & GestureRecognizerState.Resolved)) {
        throw new Error("Unable to end gesture recognizer, gesture recognizer should be resolved");
      }
      if (!(this.state & GestureRecognizerState.Started)) {
        throw new Error("Unable to end gesture recognizer, gesture recognizer should be started");
      }
    }
    this.state &= ~GestureRecognizerState.Started;
    this.ended();
  }
}
