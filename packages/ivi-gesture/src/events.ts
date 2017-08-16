import { EventHandlerFlags, EventHandler } from "ivi-events";
import { GesturePointerEvent } from "./pointer_event";
import { GestureEventSource } from "./gesture_event_source";

export const enum GestureEventFlags {
  GestureHandler = 1 << 15,
}

export const GestureEventSources = {
  Pointer: new GestureEventSource(),
};

export interface GestureEventsList {
  onPointer: (
    fn: (ev: GesturePointerEvent) => void,
    flags?: GestureEventFlags,
    capture?: boolean,
  ) => EventHandler<GesturePointerEvent>;
}

export function onPointer(
  fn: (ev: GesturePointerEvent) => void,
  flags?: GestureEventFlags,
  capture?: boolean,
): EventHandler<GesturePointerEvent> {
  const handler = fn as EventHandler<GesturePointerEvent>;
  handler.source = GestureEventSources.Pointer.eventSource;
  handler.flags = (flags === undefined ? 0 : flags) |
    (capture === true ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble);
  handler.listeners = 0;
  handler.props = null;
  handler.state = null;
  return fn as EventHandler<GesturePointerEvent>;
}
