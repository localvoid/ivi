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
import { GesturePointerEvent } from "./pointer_event";
import { createPointerEventListener } from "./pointer_event_listener";
import { createMouseEventListener } from "./mouse_event_listener";
import { createTouchEventListener } from "./touch_event_listener";

export interface GestureNativeEventSource {
    activate(): void;
    deactivate(): void;
}

export class GestureEventSource {
    readonly eventSource: EventSource;
    private dependencies: number;
    private pointers: Map<number, GesturePointerEvent>;
    private listener: GestureNativeEventSource;
    private _deactivating: boolean;

    constructor() {
        this.eventSource = {
            addListener: () => {
                if (this.dependencies++ === 0) {
                    if (this._deactivating === true) {
                        this._deactivating = false;
                    } else {
                        this.listener.activate();
                    }
                }
            },
            removeListener: () => {
                if (--this.dependencies === 0) {
                    if (this._deactivating === false) {
                        this._deactivating = true;
                        scheduleTask(() => {
                            if (this._deactivating === true) {
                                this.listener.deactivate();
                                this._deactivating = false;
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
            this.listener = createMouseEventListener(
                this.eventSource,
                this.pointers,
                this.dispatch,
            );
            if (FEATURES & FeatureFlags.TouchEvents) {
                this.listener = createTouchEventListener(
                    this.eventSource,
                    this.pointers,
                    this.dispatch,
                );
            }
        }
        this._deactivating = false;
    }

    private dispatch = (ev: GesturePointerEvent) => {
        const targets: DispatchTarget[] = [];
        accumulateDispatchTargets(targets, ev.target, this.eventSource);

        if (targets.length > 0) {
            dispatchEvent(targets, ev, true);
        }
    }
}
