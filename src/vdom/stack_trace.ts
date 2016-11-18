/**
 * Stack trace improvements in Dev Mode.
 *
 * When exception is thrown, their stack traces will be augmented with Components stack trace.
 */
import { DEV_MODE, DevModeFlags, getFunctionName } from "../common/dev_mode";
import { ComponentClass, ComponentFunction } from "./component";

/**
 * Components stack trace.
 */
export let STACK_TRACE: Array<ComponentClass<any> | ComponentFunction<any>>;

/**
 * Push component into stack trace.
 *
 * @param component Component.
 */
export function stackTracePushComponent(component: ComponentClass<any> | ComponentFunction<any>): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            if (!STACK_TRACE) {
                STACK_TRACE = [];
            }
            STACK_TRACE.push(component);
        }
    }
}

/**
 * Pop component from stack trace.
 */
export function stackTracePopComponent(): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            STACK_TRACE.pop();
        }
    }
}

/**
 * Reset stack trace.
 */
export function stackTraceReset(): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            STACK_TRACE = [];
        }
    }
}

/**
 * Print current Components stack trace.
 *
 * @returns Stack trace.
 */
function stackTraceToString(): string {
    let result = "";
    for (let i = 0; i < STACK_TRACE.length; i++) {
        const c = STACK_TRACE[i];
        result += `\n    [${c.prototype.render ? "C" : "F"}]${getFunctionName(c)}`;
    }
    return result;
}

/**
 * Augment `Error` stack trace with Components stack trace.
 *
 * @param e Error instance.
 */
export function stackTraceAugment(e: Error): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            if (e.stack) {
                e.stack += "\nComponents stack trace:" + stackTraceToString();
            }
        }
    }
}
