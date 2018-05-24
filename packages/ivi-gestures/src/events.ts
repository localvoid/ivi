import { EventHandlerFlags, EventHandler } from "ivi-events";
import { GesturePointerEvent } from "./pointer_event";
import { GestureEventSource } from "./gesture_event_source";

export const enum GestureEventFlags {
  GestureHandler = 1 << 15,
}

export const GESTURE_EVENT_SOURCE = new GestureEventSource();

export interface GestureEventsList {
  onPointer: (
    fn: (ev: GesturePointerEvent) => void,
    flags?: GestureEventFlags,
    capture?: boolean,
  ) => EventHandler<GesturePointerEvent>;
}

export function onPointer(
  handler: (ev: GesturePointerEvent) => void,
  flags?: GestureEventFlags,
): EventHandler<GesturePointerEvent> {
  return {
    src: GESTURE_EVENT_SOURCE.src,
    flags: (flags === void 0 ? 0 : flags) | EventHandlerFlags.Bubble,
    handler,
    listeners: 0,
    props: null,
    state: null,
  };
}
