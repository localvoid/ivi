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

/* tslint:disable:max-line-length */
export const EventSourceAbort = new NativeEventSource<UIEvent>(NativeEventSourceFlags.Capture, "abort");
export const EventSourceActivate = new NativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "activate");
export const EventSourceAriaRequest = new NativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "ariarequest");
export const EventSourceBeforeActivate = new NativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforeactivate");
export const EventSourceBeforeCopy = new NativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture, "beforecopy");
export const EventSourceBeforeCut = new NativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforecut");
export const EventSourceBeforeDeactivate = new NativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforedeactivate");
export const EventSourceBeforePaste = new NativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforepaste");
export const EventSourceBlur = new NativeEventSource<FocusEvent>(NativeEventSourceFlags.Capture, "blur");
export const EventSourceCanPlay = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "canplay");
export const EventSourceCanPlaythrough = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "canplaythrough");
export const EventSourceChange = new NativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "change");
export const EventSourceClick = new NativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "click");
export const EventSourceContextMenu = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "contextmenu");
export const EventSourceCopy = new NativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "copy");
export const EventSourceCueChange = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "cuechange");
export const EventSourceCut = new NativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "cut");
export const EventSourceDoubleClick = new NativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dblclick");
export const EventSourceDeactivate = new NativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "deactivate");
export const EventSourceDrag = new NativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drag");
export const EventSourceDragEnd = new NativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragend");
export const EventSourceDragEnter = new NativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragenter");
export const EventSourceDragLeave = new NativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragleave");
export const EventSourceDragOver = new NativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragover");
export const EventSourceDragStart = new NativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragstart");
export const EventSourceDrop = new NativeEventSource<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drop");
export const EventSourceDurationChange = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "durationchange");
export const EventSourceEmptied = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "emptied");
export const EventSourceEncrypted = new NativeEventSource<MediaEncryptedEvent>(NativeEventSourceFlags.Capture, "encrypted");
export const EventSourceEnded = new NativeEventSource<MediaStreamErrorEvent>(NativeEventSourceFlags.Capture, "ended");
export const EventSourceError = new NativeEventSource<ErrorEvent>(NativeEventSourceFlags.Capture, "error");
export const EventSourceFocus = new NativeEventSource<FocusEvent>(NativeEventSourceFlags.Capture, "focus");
export const EventSourceGotPointerCapture = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture, "gotpointercapture");
export const EventSourceInput = new NativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "input");
export const EventSourceInvalid = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "invalid");
export const EventSourceKeyDown = new NativeEventSource<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keydown");
export const EventSourceKeyPress = new NativeEventSource<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keypress");
export const EventSourceKeyUp = new NativeEventSource<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keyup");
export const EventSourceLoad = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "load");
export const EventSourceLoadedSata = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "loadeddata");
export const EventSourceLoadedMetadata = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "loadedmetadata");
export const EventSourceLoadStart = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "loadstart");
export const EventSourceLostPointerCapture = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture, "lostpointercapture");
export const EventSourceMouseDown = new NativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousedown");
export const EventSourceMouseEnter = new NativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture, "mouseenter");
export const EventSourceMouseLeave = new NativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture, "mouseleave");
export const EventSourceMouseMove = new NativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousemove");
export const EventSourceMouseOut = new NativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseout");
export const EventSourceMouseOver = new NativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseover");
export const EventSourceMouseUp = new NativeEventSource<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseup");
export const EventSourcePaste = new NativeEventSource<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "paste");
export const EventSourcePause = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "pause");
export const EventSourcePlay = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "play");
export const EventSourcePlaying = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "playing");
export const EventSourcePointerCancel = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointercancel");
export const EventSourcePointerDown = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerdown");
export const EventSourcePointerEnter = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture, "pointerenter");
export const EventSourcePointerLeave = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture, "pointerleave");
export const EventSourcePointerMove = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointermove");
export const EventSourcePointerOut = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerout");
export const EventSourcePointerOver = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerover");
export const EventSourcePointerUp = new NativeEventSource<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerup");
export const EventSourceProgress = new NativeEventSource<ProgressEvent>(NativeEventSourceFlags.Capture, "progress");
export const EventSourceRateChange = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "ratechange");
export const EventSourceReset = new NativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "reset");
export const EventSourceScroll = new NativeEventSource<UIEvent>(NativeEventSourceFlags.Capture, "scroll");
export const EventSourceSeeked = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "seeked");
export const EventSourceSeeking = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "seeking");
export const EventSourceSelect = new NativeEventSource<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "select");
export const EventSourceSelectStart = new NativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "selectstart");
export const EventSourceStalled = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "stalled");
export const EventSourceSubmit = new NativeEventSource<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "submit");
export const EventSourceSuspend = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "suspend");
export const EventSourceTimeUpdate = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "timeupdate");
export const EventSourceTouchCancel = new NativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchcancel");
export const EventSourceTouchEnd = new NativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchend");
export const EventSourceTouchMove = new NativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchmove");
export const EventSourceTouchStart = new NativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchstart");
export const EventSourceUnload = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "unload");
export const EventSourceVolumeChange = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "volumechange");
export const EventSourceWaiting = new NativeEventSource<Event>(NativeEventSourceFlags.Capture, "waiting");
export const EventSourceWheel = new NativeEventSource<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "wheel");

export const EventSourceActiveTouchEnd = new NativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchend");
export const EventSourceActiveTouchMove = new NativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchmove");
export const EventSourceActiveTouchStart = new NativeEventSource<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchstart");
export const EventSourceActiveWheel = new NativeEventSource<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "wheel");

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
