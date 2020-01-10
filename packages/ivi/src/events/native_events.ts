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

export interface NativeEventSource<E extends Event> {
  next: (event: E) => void;
}

export type NativeEventHandler<E extends Event> = (event: E, currentTarget: OpState, src: {}) => number | void;

const dispatchNativeEvent = (event: Event, currentTarget: DispatchTarget<NativeEventHandler<Event>>, src: {}) => (
  currentTarget.h.h(event, currentTarget.t, src)
);

/**
 * Creates a native event source.
 *
 * @typeparam E Native event type.
 * @param flags See {@link NativeEventSourceFlags} for details.
 * @param name Event name
 * @param options Event handler options
 * @returns {@link NativeEventSource} instance
 */
export function createNativeEventSource<E extends Event>(
  name: string,
  options: { capture?: boolean, passive?: boolean } | boolean = true,
): NativeEventSource<E> {
  const source = {
    next: (event: Event): void => {
      dispatchEvent(source, event.target as Element, event);
    }
  };
  doc.addEventListener(name, withSchedulerTick((event) => { source.next(event); }), options);
  return source;
}

export function addNativeEventMiddleware<E extends Event>(
  source: NativeEventSource<E>,
  fn: (event: E, next: (event: E) => void) => void,
): void {
  const next = source.next;
  source.next = (event: E) => { fn(event, next); };
}

