import { SyntheticEvent } from "./synthetic_event";

/**
 * Abstract Event Dispatcher.
 *
 * Event Dispatch API is in EXPERIMENTAL phase, there is a high chance that this API will be changed in the future.
 */
export abstract class EventDispatcher<I, O extends SyntheticEvent<any>> {
    /**
     * Number of registered event handlers or other dependencies.
     */
    counter: number;
    /**
     * Event Dispatcher dependencies.
     */
    dependencies: EventDispatcher<any, SyntheticEvent<any>>[] | null;
    /**
     * Event Dispatcher dependents will receive all events produced by this event handler.
     */
    dependents: EventDispatcher<any, SyntheticEvent<any>>[] | null;

    constructor() {
        this.counter = 0;
        this.dependencies = null;
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
        if (this.dependencies) {
            for (let i = 0; this.dependencies.length; i++) {
                this.dependencies[i].registerDispatcher(this);
            }
        }
    }

    /**
     * Lifecycle method `deactivate` is invoked when Event Dispatcher is deactivated.
     */
    deactivate(): void {
        if (this.dependencies) {
            for (let i = 0; this.dependencies.length; i++) {
                this.dependencies[i].unregisterDispatcher(this);
            }
        }
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
