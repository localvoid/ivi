/**
 * Development Mode Hooks for extensions.
 */

import { Component } from "../vdom/component";

export type OnErrorHook = (error: Error) => void;

export type OnComponentCreatedHook = (instance: Component<any>) => void;

export type OnComponentDisposedHook = (instance: Component<any>) => void;

export interface DevModeHooks {
    onError: OnErrorHook[] | null;
    onComponentCreated: OnComponentCreatedHook[] | null;
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
            for (let i = 0; i < DEV_HOOKS.onError.length; i++) {
                DEV_HOOKS.onError[i](e);
            }
        }
    }
}

export function devModeOnComponentCreated(instance: Component<any>): void {
    if (__IVI_DEV__) {
        if (DEV_HOOKS.onComponentCreated) {
            for (let i = 0; i < DEV_HOOKS.onComponentCreated.length; i++) {
                DEV_HOOKS.onComponentCreated[i](instance);
            }
        }
    }
}

export function devModeOnComponentDisposed(instance: Component<any>): void {
    if (__IVI_DEV__) {
        if (DEV_HOOKS.onComponentDisposed) {
            for (let i = 0; i < DEV_HOOKS.onComponentDisposed.length; i++) {
                DEV_HOOKS.onComponentDisposed[i](instance);
            }
        }
    }
}
