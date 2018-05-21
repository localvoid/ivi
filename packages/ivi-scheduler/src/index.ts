import { RepeatableTaskList, runRepeatableTasks, NOOP, unorderedArrayDelete, catchError } from "ivi-core";

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

interface TaskList {
  tasks: Array<() => void>;
}

/**
 * createTaskList creates a task list.
 *
 * @returns Task list.
 */
function createTaskList(): TaskList {
  return { tasks: [] };
}

function run(t: TaskList) {
  const tasks = t.tasks;
  t.tasks = [];
  for (let i = 0; i < tasks.length; ++i) {
    tasks[i]();
  }
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
  write: TaskList;
  /**
   * Read DOM task queue.
   */
  read: TaskList;
  /**
   * Tasks that should be executed when all other frame tasks are finished.
   */
  after: TaskList;
}

function createFrameTasksGroup(): FrameTasksGroup {
  return {
    flags: 0,
    write: createTaskList(),
    read: createTaskList(),
    after: createTaskList(),
  };
}

let _flags: SchedulerFlags = 0;
let _clock = 0;
const _microtasks = createTaskList();
const _tasks = createTaskList();

let _visibilityObservers: Array<(hidden: boolean) => void> = [];
let _isHidden: () => boolean;

const _animations: RepeatableTaskList = [];
const _readers: RepeatableTaskList = [];
let _updateDOMHandler: () => void = NOOP;
let _currentFrame = createFrameTasksGroup();
let _nextFrame = createFrameTasksGroup();
let _currentFrameStartTime = 0;
let _autofocusedElement: Element | null = null;

const runMicrotasks = catchError(() => {
  while (_microtasks.tasks.length > 0) {
    run(_microtasks);
  }

  _flags ^= SchedulerFlags.MicrotaskPending;
  ++_clock;
});

// Task scheduler based on MessageChannel
const _taskChannel = new MessageChannel();
_taskChannel.port1.onmessage = catchError((ev: MessageEvent) => {
  _flags ^= SchedulerFlags.TaskPending;
  run(_tasks);
  ++_clock;
});

const handleVisibilityChange = catchError(() => {
  const newHidden = _isHidden();
  if (((_flags & SchedulerFlags.Hidden) !== 0) !== newHidden) {
    _flags ^= SchedulerFlags.Hidden | SchedulerFlags.VisibilityObserversCOW;

    if (!newHidden && (_animations.length > 0)) {
      requestNextFrame();
    }

    const observers = _visibilityObservers;
    for (let i = 0; i < observers.length; ++i) {
      observers[i](newHidden);
    }
    _flags ^= SchedulerFlags.VisibilityObserversCOW;
  }
});

if (TARGET !== "browser" || typeof document["hidden"] !== "undefined") {
  _isHidden = () => document.hidden;
  document.addEventListener("visibilitychange", handleVisibilityChange);
} else if (typeof (document as any)["webkitHidden"] !== "undefined") {
  /**
   * #quirks
   *
   * Android 4.4
   */
  _isHidden = () => (document as any)["webkitHidden"];
  document.addEventListener("webkitvisibilitychange", handleVisibilityChange);
} else {
  _isHidden = () => false;
}
if (_isHidden()) {
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
  if (!(_flags & SchedulerFlags.MicrotaskPending)) {
    _flags |= SchedulerFlags.MicrotaskPending;
    Promise.resolve().then(runMicrotasks);
  }
  _microtasks.tasks.push(task);
}

/**
 * scheduleTask adds task to the task queue.
 *
 * @param task Task.
 */
export function scheduleTask(task: () => void): void {
  if (!(_flags & SchedulerFlags.TaskPending)) {
    _flags |= SchedulerFlags.TaskPending;
    _taskChannel.port2.postMessage(0);
  }
  _tasks.tasks.push(task);
}

export function isHidden(): boolean {
  return (_flags & SchedulerFlags.Hidden) !== 0;
}

export function addVisibilityObserver(observer: (visible: boolean) => void): void {
  if (_flags & SchedulerFlags.VisibilityObserversCOW) {
    _visibilityObservers = _visibilityObservers.slice();
  }
  _visibilityObservers.push(observer);
}

