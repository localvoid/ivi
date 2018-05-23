import { EventHandler } from "./event_handler";
import { EventHandlerFlags } from "./flags";

/**
 * registerEventHandler is a shortcut for Event Handler registration.
 *
 * @param handler Event Handler.
 */
function registerEventHandler(handler: EventHandler<any>): void {
  if (DEBUG) {
    handler.flags |= EventHandlerFlags.Active;
  }
  handler.src.add(handler);
}

/**
 * unregisterEventHandler is a shortcut for Event Handler unregistration.
 *
 * @param handler Event Handler.
 */
function unregisterEventHandler(handler: EventHandler<any>): void {
  if (DEBUG) {
    handler.flags &= ~EventHandlerFlags.Active;
  }
  handler.src.remove(handler);
}

/**
 * syncEvents syncs event handlers and invokes EventSource callbacks when event handler is attached or detached.
 *
 * @param a Old event handlers.
 * @param b New event handlers.
 */
export function syncEvents(
  a: Array<EventHandler | null> | EventHandler | null,
  b: Array<EventHandler | null> | EventHandler | null,
): void {
  let i: number;
  let h1: EventHandler | null;
  let h2: EventHandler | null;

  if (a === null) {
    attachEvents(b!);
  } else if (b === null) {
    detachEvents(a);
  } else {
    if (a instanceof Array) {
      if (b instanceof Array) {
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
      } else {
        registerEventHandler(b as EventHandler);

        for (i = 0; i < a.length; ++i) {
          h1 = a[i];
          if (h1 !== null) {
            unregisterEventHandler(h1);
          }
        }
      }
    } else {
      attachEvents(b);
      unregisterEventHandler(a as EventHandler);
    }
  }
}

/**
 * attachEvents attaches event handlers and invokes EventSource callbacks.
 *
 * @param events Event handlers.
 */
export function attachEvents(events: Array<EventHandler | null> | EventHandler): void {
  if (events instanceof Array) {
    for (let i = 0; i < events.length; ++i) {
      const h = events[i];
      if (h !== null) {
        registerEventHandler(h);
      }
    }
  } else {
    registerEventHandler(events as EventHandler);
  }
}

/**
 * detachEvents detaches events handles and invokes EventSource callbacks.
 *
 * @param events Event handlers.
 */
export function detachEvents(events: Array<EventHandler | null> | EventHandler): void {
  if (events instanceof Array) {
    for (let i = 0; i < events.length; ++i) {
      const h = events[i];
      if (h !== null) {
        unregisterEventHandler(h);
      }
    }
  } else {
    unregisterEventHandler(events as EventHandler);
  }
}
