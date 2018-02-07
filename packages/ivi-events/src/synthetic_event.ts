import { getEventCharCode, getEventKey, getMouseButtons } from "ivi-dom";
import { SyntheticEventFlags } from "./flags";

/**
 * SyntheticEvent is a base class for all synthetic events.
 */
export class SyntheticEvent {
  /**
   * See `SyntheticEventFlags` for details.
   */
  flags: SyntheticEventFlags;
  /**
   * Timestamp when event was created.
   */
  readonly timestamp: number;

  constructor(
    flags: SyntheticEventFlags,
    timestamp: number,
  ) {
    this.flags = flags;
    this.timestamp = timestamp;
  }

  /**
   * Stops event propagation.
   */
  stopPropagation() {
    this.flags |= SyntheticEventFlags.StoppedPropagation;
  }

  /**
   * Prevents default behaviour for an event.
   */
  preventDefault() {
    this.flags |= SyntheticEventFlags.PreventedDefault;
  }
}

export class SyntheticNativeEvent<D extends Event> extends SyntheticEvent {
  readonly target: any;
  native: D;

  constructor(
    flags: SyntheticEventFlags,
    target: EventTarget,
    timestamp: number,
    native: D,
  ) {
    super(flags, timestamp);
    this.target = target;
    this.native = native;
  }
}

export interface SyntheticNativeEventClass<D, E extends SyntheticNativeEvent<any>> {
  new(
    flags: SyntheticEventFlags,
    target: EventTarget,
    timestamp: number,
    native: D,
  ): E;
}

export class SyntheticUIEvent<T extends UIEvent> extends SyntheticNativeEvent<T> {
  get detail() {
    return this.native.detail;
  }

  get view() {
    return this.native.view;
  }
}

export class SyntheticKeyboardEvent extends SyntheticUIEvent<KeyboardEvent> {
  get altKey(): boolean {
    return this.native.altKey;
  }

  get char(): string | null {
    return this.native.char;
  }

  get charCode(): number {
    /**
     * #quirks
     */
    if (this.native.type === "keypress") {
      return getEventCharCode(this.native);
    }
    return 0;
  }

  get ctrlKey(): boolean {
    return this.native.ctrlKey;
  }

  get key(): string {
    /**
     * #quirks
     */
    return getEventKey(this.native);
  }

  get keyCode(): number {
    /**
     * #quirks
     */
    switch (this.native.type) {
      case "keydown":
      case "keyup":
        return this.native.keyCode;
    }

    return 0;
  }

  get locale(): string {
    return this.native.locale;
  }

  get location(): number {
    return this.native.location;
  }

  get metaKey(): boolean {
    return this.native.metaKey;
  }

  get repeat(): boolean {
    return this.native.repeat;
  }

  get shiftKey(): boolean {
    return this.native.shiftKey;
  }

  get which(): number {
    /**
     * #quirks
     */
    switch (this.native.type) {
      case "keypress":
        return getEventCharCode(this.native);
      case "keydown":
      case "keyup":
        return this.native.keyCode;
    }

    return 0;
  }

  get code(): string {
    return this.native.code;
  }

  getModifierState(keyArg: string): boolean {
    return this.native.getModifierState(keyArg);
  }
}

export class SyntheticMouseEvent<T extends MouseEvent> extends SyntheticUIEvent<T> {
  get altKey(): boolean {
    return this.native.altKey;
  }

  get button(): number {
    return this.native.button;
  }

  get buttons(): number {
    /**
     * #quirks
     *
     * Doesn't work in Safari.
     */
    return getMouseButtons(this.native);
  }

  get clientX(): number {
    return this.native.clientX;
  }

  get clientY(): number {
    return this.native.clientY;
  }

  get ctrlKey(): boolean {
    return this.native.ctrlKey;
  }

  get fromElement(): Element {
    return this.native.fromElement;
  }

  get layerX(): number {
    return this.native.layerX;
  }

  get layerY(): number {
    return this.native.layerY;
  }

  get metaKey(): boolean {
    return this.native.metaKey;
  }

  get movementX(): number {
    return this.native.movementX;
  }

  get movementY(): number {
    return this.native.movementY;
  }

  get offsetX(): number {
    return this.native.offsetX;
  }

  get offsetY(): number {
    return this.native.offsetY;
  }

  get pageX(): number {
    return this.native.pageX;
  }

  get pageY(): number {
    return this.native.pageY;
  }

