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
    SyntheticEvent, SyntheticUIEvent, SyntheticDragEvent, SyntheticErrorEvent,
    SyntheticKeyboardEvent, SyntheticFocusEvent, SyntheticMediaEncryptedEvent, SyntheticMediaStreamErrorEvent,
    SyntheticMouseEvent, SyntheticClipboardEvent, SyntheticPointerEvent, SyntheticTouchEvent, SyntheticWheelEvent,
    SyntheticProgressEvent, SyntheticEventClass,
} from "./synthetic_event";

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
export function createEventHandler<E extends SyntheticEvent<any>>(
    source: EventSource,
    fn: (ev: E) => void,
    capture?: boolean,
): EventHandler<E> {
    const handler = fn as EventHandler<E>;
    handler.source = source;
    handler.flags = capture === true ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble;
    return handler;
}

export interface NativeEventSourceList {
    abort: NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    activate: NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    ariarequest: NativeEventSource<SyntheticEventClass<Event, SyntheticUIEvent<UIEvent>>>;
    beforeactivate: NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    beforecopy: NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    beforecut: NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    beforedeactivate: NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    beforepaste: NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    blur: NativeEventSource<SyntheticEventClass<FocusEvent, SyntheticFocusEvent>>;
    canplay: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    canplaythrough: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    change: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    click: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    contextmenu: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    copy: NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    cuechange: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    cut: NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    dblclick: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    deactivate: NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    drag: NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragend: NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragenter: NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragleave: NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragover: NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragstart: NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    drop: NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    durationchange: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    emptied: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    encrypted: NativeEventSource<SyntheticEventClass<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>>;
    ended: NativeEventSource<SyntheticEventClass<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>>;
    error: NativeEventSource<SyntheticEventClass<ErrorEvent, SyntheticErrorEvent>>;
    focus: NativeEventSource<SyntheticEventClass<FocusEvent, SyntheticFocusEvent>>;
    gotpointercapture: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    input: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    invalid: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    keydown: NativeEventSource<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>;
    keypress: NativeEventSource<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>;
    keyup: NativeEventSource<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>;
    load: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    loadeddata: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    loadedmetadata: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    loadstart: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    lostpointercapture: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    mousedown: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseenter: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseleave: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mousemove: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseout: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseover: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseup: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    paste: NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    pause: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    play: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    playing: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    pointercancel: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerdown: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerenter: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerleave: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointermove: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerout: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerover: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerup: NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    progress: NativeEventSource<SyntheticEventClass<ProgressEvent, SyntheticProgressEvent>>;
    ratechange: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    reset: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    scroll: NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    seeked: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    seeking: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    select: NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    selectstart: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    stalled: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    submit: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    suspend: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    timeupdate: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    touchcancel: NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchend: NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchmove: NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchstart: NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    unload: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    volumechange: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    waiting: NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    wheel: NativeEventSource<SyntheticEventClass<WheelEvent, SyntheticWheelEvent>>;
};

