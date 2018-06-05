import { GesturePointerEvent } from "./gesture_pointer_event";
import { GestureBehavior } from "./gesture_behavior";
import { GestureController, GestureConflictResolverAction } from "./gesture_controller";

export const enum GestureRecognizerState {
  Active = 1,
  Resolved = 1 << 1,
  Accepted = 1 << 2,
}

/**
 * Gesture Recognizer.
 *
 * Basic Lifecycle:
 *
 * Initial State
 *   PointerDown => Active
 *
 * Active
 *   Accepted => [start] Active|Resolved|Accepted
 *   Rejected => Initial State
 *   PointerUpdate => Active|Resolved
 *   PointerUp => Initial State
 *   PointerCancel => Initial State
 *   Dispose =>
 *
 * Active|Resolved
 *   Accepted => [start] Active|Resolved|Accepted
 *   Rejected => Initial State
 *   PointerUp => Initial State
 *   PointerCancel => Initial State
 *   Dispose =>
 *
 * Active|Resolved|Accepted
 *   PointerUpdate => [update]
 *   PointerUp => [end] Initial State
 *   PointerCancel => [cancel] Initial State
 *   Dispose => [cancel]
 *
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

  ended(): void {
    //
  }

  disposed(): void {
    //
  }

  abstract handleEvent(event: GesturePointerEvent): void;

  accept() {
    this.state |= GestureRecognizerState.Accepted;
    this.controller(this, GestureConflictResolverAction.Accept);
    this.accepted();
  }

  reject() {
    this.controller(this, GestureConflictResolverAction.Reject);
    this.rejected();
    this.reset();
  }

  /**
   * Dispose recognizer.
   */
  dispose() {
    if (this.state & GestureRecognizerState.Active) {
      this.cancel();
    }
    this.disposed();
  }

  protected activate() {
    if (DEBUG) {
      if (this.state & GestureRecognizerState.Active) {
        throw new Error("Unable to activate gesture recognizer, gesture recognizer is already activated");
      }
      if (this.state !== 0) {
        throw new Error("Unable to activate gesture recognizer, gesture recognizer has invalid state");
      }
    }
    this.state |= GestureRecognizerState.Active;
    this.controller(this, GestureConflictResolverAction.Activate);
    this.activated();
  }

  protected resolve() {
    if (DEBUG) {
      if (!(this.state & GestureRecognizerState.Active)) {
        throw new Error("Unable to resolve gesture recognizer, gesture recognizer should be active");
      }
      if (this.state & GestureRecognizerState.Resolved) {
        throw new Error("Unable to resolve gesture recognizer, gesture recognizer is already resolved");
      }
    }
    this.state |= GestureRecognizerState.Resolved;
    this.controller(this, GestureConflictResolverAction.Resolve);
    this.resolved();
  }

  protected cancel() {
    if (DEBUG) {
      if (!(this.state & GestureRecognizerState.Active)) {
        throw new Error("Unable to cancel gesture recognizer, gesture recognizer should be active");
      }
    }
    this.controller(this, GestureConflictResolverAction.Cancel);
    this.canceled();
    this.reset();
  }

  protected end() {
    if (DEBUG) {
      if (!(this.state & GestureRecognizerState.Active)) {
        throw new Error("Unable to end gesture recognizer, gesture recognizer should be active");
      }
      if (!(this.state & GestureRecognizerState.Resolved)) {
        throw new Error("Unable to end gesture recognizer, gesture recognizer should be resolved");
      }
    }
    this.controller(this, GestureConflictResolverAction.End);
    this.ended();
    this.reset();
  }
}
