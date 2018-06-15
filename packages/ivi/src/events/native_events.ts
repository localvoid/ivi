/**
 * Event Handlers.
 *
 * Optimizing compilers should inline all this functions and completely remove unused code.
 */

import { EventHandlerFlags, EventFlags, NativeEventSourceFlags } from "./flags";
import { EventHandler } from "./event_handler";
import { EventDispatcher } from "./event_dispatcher";
import { NativeEventDispatcher, createNativeEventDispatcher } from "./native_event_dispatcher";
import { SyntheticNativeEvent } from "./synthetic_native_event";
import { EVENT_CAPTURE_ACTIVE_OPTIONS } from "./utils";

/* tslint:disable:max-line-length */
export const EVENT_DISPATCHER_ABORT = /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture, "abort") as NativeEventDispatcher<UIEvent>;
export const EVENT_DISPATCHER_ACTIVATE = /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "activate");
export const EVENT_DISPATCHER_ARIA_REQUEST = /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "ariarequest");
export const EVENT_DISPATCHER_BEFORE_ACTIVATE = /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforeactivate");
export const EVENT_DISPATCHER_BEFORE_COPY = /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture, "beforecopy");
export const EVENT_DISPATCHER_BEFORE_CUT = /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforecut");
export const EVENT_DISPATCHER_BEFORE_DEACTIVATE = /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforedeactivate");
export const EVENT_DISPATCHER_BEFORE_PASTE = /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforepaste");
export const EVENT_DISPATCHER_BLUR = /*#__PURE__*/createNativeEventDispatcher<FocusEvent>(NativeEventSourceFlags.Capture, "blur");
export const EVENT_DISPATCHER_CAN_PLAY = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "canplay");
export const EVENT_DISPATCHER_CAN_PLAYTHROUGH = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "canplaythrough");
export const EVENT_DISPATCHER_CHANGE = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "change");
export const EVENT_DISPATCHER_CLICK = /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "click");
export const EVENT_DISPATCHER_CONTEXT_MENU = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "contextmenu");
export const EVENT_DISPATCHER_COPY = /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "copy");
export const EVENT_DISPATCHER_CUE_CHANGE = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "cuechange");
export const EVENT_DISPATCHER_CUT = /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "cut");
export const EVENT_DISPATCHER_DOUBLE_CLICK = /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dblclick");
export const EVENT_DISPATCHER_DEACTIVATE = /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "deactivate");
export const EVENT_DISPATCHER_DRAG = /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drag");
export const EVENT_DISPATCHER_DRAG_END = /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragend");
export const EVENT_DISPATCHER_DRAG_ENTER = /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragenter");
export const EVENT_DISPATCHER_DRAG_LEAVE = /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragleave");
export const EVENT_DISPATCHER_DRAG_OVER = /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragover");
export const EVENT_DISPATCHER_DRAG_START = /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragstart");
export const EVENT_DISPATCHER_DROP = /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drop");
export const EVENT_DISPATCHER_DURATION_CHANGE = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "durationchange");
export const EVENT_DISPATCHER_EMPTIED = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "emptied");
export const EVENT_DISPATCHER_ENCRYPTED = /*#__PURE__*/createNativeEventDispatcher<MediaEncryptedEvent>(NativeEventSourceFlags.Capture, "encrypted");
export const EVENT_DISPATCHER_ENDED = /*#__PURE__*/createNativeEventDispatcher<MediaStreamErrorEvent>(NativeEventSourceFlags.Capture, "ended");
export const EVENT_DISPATCHER_ERROR = /*#__PURE__*/createNativeEventDispatcher<ErrorEvent>(NativeEventSourceFlags.Capture, "error");
export const EVENT_DISPATCHER_FOCUS = /*#__PURE__*/createNativeEventDispatcher<FocusEvent>(NativeEventSourceFlags.Capture, "focus");
export const EVENT_DISPATCHER_GOT_POINTER_CAPTURE = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture, "gotpointercapture");
export const EVENT_DISPATCHER_INPUT = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "input");
export const EVENT_DISPATCHER_INVALID = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "invalid");
export const EVENT_DISPATCHER_KEY_DOWN = /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keydown");
export const EVENT_DISPATCHER_KEY_PRESS = /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keypress");
export const EVENT_DISPATCHER_KEY_UP = /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keyup");
export const EVENT_DISPATCHER_LOAD = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "load");
export const EVENT_DISPATCHER_LOADED_DATA = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "loadeddata");
export const EVENT_DISPATCHER_LOADED_METADATA = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "loadedmetadata");
export const EVENT_DISPATCHER_LOAD_START = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "loadstart");
export const EVENT_DISPATCHER_LOST_POINTER_CAPTURE = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture, "lostpointercapture");
export const EVENT_DISPATCHER_MOUSE_DOWN = /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousedown");
export const EVENT_DISPATCHER_MOUSE_ENTER = /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture, "mouseenter");
export const EVENT_DISPATCHER_MOUSE_LEAVE = /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture, "mouseleave");
export const EVENT_DISPATCHER_MOUSE_MOVE = /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousemove");
export const EVENT_DISPATCHER_MOUSE_OUT = /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseout");
export const EVENT_DISPATCHER_MOUSE_OVER = /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseover");
export const EVENT_DISPATCHER_MOUSE_UP = /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseup");
export const EVENT_DISPATCHER_PASTE = /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "paste");
export const EVENT_DISPATCHER_PAUSE = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "pause");
export const EVENT_DISPATCHER_PLAY = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "play");
export const EVENT_DISPATCHER_PLAYING = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "playing");
export const EVENT_DISPATCHER_POINTER_CANCEL = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointercancel");
export const EVENT_DISPATCHER_POINTER_DOWN = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerdown");
export const EVENT_DISPATCHER_POINTER_ENTER = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture, "pointerenter");
export const EVENT_DISPATCHER_POINTER_LEAVE = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture, "pointerleave");
export const EVENT_DISPATCHER_POINTER_MOVE = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointermove");
export const EVENT_DISPATCHER_POINTER_OUT = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerout");
export const EVENT_DISPATCHER_POINTER_OVER = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerover");
export const EVENT_DISPATCHER_POINTER_UP = /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerup");
export const EVENT_DISPATCHER_PROGRESS = /*#__PURE__*/createNativeEventDispatcher<ProgressEvent>(NativeEventSourceFlags.Capture, "progress");
export const EVENT_DISPATCHER_RATE_CHANGE = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "ratechange");
export const EVENT_DISPATCHER_RESET = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "reset");
export const EVENT_DISPATCHER_SCROLL = /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture, "scroll");
export const EVENT_DISPATCHER_SEEKED = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "seeked");
export const EVENT_DISPATCHER_SEEKING = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "seeking");
export const EVENT_DISPATCHER_SELECT = /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "select");
export const EVENT_DISPATCHER_SELECT_START = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "selectstart");
export const EVENT_DISPATCHER_STALLED = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "stalled");
export const EVENT_DISPATCHER_SUBMIT = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "submit");
export const EVENT_DISPATCHER_SUSPEND = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "suspend");
export const EVENT_DISPATCHER_TIME_UPDATE = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "timeupdate");
export const EVENT_DISPATCHER_TOUCH_CANCEL = /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchcancel");
export const EVENT_DISPATCHER_TOUCH_END = /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchend");
export const EVENT_DISPATCHER_TOUCH_MOVE = /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchmove");
export const EVENT_DISPATCHER_TOUCH_START = /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchstart");
export const EVENT_DISPATCHER_UNLOAD = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "unload");
export const EVENT_DISPATCHER_VOLUME_CHANGE = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "volumechange");
export const EVENT_DISPATCHER_WAITING = /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "waiting");
export const EVENT_DISPATCHER_WHEEL = /*#__PURE__*/createNativeEventDispatcher<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "wheel");

