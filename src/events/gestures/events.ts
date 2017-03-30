import { EventHandlerFlags } from "../flags";
import { EventHandler } from "../event_handler";
import { GesturePointerEvent } from "./pointer_event";
import { GestureEventSource } from "./gesture_event_source";

export const GestureEventSources = {
    Pointer: new GestureEventSource(),
};

export const GestureEvents = {
    onPointer: function (
        fn: (ev: GesturePointerEvent) => void,
        capture?: boolean,
    ) {
        const handler = fn as EventHandler<GesturePointerEvent>;
        handler.source = GestureEventSources.Pointer.eventSource;
        handler.flags = capture === true ? EventHandlerFlags.Capture : EventHandlerFlags.Bubble;
        return fn;
    },
};
