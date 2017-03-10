/**
 * Development Mode Hooks for extensions.
 */

import { Component } from "../vdom/component";
import { IVNode } from "../vdom/ivnode";

export type OnErrorHook = (error: Error) => void;

export type OnElementBeforeCreateHook = (vnode: IVNode<any>) => void;

export type OnElementCreatedHook = (vnode: IVNode<any>, element: Element) => void;

export type OnComponentCreatedHook = (instance: Component<any>) => void;

export type OnComponentDisposedHook = (instance: Component<any>) => void;

export interface DevModeHooks {
    /**
     * onError hook is invoked when unhandled exception is thrown.
     */
    onError: OnErrorHook[] | null;
    /**
     * OnElementBeforeCreate hook is invoked before Element is created.
     */
    onElementBeforeCreate: OnElementBeforeCreateHook[] | null;
    /**
     * OnElementCreated hook is invoked when Element is created.
     */
    onElementCreated: OnElementCreatedHook[] | null;
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
        onElementBeforeCreate: null,
        onElementCreated: null,
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

export function devModeOnElementBeforeCreate(vnode: IVNode<any>): void {
    if (__IVI_DEV__) {
        if (DEV_HOOKS.onElementBeforeCreate) {
            for (const hook of DEV_HOOKS.onElementBeforeCreate) {
                hook(vnode);
            }
        }
    }
}

export function devModeOnElementCreated(vnode: IVNode<any>, element: Element): void {
    if (__IVI_DEV__) {
        if (DEV_HOOKS.onElementCreated) {
            for (const hook of DEV_HOOKS.onElementCreated) {
                hook(vnode, element);
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
