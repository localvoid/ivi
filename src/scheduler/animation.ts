/**
 * animations should run only in rAF context(not sync)
 */

import { ComponentFlags } from "../vdom/flags";
import { Component } from "../vdom/component";
import { updateComponent } from "../vdom/implementation";
import { requestNextFrame } from "./frame";

const _animations: Animation[] = [];
const _animatedComponents: Component<any>[] = [];

/**
 * Add component to the animated list.
 *
 * @param component
 */
export function startComponentAnimation(component: Component<any>): void {
    if (__IVI_BROWSER__) {
        requestNextFrame();
        component.flags |= ComponentFlags.Animated | ComponentFlags.InAnimationQueue;
        _animatedComponents.push(component);
    }
}

/**
 * Remove component from the animated list.
 *
 * @param component
 */
export function stopComponentAnimation(component: Component<any>): void {
    if (__IVI_BROWSER__) {
        component.flags |= ComponentFlags.Animated;
    }
}

/**
 * Prepare animated components by marking them dirty.
 */
export function prepareAnimatedComponents(): void {
    if (__IVI_BROWSER__) {
        for (let i = 0; i < _animatedComponents.length; i++) {
            _animatedComponents[i].flags |= ComponentFlags.DirtyState;
        }
    }
}

/**
 * Update animated components.
 *
 * @returns `true` if there are canceled animated components.
 */
export function updateAnimatedComponents(): boolean {
    if (__IVI_BROWSER__) {
        let canceled = false;
        for (let i = 0; i < _animatedComponents.length; i++) {
            const component = _animatedComponents[i];
            if (component.flags & ComponentFlags.Animated) {
                updateComponent(component);
            } else {
                canceled = true;
            }
        }
        return canceled;
    }

    return false;
}

/**
 * Clean canceled animated components.
 */
export function cleanAnimatedComponents(): void {
    if (__IVI_BROWSER__) {
        let j = _animatedComponents.length;

        for (let i = 0; i < j; i++) {
            const component = _animatedComponents[i];
            if (!(component.flags & ComponentFlags.Animated)) {
                component.flags &= ~ComponentFlags.InAnimationQueue;
                if (i === j) {
                    _animatedComponents.pop();
                } else {
                    _animatedComponents[--i] = _animatedComponents.pop() !;
                    j--;
                }
            }
        }
    }
}

/**
 * Animation Flags.
 */
export const enum AnimationFlags {
    /**
     * Animation has been canceled.
     */
    Canceled = 1,
}

/**
 * Animation task.
 */
export class Animation {
    flags: AnimationFlags;
    readonly task: () => void;

    constructor(task: () => void) {
        this.flags = 0;
        this.task = task;
    }

    /**
     * Cancel animation task.
     */
    cancel() {
        this.flags |= AnimationFlags.Canceled;
    }
}

/**
 * Add animation.
 *
 * @param task Animation task.
 * @returns Animation instance.
 */
export function addAnimation(task: () => void): Animation {
    const anim = new Animation(task);
    if (__IVI_BROWSER__) {
        _animations.push(anim);
    }
    return anim;
}

/**
 * Execute animations.
 *
 * @returns `true` if there are canceled animation tasks.
 */
export function executeAnimations(): boolean {
    if (__IVI_BROWSER__) {
        let canceled = false;
        for (let i = 0; i < _animations.length; i++) {
            if (_animations[i].flags & AnimationFlags.Canceled) {
                canceled = true;
            } else {
                _animations[i].task();
            }
        }

        return canceled;
    }

    return false;
}

/**
 * Clean canceled animations.
 */
export function cleanAnimations(): void {
    if (__IVI_BROWSER__) {
        let j = _animations.length;
        for (let i = 0; i < j; i++) {
            if (_animations[i].flags & AnimationFlags.Canceled) {
                if (i === _animations.length) {
                    _animations.pop();
                } else {
                    _animations[--i] = _animations.pop() !;
                    j--;
                }
            }
        }
    }
}

export function shouldRequestNextFrameForAnimations(): boolean {
    if (__IVI_BROWSER__) {
        return (
            (_animatedComponents.length > 0) ||
            (_animations.length > 0)
        );
    }
    return false;
}
