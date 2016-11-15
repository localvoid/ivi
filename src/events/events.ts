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
    SyntheticEvent, SyntheticUIEvent, SyntheticDOMEvent, SyntheticDragEvent, SyntheticErrorEvent,
    SyntheticKeyboardEvent, SyntheticFocusEvent, SyntheticMediaEncryptedEvent, SyntheticMediaStreamErrorEvent,
    SyntheticMouseEvent, SyntheticAriaRequestEvent, SyntheticClipboardEvent, SyntheticPointerEvent,
    SyntheticTouchEvent, SyntheticWheelEvent, SyntheticProgressEvent,
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
export function createEventHandler<I, O extends SyntheticEvent<I>>(
    dispatcher: EventDispatcher<I, O>,
    fn: (ev: O) => void,
    capture?: boolean): EventHandler<I, O> {

    return {
        dispatcher: dispatcher,
        flags: capture ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble,
        fn: fn,
    } as EventHandler<I, O>;
}

export interface NativeEventDispatchersList {
    abort: EventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>;
    activate: EventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>;
    ariarequest: EventDispatcher<AriaRequestEvent, SyntheticAriaRequestEvent>;
    beforeactivate: EventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>;
    beforecopy: EventDispatcher<ClipboardEvent, SyntheticClipboardEvent>;
    beforecut: EventDispatcher<ClipboardEvent, SyntheticClipboardEvent>;
    beforedeactivate: EventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>;
    beforepaste: EventDispatcher<ClipboardEvent, SyntheticClipboardEvent>;
    blur: EventDispatcher<FocusEvent, SyntheticFocusEvent>;
    canplay: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    canplaythrough: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    change: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    click: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    contextmenu: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    copy: EventDispatcher<ClipboardEvent, SyntheticClipboardEvent>;
    cuechange: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    cut: EventDispatcher<ClipboardEvent, SyntheticClipboardEvent>;
    dblclick: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    deactivate: EventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>;
    drag: EventDispatcher<DragEvent, SyntheticDragEvent>;
    dragend: EventDispatcher<DragEvent, SyntheticDragEvent>;
    dragenter: EventDispatcher<DragEvent, SyntheticDragEvent>;
    dragleave: EventDispatcher<DragEvent, SyntheticDragEvent>;
    dragover: EventDispatcher<DragEvent, SyntheticDragEvent>;
    dragstart: EventDispatcher<DragEvent, SyntheticDragEvent>;
    drop: EventDispatcher<DragEvent, SyntheticDragEvent>;
    durationchange: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    emptied: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    encrypted: EventDispatcher<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>;
    ended: EventDispatcher<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>;
    error: EventDispatcher<ErrorEvent, SyntheticErrorEvent>;
    focus: EventDispatcher<FocusEvent, SyntheticFocusEvent>;
    gotpointercapture: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    input: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    invalid: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    keydown: EventDispatcher<KeyboardEvent, SyntheticKeyboardEvent>;
    keypress: EventDispatcher<KeyboardEvent, SyntheticKeyboardEvent>;
    keyup: EventDispatcher<KeyboardEvent, SyntheticKeyboardEvent>;
    load: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    loadeddata: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    loadedmetadata: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    loadstart: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    lostpointercapture: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    mousedown: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseenter: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseleave: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mousemove: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseout: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseover: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseup: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    paste: EventDispatcher<ClipboardEvent, SyntheticClipboardEvent>;
    pause: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    play: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    playing: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    pointercancel: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    pointerdown: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    pointerenter: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    pointerleave: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    pointermove: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    pointerout: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    pointerover: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    pointerup: EventDispatcher<PointerEvent, SyntheticPointerEvent>;
    progress: EventDispatcher<ProgressEvent, SyntheticProgressEvent>;
    ratechange: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    reset: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    scroll: EventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>;
    seeked: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    seeking: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    select: EventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>;
    selectstart: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    stalled: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    submit: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    suspend: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    timeupdate: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    touchcancel: EventDispatcher<TouchEvent, SyntheticTouchEvent>;
    touchend: EventDispatcher<TouchEvent, SyntheticTouchEvent>;
    touchmove: EventDispatcher<TouchEvent, SyntheticTouchEvent>;
    touchstart: EventDispatcher<TouchEvent, SyntheticTouchEvent>;
    unload: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    volumechange: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    waiting: EventDispatcher<Event, SyntheticDOMEvent<Event>>;
    wheel: EventDispatcher<WheelEvent, SyntheticWheelEvent>;
};