export const ABORT_EVENT = (
  /*#__PURE__*/createNativeEventSource<UIEvent>("abort")
);
export const ACTIVATE_EVENT = (
  /*#__PURE__*/createNativeEventSource<UIEvent>("activate")
);
export const ARIA_REQUEST_EVENT = (
  /*#__PURE__*/createNativeEventSource<UIEvent>("ariarequest")
);
export const BEFORE_ACTIVATE_EVENT = (
  /*#__PURE__*/createNativeEventSource<UIEvent>("beforeactivate")
);
export const BEFORE_COPY_EVENT = (
  /*#__PURE__*/createNativeEventSource<ClipboardEvent>("beforecopy")
);
export const BEFORE_CUT_EVENT = (
  /*#__PURE__*/createNativeEventSource<ClipboardEvent>("beforecut")
);
export const BEFORE_DEACTIVATE_EVENT = (
  /*#__PURE__*/createNativeEventSource<UIEvent>("beforedeactivate")
);
export const BEFORE_PASTE_EVENT = (
  /*#__PURE__*/createNativeEventSource<ClipboardEvent>("beforepaste")
);
export const BLUR_EVENT = (
  /*#__PURE__*/createNativeEventSource<FocusEvent>("blur")
);
export const CAN_PLAY_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("canplay")
);
export const CAN_PLAYTHROUGH_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("canplaythrough")
);
export const CHANGE_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("change")
);
export const CLICK_EVENT = (
  /*#__PURE__*/createNativeEventSource<MouseEvent>("click")
);
export const CONTEXT_MENU_EVENT = (
  /*#__PURE__*/createNativeEventSource<PointerEvent>("contextmenu")
);
export const COPY_EVENT = (
  /*#__PURE__*/createNativeEventSource<ClipboardEvent>("copy")
);
export const CUE_CHANGE_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("cuechange")
);
export const CUT_EVENT = (
  /*#__PURE__*/createNativeEventSource<ClipboardEvent>("cut")
);
export const DOUBLE_CLICK_EVENT = (
  /*#__PURE__*/createNativeEventSource<MouseEvent>("dblclick")
);
export const DEACTIVATE_EVENT = (
  /*#__PURE__*/createNativeEventSource<UIEvent>("deactivate")
);
export const DRAG_EVENT = (
  /*#__PURE__*/createNativeEventSource<DragEvent>("drag")
);
export const DRAG_END_EVENT = (
  /*#__PURE__*/createNativeEventSource<DragEvent>("dragend")
);
export const DRAG_ENTER_EVENT = (
  /*#__PURE__*/createNativeEventSource<DragEvent>("dragenter")
);
export const DRAG_LEAVE_EVENT = (
  /*#__PURE__*/createNativeEventSource<DragEvent>("dragleave")
);
export const DRAG_OVER_EVENT = (
  /*#__PURE__*/createNativeEventSource<DragEvent>("dragover")
);
export const DRAG_START_EVENT = (
  /*#__PURE__*/createNativeEventSource<DragEvent>("dragstart")
);
export const DROP_EVENT = (
  /*#__PURE__*/createNativeEventSource<DragEvent>("drop")
);
export const DURATION_CHANGE_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("durationchange")
);
export const EMPTIED_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("emptied")
);
export const ENCRYPTED_EVENT = (
  /*#__PURE__*/createNativeEventSource<MediaEncryptedEvent>("encrypted")
);
export const ENDED_EVENT = (
  /*#__PURE__*/createNativeEventSource<MediaStreamErrorEvent>("ended")
);
export const ERROR_EVENT = (
  /*#__PURE__*/createNativeEventSource<ErrorEvent>("error")
);
export const FOCUS_EVENT = (
  /*#__PURE__*/createNativeEventSource<FocusEvent>("focus")
);
export const GOT_POINTER_CAPTURE_EVENT = (
  /*#__PURE__*/createNativeEventSource<PointerEvent>("gotpointercapture")
);
export const BEFORE_INPUT_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("beforeinput")
);
export const INPUT_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("input")
);
export const INVALID_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("invalid")
);
export const KEY_DOWN_EVENT = (
  /*#__PURE__*/createNativeEventSource<KeyboardEvent>("keydown")
);
export const KEY_PRESS_EVENT = (
  /*#__PURE__*/createNativeEventSource<KeyboardEvent>("keypress")
);
export const KEY_UP_EVENT = (
  /*#__PURE__*/createNativeEventSource<KeyboardEvent>("keyup")
);
export const LOAD_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("load")
);
export const LOADED_DATA_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("loadeddata")
);
export const LOADED_METADATA_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("loadedmetadata")
);
export const LOAD_START_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("loadstart")
);
export const LOST_POINTER_CAPTURE_EVENT = (
  /*#__PURE__*/createNativeEventSource<PointerEvent>("lostpointercapture")
);
export const MOUSE_DOWN_EVENT = (
  /*#__PURE__*/createNativeEventSource<MouseEvent>("mousedown")
);
export const MOUSE_OUT_EVENT = (
  /*#__PURE__*/createNativeEventSource<MouseEvent>("mouseout")
);
export const MOUSE_OVER_EVENT = (
  /*#__PURE__*/createNativeEventSource<MouseEvent>("mouseover")
);
export const MOUSE_UP_EVENT = (
  /*#__PURE__*/createNativeEventSource<MouseEvent>("mouseup")
);
export const PASTE_EVENT = (
  /*#__PURE__*/createNativeEventSource<ClipboardEvent>("paste")
);
export const PAUSE_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("pause")
);
export const PLAY_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("play")
);
export const PLAYING_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("playing")
);
export const POINTER_CANCEL_EVENT = (
  /*#__PURE__*/createNativeEventSource<PointerEvent>("pointercancel")
);
export const POINTER_DOWN_EVENT = (
  /*#__PURE__*/createNativeEventSource<PointerEvent>("pointerdown")
);
export const POINTER_OUT_EVENT = (
  /*#__PURE__*/createNativeEventSource<PointerEvent>("pointerout")
);
export const POINTER_OVER_EVENT = (
  /*#__PURE__*/createNativeEventSource<PointerEvent>("pointerover")
);
export const POINTER_UP_EVENT = (
  /*#__PURE__*/createNativeEventSource<PointerEvent>("pointerup")
);
export const PROGRESS_EVENT = (
  /*#__PURE__*/createNativeEventSource<ProgressEvent>("progress")
);
export const RATE_CHANGE_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("ratechange")
);
export const RESET_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("reset")
);
export const SCROLL_EVENT = (
  /*#__PURE__*/createNativeEventSource<UIEvent>("scroll")
);
export const SEEKED_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("seeked")
);
export const SEEKING_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("seeking")
);
export const SELECT_EVENT = (
  /*#__PURE__*/createNativeEventSource<UIEvent>("select")
);
export const SELECT_START_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("selectstart")
);
export const STALLED_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("stalled")
);
export const SUBMIT_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("submit")
);
export const SUSPEND_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("suspend")
);
export const TIME_UPDATE_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("timeupdate")
);
export const TOUCH_CANCEL_EVENT = (
  /*#__PURE__*/createNativeEventSource<TouchEvent>("touchcancel")
);
export const TOUCH_END_EVENT = (
  /*#__PURE__*/createNativeEventSource<TouchEvent>("touchend")
);
export const TOUCH_START_EVENT = (
  /*#__PURE__*/createNativeEventSource<TouchEvent>("touchstart")
);
export const TRANSITION_CANCEL_EVENT = (
  /*#__PURE__*/createNativeEventSource<TransitionEvent>("transitioncancel")
);
export const TRANSITION_END_EVENT = (
  /*#__PURE__*/createNativeEventSource<TransitionEvent>("transitionend")
);
export const TRANSITION_RUN_EVENT = (
  /*#__PURE__*/createNativeEventSource<TransitionEvent>("transitionrun")
);
export const TRANSITION_START_EVENT = (
  /*#__PURE__*/createNativeEventSource<TransitionEvent>("transitionstart")
);
export const UNLOAD_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("unload")
);
export const VOLUME_CHANGE_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("volumechange")
);
export const WAITING_EVENT = (
  /*#__PURE__*/createNativeEventSource<Event>("waiting")
);
export const WHEEL_EVENT = (
  /*#__PURE__*/createNativeEventSource<WheelEvent>("wheel")
);

