import { Vec2 } from "../../common/geometry";
import { SyntheticEvent } from "../synthetic_event";
import { SyntheticEventFlags } from "../flags";

export class GestureEvent extends SyntheticEvent {
    constructor(
        flags: SyntheticEventFlags,
    ) {
        super(flags, performance.now());
    }
}

export const enum GestureTapAction {
    Tap = 1,
    TapDown = 1 << 1,
    TapUp = 1 << 2,
    TapCancel = 1 << 3,
}

export class GestureTapEvent extends GestureEvent {
    readonly action: GestureTapAction;

    constructor(
        flags: SyntheticEventFlags,
        action: GestureTapAction,
    ) {
        super(flags);
        this.action = action;
    }
}

export class GestureLongPressEvent extends GestureEvent {
}

export const enum GestureScaleAction {
    ScaleStart = 1,
    ScaleUpdate = 1 << 1,
    ScaleEnd = 1 << 2,
}

export class GestureScaleEvent extends GestureEvent {
    readonly action: GestureScaleAction;
    readonly focalPointX: number;
    readonly focalPointY: number;
    readonly scale: number;
    readonly velocity: Vec2 | null;

    constructor(
        flags: SyntheticEventFlags,
        action: GestureScaleAction,
        focalPointX: number,
        focalPointY: number,
        scale: number,
        velocity: Vec2 | null,
    ) {
        super(flags);
        this.action = action;
        this.focalPointX = focalPointX;
        this.focalPointY = focalPointY;
        this.scale = scale;
        this.velocity = velocity;
    }
}

export const enum GestureDragAction {
    DragDown = 1,
    DragStart = 1 << 1,
    DragUpdate = 1 << 2,
    DragEnd = 1 << 3,
    DragCancel = 1 << 4,
}

export class GestureDragEvent extends GestureEvent {
    readonly action: GestureDragAction;
    readonly x: number;
    readonly y: number;
    readonly dx: number;
    readonly dy: number;
    readonly velocity: Vec2 | null;

    constructor(
        flags: SyntheticEventFlags,
        action: GestureDragAction,
        x: number,
        y: number,
        dx: number,
        dy: number,
        velocity: Vec2 | null,
    ) {
        super(flags);
        this.action = action;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.velocity = velocity;
    }
}
