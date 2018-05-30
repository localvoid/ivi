import { EventHandlerFlags, EventHandler, EventDispatcher } from "ivi";
import { GesturePointerEvent } from "./gesture_pointer_event";
import { createGestureEventDispatcher } from "./gesture_event_dispatcher";
import { GestureController } from "./gesture_controller";
import { PanGestureRecognizer } from "./pan_gesture_recognizer";
import { TapGestureRecognizer } from "./tap_gesture_recognizer";
import { NativePanGestureRecognizer } from "./native_pan_gesture_recognizer";

export const GESTURE_EVENT_SOURCE = /*#__PURE__*/createGestureEventDispatcher() as EventDispatcher;

export function onNativePan(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createNativePanGestureRecognizer,
    state: null,
  };
}

export function onPan(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createPanGestureRecognizer,
    state: null,
  };
}

export function onTap(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createTapGestureRecognizer,
    state: null,
  };
}

function createNativePanGestureRecognizer(resolver: GestureController) {
  return new NativePanGestureRecognizer(resolver);
}

function createPanGestureRecognizer(resolver: GestureController) {
  return new PanGestureRecognizer(resolver);
}

function createTapGestureRecognizer(resolver: GestureController) {
  return new TapGestureRecognizer(resolver);
}
