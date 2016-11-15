import { SyntheticEventFlags } from "./flags";

/**
 * Synthetic Event.
 */
export abstract class SyntheticEvent<D> {
    _flags: SyntheticEventFlags;
    _data: D;
    readonly target: EventTarget;
    currentTarget: EventTarget;
    timeStamp: number;

    constructor(flags: SyntheticEventFlags, data: D, target: EventTarget) {
        this._flags = flags;
        this._data = data;
        this.target = target;
        this.currentTarget = target;
    }

    get defaultPrevented(): boolean {
        return !!(this._flags & SyntheticEventFlags.PreventedDefault);
    }

    get bubbles(): boolean {
        return !!(this._flags & SyntheticEventFlags.Bubbles);
    }

    get cancelable(): boolean {
        return !!(this._flags & SyntheticEventFlags.Cancelable);
    }

    get isTrusted(): boolean {
        return !!(this._flags & SyntheticEventFlags.IsTrusted);
    }

    get eventPhase(): number {
        if (this._flags & SyntheticEventFlags.AtTargetPhase) {
            return 2;
        } else if (this._flags & SyntheticEventFlags.BubblePhase) {
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
    new (flags: SyntheticEventFlags, data: D, target: EventTarget): E;
}

export class SyntheticDOMEvent<D extends Event> extends SyntheticEvent<D> implements Event {
    /**
     * @deprecated
     */
    initEvent: (eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean) => void;

    /**
     * Old IE Property.
     *
     * @deprecated
     */
    cancelBubble: boolean;
    /**
     * Old IE Property.
     *
     * @deprecated
     */
    returnValue: boolean;
    /**
     * Old IE Property.
     *
     * @deprecated
     */
    readonly srcElement: Element | null;

    get timeStamp() {
        return this._data.timeStamp;
    }

    get type() {
        return this._data.type;
    }

    get AT_TARGET(): number {
        return this._data.AT_TARGET;
    }

    get BUBBLING_PHASE(): number {
        return this._data.BUBBLING_PHASE;
    }

    get CAPTURING_PHASE(): number {
        return this._data.CAPTURING_PHASE;
    }

    preventDefault() {
        this._flags |= SyntheticEventFlags.PreventedDefault;
        this._data.preventDefault();
    }
}

export class SyntheticUIEvent<T extends UIEvent> extends SyntheticDOMEvent<T> implements UIEvent {
    /**
     * @deprecated
     */
    initUIEvent: (
        typeArg: string,
        canBubbleArg: boolean,
        cancelableArg: boolean,
        viewArg: Window,
        detailArg: number,
    ) => void;

    get detail() {
        return this._data.detail;
    }

    get view() {
        return this._data.view;
    }
}

export class SyntheticKeyboardEvent extends SyntheticUIEvent<KeyboardEvent> implements KeyboardEvent {
    /**
     * @deprecated
     */
    initKeyboardEvent: (
        typeArg: string,
        canBubbleArg: boolean,
        cancelableArg: boolean,
        viewArg: Window,
        keyArg: string,
        locationArg: number,
        modifiersListArg: string,
        repeat: boolean,
        locale: string,
    ) => void;

    get altKey(): boolean {
        return this._data.altKey;
    }

    get char(): string | null {
        return this._data.char;
    }

    get charCode(): number {
        return this._data.charCode;
    }

    get ctrlKey(): boolean {
        return this._data.ctrlKey;
    }

    get key(): string {
        return this._data.key;
    }

    get keyCode(): number {
        return this._data.keyCode;
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
        return this._data.which;
    }

    get code(): string {
        return this._data.code;
    }

    get DOM_KEY_LOCATION_JOYSTICK(): number {
        return this._data.DOM_KEY_LOCATION_JOYSTICK;
    }

    get DOM_KEY_LOCATION_LEFT(): number {
        return this._data.DOM_KEY_LOCATION_LEFT;
    }

    get DOM_KEY_LOCATION_MOBILE(): number {
        return this._data.DOM_KEY_LOCATION_MOBILE;
    }

    get DOM_KEY_LOCATION_NUMPAD(): number {
        return this._data.DOM_KEY_LOCATION_NUMPAD;
    }

    get DOM_KEY_LOCATION_RIGHT(): number {
        return this._data.DOM_KEY_LOCATION_RIGHT;
    }

    get DOM_KEY_LOCATION_STANDARD(): number {
        return this._data.DOM_KEY_LOCATION_STANDARD;
    }

    getModifierState(keyArg: string): boolean {
        return this._data.getModifierState(keyArg);
    }
}

export class SyntheticMouseEvent<T extends MouseEvent> extends SyntheticUIEvent<T> implements MouseEvent {
    /**
     * @deprecated
     */
    initMouseEvent: (
        typeArg: string,
        canBubbleArg: boolean,
        cancelableArg: boolean,
        viewArg: Window,
        detailArg: number,
        screenXArg: number,
        screenYArg: number,
        clientXArg: number,
        clientYArg: number,
        ctrlKeyArg: boolean,
        altKeyArg: boolean,
        shiftKeyArg: boolean,
        metaKeyArg: boolean,
        buttonArg: number,
        relatedTargetArg: EventTarget | null,
    ) => void;

    get altKey(): boolean {
        return this._data.altKey;
    }

    get button(): number {
        return this._data.button;
    }

    get buttons(): number {
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

export class SyntheticTouchEvent extends SyntheticUIEvent<TouchEvent> implements TouchEvent {
    get altKey(): boolean {
        return this._data.altKey;
    }

    get changedTouches(): TouchList {
        return this._data.changedTouches;
    }

    get ctrlKey(): boolean {
        return this._data.ctrlKey;
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
}

export class SyntheticPointerEvent extends SyntheticMouseEvent<PointerEvent> implements PointerEvent {
    /**
     * @deprecated
     */
    initPointerEvent: (
        typeArg: string,
        canBubbleArg: boolean,
        cancelableArg: boolean,
        viewArg: Window,
        detailArg: number,
        screenXArg: number,
        screenYArg: number,
        clientXArg: number,
        clientYArg: number,
        ctrlKeyArg: boolean,
        altKeyArg: boolean,
        shiftKeyArg: boolean,
        metaKeyArg: boolean,
        buttonArg: number,
        relatedTargetArg: EventTarget,
        offsetXArg: number,
        offsetYArg: number,
        widthArg: number,
        heightArg: number,
        pressure: number,
        rotation: number,
        tiltX: number,
        tiltY: number,
        pointerIdArg: number,
        pointerType: any,
        hwTimestampArg: number,
        isPrimary: boolean,
    ) => void;

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

export class SyntheticDragEvent extends SyntheticMouseEvent<DragEvent> implements DragEvent {
    /**
     * @deprecated
     */
    initDragEvent: (
        typeArg: string,
        canBubbleArg: boolean,
        cancelableArg: boolean,
        viewArg: Window,
        detailArg: number,
        screenXArg: number,
        screenYArg: number,
        clientXArg: number,
        clientYArg: number,
        ctrlKeyArg: boolean,
        altKeyArg: boolean,
        shiftKeyArg: boolean,
        metaKeyArg: boolean,
        buttonArg: number,
        relatedTargetArg: EventTarget,
        dataTransferArg: DataTransfer,
    ) => void;

    msConvertURL: (
        file: File,
        targetType: string,
        targetURL?: string,
    ) => void;

    get dataTransfer(): DataTransfer {
        return this._data.dataTransfer;
    }
}

export class SyntheticWheelEvent extends SyntheticMouseEvent<WheelEvent> implements WheelEvent {
    /**
     * @deprecated
     */
    initWheelEvent: (
        typeArg: string,
        canBubbleArg: boolean,
        cancelableArg: boolean,
        viewArg: Window, detailArg:
            number, screenXArg: number,
        screenYArg: number,
        clientXArg: number,
        clientYArg: number,
        buttonArg: number,
        relatedTargetArg: EventTarget,
        modifiersListArg: string,
        deltaXArg: number,
        deltaYArg: number,
        deltaZArg: number,
        deltaMode: number,
    ) => void;

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

    get DOM_DELTA_LINE(): number {
        return this._data.DOM_DELTA_LINE;
    }
    get DOM_DELTA_PAGE(): number {
        return this._data.DOM_DELTA_PAGE;
    }
    get DOM_DELTA_PIXEL(): number {
        return this._data.DOM_DELTA_PIXEL;
    }
}

export class SyntheticFocusEvent extends SyntheticUIEvent<FocusEvent> implements FocusEvent {
    /**
     * @deprecated
     */
    initFocusEvent: (
        typeArg: string,
        canBubbleArg: boolean,
        cancelableArg: boolean,
        viewArg: Window,
        detailArg: number,
        relatedTargetArg: EventTarget,
    ) => void;

    get relatedTarget(): EventTarget {
        return this._data.relatedTarget;
    }
}

export class SyntheticAriaRequestEvent extends SyntheticDOMEvent<AriaRequestEvent> implements AriaRequestEvent {
    get attributeName(): string {
        return this._data.attributeName;
    }

    get attributeValue(): string | null {
        return this._data.attributeValue;
    }
    set attributeValue(value: string | null) {
        this._data.attributeValue = value;
    }
}

export class SyntheticClipboardEvent extends SyntheticDOMEvent<ClipboardEvent> implements ClipboardEvent {
    get clipboardData(): DataTransfer {
        return this._data.clipboardData;
    }
}

export class SyntheticErrorEvent extends SyntheticDOMEvent<ErrorEvent> implements ErrorEvent {
    /**
     * @deprecated
     */
    initErrorEvent: (
        typeArg: string,
        canBubbleArg: boolean,
        cancelableArg: boolean,
        messageArg: string,
        filenameArg: string,
        linenoArg: number,
    ) => void;

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

export class SyntheticMediaEncryptedEvent extends SyntheticDOMEvent<MediaEncryptedEvent>
    implements MediaEncryptedEvent {

    get initData(): ArrayBuffer | null {
        return this._data.initData;
    }

    get initDataType(): string {
        return this._data.initDataType;
    }
}

export class SyntheticMediaStreamErrorEvent extends SyntheticDOMEvent<MediaStreamErrorEvent>
    implements MediaStreamErrorEvent {

    get error(): MediaStreamError | null {
        return this._data.error;
    }
}

export class SyntheticProgressEvent extends SyntheticDOMEvent<ProgressEvent> implements ProgressEvent {
    /**
     * @deprecated
     */
    initProgressEvent: (
        typeArg: string,
        canBubbleArg: boolean,
        cancelableArg: boolean,
        lengthComputableArg: boolean,
        loadedArg: number,
        totalArg: number,
    ) => void;

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