/* tslint:disable:max-line-length */
export const NativeEventDispatchers: NativeEventDispatchersList = {
    abort: new NativeEventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatcherFlags.Capture, "abort", SyntheticUIEvent),
    activate: new NativeEventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "activate", SyntheticUIEvent),
    ariarequest: new NativeEventDispatcher<AriaRequestEvent, SyntheticAriaRequestEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "ariarequest", SyntheticAriaRequestEvent),
    beforeactivate: new NativeEventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "beforeactivate", SyntheticUIEvent),
    beforecopy: new NativeEventDispatcher<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatcherFlags.Capture, "beforecopy", SyntheticClipboardEvent),
    beforecut: new NativeEventDispatcher<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "beforecut", SyntheticClipboardEvent),
    beforedeactivate: new NativeEventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "beforedeactivate", SyntheticUIEvent),
    beforepaste: new NativeEventDispatcher<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "beforepaste", SyntheticClipboardEvent),
    blur: new NativeEventDispatcher<FocusEvent, SyntheticFocusEvent>(NativeEventDispatcherFlags.Capture, "blur", SyntheticFocusEvent),
    canplay: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "canplay", SyntheticDOMEvent),
    canplaythrough: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "canplaythrough", SyntheticDOMEvent),
    change: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "change", SyntheticDOMEvent),
    click: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "click", SyntheticMouseEvent),
    contextmenu: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "contextmenu", SyntheticPointerEvent),
    copy: new NativeEventDispatcher<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "copy", SyntheticClipboardEvent),
    cuechange: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "cuechange", SyntheticDOMEvent),
    cut: new NativeEventDispatcher<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "cut", SyntheticClipboardEvent),
    dblclick: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dblclick", SyntheticMouseEvent),
    deactivate: new NativeEventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "deactivate", SyntheticUIEvent),
    drag: new NativeEventDispatcher<DragEvent, SyntheticDragEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "drag", SyntheticDragEvent),
    dragend: new NativeEventDispatcher<DragEvent, SyntheticDragEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragend", SyntheticDragEvent),
    dragenter: new NativeEventDispatcher<DragEvent, SyntheticDragEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragenter", SyntheticDragEvent),
    dragleave: new NativeEventDispatcher<DragEvent, SyntheticDragEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragleave", SyntheticDragEvent),
    dragover: new NativeEventDispatcher<DragEvent, SyntheticDragEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragover", SyntheticDragEvent),
    dragstart: new NativeEventDispatcher<DragEvent, SyntheticDragEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "dragstart", SyntheticDragEvent),
    drop: new NativeEventDispatcher<DragEvent, SyntheticDragEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "drop", SyntheticDragEvent),
    durationchange: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "durationchange", SyntheticDOMEvent),
    emptied: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "emptied", SyntheticDOMEvent),
    encrypted: new NativeEventDispatcher<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>(NativeEventDispatcherFlags.Capture, "encrypted", SyntheticMediaEncryptedEvent),
    ended: new NativeEventDispatcher<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>(NativeEventDispatcherFlags.Capture, "ended", SyntheticMediaStreamErrorEvent),
    error: new NativeEventDispatcher<ErrorEvent, SyntheticErrorEvent>(NativeEventDispatcherFlags.Capture, "error", SyntheticErrorEvent),
    focus: new NativeEventDispatcher<FocusEvent, SyntheticFocusEvent>(NativeEventDispatcherFlags.Capture, "focus", SyntheticFocusEvent),
    gotpointercapture: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture, "gotpointercapture", SyntheticPointerEvent),
    input: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "input", SyntheticDOMEvent),
    invalid: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "invalid", SyntheticDOMEvent),
    keydown: new NativeEventDispatcher<KeyboardEvent, SyntheticKeyboardEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "keydown", SyntheticKeyboardEvent),
    keypress: new NativeEventDispatcher<KeyboardEvent, SyntheticKeyboardEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "keypress", SyntheticKeyboardEvent),
    keyup: new NativeEventDispatcher<KeyboardEvent, SyntheticKeyboardEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "keyup", SyntheticKeyboardEvent),
    load: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "load", SyntheticDOMEvent),
    loadeddata: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "loadeddata", SyntheticDOMEvent),
    loadedmetadata: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "loadedmetadata", SyntheticDOMEvent),
    loadstart: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "loadstart", SyntheticDOMEvent),
    lostpointercapture: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture, "lostpointercapture", SyntheticPointerEvent),
    mousedown: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "mousedown", SyntheticMouseEvent),
    mouseenter: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Passive, "mouseenter", SyntheticMouseEvent),
    mouseleave: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Passive, "mouseleave", SyntheticMouseEvent),
    mousemove: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "mousemove", SyntheticMouseEvent),
    mouseout: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "mouseout", SyntheticMouseEvent),
    mouseover: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "mouseover", SyntheticMouseEvent),
    mouseup: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "mouseup", SyntheticMouseEvent),
    paste: new NativeEventDispatcher<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "paste", SyntheticClipboardEvent),
    pause: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "pause", SyntheticDOMEvent),
    play: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "play", SyntheticDOMEvent),
    playing: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "playing", SyntheticDOMEvent),
    pointercancel: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointercancel", SyntheticPointerEvent),
    pointerdown: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointerdown", SyntheticPointerEvent),
    pointerenter: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture, "pointerenter", SyntheticPointerEvent),
    pointerleave: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture, "pointerleave", SyntheticPointerEvent),
    pointermove: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointermove", SyntheticPointerEvent),
    pointerout: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointerout", SyntheticPointerEvent),
    pointerover: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointerover", SyntheticPointerEvent),
    pointerup: new NativeEventDispatcher<PointerEvent, SyntheticPointerEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "pointerup", SyntheticPointerEvent),
    progress: new NativeEventDispatcher<ProgressEvent, SyntheticProgressEvent>(NativeEventDispatcherFlags.Capture, "progress", SyntheticProgressEvent),
    ratechange: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "ratechange", SyntheticDOMEvent),
    reset: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "reset", SyntheticDOMEvent),
    scroll: new NativeEventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Passive, "scroll", SyntheticUIEvent),
    seeked: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "seeked", SyntheticDOMEvent),
    seeking: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "seeking", SyntheticDOMEvent),
    select: new NativeEventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "select", SyntheticUIEvent),
    selectstart: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "selectstart", SyntheticDOMEvent),
    stalled: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "stalled", SyntheticDOMEvent),
    submit: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "submit", SyntheticDOMEvent),
    suspend: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "suspend", SyntheticDOMEvent),
    timeupdate: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "timeupdate", SyntheticDOMEvent),
    touchcancel: new NativeEventDispatcher<TouchEvent, SyntheticTouchEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "touchcancel", SyntheticTouchEvent),
    touchend: new NativeEventDispatcher<TouchEvent, SyntheticTouchEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "touchend", SyntheticTouchEvent),
    touchmove: new NativeEventDispatcher<TouchEvent, SyntheticTouchEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "touchmove", SyntheticTouchEvent),
    touchstart: new NativeEventDispatcher<TouchEvent, SyntheticTouchEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "touchstart", SyntheticTouchEvent),
    unload: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "unload", SyntheticDOMEvent),
    volumechange: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "volumechange", SyntheticDOMEvent),
    waiting: new NativeEventDispatcher<Event, SyntheticDOMEvent<Event>>(NativeEventDispatcherFlags.Capture, "waiting", SyntheticDOMEvent),
    wheel: new NativeEventDispatcher<WheelEvent, SyntheticWheelEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles | NativeEventDispatcherFlags.Passive, "wheel", SyntheticWheelEvent),
};

