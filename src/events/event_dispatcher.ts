/**
 * Event Dispatchers
 *
 * **EXPERIMENTAL API**
 */

import { SyntheticEvent } from "./synthetic_event";

/**
 * Event Dispatcher Subscription Flags.
 */
export const enum EventDispatcherSubscriptionFlags {
    Canceled = 1,
    Canceling = 1 << 1,
}

/**
 * Event Dispatcher Subscription.
 */
export class EventDispatcherSubscription {
    /**
     * Prev item in a linked list.
     */
    _prev: EventDispatcherSubscription | null;
    /**
     * Next item in a linked list.
     */
    _next: EventDispatcherSubscription | null;
    /**
     * Event Dispatcher.
     */
    dispatcher: EventDispatcher;
    /**
     * See `EventDispatcherSubscriptionFlags` for details.
     */
    flags: EventDispatcherSubscriptionFlags;
    /**
     * Subscription Handler function.
     */
    handler: (ev: SyntheticEvent<any>, type?: number) => void;
    /**
     * Type filter.
     */
    filter: number | undefined;

    constructor(
        dispatcher: EventDispatcher,
        flags: EventDispatcherSubscriptionFlags,
        handler: (ev: SyntheticEvent<any>, type?: number) => void,
        filter: number | undefined,
    ) {
        this._prev = null;
        this._next = null;
        this.dispatcher = dispatcher;
        this.flags = flags;
        this.handler = handler;
        this.filter = filter;
    }

    /**
     * Cancel Event Subscription.
     */
    cancel(): void {
        if (!(this.flags & EventDispatcherSubscriptionFlags.Canceled)) {
            if (this.dispatcher.isDispatching && (!(this.flags & EventDispatcherSubscriptionFlags.Canceling))) {
                this.flags |= EventDispatcherSubscriptionFlags.Canceling;
                if (!this.dispatcher._disposeQueue) {
                    this.dispatcher._disposeQueue = [];
                }
                this.dispatcher._disposeQueue.push(this);
            } else {
                if (this._prev) {
                    this._prev._next = this._next;
                } else {
                    this.dispatcher._nextSubscription = this._next;
                }
                if (this._next) {
                    this._next._prev = this._prev;
                }

                this.flags |= EventDispatcherSubscriptionFlags.Canceled;

                if (--this.dispatcher.counter === 0) {
                    this.dispatcher.deactivate();
                }
            }
        }
    }
}

/**
 * Abstract Event Dispatcher.
 */
export abstract class EventDispatcher {
    /**
     * Number of registered dependencies (Event Handlers and Event Dispatcher subscribers).
     *
     * When this number goes from 0 to 1, lifecycle method `activate` is invoked.
     * When this number goes to 0, lifecycle method `deactivate` is invoked.
     */
    counter: number;
    /**
     * Flag indicating that Dispatcher is currently dispatching event to subscribers.
     */
    isDispatching: boolean;
    /**
     * Event Dispatcher subscribers implemented with a Linked List.
     */
    _nextSubscription: EventDispatcherSubscription | null;
    /**
     * Event Dispatcher subscribers that should be disposed when dispatching to subscribers is finished.
     */
    _disposeQueue: EventDispatcherSubscription[] | null;

    constructor() {
        this.counter = 0;
        this.isDispatching = false;
        this._nextSubscription = null;
        this._disposeQueue = null;
    }

    /**
     * Dispatch Event to all subscribers.
     *
     * @param events Events to dispatch.
     */
    dispatchEventToSubscribers(event: SyntheticEvent<any>, type?: number): void {
        this.isDispatching = true;
        let s = this._nextSubscription;
        while (s) {
            if (!(s.flags & (EventDispatcherSubscriptionFlags.Canceled | EventDispatcherSubscriptionFlags.Canceling))) {
                if (type === undefined || (s.filter & (type as any as number))) {
                    s.handler(event, type);
                }
            }
            s = s._next;
        }
        this.isDispatching = false;
        if (this._disposeQueue) {
            for (let i = 0; i < this._disposeQueue.length; i++) {
                this._disposeQueue[i].cancel();
            }
        }
    }

    /**
     * Lifecycle method `activate` is invoked when Event Dispatcher is activated.
     */
    activate(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `deactivate` is invoked when Event Dispatcher is deactivated.
     */
    deactivate(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Subscribe for events.
     *
     * @param dispatcher Event Dispatcher.
     * @param data Opaque data that will be returned to subscriber.
     * @param type Type that will be used to filter incoming events.
     * @param flags Subscription flags.
     */
    subscribe(
        handler: (ev: SyntheticEvent<any>, type?: number) => void,
        filter?: number,
        flags: EventDispatcherSubscriptionFlags = 0,
    ): EventDispatcherSubscription {
        const s = new EventDispatcherSubscription(this, flags, handler, filter);
        if (this._nextSubscription) {
            this._nextSubscription._prev = s;
            s._next = this._nextSubscription;
        }
        this._nextSubscription = s;

        if (this.counter++ === 0) {
            this.activate();
        }

        return s;
    }

    /**
     * Register an Event Handler.
     *
     * @param handler Event Handler.
     */
    registerHandler(handler: (ev: SyntheticEvent<any>) => void): void {
        if (this.counter++ === 0) {
            this.activate();
        }
        this.didRegisterHandler(handler);
    }

    /**
     * Unregister an Event Handler.
     *
     * @param handler Event Handler.
     */
    unregisterHandler(handler: (ev: SyntheticEvent<any>) => void): void {
        if (--this.counter === 0) {
            this.deactivate();
        }
        this.didUnregisterHandler(handler);
    }

    /**
     * Lifecycle method `didRegisterHandler` is invoked after Event Handler registration.
     *
     * @param handler Event Handler.
     */
    didRegisterHandler(_handler: (ev: SyntheticEvent<any>) => void): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `didUnregisterHandler` is invoked after Event Handler unregistration.
     *
     * @param handler Event Handler.
     */
    didUnregisterHandler(_handler: (ev: SyntheticEvent<any>) => void): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }
}
