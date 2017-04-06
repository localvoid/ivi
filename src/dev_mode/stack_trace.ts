/**
 * Stack trace improvements in Dev Mode.
 *
 * When exception is thrown, their stack traces will be augmented with Components stack trace.
 */
import { DEV_MODE, DevModeFlags, getFunctionName } from "./dev_mode";
import { Context } from "../common/types";
import { ComponentClass, ComponentFunction, Component } from "../vdom/component";
import { IVNode } from "../vdom/ivnode";
import { VNodeFlags } from "../vdom/flags";
import { ConnectDescriptor } from "../vdom/connect_descriptor";
import { KeepAliveHandler } from "../vdom/keep_alive";

declare global {
    /**
     * V8 Stack Trace CallSite.
     *
     * https://github.com/v8/v8/wiki/Stack-Trace-API
     */
    interface CallSite {
        /**
         * Returns the value of this.
         *
         * To maintain restrictions imposed on strict mode functions, frames that have a strict mode function and all
         * frames below (its caller etc.) are not allow to access their receiver and function objects. For those frames,
         * getFunction() and getThis() will return undefined.
         */
        getThis(): any;
        /**
         * Returns the type of this as a string. This is the name of the function stored in the constructor field of
         * this, if available, otherwise the object's [[Class]] internal property.
         */
        getTypeName(): string;
        /**
         * Returns the current function.
         *
         * To maintain restrictions imposed on strict mode functions, frames that have a strict mode function and all
         * frames below (its caller etc.) are not allow to access their receiver and function objects. For those frames,
         * getFunction() and getThis() will return undefined.
         */
        getFunction(): Function | undefined;
        /**
         * Returns the name of the current function, typically its name property. If a name property is not available an
         * attempt will be made to try to infer a name from the function's context.
         */
        getFunctionName(): string | null;
        /**
         * Returns the name of the property of this or one of its prototypes that holds the current function.
         */
        getMethodName(): string | null;
        /**
         * If this function was defined in a script returns the name of the script.
         */
        getFileName(): string;
        /**
         * If this function was defined in a script returns the current line number.
         */
        getLineNumber(): number;
        /**
         * If this function was defined in a script returns the current column number.
         */
        getColumnNumber(): number;
        /**
         * If this function was created using a call to eval returns a CallSite object representing the location where
         * eval was called.
         */
        getEvalOrigin(): CallSite | string;
        /**
         * Is this a toplevel invocation, that is, is this the global object?
         */
        isToplevel(): boolean;
        /**
         * Does this call take place in code defined by a call to eval?
         */
        isEval(): boolean;
        /**
         * Is this call in native V8 code?
         */
        isNative(): boolean;
        /**
         * Is this a constructor call?
         */
        isConstructor(): boolean;
    }

    interface ErrorConstructor {
        captureStackTrace(e: any, constructorOpt: any): any;
        prepareStackTrace(e: any, callSites: CallSite[]): any;
    }
}

function _extractCallSitesFromStackTrace(e: any, callSites: CallSite[]): CallSite[] {
    return callSites;
}

/**
 * Get current call sites in browsers that support `prepareStackTrace` and `captureStackTrace` API.
 *
 * @returns CallSite array or undefined.
 */
export function callSites(): CallSite[] | undefined {
    if (__IVI_DEV__) {
        if ((DEV_MODE & DevModeFlags.CaptureStackTraceSupported) !== 0) {
            const e = {} as { stack: CallSite[] };
            const prepare = Error.prepareStackTrace;
            Error.prepareStackTrace = _extractCallSitesFromStackTrace;
            Error.captureStackTrace(e, callSites);
            Error.prepareStackTrace = prepare;
            return e.stack;
        }
    }
    return;
}

export const enum ComponentStackFrameType {
    Component = 0,
    ComponentFunction = 1,
    Connect = 2,
    UpdateContext = 3,
    KeepAlive = 4,
}

export interface ComponentStackTraceFrame {
    type: ComponentStackFrameType;
    tag: ComponentClass<any> | ComponentFunction<any> | ConnectDescriptor<any, any, any> | KeepAliveHandler | undefined;
    instance: Component<any> | Context | undefined;
}

/**
 * Components stack trace from an entry point.
 */
export let STACK_TRACE: Array<ComponentStackTraceFrame>;
let STACK_TRACE_DEPTH: number;

if (__IVI_DEV__) {
    STACK_TRACE = [];
    STACK_TRACE_DEPTH = 0;
}

/**
 * Push component into stack trace.
 *
 * @param vnode VNode.
 */