export interface NativeActiveEventDispatchersList {
    mousedown: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseenter: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseleave: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mousemove: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseout: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseover: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    mouseup: EventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>;
    scroll: EventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>;
    touchcancel: EventDispatcher<TouchEvent, SyntheticTouchEvent>;
    touchend: EventDispatcher<TouchEvent, SyntheticTouchEvent>;
    touchmove: EventDispatcher<TouchEvent, SyntheticTouchEvent>;
    touchstart: EventDispatcher<TouchEvent, SyntheticTouchEvent>;
    wheel: EventDispatcher<WheelEvent, SyntheticWheelEvent>;
}

export const NativeActiveEventDispatchers = {
    mousedown: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mousedown", SyntheticMouseEvent),
    mouseenter: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture, "mouseenter", SyntheticMouseEvent),
    mouseleave: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture, "mouseleave", SyntheticMouseEvent),
    mousemove: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mousemove", SyntheticMouseEvent),
    mouseout: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mouseout", SyntheticMouseEvent),
    mouseover: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mouseover", SyntheticMouseEvent),
    mouseup: new NativeEventDispatcher<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "mouseup", SyntheticMouseEvent),
    scroll: new NativeEventDispatcher<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatcherFlags.Capture, "scroll", SyntheticUIEvent),
    touchcancel: new NativeEventDispatcher<TouchEvent, SyntheticTouchEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "touchcancel", SyntheticTouchEvent),
    touchend: new NativeEventDispatcher<TouchEvent, SyntheticTouchEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "touchend", SyntheticTouchEvent),
    touchmove: new NativeEventDispatcher<TouchEvent, SyntheticTouchEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "touchmove", SyntheticTouchEvent),
    touchstart: new NativeEventDispatcher<TouchEvent, SyntheticTouchEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "touchstart", SyntheticTouchEvent),
    wheel: new NativeEventDispatcher<WheelEvent, SyntheticWheelEvent>(NativeEventDispatcherFlags.Capture | NativeEventDispatcherFlags.Bubbles, "wheel", SyntheticWheelEvent),
};

