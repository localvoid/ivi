/**
 * Event Handlers.
 *
 * Optimizing compilers should inline all this functions and completely remove unused code.
 */

import { EventHandlerFlags, NativeEventSourceFlags, EventFlags } from "./flags";
import { EventHandler } from "./event_handler";
import { EventSource } from "./event_source";
import { NativeEventSource, createNativeEventSource } from "./native_event_source";
import { SyntheticNativeEvent } from "./synthetic_event";

/* tslint:disable:max-line-length */
export const EVENT_SOURCE_ABORT = /*#__PURE__*/createNativeEventSource<UIEvent>(NativeEventSourceFlags.Capture, "abort") as NativeEventSource<UIEvent>;
export const EVENT_SOURCE_ACTIVATE = /*#__PURE__*/createNativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "activate");
export const EVENT_SOURCE_ARIA_REQUEST = /*#__PURE__*/createNativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "ariarequest");
export const EVENT_SOURCE_BEFORE_ACTIVATE = /*#__PURE__*/createNativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforeactivate");
export const EVENT_SOURCE_BEFORE_COPY = /*#__PURE__*/createNativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture, "beforecopy");
export const EVENT_SOURCE_BEFORE_CUT = /*#__PURE__*/createNativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforecut");
export const EVENT_SOURCE_BEFORE_DEACTIVATE = /*#__PURE__*/createNativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforedeactivate");
export const EVENT_SOURCE_BEFORE_PASTE = /*#__PURE__*/createNativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforepaste");
export const EVENT_SOURCE_BLUR = /*#__PURE__*/createNativeEventSource<FocusEvent>(NativeEventSourceFlags.Capture, "blur");
export const EVENT_SOURCE_CAN_PLAY = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "canplay");
export const EVENT_SOURCE_CAN_PLAYTHROUGH = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "canplaythrough");
export const EVENT_SOURCE_CHANGE = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "change");
export const EVENT_SOURCE_CLICK = /*#__PURE__*/createNativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "click");
export const EVENT_SOURCE_CONTEXT_MENU = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "contextmenu");
export const EVENT_SOURCE_COPY = /*#__PURE__*/createNativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "copy");
export const EVENT_SOURCE_CUE_CHANGE = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "cuechange");
export const EVENT_SOURCE_CUT = /*#__PURE__*/createNativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "cut");
export const EVENT_SOURCE_DOUBLE_CLICK = /*#__PURE__*/createNativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dblclick");
export const EVENT_SOURCE_DEACTIVATE = /*#__PURE__*/createNativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "deactivate");
export const EVENT_SOURCE_DRAG = /*#__PURE__*/createNativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drag");
export const EVENT_SOURCE_DRAG_END = /*#__PURE__*/createNativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragend");
export const EVENT_SOURCE_DRAG_ENTER = /*#__PURE__*/createNativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragenter");
export const EVENT_SOURCE_DRAG_LEAVE = /*#__PURE__*/createNativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragleave");
export const EVENT_SOURCE_DRAG_OVER = /*#__PURE__*/createNativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragover");
export const EVENT_SOURCE_DRAG_START = /*#__PURE__*/createNativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragstart");
export const EVENT_SOURCE_DROP = /*#__PURE__*/createNativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drop");
export const EVENT_SOURCE_DURATION_CHANGE = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "durationchange");
export const EVENT_SOURCE_EMPTIED = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "emptied");
export const EVENT_SOURCE_ENCRYPTED = /*#__PURE__*/createNativeEventSource<MediaEncryptedEvent>(NativeEventSourceFlags.Capture, "encrypted");
export const EVENT_SOURCE_ENDED = /*#__PURE__*/createNativeEventSource<MediaStreamErrorEvent>(NativeEventSourceFlags.Capture, "ended");
export const EVENT_SOURCE_ERROR = /*#__PURE__*/createNativeEventSource<ErrorEvent>(NativeEventSourceFlags.Capture, "error");
export const EVENT_SOURCE_FOCUS = /*#__PURE__*/createNativeEventSource<FocusEvent>(NativeEventSourceFlags.Capture, "focus");
export const EVENT_SOURCE_GOT_POINTER_CAPTURE = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture, "gotpointercapture");
export const EVENT_SOURCE_INPUT = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "input");
export const EVENT_SOURCE_INVALID = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "invalid");
export const EVENT_SOURCE_KEY_DOWN = /*#__PURE__*/createNativeEventSource<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keydown");
export const EVENT_SOURCE_KEY_PRESS = /*#__PURE__*/createNativeEventSource<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keypress");
export const EVENT_SOURCE_KEY_UP = /*#__PURE__*/createNativeEventSource<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keyup");
export const EVENT_SOURCE_LOAD = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "load");
export const EVENT_SOURCE_LOADED_DATA = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "loadeddata");
export const EVENT_SOURCE_LOADED_METADATA = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "loadedmetadata");
export const EVENT_SOURCE_LOAD_START = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "loadstart");
export const EVENT_SOURCE_LOST_POINTER_CAPTURE = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture, "lostpointercapture");
export const EVENT_SOURCE_MOUSE_DOWN = /*#__PURE__*/createNativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousedown");
export const EVENT_SOURCE_MOUSE_ENTER = /*#__PURE__*/createNativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture, "mouseenter");
export const EVENT_SOURCE_MOUSE_LEAVE = /*#__PURE__*/createNativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture, "mouseleave");
export const EVENT_SOURCE_MOUSE_MOVE = /*#__PURE__*/createNativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousemove");
export const EVENT_SOURCE_MOUSE_OUT = /*#__PURE__*/createNativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseout");
export const EVENT_SOURCE_MOUSE_OVER = /*#__PURE__*/createNativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseover");
export const EVENT_SOURCE_MOUSE_UP = /*#__PURE__*/createNativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseup");
export const EVENT_SOURCE_PASTE = /*#__PURE__*/createNativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "paste");
export const EVENT_SOURCE_PAUSE = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "pause");
export const EVENT_SOURCE_PLAY = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "play");
export const EVENT_SOURCE_PLAYING = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "playing");
export const EVENT_SOURCE_POINTER_CANCEL = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointercancel");
export const EVENT_SOURCE_POINTER_DOWN = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerdown");
export const EVENT_SOURCE_POINTER_ENTER = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture, "pointerenter");
export const EVENT_SOURCE_POINTER_LEAVE = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture, "pointerleave");
export const EVENT_SOURCE_POINTER_MOVE = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointermove");
export const EVENT_SOURCE_POINTER_OUT = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerout");
export const EVENT_SOURCE_POINTER_OVER = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerover");
export const EVENT_SOURCE_POINTER_UP = /*#__PURE__*/createNativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerup");
export const EVENT_SOURCE_PROGRESS = /*#__PURE__*/createNativeEventSource<ProgressEvent>(NativeEventSourceFlags.Capture, "progress");
export const EVENT_SOURCE_RATE_CHANGE = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "ratechange");
export const EVENT_SOURCE_RESET = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "reset");
export const EVENT_SOURCE_SCROLL = /*#__PURE__*/createNativeEventSource<UIEvent>(NativeEventSourceFlags.Capture, "scroll");
export const EVENT_SOURCE_SEEKED = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "seeked");
export const EVENT_SOURCE_SEEKING = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "seeking");
export const EVENT_SOURCE_SELECT = /*#__PURE__*/createNativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "select");
export const EVENT_SOURCE_SELECT_START = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "selectstart");
export const EVENT_SOURCE_STALLED = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "stalled");
export const EVENT_SOURCE_SUBMIT = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "submit");
export const EVENT_SOURCE_SUSPEND = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "suspend");
export const EVENT_SOURCE_TIME_UPDATE = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "timeupdate");
export const EVENT_SOURCE_TOUCH_CANCEL = /*#__PURE__*/createNativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchcancel");
export const EVENT_SOURCE_TOUCH_END = /*#__PURE__*/createNativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchend");
export const EVENT_SOURCE_TOUCH_MOVE = /*#__PURE__*/createNativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchmove");
export const EVENT_SOURCE_TOUCH_START = /*#__PURE__*/createNativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchstart");
export const EVENT_SOURCE_UNLOAD = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "unload");
export const EVENT_SOURCE_VOLUME_CHANGE = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "volumechange");
export const EVENT_SOURCE_WAITING = /*#__PURE__*/createNativeEventSource<Event>(NativeEventSourceFlags.Capture, "waiting");
export const EVENT_SOURCE_WHEEL = /*#__PURE__*/createNativeEventSource<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "wheel");

