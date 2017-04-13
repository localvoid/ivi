import { GesturePointerEvent } from "./pointer_event";

/**
 * Gesture Recognizer.
 */
export interface GestureRecognizer {
    /**
     * Add pointer.
     */
    addPointer(arena: GestureArena, event: GesturePointerEvent): boolean;
    /**
     * Invoked when pointer is moved.
     */
    pointerMoved(arena: GestureArena, event: GesturePointerEvent): void;
    /**
     * Invoked when pointer is released.
     */
    pointerReleased(arena: GestureArena, event: GesturePointerEvent): void;
    /**
     * Invoked when pointer is captured.
     */
    pointerCaptured(arena: GestureArena): void;
    /**
     * Invoked when pointer is canceled.
     */
    pointerCanceled(arena: GestureArena): void;
    /**
     * Dispose Recognizer.
     */
    dispose(): void;
}

/**
 * Gesture Arena Flags.
 */
export const enum GestureArenaFlags {
    /**
     * Arena is closed.
     *
     * When arena is closed, no more gesture recognizers can be added.
     */
    Closed = 1,
    /**
     * Arena is held.
     *
     * When pointer is released and arena is held, arena won't be resolved until arena is released.
     */
    Held = 1 << 1,
    /**
     * Pointer was released.
     */
    PointerReleased = 1 << 2,
    /**
     * Arena is resolved.
     */
    Resolved = 1 << 3,
}

/**
 * Gesture Arena is used to resolve conflicts when there are several gesture recognizers are trying to recognize a
 * gesture.
 */
export interface GestureArena {
    /**
     * Pointer ID.
     *
     * Pointer ID is unique among all arenas that have an active pointer. When arena is in "held" state, it is possible
     * that recognizer will participate in two different arenas with the same pointer id, but only one will have an
     * active pointer.
     */
    pointerId: number;
    /**
     * Last pointer event that were dispatched to this arena.
     */
    pointer: GesturePointerEvent;
    /**
     * Flags. See `GestureArenaFlags` for details.
     */
    flags: GestureArenaFlags;
    /**
     * Number of active recognizers in this arena.
     *
     * When arena is resolved, number of active recognizers is dropped to 1.
     */
    activeRecognizers: number;
    /**
     * Array of active recognizers.
     */
    recognizers: Array<GestureRecognizer | null>;
    /**
     * Recognizer that captured this arena.
     */
    winner: GestureRecognizer | null;
}

/**
 * Create a Gesture Arena.
 *
 * @param pointer Pointer Event.
 */
export function createArena(pointer: GesturePointerEvent): GestureArena {
    return {
        pointerId: pointer.id,
        pointer: pointer,
        flags: 0,
        activeRecognizers: 0,
        recognizers: [],
        winner: null,
    };
}

/**
 * Find Arena by pointer id.
 *
 * @param arenas
 * @param pointerId
 */
export function findArenaByPointerId(arenas: GestureArena[], pointerId: number): GestureArena | undefined {
    for (let i = 0; i < arenas.length; i++) {
        const arena = arenas[i];
        if (arena.pointerId === pointerId) {
            return arena;
        }
    }

    return undefined;
}

/**
 * Add Recognizer to Arena.
 *
 * @param arena
 * @param recognizer
 */
export function addRecognizerToArena(arena: GestureArena, recognizer: GestureRecognizer): void {
    arena.recognizers.push(recognizer);
    arena.activeRecognizers++;
}

/**
 * Capture Arena.
 *
 * Captured arena will be resolved only when arena is closed.
 *
 * @param arena
 * @param recognizer
 */
export function captureArena(arena: GestureArena, recognizer: GestureRecognizer): void {
    if ((arena.flags & GestureArenaFlags.Resolved) === 0) {
        if (arena.winner === null) {
            arena.winner = recognizer;

            // Wait until arena is closed before resolving to make sure that other members receive cancel event.
            if ((arena.flags & GestureArenaFlags.Closed) !== 0) {
                arena.flags |= GestureArenaFlags.Resolved;

                for (let i = 0; i < arena.recognizers.length; i++) {
                    const r = arena.recognizers[i];
                    if (r !== null && r !== recognizer) {
                        r.pointerCanceled(arena);
                    }
                }
                recognizer.pointerCaptured(arena);
            }
        }
    }
}

/**
 * Leave Arena.
 *
 * @param arena
 * @param recognizer
 */
