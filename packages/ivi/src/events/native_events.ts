/**
 * Event Handlers.
 *
 * Optimizing compilers should inline all this functions and completely remove unused code.
 */

import { EventFlags, NativeEventSourceFlags } from "./flags";
import { EventHandlerNode, EventHandlerFlags } from "./event_handler";
import { NativeEventDispatcher, createNativeEventDispatcher } from "./native_event_dispatcher";
import { SyntheticNativeEvent } from "./synthetic_native_event";
import { EVENT_CAPTURE_ACTIVE_OPTIONS } from "./utils";

/* tslint:disable:max-line-length */
export const EVENT_DISPATCHER_ABORT = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture, "abort")
);
export const EVENT_DISPATCHER_ACTIVATE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "activate")
);
export const EVENT_DISPATCHER_ARIA_REQUEST = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "ariarequest")
);
export const EVENT_DISPATCHER_BEFORE_ACTIVATE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforeactivate")
);
export const EVENT_DISPATCHER_BEFORE_COPY = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture, "beforecopy")
);
export const EVENT_DISPATCHER_BEFORE_CUT = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforecut")
);
export const EVENT_DISPATCHER_BEFORE_DEACTIVATE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforedeactivate")
);
export const EVENT_DISPATCHER_BEFORE_PASTE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforepaste")
);
export const EVENT_DISPATCHER_BLUR = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<FocusEvent>(NativeEventSourceFlags.Capture, "blur")
);
export const EVENT_DISPATCHER_CAN_PLAY = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "canplay")
);
export const EVENT_DISPATCHER_CAN_PLAYTHROUGH = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "canplaythrough")
);
export const EVENT_DISPATCHER_CHANGE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "change")
);
export const EVENT_DISPATCHER_CLICK = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "click")
);
export const EVENT_DISPATCHER_CONTEXT_MENU = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "contextmenu")
);
export const EVENT_DISPATCHER_COPY = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "copy")
);
export const EVENT_DISPATCHER_CUE_CHANGE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "cuechange")
);
export const EVENT_DISPATCHER_CUT = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "cut")
);
export const EVENT_DISPATCHER_DOUBLE_CLICK = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dblclick")
);
export const EVENT_DISPATCHER_DEACTIVATE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "deactivate")
);
export const EVENT_DISPATCHER_DRAG = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drag")
);
export const EVENT_DISPATCHER_DRAG_END = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragend")
);
export const EVENT_DISPATCHER_DRAG_ENTER = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragenter")
);
export const EVENT_DISPATCHER_DRAG_LEAVE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragleave")
);
export const EVENT_DISPATCHER_DRAG_OVER = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragover")
);
export const EVENT_DISPATCHER_DRAG_START = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "dragstart")
);
export const EVENT_DISPATCHER_DROP = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "drop")
);
export const EVENT_DISPATCHER_DURATION_CHANGE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "durationchange")
);
export const EVENT_DISPATCHER_EMPTIED = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "emptied")
);
export const EVENT_DISPATCHER_ENCRYPTED = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MediaEncryptedEvent>(NativeEventSourceFlags.Capture, "encrypted")
);
export const EVENT_DISPATCHER_ENDED = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MediaStreamErrorEvent>(NativeEventSourceFlags.Capture, "ended")
);
export const EVENT_DISPATCHER_ERROR = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ErrorEvent>(NativeEventSourceFlags.Capture, "error")
);
export const EVENT_DISPATCHER_FOCUS = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<FocusEvent>(NativeEventSourceFlags.Capture, "focus")
);
export const EVENT_DISPATCHER_GOT_POINTER_CAPTURE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture, "gotpointercapture")
);
export const EVENT_DISPATCHER_BEFORE_INPUT = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "beforeinput")
);
export const EVENT_DISPATCHER_INPUT = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "input")
);
export const EVENT_DISPATCHER_INVALID = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "invalid")
);
export const EVENT_DISPATCHER_KEY_DOWN = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keydown")
);
export const EVENT_DISPATCHER_KEY_PRESS = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keypress")
);
export const EVENT_DISPATCHER_KEY_UP = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "keyup")
);
export const EVENT_DISPATCHER_LOAD = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "load")
);
export const EVENT_DISPATCHER_LOADED_DATA = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "loadeddata")
);
export const EVENT_DISPATCHER_LOADED_METADATA = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "loadedmetadata")
);
export const EVENT_DISPATCHER_LOAD_START = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "loadstart")
);
export const EVENT_DISPATCHER_LOST_POINTER_CAPTURE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture, "lostpointercapture")
);
export const EVENT_DISPATCHER_MOUSE_DOWN = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousedown")
);
export const EVENT_DISPATCHER_MOUSE_MOVE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mousemove")
);
export const EVENT_DISPATCHER_MOUSE_OUT = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseout")
);
export const EVENT_DISPATCHER_MOUSE_OVER = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseover")
);
export const EVENT_DISPATCHER_MOUSE_UP = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "mouseup")
);
export const EVENT_DISPATCHER_PASTE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "paste")
);
export const EVENT_DISPATCHER_PAUSE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "pause")
);
export const EVENT_DISPATCHER_PLAY = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "play")
);
export const EVENT_DISPATCHER_PLAYING = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "playing")
);
export const EVENT_DISPATCHER_POINTER_CANCEL = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointercancel")
);
export const EVENT_DISPATCHER_POINTER_DOWN = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerdown")
);
export const EVENT_DISPATCHER_POINTER_MOVE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointermove")
);
export const EVENT_DISPATCHER_POINTER_OUT = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerout")
);
export const EVENT_DISPATCHER_POINTER_OVER = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerover")
);
export const EVENT_DISPATCHER_POINTER_UP = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "pointerup")
);
export const EVENT_DISPATCHER_PROGRESS = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ProgressEvent>(NativeEventSourceFlags.Capture, "progress")
);
export const EVENT_DISPATCHER_RATE_CHANGE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "ratechange")
);
export const EVENT_DISPATCHER_RESET = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "reset")
);
export const EVENT_DISPATCHER_SCROLL = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture, "scroll")
);
export const EVENT_DISPATCHER_SEEKED = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "seeked")
);
export const EVENT_DISPATCHER_SEEKING = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "seeking")
);
export const EVENT_DISPATCHER_SELECT = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "select")
);
export const EVENT_DISPATCHER_SELECT_START = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "selectstart")
);
export const EVENT_DISPATCHER_STALLED = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "stalled")
);
export const EVENT_DISPATCHER_SUBMIT = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "submit")
);
export const EVENT_DISPATCHER_SUSPEND = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "suspend")
);
export const EVENT_DISPATCHER_TIME_UPDATE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "timeupdate")
);
export const EVENT_DISPATCHER_TOUCH_CANCEL = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchcancel")
);
export const EVENT_DISPATCHER_TOUCH_END = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchend")
);
export const EVENT_DISPATCHER_TOUCH_MOVE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchmove")
);
export const EVENT_DISPATCHER_TOUCH_START = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "touchstart")
);
export const EVENT_DISPATCHER_TRANSITION_CANCEL = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "transitioncancel")
);
export const EVENT_DISPATCHER_TRANSITION_END = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "transitionend")
);
export const EVENT_DISPATCHER_UNLOAD = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "unload")
);
export const EVENT_DISPATCHER_VOLUME_CHANGE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "volumechange")
);
export const EVENT_DISPATCHER_WAITING = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventSourceFlags.Capture, "waiting")
);
export const EVENT_DISPATCHER_WHEEL = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles | NativeEventSourceFlags.Passive, "wheel")
);

