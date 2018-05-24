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
import { GestureRecognizer } from "./gesture_recognizer";

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
export interface GestureArena {
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
}

/**
 * List of arenas that have an active pointer.
 */
export const GESTURE_ARENA: GestureArena = {
  flags: 0,
  primaryPointer: null,
  holdCounter: 0,
  activeRecognizers: 0,
  recognizers: [],
  winner: null,
};

/**
 * Add Recognizer to Arena.
 *
 * @param recognizer
 */
export function addRecognizerToArena(recognizer: GestureRecognizer): void {
  GESTURE_ARENA.recognizers.push(recognizer);
  ++GESTURE_ARENA.activeRecognizers;
}

/**
 * Accept Gesture Recognizer.
 *
 * Arena will be resolved only when arena is closed.
 *
 * @param recognizer - Gesture recognizer
 */
export function acceptGestureRecognizer(recognizer: GestureRecognizer): void {
  if ((GESTURE_ARENA.flags & GestureArenaFlags.Resolved) === 0) {
    if (GESTURE_ARENA.winner === null) {
      GESTURE_ARENA.winner = recognizer;

      // Wait until arena is closed before resolving to make sure that other members receive cancel event.
      if ((GESTURE_ARENA.flags & GestureArenaFlags.Closed) !== 0) {
        GESTURE_ARENA.flags |= GestureArenaFlags.Resolved;

        for (let i = 0; i < GESTURE_ARENA.recognizers.length; ++i) {
          const r = GESTURE_ARENA.recognizers[i];
          if (r !== null && r !== recognizer) {
            GESTURE_ARENA.activeRecognizers--;
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
 * @param recognizer - Gesture recognizer
 */
export function rejectGestureRecognizer(recognizer: GestureRecognizer): void {
  const recognizers = GESTURE_ARENA.recognizers;

  GESTURE_ARENA.activeRecognizers--;
  if (GESTURE_ARENA.winner !== recognizer) {
    recognizers[recognizers.indexOf(recognizer)] = null;
  }
  recognizer.rejected();

  if ((GESTURE_ARENA.flags & GestureArenaFlags.Resolved) === 0) {
    if (GESTURE_ARENA.activeRecognizers === 1 && (GESTURE_ARENA.flags & GestureArenaFlags.Closed) !== 0) {
      GESTURE_ARENA.flags |= GestureArenaFlags.Resolved;
      for (let i = 0; i < recognizers.length; ++i) {
        const r = recognizers[i];
        if (r !== null) {
          GESTURE_ARENA.winner = r;
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
  const recognizers = GESTURE_ARENA.recognizers;
  let recognizer: GestureRecognizer | null;
  let i;
  GESTURE_ARENA.flags |= GestureArenaFlags.Closed;

  if (GESTURE_ARENA.winner !== null) {
    // Arena was captured before closing.
    GESTURE_ARENA.flags |= GestureArenaFlags.Resolved;
    recognizer = GESTURE_ARENA.winner;
    for (i = 0; i < recognizers.length; ++i) {
      const r = recognizers[i];
      if (r !== null && r !== recognizer) {
        GESTURE_ARENA.activeRecognizers--;
        r.rejected();
      }
    }
    recognizer.accepted();
  } else if (GESTURE_ARENA.activeRecognizers === 1) {
    // When there is just one recognizer, it automatically wins.
    GESTURE_ARENA.flags |= GestureArenaFlags.Resolved;
    for (i = 0; i < recognizers.length; ++i) {
      recognizer = recognizers[i];
      if (recognizer !== null) {
        GESTURE_ARENA.winner = recognizer;
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
  GESTURE_ARENA.flags |= GestureArenaFlags.PrimaryPointerReleased;
  if ((GESTURE_ARENA.flags & (GestureArenaFlags.Held | GestureArenaFlags.Resolved)) === 0) {
    GESTURE_ARENA.flags |= GestureArenaFlags.Resolved;

    let i = 0;
    let recognizer;

    // First non-null recognizer is accepted.
    for (; i < GESTURE_ARENA.recognizers.length; ++i) {
      recognizer = GESTURE_ARENA.recognizers[i];
      if (recognizer !== null) {
        GESTURE_ARENA.winner = recognizer;
        recognizer.accepted();
        break;
      }
    }

    // Other recognizers are rejected.
    for (; i < GESTURE_ARENA.recognizers.length; ++i) {
      recognizer = GESTURE_ARENA.recognizers[i];
      if (recognizer !== null) {
        --GESTURE_ARENA.activeRecognizers;
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
  if (GESTURE_ARENA.flags & GestureArenaFlags.Resolved) {
    // If it is already resolved, other pointers are already canceled and we just need to cancel the winner.
    GESTURE_ARENA.winner!.rejected();
  } else {
    GESTURE_ARENA.flags |= GestureArenaFlags.Resolved;
    for (const recognizer of GESTURE_ARENA.recognizers) {
      if (recognizer !== null) {
        recognizer.rejected();
      }
    }
  }
}

export function dispatchEventToRecognizers(event: GesturePointerEvent): void {
  if (GESTURE_ARENA.winner === null) {
    for (const recognizer of GESTURE_ARENA.recognizers) {
      if (recognizer !== null) {
        recognizer.handleEvent(event);
      }
    }
  } else {
    GESTURE_ARENA.winner.handleEvent(event);
  }
}

export function holdArena(): void {
  if ((GESTURE_ARENA.flags & GestureArenaFlags.PrimaryPointerReleased) === 0) {
    GESTURE_ARENA.flags |= GestureArenaFlags.Held;
    ++GESTURE_ARENA.holdCounter;
  }
}

export function releaseArena(): void {
  if ((GESTURE_ARENA.flags & GestureArenaFlags.Held) !== 0) {
    if (--GESTURE_ARENA.holdCounter === 0) {
      GESTURE_ARENA.flags &= ~GestureArenaFlags.Held;
      if ((GESTURE_ARENA.flags & GestureArenaFlags.PrimaryPointerReleased) !== 0) {
        sweepArena(GESTURE_ARENA.primaryPointer!);
      }
    }
  }
}
