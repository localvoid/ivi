import { DEV } from "ivi-vars";
import { devModeOnError, RepeatableTaskList, NOOP, unorderedArrayDelete, append } from "ivi-core";

/**
 * Scheduler flags.
 */
const enum SchedulerFlags {
  Hidden = 1,
  VisibilityObserversCOW = 1 << 1,
  MicrotaskPending = 1 << 2,
  TaskPending = 1 << 3,
  NextFramePending = 1 << 4,
  CurrentFrameReady = 1 << 5,
}

/**
 * Frame Tasks Group flags.
 */
const enum FrameTasksGroupFlags {
  /**
   * Group contains update task.
   */
  Update = 1,
  /**
   * Group contains "write" tasks.
   */
  Write = 1 << 1,
  /**
   * Group contains "read" tasks".
   */
  Read = 1 << 2,
  /**
   * Group contains "after" tasks.
   */
  After = 1 << 3,
}

/**
 * FrameTasksGroup contains tasks for read and write DOM tasks, and tasks that should be executed after all other tasks
 * are finished.
 *
 * @final
 */
interface FrameTasksGroup {
  /**
   * See `FrameTasksGroupFlags` for details.
   */
  flags: number;
  /**
   * Write DOM task queue.
   */
  write: (() => void)[] | null;
  /**
   * Read DOM task queue.
   */
  read: (() => void)[] | null;
  /**
   * Tasks that should be executed when all other frame tasks are finished.
   */
  after: (() => void)[] | null;
}

function createFrameTasksGroup(): FrameTasksGroup {
  return {
    flags: 0,
    write: null,
    read: null,
    after: null,
  };
}

let _flags: SchedulerFlags = 0;
let _clock = 0;
let _microtasks: (() => void)[] = [];
const _microtaskNode: Text = document.createTextNode("");
let _microtaskToggle = 0;

/**
 * Message ID that will be used to trigger tasks execution.
 *
 * Multiple ivi instances in one document doesn't work for many reasons, so we just use the same uuid as a message ID.
 */
const TASK_MESSAGE_UUID = "06526c5c-2dcc-4a4e-a86c-86f5dea6319d";

let _tasks: (() => void)[] = [];

let _visibilityObservers: ((hidden: boolean) => void)[] = [];
let _isHidden: () => boolean;

const _animations = new RepeatableTaskList();
const _readers = new RepeatableTaskList();
let _updateDOMHandler: () => void = NOOP;
let _currentFrame = createFrameTasksGroup();
let _nextFrame = createFrameTasksGroup();
let _currentFrameStartTime = 0;
let _autofocusedElement: Element | null = null;

const microtaskObserver = new MutationObserver(function runMicrotasks(): void {
  while (_microtasks.length > 0) {
    const tasks = _microtasks;
    _microtasks = [];
    for (let i = 0; i < tasks.length; ++i) {
      tasks[i]();
    }
  }

  _flags ^= SchedulerFlags.MicrotaskPending;
  ++_clock;
});
microtaskObserver.observe(_microtaskNode, { "characterData": true });

// Task scheduler based on postMessage
window.addEventListener("message", function runTasks(ev: MessageEvent): void {
  if (ev.source === window && ev.data === TASK_MESSAGE_UUID) {
    _flags ^= SchedulerFlags.TaskPending;
    const tasks = _tasks;
    _tasks = [];
    for (let i = 0; i < tasks.length; ++i) {
      tasks[i]();
    }
    ++_clock;
  }
});

function handleVisibilityChange(): void {
  const newHidden = _isHidden();
  if (((_flags & SchedulerFlags.Hidden) !== 0) !== newHidden) {
    _flags ^= SchedulerFlags.Hidden | SchedulerFlags.VisibilityObserversCOW;

    if (newHidden === false && _animations.tasks.length > 0) {
      requestNextFrame();
    }

    const observers = _visibilityObservers;
    for (let i = 0; i < observers.length; ++i) {
      observers[i](newHidden);
    }
    _flags ^= SchedulerFlags.VisibilityObserversCOW;
  }
}