  get relatedTarget(): EventTarget {
    return this.native.relatedTarget;
  }

  get screenX(): number {
    return this.native.screenX;
  }

  get screenY(): number {
    return this.native.screenY;
  }

  get shiftKey(): boolean {
    return this.native.shiftKey;
  }

  get toElement(): Element {
    return this.native.toElement;
  }

  get which(): number {
    return this.native.which;
  }

  get x(): number {
    return this.native.x;
  }

  get y(): number {
    return this.native.y;
  }

  getModifierState(keyArg: string): boolean {
    return this.native.getModifierState(keyArg);
  }
}

export class SyntheticTouchEvent extends SyntheticUIEvent<TouchEvent> {
  get altKey(): boolean {
    return this.native.altKey;
  }

  get charCode(): number {
    return this.native.charCode;
  }

  get changedTouches(): TouchList {
    return this.native.changedTouches;
  }

  get ctrlKey(): boolean {
    return this.native.ctrlKey;
  }

  get keyCode(): number {
    return this.native.keyCode;
  }

  get metaKey(): boolean {
    return this.native.metaKey;
  }

  get shiftKey(): boolean {
    return this.native.shiftKey;
  }

  get targetTouches(): TouchList {
    return this.native.targetTouches;
  }

  get touches(): TouchList {
    return this.native.touches;
  }

  get which(): number {
    return this.native.which;
  }
}

export class SyntheticPointerEvent extends SyntheticMouseEvent<PointerEvent> {
  get currentPoint(): any {
    return this.native.currentPoint;
  }

  get height(): number {
    return this.native.height;
  }

  get hwTimestamp(): number {
    return this.native.hwTimestamp;
  }

  get intermediatePoints(): any {
    return this.native.intermediatePoints;
  }

  get isPrimary(): boolean {
    return this.native.isPrimary;
  }

  get pointerId(): number {
    return this.native.pointerId;
  }

  get pointerType(): any {
    return this.native.pointerType;
  }

  get pressure(): number {
    return this.native.pressure;
  }

  get rotation(): number {
    return this.native.rotation;
  }

  get tiltX(): number {
    return this.native.tiltX;
  }

  get tiltY(): number {
    return this.native.tiltY;
  }

  get width(): number {
    return this.native.width;
  }

  getCurrentPoint(element: Element): void {
    return this.native.getCurrentPoint(element);
  }

  getIntermediatePoints(element: Element): void {
    return this.native.getIntermediatePoints(element);
  }
}

export class SyntheticDragEvent extends SyntheticMouseEvent<DragEvent> {
  get dataTransfer(): DataTransfer {
    return this.native.dataTransfer;
  }
}

export class SyntheticWheelEvent extends SyntheticMouseEvent<WheelEvent> {
  get deltaMode(): number {
    return this.native.deltaMode;
  }

  get deltaX(): number {
    return this.native.deltaX;
  }

  get deltaY(): number {
    return this.native.deltaY;
  }

  get deltaZ(): number {
    return this.native.deltaZ;
  }
}

export class SyntheticFocusEvent extends SyntheticUIEvent<FocusEvent> {
  get relatedTarget(): EventTarget {
    return this.native.relatedTarget;
  }
}

export class SyntheticClipboardEvent extends SyntheticNativeEvent<ClipboardEvent> {
  get clipboardData(): DataTransfer {
    return this.native.clipboardData;
  }
}

export class SyntheticErrorEvent extends SyntheticNativeEvent<ErrorEvent> {
  get colno(): number {
    return this.native.colno;
  }

  get error(): any {
    return this.native.error;
  }

  get filename(): string {
    return this.native.filename;
  }

  get lineno(): number {
    return this.native.lineno;
  }

  get message(): string {
    return this.native.message;
  }
}

export class SyntheticMediaEncryptedEvent extends SyntheticNativeEvent<MediaEncryptedEvent> {
  get initData(): ArrayBuffer | null {
    return this.native.initData;
  }

  get initDataType(): string {
    return this.native.initDataType;
  }
}

export class SyntheticMediaStreamErrorEvent extends SyntheticNativeEvent<MediaStreamErrorEvent> {
  get error(): MediaStreamError | null {
    return this.native.error;
  }
}

export class SyntheticProgressEvent extends SyntheticNativeEvent<ProgressEvent> {
  get lengthComputable(): boolean {
    return this.native.lengthComputable;
  }

  get loaded(): number {
    return this.native.loaded;
  }

  get total(): number {
    return this.native.total;
  }
}