export function removeVisibilityObserver(observer: (visible: boolean) => void): void {
  if (_flags & SchedulerFlags.VisibilityObserversCOW) {
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
  _animations.push(animation);
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
  _readers.push(reader);
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

function _requestNextFrame(): void {
  if (_flags & SchedulerFlags.NextFramePending) {
    requestAnimationFrame(_handleNextFrame);
  }
}

/**
 * requestNextFrame triggers next frame tasks execution.
 */
export function requestNextFrame(): void {
  if (!(_flags & SchedulerFlags.NextFramePending)) {
    _flags |= SchedulerFlags.NextFramePending;
    scheduleMicrotask(_requestNextFrame);
  }
}

/**
 * Frame tasks scheduler event handler.
 *
 * @param t Current time.
 */
const _handleNextFrame = catchError((time: number) => {
  _flags ^= SchedulerFlags.NextFramePending | SchedulerFlags.CurrentFrameReady;
  _currentFrameStartTime = time;

  const frame = _nextFrame;
  _nextFrame = _currentFrame;
  _currentFrame = frame;

  runRepeatableTasks(_readers);

  // Perform read/write batching. Start with executing read DOM tasks, then update components, execute write DOM tasks
  // and repeat until all read and write tasks are executed.
  do {
    while (frame.flags & FrameTasksGroupFlags.Read) {
      frame.flags ^= FrameTasksGroupFlags.Read;
      run(frame.read);
    }

    while (frame.flags & (FrameTasksGroupFlags.Update | FrameTasksGroupFlags.Write)) {
      if (frame.flags & FrameTasksGroupFlags.Write) {
        frame.flags ^= FrameTasksGroupFlags.Write;
        run(frame.write);
      }

      if (frame.flags & FrameTasksGroupFlags.Update) {
        frame.flags ^= FrameTasksGroupFlags.Update;
        _updateDOMHandler();
      }
    }
  } while (frame.flags & (
    FrameTasksGroupFlags.Update |
    FrameTasksGroupFlags.Write |
    FrameTasksGroupFlags.Read
  ));

  _flags ^= SchedulerFlags.CurrentFrameReady;

  if (!(_flags & SchedulerFlags.Hidden)) {
    runRepeatableTasks(_animations);
  }

  // Perform tasks that should be executed when all DOM ops are finished.
  while ((frame.flags & FrameTasksGroupFlags.After)) {
    frame.flags ^= FrameTasksGroupFlags.After;
    run(frame.after);
  }

  if (_autofocusedElement !== null) {
    (_autofocusedElement as HTMLElement).focus();
    _autofocusedElement = null;
  }

  if (_animations.length) {
    requestNextFrame();
  }

  ++_clock;
});

function addFrameTaskUpdate(frame: FrameTasksGroup): void {
  frame.flags |= FrameTasksGroupFlags.Update;
}

function addFrameTaskWrite(frame: FrameTasksGroup, task: () => void): void {
  frame.flags |= FrameTasksGroupFlags.Write;
  frame.write.tasks.push(task);
}

function addFrameTaskRead(frame: FrameTasksGroup, task: () => void): void {
  frame.flags |= FrameTasksGroupFlags.Read;
  frame.read.tasks.push(task);
}

function addFrameTaskAfter(frame: FrameTasksGroup, task: () => void): void {
  frame.flags |= FrameTasksGroupFlags.After;
  frame.after.tasks.push(task);
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
  if (_flags & SchedulerFlags.CurrentFrameReady) {
    addFrameTaskUpdate(_currentFrame);
  } else {
    nextFrameUpdate();
  }
}

export function currentFrameWrite(task: () => void): void {
  if (_flags & SchedulerFlags.CurrentFrameReady) {
    addFrameTaskWrite(_currentFrame, task);
  } else {
    nextFrameWrite(task);
  }
}

export function currentFrameRead(task: () => void): void {
  if (_flags & SchedulerFlags.CurrentFrameReady) {
    addFrameTaskRead(_currentFrame, task);
  } else {
    nextFrameRead(task);
  }
}

export function currentFrameAfter(task: () => void): void {
  if (_flags & SchedulerFlags.CurrentFrameReady) {
    addFrameTaskAfter(_currentFrame, task);
  } else {
    nextFrameAfter(task);
  }
}

/**
 * triggerNextFrame triggers an update for the next frame.
 */
export function triggerNextFrame(): void {
  if (_flags & SchedulerFlags.NextFramePending) {
    _handleNextFrame(performance.now());
  }
}
