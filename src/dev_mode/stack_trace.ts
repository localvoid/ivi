/**
 * Stack trace improvements in Dev Mode.
 *
 * When exception is thrown, their stack traces will be augmented with Components stack trace.
 */
import { DEV_MODE, DevModeFlags, getFunctionName } from "./dev_mode";
import { ComponentClass, ComponentFunction, Component } from "../vdom/component";

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

export interface ComponentStackTraceFrame {
    type: "F" | "C";
    name: string;
    debugId: number | null;
    instance: Component<any> | null;
    entry: boolean;
}

/**
 * Build current stack trace.
 *
 * @returns Current component stack.
 */
export function componentStackTrace(): ComponentStackTraceFrame[] | null {
    if (__IVI_DEV__) {
        if (STACK_TRACE && (STACK_TRACE.length > 0)) {
            const result: ComponentStackTraceFrame[] = [];

            let j = STACK_TRACE_INSTANCES ? STACK_TRACE_INSTANCES.length - 1 : 0;
            for (let i = STACK_TRACE.length - 1; i >= 0; i--) {
                const c = STACK_TRACE[i];
                if (c.prototype.render) {
                    result.push({
                        type: "F",
                        name: getFunctionName(c),
                        debugId: null,
                        instance: null,
                        entry: i === 0,
                    });
                } else {
                    const instance = STACK_TRACE_INSTANCES![j--];
                    result.push({
                        type: "C",
                        name: getFunctionName(c),
                        debugId: instance._debugId,
                        instance: instance,
                        entry: i === 0,
                    });
                }
            }
            if (STACK_TRACE_INSTANCES && (STACK_TRACE_INSTANCES.length > 0)) {
                let c: Component<any> | undefined = STACK_TRACE_INSTANCES[0];
                if (STACK_TRACE[0].prototype.render) {
                    if (c._stackTrace) {
                        for (let i = c._stackTrace.length - 1; i >= 0; i--) {
                            result.push({
                                type: "F",
                                name: getFunctionName(c._stackTrace[i]),
                                debugId: null,
                                instance: null,
                                entry: false,
                            });
                        }
                    }
                }
                c = c.owner;
                while (c) {
                    result.push({
                        type: "C",
                        name: getFunctionName(c.constructor),
                        debugId: c._debugId,
                        instance: c,
                        entry: false,
                    });

                    if (c._stackTrace) {
                        for (let i = c._stackTrace.length - 1; i >= 0; i--) {
                            result.push({
                                type: "F",
                                name: getFunctionName(c._stackTrace[i]),
                                debugId: null,
                                instance: null,
                                entry: false,
                            });
                        }
                    }
                }
            }
            return result;
        }
    }

    return null;
}

/**
 * Print current Components stack trace.
 *
 * @returns Stack trace.
 */
function stackTraceToString(): string {
    let result = "";
    const components = componentStackTrace();

    if (components) {
        for (let i = 0; i < components.length; i++) {
            const component = components[i];
            result += "\n";
            if (component.entry) {
                result += " => ";
            } else {
                result += "    ";
            }
            if (component.type === "F") {
                result += `[F]${component.name}`;
            } else {
                result += `[C]${component.name} #${component.debugId}`;
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
                e.stack += "\n\nComponents stack trace:" + stackTraceToString();
            }
        }
    }
}

/**
 * It goes through current stack trace and finds all parent functional components. It will stop immediately when it
 * finds a stateful component on the stack.
 *
 * Because functional components doesn't have any instances, we can't have any other way to find out parent component
 * functions when execution was started deep in the components tree. So we just store this information when we
 * instantiate components.
 *
 * @returns Functional Component stack trace.
 */
export function getFunctionalComponentStackTrace(): ComponentFunction<any>[] | null {
    if (__IVI_DEV__) {
        let result: ComponentFunction<any>[] | null = null;
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            if (STACK_TRACE) {
                for (let i = STACK_TRACE.length - 1; i >= 0; i--) {
                    const c = STACK_TRACE[i];
                    if (!c.prototype.render) {
                        if (!result) {
                            result = [];
                        }
                        result.push(c as ComponentFunction<any>);
                    }
                }
            }
        }

        return result;
    }

    return null;
}

/**
 * Prints current component stack trace to the console.
 */
export function printComponentStackTrace(): void {
    if (__IVI_DEV__) {
        if (__IVI_BROWSER__) {
            const components = componentStackTrace();
            if (components) {
                console.groupCollapsed("Component Stack Trace:");
                for (let i = 0; i < components.length; i++) {
                    const component = components[i];
                    let prefix;
                    if (component.entry) {
                        prefix = " => ";
                    } else {
                        prefix = "    ";
                    }
                    if (component.type === "F") {
                        console.log(`${prefix}[F]${component.name}`);
                    } else {
                        console.groupCollapsed(`${prefix}[C]${component.name} #${component.debugId}`);
                        console.log(component.instance);
                        console.groupEnd();
                    }
                }
                console.groupEnd();
            }
        }
    }
}