export const ACTIVE_TOUCH_END_EVENT = (
  /*#__PURE__*/createNativeEventSource<TouchEvent>("touchend", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const ACTIVE_TOUCH_START_EVENT = (
  /*#__PURE__*/createNativeEventSource<TouchEvent>("touchstart", EVENT_CAPTURE_ACTIVE_OPTIONS)
);
export const ACTIVE_WHEEL_EVENT = (
  /*#__PURE__*/createNativeEventSource<WheelEvent>("wheel", EVENT_CAPTURE_ACTIVE_OPTIONS)
);

/**
 * Helper function that creates native event handler factories.
 *
 * @param s Native event source.
 * @returns Native event handler factory.
 */
export function nativeEventHandlerFactory(s: {}):
  (h: NativeEventHandler<any>, capture?: boolean) => EventHandlerNode<any> {
  const bubbleDescriptor = { s, h: dispatchNativeEvent, f: 0 };
  const captureDescriptor = { s, h: dispatchNativeEvent, f: EventHandlerFlags.Capture };
  return (h, capture) => ({
    d: capture === true ? captureDescriptor : bubbleDescriptor,
    h,
  });
}

export const onAbort: <P>(
  handler: NativeEventHandler<UIEvent>,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(ABORT_EVENT)
  );
export const onActivate: <P>(
  handler: NativeEventHandler<UIEvent>,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(ACTIVATE_EVENT)
  );
export const onAriaRequest: <P>(
  handler: NativeEventHandler<UIEvent>,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(ARIA_REQUEST_EVENT)
  );
export const onBeforeActivate: <P>(
  handler: NativeEventHandler<UIEvent>,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(BEFORE_ACTIVATE_EVENT)
  );
export const onBeforeCopy: <P>(
  handler: NativeEventHandler<ClipboardEvent>,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(BEFORE_COPY_EVENT)
  );
export const onBeforeCut: <P>(
  handler: NativeEventHandler<ClipboardEvent>,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(BEFORE_CUT_EVENT)
  );
export const onBeforeDeactivate: <P>(
  handler: NativeEventHandler<UIEvent>,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(BEFORE_DEACTIVATE_EVENT)
  );
export const onBeforePaste: <P>(
  handler: NativeEventHandler<ClipboardEvent>,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(BEFORE_PASTE_EVENT)
  );
export const onBlur: <P>(
  handler: NativeEventHandler<FocusEvent>,
  capture?: boolean,
) => EventHandlerNode<FocusEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(BLUR_EVENT)
  );
export const onCanPlay: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(CAN_PLAY_EVENT)
  );
export const onCanPlaythrough: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(CAN_PLAYTHROUGH_EVENT)
  );
export const onChange: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(CHANGE_EVENT)
  );
export const onClick: <P>(
  handler: NativeEventHandler<MouseEvent>,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(CLICK_EVENT)
  );
export const onContextMenu: <P>(
  handler: NativeEventHandler<PointerEvent>,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(CONTEXT_MENU_EVENT)
  );
export const onCopy: <P>(
  handler: NativeEventHandler<ClipboardEvent>,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(COPY_EVENT)
  );
export const onCueChange: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(CUE_CHANGE_EVENT)
  );
export const onCut: <P>(
  handler: NativeEventHandler<ClipboardEvent>,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(CUT_EVENT)
  );
export const onDoubleClick: <P>(
  handler: NativeEventHandler<MouseEvent>,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(DOUBLE_CLICK_EVENT)
  );
