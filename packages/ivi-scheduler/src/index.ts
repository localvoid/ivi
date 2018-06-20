import {
  RepeatableTaskList, runRepeatableTasks, catchError, SyncableValue, SYNCABLE_VALUE_SKIP_UNDEFINED,
  InvalidateFlags, dirtyCheck,
} from "ivi";

/**
 * Scheduler flags.
 */
const enum SchedulerFlags {
  Hidden = 1,
  MicrotaskPending = 1 << 1,
  TaskPending = 1 << 2,
  NextFramePending = 1 << 3,
  CurrentFrameReady = 1 << 4,
}

/**
 * Frame Tasks Group flags.
 */
const enum FrameTasksGroupFlags {
  /**
   * Group contains update task.
   */
  DirtyCheck = 1,
  /**
   * Group contains "write" tasks.
   */
  Write = 1 << 1,
  /**
   * Group contains "read" tasks".
   */
  Read = 1 << 2,
}

/**
 * Task list.
 */
interface TaskList {
  /**
   * Tasks.
   */
  a: Array<() => void>;
}

/**
 * createTaskList creates a task list.
 *
 * @returns Task list
 */
function createTaskList(): TaskList {
  return { a: [] };
}

/**
 * Execute tasks from the task list.
 *
 * @param t - Task list
 */
function run(t: TaskList) {
  const tasks = t.a;
  t.a = [];
  for (const task of tasks) {
    task();
  }
}

/**
 * FrameTasksGroup contains tasks for read and write DOM tasks.
 *
 * @final
 */
interface FrameTasksGroup {
  /**
   * See {@link FrameTasksGroupFlags} for details.
   */
  f: number;
  /**
   * Write DOM task queue.
   */
  w: TaskList;
  /**
   * Read DOM task queue.
   */
  r: TaskList;
}

/**
 * Creates a {@link FrameTasksGroup}.
 *
 * @returns {@link FrameTasksGroup}
 */
function createFrameTasksGroup(): FrameTasksGroup {
  return {
    f: 0,
    w: createTaskList(),
    r: createTaskList(),
  };
}

let _flags: SchedulerFlags = 0;
let _clock = 0;
const _microtasks = createTaskList();
const _tasks = createTaskList();

const _beforeUpdate: RepeatableTaskList = [];
const _afterUpdate: RepeatableTaskList = [];
let _currentFrame = createFrameTasksGroup();
let _nextFrame = createFrameTasksGroup();
let _currentFrameStartTime = 0;
let _autofocusedElement: Element | null = null;

const runMicrotasks = catchError(() => {
  while (_microtasks.a.length > 0) {
    run(_microtasks);
  }

  _flags ^= SchedulerFlags.MicrotaskPending;
  ++_clock;
});

// Task scheduler based on MessageChannel
const _taskChannel = /* #__PURE__ */(() => {
  const c = new MessageChannel();
  c.port1.onmessage = catchError((ev: MessageEvent) => {
    _flags ^= SchedulerFlags.TaskPending;
    run(_tasks);
    ++_clock;
  });
  return c;
})();

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
  _microtasks.a.push(task);
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
  _tasks.a.push(task);
}

export function isHidden(): boolean {
  return (_flags & SchedulerFlags.Hidden) !== 0;
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

/**
 * Set autofocused element.
 *
 * @param node - DOM node
 */
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

  runRepeatableTasks(_beforeUpdate);

  // Perform read/write batching. Start with executing read DOM tasks, then update components, execute write DOM tasks
  // and repeat until all read and write tasks are executed.
  do {
    while (frame.f & FrameTasksGroupFlags.Read) {
      frame.f ^= FrameTasksGroupFlags.Read;
      run(frame.r);
    }

    while (frame.f & (FrameTasksGroupFlags.DirtyCheck | FrameTasksGroupFlags.Write)) {
      if (frame.f & FrameTasksGroupFlags.Write) {
        frame.f ^= FrameTasksGroupFlags.Write;
        run(frame.w);
      }

      if (frame.f & FrameTasksGroupFlags.DirtyCheck) {
        frame.f ^= FrameTasksGroupFlags.DirtyCheck;
        dirtyCheck();
      }
    }
  } while (frame.f & (
    FrameTasksGroupFlags.DirtyCheck |
    FrameTasksGroupFlags.Write |
    FrameTasksGroupFlags.Read
  ));

  _flags ^= SchedulerFlags.CurrentFrameReady;

  runRepeatableTasks(_afterUpdate);

  if (_autofocusedElement !== null) {
    (_autofocusedElement as HTMLElement).focus();
    _autofocusedElement = null;
  }

  ++_clock;
});