export function leaveArena(arena: GestureArena, recognizer: GestureRecognizer): void {
    arena.activeRecognizers--;
    if (arena.winner !== recognizer) {
        arena.recognizers[arena.recognizers.indexOf(recognizer)] = null;
    }
    recognizer.pointerCanceled(arena);

    if ((arena.flags & GestureArenaFlags.Resolved) === 0) {
        if (arena.activeRecognizers === 1 && (arena.flags & GestureArenaFlags.Closed) !== 0) {
            arena.flags |= GestureArenaFlags.Resolved;
            for (let i = 0; i < arena.recognizers.length; i++) {
                const r = arena.recognizers[i];
                if (r !== null) {
                    arena.winner = r;
                    r.pointerCaptured(arena);
                    break;
                }
            }
        }
    }
}

export function dispatchMoveEventToRecognizers(arena: GestureArena, event: GesturePointerEvent): void {
    if (arena.winner === null) {
        for (let i = 0; i < arena.recognizers.length; i++) {
            const recognizer = arena.recognizers[i];
            if (recognizer !== null) {
                recognizer.pointerMoved(arena, event);
            }
        }
    } else {
        arena.winner.pointerMoved(arena, event);
    }
}

export function dispatchReleaseEventToRecognizers(arena: GestureArena, event: GesturePointerEvent): void {
    if (arena.winner === null) {
        for (let i = 0; i < arena.recognizers.length; i++) {
            const recognizer = arena.recognizers[i];
            if (recognizer !== null) {
                recognizer.pointerReleased(arena, event);
            }
        }
    } else {
        arena.winner.pointerReleased(arena, event);
    }
}

/**
 * Close Arena.
 *
 * @param arena
 */
export function closeArena(arena: GestureArena): void {
    let recognizer: GestureRecognizer | null;
    let i;
    arena.flags |= GestureArenaFlags.Closed;

    if (arena.winner !== null) {
        // Arena was captured before closing.
        arena.flags |= GestureArenaFlags.Resolved;
        recognizer = arena.winner;
        for (i = 0; i < arena.recognizers.length; i++) {
            const r = arena.recognizers[i];
            if (r !== null && r !== recognizer) {
                r.pointerCanceled(arena);
            }
        }
        recognizer.pointerCaptured(arena);
    } else if (arena.activeRecognizers === 1) {
        // When there is just one recognizer, it automatically wins.
        arena.flags |= GestureArenaFlags.Resolved;
        for (i = 0; i < arena.recognizers.length; i++) {
            recognizer = arena.recognizers[i];
            if (recognizer !== null) {
                arena.winner = recognizer;
                recognizer.pointerCaptured(arena);
                break;
            }
        }
    }
}

/**
 * Sweep Arena.
 *
 * @param arena
 * @param event
 */
export function sweepArena(arena: GestureArena, event: GesturePointerEvent): void {
    arena.flags |= GestureArenaFlags.PointerReleased;
    if ((arena.flags & (GestureArenaFlags.Held | GestureArenaFlags.Resolved)) === 0) {
        arena.flags |= GestureArenaFlags.Resolved;
        let i = 0;
        let recognizer;

        // First non-null recognizer wins arena.
        while (i < arena.recognizers.length) {
            recognizer = arena.recognizers[i++];
            if (recognizer !== null) {
                arena.winner = recognizer;
                recognizer.pointerCaptured(arena);
                recognizer.pointerReleased(arena, event);
                break;
            }
        }

        // Other recognizers are canceled.
        for (; i < arena.recognizers.length; i++) {
            recognizer = arena.recognizers[i];
            if (recognizer !== null) {
                recognizer.pointerCanceled(arena);
            }
        }
    }
}

/**
 * Cancel Arena.
 *
 * @param arena
 */
export function cancelArena(arena: GestureArena): void {
    if (arena.flags & GestureArenaFlags.Resolved) {
        // If it is already resolved, other pointers are already canceled and we just need to cancel the winner.
        arena.winner!.pointerCanceled(arena);
    } else {
        arena.flags |= GestureArenaFlags.Resolved;
        for (let i = 0; i < arena.recognizers.length; i++) {
            const recognizer = arena.recognizers[i];
            if (recognizer !== null) {
                recognizer.pointerCanceled(arena);
            }
        }
    }
}

export function holdArena(arena: GestureArena) {
    if ((arena.flags & GestureArenaFlags.PointerReleased) === 0) {
        arena.flags |= GestureArenaFlags.Held;
    }
}

export function releaseArena(arena: GestureArena) {
    if ((arena.flags & GestureArenaFlags.Held) !== 0) {
        arena.flags &= ~GestureArenaFlags.Held;
        if ((arena.flags & GestureArenaFlags.PointerReleased) !== 0) {
            sweepArena(arena, arena.pointer);
        }
    }
}
