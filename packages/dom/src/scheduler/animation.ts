import { RepeatableTaskList } from "ivi-core";
import { requestNextFrame } from "./frame";

const _animations = new RepeatableTaskList();

/**
 * Add animation.
 *
 * @param animation Animation task.
 */
export function addAnimation(animation: () => boolean | undefined): void {
    if (__IVI_BROWSER__) {
        _animations.add(animation);
        requestNextFrame();
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
            (_animations.tasks.length > 0)
        );
    }
    return false;
}
