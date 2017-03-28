import { getEventCharCode, getEventKey } from "../common/dom";
import { DEV_MODE, DevModeFlags, printWarnOnce } from "../dev_mode/dev_mode";
import { SyntheticEventFlags } from "./flags";
import { EventSource } from "./event_source";

/**
 * Synthetic Event.
 */
export class SyntheticEvent<D> {
    readonly eventSource: EventSource;
    _flags: SyntheticEventFlags;
    _data: D;
    readonly target: EventTarget;
    currentTarget: EventTarget;
    timeStamp: number;
    type: any;

    constructor(
        dispatcher: EventSource,
        flags: SyntheticEventFlags,
        data: D,
        target: EventTarget,
        timeStamp: number,
        type: any,
    ) {
        this.eventSource = dispatcher;
        this._flags = flags;
        this._data = data;
        this.target = target;
        this.currentTarget = target;
        this.timeStamp = timeStamp;
        this.type = type;
    }

    get defaultPrevented(): boolean {
        return (this._flags & SyntheticEventFlags.PreventedDefault) !== 0;
    }

    get bubbles(): boolean {
        return (this._flags & SyntheticEventFlags.Bubbles) !== 0;
    }

    get cancelable(): boolean {
        return (this._flags & SyntheticEventFlags.Cancelable) !== 0;
    }

    get isTrusted(): boolean {
        return (this._flags & SyntheticEventFlags.IsTrusted) !== 0;
    }

    get eventPhase(): number {
        if ((this._flags & SyntheticEventFlags.AtTargetPhase) !== 0) {
            return 2;
        } else if ((this._flags & SyntheticEventFlags.BubblePhase) !== 0) {
            return 3;
        }
        return 1;
    }

    stopPropagation() {
        this._flags |= SyntheticEventFlags.StoppedPropagation;
    }

    stopImmediatePropagation() {
        this._flags |= SyntheticEventFlags.StoppedPropagation | SyntheticEventFlags.StoppedImmediatePropagation;
    }

    preventDefault() {
        this._flags |= SyntheticEventFlags.PreventedDefault;
    }
}

export interface SyntheticEventClass<D, E extends SyntheticEvent<any>> {
    new (
        dispatcher: EventSource,
        flags: SyntheticEventFlags,
        data: D,
        target: EventTarget,
        timeStamp: number,
        type: any,
    ): E;
}

export class SyntheticUIEvent<T extends UIEvent> extends SyntheticEvent<T> {
    get detail() {
        return this._data.detail;
    }

    get view() {
        return this._data.view;
    }
}

export class SyntheticKeyboardEvent extends SyntheticUIEvent<KeyboardEvent> {
    get altKey(): boolean {
        return this._data.altKey;
    }

    get char(): string | null {
        return this._data.char;
    }

    get charCode(): number {
        /**
         * #quirks
         */
        if (this._data.type === "keypress") {
            return getEventCharCode(this._data);
        }
        return 0;
    }

    get ctrlKey(): boolean {
        return this._data.ctrlKey;
    }

    get key(): string {
        /**
         * #quirks
         */
        return getEventKey(this._data);
    }

    get keyCode(): number {
        /**
         * #quirks
         */
        switch (this._data.type) {
            case "keydown":
            case "keyup":
                return this._data.keyCode;
        }

        return 0;
    }

    get locale(): string {
        return this._data.locale;
    }

    get location(): number {
        return this._data.location;
    }

    get metaKey(): boolean {
        return this._data.metaKey;
    }

    get repeat(): boolean {
        return this._data.repeat;
    }

    get shiftKey(): boolean {
        return this._data.shiftKey;
    }

    get which(): number {
        /**
         * #quirks
         */
        switch (this._data.type) {
            case "keypress":
                return getEventCharCode(this._data);
            case "keydown":
            case "keyup":
                return this._data.keyCode;
        }

        return 0;
    }

    get code(): string {
        /**
         * #quirks
         */
        if (__IVI_DEV__) {
            if ((DEV_MODE & DevModeFlags.DisableWarningsForUnsupportedFeatures) === 0) {
                printWarnOnce("events.KeyboardEvent.code",
                    "KeyboardEvent 'code' property doesn't work in many major browsers, and there is no easy " +
                    "way to polyfill this property on browsers that doesn't support it.");
            }
        }
        return this._data.code;
    }

    getModifierState(keyArg: string): boolean {
        return this._data.getModifierState(keyArg);
    }
}

export class SyntheticMouseEvent<T extends MouseEvent> extends SyntheticUIEvent<T> {
    get altKey(): boolean {
        return this._data.altKey;
    }

    get button(): number {
        return this._data.button;
    }

    get buttons(): number {
        /**
         * #quirks
         *
         * Doesn't work in Safari.
         */
        if (__IVI_DEV__) {
            if ((DEV_MODE & DevModeFlags.DisableWarningsForUnsupportedFeatures) === 0) {
                printWarnOnce("events.MouseEvent.buttons",
                    "MouseEvent 'buttons' property doesn't work on Safari, and there is no easy way to " +
                    "polyfill this property on browsers that doesn't support it. Almost all use cases should be " +
                    "solved with a 'button' property.");
            }
        }
        return this._data.buttons;
    }

    get clientX(): number {
        return this._data.clientX;
    }

    get clientY(): number {
        return this._data.clientY;
    }

