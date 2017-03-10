/**
 * Event Handlers.
 *
 * Optimizing compilers should inline all this functions and completely remove unused code.
 */

import { EventHandlerFlags, NativeEventDispatcherFlags } from "./flags";
import { EventHandler } from "./event_handler";
import { EventDispatcher } from "./event_dispatcher";
import { NativeEventDispatcher } from "./native_event_dispatcher";
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
    dispatcher: EventDispatcher,
    fn: (ev: E) => void,
    capture?: boolean,
): EventHandler<E> {
    const handler = fn as EventHandler<E>;
    handler.dispatcher = dispatcher;
    handler.flags = capture ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble;
    return handler;
}

export interface NativeEventDispatchersList {
    abort: NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    activate: NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    ariarequest: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticUIEvent<UIEvent>>>;
    beforeactivate: NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    beforecopy: NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    beforecut: NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    beforedeactivate: NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    beforepaste: NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    blur: NativeEventDispatcher<SyntheticEventClass<FocusEvent, SyntheticFocusEvent>>;
    canplay: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    canplaythrough: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    change: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    click: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    contextmenu: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    copy: NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    cuechange: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    cut: NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    dblclick: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    deactivate: NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    drag: NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragend: NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragenter: NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragleave: NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragover: NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    dragstart: NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    drop: NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>;
    durationchange: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    emptied: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    encrypted: NativeEventDispatcher<SyntheticEventClass<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>>;
    ended: NativeEventDispatcher<SyntheticEventClass<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>>;
    error: NativeEventDispatcher<SyntheticEventClass<ErrorEvent, SyntheticErrorEvent>>;
    focus: NativeEventDispatcher<SyntheticEventClass<FocusEvent, SyntheticFocusEvent>>;
    gotpointercapture: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    input: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    invalid: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    keydown: NativeEventDispatcher<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>;
    keypress: NativeEventDispatcher<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>;
    keyup: NativeEventDispatcher<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>;
    load: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    loadeddata: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    loadedmetadata: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    loadstart: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    lostpointercapture: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    mousedown: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseenter: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseleave: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mousemove: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseout: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseover: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseup: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    paste: NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>;
    pause: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    play: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    playing: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    pointercancel: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerdown: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerenter: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerleave: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointermove: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerout: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerover: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    pointerup: NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>;
    progress: NativeEventDispatcher<SyntheticEventClass<ProgressEvent, SyntheticProgressEvent>>;
    ratechange: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    reset: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    scroll: NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    seeked: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    seeking: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    select: NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    selectstart: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    stalled: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    submit: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    suspend: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    timeupdate: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    touchcancel: NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchend: NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchmove: NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchstart: NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    unload: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    volumechange: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    waiting: NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>;
    wheel: NativeEventDispatcher<SyntheticEventClass<WheelEvent, SyntheticWheelEvent>>;
};

