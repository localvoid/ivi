import { NOOP, catchError, box, Box, TaskToken, TASK_TOKEN, advanceClock } from "../core";
import { printWarn } from "../debug/print";
import { doc } from "../dom/shortcuts";
import { NodeFlags } from "../vdom/node_flags";
import { Op } from "../vdom/operations";
import { Component } from "../vdom/component";
import { ROOTS, findRoot, dirtyCheck } from "../vdom/root";

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
   * Running inside of a frame update context.
   */
  UpdatingFrame = 1 << 3,
  /**
   * Dirty checking is pending for an execution.
   */
  DirtyCheckPending = 1 << 4,
}

const enum SchedulerDebugFlags {
  DirtyCheckingFinished = 1,
  MutationsFinished = 1 << 1,
  LayoutFinished = 1 << 2,
}

/**
 * Task list.
 */
type TaskList = Box<Array<(token: TaskToken) => void>>;

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
      tasks[i](TASK_TOKEN);
    }
  }
}

let _flags: SchedulerFlags = 0;
let _debugFlags: SchedulerDebugFlags = 0;

let _frameStartTime = 0;
const _resolvedPromise = Promise.resolve();
const _microtasks = box<Array<(token: TaskToken) => void>>([]);
const _mutationEffects = box<Array<(token: TaskToken) => void>>([]);
const _layoutEffects = box<Array<(token: TaskToken) => void>>([]);

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
    advanceClock();
  })
) as (...args: T) => void;

const runMicrotasks = withSchedulerTick(NOOP);

/**
 * scheduleMicrotask adds task to the microtask queue.
 *
 * @param task Microtask.
 */
export function scheduleMicrotask(task: (token: TaskToken) => void): void {
  _microtasks.v.push(task);
  if ((_flags & (SchedulerFlags.Running | SchedulerFlags.TickPending)) === 0) {
    _flags |= SchedulerFlags.TickPending;
    _resolvedPromise.then(runMicrotasks);
  }
}

/**
 * frameStartTime returns current frame start time.
 *
 * @returns current frame start time.
 */
export const frameStartTime = () => _frameStartTime;

let _nextFrame = (time: number | undefined) => {
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
  run(_layoutEffects);
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    _debugFlags |= SchedulerDebugFlags.LayoutFinished;
  }
};

/**
 * addNextFrameMiddleware adds next frame middleware function.
 *
 * @param fn Next frame middleware function.
 */
export function addNextFrameMiddleware(
  fn: (time: number | undefined, next: (time?: number) => void) => void,
): void {
  const next = _nextFrame;
  _nextFrame = (time: number | undefined) => { fn(time, next); };
}

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
      if (time !== void 0) {
        _frameStartTime = time;
      }
      _nextFrame(time);
    }
    _flags &= ~(
      SchedulerFlags.UpdatingFrame |
      SchedulerFlags.NextFramePending |
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
 */
export function requestNextFrame(): void {
  if ((_flags & SchedulerFlags.NextFramePending) === 0) {
    _flags |= SchedulerFlags.NextFramePending;
    if ((_flags & SchedulerFlags.UpdatingFrame) === 0) {
      requestAnimationFrame(_handleNextFrame);
    }
  }
}

/**
 * Adds a write DOM task to the queue.
 *
 * @param fn Write DOM task.
 * @param flags See {@link UpdateFlags} for details.
 */
export function scheduleMutationEffect(fn: (token: TaskToken) => void): void {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (_flags & SchedulerFlags.UpdatingFrame) {
      if (_debugFlags & SchedulerDebugFlags.MutationsFinished) {
        printWarn("Mutation effect is scheduled after mutations were finished");
      }
    }
  }
  _mutationEffects.v.push(fn);
  requestNextFrame();
}

/**
 * debounceMutationEffect creates debounced mutation effect.
 *
 * @typeparam T Effect props type.
 * @param fn Mutation effect.
 * @returns Debounced mutation effect.
 */
export function debounceMutationEffect<T>(fn: (value: T) => void): (nextValue: T) => void {
  let wait = 0;
  let value: T | undefined;
  return (nextValue: T) => {
    value = nextValue;
    if (wait === 0) {
      wait = 1;
      scheduleMutationEffect(() => {
        fn(value!);
        wait = 0;
        value = void 0;
      });
    }
  };
}

/**
 * Adds a DOM layout task to the queue.
 *
 * @param fn Read DOM task
 */
export function scheduleLayoutEffect(fn: (token: TaskToken) => void): void {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (_flags & SchedulerFlags.UpdatingFrame) {
      if (_debugFlags & SchedulerDebugFlags.MutationsFinished) {
        printWarn("Layout effect is scheduled after layout were finished");
      }
    }
  }
  _layoutEffects.v.push(fn);
  requestNextFrame();
}

/**
 * Request dirty checking.
 */
export function requestDirtyCheck(): void {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (_flags & SchedulerFlags.UpdatingFrame) {
      if (_debugFlags & SchedulerDebugFlags.MutationsFinished) {
        printWarn("Dirty checking is scheduled after dirty checking were finished");
      }
    }
  }
  _flags |= SchedulerFlags.DirtyCheckPending;
  requestNextFrame();
}

/**
 * Invalidate component.
 *
 * @param c Component instance.
 */
export function invalidate(c: Component): void {
  c.f |= NodeFlags.Dirty;
  requestDirtyCheck();
}

/**
 * Render operation into the container.
 *
 * @param next Operation to render.
 * @param container DOM Node that will contain rendered operation.
 * @param flags See {@link UpdateFlags} for details.
 */
export function render(next: Op, container: Element): void {
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

  requestDirtyCheck();
}