export const EVENT_DISPATCHER_ACTIVE_TOUCH_END = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchend", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchmove", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const EVENT_DISPATCHER_ACTIVE_TOUCH_START = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "touchstart", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const EVENT_DISPATCHER_ACTIVE_WHEEL = (
  __IVI_TARGET__ === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<WheelEvent>(NativeEventSourceFlags.Capture | NativeEventSourceFlags.Bubbles, "wheel", EVENT_CAPTURE_ACTIVE_OPTIONS)
);

/**
 * Helper function that creates event handlers.
 *
 * @param d - Event source
 * @param h - Event Handler function
 * @param capture - Capture mode
 * @returns EventHandler instance
 */
export function createNativeEventHandler(src: NativeEventDispatcher<any>): (
  h: (ev: SyntheticNativeEvent<any>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<any> {
  const bubbleDescriptor = { src, flags: EventHandlerFlags.Bubble };
  const captureDescriptor = { src, flags: EventHandlerFlags.Capture };
  return (h, capture) => ({
    d: capture === true ? captureDescriptor : bubbleDescriptor,
    h,
  });
}

export const onAbort: <P>(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<UIEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ABORT!)
  );
export const onActivate: <P>(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<UIEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVATE!)
  );
export const onAriaRequest: <P>(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<UIEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ARIA_REQUEST!)
  );