export const EVENT_DISPATCHER_ACTIVE_TOUCH_END = /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchend", EVENT_CAPTURE_ACTIVE_OPTIONS);
export const EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE = /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchmove", EVENT_CAPTURE_ACTIVE_OPTIONS);
export const EVENT_DISPATCHER_ACTIVE_TOUCH_START = /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchstart", EVENT_CAPTURE_ACTIVE_OPTIONS);
export const EVENT_DISPATCHER_ACTIVE_WHEEL = /*#__PURE__*/createNativeEventDispatcher<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "wheel", EVENT_CAPTURE_ACTIVE_OPTIONS);

/**
 * Helper function that creates event handlers.
 *
 * @param src - Event source
 * @param handler - Event Handler function
 * @param capture - Capture mode
 * @returns EventHandler instance
 */
export function createNativeEventHandler<E extends SyntheticNativeEvent<any>>(
  src: EventDispatcher,
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
  return createNativeEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_DISPATCHER_ABORT.src, handler, capture);
}
export function onActivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_DISPATCHER_ACTIVATE.src, handler, capture);
}
export function onAriaRequest(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_DISPATCHER_ARIA_REQUEST.src, handler, capture);
}
export function onBeforeActivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_DISPATCHER_BEFORE_ACTIVATE.src, handler, capture);
}
export function onBeforeCopy(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_DISPATCHER_BEFORE_COPY.src, handler, capture);
}
export function onBeforeCut(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_DISPATCHER_BEFORE_CUT.src, handler, capture);
}
export function onBeforeDeactivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_DISPATCHER_BEFORE_DEACTIVATE.src, handler, capture);
}
export function onBeforePaste(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_DISPATCHER_BEFORE_PASTE.src, handler, capture);
}
export function onBlur(
  handler: (ev: SyntheticNativeEvent<FocusEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<FocusEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<FocusEvent>>(EVENT_DISPATCHER_BLUR.src, handler, capture);
}
export function onCanPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_CAN_PLAY.src, handler, capture);
}
export function onCanPlaythrough(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_CAN_PLAYTHROUGH.src, handler, capture);
}
export function onChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_CHANGE.src, handler, capture);
}
export function onClick(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_DISPATCHER_CLICK.src, handler, capture);
}
export function onContextMenu(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_CONTEXT_MENU.src, handler, capture);
}
export function onCopy(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_DISPATCHER_COPY.src, handler, capture);
}
export function onCueChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_CUE_CHANGE.src, handler, capture);
}
export function onCut(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_DISPATCHER_CUT.src, handler, capture);
}
export function onDoubleClick(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_DISPATCHER_DOUBLE_CLICK.src, handler, capture);
}
export function onDeactivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_DISPATCHER_DEACTIVATE.src, handler, capture);
}
export function onDrag(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_DISPATCHER_DRAG.src, handler, capture);
}
export function onDragEnd(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_DISPATCHER_DRAG_END.src, handler, capture);
}
export function onDragEnter(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_DISPATCHER_DRAG_ENTER.src, handler, capture);
}
export function onDragLeave(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_DISPATCHER_DRAG_LEAVE.src, handler, capture);
}
export function onDragOver(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_DISPATCHER_DRAG_OVER.src, handler, capture);
}
export function onDragStart(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_DISPATCHER_DRAG_START.src, handler, capture);
}
export function onDrop(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<DragEvent>>(EVENT_DISPATCHER_DROP.src, handler, capture);
}
export function onDurationChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_DURATION_CHANGE.src, handler, capture);
}
export function onEmptied(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_EMPTIED.src, handler, capture);
}
export function onEncrypted(
  handler: (ev: SyntheticNativeEvent<MediaEncryptedEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MediaEncryptedEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MediaEncryptedEvent>>(EVENT_DISPATCHER_ENCRYPTED.src, handler, capture);
}
export function onEnded(
  handler: (ev: SyntheticNativeEvent<MediaStreamErrorEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MediaStreamErrorEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MediaStreamErrorEvent>>(EVENT_DISPATCHER_ENDED.src, handler, capture);
}
export function onError(
  handler: (ev: SyntheticNativeEvent<ErrorEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ErrorEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<ErrorEvent>>(EVENT_DISPATCHER_ERROR.src, handler, capture);
}
export function onFocus(
  handler: (ev: SyntheticNativeEvent<FocusEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<FocusEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<FocusEvent>>(EVENT_DISPATCHER_FOCUS.src, handler, capture);
}
export function onGotPointerCapture(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_GOT_POINTER_CAPTURE.src, handler, capture);
}
export function onInput(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_INPUT.src, handler, capture);
}
export function onInvalid(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_INVALID.src, handler, capture);
}
export function onKeyDown(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<KeyboardEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<KeyboardEvent>>(EVENT_DISPATCHER_KEY_DOWN.src, handler, capture);
}
export function onKeyPress(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<KeyboardEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<KeyboardEvent>>(EVENT_DISPATCHER_KEY_PRESS.src, handler, capture);
}
export function onKeyUp(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<KeyboardEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<KeyboardEvent>>(EVENT_DISPATCHER_KEY_UP.src, handler, capture);
}
export function onLoad(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_LOAD.src, handler, capture);
}
export function onLoadedData(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_LOADED_DATA.src, handler, capture);
}
export function onLoadedMetadata(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_LOADED_METADATA.src, handler, capture);
}
export function onLoadStart(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_LOAD_START.src, handler, capture);
}
export function onLostPointerCapture(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_LOST_POINTER_CAPTURE.src, handler, capture);
}
export function onMouseDown(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_DISPATCHER_MOUSE_DOWN.src, handler, capture);
}
export function onMouseEnter(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_DISPATCHER_MOUSE_ENTER.src, handler, capture);
}
export function onMouseLeave(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_DISPATCHER_MOUSE_LEAVE.src, handler, capture);
}
export function onMouseMove(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_DISPATCHER_MOUSE_MOVE.src, handler, capture);
}
export function onMouseOut(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_DISPATCHER_MOUSE_OUT.src, handler, capture);
}
export function onMouseOver(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_DISPATCHER_MOUSE_OVER.src, handler, capture);
}
export function onMouseUp(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<MouseEvent>>(EVENT_DISPATCHER_MOUSE_UP.src, handler, capture);
}
export function onPaste(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EVENT_DISPATCHER_PASTE.src, handler, capture);
}
export function onPause(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_PAUSE.src, handler, capture);
}
export function onPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_PLAY.src, handler, capture);
}
export function onPlaying(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_PLAYING.src, handler, capture);
}
export function onPointerCancel(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_POINTER_CANCEL.src, handler, capture);
}
export function onPointerDown(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_POINTER_DOWN.src, handler, capture);
}
export function onPointerEnter(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_POINTER_ENTER.src, handler, capture);
}
export function onPointerLeave(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_POINTER_LEAVE.src, handler, capture);
}
export function onPointerMove(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_POINTER_MOVE.src, handler, capture);
}
export function onPointerOut(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_POINTER_OUT.src, handler, capture);
}
export function onPointerOver(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_POINTER_OVER.src, handler, capture);
}
export function onPointerUp(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<PointerEvent>>(EVENT_DISPATCHER_POINTER_UP.src, handler, capture);
}
export function onProgress(
  handler: (ev: SyntheticNativeEvent<ProgressEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ProgressEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<ProgressEvent>>(EVENT_DISPATCHER_PROGRESS.src, handler, capture);
}
export function onRateChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_RATE_CHANGE.src, handler, capture);
}
export function onReset(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_RESET.src, handler, capture);
}
export function onScroll(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_DISPATCHER_SCROLL.src, handler, capture);
}
export function onSeeked(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_SEEKED.src, handler, capture);
}
export function onSeeking(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_SEEKING.src, handler, capture);
}
export function onSelect(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<UIEvent>>(EVENT_DISPATCHER_SELECT.src, handler, capture);
}
export function onSelectStart(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_SELECT_START.src, handler, capture);
}
export function onStalled(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_STALLED.src, handler, capture);
}
export function onSubmit(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_SUBMIT.src, handler, capture);
}
export function onSuspend(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_SUSPEND.src, handler, capture);
}
export function onTimeUpdate(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_TIME_UPDATE.src, handler, capture);
}
export function onTouchCancel(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_DISPATCHER_TOUCH_CANCEL.src, handler, capture);
}
export function onTouchEnd(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_DISPATCHER_TOUCH_END.src, handler, capture);
}
export function onTouchMove(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_DISPATCHER_TOUCH_MOVE.src, handler, capture);
}
export function onTouchStart(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_DISPATCHER_TOUCH_START.src, handler, capture);
}
export function onUnload(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_UNLOAD.src, handler, capture);
}
export function onVolumeChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_VOLUME_CHANGE.src, handler, capture);
}
export function onWaiting(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createNativeEventHandler<SyntheticNativeEvent<Event>>(EVENT_DISPATCHER_WAITING.src, handler, capture);
}
export function onWheel(
  handler: (ev: SyntheticNativeEvent<WheelEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<WheelEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<WheelEvent>>(EVENT_DISPATCHER_WHEEL.src, handler, capture);
}

export function onActiveTouchEnd(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_DISPATCHER_ACTIVE_TOUCH_END.src, handler, capture);
}
export function onActiveTouchMove(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE.src, handler, capture);
}
export function onActiveTouchStart(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<TouchEvent>>(EVENT_DISPATCHER_ACTIVE_TOUCH_START.src, handler, capture);
}
export function onActiveWheel(
  handler: (ev: SyntheticNativeEvent<WheelEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<WheelEvent>> {
  return createNativeEventHandler<SyntheticNativeEvent<WheelEvent>>(EVENT_DISPATCHER_ACTIVE_WHEEL.src, handler, capture);
}

/* tslint:enable:max-line-length */
