
/**
 * Event Source.
 *
 * Note for Event Extensions Developers: Event Source objects should always have exactly the same shape as described in
 * this interface. It is necessary for performance, because event source objects will be accessed quite often during
 * virtual dom synchronization.
 *
 * @final
 */
export interface EventSource {
  addListener(handler: EventHandler): void;
  removeListener(handler: EventHandler): void;
}

/**
 * Event Handler.
 *
 * Note for Event Extensions Developers: Event Handler objects should always have exactly the same shape as described in
 * this interface. It is necessary for performance, because event handler objects will be accessed quite often during
 * virtual dom synchronization.
 *
 * @final
 */
export type EventHandler<E extends SyntheticEvent = SyntheticEvent, P = any, S = any> = void | E | P | S;

/**
 * Synthetic Event.
 */
export interface SyntheticEvent {
  readonly timestamp: number;

  stopPropagation(): void;
  preventDefault(): void;
}

export interface SyntheticNativeEvent<D extends Event> extends SyntheticEvent {
  readonly target: any;
  native: D;
}

export interface SyntheticUIEvent<T extends UIEvent> extends SyntheticNativeEvent<T> {
  readonly detail: number;
  readonly view: Window;
}

export interface SyntheticKeyboardEvent extends SyntheticUIEvent<KeyboardEvent> {
  readonly altKey: boolean;
  readonly char: string | null;
  readonly charCode: number;
  readonly ctrlKey: boolean;
  readonly key: string;
  readonly keyCode: number;
  readonly locale: string;
  readonly location: number;
  readonly metaKey: boolean;
  readonly repeat: boolean;
  readonly shiftKey: boolean;
  readonly which: number;
  readonly code: string;
  getModifierState(keyArg: string): boolean;
}

export interface SyntheticMouseEvent<T extends MouseEvent> extends SyntheticUIEvent<T> {
  readonly altKey: boolean;
  readonly button: number;
  readonly buttons: number;
  readonly clientX: number;
  readonly clientY: number;
  readonly ctrlKey: boolean;
  readonly fromElement: Element;
  readonly layerX: number;
  readonly layerY: number;
  readonly metaKey: boolean;
  readonly movementX: number;
  readonly movementY: number;
  readonly offsetX: number;
  readonly offsetY: number;
  readonly pageX: number;
  readonly pageY: number;
  readonly relatedTarget: EventTarget;
  readonly screenX: number;
  readonly screenY: number;
  readonly shiftKey: boolean;
  readonly toElement: Element;
  readonly which: number;
  readonly x: number;
  readonly y: number;
  getModifierState(keyArg: string): boolean;
}

export interface SyntheticTouchEvent extends SyntheticUIEvent<TouchEvent> {
  readonly altKey: boolean;
  readonly charCode: number;
  readonly changedTouches: TouchList;
  readonly ctrlKey: boolean;
  readonly keyCode: number;
  readonly metaKey: boolean;
  readonly shiftKey: boolean;
  readonly targetTouches: TouchList;
  readonly touches: TouchList;
  readonly which: number;
}

export interface SyntheticPointerEvent extends SyntheticMouseEvent<PointerEvent> {
  readonly currentPoint: any;
  readonly height: number;
  readonly hwTimestamp: number;
  readonly intermediatePoints: any;
  readonly isPrimary: boolean;
  readonly pointerId: number;
  readonly pointerType: any;
  readonly pressure: number;
  readonly rotation: number;
  readonly tiltX: number;
  readonly tiltY: number;
  readonly width: number;
  getCurrentPoint(element: Element): void;
  getIntermediatePoints(element: Element): void;
}

export interface SyntheticDragEvent extends SyntheticMouseEvent<DragEvent> {
  readonly dataTransfer: DataTransfer;
}

export interface SyntheticWheelEvent extends SyntheticMouseEvent<WheelEvent> {
  readonly deltaMode: number;
  readonly deltaX: number;
  readonly deltaY: number;
  readonly deltaZ: number;
}

export interface SyntheticFocusEvent extends SyntheticUIEvent<FocusEvent> {
  readonly relatedTarget: EventTarget;
}

export interface SyntheticClipboardEvent extends SyntheticNativeEvent<ClipboardEvent> {
  readonly clipboardData: DataTransfer;
}

export interface SyntheticErrorEvent extends SyntheticNativeEvent<ErrorEvent> {
  readonly colno: number;
  readonly error: any;
  readonly filename: string;
  readonly lineno: number;
  readonly message: string;
}

export interface SyntheticMediaEncryptedEvent extends SyntheticNativeEvent<MediaEncryptedEvent> {
  readonly initData: ArrayBuffer | null;
  readonly initDataType: string;
}

