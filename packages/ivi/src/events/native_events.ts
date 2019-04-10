/**
 * Event Handlers.
 *
 * Optimizing compilers should inline all this functions and completely remove unused code.
 */

import { doc } from "../dom/shortcuts";
import { OpState } from "../vdom/state";
import { withSchedulerTick } from "../scheduler";
import { EventHandlerNode, EventHandlerFlags } from "./event_handler";
import { DispatchTarget, dispatchEvent } from "./dispatch";
import { EVENT_CAPTURE_ACTIVE_OPTIONS } from "./utils";

/**
 * NativeEventDispatcherFlags.
 */
export const enum NativeEventDispatcherFlags {
  /**
   * Bubbles flag indicating that the event is bubbling.
   */
  Bubbles = 1,
}

export type NativeEventHandler = <E extends Event>(
  event: E,
  currentTarget?: OpState,
  src?: {},
) => boolean | void;

function dispatchNativeEvent(
  event: Event,
  currentTarget: DispatchTarget<NativeEventHandler>,
  src: {},
): boolean | void {
  return currentTarget.h.h(event, currentTarget.t, src);
}

/**
 * Creates a native event dispatcher.
 *
 * @typeparam E Native event type.
 * @param flags See {@link NativeEventSourceFlags} for details.
 * @param name Event name
 * @param options Event handler options
 * @returns {@link NativeEventDispatcher} instance
 */
export function createNativeEventDispatcher<E extends Event>(
  flags: NativeEventDispatcherFlags,
  name: string,
  options: { capture?: boolean, passive?: boolean } | boolean = true,
): {} {
  const source = withSchedulerTick((event: Event): void => {
    dispatchEvent(
      source,
      event.target as Element,
      event,
      (flags & NativeEventDispatcherFlags.Bubbles) !== 0,
    );
  });
  doc.addEventListener(name, source, options);
  return source;
}

