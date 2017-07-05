import { scheduleTask } from "ivi-scheduler";
import { getEventTarget, getNativeEventOptions } from "./utils";
import { NativeEventSourceFlags, SyntheticEventFlags } from "./flags";
import { SyntheticNativeEvent, SyntheticNativeEventClass } from "./synthetic_event";
import { EventSource } from "./event_source";
import { EventHandler } from "./event_handler";
import { accumulateDispatchTargets } from "./traverse_dom";
import { DispatchTarget, dispatchEvent } from "./dispatch";

/**
 * NativeEventSource dispatches native events.
 *
 * It is using two-phase dispatching algorithm similar to native DOM events flow.
 */
export class NativeEventSource<E extends SyntheticNativeEventClass<Event, SyntheticNativeEvent<any>>> {
    /**
     * Public EventSource interface.
     */
    readonly eventSource: EventSource;
    /**
     * Number of active dependencies.
     *
     * When there are active dependencies, event source will be activated by attaching native event listeners to the
     * document. When it goes to zero it will be deactivated, and all event listeners will be removed.
     */
    private dependencies: number;
    /**
     * See `NativeEventSourceFlags` for details.
     */
    readonly flags: NativeEventSourceFlags;
    /**
     * DOM event name.
     */
    readonly name: string;
    /**
     * Synthetic Event constructor.
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
                            getNativeEventOptions(this.flags) as boolean,
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
                                    getNativeEventOptions(this.flags) as boolean,
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
