/**
 * Event Handlers.
 *
 * Optimizing compilers should inline all this functions and completely remove unused code.
 */

import { EventHandlerFlags, NativeEventSourceFlags } from "./flags";
import { EventHandler } from "./event_handler";
import { EventSource } from "./event_source";
import { NativeEventSource } from "./native_event_source";
import {
  SyntheticNativeEvent, SyntheticUIEvent, SyntheticDragEvent, SyntheticErrorEvent,
  SyntheticKeyboardEvent, SyntheticFocusEvent, SyntheticMediaEncryptedEvent, SyntheticMediaStreamErrorEvent,
  SyntheticMouseEvent, SyntheticClipboardEvent, SyntheticPointerEvent, SyntheticTouchEvent, SyntheticWheelEvent,
  SyntheticProgressEvent, SyntheticNativeEventClass,
} from "./synthetic_event";

/* tslint:disable:max-line-length */
export const EventSourceAbort = new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture, "abort", SyntheticUIEvent);
export const EventSourceActivate = new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "activate", SyntheticUIEvent);
export const EventSourceAriaRequest = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "ariarequest", SyntheticUIEvent);
export const EventSourceBeforeActivate = new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforeactivate", SyntheticUIEvent);
export const EventSourceBeforeCopy = new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture, "beforecopy", SyntheticClipboardEvent);
export const EventSourceBeforeCut = new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforecut", SyntheticClipboardEvent);
export const EventSourceBeforeDeactivate = new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforedeactivate", SyntheticUIEvent);
export const EventSourceBeforePaste = new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforepaste", SyntheticClipboardEvent);
export const EventSourceBlur = new NativeEventSource<SyntheticNativeEventClass<FocusEvent, SyntheticFocusEvent>>(NativeEventSourceFlags.Capture, "blur", SyntheticFocusEvent);
export const EventSourceCanPlay = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "canplay", SyntheticNativeEvent);
export const EventSourceCanPlaythrough = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "canplaythrough", SyntheticNativeEvent);
export const EventSourceChange = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "change", SyntheticNativeEvent);
export const EventSourceClick = new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "click", SyntheticMouseEvent);
export const EventSourceContextMenu = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "contextmenu", SyntheticPointerEvent);
export const EventSourceCopy = new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "copy", SyntheticClipboardEvent);
export const EventSourceCueChange = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "cuechange", SyntheticNativeEvent);
export const EventSourceCut = new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "cut", SyntheticClipboardEvent);
export const EventSourceDoubleClick = new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dblclick", SyntheticMouseEvent);
export const EventSourceDeactivate = new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "deactivate", SyntheticUIEvent);
export const EventSourceDrag = new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drag", SyntheticDragEvent);
export const EventSourceDragEnd = new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragend", SyntheticDragEvent);
export const EventSourceDragEnter = new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragenter", SyntheticDragEvent);
export const EventSourceDragLeave = new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragleave", SyntheticDragEvent);
export const EventSourceDragOver = new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragover", SyntheticDragEvent);
export const EventSourceDragStart = new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragstart", SyntheticDragEvent);
export const EventSourceDrop = new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drop", SyntheticDragEvent);
export const EventSourceDurationChange = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "durationchange", SyntheticNativeEvent);
export const EventSourceEmptied = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "emptied", SyntheticNativeEvent);
export const EventSourceEncrypted = new NativeEventSource<SyntheticNativeEventClass<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>>(NativeEventSourceFlags.Capture, "encrypted", SyntheticMediaEncryptedEvent);
export const EventSourceEnded = new NativeEventSource<SyntheticNativeEventClass<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>>(NativeEventSourceFlags.Capture, "ended", SyntheticMediaStreamErrorEvent);
export const EventSourceError = new NativeEventSource<SyntheticNativeEventClass<ErrorEvent, SyntheticErrorEvent>>(NativeEventSourceFlags.Capture, "error", SyntheticErrorEvent);
export const EventSourceFocus = new NativeEventSource<SyntheticNativeEventClass<FocusEvent, SyntheticFocusEvent>>(NativeEventSourceFlags.Capture, "focus", SyntheticFocusEvent);
export const EventSourceGotPointerCapture = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "gotpointercapture", SyntheticPointerEvent);
export const EventSourceInput = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "input", SyntheticNativeEvent);
export const EventSourceInvalid = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "invalid", SyntheticNativeEvent);
export const EventSourceKeyDown = new NativeEventSource<SyntheticNativeEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keydown", SyntheticKeyboardEvent);
export const EventSourceKeyPress = new NativeEventSource<SyntheticNativeEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keypress", SyntheticKeyboardEvent);
export const EventSourceKeyUp = new NativeEventSource<SyntheticNativeEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keyup", SyntheticKeyboardEvent);
export const EventSourceLoad = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "load", SyntheticNativeEvent);
export const EventSourceLoadedSata = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "loadeddata", SyntheticNativeEvent);
export const EventSourceLoadedMetadata = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "loadedmetadata", SyntheticNativeEvent);
export const EventSourceLoadStart = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "loadstart", SyntheticNativeEvent);
export const EventSourceLostPointerCapture = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "lostpointercapture", SyntheticPointerEvent);
export const EventSourceMouseDown = new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousedown", SyntheticMouseEvent);
export const EventSourceMouseEnter = new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture, "mouseenter", SyntheticMouseEvent);
export const EventSourceMouseLeave = new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture, "mouseleave", SyntheticMouseEvent);
export const EventSourceMouseMove = new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousemove", SyntheticMouseEvent);
export const EventSourceMouseOut = new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseout", SyntheticMouseEvent);
export const EventSourceMouseOver = new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseover", SyntheticMouseEvent);
export const EventSourceMouseUp = new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseup", SyntheticMouseEvent);
export const EventSourcePaste = new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "paste", SyntheticClipboardEvent);
export const EventSourcePause = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "pause", SyntheticNativeEvent);
export const EventSourcePlay = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "play", SyntheticNativeEvent);
export const EventSourcePlaying = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "playing", SyntheticNativeEvent);
export const EventSourcePointerCancel = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointercancel", SyntheticPointerEvent);
export const EventSourcePointerDown = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerdown", SyntheticPointerEvent);
export const EventSourcePointerEnter = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "pointerenter", SyntheticPointerEvent);
export const EventSourcePointerLeave = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "pointerleave", SyntheticPointerEvent);
export const EventSourcePointerMove = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointermove", SyntheticPointerEvent);
export const EventSourcePointerOut = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerout", SyntheticPointerEvent);
export const EventSourcePointerOver = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerover", SyntheticPointerEvent);
export const EventSourcePointerUp = new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerup", SyntheticPointerEvent);
export const EventSourceProgress = new NativeEventSource<SyntheticNativeEventClass<ProgressEvent, SyntheticProgressEvent>>(NativeEventSourceFlags.Capture, "progress", SyntheticProgressEvent);
export const EventSourceRateChange = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "ratechange", SyntheticNativeEvent);
export const EventSourceReset = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "reset", SyntheticNativeEvent);
export const EventSourceScroll = new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture, "scroll", SyntheticUIEvent);
export const EventSourceSeeked = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "seeked", SyntheticNativeEvent);
export const EventSourceSeeking = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "seeking", SyntheticNativeEvent);
export const EventSourceSelect = new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "select", SyntheticUIEvent);
export const EventSourceSelectStart = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "selectstart", SyntheticNativeEvent);
export const EventSourceStalled = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "stalled", SyntheticNativeEvent);
export const EventSourceSubmit = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "submit", SyntheticNativeEvent);
export const EventSourceSuspend = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "suspend", SyntheticNativeEvent);
export const EventSourceTimeUpdate = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "timeupdate", SyntheticNativeEvent);
export const EventSourceTouchCancel = new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchcancel", SyntheticTouchEvent);
export const EventSourceTouchEnd = new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchend", SyntheticTouchEvent);
export const EventSourceTouchMove = new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchmove", SyntheticTouchEvent);
export const EventSourceTouchStart = new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchstart", SyntheticTouchEvent);
export const EventSourceUnload = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "unload", SyntheticNativeEvent);
export const EventSourceVolumeChange = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "volumechange", SyntheticNativeEvent);
export const EventSourceWaiting = new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "waiting", SyntheticNativeEvent);
export const EventSourceWheel = new NativeEventSource<SyntheticNativeEventClass<WheelEvent, SyntheticWheelEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "wheel", SyntheticWheelEvent);

