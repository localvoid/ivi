/**
 * Event Dispatchers
 *
 * **EXPERIMENTAL API**
 */

import { SyntheticEvent } from "./synthetic_event";

/**
 * Event Dispatcher Subscription Flags.
 *
 * Reserved for future use.
 */
export const enum EventDispatcherSubscriptionFlags {
}

/**
 * Event Dispatcher Subscription.
 */
export interface EventDispatcherSubscription<D> {
    /**
     * See `EventDispatcherSubscriptionFlags` for details.
     */
    flags: EventDispatcherSubscriptionFlags;
    /**
     * Event Dispatcher.
     */
    dispatcher: EventDispatcher<D>;
    /**
     * Type filter.
     */
    type: number | undefined;
    /**
     * Opaque data.
     */
    data: D;
}

/**
 * Abstract Event Dispatcher.
 *
 * @template D Opaque data type.
 * @template T Outgoing synthetic event type.
 */
export abstract class EventDispatcher<D> {
    /**
     * Number of registered dependencies (Event Handlers and Event Dispatcher subscribers).
     *
     * When this number goes from 0 to 1, lifecycle method `activate` is invoked.
     * When this number goes to 0, lifecycle method `deactivate` is invoked.
     */
    counter: number;
    /**
     * Event Dispatcher subscribers.
     *
     * All outgoing events will be filtered by `type` property.
     */
    subscribers: EventDispatcherSubscription<any>[] | null;

    constructor() {
        this.counter = 0;
        this.subscribers = null;
    }

    /**
     * Dispatch Event.
     *
     * @param ev Event to dispatch.
     */
    dispatch(_ev: SyntheticEvent<any>, data: D, type?: number): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Dispatch Event to all subscribers.
     *
     * @param events Events to dispatch.
     */
    dispatchEventToSubscribers(event: SyntheticEvent<any>, type?: number): void {
        if (this.subscribers) {
            // We need to clone because while we are dispatching, subs may unsub from this list.
            const subs = this.subscribers.slice();
            for (let i = 0; i < subs.length; i++) {
                const sub = subs[i];
                if (type === undefined || (sub.type & (type as any as number))) {
                    sub.dispatcher.dispatch(event, sub.data, type);
                }
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
        dispatcher: EventDispatcher<any>,
        data: any,
        type?: number,
        flags: EventDispatcherSubscriptionFlags = 0,
    ): void {
        if (this.subscribers === null) {
            this.subscribers = [];
        }
        this.subscribers.push({
            flags: flags,
            dispatcher: dispatcher,
            data: data,
            type: type,
        });
        if (this.counter++ === 0) {
            this.activate();
        }
    }

    /**
     * Unsubscribe from events.
     *
     * @param dispatcher Event Dispatcher.
     * @param data Opaque data that will be returned to subscriber.
     * @param type Type that will be used to filter incoming events.
     * @param flags Subscription flags.
     */
    unsubscribe(
        dispatcher: EventDispatcher<any>,
        data: any,
        type?: number,
        flags: EventDispatcherSubscriptionFlags = 0,
    ): void {
        if (--this.counter === 0) {
            this.deactivate();
        }
        if (this.subscribers!.length > 1) {
            let match: EventDispatcherSubscription<any> | undefined;
            let i = 0;
            for (i; i < this.subscribers!.length; i++) {
                const sub = this.subscribers![i];
                if (sub.dispatcher === dispatcher && sub.data === data && sub.type === type && sub.flags === flags) {
                    match = sub;
                    break;
                }
            }
            if (__IVI_DEV__) {
                if (!match) {
                    throw new Error("Failed to unsubscribe, unable to find matching subscription.");
                }
            }
            // We doesn't depend on the order of subscribers, so we can remove with O(1) operation that swaps with the
            // last item and removes it.
            this.subscribers![i] = this.subscribers!.pop() !;
        } else {
            if (__IVI_DEV__) {
                const sub = this.subscribers![0];
                if (!(sub.dispatcher === dispatcher && sub.data === data && sub.type === type && sub.flags === flags)) {
                    throw new Error("Failed to unsubscribe, unable to find matching subscription.");
                }
            }
            this.subscribers = null;
        }
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
