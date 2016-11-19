import { SyntheticEvent } from "./synthetic_event";

/**
 * Abstract Event Dispatcher.
 *
 * Event Dispatch API is in EXPERIMENTAL phase, there is a high chance that this API will be changed in the future.
 */
export abstract class EventDispatcher<I, O extends SyntheticEvent<any>> {
    /**
     * Number of registered dependencies (Event Handlers and Event Dispatchers).
     *
     * When this number goes from 0 to 1, lifecycle method `activate` is invoked.
     * When this number goes to 0, lifecycle method `deactivate` is invoked.
     */
    counter: number;
    /**
     * Event Dispatcher dependents will receive all events produced by this event handler.
     */
    dependents: EventDispatcher<any, SyntheticEvent<any>>[] | null;

    constructor() {
        this.counter = 0;
        this.dependents = null;
    }

    /**
     * Dispatch Event.
     *
     * @param ev Event to dispatch.
     */
    dispatch(_ev: I): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Dispatch Event to all dependents.
     *
     * @param events Events to dispatch.
     */
    dispatchEventsToDependents(events: O): void {
        if (events && this.dependents) {
            for (let i = 0; i < this.dependents.length; i++) {
                this.dependents[i].dispatch!(events);
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
     * Register an active Event Dispatcher.
     *
     * @param dispatcher Event Dispatcher.
     */
    registerDispatcher(dispatcher: EventDispatcher<any, SyntheticEvent<any>>): void {
        if (this.counter++ === 0) {
            this.activate();
        }
        if (this.dependents === null) {
            this.dependents = [];
        }
        this.dependents.push(dispatcher);
    }

    /**
     * Unregister a deactivated Event Dispatcher.
     *
     * @param dispatcher Event Dispatcher.
     */
    unregisterDispatcher(dispatcher: EventDispatcher<any, SyntheticEvent<any>>): void {
        if (--this.counter === 0) {
            this.deactivate();
        }
        // We doesn't depend on the order of dependents, so we can remove with O(1) operation that swaps with the last
        // item and removes last.
        if (this.dependents!.length > 1) {
            this.dependents![this.dependents!.indexOf(dispatcher)] = this.dependents!.pop() !;
        } else {
            this.dependents = null;
        }
    }

    /**
     * Register an Event Handler.
     *
     * @param handler Event Handler.
     */
    registerHandler(handler: (ev: O) => void): void {
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
    unregisterHandler(handler: (ev: O) => void): void {
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
    didRegisterHandler(_handler: (ev: O) => void): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `didUnregisterHandler` is invoked after Event Handler unregistration.
     *
     * @param handler Event Handler.
     */
    didUnregisterHandler(_handler: (ev: O) => void): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }
}
