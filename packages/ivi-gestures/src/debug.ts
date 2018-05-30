import { debugPub } from "ivi-core";
import { GesturePointerEvent } from "./gesture_pointer_event";
import { GestureRecognizer } from "./gesture_recognizer";
import { NativeEventListenerFlags } from "./native_event_listener";

export interface GestureEventDispatcherState {
  pointers: Map<number, GesturePointerEvent>;
  recognizers: GestureRecognizer[];
  resolvedRecognizers: GestureRecognizer[];
  acceptedRecognizer: GestureRecognizer | null;
  activeRecognizersCounter: number;
  resolvedRecognizersCounter: number;
  conflictResolverClosed: boolean;
}

export interface MouseEventListenerState {
  currentFlags: NativeEventListenerFlags;
}

export interface TouchEventListenerState {
  currentFlags: NativeEventListenerFlags;
  primaryPointers: GesturePointerEvent[] | null;
  primaryTouch: Touch | null;
  eventTimeOffset: number;
  moveTrackingEnabled: boolean;
}

export function debugPubDispatcherState(state: GestureEventDispatcherState) {
  debugPub("ivi-events/GestureEventDispatcherState", state);
}

export function debugPubMouseState(state: MouseEventListenerState) {
  debugPub("ivi-events/MouseEventListenerState", state);
}

export function debugPubTouchState(state: TouchEventListenerState) {
  debugPub("ivi-events/TouchEventListenerState", state);
}
