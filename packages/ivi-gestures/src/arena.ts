/**
 * Initially it was designed with an idea that each pointer is assigned to an arena and when there are several
 * recognizers that want to use pointer from this arena, they are starting to compete with each other and when arena
 * is resolved, all recognizers except the winner in this arena are canceled and only winner continues to use this
 * pointer.
 *
 * Unfortunately, because of the limitations in many browsers it is probably impossible to support such architecture.
 * Current architecture can support only one active gesture recognizer. It doesn't mean that it is impossible to
 * recognize two gestures like scale/rotate in parallel, it means that we aren't allowing to recognize two parallel
 * gestures that started from different touches.
 *
 * There aren't many use cases that require several parallel recognizers, so this solution is good enough for many
 * applications.
 *
 * The new simplified arenas are designed in a way that there is only one arena that is activated when primary pointer
 * is pressed and is immediately closed after registration of all recognizers associated with primary pointer targets.
 * All other relevant pointers will be routed to registered recognizers, and when primary pointer is released, arena is
 * sweeped.
 *
 * Native gestures are also participating in the arena, the only difference is that when we detect native gesture and it
 * wins in the arena, we remove touchmove listeners until new primary pointer is pressed.
 */

import { GesturePointerEvent } from "./pointer_event";

/**
 * Gesture Recognizer.
 */
export abstract class GestureRecognizer {
  /**
   * Activate Gesture Recognizer.
   *
   * When Gesture Recognizer is activated it should return `true` value.
   */
  abstract activate(event: GesturePointerEvent): boolean;

  /**
   * Invoked when Gesture Recognizer is accepted.
   */
  abstract accepted(): void;

  /**
   * Invoked when Gesture Recognizer is rejected.
   */
  abstract rejected(): void;

  /**
   * Add pointer.
   */
  addPointer(event: GesturePointerEvent): boolean {
    // Ignore all non-primary events by default.
    return false;
  }

  /**
   * Invoked when pointer is moved.
   */
  abstract pointerMoved(event: GesturePointerEvent): void;

  /**
   * Invoked when pointer is released.
   */
  abstract pointerReleased(event: GesturePointerEvent): void;

  /**
   * Dispose Gesture Recognizer.
   */
  abstract dispose(): void;

  /**
   * Accept Gesture Recognizer.
   */
  accept(): void {
    acceptRecognizer(this);
  }

  /**
   * Reject Gesture Recognizer.
   */
  reject(): void {
    rejectRecognizer(this);
  }
}

export abstract class NativeGestureRecognizer extends GestureRecognizer {
  /**
   * Native Gesture Recognizer is accepted.
   */
  accepted(): void {
    arena.flags |= GestureArenaFlags.NativeGestureAccepted;
  }

  /**
   * Native Gesture Recognizer is rejected.
   */
  rejected(): void {
    arena.flags |= GestureArenaFlags.NativeGestureRejected;
  }
}

/**
 * Gesture Arena Flags.
 */
export const enum GestureArenaFlags {
  /**
   * Multitouch Arena.
   */
  Multitouch = 1,
  /**
   * Arena is closed.
   *
   * When arena is closed, no more gesture recognizers can be added.
   */
  Closed = 1 << 1,
  /**
   * Arena is held.
   *
   * When pointer is released and arena is held, arena won't be resolved until arena is released.
   */
  Held = 1 << 2,
  /**
   * Pointer was released.
   */
  PrimaryPointerReleased = 1 << 3,
  /**
   * Arena is resolved.
   */
  Resolved = 1 << 4,
  /**
   * Native Gesture is accepted.
   */
  NativeGestureAccepted = 1 << 5,
  /**
   * Native Gesture is rejected.
   */
  NativeGestureRejected = 1 << 6,
}

/**
 * Gesture Arena is used to resolve conflicts when there are several gesture recognizers are trying to recognize a
 * gesture.
 */
export class GestureArena {
  /**
   * Flags. See `GestureArenaFlags` for details.
   */
  flags: GestureArenaFlags;
  /**
   * Primary pointer.
   */
  primaryPointer: GesturePointerEvent | null;
  /**
   * Number of dependencies that holding arena from sweeping.
   */
  holdCounter: number;
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

  constructor() {
    this.flags = 0;
    this.primaryPointer = null;
    this.holdCounter = 0;
    this.activeRecognizers = 0;
    this.recognizers = [];
    this.winner = null;
  }
}

/**
 * List of arenas that have an active pointer.
 */
export const arena: GestureArena = new GestureArena();

/**
 * Add Recognizer to Arena.
 *
 * @param recognizer
 */
export function addRecognizerToArena(recognizer: GestureRecognizer): void {
  arena.recognizers.push(recognizer);
  arena.activeRecognizers++;
}

/**
 * Accept Gesture Recognizer.
 *
 * Arena will be resolved only when arena is closed.
 *
 * @param recognizer
 */
function acceptRecognizer(recognizer: GestureRecognizer): void {
  if ((arena.flags & GestureArenaFlags.Resolved) === 0) {
    if (arena.winner === null) {
      arena.winner = recognizer;

      // Wait until arena is closed before resolving to make sure that other members receive cancel event.
      if ((arena.flags & GestureArenaFlags.Closed) !== 0) {
        arena.flags |= GestureArenaFlags.Resolved;

        for (let i = 0; i < arena.recognizers.length; i++) {
          const r = arena.recognizers[i];
          if (r !== null && r !== recognizer) {
            arena.activeRecognizers--;
            r.rejected();
          }
        }
        recognizer.accepted();
      }
    }
  }
}

