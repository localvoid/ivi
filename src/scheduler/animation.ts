import { RepeatableTaskList } from "../common/repeatable_task_list";
import { ComponentFlags } from "../vdom/flags";
import { Component } from "../vdom/component";
import { requestNextFrame } from "./frame";

const _animations = new RepeatableTaskList();
let _animatedComponents = 0;

/**
 * Add component to the animated list.
 *
 * @param component
 */
export function startComponentAnimation(component: Component<any>): void {
    if (__IVI_BROWSER__) {
        if (_animatedComponents === 0) {
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
        _animations.add(animation);
    }
}

/**
 * Execute animations.
 */
export function executeAnimations(): void {
    if (__IVI_BROWSER__) {
        _animations.run();
    }
}

export function shouldRequestNextFrameForAnimations(): boolean {
    if (__IVI_BROWSER__) {
        return (
            (_animatedComponents > 0) ||
            (_animations.tasks.length > 0)
        );
    }
    return false;
}
