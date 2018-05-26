import { GesturePointerEvent } from "./gesture_pointer_event";
import { GestureBehavior } from "./gesture_behavior";
import {
  GestureConflictResolutionStatus, GestureConflictResolver, GestureConflictResolverAction,
} from "./gesture_conflict_resolver";

export const enum GestureRecognizerState {
  Active = 1,
  Resolved = 1 << 1,
  Accepted = 1 << 2,
}

/**
 * Gesture Recognizer.
 */
export abstract class GestureRecognizer {
  public state: GestureRecognizerState;
  public behavior: GestureBehavior;

  private readonly resolver: GestureConflictResolver;

  constructor(resolver: GestureConflictResolver, behavior: GestureBehavior) {
    this.resolver = resolver;
    this.state = 0;
    this.behavior = behavior;
  }

  protected activate() {
    this.resolver(this, GestureConflictResolverAction.Activate);
  }

  protected resolve() {
    if (this.state & GestureRecognizerState.Active) {
      this.resolver(this, GestureConflictResolverAction.Resolve);
    }
  }

  protected cancel() {
    if (this.state & GestureRecognizerState.Active) {
      this.resolver(this, GestureConflictResolverAction.Cancel);
    }
  }

  protected finish() {
    if (this.state & GestureRecognizerState.Active) {
      this.resolver(this, GestureConflictResolverAction.Finish);
    }
    this.reset();
  }

  reset() {
    this.state = 0;
  }

  resolveConflict(behavior: GestureBehavior): GestureConflictResolutionStatus {
    return GestureConflictResolutionStatus.LastRecognizerWins;
  }

  /**
   * Invoked when recognizer is accepted.
   */
  abstract accepted(): void;

  /**
   * Invoked when recognizer is rejected.
   */
  abstract rejected(): void;

  /**
   * Gesture pointer event handler.
   */
  abstract handleEvent(event: GesturePointerEvent): void;

  /**
   * Dispose recognizer.
   */
  abstract dispose(): void;
}