export const EVENT_SOURCE_ACTIVE_TOUCH_END = /*#__PURE__*/createNativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchend");
export const EVENT_SOURCE_ACTIVE_TOUCH_MOVE = /*#__PURE__*/createNativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchmove");
export const EVENT_SOURCE_ACTIVE_TOUCH_START = /*#__PURE__*/createNativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchstart");
export const EVENT_SOURCE_ACTIVE_WHEEL = /*#__PURE__*/createNativeEventSource<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "wheel");

/**
 * Helper function that creates event handlers.
 *
 * @param src - Event source
 * @param handler - Event Handler function
 * @param capture - Capture mode
 * @returns EventHandler instance
 */
export function createEventHandler<E extends SyntheticNativeEvent<any>>(
  src: EventSource,
  handler: (ev: E) => EventFlags | void,
  capture?: boolean,
): EventHandler<E> {
  return {
    src,
    flags: capture === true ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble,
    handler,
    listeners: 0,
    props: null,
    state: null,
  };
}

export function onAbort(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_SOURCE_ABORT.src, handler, capture);
}
export function onActivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_SOURCE_ACTIVATE.src, handler, capture);
}
export function onAriaRequest(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_SOURCE_ARIA_REQUEST.src, handler, capture);
}
export function onBeforeActivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_SOURCE_BEFORE_ACTIVATE.src, handler, capture);
}
export function onBeforeCopy(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_SOURCE_BEFORE_COPY.src, handler, capture);
}
export function onBeforeCut(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_SOURCE_BEFORE_CUT.src, handler, capture);
}
export function onBeforeDeactivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_SOURCE_BEFORE_DEACTIVATE.src, handler, capture);
}
export function onBeforePaste(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_SOURCE_BEFORE_PASTE.src, handler, capture);
}
export function onBlur(
  handler: (ev: SyntheticNativeEvent<FocusEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<FocusEvent>> {
  return createEventHandler<SyntheticNativeEvent<FocusEvent>>(EVENT_SOURCE_BLUR.src, handler, capture);
}
export function onCanPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_CAN_PLAY.src, handler, capture);
}
export function onCanPlaythrough(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_CAN_PLAYTHROUGH.src, handler, capture);
}
export function onChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_CHANGE.src, handler, capture);
}
export function onClick(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_SOURCE_CLICK.src, handler, capture);
}
export function onContextMenu(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_CONTEXT_MENU.src, handler, capture);
}
export function onCopy(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_SOURCE_COPY.src, handler, capture);
}
export function onCueChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_CUE_CHANGE.src, handler, capture);
}
export function onCut(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_SOURCE_CUT.src, handler, capture);
}
export function onDoubleClick(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_SOURCE_DOUBLE_CLICK.src, handler, capture);
}
export function onDeactivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_SOURCE_DEACTIVATE.src, handler, capture);
}
export function onDrag(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_SOURCE_DRAG.src, handler, capture);
}
export function onDragEnd(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_SOURCE_DRAG_END.src, handler, capture);
}
export function onDragEnter(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_SOURCE_DRAG_ENTER.src, handler, capture);
}
export function onDragLeave(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_SOURCE_DRAG_LEAVE.src, handler, capture);
}
export function onDragOver(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_SOURCE_DRAG_OVER.src, handler, capture);
}
export function onDragStart(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_SOURCE_DRAG_START.src, handler, capture);
}
export function onDrop(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_SOURCE_DROP.src, handler, capture);
}
export function onDurationChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_DURATION_CHANGE.src, handler, capture);
}
export function onEmptied(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_EMPTIED.src, handler, capture);
}
export function onEncrypted(
  handler: (ev: SyntheticNativeEvent<MediaEncryptedEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MediaEncryptedEvent>> {
  return createEventHandler<SyntheticNativeEvent<MediaEncryptedEvent>>(EVENT_SOURCE_ENCRYPTED.src, handler, capture);
}
export function onEnded(
  handler: (ev: SyntheticNativeEvent<MediaStreamErrorEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MediaStreamErrorEvent>> {
  return createEventHandler<SyntheticNativeEvent<MediaStreamErrorEvent>>(EVENT_SOURCE_ENDED.src, handler, capture);
}
export function onError(
  handler: (ev: SyntheticNativeEvent<ErrorEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ErrorEvent>> {
  return createEventHandler<SyntheticNativeEvent<ErrorEvent>>(EVENT_SOURCE_ERROR.src, handler, capture);
}
export function onFocus(
  handler: (ev: SyntheticNativeEvent<FocusEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<FocusEvent>> {
  return createEventHandler<SyntheticNativeEvent<FocusEvent>>(EVENT_SOURCE_FOCUS.src, handler, capture);
}
export function onGotPointerCapture(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_GOT_POINTER_CAPTURE.src, handler, capture);
}
export function onInput(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_INPUT.src, handler, capture);
}
export function onInvalid(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_INVALID.src, handler, capture);
}
export function onKeyDown(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<KeyboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<KeyboardEvent>>(EVENT_SOURCE_KEY_DOWN.src, handler, capture);
}
export function onKeyPress(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<KeyboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<KeyboardEvent>>(EVENT_SOURCE_KEY_PRESS.src, handler, capture);
}
export function onKeyUp(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<KeyboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<KeyboardEvent>>(EVENT_SOURCE_KEY_UP.src, handler, capture);
}
export function onLoad(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_LOAD.src, handler, capture);
}
export function onLoadedData(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_LOADED_DATA.src, handler, capture);
}
export function onLoadedMetadata(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_LOADED_METADATA.src, handler, capture);
}
export function onLoadStart(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_LOAD_START.src, handler, capture);
}
export function onLostPointerCapture(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_LOST_POINTER_CAPTURE.src, handler, capture);
}
export function onMouseDown(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_SOURCE_MOUSE_DOWN.src, handler, capture);
}
export function onMouseEnter(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_SOURCE_MOUSE_ENTER.src, handler, capture);
}
export function onMouseLeave(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_SOURCE_MOUSE_LEAVE.src, handler, capture);
}
export function onMouseMove(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_SOURCE_MOUSE_MOVE.src, handler, capture);
}
export function onMouseOut(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_SOURCE_MOUSE_OUT.src, handler, capture);
}
export function onMouseOver(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_SOURCE_MOUSE_OVER.src, handler, capture);
}
export function onMouseUp(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_SOURCE_MOUSE_UP.src, handler, capture);
}
export function onPaste(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_SOURCE_PASTE.src, handler, capture);
}
export function onPause(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_PAUSE.src, handler, capture);
}
export function onPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_PLAY.src, handler, capture);
}
export function onPlaying(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_PLAYING.src, handler, capture);
}
export function onPointerCancel(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_POINTER_CANCEL.src, handler, capture);
}
export function onPointerDown(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_POINTER_DOWN.src, handler, capture);
}
export function onPointerEnter(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_POINTER_ENTER.src, handler, capture);
}
export function onPointerLeave(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_POINTER_LEAVE.src, handler, capture);
}
export function onPointerMove(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_POINTER_MOVE.src, handler, capture);
}
export function onPointerOut(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_POINTER_OUT.src, handler, capture);
}
export function onPointerOver(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_POINTER_OVER.src, handler, capture);
}
export function onPointerUp(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_SOURCE_POINTER_UP.src, handler, capture);
}
export function onProgress(
  handler: (ev: SyntheticNativeEvent<ProgressEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ProgressEvent>> {
  return createEventHandler<SyntheticNativeEvent<ProgressEvent>>(EVENT_SOURCE_PROGRESS.src, handler, capture);
}
export function onRateChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_RATE_CHANGE.src, handler, capture);
}
export function onReset(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_RESET.src, handler, capture);
}
export function onScroll(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_SOURCE_SCROLL.src, handler, capture);
}
export function onSeeked(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_SEEKED.src, handler, capture);
}
export function onSeeking(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_SEEKING.src, handler, capture);
}
export function onSelect(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_SOURCE_SELECT.src, handler, capture);
}
export function onSelectStart(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_SELECT_START.src, handler, capture);
}
export function onStalled(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_STALLED.src, handler, capture);
}
export function onSubmit(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_SUBMIT.src, handler, capture);
}
export function onSuspend(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_SUSPEND.src, handler, capture);
}
export function onTimeUpdate(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_TIME_UPDATE.src, handler, capture);
}
export function onTouchCancel(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_SOURCE_TOUCH_CANCEL.src, handler, capture);
}
export function onTouchEnd(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_SOURCE_TOUCH_END.src, handler, capture);
}
export function onTouchMove(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_SOURCE_TOUCH_MOVE.src, handler, capture);
}
export function onTouchStart(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_SOURCE_TOUCH_START.src, handler, capture);
}
export function onUnload(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_UNLOAD.src, handler, capture);
}
export function onVolumeChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_VOLUME_CHANGE.src, handler, capture);
}
export function onWaiting(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EVENT_SOURCE_WAITING.src, handler, capture);
}
export function onWheel(
  handler: (ev: SyntheticNativeEvent<WheelEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<WheelEvent>> {
  return createEventHandler<SyntheticNativeEvent<WheelEvent>>(EVENT_SOURCE_WHEEL.src, handler, capture);
}

export function onActiveTouchEnd(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_SOURCE_ACTIVE_TOUCH_END.src, handler, capture);
}
export function onActiveTouchMove(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_SOURCE_ACTIVE_TOUCH_MOVE.src, handler, capture);
}
export function onActiveTouchStart(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_SOURCE_ACTIVE_TOUCH_START.src, handler, capture);
}
export function onActiveWheel(
  handler: (ev: SyntheticNativeEvent<WheelEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<WheelEvent>> {
  return createEventHandler<SyntheticNativeEvent<WheelEvent>>(EVENT_SOURCE_ACTIVE_WHEEL.src, handler, capture);
}

/* tslint:enable:max-line-length */