export const onBeforeActivate: <P>(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<UIEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_ACTIVATE!)
  );
export const onBeforeCopy: <P>(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<ClipboardEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_COPY!)
  );
export const onBeforeCut: <P>(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<ClipboardEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_CUT!)
  );
export const onBeforeDeactivate: <P>(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<UIEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_DEACTIVATE!)
  );
export const onBeforePaste: <P>(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<ClipboardEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_PASTE!)
  );
export const onBlur: <P>(
  handler: (ev: SyntheticNativeEvent<FocusEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<FocusEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BLUR!)
  );
export const onCanPlay: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CAN_PLAY!)
  );
export const onCanPlaythrough: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CAN_PLAYTHROUGH!)
  );
export const onChange: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CHANGE!)
  );
export const onClick: <P>(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<MouseEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CLICK!)
  );
export const onContextMenu: <P>(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<PointerEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CONTEXT_MENU!)
  );
export const onCopy: <P>(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<ClipboardEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_COPY!)
  );
export const onCueChange: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CUE_CHANGE!)
  );
export const onCut: <P>(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<ClipboardEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CUT!)
  );
export const onDoubleClick: <P>(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<MouseEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DOUBLE_CLICK!)
  );
export const onDeactivate: <P>(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<UIEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DEACTIVATE!)
  );
export const onDrag: <P>(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<DragEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG!)
  );
export const onDragEnd: <P>(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<DragEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_END!)
  );
export const onDragEnter: <P>(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<DragEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_ENTER!)
  );
export const onDragLeave: <P>(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<DragEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_LEAVE!)
  );
export const onDragOver: <P>(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<DragEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_OVER!)
  );
export const onDragStart: <P>(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<DragEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_START!)
  );
export const onDrop: <P>(
  handler: (ev: SyntheticNativeEvent<DragEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<DragEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DROP!)
  );
export const onDurationChange: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DURATION_CHANGE!)
  );
export const onEmptied: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_EMPTIED!)
  );
export const onEncrypted: <P>(
  handler: (ev: SyntheticNativeEvent<MediaEncryptedEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<MediaEncryptedEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ENCRYPTED!)
  );
export const onEnded: <P>(
  handler: (ev: SyntheticNativeEvent<MediaStreamErrorEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<MediaStreamErrorEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ENDED!)
  );
export const onError: <P>(
  handler: (ev: SyntheticNativeEvent<ErrorEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<ErrorEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ERROR!)
  );
export const onFocus: <P>(
  handler: (ev: SyntheticNativeEvent<FocusEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<FocusEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_FOCUS!)
  );
export const onGotPointerCapture: <P>(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<PointerEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_GOT_POINTER_CAPTURE!)
  );
export const onBeforeInput: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_INPUT!)
  );
export const onInput: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_INPUT!)
  );
export const onInvalid: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_INVALID!)
  );
export const onKeyDown: <P>(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<KeyboardEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_KEY_DOWN!)
  );
export const onKeyPress: <P>(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<KeyboardEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_KEY_PRESS!)
  );
export const onKeyUp: <P>(
  handler: (ev: SyntheticNativeEvent<KeyboardEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<KeyboardEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_KEY_UP!)
  );
export const onLoad: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOAD!)
  );
export const onLoadedData: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOADED_DATA!)
  );
