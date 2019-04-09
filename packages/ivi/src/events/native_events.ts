/**
 * Event Handlers.
 *
 * Optimizing compilers should inline all this functions and completely remove unused code.
 */

import { OpState } from "../vdom/state";
import { EventHandlerNode, EventHandlerFlags } from "./event_handler";
import { DispatchEventDirective } from "./dispatch_event";
import { NativeEventDispatcherFlags, createNativeEventDispatcher } from "./native_event_dispatcher";
import { EVENT_CAPTURE_ACTIVE_OPTIONS } from "./utils";

/* tslint:disable:max-line-length */
export const EVENT_DISPATCHER_ABORT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(0, "abort")
);
export const EVENT_DISPATCHER_ACTIVATE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "activate")
);
export const EVENT_DISPATCHER_ARIA_REQUEST = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "ariarequest")
);
export const EVENT_DISPATCHER_BEFORE_ACTIVATE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "beforeactivate")
);
export const EVENT_DISPATCHER_BEFORE_COPY = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(0, "beforecopy")
);
export const EVENT_DISPATCHER_BEFORE_CUT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "beforecut")
);
export const EVENT_DISPATCHER_BEFORE_DEACTIVATE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "beforedeactivate")
);
export const EVENT_DISPATCHER_BEFORE_PASTE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "beforepaste")
);
export const EVENT_DISPATCHER_BLUR = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<FocusEvent>(0, "blur")
);
export const EVENT_DISPATCHER_CAN_PLAY = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "canplay")
);
export const EVENT_DISPATCHER_CAN_PLAYTHROUGH = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "canplaythrough")
);
export const EVENT_DISPATCHER_CHANGE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "change")
);
export const EVENT_DISPATCHER_CLICK = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "click")
);
export const EVENT_DISPATCHER_CONTEXT_MENU = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "contextmenu")
);
export const EVENT_DISPATCHER_COPY = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "copy")
);
export const EVENT_DISPATCHER_CUE_CHANGE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "cuechange")
);
export const EVENT_DISPATCHER_CUT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "cut")
);
export const EVENT_DISPATCHER_DOUBLE_CLICK = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "dblclick")
);
export const EVENT_DISPATCHER_DEACTIVATE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "deactivate")
);
export const EVENT_DISPATCHER_DRAG = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "drag")
);
export const EVENT_DISPATCHER_DRAG_END = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragend")
);
export const EVENT_DISPATCHER_DRAG_ENTER = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragenter")
);
export const EVENT_DISPATCHER_DRAG_LEAVE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragleave")
);
export const EVENT_DISPATCHER_DRAG_OVER = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragover")
);
export const EVENT_DISPATCHER_DRAG_START = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragstart")
);
export const EVENT_DISPATCHER_DROP = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "drop")
);
export const EVENT_DISPATCHER_DURATION_CHANGE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "durationchange")
);
export const EVENT_DISPATCHER_EMPTIED = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "emptied")
);
export const EVENT_DISPATCHER_ENCRYPTED = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MediaEncryptedEvent>(0, "encrypted")
);
export const EVENT_DISPATCHER_ENDED = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MediaStreamErrorEvent>(0, "ended")
);
export const EVENT_DISPATCHER_ERROR = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ErrorEvent>(0, "error")
);
export const EVENT_DISPATCHER_FOCUS = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<FocusEvent>(0, "focus")
);
export const EVENT_DISPATCHER_GOT_POINTER_CAPTURE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(0, "gotpointercapture")
);
export const EVENT_DISPATCHER_BEFORE_INPUT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "beforeinput")
);
export const EVENT_DISPATCHER_INPUT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "input")
);
export const EVENT_DISPATCHER_INVALID = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "invalid")
);
export const EVENT_DISPATCHER_KEY_DOWN = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventDispatcherFlags.Bubbles, "keydown")
);
export const EVENT_DISPATCHER_KEY_PRESS = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventDispatcherFlags.Bubbles, "keypress")
);
export const EVENT_DISPATCHER_KEY_UP = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventDispatcherFlags.Bubbles, "keyup")
);
export const EVENT_DISPATCHER_LOAD = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "load")
);
export const EVENT_DISPATCHER_LOADED_DATA = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "loadeddata")
);
export const EVENT_DISPATCHER_LOADED_METADATA = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "loadedmetadata")
);
export const EVENT_DISPATCHER_LOAD_START = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "loadstart")
);
export const EVENT_DISPATCHER_LOST_POINTER_CAPTURE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(0, "lostpointercapture")
);
export const EVENT_DISPATCHER_MOUSE_DOWN = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mousedown")
);
export const EVENT_DISPATCHER_MOUSE_MOVE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mousemove")
);
export const EVENT_DISPATCHER_MOUSE_OUT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mouseout")
);
export const EVENT_DISPATCHER_MOUSE_OVER = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mouseover")
);
export const EVENT_DISPATCHER_MOUSE_UP = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mouseup")
);
export const EVENT_DISPATCHER_PASTE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "paste")
);
export const EVENT_DISPATCHER_PAUSE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "pause")
);
export const EVENT_DISPATCHER_PLAY = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "play")
);
export const EVENT_DISPATCHER_PLAYING = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "playing")
);
export const EVENT_DISPATCHER_POINTER_CANCEL = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointercancel")
);
export const EVENT_DISPATCHER_POINTER_DOWN = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointerdown")
);
export const EVENT_DISPATCHER_POINTER_MOVE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointermove")
);
export const EVENT_DISPATCHER_POINTER_OUT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointerout")
);
export const EVENT_DISPATCHER_POINTER_OVER = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointerover")
);
export const EVENT_DISPATCHER_POINTER_UP = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointerup")
);
export const EVENT_DISPATCHER_PROGRESS = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ProgressEvent>(0, "progress")
);
export const EVENT_DISPATCHER_RATE_CHANGE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "ratechange")
);
export const EVENT_DISPATCHER_RESET = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "reset")
);
export const EVENT_DISPATCHER_SCROLL = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(0, "scroll")
);
export const EVENT_DISPATCHER_SEEKED = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "seeked")
);
export const EVENT_DISPATCHER_SEEKING = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "seeking")
);
export const EVENT_DISPATCHER_SELECT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "select")
);
export const EVENT_DISPATCHER_SELECT_START = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "selectstart")
);
export const EVENT_DISPATCHER_STALLED = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "stalled")
);
export const EVENT_DISPATCHER_SUBMIT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "submit")
);
export const EVENT_DISPATCHER_SUSPEND = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "suspend")
);
export const EVENT_DISPATCHER_TIME_UPDATE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "timeupdate")
);
export const EVENT_DISPATCHER_TOUCH_CANCEL = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchcancel")
);
export const EVENT_DISPATCHER_TOUCH_END = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchend")
);
export const EVENT_DISPATCHER_TOUCH_MOVE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchmove")
);
export const EVENT_DISPATCHER_TOUCH_START = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchstart")
);
export const EVENT_DISPATCHER_TRANSITION_CANCEL = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventDispatcherFlags.Bubbles, "transitioncancel")
);
export const EVENT_DISPATCHER_TRANSITION_END = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventDispatcherFlags.Bubbles, "transitionend")
);
export const EVENT_DISPATCHER_TRANSITION_RUN = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventDispatcherFlags.Bubbles, "transitionrun")
);
export const EVENT_DISPATCHER_TRANSITION_START = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventDispatcherFlags.Bubbles, "transitionstart")
);
export const EVENT_DISPATCHER_UNLOAD = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "unload")
);
export const EVENT_DISPATCHER_VOLUME_CHANGE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "volumechange")
);
export const EVENT_DISPATCHER_WAITING = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "waiting")
);
export const EVENT_DISPATCHER_WHEEL = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<WheelEvent>(NativeEventDispatcherFlags.Bubbles, "wheel")
);