/* tslint:disable:max-line-length */
export const NativeEventDispatchers: NativeEventDispatchersList = {
    abort: new NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventDispatcherFlags.Capture, "abort", SyntheticUIEvent),
    activate: new NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "activate", SyntheticUIEvent),
    ariarequest: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticUIEvent<UIEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "ariarequest", SyntheticUIEvent),
    beforeactivate: new NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "beforeactivate", SyntheticUIEvent),
    beforecopy: new NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventDispatcherFlags.Capture, "beforecopy", SyntheticClipboardEvent),
    beforecut: new NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "beforecut", SyntheticClipboardEvent),
    beforedeactivate: new NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "beforedeactivate", SyntheticUIEvent),
    beforepaste: new NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "beforepaste", SyntheticClipboardEvent),
    blur: new NativeEventDispatcher<SyntheticEventClass<FocusEvent, SyntheticFocusEvent>>(NativeEventDispatcherFlags.Capture, "blur", SyntheticFocusEvent),
    canplay: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "canplay", SyntheticEvent),
    canplaythrough: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "canplaythrough", SyntheticEvent),
    change: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "change", SyntheticEvent),
    click: new NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "click", SyntheticMouseEvent),
    contextmenu: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "contextmenu", SyntheticPointerEvent),
    copy: new NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "copy", SyntheticClipboardEvent),
    cuechange: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "cuechange", SyntheticEvent),
    cut: new NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "cut", SyntheticClipboardEvent),
    dblclick: new NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dblclick", SyntheticMouseEvent),
    deactivate: new NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "deactivate", SyntheticUIEvent),
    drag: new NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "drag", SyntheticDragEvent),
    dragend: new NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragend", SyntheticDragEvent),
    dragenter: new NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragenter", SyntheticDragEvent),
    dragleave: new NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragleave", SyntheticDragEvent),
    dragover: new NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragover", SyntheticDragEvent),
    dragstart: new NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragstart", SyntheticDragEvent),
    drop: new NativeEventDispatcher<SyntheticEventClass<DragEvent, SyntheticDragEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "drop", SyntheticDragEvent),
    durationchange: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "durationchange", SyntheticEvent),
    emptied: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "emptied", SyntheticEvent),
    encrypted: new NativeEventDispatcher<SyntheticEventClass<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>>(NativeEventDispatcherFlags.Capture, "encrypted", SyntheticMediaEncryptedEvent),
    ended: new NativeEventDispatcher<SyntheticEventClass<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>>(NativeEventDispatcherFlags.Capture, "ended", SyntheticMediaStreamErrorEvent),
    error: new NativeEventDispatcher<SyntheticEventClass<ErrorEvent, SyntheticErrorEvent>>(NativeEventDispatcherFlags.Capture, "error", SyntheticErrorEvent),
    focus: new NativeEventDispatcher<SyntheticEventClass<FocusEvent, SyntheticFocusEvent>>(NativeEventDispatcherFlags.Capture, "focus", SyntheticFocusEvent),
    gotpointercapture: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture, "gotpointercapture", SyntheticPointerEvent),
    input: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "input", SyntheticEvent),
    invalid: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "invalid", SyntheticEvent),
    keydown: new NativeEventDispatcher<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "keydown", SyntheticKeyboardEvent),
    keypress: new NativeEventDispatcher<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "keypress", SyntheticKeyboardEvent),
    keyup: new NativeEventDispatcher<SyntheticEventClass<KeyboardEvent, SyntheticKeyboardEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "keyup", SyntheticKeyboardEvent),
    load: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "load", SyntheticEvent),
    loadeddata: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "loadeddata", SyntheticEvent),
    loadedmetadata: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "loadedmetadata", SyntheticEvent),
    loadstart: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "loadstart", SyntheticEvent),
    lostpointercapture: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture, "lostpointercapture", SyntheticPointerEvent),
    mousedown: new NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mousedown", SyntheticMouseEvent),
    mouseenter: new NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventDispatcherFlags.Capture, "mouseenter", SyntheticMouseEvent),
    mouseleave: new NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventDispatcherFlags.Capture, "mouseleave", SyntheticMouseEvent),
    mousemove: new NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mousemove", SyntheticMouseEvent),
    mouseout: new NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mouseout", SyntheticMouseEvent),
    mouseover: new NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mouseover", SyntheticMouseEvent),
    mouseup: new NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mouseup", SyntheticMouseEvent),
    paste: new NativeEventDispatcher<SyntheticEventClass<ClipboardEvent, SyntheticClipboardEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "paste", SyntheticClipboardEvent),
    pause: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "pause", SyntheticEvent),
    play: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "play", SyntheticEvent),
    playing: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "playing", SyntheticEvent),
    pointercancel: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointercancel", SyntheticPointerEvent),
    pointerdown: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointerdown", SyntheticPointerEvent),
    pointerenter: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture, "pointerenter", SyntheticPointerEvent),
    pointerleave: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture, "pointerleave", SyntheticPointerEvent),
    pointermove: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointermove", SyntheticPointerEvent),
    pointerout: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointerout", SyntheticPointerEvent),
    pointerover: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointerover", SyntheticPointerEvent),
    pointerup: new NativeEventDispatcher<SyntheticEventClass<PointerEvent, SyntheticPointerEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointerup", SyntheticPointerEvent),
    progress: new NativeEventDispatcher<SyntheticEventClass<ProgressEvent, SyntheticProgressEvent>>(NativeEventDispatcherFlags.Capture, "progress", SyntheticProgressEvent),
    ratechange: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "ratechange", SyntheticEvent),
    reset: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "reset", SyntheticEvent),
    scroll: new NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventDispatcherFlags.Capture, "scroll", SyntheticUIEvent),
    seeked: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "seeked", SyntheticEvent),
    seeking: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "seeking", SyntheticEvent),
    select: new NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "select", SyntheticUIEvent),
    selectstart: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "selectstart", SyntheticEvent),
    stalled: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "stalled", SyntheticEvent),
    submit: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "submit", SyntheticEvent),
    suspend: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "suspend", SyntheticEvent),
    timeupdate: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "timeupdate", SyntheticEvent),
    touchcancel: new NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "touchcancel", SyntheticTouchEvent),
    touchend: new NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "touchend", SyntheticTouchEvent),
    touchmove: new NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "touchmove", SyntheticTouchEvent),
    touchstart: new NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "touchstart", SyntheticTouchEvent),
    unload: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "unload", SyntheticEvent),
    volumechange: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "volumechange", SyntheticEvent),
    waiting: new NativeEventDispatcher<SyntheticEventClass<Event, SyntheticEvent<Event>>>(NativeEventDispatcherFlags.Capture, "waiting", SyntheticEvent),
    wheel: new NativeEventDispatcher<SyntheticEventClass<WheelEvent, SyntheticWheelEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "wheel", SyntheticWheelEvent),
};

