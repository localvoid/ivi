/**
 * Event Handlers.
 *
 * Optimizing compilers should inline all this functions and completely remove unused code.
 */

import { EventHandlerFlags, NativeEventSourceFlags, EventFlags } from "./flags";
import { EventHandler } from "./event_handler";
import { EventSource } from "./event_source";
import { NativeEventSource } from "./native_event_source";
import { SyntheticNativeEvent } from "./synthetic_event";

function c<T extends Event>(flags: NativeEventSourceFlags, name: string): NativeEventSource<T> {
  return new NativeEventSource<T>(flags, name);
}

/* tslint:disable:max-line-length */
export const EventSourceAbort = /*#__PURE__*/c<UIEvent>(NativeEventSourceFlags.Capture, "abort");
export const EventSourceActivate = /*#__PURE__*/c<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "activate");
export const EventSourceAriaRequest = /*#__PURE__*/c<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "ariarequest");
export const EventSourceBeforeActivate = /*#__PURE__*/c<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforeactivate");
export const EventSourceBeforeCopy = /*#__PURE__*/c<ClipboardEvent>(NativeEventSourceFlags.Capture, "beforecopy");
export const EventSourceBeforeCut = /*#__PURE__*/c<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforecut");
export const EventSourceBeforeDeactivate = /*#__PURE__*/c<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforedeactivate");
export const EventSourceBeforePaste = /*#__PURE__*/c<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforepaste");
export const EventSourceBlur = /*#__PURE__*/c<FocusEvent>(NativeEventSourceFlags.Capture, "blur");
export const EventSourceCanPlay = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "canplay");
export const EventSourceCanPlaythrough = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "canplaythrough");
export const EventSourceChange = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "change");
export const EventSourceClick = /*#__PURE__*/c<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "click");
export const EventSourceContextMenu = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "contextmenu");
export const EventSourceCopy = /*#__PURE__*/c<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "copy");
export const EventSourceCueChange = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "cuechange");
export const EventSourceCut = /*#__PURE__*/c<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "cut");
export const EventSourceDoubleClick = /*#__PURE__*/c<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dblclick");
export const EventSourceDeactivate = /*#__PURE__*/c<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "deactivate");
export const EventSourceDrag = /*#__PURE__*/c<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drag");
export const EventSourceDragEnd = /*#__PURE__*/c<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragend");
export const EventSourceDragEnter = /*#__PURE__*/c<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragenter");
export const EventSourceDragLeave = /*#__PURE__*/c<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragleave");
export const EventSourceDragOver = /*#__PURE__*/c<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragover");
export const EventSourceDragStart = /*#__PURE__*/c<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragstart");
export const EventSourceDrop = /*#__PURE__*/c<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drop");
export const EventSourceDurationChange = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "durationchange");
export const EventSourceEmptied = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "emptied");
export const EventSourceEncrypted = /*#__PURE__*/c<MediaEncryptedEvent>(NativeEventSourceFlags.Capture, "encrypted");
export const EventSourceEnded = /*#__PURE__*/c<MediaStreamErrorEvent>(NativeEventSourceFlags.Capture, "ended");
export const EventSourceError = /*#__PURE__*/c<ErrorEvent>(NativeEventSourceFlags.Capture, "error");
export const EventSourceFocus = /*#__PURE__*/c<FocusEvent>(NativeEventSourceFlags.Capture, "focus");
export const EventSourceGotPointerCapture = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture, "gotpointercapture");
export const EventSourceInput = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "input");
export const EventSourceInvalid = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "invalid");
export const EventSourceKeyDown = /*#__PURE__*/c<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keydown");
export const EventSourceKeyPress = /*#__PURE__*/c<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keypress");
export const EventSourceKeyUp = /*#__PURE__*/c<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keyup");
export const EventSourceLoad = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "load");
export const EventSourceLoadedSata = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "loadeddata");
export const EventSourceLoadedMetadata = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "loadedmetadata");
export const EventSourceLoadStart = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "loadstart");
export const EventSourceLostPointerCapture = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture, "lostpointercapture");
export const EventSourceMouseDown = /*#__PURE__*/c<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousedown");
export const EventSourceMouseEnter = /*#__PURE__*/c<MouseEvent>(NativeEventSourceFlags.Capture, "mouseenter");
export const EventSourceMouseLeave = /*#__PURE__*/c<MouseEvent>(NativeEventSourceFlags.Capture, "mouseleave");
export const EventSourceMouseMove = /*#__PURE__*/c<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousemove");
export const EventSourceMouseOut = /*#__PURE__*/c<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseout");
export const EventSourceMouseOver = /*#__PURE__*/c<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseover");
export const EventSourceMouseUp = /*#__PURE__*/c<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseup");
export const EventSourcePaste = /*#__PURE__*/c<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "paste");
export const EventSourcePause = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "pause");
export const EventSourcePlay = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "play");
export const EventSourcePlaying = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "playing");
export const EventSourcePointerCancel = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointercancel");
export const EventSourcePointerDown = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerdown");
export const EventSourcePointerEnter = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture, "pointerenter");
export const EventSourcePointerLeave = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture, "pointerleave");
export const EventSourcePointerMove = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointermove");
export const EventSourcePointerOut = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerout");
export const EventSourcePointerOver = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerover");
export const EventSourcePointerUp = /*#__PURE__*/c<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerup");
export const EventSourceProgress = /*#__PURE__*/c<ProgressEvent>(NativeEventSourceFlags.Capture, "progress");
export const EventSourceRateChange = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "ratechange");
export const EventSourceReset = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "reset");
export const EventSourceScroll = /*#__PURE__*/c<UIEvent>(NativeEventSourceFlags.Capture, "scroll");
export const EventSourceSeeked = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "seeked");
export const EventSourceSeeking = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "seeking");
export const EventSourceSelect = /*#__PURE__*/c<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "select");
export const EventSourceSelectStart = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "selectstart");
export const EventSourceStalled = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "stalled");
export const EventSourceSubmit = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "submit");
export const EventSourceSuspend = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "suspend");
export const EventSourceTimeUpdate = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "timeupdate");
export const EventSourceTouchCancel = /*#__PURE__*/c<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchcancel");
export const EventSourceTouchEnd = /*#__PURE__*/c<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchend");
export const EventSourceTouchMove = /*#__PURE__*/c<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchmove");
export const EventSourceTouchStart = /*#__PURE__*/c<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchstart");
export const EventSourceUnload = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "unload");
export const EventSourceVolumeChange = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "volumechange");
export const EventSourceWaiting = /*#__PURE__*/c<Event>(NativeEventSourceFlags.Capture, "waiting");
export const EventSourceWheel = /*#__PURE__*/c<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "wheel");