if (typeof document["hidden"] !== "undefined") {
  _isHidden = function () {
    return document.hidden;
  };
  document.addEventListener("visibilitychange", handleVisibilityChange);
} else if (typeof (document as any)["webkitHidden"] !== "undefined") {
  /**
   * #quirks
   *
   * Android 4.4
   */
  _isHidden = function () {
    return (document as any)["webkitHidden"];
  };
  document.addEventListener("webkitvisibilitychange", handleVisibilityChange);
} else {
  _isHidden = function () {
    return true;
  };
}
if (_isHidden() === true) {
  _flags |= SchedulerFlags.Hidden;
}

/**
 * clock returns monotonically increasing clock value.
 *
 * @returns current clock value.
 */
export function clock(): number {
  return _clock;
}

/**
 * scheduleMicrotask adds task to the microtask queue.
 *
 * @param task Microtask.
 */
export function scheduleMicrotask(task: () => void): void {
  if ((_flags & SchedulerFlags.MicrotaskPending) === 0) {
    _flags |= SchedulerFlags.MicrotaskPending;
    _microtaskToggle ^= 1;
    _microtaskNode.nodeValue = _microtaskToggle ? "1" : "0";
  }
  _microtasks.push(task);
}

/**
 * scheduleTask adds task to the task queue.
 *
 * @param task Task.
 */
export function scheduleTask(task: () => void): void {
  if ((_flags & SchedulerFlags.TaskPending) === 0) {
    _flags |= SchedulerFlags.TaskPending;
    postMessage(TASK_MESSAGE_UUID, "*");
  }
  _tasks.push(task);
}

export function isHidden(): boolean {
  return (_flags & SchedulerFlags.Hidden) !== 0;
}

export function addVisibilityObserver(observer: (visible: boolean) => void): void {
  if ((_flags & SchedulerFlags.VisibilityObserversCOW) !== 0) {
    _visibilityObservers = _visibilityObservers.slice();
  }
  _visibilityObservers.push(observer);
}

export function removeVisibilityObserver(observer: (visible: boolean) => void): void {
  if ((_flags & SchedulerFlags.VisibilityObserversCOW) !== 0) {
    _visibilityObservers = _visibilityObservers.slice();
  }
  const index = _visibilityObservers.indexOf(observer);
  if (index > -1) {
    unorderedArrayDelete(_visibilityObservers, index);
  }
}

export function setUpdateDOMHandler(handler: () => void): void {
  _updateDOMHandler = handler;
}

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
 * addDOMReader adds DOM Reader to the RepeatableTaskList.
 *
 * DOM Reader will be be invoked on each frame in the read phase.
 *
 * @param reader Task that will be executed until it returns `false`.
 */
export function addDOMReader(reader: () => boolean | undefined): void {
  _readers.add(reader);
}

export function autofocus(element: Element): void {
  _autofocusedElement = element;
}

/**
 * frameStartTime returns current frame start time.
 *
 * @returns current frame start time.
 */
export function currentFrameStartTime(): number {
  return _currentFrameStartTime;
}

function _updateCurrentFrameStartTime(time?: number): void {
  _currentFrameStartTime = (time === undefined ? performance.now() : time) / 1000;
}

_updateCurrentFrameStartTime();

function _requestNextFrame(): void {
  if ((_flags & SchedulerFlags.NextFramePending) !== 0) {
    requestAnimationFrame(handleNextFrame);
  }
}

/**
 * requestNextFrame triggers next frame tasks execution.
 */
export function requestNextFrame(): void {
  if ((_flags & SchedulerFlags.NextFramePending) === 0) {
    _flags |= SchedulerFlags.NextFramePending;
    scheduleMicrotask(_requestNextFrame);
  }
}

/**
 * Frame tasks scheduler event handler.
 *
 * @param t Current time.
 */