export const EVENT_DISPATCHER_ACTIVE_TOUCH_END = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchend", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchmove", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const EVENT_DISPATCHER_ACTIVE_TOUCH_START = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchstart", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const EVENT_DISPATCHER_ACTIVE_WHEEL = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<WheelEvent>(NativeEventDispatcherFlags.Bubbles, "wheel", EVENT_CAPTURE_ACTIVE_OPTIONS)
);

/**
 * Helper function that creates event handlers.
 *
 * @param d Event source
 * @param h Event Handler function
 * @param capture Capture mode
 * @returns EventHandler instance
 */
export function createNativeEventHandler(src: {}): (
  h: (ev: any, target?: any) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<any> {
  const bubbleDescriptor = { src, flags: 0 };
  const captureDescriptor = { src, flags: EventHandlerFlags.Capture };
  return (h, capture) => ({
    d: capture === true ? captureDescriptor : bubbleDescriptor,
    h,
  });
}

export const onAbort: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ABORT!)
  );
export const onActivate: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVATE!)
  );
export const onAriaRequest: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ARIA_REQUEST!)
  );
export const onBeforeActivate: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_ACTIVATE!)
  );
export const onBeforeCopy: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_COPY!)
  );
export const onBeforeCut: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_CUT!)
  );
export const onBeforeDeactivate: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_DEACTIVATE!)
  );
export const onBeforePaste: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_PASTE!)
  );
export const onBlur: <P>(
  handler: (event: FocusEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<FocusEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BLUR!)
  );
export const onCanPlay: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CAN_PLAY!)
  );
export const onCanPlaythrough: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CAN_PLAYTHROUGH!)
  );
export const onChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CHANGE!)
  );
export const onClick: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CLICK!)
  );
export const onContextMenu: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CONTEXT_MENU!)
  );
export const onCopy: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_COPY!)
  );
export const onCueChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CUE_CHANGE!)
  );
export const onCut: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_CUT!)
  );
export const onDoubleClick: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DOUBLE_CLICK!)
  );
