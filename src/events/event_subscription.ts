import { SyntheticEvent } from "./synthetic_event";

export class EventSubscriptionList {
    private subscriptions: EventSubscription[];

    add(
        handler: (ev: SyntheticEvent<any>, type?: number) => void,
        filter?: number,
    ): EventSubscription {
        const sub = new EventSubscription(this, handler, filter);
        this.subscriptions.push(sub);
        return sub;
    }

    remove(subscription: EventSubscription) {
        this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1);
    }
}

/**
 * Event Dispatcher Subscription.
 */
export class EventSubscription {
    /**
     * Event Dispatcher.
     */
    list: EventSubscriptionList;
    /**
     * Subscription Handler function.
     */
    handler: (ev: SyntheticEvent<any>, type?: number) => void;
    /**
     * Type filter.
     */
    filter: number;

    constructor(
        list: EventSubscriptionList,
        handler: (ev: SyntheticEvent<any>, type?: number) => void,
        filter: number = ~0,
    ) {
        this.list = list;
        this.handler = handler;
        this.filter = filter;
    }

    /**
     * Cancel Event Subscription.
     */
    cancel(): void {
        this.list.remove(this);
    }
}