/* tslint:disable:max-line-length */
export const ABORT_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(0, "abort")
);
export const ACTIVATE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "activate")
);
export const ARIA_REQUEST_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "ariarequest")
);
export const BEFORE_ACTIVATE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "beforeactivate")
);
export const BEFORE_COPY_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(0, "beforecopy")
);
export const BEFORE_CUT_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "beforecut")
);
export const BEFORE_DEACTIVATE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "beforedeactivate")
);
export const BEFORE_PASTE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "beforepaste")
);
export const BLUR_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<FocusEvent>(0, "blur")
);
export const CAN_PLAY_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "canplay")
);
export const CAN_PLAYTHROUGH_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "canplaythrough")
);
export const CHANGE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "change")
);
export const CLICK_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "click")
);
export const CONTEXT_MENU_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "contextmenu")
);
export const COPY_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "copy")
);
export const CUE_CHANGE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "cuechange")
);
export const CUT_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "cut")
);
export const DOUBLE_CLICK_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "dblclick")
);
export const DEACTIVATE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "deactivate")
);
export const DRAG_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "drag")
);
export const DRAG_END_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragend")
);
export const DRAG_ENTER_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragenter")
);
export const DRAG_LEAVE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragleave")
);
export const DRAG_OVER_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragover")
);
export const DRAG_START_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "dragstart")
);
export const DROP_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<DragEvent>(NativeEventDispatcherFlags.Bubbles, "drop")
);
export const DURATION_CHANGE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "durationchange")
);
export const EMPTIED_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "emptied")
);
export const ENCRYPTED_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MediaEncryptedEvent>(0, "encrypted")
);
export const ENDED_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MediaStreamErrorEvent>(0, "ended")
);
export const ERROR_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ErrorEvent>(0, "error")
);
export const FOCUS_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<FocusEvent>(0, "focus")
);
export const GOT_POINTER_CAPTURE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(0, "gotpointercapture")
);
export const BEFORE_INPUT_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "beforeinput")
);
export const INPUT_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "input")
);
export const INVALID_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "invalid")
);
export const KEY_DOWN_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventDispatcherFlags.Bubbles, "keydown")
);
export const KEY_PRESS_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventDispatcherFlags.Bubbles, "keypress")
);
export const KEY_UP_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<KeyboardEvent>(NativeEventDispatcherFlags.Bubbles, "keyup")
);
export const LOAD_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "load")
);
export const LOADED_DATA_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "loadeddata")
);
export const LOADED_METADATA_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "loadedmetadata")
);
export const LOAD_START_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "loadstart")
);
export const LOST_POINTER_CAPTURE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(0, "lostpointercapture")
);
export const MOUSE_DOWN_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mousedown")
);
export const MOUSE_MOVE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mousemove")
);
export const MOUSE_OUT_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mouseout")
);
export const MOUSE_OVER_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mouseover")
);
export const MOUSE_UP_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<MouseEvent>(NativeEventDispatcherFlags.Bubbles, "mouseup")
);
export const PASTE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ClipboardEvent>(NativeEventDispatcherFlags.Bubbles, "paste")
);
export const PAUSE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "pause")
);
export const PLAY_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "play")
);
export const PLAYING_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "playing")
);
export const POINTER_CANCEL_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointercancel")
);
export const POINTER_DOWN_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointerdown")
);
export const POINTER_MOVE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointermove")
);
export const POINTER_OUT_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointerout")
);
export const POINTER_OVER_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointerover")
);
export const POINTER_UP_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<PointerEvent>(NativeEventDispatcherFlags.Bubbles, "pointerup")
);
export const PROGRESS_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<ProgressEvent>(0, "progress")
);
export const RATE_CHANGE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "ratechange")
);
export const RESET_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "reset")
);
export const SCROLL_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(0, "scroll")
);
export const SEEKED_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "seeked")
);
export const SEEKING_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "seeking")
);
export const SELECT_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<UIEvent>(NativeEventDispatcherFlags.Bubbles, "select")
);
export const SELECT_START_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "selectstart")
);
export const STALLED_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "stalled")
);
export const SUBMIT_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(NativeEventDispatcherFlags.Bubbles, "submit")
);
export const SUSPEND_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "suspend")
);
export const TIME_UPDATE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "timeupdate")
);
export const TOUCH_CANCEL_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchcancel")
);
export const TOUCH_END_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchend")
);
export const TOUCH_MOVE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchmove")
);
export const TOUCH_START_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchstart")
);
export const TRANSITION_CANCEL_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventDispatcherFlags.Bubbles, "transitioncancel")
);
export const TRANSITION_END_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventDispatcherFlags.Bubbles, "transitionend")
);
export const TRANSITION_RUN_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventDispatcherFlags.Bubbles, "transitionrun")
);
export const TRANSITION_START_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TransitionEvent>(NativeEventDispatcherFlags.Bubbles, "transitionstart")
);
export const UNLOAD_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "unload")
);
export const VOLUME_CHANGE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "volumechange")
);
export const WAITING_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<Event>(0, "waiting")
);
export const WHEEL_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<WheelEvent>(NativeEventDispatcherFlags.Bubbles, "wheel")
);

export const ACTIVE_TOUCH_END_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchend", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const ACTIVE_TOUCH_MOVE_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchmove", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const ACTIVE_TOUCH_START_EVENT = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
  /*#__PURE__*/createNativeEventDispatcher<TouchEvent>(NativeEventDispatcherFlags.Bubbles, "touchstart", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const ACTIVE_WHEEL_EVENT = (
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
export function createNativeEventHandler(s: {}): (
  h: (ev: any, target?: any) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<any> {
  const bubbleDescriptor = { s, h: dispatchNativeEvent, f: 0 };
  const captureDescriptor = { s, h: dispatchNativeEvent, f: EventHandlerFlags.Capture };
  return (h, capture) => ({
    d: capture === true ? captureDescriptor : bubbleDescriptor,
    h,
  });
}

export const onAbort: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ABORT_EVENT!)
  );
export const onActivate: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ACTIVATE_EVENT!)
  );
