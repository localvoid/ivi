import { getEventTarget } from "../common/dom";
import { scheduleTask } from "../scheduler/task";
import { NativeEventSourceFlags, SyntheticEventFlags } from "./flags";
import { SyntheticNativeEvent, SyntheticNativeEventClass } from "./synthetic_event";
import { DispatchTarget } from "./dispatch_target";
import { EventSource } from "./event_source";
import { EventHandler } from "./event_handler";
import { accumulateDispatchTargets } from "./traverse_dom";
import { dispatchEvent } from "./dispatch_event";
import { getEventOptions } from "./utils";

/**
 * Native Event Dispatcher.
 */
export class NativeEventSource<E extends SyntheticNativeEventClass<Event, SyntheticNativeEvent<any>>> {
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
    private deactivating: boolean;

    constructor(
        flags: NativeEventSourceFlags,
        name: string,
        eventType: E,
    ) {
        this.eventSource = {
            addListener: () => {
                if (this.dependencies++ === 0) {
                    if (this.deactivating === true) {
                        this.deactivating = false;
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
                    if (this.deactivating === false) {
                        this.deactivating = true;
                        scheduleTask(() => {
                            if (this.deactivating === true) {
                                document.removeEventListener(
                                    this.name,
                                    this.dispatch,
                                    getEventOptions(this.flags) as boolean,
                                );
                                this.deactivating = false;
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
        this.deactivating = false;
    }

    private matchEventSource = (h: EventHandler) => h.source === this.eventSource;

    private dispatch = (ev: Event): void => {
        const targets: DispatchTarget[] = [];
        accumulateDispatchTargets(targets, getEventTarget(ev) as Element, this.matchEventSource);

        if (targets.length > 0) {
            const s = new this.eventType(
                this.eventSource,
                0,
                getEventTarget(ev),
                ev.timeStamp,
                ev,
            );
            dispatchEvent(targets, s, (this.flags & NativeEventSourceFlags.Bubbles) !== 0);
            if ((s.flags & SyntheticEventFlags.PreventedDefault) !== 0) {
                ev.preventDefault();
            }
        }
    }

}