/**
 * Events.
 */
export const Events = {
    onAbort: function createAbortEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<UIEvent, SyntheticUIEvent<UIEvent>> {
        return createEventHandler<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.abort, handler, capture);
    },
    onActivate: function createActivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<UIEvent, SyntheticUIEvent<UIEvent>> {
        return createEventHandler<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.activate, handler, capture);
    },
    onAriaRequest: function createAriarequestEventHandler(
        handler: (ev: SyntheticAriaRequestEvent) => void,
        capture = false,
    ): EventHandler<AriaRequestEvent, SyntheticAriaRequestEvent> {
        return createEventHandler<AriaRequestEvent, SyntheticAriaRequestEvent>(NativeEventDispatchers.ariarequest, handler, capture);
    },
    onBeforeActivate: function createBeforeactivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<UIEvent, SyntheticUIEvent<UIEvent>> {
        return createEventHandler<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.beforeactivate, handler, capture);
    },
    onBeforeCopy: function createBeforecopyEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<ClipboardEvent, SyntheticClipboardEvent> {
        return createEventHandler<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatchers.beforecopy, handler, capture);
    },
    onBeforeCut: function createBeforecutEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<ClipboardEvent, SyntheticClipboardEvent> {
        return createEventHandler<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatchers.beforecut, handler, capture);
    },
    onBeforeDeactivate: function createBeforedeactivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<UIEvent, SyntheticUIEvent<UIEvent>> {
        return createEventHandler<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.beforedeactivate, handler, capture);
    },
    onBeforePaste: function createBeforepasteEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<ClipboardEvent, SyntheticClipboardEvent> {
        return createEventHandler<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatchers.beforepaste, handler, capture);
    },
    onBlur: function createBlurEventHandler(
        handler: (ev: SyntheticFocusEvent) => void,
        capture = false,
    ): EventHandler<FocusEvent, SyntheticFocusEvent> {
        return createEventHandler<FocusEvent, SyntheticFocusEvent>(NativeEventDispatchers.blur, handler, capture);
    },
    onCanPlay: function createCanplayEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.canplay, handler, capture);
    },
    onCanPlaythrough: function createCanplaythroughEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.canplaythrough, handler, capture);
    },
    onChange: function createChangeEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.change, handler, capture);
    },
    onClick: function createClickEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.click, handler, capture);
    },
    onContextMenu: function createContextmenuEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.contextmenu, handler, capture);
    },
    onCopy: function createCopyEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<ClipboardEvent, SyntheticClipboardEvent> {
        return createEventHandler<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatchers.copy, handler, capture);
    },
    onCueChange: function createCuechangeEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.cuechange, handler, capture);
    },
    onCut: function createCutEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<ClipboardEvent, SyntheticClipboardEvent> {
        return createEventHandler<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatchers.cut, handler, capture);
    },
    onDoubleClick: function createDblclickEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.dblclick, handler, capture);
    },
    onDeactivate: function createDeactivateEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<UIEvent, SyntheticUIEvent<UIEvent>> {
        return createEventHandler<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.deactivate, handler, capture);
    },
    onDrag: function createDragEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<DragEvent, SyntheticDragEvent> {
        return createEventHandler<DragEvent, SyntheticDragEvent>(NativeEventDispatchers.drag, handler, capture);
    },
    onDragEnd: function createDragendEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<DragEvent, SyntheticDragEvent> {
        return createEventHandler<DragEvent, SyntheticDragEvent>(NativeEventDispatchers.dragend, handler, capture);
    },
    onDragEnter: function createDragenterEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<DragEvent, SyntheticDragEvent> {
        return createEventHandler<DragEvent, SyntheticDragEvent>(NativeEventDispatchers.dragenter, handler, capture);
    },
    onDragLeave: function createDragleaveEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<DragEvent, SyntheticDragEvent> {
        return createEventHandler<DragEvent, SyntheticDragEvent>(NativeEventDispatchers.dragleave, handler, capture);
    },
    onDragOver: function createDragoverEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<DragEvent, SyntheticDragEvent> {
        return createEventHandler<DragEvent, SyntheticDragEvent>(NativeEventDispatchers.dragover, handler, capture);
    },
    onDragStart: function createDragstartEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<DragEvent, SyntheticDragEvent> {
        return createEventHandler<DragEvent, SyntheticDragEvent>(NativeEventDispatchers.dragstart, handler, capture);
    },
    onDrop: function createDropEventHandler(
        handler: (ev: SyntheticDragEvent) => void,
        capture = false,
    ): EventHandler<DragEvent, SyntheticDragEvent> {
        return createEventHandler<DragEvent, SyntheticDragEvent>(NativeEventDispatchers.drop, handler, capture);
    },
    onDurationChange: function createDurationchangeEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.durationchange, handler, capture);
    },
    onEmptied: function createEmptiedEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.emptied, handler, capture);
    },
    onEncrypted: function createEncryptedEventHandler(
        handler: (ev: SyntheticMediaEncryptedEvent) => void,
        capture = false,
    ): EventHandler<MediaEncryptedEvent, SyntheticMediaEncryptedEvent> {
        return createEventHandler<MediaEncryptedEvent, SyntheticMediaEncryptedEvent>(NativeEventDispatchers.encrypted, handler, capture);
    },
    onEnded: function createEndedEventHandler(
        handler: (ev: SyntheticMediaStreamErrorEvent) => void,
        capture = false,
    ): EventHandler<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent> {
        return createEventHandler<MediaStreamErrorEvent, SyntheticMediaStreamErrorEvent>(NativeEventDispatchers.ended, handler, capture);
    },
    onError: function createErrorEventHandler(
        handler: (ev: SyntheticErrorEvent) => void,
        capture = false,
    ): EventHandler<ErrorEvent, SyntheticErrorEvent> {
        return createEventHandler<ErrorEvent, SyntheticErrorEvent>(NativeEventDispatchers.error, handler, capture);
    },
    onFocus: function createFocusEventHandler(
        handler: (ev: SyntheticFocusEvent) => void,
        capture = false,
    ): EventHandler<FocusEvent, SyntheticFocusEvent> {
        return createEventHandler<FocusEvent, SyntheticFocusEvent>(NativeEventDispatchers.focus, handler, capture);
    },
    onGotPointerCapture: function createGotpointercaptureEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.gotpointercapture, handler, capture);
    },
    onInput: function createInputEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.input, handler, capture);
    },
    onInvalid: function createInvalidEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.invalid, handler, capture);
    },
    onKeyDown: function createKeydownEventHandler(
        handler: (ev: SyntheticKeyboardEvent) => void,
        capture = false,
    ): EventHandler<KeyboardEvent, SyntheticKeyboardEvent> {
        return createEventHandler<KeyboardEvent, SyntheticKeyboardEvent>(NativeEventDispatchers.keydown, handler, capture);
    },
    onKeyPress: function createKeypressEventHandler(
        handler: (ev: SyntheticKeyboardEvent) => void,
        capture = false,
    ): EventHandler<KeyboardEvent, SyntheticKeyboardEvent> {
        return createEventHandler<KeyboardEvent, SyntheticKeyboardEvent>(NativeEventDispatchers.keypress, handler, capture);
    },
    onKeyUp: function createKeyupEventHandler(
        handler: (ev: SyntheticKeyboardEvent) => void,
        capture = false,
    ): EventHandler<KeyboardEvent, SyntheticKeyboardEvent> {
        return createEventHandler<KeyboardEvent, SyntheticKeyboardEvent>(NativeEventDispatchers.keyup, handler, capture);
    },
    onLoad: function createLoadEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.load, handler, capture);
    },
    onLoadedData: function createLoadeddataEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.loadeddata, handler, capture);
    },
    onLoadedMetadata: function createLoadedmetadataEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.loadedmetadata, handler, capture);
    },
    onLoadStart: function createLoadstartEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.loadstart, handler, capture);
    },
    onLostPointerCapture: function createLostpointercaptureEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.lostpointercapture, handler, capture);
    },
    onMouseDown: function createMousedownEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mousedown, handler, capture);
    },
    onMouseEnter: function createMouseenterEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseenter, handler, capture);
    },
    onMouseLeave: function createMouseleaveEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseleave, handler, capture);
    },
    onMouseMove: function createMousemoveEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mousemove, handler, capture);
    },
    onMouseOut: function createMouseoutEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseout, handler, capture);
    },
    onMouseOver: function createMouseoverEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseover, handler, capture);
    },
    onMouseUp: function createMouseupEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeEventDispatchers.mouseup, handler, capture);
    },
    onPaste: function createPasteEventHandler(
        handler: (ev: SyntheticClipboardEvent) => void,
        capture = false,
    ): EventHandler<ClipboardEvent, SyntheticClipboardEvent> {
        return createEventHandler<ClipboardEvent, SyntheticClipboardEvent>(NativeEventDispatchers.paste, handler, capture);
    },
    onPause: function createPauseEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.pause, handler, capture);
    },
    onPlay: function createPlayEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.play, handler, capture);
    },
    onPlaying: function createPlayingEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.playing, handler, capture);
    },
    onPointerCancel: function createPointercancelEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.pointercancel, handler, capture);
    },
    onPointerDown: function createPointerdownEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.pointerdown, handler, capture);
    },
    onPointerEnter: function createPointerenterEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.pointerenter, handler, capture);
    },
    onPointerLeave: function createPointerleaveEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.pointerleave, handler, capture);
    },
    onPointerMove: function createPointermoveEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.pointermove, handler, capture);
    },
    onPointerOut: function createPointeroutEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.pointerout, handler, capture);
    },
    onPointerOver: function createPointeroverEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.pointerover, handler, capture);
    },
    onPointerUp: function createPointerupEventHandler(
        handler: (ev: SyntheticPointerEvent) => void,
        capture = false,
    ): EventHandler<PointerEvent, SyntheticPointerEvent> {
        return createEventHandler<PointerEvent, SyntheticPointerEvent>(NativeEventDispatchers.pointerup, handler, capture);
    },
    onProgress: function createProgressEventHandler(
        handler: (ev: SyntheticProgressEvent) => void,
        capture = false,
    ): EventHandler<ProgressEvent, SyntheticProgressEvent> {
        return createEventHandler<ProgressEvent, SyntheticProgressEvent>(NativeEventDispatchers.progress, handler, capture);
    },
    onRateChange: function createRatechangeEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.ratechange, handler, capture);
    },
    onReset: function createResetEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.reset, handler, capture);
    },
    onScroll: function createScrollEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<UIEvent, SyntheticUIEvent<UIEvent>> {
        return createEventHandler<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.scroll, handler, capture);
    },
    onSeeked: function createSeekedEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.seeked, handler, capture);
    },
    onSeeking: function createSeekingEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.seeking, handler, capture);
    },
    onSelect: function createSelectEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<UIEvent, SyntheticUIEvent<UIEvent>> {
        return createEventHandler<UIEvent, SyntheticUIEvent<UIEvent>>(NativeEventDispatchers.select, handler, capture);
    },
    onSelectStart: function createSelectstartEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.selectstart, handler, capture);
    },
    onStalled: function createStalledEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.stalled, handler, capture);
    },
    onSubmit: function createSubmitEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.submit, handler, capture);
    },
    onSuspend: function createSuspendEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.suspend, handler, capture);
    },
    onTimeUpdate: function createTimeupdateEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.timeupdate, handler, capture);
    },
    onTouchCancel: function createTouchcancelEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<TouchEvent, SyntheticTouchEvent> {
        return createEventHandler<TouchEvent, SyntheticTouchEvent>(NativeEventDispatchers.touchcancel, handler, capture);
    },
    onTouchEnd: function createTouchendEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<TouchEvent, SyntheticTouchEvent> {
        return createEventHandler<TouchEvent, SyntheticTouchEvent>(NativeEventDispatchers.touchend, handler, capture);
    },
    onTouchMove: function createTouchmoveEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<TouchEvent, SyntheticTouchEvent> {
        return createEventHandler<TouchEvent, SyntheticTouchEvent>(NativeEventDispatchers.touchmove, handler, capture);
    },
    onTouchStart: function createTouchstartEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<TouchEvent, SyntheticTouchEvent> {
        return createEventHandler<TouchEvent, SyntheticTouchEvent>(NativeEventDispatchers.touchstart, handler, capture);
    },
    onUnload: function createUnloadEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.unload, handler, capture);
    },
    onVolumeChange: function createVolumechangeEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.volumechange, handler, capture);
    },
    onWaiting: function createWaitingEventHandler(
        handler: (ev: SyntheticDOMEvent<Event>) => void,
        capture = false,
    ): EventHandler<Event, SyntheticDOMEvent<Event>> {
        return createEventHandler<Event, SyntheticDOMEvent<Event>>(NativeEventDispatchers.waiting, handler, capture);
    },
    onWheel: function createWheelEventHandler(
        handler: (ev: SyntheticWheelEvent) => void,
        capture = false,
    ): EventHandler<WheelEvent, SyntheticWheelEvent> {
        return createEventHandler<WheelEvent, SyntheticWheelEvent>(NativeEventDispatchers.wheel, handler, capture);
    },
};