export const onAriaRequest: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ARIA_REQUEST_EVENT!)
  );
export const onBeforeActivate: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(BEFORE_ACTIVATE_EVENT!)
  );
export const onBeforeCopy: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(BEFORE_COPY_EVENT!)
  );
export const onBeforeCut: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(BEFORE_CUT_EVENT!)
  );
export const onBeforeDeactivate: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(BEFORE_DEACTIVATE_EVENT!)
  );
export const onBeforePaste: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(BEFORE_PASTE_EVENT!)
  );
export const onBlur: <P>(
  handler: (event: FocusEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<FocusEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(BLUR_EVENT!)
  );
export const onCanPlay: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(CAN_PLAY_EVENT!)
  );
export const onCanPlaythrough: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(CAN_PLAYTHROUGH_EVENT!)
  );
export const onChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(CHANGE_EVENT!)
  );
export const onClick: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(CLICK_EVENT!)
  );
export const onContextMenu: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(CONTEXT_MENU_EVENT!)
  );
export const onCopy: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(COPY_EVENT!)
  );
export const onCueChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(CUE_CHANGE_EVENT!)
  );
export const onCut: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(CUT_EVENT!)
  );
export const onDoubleClick: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DOUBLE_CLICK_EVENT!)
  );
export const onDeactivate: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DEACTIVATE_EVENT!)
  );
export const onDrag: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DRAG_EVENT!)
  );
export const onDragEnd: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DRAG_END_EVENT!)
  );
export const onDragEnter: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DRAG_ENTER_EVENT!)
  );
export const onDragLeave: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DRAG_LEAVE_EVENT!)
  );
export const onDragOver: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DRAG_OVER_EVENT!)
  );
export const onDragStart: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DRAG_START_EVENT!)
  );
export const onDrop: <P>(
  handler: (event: DragEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DROP_EVENT!)
  );
export const onDurationChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(DURATION_CHANGE_EVENT!)
  );
export const onEmptied: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(EMPTIED_EVENT!)
  );
export const onEncrypted: <P>(
  handler: (event: MediaEncryptedEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<MediaEncryptedEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ENCRYPTED_EVENT!)
  );
export const onEnded: <P>(
  handler: (event: MediaStreamErrorEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<MediaStreamErrorEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ENDED_EVENT!)
  );
export const onError: <P>(
  handler: (event: ErrorEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<ErrorEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ERROR_EVENT!)
  );
export const onFocus: <P>(
  handler: (event: FocusEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<FocusEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(FOCUS_EVENT!)
  );
export const onGotPointerCapture: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(GOT_POINTER_CAPTURE_EVENT!)
  );
export const onBeforeInput: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(BEFORE_INPUT_EVENT!)
  );
export const onInput: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(INPUT_EVENT!)
  );
export const onInvalid: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(INVALID_EVENT!)
  );
export const onKeyDown: <P>(
  handler: (event: KeyboardEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<KeyboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(KEY_DOWN_EVENT!)
  );
export const onKeyPress: <P>(
  handler: (event: KeyboardEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<KeyboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(KEY_PRESS_EVENT!)
  );
export const onKeyUp: <P>(
  handler: (event: KeyboardEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<KeyboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(KEY_UP_EVENT!)
  );
export const onLoad: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(LOAD_EVENT!)
  );
export const onLoadedData: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(LOADED_DATA_EVENT!)
  );
export const onLoadedMetadata: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(LOADED_METADATA_EVENT!)
  );
export const onLoadStart: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(LOAD_START_EVENT!)
  );
export const onLostPointerCapture: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(LOST_POINTER_CAPTURE_EVENT!)
  );
export const onMouseDown: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(MOUSE_DOWN_EVENT!)
  );
export const onMouseMove: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(MOUSE_MOVE_EVENT!)
  );