    get ctrlKey(): boolean {
        return this._data.ctrlKey;
    }

    get fromElement(): Element {
        return this._data.fromElement;
    }

    get layerX(): number {
        return this._data.layerX;
    }

    get layerY(): number {
        return this._data.layerY;
    }

    get metaKey(): boolean {
        return this._data.metaKey;
    }

    get movementX(): number {
        return this._data.movementX;
    }

    get movementY(): number {
        return this._data.movementY;
    }

    get offsetX(): number {
        return this._data.offsetX;
    }

    get offsetY(): number {
        return this._data.offsetY;
    }

    get pageX(): number {
        return this._data.pageX;
    }

    get pageY(): number {
        return this._data.pageY;
    }

    get relatedTarget(): EventTarget {
        return this._data.relatedTarget;
    }

    get screenX(): number {
        return this._data.screenX;
    }

    get screenY(): number {
        return this._data.screenY;
    }

    get shiftKey(): boolean {
        return this._data.shiftKey;
    }

    get toElement(): Element {
        return this._data.toElement;
    }

    get which(): number {
        return this._data.which;
    }

    get x(): number {
        return this._data.x;
    }

    get y(): number {
        return this._data.y;
    }

    getModifierState(keyArg: string): boolean {
        return this._data.getModifierState(keyArg);
    }
}

export class SyntheticTouchEvent extends SyntheticUIEvent<TouchEvent> {
    get altKey(): boolean {
        return this._data.altKey;
    }

    get charCode(): number {
        return this._data.charCode;
    }

    get changedTouches(): TouchList {
        return this._data.changedTouches;
    }

    get ctrlKey(): boolean {
        return this._data.ctrlKey;
    }

    get keyCode(): number {
        return this._data.keyCode;
    }

    get metaKey(): boolean {
        return this._data.metaKey;
    }

    get shiftKey(): boolean {
        return this._data.shiftKey;
    }

    get targetTouches(): TouchList {
        return this._data.targetTouches;
    }

    get touches(): TouchList {
        return this._data.touches;
    }

    get which(): number {
        return this._data.which;
    }
}

export class SyntheticPointerEvent extends SyntheticMouseEvent<PointerEvent> {
    get currentPoint(): any {
        return this._data.currentPoint;
    }

    get height(): number {
        return this._data.height;
    }

    get hwTimestamp(): number {
        return this._data.hwTimestamp;
    }

    get intermediatePoints(): any {
        return this._data.intermediatePoints;
    }

    get isPrimary(): boolean {
        return this._data.isPrimary;
    }

    get pointerId(): number {
        return this._data.pointerId;
    }

    get pointerType(): any {
        return this._data.pointerType;
    }

    get pressure(): number {
        return this._data.pressure;
    }

    get rotation(): number {
        return this._data.rotation;
    }

    get tiltX(): number {
        return this._data.tiltX;
    }

    get tiltY(): number {
        return this._data.tiltY;
    }

    get width(): number {
        return this._data.width;
    }

    getCurrentPoint(element: Element): void {
        return this._data.getCurrentPoint(element);
    }

    getIntermediatePoints(element: Element): void {
        return this._data.getIntermediatePoints(element);
    }
}

export class SyntheticDragEvent extends SyntheticMouseEvent<DragEvent> {
    get dataTransfer(): DataTransfer {
        return this._data.dataTransfer;
    }
}

export class SyntheticWheelEvent extends SyntheticMouseEvent<WheelEvent> {
    getCurrentPoint: (element: Element) => void;

    readonly wheelDelta: number;
    readonly wheelDeltaX: number;
    readonly wheelDeltaY: number;

    get deltaMode(): number {
        return this._data.deltaMode;
    }

    get deltaX(): number {
        return this._data.deltaX;
    }

    get deltaY(): number {
        return this._data.deltaY;
    }

    get deltaZ(): number {
        return this._data.deltaZ;
    }
}

export class SyntheticFocusEvent extends SyntheticUIEvent<FocusEvent> {
    get relatedTarget(): EventTarget {
        return this._data.relatedTarget;
    }
}

export class SyntheticClipboardEvent extends SyntheticEvent<ClipboardEvent> {
    get clipboardData(): DataTransfer {
        return this._data.clipboardData;
    }
}

export class SyntheticErrorEvent extends SyntheticEvent<ErrorEvent> {
    get colno(): number {
        return this._data.colno;
    }

    get error(): any {
        return this._data.error;
    }

    get filename(): string {
        return this._data.filename;
    }

    get lineno(): number {
        return this._data.lineno;
    }

    get message(): string {
        return this._data.message;
    }
}

export class SyntheticMediaEncryptedEvent extends SyntheticEvent<MediaEncryptedEvent> {
    get initData(): ArrayBuffer | null {
        return this._data.initData;
    }

    get initDataType(): string {
        return this._data.initDataType;
    }
}

export class SyntheticMediaStreamErrorEvent extends SyntheticEvent<MediaStreamErrorEvent> {
    get error(): MediaStreamError | null {
        return this._data.error;
    }
}

export class SyntheticProgressEvent extends SyntheticEvent<ProgressEvent> {
    get lengthComputable(): boolean {
        return this._data.lengthComputable;
    }

    get loaded(): number {
        return this._data.loaded;
    }

    get total(): number {
        return this._data.total;
    }
}
