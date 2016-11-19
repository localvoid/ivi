/**
 * Stack trace improvements in Dev Mode.
 *
 * When exception is thrown, their stack traces will be augmented with Components stack trace.
 */
import { DEV_MODE, DevModeFlags, getFunctionName } from "../common/dev_mode";
import { ComponentClass, ComponentFunction, Component } from "./component";

/**
 * Components stack trace from an entry point.
 */
export let STACK_TRACE: Array<ComponentClass<any> | ComponentFunction<any>> | undefined;
/**
 * Component instances stack trace.
 */
export let STACK_TRACE_INSTANCES: Array<Component<any>> | undefined;

/**
 * Push component into stack trace.
 *
 * @param component Component.
 */
export function stackTracePushComponent(component: ComponentClass<any>, instance: Component<any>): void;
export function stackTracePushComponent(component: ComponentFunction<any>): void;
export function stackTracePushComponent(
    component: ComponentClass<any> | ComponentFunction<any>,
    instance?: Component<any>,
): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            if (!STACK_TRACE) {
                STACK_TRACE = [];
            }
            STACK_TRACE.push(component);
            if (instance) {
                if (!STACK_TRACE_INSTANCES) {
                    STACK_TRACE_INSTANCES = [];
                }
                STACK_TRACE_INSTANCES.push(instance);
            }
        }
    }
}

/**
 * Pop component from stack trace.
 */
export function stackTracePopComponent(): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            const c = STACK_TRACE!.pop();
            if ((c as ComponentClass<any>).prototype.render) {
                STACK_TRACE_INSTANCES!.pop();
            }
        }
    }
}

/**
 * Reset stack trace.
 */
export function stackTraceReset(): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            STACK_TRACE = undefined;
            STACK_TRACE_INSTANCES = undefined;
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
    if (STACK_TRACE && (STACK_TRACE.length > 0)) {
        for (let i = 0; i < STACK_TRACE.length; i++) {
            const c = STACK_TRACE[i];
            if (c.prototype.render) {
                result += `\n    [C`;
            } else {
                result += `\n    [F`;
            }
            result += `]${getFunctionName(c)}`;
        }
        result += " <== Entry Point";
        if (STACK_TRACE_INSTANCES && (STACK_TRACE_INSTANCES.length > 0)) {
            let i = STACK_TRACE_INSTANCES[0].owner;
            while (i) {
                result += `\n    [C]${getFunctionName(i.constructor)}`;
                i = i.owner;
            }
        }
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
