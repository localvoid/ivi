/**
 * Gesture Recognizers
 *
 * Lifecycle:
 *   handlePointerEvent
 *     PointerDown
 *       Init Recognizer
 *       Add To Arena
 */

import { trace } from "../../dev_mode/trace";
import { EventHandler } from "../event_handler";
import { pointerListGet, pointerListDelete } from "./pointer_list";
import { PointerMap, pointerMapPush } from "./pointer_map";
import { GestureDisposition, GestureArenaMember, GestureArenaEntry } from "./arena";
import { GesturePointerEvent, GesturePointerAction } from "./pointer_event";
import { GestureEventSources } from "./events";

export const enum GestureRecognizerState {
    Ready = 0,
    Possible = 1,
    Defunct = 2,
}

export interface GestureRecognizer extends GestureArenaMember {
    handlePointerEvent(ev: GesturePointerEvent): boolean;
    dispose(): void;
}

export abstract class OneSequenceGestureRecognizer implements GestureRecognizer {
    protected handler: EventHandler;
    protected entries: PointerMap<GestureArenaEntry>;
    protected readonly pointers: GesturePointerEvent[];

    constructor(handler: EventHandler) {
        this.handler = handler;
        this.entries = [];
        this.pointers = [];
    }

    abstract handlePointerEvent(pointer: GesturePointerEvent): boolean;
    abstract didStopTrackingLastPointer(pointer: GesturePointerEvent): void;

    acceptGesture(pointerId: number): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }
    rejectGesture(pointerId: number): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    resolve(disposition: GestureDisposition): void {
        trace(`OneSequenceGestureRecognizer.resolve(${disposition})`);
        for (let i = 0; i < this.entries.length; i++) {
            this.entries[i].value.resolve(disposition);
        }
        this.entries = [];
    }

    dispose(): void {
        this.resolve(GestureDisposition.Rejected);
        for (let i = 0; i < this.pointers.length; i++) {
            GestureEventSources.Pointer.removeRoute(this.pointers[i].id, this._handlePointerEvent);
        }
    }

    startPointerTracking(pointer: GesturePointerEvent): void {
        trace("startPointerTracking");
        GestureEventSources.Pointer.addRoute(pointer.id, this._handlePointerEvent);
        this.pointers.push(pointer);
        pointerMapPush(this.entries, pointer.id, this.addPointerToArena(pointer));
    }

    stopPointerTracking(pointer: GesturePointerEvent): void {
        trace("stopPointerTracking");
        if (pointerListGet(this.pointers, pointer.id) !== undefined) {
            GestureEventSources.Pointer.removeRoute(pointer.id, this._handlePointerEvent);
            pointerListDelete(this.pointers, pointer.id);
            if (this.pointers.length === 0) {
                this.didStopTrackingLastPointer(pointer);
            }
        }
    }

    private _handlePointerEvent = this.handlePointerEvent.bind(this);

    private addPointerToArena(pointer: GesturePointerEvent): GestureArenaEntry {
        return GestureEventSources.Pointer.arena.add(pointer.id, this);
    }
}

export abstract class PrimaryPointerGestureRecognizer extends OneSequenceGestureRecognizer {
    protected deadline: number;
    protected state: GestureRecognizerState;
    protected primaryPointer: GesturePointerEvent | null;
    protected primaryPointerDown: GesturePointerEvent | null;
    protected abstract didExceedTimeline: () => void;
    private timeoutId: number;

    constructor(handler: EventHandler, deadline: number = 0) {
        super(handler);
        this.deadline = deadline;
        this.state = GestureRecognizerState.Ready;
        this.primaryPointer = null;
        this.primaryPointerDown = null;
        this.timeoutId = -1;
    }

    handlePointerEvent(ev: GesturePointerEvent): boolean {
        trace(`PrimaryPointerGestureRecognizer.handlePointerEvent()`);
        if (ev.action === GesturePointerAction.Down) {
            this.startPointerTracking(ev);
            if (this.state === GestureRecognizerState.Ready) {
                this.state = GestureRecognizerState.Possible;
                this.primaryPointer = ev;
                this.primaryPointerDown = ev;
                if (this.deadline > 0) {
                    this.timeoutId = setTimeout(this.didExceedTimeline, this.deadline);
                }
                return true;
            }
        } else {
            if (this.primaryPointer !== null && this.primaryPointer!.id === ev.id) {
                this.handlePrimaryPointer(ev);
            }
            if (ev.action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) {
                this.stopPointerTracking(ev);
            }
        }
        return false;
    }

    rejectGesture(pointerId: number): void {
        if (this.primaryPointer !== null && this.primaryPointer.id === pointerId) {
            this.state = GestureRecognizerState.Defunct;
            this.cancelTimeout();
        }
    }

    dispose() {
        this.cancelTimeout();
        super.dispose();
    }

    didStopTrackingLastPointer(pointer: GesturePointerEvent): void {
        trace("didStopTrackingLastPointer");
        this.state = GestureRecognizerState.Ready;
        this.cancelTimeout();
    }

    cancelTimeout() {
        if (this.timeoutId > -1) {
            clearTimeout(this.timeoutId);
            this.timeoutId = -1;
        }
    }

    abstract handlePrimaryPointer(ev: GesturePointerEvent): void;
}
