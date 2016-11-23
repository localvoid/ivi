/**
 * Universal Scheduler.
 *
 * When scheduler is running on server, all frame tasks will be executed inside a task registered with a
 * `setImmediate` call.
 */

import { Component } from "../vdom/component";
import { updateComponent } from "../vdom/implementation";
import { ComponentFlags } from "../vdom/flags";

/**
 * Scheduler Task.
 */
export type SchedulerTask = () => void;

/**
 * Scheduler flags.
 */
const enum SchedulerFlags {
    /**
     * Microtasks are pending for execution in microtasks queue.
     */
    MicrotaskPending = 1,
    /**
     * Tasks are pending for execution in tasks queue.
     */
    TaskPending = 1 << 1,
    /**
     * Frametasks are pending for execution in frametasks queue.
     */
    FrametaskPending = 1 << 2,
    /**
     * Current frame ready.
     */
    CurrentFrameReady = 1 << 3,
}

/**
 * Frame Tasks Group flags.
 */
const enum FrameTasksGroupFlags {
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
    _writeTasks: SchedulerTask[] | null;
    /**
     * Read DOM task queue.
     */
    _readTasks: SchedulerTask[] | null;
    /**
     * Tasks that should be executed when all other tasks are finished.
     */
    _afterTasks: SchedulerTask[] | null;

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
                if ((this._flags & FrameTasksGroupFlags.RWLock) !== 0) {
                    throw new Error("Failed to add update component task to the current frame, current frame is " +
                        "locked for read and write tasks.");
                }
            }

            if ((component.flags & ComponentFlags.InUpdateQueue) === 0) {
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
     * @param callback
     */
    write(callback: SchedulerTask): void {
        if (__IVI_DEV__) {
            if ((this._flags & FrameTasksGroupFlags.RWLock) !== 0) {
                throw new Error("Failed to add update component task to the current frame, current frame is locked " +
                    "for read and write tasks.");
            }
        }

        this._flags |= FrameTasksGroupFlags.Write;
        if (this._writeTasks === null) {
            this._writeTasks = [];
        }
        this._writeTasks.push(callback);
    }

    /**
     * Add new task to the read DOM task queue.
     *
     * @param callback
     */
    read(callback: SchedulerTask): void {
        if (__IVI_DEV__) {
            if ((this._flags & FrameTasksGroupFlags.RWLock) !== 0) {
                throw new Error("Failed to add update component task to the current frame, current frame is locked " +
                    "for read and write tasks.");
            }
        }

        this._flags |= FrameTasksGroupFlags.Read;
        if (this._readTasks === null) {
            this._readTasks = [];
        }
        this._readTasks.push(callback);
    }

    /**
     * Add new task to the task queue that will execute tasks when all DOM tasks are finished.
     *
     * @param callback
     */
    after(callback: SchedulerTask): void {
        this._flags |= FrameTasksGroupFlags.After;
        if (this._afterTasks === null) {
            this._afterTasks = [];
        }
        this._afterTasks.push(callback);
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

/**
 * Scheduler.
 */
const scheduler = {
    /**
     * See `SchedulerFlags` for details.
     */
    flags: 0,
    clock: 0,
    time: 0,
    microtasks: [] as SchedulerTask[],
    tasks: [] as SchedulerTask[],
    currentFrame: new FrameTasksGroup(),
    nextFrame: new FrameTasksGroup(),
    updateComponents: [] as Component<any>[],
};

const microtaskNode = __IVI_BROWSER__ ? document.createTextNode("") : undefined;
let microtaskToggle = 0;
const taskMessage = __IVI_BROWSER__ ? "__ivi" + Math.random() : undefined;

if (__IVI_BROWSER__) {
    // Microtask scheduler based on mutation observer
    const microtaskObserver = new MutationObserver(runMicrotasks);
    microtaskObserver.observe(microtaskNode!, { characterData: true });

    // Task scheduler based on postMessage
    window.addEventListener("message", handleWindowMessage);
}
scheduler.currentFrame._rwLock();

/**
 * Monotonically increasing clock.
 *
 * @returns current clock value.
 */
export function clock(): number {
    return scheduler.clock;
}

/**
 * Trigger microtasks execution.
 */
function requestMicrotaskExecution(): void {
    if ((scheduler.flags & SchedulerFlags.MicrotaskPending) === 0) {
        scheduler.flags |= SchedulerFlags.MicrotaskPending;
        if (__IVI_BROWSER__) {
            microtaskToggle ^= 1;
            microtaskNode!.nodeValue = microtaskToggle ? "1" : "0";
        } else {
            process.nextTick(runMicrotasks);
        }
    }
}

/**
 * Trigger tasks execution.
 */
function requestTaskExecution(): void {
    if ((scheduler.flags & SchedulerFlags.TaskPending) === 0) {
        scheduler.flags |= SchedulerFlags.TaskPending;
        if (__IVI_BROWSER__) {
            window.postMessage(taskMessage, "*");
        } else {
            setImmediate(runTasks);
        }
    }
}

/**
 * Trigger next frame tasks execution.
 */
function requestNextFrame(): void {
    if ((scheduler.flags & SchedulerFlags.FrametaskPending) === 0) {
        scheduler.flags |= SchedulerFlags.FrametaskPending;
        if (__IVI_BROWSER__) {
            requestAnimationFrame(handleNextFrame);
        } else {
            setImmediate(handleNextFrame);
        }
    }
}

/**
 * Task scheduler event handler.
 *
 * @param ev Message event.
 */
function handleWindowMessage(ev: MessageEvent): void {
    if (ev.source === window && ev.data === taskMessage) {
        runTasks();
    }
}

/**
 * Frame tasks scheduler event handler.
 *
 * @param t Current time.
 */
function handleNextFrame(): void {
    const updateComponents = scheduler.updateComponents;
    let tasks: SchedulerTask[];
    let i: number;
    let j: number;

    scheduler.flags &= ~SchedulerFlags.FrametaskPending;
    scheduler.flags |= SchedulerFlags.CurrentFrameReady;

    scheduler.time = Date.now();

    const frame = scheduler.nextFrame;
    scheduler.nextFrame = scheduler.currentFrame;
    scheduler.currentFrame = frame;

    scheduler.currentFrame._rwUnlock();
    scheduler.nextFrame._rwUnlock();

    if (__IVI_BROWSER__) {
        // Mark all update components as dirty. But don't update until all write tasks are finished. It is possible that
        // we won't need to update component if it is removed.
        for (i = 0; i < updateComponents.length; i++) {
            updateComponents[i].flags |= ComponentFlags.DirtyState;
        }
    }

    // Perform read/write batching. Start with executing read DOM tasks, then update components, execute write DOM tasks
    // and repeat until all read and write tasks are executed.
    do {
        while ((frame._flags & FrameTasksGroupFlags.Read) !== 0) {
            frame._flags &= ~FrameTasksGroupFlags.Read;
            tasks = frame._readTasks!;
            frame._readTasks = null;

            for (i = 0; i < tasks.length; i++) {
                tasks[i]();
            }
        }

        while ((frame._flags & (FrameTasksGroupFlags.Component | FrameTasksGroupFlags.Write)) !== 0) {
            if ((frame._flags & FrameTasksGroupFlags.Write) !== 0) {
                frame._flags &= ~FrameTasksGroupFlags.Write;
                tasks = frame._writeTasks!;
                frame._writeTasks = null;
                for (i = 0; i < tasks.length; i++) {
                    tasks[i]();
                }
            }

            if (__IVI_BROWSER__) {
                if ((frame._flags & FrameTasksGroupFlags.Component) !== 0) {
                    frame._flags &= ~FrameTasksGroupFlags.Component;
                    const componentGroups = frame._componentTasks;

                    for (i = 0; i < componentGroups.length; i++) {
                        const componentGroup = componentGroups[i];
                        if (componentGroup !== null) {
                            componentGroups[i] = null;
                            for (j = 0; j < componentGroup.length; j++) {
                                updateComponent(componentGroup[j]);
                            }
                        }
                    }
                }
            }
        }

        if (__IVI_BROWSER__) {
            // Update components registered for updating on each frame.
            // Remove components that doesn't have UPDATE_EACH_FRAME flag.
            i = 0;
            j = updateComponents.length;

            while (i < j) {
                const component = updateComponents[i++];
                if ((component.flags & ComponentFlags.UpdateEachFrame) === 0) {
                    component.flags &= ~ComponentFlags.InUpdateEachFrameQueue;
                    if (i === j) {
                        updateComponents.pop();
                    } else {
                        updateComponents[--i] = updateComponents.pop() !;
                    }
                } else {
                    updateComponent(component);
                }
            }
        }
    } while ((frame._flags & (FrameTasksGroupFlags.Component |
        FrameTasksGroupFlags.Write |
        FrameTasksGroupFlags.Read)) !== 0);

    scheduler.flags &= ~SchedulerFlags.CurrentFrameReady;

    // Lock current from adding read and write tasks in debug mode.
    scheduler.currentFrame._rwLock();

    // Perform tasks that should be executed when all DOM ops are finished.
    while ((frame._flags & FrameTasksGroupFlags.After) !== 0) {
        frame._flags &= ~FrameTasksGroupFlags.After;

        tasks = frame._afterTasks!;
        frame._afterTasks = null;
        for (i = 0; i < tasks.length; i++) {
            tasks[i]();
        }
    }

    if (__IVI_BROWSER__) {
        if (updateComponents.length > 0) {
            requestNextFrame();
        }
    }

    scheduler.clock++;
}

function runMicrotasks(): void {
    scheduler.time = Date.now();

    while (scheduler.microtasks.length > 0) {
        const tasks = scheduler.microtasks;
        scheduler.microtasks = [];
        for (let i = 0; i < tasks.length; i++) {
            tasks[i]();
        }
        scheduler.clock++;
    }

    scheduler.flags &= ~SchedulerFlags.MicrotaskPending;
}

function runTasks(): void {
    scheduler.flags &= ~SchedulerFlags.TaskPending;
    scheduler.time = Date.now();

    let tasks = scheduler.tasks;
    scheduler.tasks = [];
    for (let i = 0; i < tasks.length; i++) {
        tasks[i]();
    }

    scheduler.clock++;
}

/**
 * Add task to the microtask queue.
 *
 * @param task
 */
export function scheduleMicrotask(task: () => void): void {
    requestMicrotaskExecution();
    scheduler.microtasks.push(task);
}

/**
 * Add task to the task queue.
 *
 * @param task
 */
export function scheduleTask(task: () => void): void {
    requestTaskExecution();
    scheduler.tasks.push(task);
}

/**
 * Get task list for the next frame.
 *
 * @returns Frame tasks group.
 */
export function nextFrame(): FrameTasksGroup {
    requestNextFrame();
    return scheduler.nextFrame;
}

/**
 * Get task list for the current frame.
 *
 * @returns Frame tasks group.
 */
export function currentFrame(): FrameTasksGroup {
    if (scheduler.flags & SchedulerFlags.CurrentFrameReady) {
        return scheduler.currentFrame;
    }
    return nextFrame();
}

/**
 * Add component to the list of components that will be updated each frame.
 *
 * @param component
 */
export function startUpdateComponentEachFrame(component: Component<any>): void {
    if (__IVI_BROWSER__) {
        requestNextFrame();
        scheduler.updateComponents.push(component);
    }
}
