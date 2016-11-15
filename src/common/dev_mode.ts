/**
 * Development Mode.
 *
 * Development Mode is enabled when global variable `__IVI_DEV__` is `true`.
 */

/**
 * Dev Mode Flags.
 *
 * `setDevModeFlags` function is used to set Dev Mode flags.
 */
export const enum DevModeFlags {
    /**
     * Disable Nesting Validation.
     */
    DisableNestingValidation = 1,
    /**
     * Disable Stack Trace Augmentation.
     */
    DisableStackTraceAugmentation = 1 << 1,
    /**
     * Disable Screen of Death.
     */
    DisableScreenOfDeath = 1 << 2,
    /**
     * Disable global `window.addEventListener("error", ...)` error handler.
     */
    DisableScreenOfDeathGlobalErrorHandling = 1 << 3,
}

/**
 * Dev Mode Flags. See `DevModeFlags` for details.
 */
export let DEV_MODE: DevModeFlags = 0;

export function setDevModeFlags(flags: DevModeFlags): void {
    DEV_MODE |= flags;
}

/**
 * Print error to the console and throw local exception.
 *
 * Local exception is thrown so that we can break on caught errors.
 *
 * @param message Error message.
 */
export function printError(message: string): void {
    console.error(message);
    try {
        throw new Error(message);
    } catch (_) {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }
}
