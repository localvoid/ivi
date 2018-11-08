import { sMT, rAF } from "ivi-scheduler";
import { runRepeatableTasks, RepeatableTaskList } from "../core/repeatable_task_list";
import { NOOP } from "../core/noop";
import { catchError } from "../core/error";
import { VNode } from "../vdom/vnode";
import { Component } from "../vdom/component";
import { ROOTS, findRoot, dirtyCheck } from "../vdom/root";

/**
 * Update flags.
 */
export const enum UpdateFlags {
  /**
   * Forces synchronous update.
   */
  RequestSyncUpdate = 1,
}

/**
 * Scheduler flags.
 */
const enum SchedulerFlags {
  Running = 1,
  TickPending = 1 << 1,
  NextFramePending = 1 << 2,
  NextSyncFramePending = 1 << 3,
  UpdatingFrame = 1 << 4,
  DirtyCheckPending = 1 << 5,
}

/**
 * Task list.
 */
interface TaskList { v: Array<() => void>; }

/**
 * createTaskList creates a task list.
 *
 * @returns task list
 */
const createTaskList = () => ({ v: [] }) as TaskList;

/**
 * Execute tasks from the `TaskList`.
 *
 * @param t - Task list
 */
function run(t: TaskList) {
  while (t.v.length > 0) {
    const tasks = t.v;
    let i = 0;
    t.v = [];
    do {
      tasks[i++]();
    } while (i < tasks.length);
  }
}

let _flags: SchedulerFlags = 0;
let _clock = 0;
const _microtasks = createTaskList();
const _mutationEffects = createTaskList();
const _domLayoutEffects = createTaskList();
const _beforeMutations = [] as RepeatableTaskList;
const _afterMutations = [] as RepeatableTaskList;
let _frameStartTime = 0;

export const withSchedulerTick = <T extends any[]>(inner: (...args: T) => void) => (
  catchError(function () {
    _flags |= SchedulerFlags.Running;
    inner.apply(void 0, arguments);
    run(_microtasks);
    _flags &= ~(SchedulerFlags.Running | SchedulerFlags.TickPending);
    ++_clock;
  })
) as (...args: T) => void;
const runMicrotasks = withSchedulerTick(NOOP);

/**
 * clock returns monotonically increasing clock value.
 *
 * @returns current clock value.
 */
export const clock = () => _clock;

/**
 * scheduleMicrotask adds task to the microtask queue.
 *
 * @param task Microtask.
 */
export function scheduleMicrotask(task: () => void): void {
  _microtasks.v.push(task);
  if ((_flags & (SchedulerFlags.Running | SchedulerFlags.TickPending)) === 0) {
    _flags |= SchedulerFlags.TickPending;
    sMT(runMicrotasks);
  }
}

export function beforeMutations(fn: () => boolean | void): void {
  _beforeMutations.push(fn);
}

export function afterMutations(fn: () => boolean | void): void {
  _afterMutations.push(fn);
}

/**
 * frameStartTime returns current frame start time.
 *
 * @returns current frame start time.
 */
export const frameStartTime = () => _frameStartTime;

export const withNextFrame = (fn: (time?: number) => void) => (
  withSchedulerTick((time?: number) => {
    _flags |= SchedulerFlags.UpdatingFrame;
    fn(time);

    if ((_flags & SchedulerFlags.NextFramePending) !== 0) {
      _frameStartTime = time === void 0 ? performance.now() : time;

      runRepeatableTasks(_beforeMutations);
      if ((_flags & SchedulerFlags.DirtyCheckPending) !== 0) {
        dirtyCheck();
      }
      run(_mutationEffects);
      runRepeatableTasks(_afterMutations);
      run(_domLayoutEffects);
    }
    _flags &= ~(
      SchedulerFlags.UpdatingFrame |
      SchedulerFlags.NextFramePending |
      SchedulerFlags.NextSyncFramePending |
      SchedulerFlags.DirtyCheckPending
    );
  })
);

/**
 * Frame tasks scheduler event handler.
 *
 * @param t Current time.
 */
const _handleNextFrame = withNextFrame(NOOP);

/**
 * requestNextFrame triggers next frame tasks execution.
 */
export function requestNextFrame(flags?: UpdateFlags): void {
  if (
    (flags !== void 0) &&
    ((flags & UpdateFlags.RequestSyncUpdate) !== 0) &&
    ((_flags & SchedulerFlags.NextSyncFramePending) === 0)
  ) {
    _flags |= SchedulerFlags.NextFramePending | SchedulerFlags.NextSyncFramePending;
    if ((_flags & SchedulerFlags.UpdatingFrame) === 0) {
      scheduleMicrotask(_handleNextFrame);
    }
  } else if ((_flags & SchedulerFlags.NextFramePending) === 0) {
    _flags |= SchedulerFlags.NextFramePending;
    if ((_flags & SchedulerFlags.UpdatingFrame) === 0) {
      rAF(_handleNextFrame);
    }
  }
}

/**
 * Adds a write DOM task to the queue.
 *
 * @param fn - Write DOM task
 */
export function scheduleMutationEffect(fn: () => void, flags?: UpdateFlags): void {
  _mutationEffects.v.push(fn);
  requestNextFrame(flags);
}

/**
 * Adds a DOM layout task to the queue.
 *
 * @param fn - Read DOM task
 */
export function scheduleLayoutEffect(fn: () => void, flags?: UpdateFlags): void {
  _domLayoutEffects.v.push(fn);
  requestNextFrame(flags);
}

export function requestDirtyCheck(flags?: UpdateFlags) {
  _flags |= SchedulerFlags.DirtyCheckPending;
  requestNextFrame(flags);
}

/**
 * Invalidate component.
 *
 * @param c - Component instance
 * @param flags - See {@link InvalidateFlags} for details.
 */
export function invalidate<P>(c: Component<P>, flags?: UpdateFlags): void {
  c.dirty = true;
  requestDirtyCheck(flags);
}

export const dirty = (flags?: UpdateFlags) => (requestDirtyCheck(flags), _clock);

/**
 * Render virtual DOM node into the container.
 *
 * @param next - Virtual DOM node to render
 * @param container - DOM Node that will contain rendered node
 * @param flags - See {@link InvalidateFlags} for details
 */
export function render(next: VNode | null, container: Element, flags?: UpdateFlags): void {
  /* istanbul ignore else */
  if (DEBUG) {
    /**
     * Rendering into the <body> element is disabled to make it possible to fix iOS quirk with click events.
     */
    if (container === document.body) {
      throw new Error("Rendering into the <body> element aren't allowed");
    }
    if (!document.body.contains(container)) {
      throw new Error("Container element should be attached to the document");
    }
  }

  const root = findRoot(container);
  if (root) {
    root.next = next;
  } else {
    ROOTS.push({ container, next, current: null });
  }

  requestDirtyCheck(flags);
}