export const onMouseOut: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(MOUSE_OUT_EVENT!)
  );
export const onMouseOver: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(MOUSE_OVER_EVENT!)
  );
export const onMouseUp: <P>(
  handler: (event: MouseEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(MOUSE_UP_EVENT!)
  );
export const onPaste: <P>(
  handler: (event: ClipboardEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(PASTE_EVENT!)
  );
export const onPause: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(PAUSE_EVENT!)
  );
export const onPlay: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(PLAY_EVENT!)
  );
export const onPlaying: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(PLAYING_EVENT!)
  );
export const onPointerCancel: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(POINTER_CANCEL_EVENT!)
  );
export const onPointerDown: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(POINTER_DOWN_EVENT!)
  );
export const onPointerMove: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(POINTER_MOVE_EVENT!)
  );
export const onPointerOut: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(POINTER_OUT_EVENT!)
  );
export const onPointerOver: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(POINTER_OVER_EVENT!)
  );
export const onPointerUp: <P>(
  handler: (event: PointerEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(POINTER_UP_EVENT!)
  );
export const onProgress: <P>(
  handler: (event: ProgressEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<ProgressEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(PROGRESS_EVENT!)
  );
export const onRateChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(RATE_CHANGE_EVENT!)
  );
export const onReset: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(RESET_EVENT!)
  );
export const onScroll: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(SCROLL_EVENT!)
  );
export const onSeeked: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(SEEKED_EVENT!)
  );
export const onSeeking: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(SEEKING_EVENT!)
  );
export const onSelect: <P>(
  handler: (event: UIEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(SELECT_EVENT!)
  );
export const onSelectStart: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(SELECT_START_EVENT!)
  );
export const onStalled: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(STALLED_EVENT!)
  );
export const onSubmit: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(SUBMIT_EVENT!)
  );
export const onSuspend: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(SUSPEND_EVENT!)
  );
export const onTimeUpdate: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(TIME_UPDATE_EVENT!)
  );
export const onTouchCancel: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(TOUCH_CANCEL_EVENT!)
  );
export const onTouchEnd: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(TOUCH_END_EVENT!)
  );
export const onTouchMove: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(TOUCH_MOVE_EVENT!)
  );
export const onTouchStart: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(TOUCH_START_EVENT!)
  );
export const onTransitionCancel: <P>(
  handler: (event: TransitionEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(TRANSITION_CANCEL_EVENT!)
  );
export const onTransitionEnd: <P>(
  handler: (event: TransitionEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(TRANSITION_END_EVENT!)
  );
export const onTransitionRun: <P>(
  handler: (event: TransitionEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(TRANSITION_RUN_EVENT!)
  );
export const onTransitionStart: <P>(
  handler: (event: TransitionEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(TRANSITION_START_EVENT!)
  );
export const onUnload: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(UNLOAD_EVENT!)
  );
export const onVolumeChange: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(VOLUME_CHANGE_EVENT!)
  );
export const onWaiting: <P>(
  handler: (event: Event, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<Event> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(WAITING_EVENT!)
  );
export const onWheel: <P>(
  handler: (event: WheelEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<WheelEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(WHEEL_EVENT!)
  );

export const onActiveTouchEnd: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ACTIVE_TOUCH_END_EVENT!)
  );
export const onActiveTouchMove: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ACTIVE_TOUCH_MOVE_EVENT!)
  );
export const onActiveTouchStart: <P>(
  handler: (event: TouchEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ACTIVE_TOUCH_START_EVENT!)
  );
export const onActiveWheel: <P>(
  handler: (event: WheelEvent, currentTarget?: OpState) => boolean | void,
  capture?: boolean,
) => EventHandlerNode<WheelEvent> = (
    process.env.IVI_TARGET === "ssr" ? () => (null as any) :
    /*#__PURE__*/createNativeEventHandler(ACTIVE_WHEEL_EVENT!)
  );

/* tslint:enable:max-line-length */