export const onLoadedMetadata: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOADED_METADATA!)
  );
export const onLoadStart: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOAD_START!)
  );
export const onLostPointerCapture: <P>(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<PointerEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOST_POINTER_CAPTURE!)
  );
export const onMouseDown: <P>(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<MouseEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_DOWN!)
  );
export const onMouseMove: <P>(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<MouseEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_MOVE!)
  );
export const onMouseOut: <P>(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<MouseEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_OUT!)
  );
export const onMouseOver: <P>(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<MouseEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_OVER!)
  );
export const onMouseUp: <P>(
  handler: (ev: SyntheticNativeEvent<MouseEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<MouseEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_UP!)
  );
export const onPaste: <P>(
  handler: (ev: SyntheticNativeEvent<ClipboardEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<ClipboardEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PASTE!)
  );
export const onPause: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PAUSE!)
  );
export const onPlay: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PLAY!)
  );
export const onPlaying: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PLAYING!)
  );
export const onPointerCancel: <P>(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<PointerEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_CANCEL!)
  );
export const onPointerDown: <P>(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<PointerEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_DOWN!)
  );
export const onPointerMove: <P>(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<PointerEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_MOVE!)
  );
export const onPointerOut: <P>(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<PointerEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_OUT!)
  );
export const onPointerOver: <P>(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<PointerEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_OVER!)
  );
export const onPointerUp: <P>(
  handler: (ev: SyntheticNativeEvent<PointerEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<PointerEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_UP!)
  );
export const onProgress: <P>(
  handler: (ev: SyntheticNativeEvent<ProgressEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<ProgressEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PROGRESS!)
  );
export const onRateChange: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_RATE_CHANGE!)
  );
export const onReset: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_RESET!)
  );
export const onScroll: <P>(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<UIEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SCROLL!)
  );
export const onSeeked: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SEEKED!)
  );
export const onSeeking: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SEEKING!)
  );
export const onSelect: <P>(
  handler: (ev: SyntheticNativeEvent<UIEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<UIEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SELECT!)
  );
export const onSelectStart: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SELECT_START!)
  );
export const onStalled: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_STALLED!)
  );
export const onSubmit: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SUBMIT!)
  );
export const onSuspend: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SUSPEND!)
  );
export const onTimeUpdate: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TIME_UPDATE!)
  );
export const onTouchCancel: <P>(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<TouchEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TOUCH_CANCEL!)
  );
export const onTouchEnd: <P>(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<TouchEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TOUCH_END!)
  );
export const onTouchMove: <P>(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<TouchEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TOUCH_MOVE!)
  );
export const onTouchStart: <P>(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<TouchEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TOUCH_START!)
  );
export const onTransitionCancel: <P>(
  handler: (ev: SyntheticNativeEvent<TransitionEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<TransitionEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TRANSITION_CANCEL!)
  );
export const onTransitionEnd: <P>(
  handler: (ev: SyntheticNativeEvent<TransitionEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<TransitionEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
      /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TRANSITION_END!)
  );
export const onUnload: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_UNLOAD!)
  );
export const onVolumeChange: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_VOLUME_CHANGE!)
  );
export const onWaiting: <P>(
  handler: (ev: SyntheticNativeEvent<Event>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<Event>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_WAITING!)
  );
export const onWheel: <P>(
  handler: (ev: SyntheticNativeEvent<WheelEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<WheelEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_WHEEL!)
  );

export const onActiveTouchEnd: <P>(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<TouchEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVE_TOUCH_END!)
  );
export const onActiveTouchMove: <P>(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<TouchEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE!)
  );
export const onActiveTouchStart: <P>(
  handler: (ev: SyntheticNativeEvent<TouchEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<TouchEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVE_TOUCH_START!)
  );
export const onActiveWheel: <P>(
  handler: (ev: SyntheticNativeEvent<WheelEvent>) => EventFlags | void,
  capture?: boolean,
) => EventHandlerNode<SyntheticNativeEvent<WheelEvent>> = (
    __IVI_TARGET__ === "ssr" ? () => (null as any) :
  /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVE_WHEEL!)
  );

/* tslint:enable:max-line-length */
