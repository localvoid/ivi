/**
 * Getting touchy - everything you (n)ever wanted to know about touch and pointer events
 *   https://patrickhlauke.github.io/getting-touchy-presentation/
 *
 * Issues with touch events
 *   https://docs.google.com/document/d/12-HPlSIF7-ISY8TQHtuQ3IqDi-isZVI0Yzv5zwl90VU
 */

import { FEATURES, FeatureFlags } from "../../common/feature_detection";
import { unorderedArrayDelete } from "../../common/utils";
import { scheduleTask } from "../../scheduler/task";
import { accumulateDispatchTargets } from "../traverse_dom";
import { DispatchTarget } from "../dispatch_target";
import { SyntheticEvent } from "../synthetic_event";
import { EventSource } from "../event_source";
import { EventHandler } from "../event_handler";
import { dispatchEvent } from "../dispatch_event";
import { GesturePointerEvent, GesturePointerAction } from "./pointer_event";
import { pointerListSet, pointerListDelete } from "./pointer_list";
import {
    GestureArena, createArena, findArenaByPointerId, addRecognizerToArena, closeArena, sweepArena, cancelArena,
    dispatchMoveEventToRecognizers, dispatchReleaseEventToRecognizers,
} from "./arena";
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
    private readonly pointers: GesturePointerEvent[];
    private readonly listener: GestureNativeEventSource;
    private readonly routes: PointerMapList<PointerRoute>;
    private readonly arenas: GestureArena[];
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
        this.arenas = [];
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
        const action = ev.action;
        let arena: GestureArena | undefined;

        if (action === GesturePointerAction.Down) {
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
                        if (arena === undefined) {
                            arena = createArena(ev);
                        }
                        if (h.state.addPointer(arena, e) === true) {
                            addRecognizerToArena(arena, h.state);
                            capture = true;
                            captureFlags |= h.flags & GestureEventFlags.TouchActions;
                        }
                    }
                });
                if (capture) {
                    this.listener.capture(ev, target!, captureFlags);
                    pointerListSet(this.pointers, ev);
                    if (arena) {
                        this.arenas.push(arena);
                        closeArena(arena);
                    }
                }
            }
        } else {
            const routes = pointerMapGet(this.routes, ev.id);
            arena = findArenaByPointerId(this.arenas, ev.id);

            if ((action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) !== 0) {
                this.listener.release(ev);
                pointerListDelete(this.pointers, ev.id);
                if (routes !== undefined) {
                    pointerMapDelete(this.routes, ev.id);
                }
            } else {
                pointerListSet(this.pointers, ev);
            }

            // Dispatch event to Pointer handlers.
            if (routes !== undefined) {
                for (let i = 0; i < routes.length; i++) {
                    routes[i](ev);
                }
            }

            // Dispatch event to Gesture Recognizers.
            if (arena !== undefined) {
                if (arena.activeRecognizers > 0) {
                    arena.pointer = ev;
                    if ((action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) !== 0) {
                        if ((action & GesturePointerAction.Up) !== 0) {
                            dispatchReleaseEventToRecognizers(arena, ev);
                            sweepArena(arena, ev);
                        } else {
                            cancelArena(arena);
                        }
                        unorderedArrayDelete(this.arenas, this.arenas.indexOf(arena));
                    } else {
                        dispatchMoveEventToRecognizers(arena, ev);
                    }
                } else {
                    unorderedArrayDelete(this.arenas, this.arenas.indexOf(arena));
                    if (routes === undefined) {
                        if ((action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) === 0) {
                            this.listener.release(ev);
                            pointerListDelete(this.pointers, ev.id);
                        }
                    }
                }
            }
        }
    }
}