export const onDeactivate: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DEACTIVATE!)
  );
export const onDrag: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG!)
  );
export const onDragEnd: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_END!)
  );
export const onDragEnter: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_ENTER!)
  );
export const onDragLeave: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_LEAVE!)
  );
export const onDragOver: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_OVER!)
  );
export const onDragStart: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DRAG_START!)
  );
export const onDrop: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DROP!)
  );
export const onDurationChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_DURATION_CHANGE!)
  );
export const onEmptied: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_EMPTIED!)
  );
export const onEncrypted: <P>(
  handler: (event: MediaEncryptedEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<MediaEncryptedEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ENCRYPTED!)
  );
export const onEnded: <P>(
  handler: (event: MediaStreamErrorEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<MediaStreamErrorEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ENDED!)
  );
export const onError: <P>(
  handler: (event: ErrorEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<ErrorEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ERROR!)
  );
export const onFocus: <P>(
  handler: (event: FocusEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<FocusEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_FOCUS!)
  );
export const onGotPointerCapture: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_GOT_POINTER_CAPTURE!)
  );
export const onBeforeInput: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_BEFORE_INPUT!)
  );
export const onInput: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_INPUT!)
  );
export const onInvalid: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_INVALID!)
  );
export const onKeyDown: <P>(
  handler: (event: KeyboardEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<KeyboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_KEY_DOWN!)
  );
export const onKeyPress: <P>(
  handler: (event: KeyboardEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<KeyboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_KEY_PRESS!)
  );
export const onKeyUp: <P>(
  handler: (event: KeyboardEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<KeyboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_KEY_UP!)
  );
export const onLoad: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOAD!)
  );
export const onLoadedData: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOADED_DATA!)
  );
export const onLoadedMetadata: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOADED_METADATA!)
  );
export const onLoadStart: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOAD_START!)
  );
export const onLostPointerCapture: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_LOST_POINTER_CAPTURE!)
  );
export const onMouseDown: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_DOWN!)
  );
export const onMouseMove: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_MOVE!)
  );
export const onMouseOut: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_OUT!)
  );
export const onMouseOver: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_OVER!)
  );
export const onMouseUp: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_MOUSE_UP!)
  );
export const onPaste: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PASTE!)
  );
export const onPause: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PAUSE!)
  );
export const onPlay: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PLAY!)
  );
export const onPlaying: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PLAYING!)
  );
export const onPointerCancel: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_CANCEL!)
  );
export const onPointerDown: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_DOWN!)
  );
export const onPointerMove: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_MOVE!)
  );
export const onPointerOut: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_OUT!)
  );
export const onPointerOver: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_OVER!)
  );
export const onPointerUp: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_POINTER_UP!)
  );
export const onProgress: <P>(
  handler: (event: ProgressEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<ProgressEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_PROGRESS!)
  );
export const onRateChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_RATE_CHANGE!)
  );
export const onReset: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_RESET!)
  );
export const onScroll: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SCROLL!)
  );
export const onSeeked: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SEEKED!)
  );
export const onSeeking: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SEEKING!)
  );
export const onSelect: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SELECT!)
  );
export const onSelectStart: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SELECT_START!)
  );
export const onStalled: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_STALLED!)
  );
export const onSubmit: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SUBMIT!)
  );
export const onSuspend: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_SUSPEND!)
  );
export const onTimeUpdate: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TIME_UPDATE!)
  );
export const onTouchCancel: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TOUCH_CANCEL!)
  );
export const onTouchEnd: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TOUCH_END!)
  );
export const onTouchMove: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TOUCH_MOVE!)
  );
export const onTouchStart: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TOUCH_START!)
  );
export const onTransitionCancel: <P>(
  handler: (event: TransitionEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TRANSITION_CANCEL!)
  );
export const onTransitionEnd: <P>(
  handler: (event: TransitionEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TRANSITION_END!)
  );
export const onTransitionRun: <P>(
  handler: (event: TransitionEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TRANSITION_RUN!)
  );
export const onTransitionStart: <P>(
  handler: (event: TransitionEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_TRANSITION_START!)
  );
export const onUnload: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_UNLOAD!)
  );
export const onVolumeChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_VOLUME_CHANGE!)
  );
export const onWaiting: <P>(
  handler: (event: Event, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_WAITING!)
  );
export const onWheel: <P>(
  handler: (event: WheelEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<WheelEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_WHEEL!)
  );

export const onActiveTouchEnd: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVE_TOUCH_END!)
  );
export const onActiveTouchMove: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVE_TOUCH_MOVE!)
  );
export const onActiveTouchStart: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVE_TOUCH_START!)
  );
export const onActiveWheel: <P>(
  handler: (event: WheelEvent, currentTarget?: OpState) => DispatchEventDirective | void,
  capture?: boolean,
) => EventHandlerNode<WheelEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EVENT_DISPATCHER_ACTIVE_WHEEL!)
  );

/* tslint:enable:max-line-length */
