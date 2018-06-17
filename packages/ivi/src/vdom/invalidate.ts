/**
 * Invalidation flags.
 */
export const enum InvalidateFlags {
  /**
   * Forces synchronous update.
   */
  RequestSyncUpdate = 1,
}

/**
 * Invalidate function.
 */
export type InvalidateFunction = (flags?: InvalidateFlags) => void;