/* tslint:disable:max-line-length */
export const NativeEventSources: NativeEventSourceList = {
    abort: new NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture, "abort", SyntheticUIEvent),
    activate: new NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "activate", SyntheticUIEvent),
    ariarequest: new NativeEventSource<SyntheticEventClass<Event, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "ariarequest", SyntheticUIEvent),
    beforeactivate: new NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforeactivate", SyntheticUIEvent),
    beforecopy: new NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture, "beforecopy", SyntheticClipboardEvent),
    beforecut: new NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforecut", SyntheticClipboardEvent),
    beforedeactivate: new NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforedeactivate", SyntheticUIEvent),
    beforepaste: new NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforepaste", SyntheticClipboardEvent),
    blur: new NativeEventSource<SyntheticEventClass<FocusEvent, SyntheticFocusEvent>>(NativeEventSourceFlags.Capture, "blur", SyntheticFocusEvent),
    canplay: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "canplay", SyntheticEvent),
    canplaythrough: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "canplaythrough", SyntheticEvent),
    change: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "change", SyntheticEvent),
    click: new NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "click", SyntheticMouseEvent),
    contextmenu: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "contextmenu", SyntheticPointerEvent),
    copy: new NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "copy", SyntheticClipboardEvent),
    cuechange: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "cuechange", SyntheticEvent),
    cut: new NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "cut", SyntheticClipboardEvent),
    dblclick: new NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dblclick", SyntheticMouseEvent),
    deactivate: new NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "deactivate", SyntheticUIEvent),
    drag: new NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drag", SyntheticDragEvent),
    dragend: new NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragend", SyntheticDragEvent),
    dragenter: new NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragenter", SyntheticDragEvent),
    dragleave: new NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragleave", SyntheticDragEvent),
    dragover: new NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragover", SyntheticDragEvent),
    dragstart: new NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragstart", SyntheticDragEvent),
    drop: new NativeEventSource<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drop", SyntheticDragEvent),
    durationchange: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "durationchange", SyntheticEvent),
    emptied: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "emptied", SyntheticEvent),
    encrypted: new NativeEventSource<SyntheticEventClass<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>>(NativeEventSourceFlags.Capture, "encrypted", SyntheticMediaEncryptedEvent),
    ended: new NativeEventSource<SyntheticEventClass<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>>(NativeEventSourceFlags.Capture, "ended", SyntheticMediaStreamErrorEvent),
    error: new NativeEventSource<SyntheticEventClass<ErrorEvent, SyntheticErrorEvent>>(NativeEventSourceFlags.Capture, "error", SyntheticErrorEvent),
    focus: new NativeEventSource<SyntheticEventClass<FocusEvent, SyntheticFocusEvent>>(NativeEventSourceFlags.Capture, "focus", SyntheticFocusEvent),
    gotpointercapture: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "gotpointercapture", SyntheticPointerEvent),
    input: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "input", SyntheticEvent),
    invalid: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "invalid", SyntheticEvent),
    keydown: new NativeEventSource<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keydown", SyntheticKeyboardEvent),
    keypress: new NativeEventSource<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keypress", SyntheticKeyboardEvent),
    keyup: new NativeEventSource<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keyup", SyntheticKeyboardEvent),
    load: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "load", SyntheticEvent),
    loadeddata: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "loadeddata", SyntheticEvent),
    loadedmetadata: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "loadedmetadata", SyntheticEvent),
    loadstart: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "loadstart", SyntheticEvent),
    lostpointercapture: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "lostpointercapture", SyntheticPointerEvent),
    mousedown: new NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousedown", SyntheticMouseEvent),
    mouseenter: new NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture, "mouseenter", SyntheticMouseEvent),
    mouseleave: new NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture, "mouseleave", SyntheticMouseEvent),
    mousemove: new NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousemove", SyntheticMouseEvent),
    mouseout: new NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseout", SyntheticMouseEvent),
    mouseover: new NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseover", SyntheticMouseEvent),
    mouseup: new NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseup", SyntheticMouseEvent),
    paste: new NativeEventSource<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "paste", SyntheticClipboardEvent),
    pause: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "pause", SyntheticEvent),
    play: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "play", SyntheticEvent),
    playing: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "playing", SyntheticEvent),
    pointercancel: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointercancel", SyntheticPointerEvent),
    pointerdown: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerdown", SyntheticPointerEvent),
    pointerenter: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "pointerenter", SyntheticPointerEvent),
    pointerleave: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "pointerleave", SyntheticPointerEvent),
    pointermove: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointermove", SyntheticPointerEvent),
    pointerout: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerout", SyntheticPointerEvent),
    pointerover: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerover", SyntheticPointerEvent),
    pointerup: new NativeEventSource<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerup", SyntheticPointerEvent),
    progress: new NativeEventSource<SyntheticEventClass<ProgressEvent, SyntheticProgressEvent>>(NativeEventSourceFlags.Capture, "progress", SyntheticProgressEvent),
    ratechange: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "ratechange", SyntheticEvent),
    reset: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "reset", SyntheticEvent),
    scroll: new NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture, "scroll", SyntheticUIEvent),
    seeked: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "seeked", SyntheticEvent),
    seeking: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "seeking", SyntheticEvent),
    select: new NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "select", SyntheticUIEvent),
    selectstart: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "selectstart", SyntheticEvent),
    stalled: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "stalled", SyntheticEvent),
    submit: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "submit", SyntheticEvent),
    suspend: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "suspend", SyntheticEvent),
    timeupdate: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "timeupdate", SyntheticEvent),
    touchcancel: new NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchcancel", SyntheticTouchEvent),
    touchend: new NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchend", SyntheticTouchEvent),
    touchmove: new NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchmove", SyntheticTouchEvent),
    touchstart: new NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchstart", SyntheticTouchEvent),
    unload: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "unload", SyntheticEvent),
    volumechange: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "volumechange", SyntheticEvent),
    waiting: new NativeEventSource<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventSourceFlags.Capture, "waiting", SyntheticEvent),
    wheel: new NativeEventSource<SyntheticEventClass<WheelEvent, SyntheticWheelEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "wheel", SyntheticWheelEvent),
};