export const onDeactivate: <P>(
  handler: NativeEventHandler<UIEvent>,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(DEACTIVATE_EVENT)
  );
export const onDrag: <P>(
  handler: NativeEventHandler<DragEvent>,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(DRAG_EVENT)
  );
export const onDragEnd: <P>(
  handler: NativeEventHandler<DragEvent>,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(DRAG_END_EVENT)
  );
export const onDragEnter: <P>(
  handler: NativeEventHandler<DragEvent>,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(DRAG_ENTER_EVENT)
  );
export const onDragLeave: <P>(
  handler: NativeEventHandler<DragEvent>,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(DRAG_LEAVE_EVENT)
  );
export const onDragOver: <P>(
  handler: NativeEventHandler<DragEvent>,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(DRAG_OVER_EVENT)
  );
export const onDragStart: <P>(
  handler: NativeEventHandler<DragEvent>,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(DRAG_START_EVENT)
  );
export const onDrop: <P>(
  handler: NativeEventHandler<DragEvent>,
  capture?: boolean,
) => EventHandlerNode<DragEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(DROP_EVENT)
  );
export const onDurationChange: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(DURATION_CHANGE_EVENT)
  );
export const onEmptied: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(EMPTIED_EVENT)
  );
export const onEncrypted: <P>(
  handler: NativeEventHandler<MediaEncryptedEvent>,
  capture?: boolean,
) => EventHandlerNode<MediaEncryptedEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(ENCRYPTED_EVENT)
  );
export const onEnded: <P>(
  handler: NativeEventHandler<MediaStreamErrorEvent>,
  capture?: boolean,
) => EventHandlerNode<MediaStreamErrorEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(ENDED_EVENT)
  );
export const onError: <P>(
  handler: NativeEventHandler<ErrorEvent>,
  capture?: boolean,
) => EventHandlerNode<ErrorEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(ERROR_EVENT)
  );
export const onFocus: <P>(
  handler: NativeEventHandler<FocusEvent>,
  capture?: boolean,
) => EventHandlerNode<FocusEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(FOCUS_EVENT)
  );
export const onGotPointerCapture: <P>(
  handler: NativeEventHandler<PointerEvent>,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(GOT_POINTER_CAPTURE_EVENT)
  );
export const onBeforeInput: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(BEFORE_INPUT_EVENT)
  );
export const onInput: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(INPUT_EVENT)
  );
export const onInvalid: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(INVALID_EVENT)
  );
export const onKeyDown: <P>(
  handler: NativeEventHandler<KeyboardEvent>,
  capture?: boolean,
) => EventHandlerNode<KeyboardEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(KEY_DOWN_EVENT)
  );
export const onKeyPress: <P>(
  handler: NativeEventHandler<KeyboardEvent>,
  capture?: boolean,
) => EventHandlerNode<KeyboardEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(KEY_PRESS_EVENT)
  );
export const onKeyUp: <P>(
  handler: NativeEventHandler<KeyboardEvent>,
  capture?: boolean,
) => EventHandlerNode<KeyboardEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(KEY_UP_EVENT)
  );
export const onLoad: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(LOAD_EVENT)
  );
export const onLoadedData: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(LOADED_DATA_EVENT)
  );
export const onLoadedMetadata: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(LOADED_METADATA_EVENT)
  );
export const onLoadStart: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(LOAD_START_EVENT)
  );
export const onLostPointerCapture: <P>(
  handler: NativeEventHandler<PointerEvent>,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(LOST_POINTER_CAPTURE_EVENT)
  );
export const onMouseDown: <P>(
  handler: NativeEventHandler<MouseEvent>,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(MOUSE_DOWN_EVENT)
  );
export const onMouseOut: <P>(
  handler: NativeEventHandler<MouseEvent>,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(MOUSE_OUT_EVENT)
  );
export const onMouseOver: <P>(
  handler: NativeEventHandler<MouseEvent>,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(MOUSE_OVER_EVENT)
  );
export const onMouseUp: <P>(
  handler: NativeEventHandler<MouseEvent>,
  capture?: boolean,
) => EventHandlerNode<MouseEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(MOUSE_UP_EVENT)
  );
export const onPaste: <P>(
  handler: NativeEventHandler<ClipboardEvent>,
  capture?: boolean,
) => EventHandlerNode<ClipboardEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(PASTE_EVENT)
  );