function addFrameTaskWrite(frame: FrameTasksGroup, task: () => void): void {
  frame.f |= FrameTasksGroupFlags.Write;
  frame.w.a.push(task);
}

function addFrameTaskRead(frame: FrameTasksGroup, task: () => void): void {
  frame.f |= FrameTasksGroupFlags.Read;
  frame.r.a.push(task);
}

/**
 * Adds a dirty check task to the next frame.
 */
export function nextFrameDirtyCheck(): void {
  _nextFrame.f |= FrameTasksGroupFlags.DirtyCheck;
  requestNextFrame();
}

/**
 * Adds a write DOM task to the next frame.
 *
 * @param task - Write DOM task
 */
export function nextFrameWrite(task: () => void): void {
  requestNextFrame();
  addFrameTaskWrite(_nextFrame, task);
}

/**
 * Adds a read DOM task to the next frame.
 *
 * @param task - Read DOM task
 */
export function nextFrameRead(task: () => void): void {
  requestNextFrame();
  addFrameTaskRead(_nextFrame, task);
}

/**
 * Adds a dirty check task to the current frame.
 */
export function currentFrameDirtyCheck(): void {
  if (_flags & SchedulerFlags.CurrentFrameReady) {
    _nextFrame.f |= FrameTasksGroupFlags.DirtyCheck;
    _handleNextFrame(performance.now());
  } else {
    nextFrameDirtyCheck();
  }
}

/**
 * Adds a write DOM task to the current frame.
 *
 * @param task - Write DOM task
 */
export function currentFrameWrite(task: () => void): void {
  if (_flags & SchedulerFlags.CurrentFrameReady) {
    addFrameTaskWrite(_currentFrame, task);
  } else {
    nextFrameWrite(task);
  }
}

/**
 * Adds a read DOM task to the current frame.
 *
 * @param task - Read DOM task
 */
export function currentFrameRead(task: () => void): void {
  if (_flags & SchedulerFlags.CurrentFrameReady) {
    addFrameTaskRead(_currentFrame, task);
  } else {
    nextFrameRead(task);
  }
}

/**
 * Invalidate handler function.
 *
 * @example
 *
 *   import { setupScheduler } from "ivi";
 *   import { invalidateHandler } from "ivi-scheduler";
 *
 *   setupScheduler(invalidateHandler);
 */
export function invalidateHandler() {
  currentFrameDirtyCheck();
}

/**
 * Invalidate handler function that triggers dirty check on the next frame.
 *
 * @example
 *
 *   import { setupScheduler } from "ivi";
 *   import { invalidateHandlerNextFrame } from "ivi-scheduler";
 *
 *   setupScheduler(invalidateHandlerNextFrame);
 */
export function invalidateHandlerNextFrame(flags?: InvalidateFlags) {
  if (flags !== void 0 && (flags & InvalidateFlags.RequestSyncUpdate)) {
    currentFrameDirtyCheck();
  } else {
    nextFrameDirtyCheck();
  }
}

/**
 * Synchronization function for {@link SyncableValue} created with {@link AUTOFOCUS} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function syncAutofocus(
  element: Element,
  key: string,
  prev: boolean | undefined,
  next: boolean | undefined,
) {
  if (prev === void 0 && next) {
    autofocus(element);
  }
}

/**
 * {@link SyncableValue} with `false` value and {@link syncChecked} sync function.
 */
const AUTOFOCUS_FALSE: SyncableValue<boolean> = { v: false, s: syncAutofocus };

/**
 * {@link SyncableValue} with `true` value and {@link syncChecked} sync function.
 */
const AUTOFOCUS_TRUE: SyncableValue<boolean> = { v: true, s: syncAutofocus };

/**
 * AUTOFOCUS function creates a {@link SyncableValue} that sets autofocus on an element.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = input("", { autofocus: AUTOFOCUS(true) });
 *
 * @param v - Autofocus state
 * @returns {@link SyncableValue}
 */
export function AUTOFOCUS(v: boolean | undefined): SyncableValue<boolean> {
  return (v === void 0) ?
    SYNCABLE_VALUE_SKIP_UNDEFINED as any as SyncableValue<boolean> :
    v ? AUTOFOCUS_TRUE : AUTOFOCUS_FALSE;
}
