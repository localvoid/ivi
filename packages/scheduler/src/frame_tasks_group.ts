/**
 * Frame Tasks Group flags.
 */
export const enum FrameTasksGroupFlags {
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
  /**
   * Group is locked from reading and writing.
   */
  RWLock = 1 << 4,
}

/**
 * Frame tasks group contains tasks for updating components, read dom and write dom tasks, and tasks that should be
 * executed after all other tasks are finished.
 *
 * To get access to the frame tasks group, use: `currentFrame()` and `nextFrame()` scheduler methods.
 *
 *     scheduler.currentFrame().read(() => {
 *         console.log(element.clientWidth);
 *     });
 *
 * @final
 */
export class FrameTasksGroup {
  /**
   * See `FrameTasksGroupFlags` for details.
   */
  _flags: number;
  /**
   * Write DOM task queue.
   */
  _write: (() => void)[] | null;
  /**
   * Read DOM task queue.
   */
  _read: (() => void)[] | null;
  /**
   * Tasks that should be executed when all other frame tasks are finished.
   */
  _after: (() => void)[] | null;

  constructor() {
    this._flags = 0;
    this._write = null;
    this._read = null;
    this._after = null;
  }

  /**
   * update marks frame for update.
   *
   * @param component
   */
  update(): void {
    if (__IVI_DEV__) {
      if ((this._flags & FrameTasksGroupFlags.RWLock)) {
        throw new Error("Failed to mark frame for update, current frame is locked.");
      }
    }

    this._flags |= FrameTasksGroupFlags.Update;
  }

  /**
   * write adds new task to the write DOM task queue.
   *
   * @param task
   */
  write(task: () => void): void {
    if (__IVI_DEV__) {
      if ((this._flags & FrameTasksGroupFlags.RWLock)) {
        throw new Error("Failed to add write DOM task, current frame is locked.");
      }
    }

    this._flags |= FrameTasksGroupFlags.Write;
    if (this._write === null) {
      this._write = [];
    }
    this._write.push(task);
  }

  /**
   * read adds new task to the read DOM task queue.
   *
   * @param task
   */
  read(task: () => void): void {
    if (__IVI_DEV__) {
      if ((this._flags & FrameTasksGroupFlags.RWLock)) {
        throw new Error("Failed to add read DOM task, current frame is locked.");
      }
    }

    this._flags |= FrameTasksGroupFlags.Read;
    if (this._read === null) {
      this._read = [];
    }
    this._read.push(task);
  }

  /**
   * after adds new task to the task queue that will execute tasks when all DOM tasks are finished.
   *
   * @param task
   */
  after(task: () => void): void {
    this._flags |= FrameTasksGroupFlags.After;
    if (this._after === null) {
      this._after = [];
    }
    this._after.push(task);
  }

  /**
   * _rwLock locks read and write task queues.
   *
   * Works in DEBUG mode only.
   */
  _rwLock(): void {
    if (__IVI_DEV__) {
      this._flags |= FrameTasksGroupFlags.RWLock;
    }
  }

  /**
   * _rwUnlock unlocks read and write task queue.
   *
   * Works in DEBUG mode only.
   */
  _rwUnlock(): void {
    if (__IVI_DEV__) {
      this._flags &= ~FrameTasksGroupFlags.RWLock;
    }
  }
}
