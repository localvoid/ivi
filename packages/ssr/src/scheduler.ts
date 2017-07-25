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
export const addVisibilityObserver: (observer: (hidden: boolean) => void) => void = NOOP_TASK;
export const removeVisibilityObserver: (observer: (hidden: boolean) => void) => void = NOOP_TASK;
export const requestNextFrame: () => void = NOOP;
export const triggerNextFrame: () => void = NOOP;
export const nextFrameUpdate: () => void = NOOP;
export const currentFrameUpdate: () => void = NOOP;
export const nextFrameWrite: (task: () => void) => void = NOOP_TASK;
export const currentFrameWrite: (task: () => void) => void = NOOP_TASK;
export const nextFrameRead: (task: () => void) => void = NOOP_TASK;
export const currentFrameRead: (task: () => void) => void = NOOP_TASK;
export const nextFrameAfter: (task: () => void) => void = NOOP_TASK;
export const currentFrameAfter: (task: () => void) => void = NOOP_TASK;

export function isHidden(): boolean {
  // Always visible on server.
  return false;
}

/**
 * autofocus sets autofocus on element.
 *
 * @param element Element.
 */
export function autofocus(element: Element): void {
  // Ignore autofocusing on server.
}

/**
 * currentFrameStartTime returns current frame start time.
 *
 * @returns current frame start time.
 */
export function currentFrameStartTime(): number {
  return 0;
}
