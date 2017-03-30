import { scheduleMicrotask } from "../../scheduler/microtask";

export const enum GestureDisposition {
    Accepted = 0,
    Rejected = 1,
}

export interface GestureArenaMember {
    acceptGesture(pointerId: number): void;
    rejectGesture(pointerId: number): void;
}

export class GestureArenaEntry {
    private arena: GestureArenaManager;
    private pointerId: number;
    private member: GestureArenaMember;

    constructor(
        arena: GestureArenaManager,
        pointer: number,
        member: GestureArenaMember,
    ) {
        this.arena = arena;
        this.pointerId = pointer;
        this.member = member;
    }

    resolve(disposition: GestureDisposition) {
        this.arena._resolve(this.pointerId, this.member, disposition);
    }
}

export class GestureArena {
    members = [] as GestureArenaMember[];
    isOpen = true;
    isHeld = false;
    hasPendingSweep = false;
    eagerWinner: GestureArenaMember | null = null;

    add(member: GestureArenaMember): void {
        this.members.push(member);
    }
}

export class GestureArenaManager {
    private arenas = new Map<number, GestureArena>();

    add(pointerId: number, member: GestureArenaMember): GestureArenaEntry {
        let state = this.arenas.get(pointerId);
        if (state === undefined) {
            state = new GestureArena();
            this.arenas.set(pointerId, state);
        }
        return new GestureArenaEntry(this, pointerId, member);
    }

    close(pointerId: number): void {
        const state = this.arenas.get(pointerId);
        if (state !== undefined) {
            state.isOpen = false;
            this._tryToResolveArena(pointerId, state);
        }
    }

    sweep(pointerId: number): void {
        const state = this.arenas.get(pointerId);
        if (state !== undefined) {
            if (state.isHeld === true) {
                state.hasPendingSweep = true;
                return;
            }
            this.arenas.delete(pointerId);
            if (state.members.length > 0) {
                state.members[0].acceptGesture(pointerId);
                for (let i = 1; i < state.members.length; i++) {
                    state.members[i].rejectGesture(pointerId);
                }
            }
        }
    }

    hold(pointerId: number): void {
        const state = this.arenas.get(pointerId);
        if (state !== undefined) {
            state.isHeld = false;
            if (state.hasPendingSweep === true) {
                this.sweep(pointerId);
            }
        }
    }

    _resolveByDefault(pointerId: number, state: GestureArena): void {
        if (this.arenas.has(pointerId)) {
            this.arenas.delete(pointerId);
            state.members[0].acceptGesture(pointerId);
        }
    }

    _tryToResolveArena(pointerId: number, state: GestureArena): void {
        if (state.members.length === 1) {
            scheduleMicrotask(() => this._resolveByDefault(pointerId, state));
        } else if (state.members.length === 0) {
            this.arenas.delete(pointerId);
        } else if (state.eagerWinner !== null) {
            this._resolveInFavor(pointerId, state, state.eagerWinner);
        }
    }

    _resolve(pointerId: number, member: GestureArenaMember, disposition: GestureDisposition): void {
        const state = this.arenas.get(pointerId);
        if (state !== undefined) {
            if (disposition === GestureDisposition.Rejected) {
                state.members.splice(state.members.indexOf(member), 1);
                member.rejectGesture(pointerId);
                if (state.isOpen === false) {
                    this._tryToResolveArena(pointerId, state);
                }
            } else {
                if (state.isOpen === true) {
                    if (state.eagerWinner === null) {
                        state.eagerWinner = member;
                    }
                } else {
                    this._resolveInFavor(pointerId, state, member);
                }
            }
        }
    }

    _resolveInFavor(pointerId: number, state: GestureArena, member: GestureArenaMember): void {
        this.arenas.delete(pointerId);
        for (let i = 0; i < state.members.length; i++) {
            const rejected = state.members[i];
            if (rejected !== member) {
                rejected.rejectGesture(pointerId);
            }
        }
        member.acceptGesture(pointerId);
    }
}