export const EventSourceActiveTouchEnd = /*#__PURE__*/c<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchend");
export const EventSourceActiveTouchMove = /*#__PURE__*/c<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchmove");
export const EventSourceActiveTouchStart = /*#__PURE__*/c<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchstart");
export const EventSourceActiveWheel = /*#__PURE__*/c<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "wheel");

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
  fn: (ev: E) => EventFlags | void,
  capture?: boolean,
): EventHandler<E> {
  return {
    source: source,
    flags: capture === true ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble,
    handler: fn,
    listeners: 0,
    props: null,
    state: null,
  };
}

export function onAbort(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EventSourceAbort.eventSource, handler, capture);
}
export function onActivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EventSourceActivate.eventSource, handler, capture);
}
export function onAriaRequest(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EventSourceAriaRequest.eventSource, handler, capture);
}
export function onBeforeActivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EventSourceBeforeActivate.eventSource, handler, capture);
}
export function onBeforeCopy(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EventSourceBeforeCopy.eventSource, handler, capture);
}
export function onBeforeCut(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EventSourceBeforeCut.eventSource, handler, capture);
}
export function onBeforeDeactivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EventSourceBeforeDeactivate.eventSource, handler, capture);
}
export function onBeforePaste(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EventSourceBeforePaste.eventSource, handler, capture);
}
export function onBlur(
  handler: (ev: SyntheticNativeEvent<FocusEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<FocusEvent>> {
  return createEventHandler<SyntheticNativeEvent<FocusEvent>>(EventSourceBlur.eventSource, handler, capture);
}
export function onCanPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceCanPlay.eventSource, handler, capture);
}
export function onCanPlaythrough(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceCanPlaythrough.eventSource, handler, capture);
}
export function onChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceChange.eventSource, handler, capture);
}
export function onClick(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EventSourceClick.eventSource, handler, capture);
}
export function onContextMenu(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourceContextMenu.eventSource, handler, capture);
}
export function onCopy(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EventSourceCopy.eventSource, handler, capture);
}
export function onCueChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceCueChange.eventSource, handler, capture);
}
export function onCut(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EventSourceCut.eventSource, handler, capture);
}
export function onDoubleClick(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EventSourceDoubleClick.eventSource, handler, capture);
}
export function onDeactivate(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EventSourceDeactivate.eventSource, handler, capture);
}
export function onDrag(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EventSourceDrag.eventSource, handler, capture);
}
export function onDragEnd(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EventSourceDragEnd.eventSource, handler, capture);
}
export function onDragEnter(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EventSourceDragEnter.eventSource, handler, capture);
}
export function onDragLeave(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EventSourceDragLeave.eventSource, handler, capture);
}
export function onDragOver(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EventSourceDragOver.eventSource, handler, capture);
}
export function onDragStart(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EventSourceDragStart.eventSource, handler, capture);
}
export function onDrop(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<DragEvent>> {
  return createEventHandler<SyntheticNativeEvent<DragEvent>>(EventSourceDrop.eventSource, handler, capture);
}
export function onDurationChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceDurationChange.eventSource, handler, capture);
}
export function onEmptied(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceEmptied.eventSource, handler, capture);
}
export function onEncrypted(
  handler: (ev: SyntheticNativeEvent<MediaEncryptedEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MediaEncryptedEvent>> {
  return createEventHandler<SyntheticNativeEvent<MediaEncryptedEvent>>(EventSourceEncrypted.eventSource, handler, capture);
}
export function onEnded(
  handler: (ev: SyntheticNativeEvent<MediaStreamErrorEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MediaStreamErrorEvent>> {
  return createEventHandler<SyntheticNativeEvent<MediaStreamErrorEvent>>(EventSourceEnded.eventSource, handler, capture);
}
export function onError(
  handler: (ev: SyntheticNativeEvent<ErrorEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ErrorEvent>> {
  return createEventHandler<SyntheticNativeEvent<ErrorEvent>>(EventSourceError.eventSource, handler, capture);
}
export function onFocus(
  handler: (ev: SyntheticNativeEvent<FocusEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<FocusEvent>> {
  return createEventHandler<SyntheticNativeEvent<FocusEvent>>(EventSourceFocus.eventSource, handler, capture);
}
export function onGotPointerCapture(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourceGotPointerCapture.eventSource, handler, capture);
}
export function onInput(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceInput.eventSource, handler, capture);
}
export function onInvalid(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceInvalid.eventSource, handler, capture);
}
export function onKeyDown(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<KeyboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<KeyboardEvent>>(EventSourceKeyDown.eventSource, handler, capture);
}
export function onKeyPress(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<KeyboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<KeyboardEvent>>(EventSourceKeyPress.eventSource, handler, capture);
}
export function onKeyUp(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<KeyboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<KeyboardEvent>>(EventSourceKeyUp.eventSource, handler, capture);
}
export function onLoad(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceLoad.eventSource, handler, capture);
}
export function onLoadedData(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceLoadedSata.eventSource, handler, capture);
}
export function onLoadedMetadata(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceLoadedMetadata.eventSource, handler, capture);
}
export function onLoadStart(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceLoadStart.eventSource, handler, capture);
}
export function onLostPointerCapture(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourceLostPointerCapture.eventSource, handler, capture);
}
export function onMouseDown(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EventSourceMouseDown.eventSource, handler, capture);
}
export function onMouseEnter(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EventSourceMouseEnter.eventSource, handler, capture);
}
export function onMouseLeave(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EventSourceMouseLeave.eventSource, handler, capture);
}
export function onMouseMove(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EventSourceMouseMove.eventSource, handler, capture);
}
export function onMouseOut(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EventSourceMouseOut.eventSource, handler, capture);
}
export function onMouseOver(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EventSourceMouseOver.eventSource, handler, capture);
}
export function onMouseUp(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<MouseEvent>> {
  return createEventHandler<SyntheticNativeEvent<MouseEvent>>(EventSourceMouseUp.eventSource, handler, capture);
}
export function onPaste(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ClipboardEvent>> {
  return createEventHandler<SyntheticNativeEvent<ClipboardEvent>>(EventSourcePaste.eventSource, handler, capture);
}
export function onPause(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourcePause.eventSource, handler, capture);
}
export function onPlay(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourcePlay.eventSource, handler, capture);
}
export function onPlaying(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourcePlaying.eventSource, handler, capture);
}
export function onPointerCancel(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourcePointerCancel.eventSource, handler, capture);
}
export function onPointerDown(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourcePointerDown.eventSource, handler, capture);
}
export function onPointerEnter(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourcePointerEnter.eventSource, handler, capture);
}
export function onPointerLeave(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourcePointerLeave.eventSource, handler, capture);
}
export function onPointerMove(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourcePointerMove.eventSource, handler, capture);
}
export function onPointerOut(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourcePointerOut.eventSource, handler, capture);
}
export function onPointerOver(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourcePointerOver.eventSource, handler, capture);
}
export function onPointerUp(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<PointerEvent>> {
  return createEventHandler<SyntheticNativeEvent<PointerEvent>>(EventSourcePointerUp.eventSource, handler, capture);
}
export function onProgress(
  handler: (ev: SyntheticNativeEvent<ProgressEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<ProgressEvent>> {
  return createEventHandler<SyntheticNativeEvent<ProgressEvent>>(EventSourceProgress.eventSource, handler, capture);
}
export function onRateChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceRateChange.eventSource, handler, capture);
}
export function onReset(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceReset.eventSource, handler, capture);
}
export function onScroll(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EventSourceScroll.eventSource, handler, capture);
}
export function onSeeked(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSeeked.eventSource, handler, capture);
}
export function onSeeking(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSeeking.eventSource, handler, capture);
}
export function onSelect(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<UIEvent>> {
  return createEventHandler<SyntheticNativeEvent<UIEvent>>(EventSourceSelect.eventSource, handler, capture);
}
export function onSelectStart(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSelectStart.eventSource, handler, capture);
}
export function onStalled(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceStalled.eventSource, handler, capture);
}
export function onSubmit(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSubmit.eventSource, handler, capture);
}
export function onSuspend(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceSuspend.eventSource, handler, capture);
}
export function onTimeUpdate(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceTimeUpdate.eventSource, handler, capture);
}
export function onTouchCancel(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EventSourceTouchCancel.eventSource, handler, capture);
}
export function onTouchEnd(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EventSourceTouchEnd.eventSource, handler, capture);
}
export function onTouchMove(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EventSourceTouchMove.eventSource, handler, capture);
}
export function onTouchStart(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EventSourceTouchStart.eventSource, handler, capture);
}
export function onUnload(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceUnload.eventSource, handler, capture);
}
export function onVolumeChange(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceVolumeChange.eventSource, handler, capture);
}
export function onWaiting(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<Event>> {
  return createEventHandler<SyntheticNativeEvent<Event>>(EventSourceWaiting.eventSource, handler, capture);
}
export function onWheel(
  handler: (ev: SyntheticNativeEvent<WheelEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<WheelEvent>> {
  return createEventHandler<SyntheticNativeEvent<WheelEvent>>(EventSourceWheel.eventSource, handler, capture);
}

export function onActiveTouchEnd(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EventSourceActiveTouchEnd.eventSource, handler, capture);
}
export function onActiveTouchMove(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EventSourceActiveTouchMove.eventSource, handler, capture);
}
export function onActiveTouchStart(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<TouchEvent>> {
  return createEventHandler<SyntheticNativeEvent<TouchEvent>>(EventSourceActiveTouchStart.eventSource, handler, capture);
}
export function onActiveWheel(
  handler: (ev: SyntheticNativeEvent<WheelEvent>) => EventFlags | void,
  capture = false,
): EventHandler<SyntheticNativeEvent<WheelEvent>> {
  return createEventHandler<SyntheticNativeEvent<WheelEvent>>(EventSourceActiveWheel.eventSource, handler, capture);
}

/* tslint:enable:max-line-length */
