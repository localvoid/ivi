import { EventHandler, EventHandlerList } from "./event_handler";
import { setEventHandlerListToDOMNode } from "./utils";

/**
 * Shortcut for Event Handler registration.
 *
 * @param handler Event Handler.
 */
function registerEventHandler(handler: EventHandler<any>): void {
    handler.dispatcher.registerHandler(handler.fn);
}

/**
 * Shortcut for Event Handler unregistration.
 *
 * @param handler Event Handler.
 */
function unregisterEventHandler(handler: EventHandler<any>): void {
    handler.dispatcher.unregisterHandler(handler.fn);
}

/**
 * Sync DOM events.
 *
 * Implementation detail: Syncing algorithm has an optimization with an early detection of object shape changes.
 * Objects with static shape will make syncing algorithm slightly faster because it doesn't need to check which
 * properties didn't existed before, so it is possible to just use the static object shapes, and use `undefined` values
 * when you want to remove property and have the same object shape.
 *
 * @param node HTML or SVG Element.
 * @param a Old events.
 * @param b New events.
 */
export function syncEvents(
    node: Element,
    a: EventHandlerList | null,
    b: EventHandlerList | null,
): void {
    let i: number;
    let keys: string[];
    let key: string;

    if (a === null) {
        if (b !== null) {
            // a is empty, register all events from b.
            keys = Object.keys(b);
            for (i = 0; i < keys.length; i++) {
                registerEventHandler(b[keys[i]]);
            }
        }
    } else if (b === null) {
        // b is empty, remove all events from a.
        keys = Object.keys(a);
        for (i = 0; i < keys.length; i++) {
            unregisterEventHandler(a[keys[i]]);
        }
    } else {
        let matchCount = 0;

        // Remove and update events.
        keys = Object.keys(a);
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            const aHandler = a[key];
            const bHandler = b[key];
            if (bHandler !== undefined) {
                if (aHandler !== bHandler) {
                    registerEventHandler(bHandler);
                    unregisterEventHandler(aHandler);
                }
                matchCount++;
            } else {
                unregisterEventHandler(aHandler);
            }
        }

        // Insert new events.
        keys = Object.keys(b);
        i = 0;
        while (matchCount < keys.length && i < keys.length) {
            key = keys[i++];
            if (!a.hasOwnProperty(key)) {
                registerEventHandler(b[key]);
                matchCount++;
            }
        }
    }

    setEventHandlerListToDOMNode(node, b === null ? undefined : b);
}

/**
 * Remove DOM events.
 *
 * @param node HTML or SVG Element.
 * @param a Old events.
 * @param b New events.
 */
export function removeEvents(events: EventHandlerList): void {
    const keys = Object.keys(events);
    for (let i = 0; i < keys.length; i++) {
        unregisterEventHandler(events[keys[i]]);
    }
}
