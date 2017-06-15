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

export interface NativeEventSourceList {
    abort: NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    activate: NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    ariarequest: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticUIEvent<UIEvent>>>;
    beforeactivate: NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    beforecopy: NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    beforecut: NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    beforedeactivate: NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    beforepaste: NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    blur: NativeEventSource<SyntheticNativeEventClass<FocusEvent, SyntheticFocusEvent>>;
    canplay: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    canplaythrough: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    change: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    click: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    contextmenu: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    copy: NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    cuechange: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    cut: NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    dblclick: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    deactivate: NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    drag: NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>;
    dragend: NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>;
    dragenter: NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>;
    dragleave: NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>;
    dragover: NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>;
    dragstart: NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>;
    drop: NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>;
    durationchange: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    emptied: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    encrypted: NativeEventSource<SyntheticNativeEventClass<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>>;
    ended: NativeEventSource<SyntheticNativeEventClass<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>>;
    error: NativeEventSource<SyntheticNativeEventClass<ErrorEvent, SyntheticErrorEvent>>;
    focus: NativeEventSource<SyntheticNativeEventClass<FocusEvent, SyntheticFocusEvent>>;
    gotpointercapture: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    input: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    invalid: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    keydown: NativeEventSource<SyntheticNativeEventClass<KeyboardEvent, SyntheticKeyboardEvent>>;
    keypress: NativeEventSource<SyntheticNativeEventClass<KeyboardEvent, SyntheticKeyboardEvent>>;
    keyup: NativeEventSource<SyntheticNativeEventClass<KeyboardEvent, SyntheticKeyboardEvent>>;
    load: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    loadeddata: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    loadedmetadata: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    loadstart: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    lostpointercapture: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    mousedown: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseenter: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseleave: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mousemove: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseout: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseover: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseup: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    paste: NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    pause: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    play: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    playing: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    pointercancel: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerdown: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerenter: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerleave: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointermove: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerout: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerover: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerup: NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>;
    progress: NativeEventSource<SyntheticNativeEventClass<ProgressEvent, SyntheticProgressEvent>>;
    ratechange: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    reset: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    scroll: NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    seeked: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    seeking: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    select: NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    selectstart: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    stalled: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    submit: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    suspend: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    timeupdate: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    touchcancel: NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchend: NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchmove: NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchstart: NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>;
    unload: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    volumechange: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    waiting: NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>;
    wheel: NativeEventSource<SyntheticNativeEventClass<WheelEvent, SyntheticWheelEvent>>;
}

