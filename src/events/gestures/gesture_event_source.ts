/**
 * Getting touchy - everything you (n)ever wanted to know about touch and pointer events
 *   https://patrickhlauke.github.io/getting-touchy-presentation/
 *
 * Issues with touch events
 *   https://docs.google.com/document/d/12-HPlSIF7-ISY8TQHtuQ3IqDi-isZVI0Yzv5zwl90VU
 */

/**
 * Arenas:
 *
 * ArenaMember
 *   acceptGesture(Pointer ID)
 *   rejectGesture(Pointer ID)
 *
 * Arena
 *   ArenaMembers[]
 *
 * ArenaManager
 *   Pointer ID => Arena
 *
 *   Add Member
 *     Create a new Arena if it doesn't exist
 *     Add member to Arena
 *
 *   Close (Prevents new members from entering Arena)
 *   Sweep (Forces resolution of the Arena, first member wins)
 *   Hold (Prevents the Arena from being swept)
 *   Release (Releases the Arena, allowing Arena to be swept)
 *
 */

/**
 * Event Flow:
 *
 * PointerDown
 *   Add to Pointers list
 *   Hit-Target test
 *   Two-Phase dispatch
 *     Add PointerEvent handlers Router
 *     Initialize Gesture Recognizers
 *       When Pointer is captured
 *         Add to Router
 *         Add to Arena
 *   Close Arena
 *
 * PointerMove | PointerUp | PointerCancel
 *   Router dispatch
 *
 * PointerUp
 *   Sweep Arena
 *
 * PointerUp | PointerCancel
 *   Remove From Pointers list
 *
 */

import { FEATURES, FeatureFlags } from "../../common/feature_detection";
import { scheduleTask } from "../../scheduler/task";
import { accumulateDispatchTargets } from "../traverse_dom";
import { DispatchTarget } from "../dispatch_target";
import { SyntheticEvent } from "../synthetic_event";
import { EventSource } from "../event_source";
import { EventHandler } from "../event_handler";
import { dispatchEvent } from "../dispatch_event";
import { GesturePointerEvent, GesturePointerAction } from "./pointer_event";
import { pointerListSet, pointerListDelete } from "./pointer_list";
import { GestureArenaManager } from "./arena";
import { createPointerEventListener } from "./pointer_event_listener";
import { createMouseEventListener } from "./mouse_event_listener";
import { createTouchEventListener } from "./touch_event_listener";
import { GestureEventFlags } from "./events";
import {
    PointerMapList, pointerMapListPush, pointerMapListDelete, pointerMapGet, pointerMapDelete,
} from "./pointer_map";

export interface GestureNativeEventSource {
    activate(): void;
    deactivate(): void;
    capture(ev: GesturePointerEvent, target: Element, flags: GestureEventFlags): void;
    release(ev: GesturePointerEvent): void;
}

export type PointerRoute = (ev: GesturePointerEvent) => void;

export class GestureEventSource {
    readonly pointerEventSource: EventSource;
    readonly gestureEventSource: EventSource;
    private dependencies: number;
    private pointers: GesturePointerEvent[];
    private listener: GestureNativeEventSource;
    private routes: PointerMapList<PointerRoute>;
    readonly arena: GestureArenaManager;
    private deactivating: boolean;

    constructor() {
        this.pointerEventSource = {
            addListener: this.addPointerListener,
            removeListener: this.removePointerListener,
        };
        this.gestureEventSource = {
            addListener: this.addGestureListener,
            removeListener: this.removeGestureListener,
        };
        this.dependencies = 0;
        this.pointers = [];
        if (FEATURES & FeatureFlags.PointerEvents) {
            this.listener = createPointerEventListener(
                this.pointerEventSource,
                this.pointers,
                this.dispatch,
            );
        } else {
            if (FEATURES & FeatureFlags.TouchEvents) {
                this.listener = createTouchEventListener(
                    this.pointerEventSource,
                    this.pointers,
                    this.dispatch,
                );
            } else {
                this.listener = createMouseEventListener(
                    this.pointerEventSource,
                    this.pointers,
                    this.dispatch,
                );
            }
        }
        this.routes = [];
        this.arena = new GestureArenaManager();
        this.deactivating = false;
    }

    addRoute(pointerId: number, route: PointerRoute): void {
        pointerMapListPush(this.routes, pointerId, route);
    }

    removeRoute(pointerId: number, route: PointerRoute): void {
        pointerMapListDelete(this.routes, pointerId, route);
    }

    private addPointerListener = () => {
        if (this.dependencies++ === 0) {
            if (this.deactivating === true) {
                this.deactivating = false;
            } else {
                this.listener.activate();
            }
        }
    }

    private removePointerListener = () => {
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
    }

    private addGestureListener = (h: EventHandler) => {
        this.addPointerListener();
        h.listeners++;
    }

    private removeGestureListener = (h: EventHandler) => {
        this.removePointerListener();
        if (--h.listeners === 0) {
            if (h.state !== null) {
                h.state.dispose();
                h.state = null;
            }
        }
    }

    private matchEventSource = (h: EventHandler) => (
        h.source === this.pointerEventSource ||
        h.source === this.gestureEventSource
    );

    private dispatch = (ev: GesturePointerEvent, target?: Element) => {
        if (ev.action === GesturePointerAction.Down) {
            const targets: DispatchTarget[] = [];
            accumulateDispatchTargets(targets, target!, this.matchEventSource);

            if (targets.length > 0) {
                let capture = false;
                let captureFlags = 0;
                dispatchEvent(targets, ev, true, (h: EventHandler, e: SyntheticEvent) => {
                    if (h.source === this.pointerEventSource) {
                        pointerMapListPush(this.routes, ev.id, h);
                        h(e);
                        captureFlags |= h.flags & GestureEventFlags.TouchActions;
                        capture = true;
                    } else if (h.source === this.gestureEventSource) {
                        if (h.state === null) {
                            h.state = h.props(h);
                        }
                        if (h.state.handlePointerEvent(e) === true) {
                            capture = true;
                            captureFlags |= h.flags & GestureEventFlags.TouchActions;
                        }
                    }
                });
                if (capture) {
                    this.listener.capture(ev, target!, captureFlags);
                    pointerListSet(this.pointers, ev);
                    this.arena.close(ev.id);
                }
            }
        } else {
            const routes = pointerMapGet(this.routes, ev.id);
            if ((ev.action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) !== 0) {
                this.listener.release(ev);
                pointerListDelete(this.pointers, ev.id);
                pointerMapDelete(this.routes, ev.id);
            } else {
                pointerListSet(this.pointers, ev);
            }
            if (routes !== undefined) {
                for (let i = 0; i < routes.length; i++) {
                    routes[i](ev);
                }
            }
            if ((ev.action & GesturePointerAction.Up) !== 0) {
                this.arena.sweep(ev.id);
            }
        }
    }
}
