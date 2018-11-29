import { NOOP, catchError, runRepeatableTasks, RepeatableTaskList } from "ivi-shared";
import { sMT, rAF } from "ivi-scheduler";
import { printWarn } from "../debug/print";
import { NodeFlags } from "../vdom/node_flags";
import { OpNode } from "../vdom/operations";
import { OpState } from "../vdom/state";
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
let _debugFlags: SchedulerDebugFlags;
/* istanbul ignore else */
if (DEBUG) {
  _debugFlags = 0;
}
let _clock = 1;
const _microtasks = createTaskList();
const _mutationEffects = createTaskList();
const _domLayoutEffects = createTaskList();
const _beforeMutations = [] as RepeatableTaskList;
const _afterMutations = [] as RepeatableTaskList;
let _frameStartTime = 0;

/**
 * withSchedulerTick wraps `inner` function into a scheduler context execution.
 *
 * @param inner - Inner function.
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
 * @param task - Microtask.
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
 * @param fn - hook.
 */
export function beforeMutations(fn: () => boolean | void): void {
  _beforeMutations.push(fn);
}

/**
 * afterMutations adds a hook that will be executed after DOM mutations.
 *
 * @param fn - hook.
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
 * @param inner - Inner function.
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
      if (DEBUG) {
        _debugFlags |= SchedulerDebugFlags.DirtyCheckingFinished;
      }
      run(_mutationEffects);
      /* istanbul ignore else */
      if (DEBUG) {
        _debugFlags |= SchedulerDebugFlags.MutationsFinished;
      }
      runRepeatableTasks(_afterMutations);
      run(_domLayoutEffects);
      /* istanbul ignore else */
      if (DEBUG) {
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
    if (DEBUG) {
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
  /* istanbul ignore else */
  if (DEBUG) {
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
 * @param fn - Read DOM task
 */
export function scheduleLayoutEffect(fn: () => void, flags?: UpdateFlags): void {
  /* istanbul ignore else */
  if (DEBUG) {
    if (_flags & SchedulerFlags.UpdatingFrame) {
      if (_debugFlags & SchedulerDebugFlags.MutationsFinished) {
        printWarn("Layout effect is scheduled after layout were finished");
      }
    }
  }
  _domLayoutEffects.v.push(fn);
  requestNextFrame(flags);
}

export function requestDirtyCheck(flags?: UpdateFlags) {
  /* istanbul ignore else */
  if (DEBUG) {
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
 * @param c - Component instance
 * @param flags - See {@link UpdateFlags} for details.
 */
export function invalidate(c: OpState, flags?: UpdateFlags): void {
  c.f |= NodeFlags.Dirty;
  requestDirtyCheck(flags);
}

/**
 * dirty requests a dirty checking and returns current monotonic clock value.
 *
 * @param flags - See {@link UpdateFlags} for details.
 * @returns current monotonic clock value.
 */
export const dirty = (flags?: UpdateFlags) => (requestDirtyCheck(flags), _clock);

/**
 * Render virtual DOM node into the container.
 *
 * @param next - Virtual DOM node to render
 * @param container - DOM Node that will contain rendered node
 * @param flags - See {@link UpdateFlags} for details
 */
export function render(next: OpNode | string | number | null, container: Element, flags?: UpdateFlags): void {
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
    ROOTS.push({ container, next, state: null });
  }

  requestDirtyCheck(flags);
}
