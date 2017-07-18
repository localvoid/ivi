import { RepeatableTaskList, DEV_HOOKS, devModeAddHook } from "ivi-core";
import { isSyncMode } from "./sync_mode";
import { requestNextFrame } from "./frame";

const _animations = new RepeatableTaskList();

/**
 * addAnimation adds animation to the RepeatableTaskList.
 *
 * @param animation Animation task.
 */
export function addAnimation(animation: () => boolean | undefined): void {
  _animations.add(animation);
  if (__IVI_DEV__) {
    if (isSyncMode()) {
      return;
    }
  }
  requestNextFrame();
}

/**
 * executeAnimations execute animations.
 */
export function executeAnimations(): void {
  _animations.run();
}

export function shouldRequestNextFrameForAnimations(): boolean {
  if (__IVI_DEV__) {
    if (isSyncMode()) {
      return false;
    }
  }
  return (_animations.tasks.length > 0);
}

if (__IVI_DEV__) {
  DEV_HOOKS.onAfterTestHook = devModeAddHook(DEV_HOOKS.onAfterTestHook, function () {
    _animations.tasks.length = 0;
  });
}
