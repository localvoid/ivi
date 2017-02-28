/**
 * Development Mode Hooks for extensions.
 */

import { Component } from "../vdom/component";

export type OnErrorHook = (error: Error) => void;

export type OnComponentCreatedHook = (instance: Component<any>) => void;

export type OnComponentDisposedHook = (instance: Component<any>) => void;

export interface DevModeHooks {
    /**
     * onError hook is invoked when unhandled exception is thrown.
     */
    onError: OnErrorHook[] | null;
    /**
     * onComponentCreated is invoked when stateful component is instantiated.
     */
    onComponentCreated: OnComponentCreatedHook[] | null;
    /**
     * onComponentDisposed is invoked when stateful component is disposed.
     */
    onComponentDisposed: OnComponentDisposedHook[] | null;
}

export let DEV_HOOKS: DevModeHooks;

if (__IVI_DEV__) {
    DEV_HOOKS = {
        onError: null,
        onComponentCreated: null,
        onComponentDisposed: null,
    };
}

export function devModeOnError(e: Error): void {
    if (__IVI_DEV__) {
        if (DEV_HOOKS.onError) {
            for (const hook of DEV_HOOKS.onError) {
                hook(e);
            }
        }
    }
}

export function devModeOnComponentCreated(instance: Component<any>): void {
    if (__IVI_DEV__) {
        if (DEV_HOOKS.onComponentCreated) {
            for (const hook of DEV_HOOKS.onComponentCreated) {
                hook(instance);
            }
        }
    }
}

export function devModeOnComponentDisposed(instance: Component<any>): void {
    if (__IVI_DEV__) {
        if (DEV_HOOKS.onComponentDisposed) {
            for (const hook of DEV_HOOKS.onComponentDisposed) {
                hook(instance);
            }
        }
    }
}
