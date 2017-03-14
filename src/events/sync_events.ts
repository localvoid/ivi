import { EventHandler, EventHandlerList } from "./event_handler";
import { setEventHandlerListToDOMNode } from "./utils";

/**
 * Shortcut for Event Handler registration.
 *
 * @param handler Event Handler.
 */
function registerEventHandler(handler: EventHandler<any>): void {
    handler.dispatcher.registerHandler(handler);
}

/**
 * Shortcut for Event Handler unregistration.
 *
 * @param handler Event Handler.
 */
function unregisterEventHandler(handler: EventHandler<any>): void {
    handler.dispatcher.unregisterHandler(handler);
}

/**
 * Sync DOM events.
 *
 * @param node HTML or SVG Element.
 * @param a Old events.
 * @param b New events.
 */
export function syncEvents(
    node: Element,
    a: EventHandlerList | EventHandler | null,
    b: EventHandlerList | EventHandler | null,
): void {
    let i: number;
    let h1: EventHandler | null;
    let h2: EventHandler | null;

    if (a === null) {
        if (b !== null) {
            // a is empty, register all events from b.
            if (typeof b === "function") {
                registerEventHandler(b);
            } else {
                for (i = 0; i < b.length; i++) {
                    h1 = b[i];
                    if (h1) {
                        registerEventHandler(h1);
                    }
                }
            }
        }
    } else if (b === null) {
        // b is empty, remove all events from a.
        if (typeof a === "function") {
            unregisterEventHandler(a);
        } else {
            for (i = 0; i < a.length; i++) {
                h1 = a[i];
                if (h1) {
                    unregisterEventHandler(h1);
                }
            }
        }
    } else {
        if (typeof a === "function") {
            if (typeof b === "function") {
                registerEventHandler(b);
            } else {
                for (i = 0; i < b.length; i++) {
                    h1 = b[i];
                    if (h1) {
                        registerEventHandler(h1);
                    }
                }
            }
            unregisterEventHandler(a);
        } else {
            if (typeof b === "function") {
                registerEventHandler(b);

                for (i = 0; i < a.length; i++) {
                    h1 = a[i];
                    if (h1) {
                        unregisterEventHandler(h1);
                    }
                }
            } else {
                i = 0;
                while (i < a.length && i < b.length) {
                    h1 = a[i];
                    h2 = b[i++];
                    if (h1 !== h2) {
                        if (h2) {
                            registerEventHandler(h2);
                        }
                        if (h1) {
                            unregisterEventHandler(h1);
                        }
                    }
                }
                while (i < b.length) {
                    h1 = a[i++];
                    if (h1) {
                        registerEventHandler(h1);
                    }
                }
                while (i < a.length) {
                    h1 = a[i++];
                    if (h1) {
                        unregisterEventHandler(h1);
                    }
                }
            }
        }
    }

    setEventHandlerListToDOMNode(node, b);
}

/**
 * Remove DOM events.
 *
 * @param events Events.
 */
export function removeEvents(events: EventHandlerList | EventHandler): void {
    if (typeof events === "function") {
        unregisterEventHandler(events);
    } else {
        for (let i = 0; i < events.length; i++) {
            const h = events[i];
            if (h) {
                unregisterEventHandler(h);
            }
        }
    }
}
