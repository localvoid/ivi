import { EventHandlerFlags } from "../flags";
import { EventHandler } from "../event_handler";
import { GesturePointerEvent } from "./pointer_event";
import { GestureEvent } from "./gesture_event";
import { GestureEventSource } from "./gesture_event_source";
import { GestureRecognizer } from "./arena";

export const enum GestureEventFlags {
    TouchActionNone = 1 << 15,
    TouchActionPanX = 1 << 16,
    TouchActionPanY = 1 << 17,

    GestureHandler = 1 << 18,

    TouchActions = TouchActionNone | TouchActionPanX | TouchActionPanY,
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
    onGesture: (
        fn: (ev: GestureEvent) => void,
        createRecognizer: (handler: EventHandler) => GestureRecognizer,
        flags?: GestureEventFlags,
        capture?: boolean,
    ) => EventHandler<GestureEvent>;
}

export const GestureEvents: GestureEventsList = {
    onPointer: function (
        fn: (ev: GesturePointerEvent) => void,
        flags?: GestureEventFlags,
        capture?: boolean,
    ): EventHandler<GesturePointerEvent> {
        const handler = fn as EventHandler<GesturePointerEvent>;
        handler.source = GestureEventSources.Pointer.pointerEventSource;
        handler.flags = (flags === undefined ? 0 : flags) |
            (capture === true ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble);
        handler.listeners = 0;
        handler.props = null;
        handler.state = null;
        return fn as EventHandler<GesturePointerEvent>;
    },

    onGesture: function (
        fn: (ev: GestureEvent) => void,
        createRecognizer: (handler: EventHandler) => GestureRecognizer,
        flags?: GestureEventFlags,
        capture?: boolean,
    ): EventHandler<GestureEvent> {
        const handler = fn as EventHandler<GestureEvent>;
        handler.source = GestureEventSources.Pointer.gestureEventSource;
        handler.flags = (flags === undefined ? 0 : flags) |
            (capture === true ?
                EventHandlerFlags.Capture | GestureEventFlags.GestureHandler :
                EventHandlerFlags.Bubble | GestureEventFlags.GestureHandler);
        handler.listeners = 0;
        handler.props = createRecognizer;
        handler.state = null;
        return fn as EventHandler<GestureEvent>;
    },
};
