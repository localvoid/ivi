/**
 * Getting touchy - everything you (n)ever wanted to know about touch and pointer events
 *   https://patrickhlauke.github.io/getting-touchy-presentation/
 *
 * Issues with touch events
 *   https://docs.google.com/document/d/12-HPlSIF7-ISY8TQHtuQ3IqDi-isZVI0Yzv5zwl90VU
 */

import { FEATURES, FeatureFlags } from "../../common/feature_detection";
import { scheduleTask } from "../../scheduler/task";
import { accumulateDispatchTargets } from "../traverse_dom";
import { DispatchTarget } from "../dispatch_target";
import { EventSource } from "../event_source";
import { dispatchEvent } from "../dispatch_event";
import { GesturePointerEvent, GesturePointerAction } from "./pointer_event";
import { createPointerEventListener } from "./pointer_event_listener";
import { createMouseEventListener } from "./mouse_event_listener";
import { createTouchEventListener } from "./touch_event_listener";

export interface GestureNativeEventSource {
    activate(): void;
    deactivate(): void;
    capture(ev: GesturePointerEvent): void;
    release(ev: GesturePointerEvent): void;
}

export class GestureEventSource {
    readonly eventSource: EventSource;
    private dependencies: number;
    private pointers: Map<number, GesturePointerEvent>;
    private listener: GestureNativeEventSource;
    private deactivating: boolean;

    constructor() {
        this.eventSource = {
            addListener: () => {
                if (this.dependencies++ === 0) {
                    if (this.deactivating === true) {
                        this.deactivating = false;
                    } else {
                        this.listener.activate();
                    }
                }
            },
            removeListener: () => {
                if (--this.dependencies === 0) {
                    if (this.deactivating === false) {
                        this.deactivating = true;
                        scheduleTask(() => {
                            if (this.deactivating === true) {
                                this.listener.deactivate();
                                this.deactivating = false;
                            }
                        });
                    }
                }
            },
        };
        this.dependencies = 0;
        this.pointers = new Map<number, GesturePointerEvent>();
        if (FEATURES & FeatureFlags.PointerEvents) {
            this.listener = createPointerEventListener(
                this.eventSource,
                this.pointers,
                this.dispatch,
            );
        } else {
            if (FEATURES & FeatureFlags.TouchEvents) {
                this.listener = createTouchEventListener(
                    this.eventSource,
                    this.pointers,
                    this.dispatch,
                );
            } else {
                this.listener = createMouseEventListener(
                    this.eventSource,
                    this.pointers,
                    this.dispatch,
                );
            }
        }
        this.deactivating = false;
    }

    private dispatch = (ev: GesturePointerEvent) => {
        const targets: DispatchTarget[] = [];
        accumulateDispatchTargets(targets, ev.target, this.eventSource);

        if (ev.action === GesturePointerAction.Down) {
            if (targets.length > 0) {
                this.listener.capture(ev);
                this.pointers.set(ev.id, ev);
            }
        } else if ((ev.action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) !== 0) {
            this.listener.release(ev);
            this.pointers.delete(ev.id);
        } else {
            this.pointers.set(ev.id, ev);
        }

        if (targets.length > 0) {
            dispatchEvent(targets, ev, true);
        }
    }
}
