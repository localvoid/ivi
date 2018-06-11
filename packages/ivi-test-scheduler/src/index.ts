import { RepeatableTaskList, runRepeatableTasks, NOOP, unorderedArrayDelete, append } from "ivi-core";

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
let _updateDOMHandler: () => void = NOOP;
let _microtasks: (() => void)[] = [];
let _tasks: (() => void)[] = [];
let _visibilityObservers: ((hidden: boolean) => void)[] = [];
let _beforeUpdate: RepeatableTaskList = [];
let _afterUpdate: RepeatableTaskList = [];
let _currentFrame = createFrameTasksGroup();
let _nextFrame = createFrameTasksGroup();
let _currentFrameStartTime = 0;
let _autofocusedElement: Element | null = null;

export function resetSchedulerState() {
  _flags = 0;
  _clock = 0;
  _microtasks = [];
  _tasks = [];
  _beforeUpdate = [];
  _afterUpdate = [];
  _currentFrame = createFrameTasksGroup();
  _nextFrame = createFrameTasksGroup();
  _currentFrameStartTime = 0;
  _autofocusedElement = null;
}

export function toggleVisibility(hidden: boolean): void {
  if (((_flags & SchedulerFlags.Hidden) !== 0) !== hidden) {
    _flags ^= SchedulerFlags.Hidden | SchedulerFlags.VisibilityObserversCOW;

    const observers = _visibilityObservers;
    for (let i = 0; i < observers.length; ++i) {
      observers[i](hidden);
    }
    _flags ^= SchedulerFlags.VisibilityObserversCOW;
  }
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
 * Adds a task that will be executed before each update.
 *
 * @param task - Task that will be executed before each update until it returns `false`.
 */
export function beforeUpdate(task: () => boolean | undefined): void {
  _beforeUpdate.push(task);
}

/**
 * Adds a task that will be executed after each update.
 *
 * @param task - Task that will be executed after each update until it returns `false`.
 */
export function afterUpdate(task: () => boolean | undefined): void {
  _afterUpdate.push(task);
}

export function autofocus(node: Node): void {
  if (node instanceof Element) {
    _autofocusedElement = node;
  }
}

/**
 * frameStartTime returns current frame start time.
 *
 * @returns current frame start time.
 */
export function currentFrameStartTime(): number {
  return _currentFrameStartTime;
}

/**
 * requestNextFrame triggers next frame tasks execution.
 */
export function requestNextFrame(): void {
  if ((_flags & SchedulerFlags.NextFramePending) === 0) {
    _flags |= SchedulerFlags.NextFramePending;
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

export function runMicrotasks(): void {
  if ((_flags & SchedulerFlags.MicrotaskPending) !== 0) {
    while (_microtasks.length > 0) {
      const tasks = _microtasks;
      _microtasks = [];
      for (let i = 0; i < tasks.length; ++i) {
        tasks[i]();
      }
    }

    _flags ^= SchedulerFlags.MicrotaskPending;
    ++_clock;
  }
}

export function runTasks(): void {
  if ((_flags & SchedulerFlags.TaskPending) !== 0) {
    _flags ^= SchedulerFlags.TaskPending;
    const tasks = _tasks;
    _tasks = [];
    for (let i = 0; i < tasks.length; ++i) {
      tasks[i]();
    }
    ++_clock;
  }
}

export function triggerNextTick(): void {
  runMicrotasks();
  runTasks();
}

/**
 * triggerNextFrame triggers an update for the next frame.
 */
export function triggerNextFrame(time?: number): void {
  try {
    if ((_flags & SchedulerFlags.NextFramePending) !== 0) {
      _flags ^= SchedulerFlags.NextFramePending | SchedulerFlags.CurrentFrameReady;

      if (time !== undefined) {
        _currentFrameStartTime = time / 1000;
      }

      let tasks: (() => void)[];
      let i: number;

      const frame = _nextFrame;
      _nextFrame = _currentFrame;
      _currentFrame = frame;

      runRepeatableTasks(_beforeUpdate);

      // Perform read/write batching. Start with executing read DOM tasks, then update components, execute write DOM
      // tasks and repeat until all read and write tasks are executed.
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

      runRepeatableTasks(_afterUpdate);

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

      ++_clock;
    }
  } catch (e) {
    throw e;
  }
}
