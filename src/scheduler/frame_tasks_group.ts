import { ComponentFlags } from "../vdom/flags";
import { Component } from "../vdom/component";

/**
 * Frame Tasks Group flags.
 */
export const enum FrameTasksGroupFlags {
    /**
     * Group contains component update tasks.
     */
    Component = 1,
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
 *       console.log(element.clientWidth);
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
     * Array of component arrays indexed by their depth.
     */
    _componentTasks: Array<Component<any>[] | null>;
    /**
     * Write DOM task queue.
     */
    _writeTasks: (() => void)[] | null;
    /**
     * Read DOM task queue.
     */
    _readTasks: (() => void)[] | null;
    /**
     * Tasks that should be executed when all other tasks are finished.
     */
    _afterTasks: (() => void)[] | null;

    constructor() {
        this._flags = 0;
        this._componentTasks = [];
        this._writeTasks = null;
        this._readTasks = null;
        this._afterTasks = null;
    }

    /**
     * Add Component to the components queue.
     *
     * @param component
     */
    updateComponent(component: Component<any>): void {
        if (__IVI_BROWSER__) {
            if (__IVI_DEV__) {
                if ((this._flags & FrameTasksGroupFlags.RWLock)) {
                    throw new Error("Failed to add update component task to the current frame, current frame is " +
                        "locked for read and write tasks.");
                }
            }

            if (!(component.flags & ComponentFlags.InUpdateQueue)) {
                component.flags |= ComponentFlags.InUpdateQueue;
                const priority = component.depth;

                this._flags |= FrameTasksGroupFlags.Component;
                while (priority >= this._componentTasks.length) {
                    this._componentTasks.push(null);
                }

                const group = this._componentTasks[priority];
                if (group === null) {
                    this._componentTasks[priority] = [component];
                } else {
                    group.push(component);
                }
            }
        }
    }

    /**
     * Add new task to the write DOM task queue.
     *
     * @param task
     */
    write(task: () => void): void {
        if (__IVI_DEV__) {
            if ((this._flags & FrameTasksGroupFlags.RWLock)) {
                throw new Error("Failed to add update component task to the current frame, current frame is locked " +
                    "for read and write tasks.");
            }
        }

        this._flags |= FrameTasksGroupFlags.Write;
        if (this._writeTasks === null) {
            this._writeTasks = [];
        }
        this._writeTasks.push(task);
    }

    /**
     * Add new task to the read DOM task queue.
     *
     * @param task
     */
    read(task: () => void): void {
        if (__IVI_DEV__) {
            if ((this._flags & FrameTasksGroupFlags.RWLock)) {
                throw new Error("Failed to add update component task to the current frame, current frame is locked " +
                    "for read and write tasks.");
            }
        }

        this._flags |= FrameTasksGroupFlags.Read;
        if (this._readTasks === null) {
            this._readTasks = [];
        }
        this._readTasks.push(task);
    }

    /**
     * Add new task to the task queue that will execute tasks when all DOM tasks are finished.
     *
     * @param task
     */
    after(task: () => void): void {
        this._flags |= FrameTasksGroupFlags.After;
        if (this._afterTasks === null) {
            this._afterTasks = [];
        }
        this._afterTasks.push(task);
    }

    /**
     * Lock read and write task queues.
     *
     * Works in DEBUG mode only.
     */
    _rwLock(): void {
        if (__IVI_DEV__) {
            this._flags |= FrameTasksGroupFlags.RWLock;
        }
    }

    /**
     * Unlock read and write task queue.
     *
     * Works in DEBUG mode only.
     */
    _rwUnlock(): void {
        if (__IVI_DEV__) {
            this._flags &= ~FrameTasksGroupFlags.RWLock;
        }
    }
}
