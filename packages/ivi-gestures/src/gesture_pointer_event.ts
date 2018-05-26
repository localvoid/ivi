import { SyntheticEvent, SyntheticEventFlags } from "ivi";

/**
 * Pointer actions.
 */
export const enum GesturePointerAction {
  /**
   * Pointer were pushed down.
   */
  Down = 1,
  /**
   * Pointer were moved.
   */
  Move = 1 << 1,
  /**
   * Pointer were raised up.
   */
  Up = 1 << 2,
  /**
   * Pointer were canceled.
   */
  Cancel = 1 << 3,
}

/**
 * Synthetic event for universal pointers.
 */
export class GesturePointerEvent extends SyntheticEvent {
  /**
   * Pointer ID.
   *
   * Mouse events always has an ID 1.
   *
   * Touch events always has an ID that is greater than 1.
   */
  readonly id: number;
  /**
   * Pointer action.
   *
   * See {@link GesturePointerAction} for details.
   */
  readonly action: GesturePointerAction;
  /**
   * Horizontal coordinate within the application's client area at which the event occurred (as opposed to the
   * coordinates within the page).
   */
  readonly x: number;
  /**
   * Vertical coordinate within the application's client area at which the event occurred (as opposed to the
   * coordinates within the page).
   */
  readonly y: number;
  /**
   * Horizontal coordinate of the event relative to the left edge of the entire document. This property takes into
   * account any horizontal scrolling of the page.
   */
  readonly pageX: number;
  /**
   * Vertical coordinate of the event relative to the top edge of the entire document. This property takes into account
   * any vertical scrolling of the page.
   */
  readonly pageY: number;
  /**
   * Buttons that were pressed on the mouse (or other input device) when the event is triggered.
   */
  readonly buttons: number;
  /**
   * Primary input event.
   */
  readonly isPrimary: boolean;
  /**
   * Cached value for `findHitTarget()` method.
   *
   * @internal
   */
  hitTarget: Element | null;

  constructor(
    flags: SyntheticEventFlags,
    timestamp: number,

    id: number,
    action: GesturePointerAction,
    x: number,
    y: number,
    pageX: number,
    pageY: number,
    buttons: number,
    isPrimary: boolean,
    hitTarget: Element | null,
  ) {
    super(flags, timestamp);
    this.id = id;
    this.action = action;
    this.x = x;
    this.y = y;
    this.pageX = pageX;
    this.pageY = pageY;
    this.buttons = buttons;
    this.isPrimary = isPrimary;
    this.hitTarget = hitTarget;
  }

  /**
   * Finds current hit target.
   *
   * @returns hit target
   */
  findHitTarget(): Element {
    if (this.hitTarget === null) {
      this.hitTarget = document.elementFromPoint(this.x, this.y);
    }
    return this.hitTarget;
  }

  trackVelocity(): void {
    // starts velocity tracking
  }

  getVelocity(): void {
    // gets current velocity
  }
}