/**
 * List of Events with disabled passive flag.
 */
export const ActiveEvents = {
    onScroll: function createScrollEventHandler(
        handler: (ev: SyntheticUIEvent<UIEvent>) => void,
        capture = false,
    ): EventHandler<UIEvent, SyntheticUIEvent<UIEvent>> {
        return createEventHandler<UIEvent, SyntheticUIEvent<UIEvent>>(NativeActiveEventDispatchers.scroll, handler, capture);
    },
    onMouseDown: function createMousedownEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeActiveEventDispatchers.mousedown, handler, capture);
    },
    onMouseEnter: function createMouseenterEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeActiveEventDispatchers.mouseenter, handler, capture);
    },
    onMouseLeave: function createMouseleaveEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeActiveEventDispatchers.mouseleave, handler, capture);
    },
    onMouseMove: function createMousemoveEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeActiveEventDispatchers.mousemove, handler, capture);
    },
    onMouseOut: function createMouseoutEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeActiveEventDispatchers.mouseout, handler, capture);
    },
    onMouseOver: function createMouseoverEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeActiveEventDispatchers.mouseover, handler, capture);
    },
    onMouseUp: function createMouseupEventHandler(
        handler: (ev: SyntheticMouseEvent<MouseEvent>) => void,
        capture = false,
    ): EventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>> {
        return createEventHandler<MouseEvent, SyntheticMouseEvent<MouseEvent>>(NativeActiveEventDispatchers.mouseup, handler, capture);
    },
    onTouchCancel: function createTouchcancelEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<TouchEvent, SyntheticTouchEvent> {
        return createEventHandler<TouchEvent, SyntheticTouchEvent>(NativeActiveEventDispatchers.touchcancel, handler, capture);
    },
    onTouchEnd: function createTouchendEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<TouchEvent, SyntheticTouchEvent> {
        return createEventHandler<TouchEvent, SyntheticTouchEvent>(NativeActiveEventDispatchers.touchend, handler, capture);
    },
    onTouchMove: function createTouchmoveEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<TouchEvent, SyntheticTouchEvent> {
        return createEventHandler<TouchEvent, SyntheticTouchEvent>(NativeActiveEventDispatchers.touchmove, handler, capture);
    },
    onTouchStart: function createTouchstartEventHandler(
        handler: (ev: SyntheticTouchEvent) => void,
        capture = false,
    ): EventHandler<TouchEvent, SyntheticTouchEvent> {
        return createEventHandler<TouchEvent, SyntheticTouchEvent>(NativeActiveEventDispatchers.touchstart, handler, capture);
    },
    onWheel: function createWheelEventHandler(
        handler: (ev: SyntheticWheelEvent) => void,
        capture = false,
    ): EventHandler<WheelEvent, SyntheticWheelEvent> {
        return createEventHandler<WheelEvent, SyntheticWheelEvent>(NativeActiveEventDispatchers.wheel, handler, capture);
    },
};
/* tslint:enable:max-line-length */