/**
 * Reject Gesture Recognizer.
 *
 * @param recognizer
 */
function rejectRecognizer(recognizer: GestureRecognizer): void {
  const recognizers = arena.recognizers;

  arena.activeRecognizers--;
  if (arena.winner !== recognizer) {
    recognizers[recognizers.indexOf(recognizer)] = null;
  }
  recognizer.rejected();

  if ((arena.flags & GestureArenaFlags.Resolved) === 0) {
    if (arena.activeRecognizers === 1 && (arena.flags & GestureArenaFlags.Closed) !== 0) {
      arena.flags |= GestureArenaFlags.Resolved;
      for (let i = 0; i < recognizers.length; i++) {
        const r = recognizers[i];
        if (r !== null) {
          arena.winner = r;
          r.accepted();
          break;
        }
      }
    }
  }
}

/**
 * Close Arena.
 *
 * @param arena
 */
export function closeArena(): void {
  const recognizers = arena.recognizers;
  let recognizer: GestureRecognizer | null;
  let i;
  arena.flags |= GestureArenaFlags.Closed;

  if (arena.winner !== null) {
    // Arena was captured before closing.
    arena.flags |= GestureArenaFlags.Resolved;
    recognizer = arena.winner;
    for (i = 0; i < recognizers.length; i++) {
      const r = recognizers[i];
      if (r !== null && r !== recognizer) {
        arena.activeRecognizers--;
        r.rejected();
      }
    }
    recognizer.accepted();
  } else if (arena.activeRecognizers === 1) {
    // When there is just one recognizer, it automatically wins.
    arena.flags |= GestureArenaFlags.Resolved;
    for (i = 0; i < recognizers.length; i++) {
      recognizer = recognizers[i];
      if (recognizer !== null) {
        arena.winner = recognizer;
        recognizer.accepted();
        break;
      }
    }
  }
}

/**
 * Sweep Arena.
 *
 * @param event
 */
export function sweepArena(event: GesturePointerEvent): void {
  arena.flags |= GestureArenaFlags.PrimaryPointerReleased;
  if ((arena.flags & (GestureArenaFlags.Held | GestureArenaFlags.Resolved)) === 0) {
    arena.flags |= GestureArenaFlags.Resolved;

    let i = 0;
    let recognizer;

    // First non-null recognizer is accepted.
    while (i < arena.recognizers.length) {
      recognizer = arena.recognizers[i++];
      if (recognizer !== null) {
        arena.winner = recognizer;
        recognizer.accepted();
        recognizer.rejected();
        break;
      }
    }

    // Other recognizers are rejected.
    for (; i < arena.recognizers.length; i++) {
      recognizer = arena.recognizers[i];
      if (recognizer !== null) {
        arena.activeRecognizers--;
        recognizer.rejected();
      }
    }
  }
}

/**
 * Cancel Arena.
 *
 * @param arena
 */
export function cancelArena(): void {
  if (arena.flags & GestureArenaFlags.Resolved) {
    // If it is already resolved, other pointers are already canceled and we just need to cancel the winner.
    arena.winner!.rejected();
  } else {
    arena.flags |= GestureArenaFlags.Resolved;
    for (let i = 0; i < arena.recognizers.length; i++) {
      const recognizer = arena.recognizers[i];
      if (recognizer !== null) {
        recognizer.rejected();
      }
    }
  }
}

export function dispatchMoveEventToRecognizers(event: GesturePointerEvent): void {
  if (arena.winner === null) {
    for (let i = 0; i < arena.recognizers.length; i++) {
      const recognizer = arena.recognizers[i];
      if (recognizer !== null) {
        recognizer.pointerMoved(event);
      }
    }
  } else {
    arena.winner.pointerMoved(event);
  }
}

export function dispatchReleaseEventToRecognizers(event: GesturePointerEvent): void {
  if (arena.winner === null) {
    for (let i = 0; i < arena.recognizers.length; i++) {
      const recognizer = arena.recognizers[i];
      if (recognizer !== null) {
        recognizer.pointerReleased(event);
      }
    }
  } else {
    arena.winner.pointerReleased(event);
  }
}

export function holdArena(): void {
  if ((arena.flags & GestureArenaFlags.PrimaryPointerReleased) === 0) {
    arena.flags |= GestureArenaFlags.Held;
    arena.holdCounter++;
  }
}

export function releaseArena(): void {
  if ((arena.flags & GestureArenaFlags.Held) !== 0) {
    if (--arena.holdCounter === 0) {
      arena.flags &= ~GestureArenaFlags.Held;
      if ((arena.flags & GestureArenaFlags.PrimaryPointerReleased) !== 0) {
        sweepArena(arena.primaryPointer!);
      }
    }
  }
}

/**
 * Native Gesture is accepted.
 */
export function isNativeGestureAccepted(): boolean {
  return (arena.flags & GestureArenaFlags.NativeGestureAccepted) !== 0;
}