/* tslint:disable:max-line-length */
export const NativeEventSources: NativeEventSourceList = {
    abort: new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture, "abort", SyntheticUIEvent),
    activate: new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "activate", SyntheticUIEvent),
    ariarequest: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "ariarequest", SyntheticUIEvent),
    beforeactivate: new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforeactivate", SyntheticUIEvent),
    beforecopy: new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture, "beforecopy", SyntheticClipboardEvent),
    beforecut: new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforecut", SyntheticClipboardEvent),
    beforedeactivate: new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforedeactivate", SyntheticUIEvent),
    beforepaste: new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforepaste", SyntheticClipboardEvent),
    blur: new NativeEventSource<SyntheticNativeEventClass<FocusEvent, SyntheticFocusEvent>>(NativeEventSourceFlags.Capture, "blur", SyntheticFocusEvent),
    canplay: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "canplay", SyntheticNativeEvent),
    canplaythrough: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "canplaythrough", SyntheticNativeEvent),
    change: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "change", SyntheticNativeEvent),
    click: new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "click", SyntheticMouseEvent),
    contextmenu: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "contextmenu", SyntheticPointerEvent),
    copy: new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "copy", SyntheticClipboardEvent),
    cuechange: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "cuechange", SyntheticNativeEvent),
    cut: new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "cut", SyntheticClipboardEvent),
    dblclick: new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dblclick", SyntheticMouseEvent),
    deactivate: new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "deactivate", SyntheticUIEvent),
    drag: new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drag", SyntheticDragEvent),
    dragend: new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragend", SyntheticDragEvent),
    dragenter: new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragenter", SyntheticDragEvent),
    dragleave: new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragleave", SyntheticDragEvent),
    dragover: new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragover", SyntheticDragEvent),
    dragstart: new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragstart", SyntheticDragEvent),
    drop: new NativeEventSource<SyntheticNativeEventClass<DragEvent, SyntheticDragEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drop", SyntheticDragEvent),
    durationchange: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "durationchange", SyntheticNativeEvent),
    emptied: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "emptied", SyntheticNativeEvent),
    encrypted: new NativeEventSource<SyntheticNativeEventClass<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>>(NativeEventSourceFlags.Capture, "encrypted", SyntheticMediaEncryptedEvent),
    ended: new NativeEventSource<SyntheticNativeEventClass<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>>(NativeEventSourceFlags.Capture, "ended", SyntheticMediaStreamErrorEvent),
    error: new NativeEventSource<SyntheticNativeEventClass<ErrorEvent, SyntheticErrorEvent>>(NativeEventSourceFlags.Capture, "error", SyntheticErrorEvent),
    focus: new NativeEventSource<SyntheticNativeEventClass<FocusEvent, SyntheticFocusEvent>>(NativeEventSourceFlags.Capture, "focus", SyntheticFocusEvent),
    gotpointercapture: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "gotpointercapture", SyntheticPointerEvent),
    input: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "input", SyntheticNativeEvent),
    invalid: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "invalid", SyntheticNativeEvent),
    keydown: new NativeEventSource<SyntheticNativeEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keydown", SyntheticKeyboardEvent),
    keypress: new NativeEventSource<SyntheticNativeEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keypress", SyntheticKeyboardEvent),
    keyup: new NativeEventSource<SyntheticNativeEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keyup", SyntheticKeyboardEvent),
    load: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "load", SyntheticNativeEvent),
    loadeddata: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "loadeddata", SyntheticNativeEvent),
    loadedmetadata: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "loadedmetadata", SyntheticNativeEvent),
    loadstart: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "loadstart", SyntheticNativeEvent),
    lostpointercapture: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "lostpointercapture", SyntheticPointerEvent),
    mousedown: new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousedown", SyntheticMouseEvent),
    mouseenter: new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture, "mouseenter", SyntheticMouseEvent),
    mouseleave: new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture, "mouseleave", SyntheticMouseEvent),
    mousemove: new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousemove", SyntheticMouseEvent),
    mouseout: new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseout", SyntheticMouseEvent),
    mouseover: new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseover", SyntheticMouseEvent),
    mouseup: new NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseup", SyntheticMouseEvent),
    paste: new NativeEventSource<SyntheticNativeEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "paste", SyntheticClipboardEvent),
    pause: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "pause", SyntheticNativeEvent),
    play: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "play", SyntheticNativeEvent),
    playing: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "playing", SyntheticNativeEvent),
    pointercancel: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointercancel", SyntheticPointerEvent),
    pointerdown: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerdown", SyntheticPointerEvent),
    pointerenter: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "pointerenter", SyntheticPointerEvent),
    pointerleave: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture, "pointerleave", SyntheticPointerEvent),
    pointermove: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointermove", SyntheticPointerEvent),
    pointerout: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerout", SyntheticPointerEvent),
    pointerover: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerover", SyntheticPointerEvent),
    pointerup: new NativeEventSource<SyntheticNativeEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerup", SyntheticPointerEvent),
    progress: new NativeEventSource<SyntheticNativeEventClass<ProgressEvent, SyntheticProgressEvent>>(NativeEventSourceFlags.Capture, "progress", SyntheticProgressEvent),
    ratechange: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "ratechange", SyntheticNativeEvent),
    reset: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "reset", SyntheticNativeEvent),
    scroll: new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture, "scroll", SyntheticUIEvent),
    seeked: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "seeked", SyntheticNativeEvent),
    seeking: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "seeking", SyntheticNativeEvent),
    select: new NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "select", SyntheticUIEvent),
    selectstart: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "selectstart", SyntheticNativeEvent),
    stalled: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "stalled", SyntheticNativeEvent),
    submit: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "submit", SyntheticNativeEvent),
    suspend: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "suspend", SyntheticNativeEvent),
    timeupdate: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "timeupdate", SyntheticNativeEvent),
    touchcancel: new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchcancel", SyntheticTouchEvent),
    touchend: new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchend", SyntheticTouchEvent),
    touchmove: new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchmove", SyntheticTouchEvent),
    touchstart: new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchstart", SyntheticTouchEvent),
    unload: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "unload", SyntheticNativeEvent),
    volumechange: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "volumechange", SyntheticNativeEvent),
    waiting: new NativeEventSource<SyntheticNativeEventClass<Event, SyntheticNativeEvent<Event>>>(NativeEventSourceFlags.Capture, "waiting", SyntheticNativeEvent),
    wheel: new NativeEventSource<SyntheticNativeEventClass<WheelEvent, SyntheticWheelEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "wheel", SyntheticWheelEvent),
};

