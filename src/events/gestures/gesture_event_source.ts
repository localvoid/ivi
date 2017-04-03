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
import { EventHandler } from "../event_handler";
import { dispatchEvent } from "../dispatch_event";
import { GesturePointerEvent, GesturePointerAction } from "./pointer_event";
import { pointerListSet, pointerListDelete } from "./pointer_list";
import { createPointerEventListener } from "./pointer_event_listener";
import { createMouseEventListener } from "./mouse_event_listener";
import { createTouchEventListener } from "./touch_event_listener";
import { GestureEventFlags } from "./events";

export interface GestureNativeEventSource {
    activate(): void;
    deactivate(): void;
    capture(ev: GesturePointerEvent, flags: GestureEventFlags): void;
    release(ev: GesturePointerEvent): void;
}

export class GestureEventSource {
    readonly eventSource: EventSource;
    private dependencies: number;
    private pointers: GesturePointerEvent[];
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
        this.pointers = [];
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

    private matchEventSource = (h: EventHandler) => h.source === this.eventSource;

    private dispatch = (ev: GesturePointerEvent) => {
        const targets: DispatchTarget[] = [];
        accumulateDispatchTargets(targets, ev.target, this.matchEventSource);

        if (ev.action === GesturePointerAction.Down) {
            if (targets.length > 0) {
                this.listener.capture(ev, accumulateTouchActionFlags(targets));
                pointerListSet(this.pointers, ev);
            }
        } else if ((ev.action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) !== 0) {
            this.listener.release(ev);
            pointerListDelete(this.pointers, ev.id);
        } else {
            pointerListSet(this.pointers, ev);
        }

        if (targets.length > 0) {
            dispatchEvent(targets, ev, true);
        }
    }
}

function accumulateTouchActionFlags(targets: DispatchTarget[]): GestureEventFlags {
    let flags = 0;
    for (let i = 0; i < targets.length; i++) {
        const h = targets[i].handlers;
        if (typeof h === "function") {
            flags |= h.flags & GestureEventFlags.TouchActions;
        } else {
            for (let j = 0; j < h.length; j++) {
                flags |= h[j].flags & GestureEventFlags.TouchActions;
            }
        }
    }

    return flags;
}
