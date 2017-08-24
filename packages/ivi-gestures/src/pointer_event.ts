import { doc } from "ivi-dom";
import { SyntheticEvent, SyntheticEventFlags } from "ivi-events";

export const enum GesturePointerAction {
  Down = 1,
  Move = 1 << 1,
  Up = 1 << 2,
  Cancel = 1 << 3,
}

export class GesturePointerEvent extends SyntheticEvent {
  id: number;
  action: GesturePointerAction;
  x: number;
  y: number;
  pageX: number;
  pageY: number;
  buttons: number;
  isPrimary: boolean;
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

  findHitTarget(): Element {
    if (this.hitTarget === null) {
      this.hitTarget = doc.elementFromPoint(this.x, this.y);
    }
    return this.hitTarget;
  }
}
