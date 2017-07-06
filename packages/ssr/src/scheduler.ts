import { NOOP } from "ivi-core";

/**
 * clock returns monotonically increasing clock value.
 *
 * @returns current clock value.
 */
export function clock() {
  // Always 0 on server.
  return 0;
}

/**
 * Frame tasks group contains tasks for updating components, read dom and write dom tasks, and tasks that should be
 * executed after all other tasks are finished.
 *
 * To get access to the frame tasks group, use: `currentFrame()` and `nextFrame()` scheduler methods.
 *
 *     scheduler.currentFrame().read(() => {
 *         console.log(element.clientWidth);
 *     });
 *
 * @final
 */
export interface FrameTasksGroup {
  /**
   * update marks frame for update.
   *
   * @param component
   */
  update(): void;
  /**
   * write adds new task to the write DOM task queue.
   *
   * @param task Write task.
   */
  write(task: () => void): void;

  /**
   * write adds new task to the read DOM task queue.
   *
   * @param task Read task.
   */
  read(task: () => void): void;

  /**
   * after adds new task to the task queue that will execute tasks when all DOM tasks are finished.
   *
   * @param task After task.
   */
  after(task: () => void): void;
}

/**
 * NOOP_TASK ignores tasks on server.
 *
 * @param task Any task.
 */
function NOOP_TASK(task: (() => void) | ((visible: boolean) => void) | (() => boolean | undefined)): void {
  // Ignore tasks on server.
}

export const scheduleMicrotask: (task: () => void) => void = NOOP_TASK;
export const scheduleTask: (task: () => void) => void = NOOP_TASK;
export const addDOMReader: (task: () => boolean | undefined) => void = NOOP_TASK;
export const addAnimation: (task: () => boolean | undefined) => void = NOOP_TASK;
export const addVisibilityObserver: (task: (visible: boolean) => void) => void = NOOP_TASK;
export const removeVisibilityObserver: (task: (visible: boolean) => void) => void = NOOP_TASK;

export function isVisible(): boolean {
  // Always visible on server.
  return true;
}

const frame: FrameTasksGroup = {
  update: NOOP,
  write: NOOP_TASK,
  read: NOOP_TASK,
  after: NOOP_TASK,
};

/**
 * autofocus sets autofocus on element.
 *
 * @param element Element.
 */
export function autofocus(element: Element): void {
  // Ignore autofocusing on server.
}

/**
 * frameStartTime returns current frame start time.
 *
 * @returns current frame start time.
 */
export function frameStartTime(): number {
  return 0;
}

/**
 * nextFrame returns task list for the next frame.
 *
 * @returns Frame tasks group.
 */
export function nextFrame(): FrameTasksGroup {
  return frame;
}

/**
 * currentFrame returns task list for the current frame.
 *
 * @returns Frame tasks group.
 */
export function currentFrame(): FrameTasksGroup {
  return frame;
}
