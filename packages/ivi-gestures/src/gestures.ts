import { EventHandlerFlags, EventHandler, EventDispatcher } from "ivi";
import { GesturePointerEvent } from "./gesture_pointer_event";
import { createGestureEventDispatcher } from "./gesture_event_dispatcher";
import { GestureController } from "./gesture_controller";
import { PanGestureRecognizer } from "./pan_gesture_recognizer";
import { TapGestureRecognizer } from "./tap_gesture_recognizer";
import { NativePanGestureRecognizer } from "./native_pan_gesture_recognizer";
import { GestureBehavior } from "./gesture_behavior";
import { LongPressGestureRecognizer } from "./long_press_recognizer";

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

export function onNativePanX(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createNativePanXGestureRecognizer,
    state: null,
  };
}

export function onNativePanY(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createNativePanYGestureRecognizer,
    state: null,
  };
}

export function onNativePanUp(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createNativePanUpGestureRecognizer,
    state: null,
  };
}

export function onNativePanDown(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createNativePanDownGestureRecognizer,
    state: null,
  };
}

export function onNativePanLeft(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createNativePanLeftGestureRecognizer,
    state: null,
  };
}

export function onNativePanRight(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createNativePanRightGestureRecognizer,
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

export function onPanX(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createPanXGestureRecognizer,
    state: null,
  };
}

export function onPanY(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createPanYGestureRecognizer,
    state: null,
  };
}

export function onPanUp(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createPanUpGestureRecognizer,
    state: null,
  };
}

export function onPanDown(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createPanDownGestureRecognizer,
    state: null,
  };
}

export function onPanLeft(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createPanLeftGestureRecognizer,
    state: null,
  };
}

export function onPanRight(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createPanRightGestureRecognizer,
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

export function onLongPress(
  handler: (ev: GesturePointerEvent) => void,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE,
    flags: EventHandlerFlags.Capture,
    handler,
    listeners: 0,
    props: createLongPressGestureRecognizer,
    state: null,
  };
}

function createNativePanGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new NativePanGestureRecognizer(resolver, handler, GestureBehavior.Pan);
}

function createNativePanXGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new NativePanGestureRecognizer(resolver, handler, GestureBehavior.PanX);
}

function createNativePanYGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new NativePanGestureRecognizer(resolver, handler, GestureBehavior.PanY);
}

function createNativePanUpGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new NativePanGestureRecognizer(resolver, handler, GestureBehavior.PanUp);
}

function createNativePanDownGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new NativePanGestureRecognizer(resolver, handler, GestureBehavior.PanDown);
}

function createNativePanLeftGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new NativePanGestureRecognizer(resolver, handler, GestureBehavior.PanLeft);
}

function createNativePanRightGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new NativePanGestureRecognizer(resolver, handler, GestureBehavior.PanRight);
}

function createPanGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new PanGestureRecognizer(resolver, handler, GestureBehavior.Pan);
}

function createPanXGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new PanGestureRecognizer(resolver, handler, GestureBehavior.PanX);
}

function createPanYGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new PanGestureRecognizer(resolver, handler, GestureBehavior.PanY);
}

function createPanUpGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new PanGestureRecognizer(resolver, handler, GestureBehavior.PanUp);
}

function createPanDownGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new PanGestureRecognizer(resolver, handler, GestureBehavior.PanDown);
}

function createPanLeftGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new PanGestureRecognizer(resolver, handler, GestureBehavior.PanLeft);
}

function createPanRightGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new PanGestureRecognizer(resolver, handler, GestureBehavior.PanRight);
}

function createTapGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new TapGestureRecognizer(resolver, handler);
}

function createLongPressGestureRecognizer(resolver: GestureController, handler: (ev: any) => void) {
  return new LongPressGestureRecognizer(resolver, handler);
}
