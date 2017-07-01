import { EventHandler } from "./event_handler";

/**
 * Shortcut for Event Handler registration.
 *
 * @param handler Event Handler.
 */
function registerEventHandler(handler: EventHandler<any>): void {
    handler.source.addListener(handler);
}

/**
 * Shortcut for Event Handler unregistration.
 *
 * @param handler Event Handler.
 */
function unregisterEventHandler(handler: EventHandler<any>): void {
    handler.source.removeListener(handler);
}

/**
 * Sync DOM events.
 *
 * @param element HTML or SVG Element.
 * @param a Old events.
 * @param b New events.
 */
export function syncEvents(
    element: Element,
    a: Array<EventHandler | null> | EventHandler | null,
    b: Array<EventHandler | null> | EventHandler | null,
): void {
    let i: number;
    let h1: EventHandler | null;
    let h2: EventHandler | null;

    if (a === null) {
        if (b !== null) {
            attachEvents(b);
        }
    } else if (b === null) {
        detachEvents(a);
    } else {
        if (typeof a === "function") {
            attachEvents(b);
            unregisterEventHandler(a);
        } else {
            if (typeof b === "function") {
                registerEventHandler(b);

                for (i = 0; i < a.length; i++) {
                    h1 = a[i];
                    if (h1 !== null) {
                        unregisterEventHandler(h1);
                    }
                }
            } else {
                i = 0;
                while (i < a.length && i < b.length) {
                    h1 = a[i];
                    h2 = b[i++];
                    if (h1 !== h2) {
                        if (h2 !== null) {
                            registerEventHandler(h2);
                        }
                        if (h1 !== null) {
                            unregisterEventHandler(h1);
                        }
                    }
                }
                while (i < b.length) {
                    h1 = b[i++];
                    if (h1 !== null) {
                        registerEventHandler(h1);
                    }
                }
                while (i < a.length) {
                    h1 = a[i++];
                    if (h1 !== null) {
                        unregisterEventHandler(h1);
                    }
                }
            }
        }
    }
}

/**
 * Attach Events.
 *
 * @param events Events.
 */
export function attachEvents(events: Array<EventHandler | null> | EventHandler): void {
    if (typeof events === "function") {
        registerEventHandler(events);
    } else {
        for (let i = 0; i < events.length; i++) {
            const h = events[i];
            if (h !== null) {
                registerEventHandler(h);
            }
        }
    }
}

/**
 * Detach Events.
 *
 * @param events Events.
 */
export function detachEvents(events: Array<EventHandler | null> | EventHandler): void {
    if (typeof events === "function") {
        unregisterEventHandler(events);
    } else {
        for (let i = 0; i < events.length; i++) {
            const h = events[i];
            if (h !== null) {
                unregisterEventHandler(h);
            }
        }
    }
}
