import { RepeatableTaskList, DEV_HOOKS, devModeAddHook } from "ivi-core";
import { requestNextFrame } from "./frame";

const _animations = new RepeatableTaskList();

/**
 * addAnimation adds animation to the RepeatableTaskList.
 *
 * @param animation Animation task.
 */
export function addAnimation(animation: () => boolean | undefined): void {
  _animations.add(animation);
  requestNextFrame();
}

/**
 * executeAnimations execute animations.
 */
export function executeAnimations(): void {
  _animations.run();
}

export function shouldRequestNextFrameForAnimations(): boolean {
  return (_animations.tasks.length > 0);
}

if (__IVI_DEV__) {
  DEV_HOOKS.onAfterTestHook = devModeAddHook(DEV_HOOKS.onAfterTestHook, function () {
    _animations.tasks.length = 0;
  });
}
