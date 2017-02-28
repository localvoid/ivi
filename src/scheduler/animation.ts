import { ComponentFlags } from "../vdom/flags";
import { Component } from "../vdom/component";
import { requestNextFrame } from "./frame";

const _animations: (() => boolean | undefined)[] = [];
let _animatedComponents = 0;

/**
 * Add component to the animated list.
 *
 * @param component
 */
export function startComponentAnimation(component: Component<any>): void {
    if (__IVI_BROWSER__) {
        if (!_animatedComponents) {
            requestNextFrame();
        }
        component.flags |= ComponentFlags.Animated;
        _animatedComponents++;
    }
}

/**
 * Remove component from the animated list.
 *
 * @param component
 */
export function stopComponentAnimation(component: Component<any>): void {
    if (__IVI_BROWSER__) {
        component.flags &= ~ComponentFlags.Animated;
        _animatedComponents--;
    }
}

/**
 * Add animation.
 *
 * @param animation Animation task.
 */
export function addAnimation(animation: () => boolean | undefined): void {
    if (__IVI_BROWSER__) {
        _animations.push(animation);
    }
}

/**
 * Execute animations.
 */
export function executeAnimations(): void {
    if (__IVI_BROWSER__) {
        for (let i = 0; i < _animations.length; i++) {
            const animation = _animations[i];
            if (animation()) {
                if (i === _animations.length) {
                    _animations.pop();
                } else {
                    _animations[i--] = _animations.pop()!;
                }
            }
        }
    }
}

export function shouldRequestNextFrameForAnimations(): boolean {
    if (__IVI_BROWSER__) {
        return (
            (_animatedComponents > 0) ||
            (_animations.length > 0)
        );
    }
    return false;
}