export function stackTracePushComponent(vnode: IVNode<any>, instance?: Component<any> | Context): void {
    if (__IVI_DEV__) {
        if ((DEV_MODE & DevModeFlags.DisableStackTraceAugmentation) === 0) {
            const flags = vnode._flags;
            let type;
            let tag = vnode._tag as ComponentClass<any> | ComponentFunction<any> | ConnectDescriptor<any, any, any> |
                KeepAliveHandler;

            if ((flags & VNodeFlags.ComponentClass) !== 0) {
                type = ComponentStackFrameType.Component;
                if (instance === undefined) {
                    instance = vnode._instance as Component<any> | Context;
                }
            } else {
                if ((flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext | VNodeFlags.KeepAlive)) !== 0) {
                    if ((flags & VNodeFlags.Connect) !== 0) {
                        type = ComponentStackFrameType.Connect;
                    } else if ((flags & VNodeFlags.UpdateContext) !== 0) {
                        type = ComponentStackFrameType.UpdateContext;
                        if (instance === undefined) {
                            instance = vnode._props as Context;
                        }
                    } else {
                        type = ComponentStackFrameType.KeepAlive;
                    }
                } else {
                    type = ComponentStackFrameType.ComponentFunction;
                }
            }

            if (STACK_TRACE_DEPTH >= STACK_TRACE.length) {
                STACK_TRACE.push({
                    type: type,
                    tag: tag,
                    instance: instance,
                });
            } else {
                const frame = STACK_TRACE[STACK_TRACE_DEPTH];
                frame.type = type;
                frame.tag = tag;
                frame.instance = instance;
            }
            STACK_TRACE_DEPTH++;
        }
    }
}

/**
 * Pop component from stack trace.
 */
export function stackTracePopComponent(): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            const frame = STACK_TRACE[--STACK_TRACE_DEPTH];
            frame.tag = undefined;
            frame.instance = undefined;
        }
    }
}

/**
 * Reset stack trace.
 */
export function stackTraceReset(): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableStackTraceAugmentation)) {
            for (let i = 0; i < STACK_TRACE_DEPTH; i++) {
                const frame = STACK_TRACE[i];
                frame.tag = undefined;
                frame.instance = undefined;
            }
            STACK_TRACE_DEPTH = 0;
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

    if (STACK_TRACE_DEPTH) {
        for (let i = 0; i < STACK_TRACE_DEPTH; i++) {
            const frame = STACK_TRACE[i];
            result += "\n  ";
            switch (frame.type) {
                case ComponentStackFrameType.Component:
                    const cls = frame.tag as ComponentClass<any>;
                    const instance = frame.instance as Component<any>;
                    result += `[C]${getFunctionName(cls)} #${instance._debugId}`;
                    break;
                case ComponentStackFrameType.ComponentFunction:
                    const fn = frame.tag as ComponentFunction<any>;
                    result += `[F]${getFunctionName(fn)}`;
                    break;
                case ComponentStackFrameType.Connect:
                    const d = frame.tag as ConnectDescriptor<any, any, any>;
                    result += `[+]${getFunctionName(d.select)} => ${getFunctionName(d.render)}`;
                    break;
                case ComponentStackFrameType.UpdateContext:
                    const context = frame.instance as Context;
                    result += `[^]${Object.keys(context)}`;
                    break;
                case ComponentStackFrameType.KeepAlive:
                    const handler = frame.tag as KeepAliveHandler;
                    result += `[K]${getFunctionName(handler)}`;
                    break;
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
 * Prints current component stack trace to the console.
 */
export function printComponentStackTrace(): void {
    if (__IVI_DEV__) {
        if (__IVI_BROWSER__) {
            if (STACK_TRACE_DEPTH) {
                console.groupCollapsed("Component Stack Trace:");
                for (let i = 0; i < STACK_TRACE_DEPTH; i++) {
                    const frame = STACK_TRACE[i];
                    switch (frame.type) {
                        case ComponentStackFrameType.Component:
                            const cls = frame.tag as ComponentClass<any>;
                            const instance = frame.instance as Component<any>;
                            console.groupCollapsed(`[C]${getFunctionName(cls)} #${instance._debugId}`);
                            console.log(instance);
                            console.groupEnd();
                            break;
                        case ComponentStackFrameType.ComponentFunction:
                            const fn = frame.tag as ComponentFunction<any>;
                            console.log(`[F]${getFunctionName(fn)}`);
                            break;
                        case ComponentStackFrameType.Connect:
                            const d = frame.tag as ConnectDescriptor<any, any, any>;
                            console.log(`[*]${getFunctionName(d.select)} => ${getFunctionName(d.render)}`);
                            break;
                        case ComponentStackFrameType.UpdateContext:
                            const context = frame.instance as Context;
                            console.groupCollapsed(`[+]${Object.keys(context)}`);
                            console.log(context);
                            console.groupEnd();
                            break;
                    }
                }
                console.groupEnd();
            }
        }
    }
}