export const EventSourceActiveTouchEnd = new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchend", SyntheticTouchEvent);
export const EventSourceActiveTouchMove = new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchmove", SyntheticTouchEvent);
export const EventSourceActiveTouchstart = new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchstart", SyntheticTouchEvent);
export const EventSourceActiveWheel = new NativeEventSource<SyntheticNativeEventClass<WheelEvent, SyntheticWheelEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "wheel", SyntheticWheelEvent);

/**
 * Helper function that creates Event Handler objects.
 *
 * @param dispatcher Dispatcher instance.
 * @param fn Event Handler function.
 * @param options Event Options. Value with a boolean type indicates that events of this type should use capture mode
 *   and it will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the
 *   DOM tree.
 * @returns EventHandler object.
 */
export function createEventHandler<E extends SyntheticNativeEvent<any>>(
  source: EventSource,
  fn: (ev: E) => void,
  capture?: boolean,
): EventHandler<E> {
  const handler = fn as EventHandler<E>;
  handler.source = source;
  handler.flags = capture === true ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble;
  handler.listeners = 0;
  handler.props = null;
  handler.state = null;
  return handler;
}

export function onAbort(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> {
  return createEventHandler<SyntheticUIEvent<UIEvent>>(EventSourceAbort.eventSource, handler, capture);
}
export function onActivate(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> {
  return createEventHandler<SyntheticUIEvent<UIEvent>>(EventSourceActivate.eventSource, handler, capture);
}
export function onAriaRequest(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> {
  return createEventHandler<SyntheticUIEvent<UIEvent>>(EventSourceAriaRequest.eventSource, handler, capture);
}
export function onBeforeActivate(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> {
  return createEventHandler<SyntheticUIEvent<UIEvent>>(EventSourceBeforeActivate.eventSource, handler, capture);
}
export function onBeforeCopy(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> {
  return createEventHandler<SyntheticClipboardEvent>(EventSourceBeforeCopy.eventSource, handler, capture);
}
export function onBeforeCut(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> {
  return createEventHandler<SyntheticClipboardEvent>(EventSourceBeforeCut.eventSource, handler, capture);
}
export function onBeforeDeactivate(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> {
  return createEventHandler<SyntheticUIEvent<UIEvent>>(EventSourceBeforeDeactivate.eventSource, handler, capture);
}
export function onBeforePaste(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> {
  return createEventHandler<SyntheticClipboardEvent>(EventSourceBeforePaste.eventSource, handler, capture);
}
export function onBlur(
  handler: (ev: SyntheticFocusEvent) => void,
  capture = false,
): EventHandler<SyntheticFocusEvent> {
  return createEventHandler<SyntheticFocusEvent>(EventSourceBlur.eventSource, handler, capture);
}
export function onCanPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceCanPlay.eventSource, handler, capture);
}
export function onCanPlaythrough(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceCanPlaythrough.eventSource, handler, capture);
}
export function onChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceChange.eventSource, handler, capture);
}
export function onClick(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> {
  return createEventHandler<SyntheticMouseEvent<MouseEvent>>(EventSourceClick.eventSource, handler, capture);
}
export function onContextMenu(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourceContextMenu.eventSource, handler, capture);
}
export function onCopy(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> {
  return createEventHandler<SyntheticClipboardEvent>(EventSourceCopy.eventSource, handler, capture);
}
export function onCueChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceCueChange.eventSource, handler, capture);
}
export function onCut(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> {
  return createEventHandler<SyntheticClipboardEvent>(EventSourceCut.eventSource, handler, capture);
}
export function onDoubleClick(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> {
  return createEventHandler<SyntheticMouseEvent<MouseEvent>>(EventSourceDoubleClick.eventSource, handler, capture);
}
export function onDeactivate(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> {
  return createEventHandler<SyntheticUIEvent<UIEvent>>(EventSourceDeactivate.eventSource, handler, capture);
}
export function onDrag(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> {
  return createEventHandler<SyntheticDragEvent>(EventSourceDrag.eventSource, handler, capture);
}
export function onDragEnd(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> {
  return createEventHandler<SyntheticDragEvent>(EventSourceDragEnd.eventSource, handler, capture);
}
export function onDragEnter(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> {
  return createEventHandler<SyntheticDragEvent>(EventSourceDragEnter.eventSource, handler, capture);
}
export function onDragLeave(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> {
  return createEventHandler<SyntheticDragEvent>(EventSourceDragLeave.eventSource, handler, capture);
}
export function onDragOver(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> {
  return createEventHandler<SyntheticDragEvent>(EventSourceDragOver.eventSource, handler, capture);
}
export function onDragStart(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> {
  return createEventHandler<SyntheticDragEvent>(EventSourceDragStart.eventSource, handler, capture);
}
export function onDrop(
  handler: (ev: SyntheticDragEvent) => void,
  capture = false,
): EventHandler<SyntheticDragEvent> {
  return createEventHandler<SyntheticDragEvent>(EventSourceDrop.eventSource, handler, capture);
}
export function onDurationChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceDurationChange.eventSource, handler, capture);
}
export function onEmptied(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceEmptied.eventSource, handler, capture);
}
export function onEncrypted(
  handler: (ev: SyntheticMediaEncryptedEvent) => void,
  capture = false,
): EventHandler<SyntheticMediaEncryptedEvent> {
  return createEventHandler<SyntheticMediaEncryptedEvent>(EventSourceEncrypted.eventSource, handler, capture);
}
export function onEnded(
  handler: (ev: SyntheticMediaStreamErrorEvent) => void,
  capture = false,
): EventHandler<SyntheticMediaStreamErrorEvent> {
  return createEventHandler<SyntheticMediaStreamErrorEvent>(EventSourceEnded.eventSource, handler, capture);
}
export function onError(
  handler: (ev: SyntheticErrorEvent) => void,
  capture = false,
): EventHandler<SyntheticErrorEvent> {
  return createEventHandler<SyntheticErrorEvent>(EventSourceError.eventSource, handler, capture);
}
export function onFocus(
  handler: (ev: SyntheticFocusEvent) => void,
  capture = false,
): EventHandler<SyntheticFocusEvent> {
  return createEventHandler<SyntheticFocusEvent>(EventSourceFocus.eventSource, handler, capture);
}
export function onGotPointerCapture(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourceGotPointerCapture.eventSource, handler, capture);
}
export function onInput(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceInput.eventSource, handler, capture);
}
export function onInvalid(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceInvalid.eventSource, handler, capture);
}
export function onKeyDown(
  handler: (ev: SyntheticKeyboardEvent) => void,
  capture = false,
): EventHandler<SyntheticKeyboardEvent> {
  return createEventHandler<SyntheticKeyboardEvent>(EventSourceKeyDown.eventSource, handler, capture);
}
export function onKeyPress(
  handler: (ev: SyntheticKeyboardEvent) => void,
  capture = false,
): EventHandler<SyntheticKeyboardEvent> {
  return createEventHandler<SyntheticKeyboardEvent>(EventSourceKeyPress.eventSource, handler, capture);
}
export function onKeyUp(
  handler: (ev: SyntheticKeyboardEvent) => void,
  capture = false,
): EventHandler<SyntheticKeyboardEvent> {
  return createEventHandler<SyntheticKeyboardEvent>(EventSourceKeyUp.eventSource, handler, capture);
}
export function onLoad(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceLoad.eventSource, handler, capture);
}
export function onLoadedData(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceLoadedSata.eventSource, handler, capture);
}
export function onLoadedMetadata(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceLoadedMetadata.eventSource, handler, capture);
}
export function onLoadStart(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceLoadStart.eventSource, handler, capture);
}
export function onLostPointerCapture(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourceLostPointerCapture.eventSource, handler, capture);
}
export function onMouseDown(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> {
  return createEventHandler<SyntheticMouseEvent<MouseEvent>>(EventSourceMouseDown.eventSource, handler, capture);
}
export function onMouseEnter(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> {
  return createEventHandler<SyntheticMouseEvent<MouseEvent>>(EventSourceMouseEnter.eventSource, handler, capture);
}
export function onMouseLeave(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> {
  return createEventHandler<SyntheticMouseEvent<MouseEvent>>(EventSourceMouseLeave.eventSource, handler, capture);
}
export function onMouseMove(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> {
  return createEventHandler<SyntheticMouseEvent<MouseEvent>>(EventSourceMouseMove.eventSource, handler, capture);
}
export function onMouseOut(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> {
  return createEventHandler<SyntheticMouseEvent<MouseEvent>>(EventSourceMouseOut.eventSource, handler, capture);
}
export function onMouseOver(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> {
  return createEventHandler<SyntheticMouseEvent<MouseEvent>>(EventSourceMouseOver.eventSource, handler, capture);
}
export function onMouseUp(
  handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
  capture = false,
): EventHandler<SyntheticMouseEvent<MouseEvent>> {
  return createEventHandler<SyntheticMouseEvent<MouseEvent>>(EventSourceMouseUp.eventSource, handler, capture);
}
export function onPaste(
  handler: (ev: SyntheticClipboardEvent) => void,
  capture = false,
): EventHandler<SyntheticClipboardEvent> {
  return createEventHandler<SyntheticClipboardEvent>(EventSourcePaste.eventSource, handler, capture);
}
export function onPause(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourcePause.eventSource, handler, capture);
}
export function onPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourcePlay.eventSource, handler, capture);
}
export function onPlaying(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourcePlaying.eventSource, handler, capture);
}
export function onPointerCancel(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourcePointerCancel.eventSource, handler, capture);
}
export function onPointerDown(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourcePointerDown.eventSource, handler, capture);
}
export function onPointerEnter(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourcePointerEnter.eventSource, handler, capture);
}
export function onPointerLeave(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourcePointerLeave.eventSource, handler, capture);
}
export function onPointerMove(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourcePointerMove.eventSource, handler, capture);
}
export function onPointerOut(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourcePointerOut.eventSource, handler, capture);
}
export function onPointerOver(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourcePointerOver.eventSource, handler, capture);
}
export function onPointerUp(
  handler: (ev: SyntheticPointerEvent) => void,
  capture = false,
): EventHandler<SyntheticPointerEvent> {
  return createEventHandler<SyntheticPointerEvent>(EventSourcePointerUp.eventSource, handler, capture);
}
export function onProgress(
  handler: (ev: SyntheticProgressEvent) => void,
  capture = false,
): EventHandler<SyntheticProgressEvent> {
  return createEventHandler<SyntheticProgressEvent>(EventSourceProgress.eventSource, handler, capture);
}
export function onRateChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceRateChange.eventSource, handler, capture);
}
export function onReset(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceReset.eventSource, handler, capture);
}
export function onScroll(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> {
  return createEventHandler<SyntheticUIEvent<UIEvent>>(EventSourceScroll.eventSource, handler, capture);
}
export function onSeeked(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSeeked.eventSource, handler, capture);
}
export function onSeeking(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSeeking.eventSource, handler, capture);
}
export function onSelect(
  handler: (ev: SyntheticUIEvent<UIEvent>) => void,
  capture = false,
): EventHandler<SyntheticUIEvent<UIEvent>> {
  return createEventHandler<SyntheticUIEvent<UIEvent>>(EventSourceSelect.eventSource, handler, capture);
}
export function onSelectStart(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSelectStart.eventSource, handler, capture);
}
export function onStalled(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceStalled.eventSource, handler, capture);
}
export function onSubmit(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSubmit.eventSource, handler, capture);
}
export function onSuspend(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSuspend.eventSource, handler, capture);
}
export function onTimeUpdate(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceTimeUpdate.eventSource, handler, capture);
}
export function onTouchCancel(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> {
  return createEventHandler<SyntheticTouchEvent>(EventSourceTouchCancel.eventSource, handler, capture);
}
export function onTouchEnd(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> {
  return createEventHandler<SyntheticTouchEvent>(EventSourceTouchEnd.eventSource, handler, capture);
}
export function onTouchMove(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> {
  return createEventHandler<SyntheticTouchEvent>(EventSourceTouchMove.eventSource, handler, capture);
}
export function onTouchStart(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> {
  return createEventHandler<SyntheticTouchEvent>(EventSourceTouchStart.eventSource, handler, capture);
}
export function onUnload(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceUnload.eventSource, handler, capture);
}
export function onVolumeChange(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceVolumeChange.eventSource, handler, capture);
}
export function onWaiting(
  handler: (ev: SyntheticNativeEvent<Event>) => void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceWaiting.eventSource, handler, capture);
}
export function onWheel(
  handler: (ev: SyntheticWheelEvent) => void,
  capture = false,
): EventHandler<SyntheticWheelEvent> {
  return createEventHandler<SyntheticWheelEvent>(EventSourceWheel.eventSource, handler, capture);
}

export function onActiveTouchEnd(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> {
  return createEventHandler<SyntheticTouchEvent>(EventSourceTouchEnd.eventSource, handler, capture);
}
export function onActiveTouchMove(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> {
  return createEventHandler<SyntheticTouchEvent>(EventSourceTouchMove.eventSource, handler, capture);
}
export function onActiveTouchStart(
  handler: (ev: SyntheticTouchEvent) => void,
  capture = false,
): EventHandler<SyntheticTouchEvent> {
  return createEventHandler<SyntheticTouchEvent>(EventSourceTouchStart.eventSource, handler, capture);
}
export function onActiveWheel(
  handler: (ev: SyntheticWheelEvent) => void,
  capture = false,
): EventHandler<SyntheticWheelEvent> {
  return createEventHandler<SyntheticWheelEvent>(EventSourceWheel.eventSource, handler, capture);
}

/* tslint:enable:max-line-length */