export interface NativeActiveEventSourcesList {
    mousedown: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseenter: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseleave: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mousemove: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseout: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseover: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseup: NativeEventSource<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    scroll: NativeEventSource<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    touchcancel: NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchend: NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchmove: NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchstart: NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    wheel: NativeEventSource<SyntheticEventClass<WheelEvent, SyntheticWheelEvent>>;
}

export const NativeActiveEventSources = {
    touchend: new NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchend", SyntheticTouchEvent),
    touchmove: new NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchmove", SyntheticTouchEvent),
    touchstart: new NativeEventSource<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchstart", SyntheticTouchEvent),
    wheel: new NativeEventSource<SyntheticEventClass<WheelEvent, SyntheticWheelEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "wheel", SyntheticWheelEvent),
};

/**
 * Events.
 */
export const Events = {
    onAbort: function createAbortEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.abort.eventSource, handler, capture);
    },
    onActivate: function createActivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.activate.eventSource, handler, capture);
    },
    onAriaRequest: function createAriarequestEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.ariarequest.eventSource, handler, capture);
    },
    onBeforeActivate: function createBeforeactivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.beforeactivate.eventSource, handler, capture);
    },
    onBeforeCopy: function createBeforecopyEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventSources.beforecopy.eventSource, handler, capture);
    },
    onBeforeCut: function createBeforecutEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventSources.beforecut.eventSource, handler, capture);
    },
    onBeforeDeactivate: function createBeforedeactivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.beforedeactivate.eventSource, handler, capture);
    },
    onBeforePaste: function createBeforepasteEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventSources.beforepaste.eventSource, handler, capture);
    },
    onBlur: function createBlurEventHandler(
        handler: (ev: SyntheticFocusEvent) => void,
        capture = false,
    ): EventHandler<SyntheticFocusEvent> {
        return createEventHandler<SyntheticFocusEvent>(NativeEventSources.blur.eventSource, handler, capture);
    },
    onCanPlay: function createCanplayEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.canplay.eventSource, handler, capture);
    },
    onCanPlaythrough: function createCanplaythroughEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.canplaythrough.eventSource, handler, capture);
    },
    onChange: function createChangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.change.eventSource, handler, capture);
    },
    onClick: function createClickEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventSources.click.eventSource, handler, capture);
    },
    onContextMenu: function createContextmenuEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.contextmenu.eventSource, handler, capture);
    },
    onCopy: function createCopyEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventSources.copy.eventSource, handler, capture);
    },
    onCueChange: function createCuechangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.cuechange.eventSource, handler, capture);
    },
    onCut: function createCutEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventSources.cut.eventSource, handler, capture);
    },
    onDoubleClick: function createDblclickEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventSources.dblclick.eventSource, handler, capture);
    },
    onDeactivate: function createDeactivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.deactivate.eventSource, handler, capture);
    },
    onDrag: function createDragEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventSources.drag.eventSource, handler, capture);
    },
    onDragEnd: function createDragendEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventSources.dragend.eventSource, handler, capture);
    },
    onDragEnter: function createDragenterEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventSources.dragenter.eventSource, handler, capture);
    },
    onDragLeave: function createDragleaveEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventSources.dragleave.eventSource, handler, capture);
    },
    onDragOver: function createDragoverEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventSources.dragover.eventSource, handler, capture);
    },
    onDragStart: function createDragstartEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventSources.dragstart.eventSource, handler, capture);
    },
    onDrop: function createDropEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventSources.drop.eventSource, handler, capture);
    },
    onDurationChange: function createDurationchangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.durationchange.eventSource, handler, capture);
    },
    onEmptied: function createEmptiedEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.emptied.eventSource, handler, capture);
    },
    onEncrypted: function createEncryptedEventHandler(
        handler: (ev: SyntheticMediaEncryptedEvent) => void,
        capture = false,
    ): EventHandler<SyntheticMediaEncryptedEvent> {
        return createEventHandler<SyntheticMediaEncryptedEvent>(NativeEventSources.encrypted.eventSource, handler, capture);
    },
    onEnded: function createEndedEventHandler(
        handler: (ev: SyntheticMediaStreamErrorEvent) => void,
        capture = false,
    ): EventHandler<SyntheticMediaStreamErrorEvent> {
        return createEventHandler<SyntheticMediaStreamErrorEvent>(NativeEventSources.ended.eventSource, handler, capture);
    },
    onError: function createErrorEventHandler(
        handler: (ev: SyntheticErrorEvent) => void,
        capture = false,
    ): EventHandler<SyntheticErrorEvent> {
        return createEventHandler<SyntheticErrorEvent>(NativeEventSources.error.eventSource, handler, capture);
    },
    onFocus: function createFocusEventHandler(
        handler: (ev: SyntheticFocusEvent) => void,
        capture = false,
    ): EventHandler<SyntheticFocusEvent> {
        return createEventHandler<SyntheticFocusEvent>(NativeEventSources.focus.eventSource, handler, capture);
    },
    onGotPointerCapture: function createGotpointercaptureEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.gotpointercapture.eventSource, handler, capture);
    },
    onInput: function createInputEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.input.eventSource, handler, capture);
    },
    onInvalid: function createInvalidEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.invalid.eventSource, handler, capture);
    },
    onKeyDown: function createKeydownEventHandler(
        handler: (ev: SyntheticKeyboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticKeyboardEvent> {
        return createEventHandler<SyntheticKeyboardEvent>(NativeEventSources.keydown.eventSource, handler, capture);
    },
    onKeyPress: function createKeypressEventHandler(
        handler: (ev: SyntheticKeyboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticKeyboardEvent> {
        return createEventHandler<SyntheticKeyboardEvent>(NativeEventSources.keypress.eventSource, handler, capture);
    },
    onKeyUp: function createKeyupEventHandler(
        handler: (ev: SyntheticKeyboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticKeyboardEvent> {
        return createEventHandler<SyntheticKeyboardEvent>(NativeEventSources.keyup.eventSource, handler, capture);
    },
    onLoad: function createLoadEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.load.eventSource, handler, capture);
    },
    onLoadedData: function createLoadeddataEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.loadeddata.eventSource, handler, capture);
    },
    onLoadedMetadata: function createLoadedmetadataEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.loadedmetadata.eventSource, handler, capture);
    },
    onLoadStart: function createLoadstartEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.loadstart.eventSource, handler, capture);
    },
    onLostPointerCapture: function createLostpointercaptureEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.lostpointercapture.eventSource, handler, capture);
    },
    onMouseDown: function createMousedownEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventSources.mousedown.eventSource, handler, capture);
    },
    onMouseEnter: function createMouseenterEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventSources.mouseenter.eventSource, handler, capture);
    },
    onMouseLeave: function createMouseleaveEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventSources.mouseleave.eventSource, handler, capture);
    },
    onMouseMove: function createMousemoveEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventSources.mousemove.eventSource, handler, capture);
    },
    onMouseOut: function createMouseoutEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventSources.mouseout.eventSource, handler, capture);
    },
    onMouseOver: function createMouseoverEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventSources.mouseover.eventSource, handler, capture);
    },
    onMouseUp: function createMouseupEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventSources.mouseup.eventSource, handler, capture);
    },
    onPaste: function createPasteEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventSources.paste.eventSource, handler, capture);
    },
    onPause: function createPauseEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.pause.eventSource, handler, capture);
    },
    onPlay: function createPlayEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.play.eventSource, handler, capture);
    },
    onPlaying: function createPlayingEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.playing.eventSource, handler, capture);
    },
    onPointerCancel: function createPointercancelEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.pointercancel.eventSource, handler, capture);
    },
    onPointerDown: function createPointerdownEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.pointerdown.eventSource, handler, capture);
    },
    onPointerEnter: function createPointerenterEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.pointerenter.eventSource, handler, capture);
    },
    onPointerLeave: function createPointerleaveEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.pointerleave.eventSource, handler, capture);
    },
    onPointerMove: function createPointermoveEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.pointermove.eventSource, handler, capture);
    },
    onPointerOut: function createPointeroutEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.pointerout.eventSource, handler, capture);
    },
    onPointerOver: function createPointeroverEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.pointerover.eventSource, handler, capture);
    },
    onPointerUp: function createPointerupEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventSources.pointerup.eventSource, handler, capture);
    },
    onProgress: function createProgressEventHandler(
        handler: (ev: SyntheticProgressEvent) => void,
        capture = false,
    ): EventHandler<SyntheticProgressEvent> {
        return createEventHandler<SyntheticProgressEvent>(NativeEventSources.progress.eventSource, handler, capture);
    },
    onRateChange: function createRatechangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.ratechange.eventSource, handler, capture);
    },
    onReset: function createResetEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.reset.eventSource, handler, capture);
    },
    onScroll: function createScrollEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.scroll.eventSource, handler, capture);
    },
    onSeeked: function createSeekedEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.seeked.eventSource, handler, capture);
    },
    onSeeking: function createSeekingEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.seeking.eventSource, handler, capture);
    },
    onSelect: function createSelectEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.select.eventSource, handler, capture);
    },
    onSelectStart: function createSelectstartEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.selectstart.eventSource, handler, capture);
    },
    onStalled: function createStalledEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.stalled.eventSource, handler, capture);
    },
    onSubmit: function createSubmitEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.submit.eventSource, handler, capture);
    },
    onSuspend: function createSuspendEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.suspend.eventSource, handler, capture);
    },
    onTimeUpdate: function createTimeupdateEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.timeupdate.eventSource, handler, capture);
    },
    onTouchCancel: function createTouchcancelEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeEventSources.touchcancel.eventSource, handler, capture);
    },
    onTouchEnd: function createTouchendEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeEventSources.touchend.eventSource, handler, capture);
    },
    onTouchMove: function createTouchmoveEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeEventSources.touchmove.eventSource, handler, capture);
    },
    onTouchStart: function createTouchstartEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeEventSources.touchstart.eventSource, handler, capture);
    },
    onUnload: function createUnloadEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.unload.eventSource, handler, capture);
    },
    onVolumeChange: function createVolumechangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.volumechange.eventSource, handler, capture);
    },
    onWaiting: function createWaitingEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventSources.waiting.eventSource, handler, capture);
    },
    onWheel: function createWheelEventHandler(
        handler: (ev: SyntheticWheelEvent) => void,
        capture = false,
    ): EventHandler<SyntheticWheelEvent> {
        return createEventHandler<SyntheticWheelEvent>(NativeEventSources.wheel.eventSource, handler, capture);
    },
};

/**
 * List of Events with disabled passive flag.
 */
export const ActiveEvents = {
    onTouchEnd: function createTouchendEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeActiveEventSources.touchend.eventSource, handler, capture);
    },
    onTouchMove: function createTouchmoveEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeActiveEventSources.touchmove.eventSource, handler, capture);
    },
    onTouchStart: function createTouchstartEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeActiveEventSources.touchstart.eventSource, handler, capture);
    },
    onWheel: function createWheelEventHandler(
        handler: (ev: SyntheticWheelEvent) => void,
        capture = false,
    ): EventHandler<SyntheticWheelEvent> {
        return createEventHandler<SyntheticWheelEvent>(NativeActiveEventSources.wheel.eventSource, handler, capture);
    },
};
/* tslint:enable:max-line-length */