export interface NativeActiveEventDispatchersList {
    mousedown: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseenter: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseleave: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mousemove: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseout: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseover: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    mouseup: NativeEventDispatcher<SyntheticEventClass<MouseEvent, SyntheticMouseEvent<MouseEvent>>>;
    scroll: NativeEventDispatcher<SyntheticEventClass<UIEvent, SyntheticUIEvent<UIEvent>>>;
    touchcancel: NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchend: NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchmove: NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    touchstart: NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>;
    wheel: NativeEventDispatcher<SyntheticEventClass<WheelEvent, SyntheticWheelEvent>>;
}

export const NativeActiveEventDispatchers = {
    touchend: new NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "touchend", SyntheticTouchEvent),
    touchmove: new NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "touchmove", SyntheticTouchEvent),
    touchstart: new NativeEventDispatcher<SyntheticEventClass<TouchEvent, SyntheticTouchEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "touchstart", SyntheticTouchEvent),
    wheel: new NativeEventDispatcher<SyntheticEventClass<WheelEvent, SyntheticWheelEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "wheel", SyntheticWheelEvent),
};

/**
 * Events.
 */
export const Events = {
    onAbort: function createAbortEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.abort, handler, capture);
    },
    onActivate: function createActivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.activate, handler, capture);
    },
    onAriaRequest: function createAriarequestEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.ariarequest, handler, capture);
    },
    onBeforeActivate: function createBeforeactivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.beforeactivate, handler, capture);
    },
    onBeforeCopy: function createBeforecopyEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventDispatchers.beforecopy, handler, capture);
    },
    onBeforeCut: function createBeforecutEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventDispatchers.beforecut, handler, capture);
    },
    onBeforeDeactivate: function createBeforedeactivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.beforedeactivate, handler, capture);
    },
    onBeforePaste: function createBeforepasteEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventDispatchers.beforepaste, handler, capture);
    },
    onBlur: function createBlurEventHandler(
        handler: (ev: SyntheticFocusEvent) => void,
        capture = false,
    ): EventHandler<SyntheticFocusEvent> {
        return createEventHandler<SyntheticFocusEvent>(NativeEventDispatchers.blur, handler, capture);
    },
    onCanPlay: function createCanplayEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.canplay, handler, capture);
    },
    onCanPlaythrough: function createCanplaythroughEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.canplaythrough, handler, capture);
    },
    onChange: function createChangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.change, handler, capture);
    },
    onClick: function createClickEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.click, handler, capture);
    },
    onContextMenu: function createContextmenuEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.contextmenu, handler, capture);
    },
    onCopy: function createCopyEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventDispatchers.copy, handler, capture);
    },
    onCueChange: function createCuechangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.cuechange, handler, capture);
    },
    onCut: function createCutEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventDispatchers.cut, handler, capture);
    },
    onDoubleClick: function createDblclickEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.dblclick, handler, capture);
    },
    onDeactivate: function createDeactivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.deactivate, handler, capture);
    },
    onDrag: function createDragEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventDispatchers.drag, handler, capture);
    },
    onDragEnd: function createDragendEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventDispatchers.dragend, handler, capture);
    },
    onDragEnter: function createDragenterEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventDispatchers.dragenter, handler, capture);
    },
    onDragLeave: function createDragleaveEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventDispatchers.dragleave, handler, capture);
    },
    onDragOver: function createDragoverEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventDispatchers.dragover, handler, capture);
    },
    onDragStart: function createDragstartEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventDispatchers.dragstart, handler, capture);
    },
    onDrop: function createDropEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<SyntheticDragEvent> {
        return createEventHandler<SyntheticDragEvent>(NativeEventDispatchers.drop, handler, capture);
    },
    onDurationChange: function createDurationchangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.durationchange, handler, capture);
    },
    onEmptied: function createEmptiedEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.emptied, handler, capture);
    },
    onEncrypted: function createEncryptedEventHandler(
        handler: (ev: SyntheticMediaEncryptedEvent) => void,
        capture = false,
    ): EventHandler<SyntheticMediaEncryptedEvent> {
        return createEventHandler<SyntheticMediaEncryptedEvent>(NativeEventDispatchers.encrypted, handler, capture);
    },
    onEnded: function createEndedEventHandler(
        handler: (ev: SyntheticMediaStreamErrorEvent) => void,
        capture = false,
    ): EventHandler<SyntheticMediaStreamErrorEvent> {
        return createEventHandler<SyntheticMediaStreamErrorEvent>(NativeEventDispatchers.ended, handler, capture);
    },
    onError: function createErrorEventHandler(
        handler: (ev: SyntheticErrorEvent) => void,
        capture = false,
    ): EventHandler<SyntheticErrorEvent> {
        return createEventHandler<SyntheticErrorEvent>(NativeEventDispatchers.error, handler, capture);
    },
    onFocus: function createFocusEventHandler(
        handler: (ev: SyntheticFocusEvent) => void,
        capture = false,
    ): EventHandler<SyntheticFocusEvent> {
        return createEventHandler<SyntheticFocusEvent>(NativeEventDispatchers.focus, handler, capture);
    },
    onGotPointerCapture: function createGotpointercaptureEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.gotpointercapture, handler, capture);
    },
    onInput: function createInputEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.input, handler, capture);
    },
    onInvalid: function createInvalidEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.invalid, handler, capture);
    },
    onKeyDown: function createKeydownEventHandler(
        handler: (ev: SyntheticKeyboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticKeyboardEvent> {
        return createEventHandler<SyntheticKeyboardEvent>(NativeEventDispatchers.keydown, handler, capture);
    },
    onKeyPress: function createKeypressEventHandler(
        handler: (ev: SyntheticKeyboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticKeyboardEvent> {
        return createEventHandler<SyntheticKeyboardEvent>(NativeEventDispatchers.keypress, handler, capture);
    },
    onKeyUp: function createKeyupEventHandler(
        handler: (ev: SyntheticKeyboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticKeyboardEvent> {
        return createEventHandler<SyntheticKeyboardEvent>(NativeEventDispatchers.keyup, handler, capture);
    },
    onLoad: function createLoadEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.load, handler, capture);
    },
    onLoadedData: function createLoadeddataEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.loadeddata, handler, capture);
    },
    onLoadedMetadata: function createLoadedmetadataEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.loadedmetadata, handler, capture);
    },
    onLoadStart: function createLoadstartEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.loadstart, handler, capture);
    },
    onLostPointerCapture: function createLostpointercaptureEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.lostpointercapture, handler, capture);
    },
    onMouseDown: function createMousedownEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mousedown, handler, capture);
    },
    onMouseEnter: function createMouseenterEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseenter, handler, capture);
    },
    onMouseLeave: function createMouseleaveEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseleave, handler, capture);
    },
    onMouseMove: function createMousemoveEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mousemove, handler, capture);
    },
    onMouseOut: function createMouseoutEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseout, handler, capture);
    },
    onMouseOver: function createMouseoverEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseover, handler, capture);
    },
    onMouseUp: function createMouseupEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseup, handler, capture);
    },
    onPaste: function createPasteEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<SyntheticClipboardEvent> {
        return createEventHandler<SyntheticClipboardEvent>(NativeEventDispatchers.paste, handler, capture);
    },
    onPause: function createPauseEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.pause, handler, capture);
    },
    onPlay: function createPlayEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.play, handler, capture);
    },
    onPlaying: function createPlayingEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.playing, handler, capture);
    },
    onPointerCancel: function createPointercancelEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.pointercancel, handler, capture);
    },
    onPointerDown: function createPointerdownEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.pointerdown, handler, capture);
    },
    onPointerEnter: function createPointerenterEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.pointerenter, handler, capture);
    },
    onPointerLeave: function createPointerleaveEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.pointerleave, handler, capture);
    },
    onPointerMove: function createPointermoveEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.pointermove, handler, capture);
    },
    onPointerOut: function createPointeroutEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.pointerout, handler, capture);
    },
    onPointerOver: function createPointeroverEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.pointerover, handler, capture);
    },
    onPointerUp: function createPointerupEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<SyntheticPointerEvent> {
        return createEventHandler<SyntheticPointerEvent>(NativeEventDispatchers.pointerup, handler, capture);
    },
    onProgress: function createProgressEventHandler(
        handler: (ev: SyntheticProgressEvent) => void,
        capture = false,
    ): EventHandler<SyntheticProgressEvent> {
        return createEventHandler<SyntheticProgressEvent>(NativeEventDispatchers.progress, handler, capture);
    },
    onRateChange: function createRatechangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.ratechange, handler, capture);
    },
    onReset: function createResetEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.reset, handler, capture);
    },
    onScroll: function createScrollEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.scroll, handler, capture);
    },
    onSeeked: function createSeekedEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.seeked, handler, capture);
    },
    onSeeking: function createSeekingEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.seeking, handler, capture);
    },
    onSelect: function createSelectEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<SyntheticUIEvent<UIEvent>> {
        return createEventHandler<SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.select, handler, capture);
    },
    onSelectStart: function createSelectstartEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.selectstart, handler, capture);
    },
    onStalled: function createStalledEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.stalled, handler, capture);
    },
    onSubmit: function createSubmitEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.submit, handler, capture);
    },
    onSuspend: function createSuspendEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.suspend, handler, capture);
    },
    onTimeUpdate: function createTimeupdateEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.timeupdate, handler, capture);
    },
    onTouchCancel: function createTouchcancelEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeEventDispatchers.touchcancel, handler, capture);
    },
    onTouchEnd: function createTouchendEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeEventDispatchers.touchend, handler, capture);
    },
    onTouchMove: function createTouchmoveEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeEventDispatchers.touchmove, handler, capture);
    },
    onTouchStart: function createTouchstartEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeEventDispatchers.touchstart, handler, capture);
    },
    onUnload: function createUnloadEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.unload, handler, capture);
    },
    onVolumeChange: function createVolumechangeEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.volumechange, handler, capture);
    },
    onWaiting: function createWaitingEventHandler(
        handler: (ev: SyntheticEvent<Event>) => void,
        capture = false,
    ): EventHandler<SyntheticEvent<Event>> {
        return createEventHandler<SyntheticEvent<Event>>(NativeEventDispatchers.waiting, handler, capture);
    },
    onWheel: function createWheelEventHandler(
        handler: (ev: SyntheticWheelEvent) => void,
        capture = false,
    ): EventHandler<SyntheticWheelEvent> {
        return createEventHandler<SyntheticWheelEvent>(NativeEventDispatchers.wheel, handler, capture);
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
        return createEventHandler<SyntheticTouchEvent>(NativeActiveEventDispatchers.touchend, handler, capture);
    },
    onTouchMove: function createTouchmoveEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeActiveEventDispatchers.touchmove, handler, capture);
    },
    onTouchStart: function createTouchstartEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<SyntheticTouchEvent> {
        return createEventHandler<SyntheticTouchEvent>(NativeActiveEventDispatchers.touchstart, handler, capture);
    },
    onWheel: function createWheelEventHandler(
        handler: (ev: SyntheticWheelEvent) => void,
        capture = false,
    ): EventHandler<SyntheticWheelEvent> {
        return createEventHandler<SyntheticWheelEvent>(NativeActiveEventDispatchers.wheel, handler, capture);
    },
};
/* tslint:enable:max-line-length */
