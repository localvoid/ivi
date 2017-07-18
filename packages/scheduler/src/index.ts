export { setSyncMode, isSyncMode } from "./sync_mode";
export { FrameTasksGroup } from "./frame_tasks_group";
export { clock } from "./clock";
export { scheduleMicrotask } from "./microtask";
export { scheduleTask } from "./task";
export { addDOMReader } from "./dom_reader";
export { addAnimation } from "./animation";
export { setUpdateFunction, autofocus, frameStartTime, currentFrame, nextFrame, syncFrameUpdate } from "./frame";
export { addVisibilityObserver, isVisible, removeVisibilityObserver } from "./visibility";

import { setSyncMode } from "./sync_mode";

if (__IVI_DEV__) {
  if (window.__test_hooks__ !== undefined) {
    setSyncMode(true);
    console.info("Scheduler is working in synchronous mode.");
  }
}