export interface SyntheticMediaStreamErrorEvent extends SyntheticNativeEvent<MediaStreamErrorEvent> {
  readonly error: MediaStreamError | null;
}

export interface SyntheticProgressEvent extends SyntheticNativeEvent<ProgressEvent> {
  readonly lengthComputable: boolean;
  readonly loaded: number;
  readonly total: number;
}

/* tslint:disable:max-line-length no-empty */
/**
 * Helper function that creates Event Handler objects.
 *
 * @param dispatcher Dispatcher instance.
 * @param fn Event Handler function.
 * @param options Event Options. Value with a boolean type indicates that events of this type should use capture mode
 *   and it will be dispatched to the registered listener before being dispatched to any EventTarreadonly beneath it in the
 *   DOM tree.
 * @returns EventHandler object.
 */
export function createEventHandler<E extends SyntheticNativeEvent<any>>(
  source: EventSource,
  fn: (ev: E) => void,
  capture?: boolean,
): EventHandler<E> { }

export function onAbort(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> { }
export function onActivate(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> { }
export function onAriaRequest(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> { }
export function onBeforeActivate(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> { }
export function onBeforeCopy(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> { }
export function onBeforeCut(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> { }
export function onBeforeDeactivate(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> { }
export function onBeforePaste(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> { }
export function onBlur(
  handler: (ev: SyntheticFocusEvent) => void,
  capture = false,
): EventHandler<SyntheticFocusEvent> { }
export function onCanPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onCanPlaythrough(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onClick(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> { }
export function onContextMenu(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onCopy(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> { }
export function onCueChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onCut(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> { }
export function onDoubleClick(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> { }
export function onDeactivate(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> { }
export function onDrag(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> { }
export function onDragEnd(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> { }
export function onDragEnter(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> { }
export function onDragLeave(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> { }
export function onDragOver(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> { }
export function onDragStart(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> { }
export function onDrop(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> { }
export function onDurationChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onEmptied(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onEncrypted(
  handler: (ev: SyntheticMediaEncryptedEvent) => void,
  capture = false,
): EventHandler<SyntheticMediaEncryptedEvent> { }
export function onEnded(
  handler: (ev: SyntheticMediaStreamErrorEvent) => void,
  capture = false,
): EventHandler<SyntheticMediaStreamErrorEvent> { }
export function onError(
  handler: (ev: SyntheticErrorEvent) => void,
  capture = false,
): EventHandler<SyntheticErrorEvent> { }
export function onFocus(
  handler: (ev: SyntheticFocusEvent) => void,
  capture = false,
): EventHandler<SyntheticFocusEvent> { }
export function onGotPointerCapture(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onInput(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onInvalid(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onKeyDown(
  handler: (ev: SyntheticKeyboardEvent) => void,
  capture = false,
): EventHandler<SyntheticKeyboardEvent> { }
export function onKeyPress(
  handler: (ev: SyntheticKeyboardEvent) => void,
  capture = false,
): EventHandler<SyntheticKeyboardEvent> { }
export function onKeyUp(
  handler: (ev: SyntheticKeyboardEvent) => void,
  capture = false,
): EventHandler<SyntheticKeyboardEvent> { }
export function onLoad(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onLoadedData(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onLoadedMetadata(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onLoadStart(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onLostPointerCapture(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onMouseDown(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> { }
export function onMouseEnter(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> { }
export function onMouseLeave(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> { }
export function onMouseMove(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> { }
export function onMouseOut(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> { }
export function onMouseOver(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> { }
export function onMouseUp(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> { }
export function onPaste(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> { }
export function onPause(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onPlaying(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onPointerCancel(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onPointerDown(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onPointerEnter(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onPointerLeave(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onPointerMove(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onPointerOut(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onPointerOver(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onPointerUp(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> { }
export function onProgress(
  handler: (ev: SyntheticProgressEvent) => void,
  capture = false,
): EventHandler<SyntheticProgressEvent> { }
export function onRateChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onReset(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onScroll(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> { }
export function onSeeked(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onSeeking(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onSelect(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> { }
export function onSelectStart(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onStalled(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onSubmit(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onSuspend(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onTimeUpdate(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onTouchCancel(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> { }
export function onTouchEnd(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> { }
export function onTouchMove(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> { }
export function onTouchStart(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> { }
export function onUnload(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onVolumeChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onWaiting(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> { }
export function onWheel(
  handler: (ev: SyntheticWheelEvent) => void,
  capture = false,
): EventHandler<SyntheticWheelEvent> { }

export function onActiveTouchEnd(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> { }
export function onActiveTouchMove(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> { }
export function onActiveTouchStart(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> { }
export function onActiveWheel(
  handler: (ev: SyntheticWheelEvent) => void,
  capture = false,
): EventHandler<SyntheticWheelEvent> { }

/* tslint:enable:max-line-length */
