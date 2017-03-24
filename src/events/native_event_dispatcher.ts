import { getEventTarget } from "../common/dom";
import { NativeEventDispatcherFlags, SyntheticEventFlags } from "./flags";
import { SyntheticEvent, SyntheticEventClass } from "./synthetic_event";
import { EventDispatcher } from "./event_dispatcher";
import { accumulateDispatchTargets } from "./traverse_dom";
import { dispatchEvent } from "./dispatch_event";
import { getEventOptions } from "./utils";
import { scheduleTask } from "../scheduler/task";

/**
 * Native Event Dispatcher.
 */
export class NativeEventDispatcher<E extends SyntheticEventClass<Event, SyntheticEvent<any>>>
    extends EventDispatcher {
    /**
     * See `EventDispatcherFlags` for details.
     */
    readonly flags: NativeEventDispatcherFlags;
    /**
     * Event name.
     */
    readonly name: string;
    /**
     * Synthetic Event Constructor.
     */
    readonly eventType: E;
    /**
     * `dispatch` method with bounded context.
     */
    private readonly _dispatch: (ev: Event) => void;
    /**
     * Flag indicating that Event Dispatcher will be deactivated in the task.
     */
    private _deactivating: boolean;

    constructor(
        flags: NativeEventDispatcherFlags,
        name: string,
        eventType: E,
    ) {
        super();
        this.flags = flags;
        this.name = name;
        this.eventType = eventType;
        this._dispatch = this.dispatchNativeEvent.bind(this);
        this._deactivating = false;
    }

    private dispatchNativeEvent(ev: Event): void {
        const subs = this._nextSubscription;

        let s: SyntheticEvent<any> | undefined;
        if (subs !== null) {
            s = new this.eventType(this, 0, ev, getEventTarget(ev), ev.timeStamp, ev.type);
            this.dispatchEventToSubscribers(s);
        }

        if (s !== undefined &&
            (s._flags &
                (SyntheticEventFlags.StoppedImmediatePropagation | SyntheticEventFlags.StoppedPropagation)) !== 0) {
            return;
        }
        const handlers = accumulateDispatchTargets(getEventTarget(ev) as Element, this);

        if (handlers.length > 0) {
            if (s === undefined) {
                s = new this.eventType(this, 0, ev, getEventTarget(ev), ev.timeStamp, ev.type);
            }
            dispatchEvent(handlers, s!, (this.flags & NativeEventDispatcherFlags.Bubbles) !== 0);
        }

        if (s !== undefined && (s._flags & SyntheticEventFlags.PreventedDefault) !== 0) {
            ev.preventDefault();
        }
    }

    activate(): void {
        if (this._deactivating === true) {
            this._deactivating = false;
        } else {
            super.activate();
            document.addEventListener(
                this.name,
                this._dispatch,
                getEventOptions(this.flags) as boolean,
            );
        }
    }

    deactivate(): void {
        if (this._deactivating === false) {
            this._deactivating = true;
            scheduleTask(() => {
                if (this._deactivating === true) {
                    document.removeEventListener(
                        this.name,
                        this._dispatch,
                        getEventOptions(this.flags) as boolean,
                    );
                    super.deactivate();
                    this._deactivating = false;
                }
            });
        }
    }
}
