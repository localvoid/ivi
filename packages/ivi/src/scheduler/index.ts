import { sMT, rAF } from "ivi-scheduler";
import { NOOP, catchError, runRepeatableTasks, RepeatableTaskList, box, Box } from "../core";
import { printWarn } from "../debug/print";
import { doc } from "../dom/shortcuts";
import { NodeFlags } from "../vdom/node_flags";
import { Op } from "../vdom/operations";
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
  /**
   * Running inside of a scheduler context.
   */
  Running = 1,
  /**
   * Scheduler tick is pending for an execution.
   */
  TickPending = 1 << 1,
  /**
   * Frame update is pending for an execution.
   */
  NextFramePending = 1 << 2,
  /**
   * Sync Frame update is pending for an execution.
   */
  NextSyncFramePending = 1 << 3,
  /**
   * Running inside of a frame update context.
   */
  UpdatingFrame = 1 << 4,
  /**
   * Dirty checking is pending for an execution.
   */
  DirtyCheckPending = 1 << 5,
}

const enum SchedulerDebugFlags {
  DirtyCheckingFinished = 1,
  MutationsFinished = 1 << 1,
  LayoutFinished = 1 << 2,
}

/**
 * Task list.
 */
type TaskList = Box<Array<() => void>>;

/**
 * Execute tasks from the `TaskList`.
 *
 * @param t - Task list
 */
function run(t: TaskList) {
  while (t.v.length > 0) {
    const tasks = t.v;
    t.v = [];
    for (let i = 0; i < tasks.length; ++i) {
      tasks[i]();
    }
  }
}

let _flags: SchedulerFlags = 0;
let _debugFlags: SchedulerDebugFlags = 0;

let _clock = 1;
const _microtasks = box<Array<() => void>>([]);
const _mutationEffects = box<Array<() => void>>([]);
const _layoutEffects = box<Array<() => void>>([]);
const _beforeMutations = [] as RepeatableTaskList;
const _afterMutations = [] as RepeatableTaskList;
let _frameStartTime = 0;

/**
 * withSchedulerTick wraps `inner` function into a scheduler context execution.
 *
 * @typeparam T Arguments.
 * @param inner Inner function.
 * @returns function that will be executed in a scheduler context.
 */
export const withSchedulerTick = <T extends any[]>(inner: (...args: T) => void) => (
  catchError(function () {
    _flags |= SchedulerFlags.Running;
    inner.apply(void 0, arguments as unknown as T);
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

/**
 * beforeMutations adds a hook that will be executed before DOM mutations.
 *
 * @param fn Hook function.
 */
export function beforeMutations(fn: () => boolean | void): void {
  _beforeMutations.push(fn);
}

/**
 * afterMutations adds a hook that will be executed after DOM mutations.
 *
 * @param fn Hook function.
 */
export function afterMutations(fn: () => boolean | void): void {
  _afterMutations.push(fn);
}

/**
 * frameStartTime returns current frame start time.
 *
 * @returns current frame start time.
 */
export const frameStartTime = () => _frameStartTime;

/**
 * withNextFrame wraps `inner` function into a scheduler frame update context.
 *
 * @param inner Inner function.
 * @returns function that will be executed in a frame update context.
 */
export const withNextFrame = (inner: (time?: number) => void) => (
  withSchedulerTick((time?: number) => {
    _flags |= SchedulerFlags.UpdatingFrame;
    inner(time);

    if ((_flags & SchedulerFlags.NextFramePending) !== 0) {
      _frameStartTime = time === void 0 ? performance.now() : time;

      runRepeatableTasks(_beforeMutations);
      if ((_flags & SchedulerFlags.DirtyCheckPending) !== 0) {
        dirtyCheck();
      }
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== "production") {
        _debugFlags |= SchedulerDebugFlags.DirtyCheckingFinished;
      }
      run(_mutationEffects);
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== "production") {
        _debugFlags |= SchedulerDebugFlags.MutationsFinished;
      }
      runRepeatableTasks(_afterMutations);
      run(_layoutEffects);
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== "production") {
        _debugFlags |= SchedulerDebugFlags.LayoutFinished;
      }
    }
    _flags &= ~(
      SchedulerFlags.UpdatingFrame |
      SchedulerFlags.NextFramePending |
      SchedulerFlags.NextSyncFramePending |
      SchedulerFlags.DirtyCheckPending
    );
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      _debugFlags &= ~(
        SchedulerDebugFlags.DirtyCheckingFinished |
        SchedulerDebugFlags.MutationsFinished |
        SchedulerDebugFlags.LayoutFinished
      );
    }
  })
);

