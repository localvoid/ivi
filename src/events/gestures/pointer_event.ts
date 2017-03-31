/**
 * Gesture Pointer Events is an abstraction that provides an easy to use interface for mouse/touch/pointer events in all
 * browsers.
 */

import { SyntheticEvent } from "../synthetic_event";
import { SyntheticEventFlags } from "../flags";
import { EventSource } from "../event_source";

export const enum GesturePointerType {
    Unknown = 1,
    Mouse = 1 << 1,
    Touch = 1 << 2,
    Pen = 1 << 3,
}

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
    width: number;
    height: number;
    pressure: number;
    tiltX: number;
    tiltY: number;
    type: GesturePointerType;
    isPrimary: boolean;

    constructor(
        source: EventSource,
        flags: SyntheticEventFlags,
        target: any,
        timestamp: number,

        id: number,
        action: GesturePointerAction,
        x: number,
        y: number,
        pageX: number,
        pageY: number,
        buttons: number,
        width: number,
        height: number,
        pressure: number,
        tiltX: number,
        tiltY: number,
        type: GesturePointerType,
        isPrimary: boolean,
    ) {
        super(source, flags, target, timestamp);
        this.id = id;
        this.action = action;
        this.x = x;
        this.y = y;
        this.pageX = pageX;
        this.pageY = pageY;
        this.buttons = buttons;
        this.width = width;
        this.height = height;
        this.pressure = pressure;
        this.tiltX = tiltX;
        this.tiltY = tiltY;
        this.type = type;
        this.isPrimary = isPrimary;
    }
}
