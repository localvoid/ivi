import { NativeEventDispatcherFlags } from "./flags";
import { SyntheticDOMEvent, SyntheticEventClass } from "./synthetic_event";
import { EventDispatcher } from "./event_dispatcher";
import { accumulateDispatchTargets } from "./traverse_dom";
import { dispatchEvent } from "./dispatch_event";
import { getEventTarget, getEventOptions } from "./utils";
import { scheduleMacrotask } from "../scheduler/scheduler";

/**
 * Native Event Dispatcher.
 */
export class NativeEventDispatcher<E extends SyntheticEventClass<Event, SyntheticDOMEvent<any>>>
    extends EventDispatcher<null, string> {
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
     * Flag indicating that Event Dispatcher will be deactivated in the macrotask.
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
        const deps = this.subscribers;
        const handlers = accumulateDispatchTargets(getEventTarget(ev) as Element, this);

        let s: SyntheticDOMEvent<any> | undefined;
        if (handlers || deps) {
            s = new this.eventType(0, ev, getEventTarget(ev));
        }

        if (handlers.length > 0) {
            dispatchEvent(handlers, s!, !!(this.flags & NativeEventDispatcherFlags.Bubbles));
        }

        if (s) {
            this.dispatchEventToSubscribers(s, ev.type);
        }
    }

    activate(): void {
        if (this._deactivating) {
            this._deactivating = false;
        } else {
            super.activate();
            document.addEventListener(
                this.name,
                this._dispatch as any as (ev: Event) => void,
                getEventOptions(this.flags) as boolean);
        }
    }

    deactivate(): void {
        if (!this._deactivating) {
            this._deactivating = true;
            scheduleMacrotask(() => {
                if (this._deactivating) {
                    document.removeEventListener(
                        this.name,
                        this._dispatch as any as (ev: Event) => void,
                        getEventOptions(this.flags) as boolean);
                    super.deactivate();
                    this._deactivating = false;
                }
            });
        }
    }
}
