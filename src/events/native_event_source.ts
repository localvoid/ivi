import { getEventTarget } from "../common/dom";
import { NativeEventSourceFlags, SyntheticEventFlags } from "./flags";
import { SyntheticEvent, SyntheticEventClass } from "./synthetic_event";
import { DispatchTarget } from "./dispatch_target";
import { EventSource } from "./event_source";
import { accumulateDispatchTargets } from "./traverse_dom";
import { dispatchEvent } from "./dispatch_event";
import { getEventOptions } from "./utils";
import { scheduleTask } from "../scheduler/task";

/**
 * Native Event Dispatcher.
 */
export class NativeEventSource<E extends SyntheticEventClass<Event, SyntheticEvent<any>>> {
    readonly eventSource: EventSource;
    private dependencies: number;
    /**
     * See `EventDispatcherFlags` for details.
     */
    readonly flags: NativeEventSourceFlags;
    /**
     * Event name.
     */
    readonly name: string;
    /**
     * Synthetic Event Constructor.
     */
    readonly eventType: E;
    /**
     * Flag indicating that Event Dispatcher will be deactivated in the task.
     */
    private _deactivating: boolean;

    constructor(
        flags: NativeEventSourceFlags,
        name: string,
        eventType: E,
    ) {
        this.eventSource = {
            addListener: () => {
                if (this.dependencies++ === 0) {
                    if (this._deactivating === true) {
                        this._deactivating = false;
                    } else {
                        document.addEventListener(
                            this.name,
                            this.dispatch,
                            getEventOptions(this.flags) as boolean,
                        );
                    }
                }
            },
            removeListener: () => {
                if (--this.dependencies === 0) {
                    if (this._deactivating === false) {
                        this._deactivating = true;
                        scheduleTask(() => {
                            if (this._deactivating === true) {
                                document.removeEventListener(
                                    this.name,
                                    this.dispatch,
                                    getEventOptions(this.flags) as boolean,
                                );
                                this._deactivating = false;
                            }
                        });
                    }
                }
            },
        };
        this.dependencies = 0;
        this.flags = flags;
        this.name = name;
        this.eventType = eventType;
        this._deactivating = false;
    }

    private dispatch = (ev: Event): void => {
        const targets: DispatchTarget[] = [];
        accumulateDispatchTargets(targets, getEventTarget(ev) as Element, this.eventSource);

        if (targets.length > 0) {
            const s: SyntheticEvent<any> = new this.eventType(
                this.eventSource,
                0,
                ev,
                getEventTarget(ev),
                ev.timeStamp,
                ev.type,
            );
            console.log(s);
            dispatchEvent(targets, s!, (this.flags & NativeEventSourceFlags.Bubbles) !== 0);
            if ((s._flags & SyntheticEventFlags.PreventedDefault) !== 0) {
                ev.preventDefault();
            }
        }
    }

}