/**
 * Frame tasks scheduler event handler.
 *
 * @param t Current time.
 */
const _handleNextFrame = withNextFrame(NOOP);

/**
 * requestNextFrame requests an update for next frame.
 *
 * @param flags See {@link UpdateFlags} for details.
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
 * @param fn Write DOM task.
 * @param flags See {@link UpdateFlags} for details.
 */
export function scheduleMutationEffect(fn: () => void, flags?: UpdateFlags): void {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (_flags & SchedulerFlags.UpdatingFrame) {
      if (_debugFlags & SchedulerDebugFlags.MutationsFinished) {
        printWarn("Mutation effect is scheduled after mutations were finished");
      }
    }
  }
  _mutationEffects.v.push(fn);
  requestNextFrame(flags);
}

/**
 * Adds a DOM layout task to the queue.
 *
 * @param fn Read DOM task
 * @param flags See {@link UpdateFlags} for details.
 */
export function scheduleLayoutEffect(fn: () => void, flags?: UpdateFlags): void {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (_flags & SchedulerFlags.UpdatingFrame) {
      if (_debugFlags & SchedulerDebugFlags.MutationsFinished) {
        printWarn("Layout effect is scheduled after layout were finished");
      }
    }
  }
  _layoutEffects.v.push(fn);
  requestNextFrame(flags);
}

/**
 * Request dirty checking.
 *
 * @param flags See {@link UpdateFlags} for details.
 */
export function requestDirtyCheck(flags?: UpdateFlags): void {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (_flags & SchedulerFlags.UpdatingFrame) {
      if (_debugFlags & SchedulerDebugFlags.MutationsFinished) {
        printWarn("Dirty checking is scheduled after dirty checking were finished");
      }
    }
  }
  _flags |= SchedulerFlags.DirtyCheckPending;
  requestNextFrame(flags);
}

/**
 * Invalidate component.
 *
 * @param c Component instance.
 * @param flags See {@link UpdateFlags} for details.
 */
export function invalidate(c: Component, flags?: UpdateFlags): void {
  c.f |= NodeFlags.Dirty;
  requestDirtyCheck(flags);
}

/**
 * dirty requests a dirty checking and returns current monotonic clock value.
 *
 * @param flags See {@link UpdateFlags} for details.
 * @returns current monotonic clock value.
 */
export const dirty = (flags?: UpdateFlags) => (requestDirtyCheck(flags), _clock);

/**
 * Render operation into the container.
 *
 * @param next Operation to render.
 * @param container DOM Node that will contain rendered operation.
 * @param flags See {@link UpdateFlags} for details.
 */
export function render(next: Op, container: Element, flags?: UpdateFlags): void {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    /**
     * Rendering into the <body> element is disabled to make it possible to fix iOS quirk with click events.
     */
    if (container === doc.body) {
      throw new Error("Rendering into the <body> element aren't allowed");
    }
    if (!doc.body.contains(container)) {
      throw new Error("Container element should be attached to the document");
    }
  }

  const root = findRoot((v) => v.container === container);
  if (root) {
    root.next = next;
  } else {
    ROOTS.push({ container, state: null, next });
  }

  requestDirtyCheck(flags);
}
