import { NOOP } from "ivi-core";
import { isVisible, addVisibilityObserver } from "./visibility";
import { FrameTasksGroupFlags, FrameTasksGroup } from "./frame_tasks_group";
import { executeDOMReaders } from "./dom_reader";
import { incrementClock } from "./clock";
import { scheduleMicrotask } from "./microtask";
import { executeAnimations, shouldRequestNextFrameForAnimations } from "./animation";

let _update: () => void = NOOP;
let _pending = false;
let _currentFrameReady = false;
let _currentFrame = new FrameTasksGroup();
let _nextFrame = new FrameTasksGroup();
let _frameStartTime = 0;
let _autofocusedElement: Element | null = null;

_currentFrame._rwLock();

function _updateFrameStartTime(time?: number): void {
  _frameStartTime = (time === undefined ? performance.now() : time) / 1000;
}

export function autofocus(element: Element): void {
  _autofocusedElement = element;
}

export function setUpdateFunction(update: () => void): void {
  _update = update;
}

/**
 * frameStartTime returns current frame start time.
 *
 * @returns current frame start time.
 */
export function frameStartTime(): number {
  return _frameStartTime;
}

_updateFrameStartTime();

function _requestNextFrame(): void {
  if (_pending === true) {
    requestAnimationFrame(handleNextFrame);
  }
}

/**
 * requestNextFrame triggers next frame tasks execution.
 */
export function requestNextFrame(): void {
  if (_pending === false) {
    _pending = true;
    scheduleMicrotask(_requestNextFrame);
  }
}

/**
 * Frame tasks scheduler event handler.
 *
 * @param t Current time.
 */
function handleNextFrame(time?: number): void {
  _updateFrameStartTime(time);

  let tasks: (() => void)[];
  let i: number;

  _pending = false;
  _currentFrameReady = true;

  const frame = _nextFrame;
  _nextFrame = _currentFrame;
  _currentFrame = frame;

  _currentFrame._rwUnlock();
  _nextFrame._rwUnlock();

  executeDOMReaders();

  // Perform read/write batching. Start with executing read DOM tasks, then update components, execute write DOM tasks
  // and repeat until all read and write tasks are executed.
  do {
    while (frame._flags & FrameTasksGroupFlags.Read) {
      frame._flags &= ~FrameTasksGroupFlags.Read;
      tasks = frame._read!;
      frame._read = null;

      for (i = 0; i < tasks.length; i++) {
        tasks[i]();
      }
    }

    while (frame._flags & (FrameTasksGroupFlags.Update | FrameTasksGroupFlags.Write)) {
      if (frame._flags & FrameTasksGroupFlags.Write) {
        frame._flags &= ~FrameTasksGroupFlags.Write;
        tasks = frame._write!;
        frame._write = null;
        for (i = 0; i < tasks.length; i++) {
          tasks[i]();
        }
      }

      if (frame._flags & FrameTasksGroupFlags.Update) {
        frame._flags &= ~FrameTasksGroupFlags.Update;
        _update();
      }
    }
  } while (frame._flags & (
    FrameTasksGroupFlags.Update |
    FrameTasksGroupFlags.Write |
    FrameTasksGroupFlags.Read
  ));

  _currentFrameReady = false;

  // Lock current frame from adding read and write tasks in debug mode.
  _currentFrame._rwLock();

  if (isVisible()) {
    executeAnimations();
  }

  // Perform tasks that should be executed when all DOM ops are finished.
  while ((frame._flags & FrameTasksGroupFlags.After) !== 0) {
    frame._flags &= ~FrameTasksGroupFlags.After;

    tasks = frame._after!;
    frame._after = null;
    for (i = 0; i < tasks.length; i++) {
      tasks[i]();
    }
  }

  if (_autofocusedElement !== null) {
    (_autofocusedElement as HTMLElement).focus();
    _autofocusedElement = null;
  }

  if (shouldRequestNextFrameForAnimations()) {
    requestNextFrame();
  }

  incrementClock();
}

/**
 * nextFrame returns task list for the next frame.
 *
 * @returns Frame tasks group.
 */
export function nextFrame(): FrameTasksGroup {
  requestNextFrame();
  return _nextFrame;
}

/**
 * currentFrame returns task list for the current frame.
 *
 * @returns Frame tasks group.
 */
export function currentFrame(): FrameTasksGroup {
  if (_currentFrameReady === true) {
    return _currentFrame;
  }
  return nextFrame();
}

/**
 * syncFrameUpdate performs a synchronous frame update.
 */
export function syncFrameUpdate(): void {
  handleNextFrame();
}

function handleVisibilityChange(visible: boolean): void {
  if (visible) {
    if (shouldRequestNextFrameForAnimations()) {
      requestNextFrame();
    }
  }
}

addVisibilityObserver(handleVisibilityChange);