export const onPause: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(PAUSE_EVENT)
  );
export const onPlay: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(PLAY_EVENT)
  );
export const onPlaying: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(PLAYING_EVENT)
  );
export const onPointerCancel: <P>(
  handler: NativeEventHandler<PointerEvent>,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(POINTER_CANCEL_EVENT)
  );
export const onPointerDown: <P>(
  handler: NativeEventHandler<PointerEvent>,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(POINTER_DOWN_EVENT)
  );
export const onPointerOut: <P>(
  handler: NativeEventHandler<PointerEvent>,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(POINTER_OUT_EVENT)
  );
export const onPointerOver: <P>(
  handler: NativeEventHandler<PointerEvent>,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(POINTER_OVER_EVENT)
  );
export const onPointerUp: <P>(
  handler: NativeEventHandler<PointerEvent>,
  capture?: boolean,
) => EventHandlerNode<PointerEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(POINTER_UP_EVENT)
  );
export const onProgress: <P>(
  handler: NativeEventHandler<ProgressEvent>,
  capture?: boolean,
) => EventHandlerNode<ProgressEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(PROGRESS_EVENT)
  );
export const onRateChange: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(RATE_CHANGE_EVENT)
  );
export const onReset: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(RESET_EVENT)
  );
export const onScroll: <P>(
  handler: NativeEventHandler<UIEvent>,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(SCROLL_EVENT)
  );
export const onSeeked: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(SEEKED_EVENT)
  );
export const onSeeking: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(SEEKING_EVENT)
  );
export const onSelect: <P>(
  handler: NativeEventHandler<UIEvent>,
  capture?: boolean,
) => EventHandlerNode<UIEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(SELECT_EVENT)
  );
export const onSelectStart: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(SELECT_START_EVENT)
  );
export const onStalled: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(STALLED_EVENT)
  );
export const onSubmit: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(SUBMIT_EVENT)
  );
export const onSuspend: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(SUSPEND_EVENT)
  );
export const onTimeUpdate: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(TIME_UPDATE_EVENT)
  );
export const onTouchCancel: <P>(
  handler: NativeEventHandler<TouchEvent>,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(TOUCH_CANCEL_EVENT)
  );
export const onTouchEnd: <P>(
  handler: NativeEventHandler<TouchEvent>,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(TOUCH_END_EVENT)
  );
export const onTouchStart: <P>(
  handler: NativeEventHandler<TouchEvent>,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(TOUCH_START_EVENT)
  );
export const onTransitionCancel: <P>(
  handler: NativeEventHandler<TransitionEvent>,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(TRANSITION_CANCEL_EVENT)
  );
export const onTransitionEnd: <P>(
  handler: NativeEventHandler<TransitionEvent>,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(TRANSITION_END_EVENT)
  );
export const onTransitionRun: <P>(
  handler: NativeEventHandler<TransitionEvent>,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(TRANSITION_RUN_EVENT)
  );
export const onTransitionStart: <P>(
  handler: NativeEventHandler<TransitionEvent>,
  capture?: boolean,
) => EventHandlerNode<TransitionEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(TRANSITION_START_EVENT)
  );
export const onUnload: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(UNLOAD_EVENT)
  );
export const onVolumeChange: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(VOLUME_CHANGE_EVENT)
  );
export const onWaiting: <P>(
  handler: NativeEventHandler<Event>,
  capture?: boolean,
) => EventHandlerNode<Event> = (
  /*#__PURE__*/nativeEventHandlerFactory(WAITING_EVENT)
  );
export const onWheel: <P>(
  handler: NativeEventHandler<WheelEvent>,
  capture?: boolean,
) => EventHandlerNode<WheelEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(WHEEL_EVENT)
  );

export const onActiveTouchEnd: <P>(
  handler: NativeEventHandler<TouchEvent>,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(ACTIVE_TOUCH_END_EVENT)
  );
export const onActiveTouchStart: <P>(
  handler: NativeEventHandler<TouchEvent>,
  capture?: boolean,
) => EventHandlerNode<TouchEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(ACTIVE_TOUCH_START_EVENT)
  );
export const onActiveWheel: <P>(
  handler: NativeEventHandler<WheelEvent>,
  capture?: boolean,
) => EventHandlerNode<WheelEvent> = (
  /*#__PURE__*/nativeEventHandlerFactory(ACTIVE_WHEEL_EVENT)
  );
