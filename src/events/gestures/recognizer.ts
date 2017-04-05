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
    protected entries: PointerMap<GestureArenaEntry>;
    protected readonly pointers: GesturePointerEvent[];

    constructor() {
        this.entries = [];
        this.pointers = [];
    }

    abstract handlePointerEvent(pointer: GesturePointerEvent): boolean;
    abstract acceptGesture(pointerId: number): void;
    abstract rejectGesture(pointerId: number): void;

    abstract didStopTrackingLastPointer(pointer: GesturePointerEvent): void;

    resolve(disposition: GestureDisposition): void {
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
        GestureEventSources.Pointer.addRoute(pointer.id, this._handlePointerEvent);
        this.pointers.push(pointer);
        this.addPointerToArena(pointer);
        pointerMapPush(this.entries, pointer.id, this.addPointerToArena(pointer));
    }

    stopPointerTracking(pointer: GesturePointerEvent): void {
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
    state: GestureRecognizerState;
    primaryPointer: GesturePointerEvent;
    primaryPointerDown: GesturePointerEvent;

    handlePointerEvent(ev: GesturePointerEvent): boolean {
        if (ev.action === GesturePointerAction.Down) {
            this.startPointerTracking(ev);
            if (this.state === GestureRecognizerState.Ready) {
                this.state = GestureRecognizerState.Possible;
                this.primaryPointer = ev;
                this.primaryPointerDown = ev;
                return true;
            }
        } else {
            if (this.primaryPointer.id === ev.id) {
                this.handlePrimaryPointer(ev);
            }
            if (ev.action & (GesturePointerAction.Up | GesturePointerAction.Cancel)) {
                this.stopPointerTracking(ev);
            }
        }
        return false;
    }

    rejectGesture(pointerId: number): void {
        if (this.primaryPointer.id === pointerId) {
            this.state = GestureRecognizerState.Defunct;
        }
    }

    didStopTrackingLastPointer(pointer: GesturePointerEvent): void {
        this.state = GestureRecognizerState.Ready;
    }

    abstract handlePrimaryPointer(ev: GesturePointerEvent): void;
}
