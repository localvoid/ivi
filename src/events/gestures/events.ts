import { EventHandlerFlags } from "../flags";
import { EventHandler } from "../event_handler";
import { GesturePointerEvent } from "./pointer_event";
import { GestureEventSource } from "./gesture_event_source";

export const enum GestureEventFlags {
    TouchActionNone = 1 << 15,
    TouchActionPanX = 1 << 16,
    TouchActionPanY = 1 << 17,

    TouchActions = TouchActionNone | TouchActionPanX | TouchActionPanY,
}

export const GestureEventSources = {
    Pointer: new GestureEventSource(),
};

export const GestureEvents = {
    onPointer: function (
        fn: (ev: GesturePointerEvent) => void,
        flags?: GestureEventFlags,
        capture?: boolean,
    ): EventHandler<GesturePointerEvent> {
        const handler = fn as EventHandler<GesturePointerEvent>;
        handler.source = GestureEventSources.Pointer.eventSource;
        handler.flags = (flags === undefined ? 0 : flags) |
            (capture === true ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble);
        return fn as EventHandler<GesturePointerEvent>;
    },
};