function _handleNextFrame(time?: number): void {
  _flags ^= SchedulerFlags.NextFramePending | SchedulerFlags.CurrentFrameReady;

  _updateCurrentFrameStartTime(time);

  let tasks: (() => void)[];
  let i: number;

  const frame = _nextFrame;
  _nextFrame = _currentFrame;
  _currentFrame = frame;

  _readers.run();

  // Perform read/write batching. Start with executing read DOM tasks, then update components, execute write DOM tasks
  // and repeat until all read and write tasks are executed.
  do {
    while ((frame.flags & FrameTasksGroupFlags.Read) !== 0) {
      frame.flags ^= FrameTasksGroupFlags.Read;
      tasks = frame.read!;
      frame.read = null;

      for (i = 0; i < tasks.length; ++i) {
        tasks[i]();
      }
    }

    while ((frame.flags & (FrameTasksGroupFlags.Update | FrameTasksGroupFlags.Write)) !== 0) {
      if ((frame.flags & FrameTasksGroupFlags.Write) !== 0) {
        frame.flags ^= FrameTasksGroupFlags.Write;
        tasks = frame.write!;
        frame.write = null;
        for (i = 0; i < tasks.length; ++i) {
          tasks[i]();
        }
      }

      if ((frame.flags & FrameTasksGroupFlags.Update) !== 0) {
        frame.flags ^= FrameTasksGroupFlags.Update;
        _updateDOMHandler();
      }
    }
  } while ((frame.flags & (
    FrameTasksGroupFlags.Update |
    FrameTasksGroupFlags.Write |
    FrameTasksGroupFlags.Read
  )) !== 0);

  _flags ^= SchedulerFlags.CurrentFrameReady;

  if ((_flags & SchedulerFlags.Hidden) === 0) {
    _animations.run();
  }

  // Perform tasks that should be executed when all DOM ops are finished.
  while ((frame.flags & FrameTasksGroupFlags.After) !== 0) {
    frame.flags ^= FrameTasksGroupFlags.After;

    tasks = frame.after!;
    frame.after = null;
    for (i = 0; i < tasks.length; ++i) {
      tasks[i]();
    }
  }

  if (_autofocusedElement !== null) {
    (_autofocusedElement as HTMLElement).focus();
    _autofocusedElement = null;
  }

  if (_animations.tasks.length > 0) {
    requestNextFrame();
  }

  ++_clock;
}

/**
 * Frame tasks scheduler event handler.
 *
 * @param t Current time.
 */
function handleNextFrame(t?: number): void {
  if (DEV) {
    try {
      _handleNextFrame(t);
    } catch (e) {
      devModeOnError(e);
      throw e;
    }
  } else {
    _handleNextFrame(t);
  }
}

function addFrameTaskUpdate(frame: FrameTasksGroup): void {
  frame.flags |= FrameTasksGroupFlags.Update;
}

function addFrameTaskWrite(frame: FrameTasksGroup, task: () => void): void {
  frame.flags |= FrameTasksGroupFlags.Write;
  frame.write = append(frame.write, task);
}

function addFrameTaskRead(frame: FrameTasksGroup, task: () => void): void {
  frame.flags |= FrameTasksGroupFlags.Read;
  frame.read = append(frame.read, task);
}

function addFrameTaskAfter(frame: FrameTasksGroup, task: () => void): void {
  frame.flags |= FrameTasksGroupFlags.After;
  frame.after = append(frame.after, task);
}

export function nextFrameUpdate(): void {
  requestNextFrame();
  addFrameTaskUpdate(_nextFrame);
}

export function nextFrameWrite(task: () => void): void {
  requestNextFrame();
  addFrameTaskWrite(_nextFrame, task);
}

export function nextFrameRead(task: () => void): void {
  requestNextFrame();
  addFrameTaskRead(_nextFrame, task);
}

export function nextFrameAfter(task: () => void): void {
  requestNextFrame();
  addFrameTaskAfter(_nextFrame, task);
}

export function currentFrameUpdate(): void {
  if ((_flags & SchedulerFlags.CurrentFrameReady) !== 0) {
    addFrameTaskUpdate(_currentFrame);
  } else {
    nextFrameUpdate();
  }
}

export function currentFrameWrite(task: () => void): void {
  if ((_flags & SchedulerFlags.CurrentFrameReady) !== 0) {
    addFrameTaskWrite(_currentFrame, task);
  } else {
    nextFrameWrite(task);
  }
}

export function currentFrameRead(task: () => void): void {
  if ((_flags & SchedulerFlags.CurrentFrameReady) !== 0) {
    addFrameTaskRead(_currentFrame, task);
  } else {
    nextFrameRead(task);
  }
}

export function currentFrameAfter(task: () => void): void {
  if ((_flags & SchedulerFlags.CurrentFrameReady) !== 0) {
    addFrameTaskAfter(_currentFrame, task);
  } else {
    nextFrameAfter(task);
  }
}

/**
 * triggerNextFrame triggers an update for the next frame.
 */
export function triggerNextFrame(): void {
  if ((_flags & SchedulerFlags.NextFramePending) !== 0) {
    handleNextFrame();
  }
}