export interface NativeActiveEventSourcesList {
    mousedown: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseenter: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseleave: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mousemove: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseout: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseover: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseup: NativeEventSource<SyntheticNativeEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    scroll: NativeEventSource<SyntheticNativeEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    touchcancel: NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchend: NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchmove: NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchstart: NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>;
    wheel: NativeEventSource<SyntheticNativeEventClass<WheelEvent, SyntheticWheelEvent>>;
}

export const NativeActiveEventSources = {
    touchend: new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchend", SyntheticTouchEvent),
    touchmove: new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchmove", SyntheticTouchEvent),
    touchstart: new NativeEventSource<SyntheticNativeEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchstart", SyntheticTouchEvent),
    wheel: new NativeEventSource<SyntheticNativeEventClass<WheelEvent, SyntheticWheelEvent>>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "wheel", SyntheticWheelEvent),
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
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.canplay.eventSource, handler, capture);
    },
    onCanPlaythrough: function createCanplaythroughEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.canplaythrough.eventSource, handler, capture);
    },
    onChange: function createChangeEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.change.eventSource, handler, capture);
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
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.cuechange.eventSource, handler, capture);
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
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.durationchange.eventSource, handler, capture);
    },
    onEmptied: function createEmptiedEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.emptied.eventSource, handler, capture);
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
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.input.eventSource, handler, capture);
    },
    onInvalid: function createInvalidEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.invalid.eventSource, handler, capture);
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
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.load.eventSource, handler, capture);
    },
    onLoadedData: function createLoadeddataEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.loadeddata.eventSource, handler, capture);
    },
    onLoadedMetadata: function createLoadedmetadataEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.loadedmetadata.eventSource, handler, capture);
    },
    onLoadStart: function createLoadstartEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.loadstart.eventSource, handler, capture);
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
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.pause.eventSource, handler, capture);
    },
    onPlay: function createPlayEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.play.eventSource, handler, capture);
    },
    onPlaying: function createPlayingEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.playing.eventSource, handler, capture);
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
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.ratechange.eventSource, handler, capture);
    },
    onReset: function createResetEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.reset.eventSource, handler, capture);
    },
    onScroll: function createScrollEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.scroll.eventSource, handler, capture);
    },
    onSeeked: function createSeekedEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.seeked.eventSource, handler, capture);
    },
    onSeeking: function createSeekingEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.seeking.eventSource, handler, capture);
    },
    onSelect: function createSelectEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventSources.select.eventSource, handler, capture);
    },
    onSelectStart: function createSelectstartEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.selectstart.eventSource, handler, capture);
    },
    onStalled: function createStalledEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.stalled.eventSource, handler, capture);
    },
    onSubmit: function createSubmitEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.submit.eventSource, handler, capture);
    },
    onSuspend: function createSuspendEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.suspend.eventSource, handler, capture);
    },
    onTimeUpdate: function createTimeupdateEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.timeupdate.eventSource, handler, capture);
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
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.unload.eventSource, handler, capture);
    },
    onVolumeChange: function createVolumechangeEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.volumechange.eventSource, handler, capture);
    },
    onWaiting: function createWaitingEventHandler(
        handler: (ev: SyntheticNativeEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticNativeEvent<Event>> {
        return createEventHandler<SyntheticNativeEvent<Event>>(NativeEventSources.waiting.eventSource, handler, capture);
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
