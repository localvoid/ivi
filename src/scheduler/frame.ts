
import { Component } from "../vdom/component";
import { updateComponent } from "../vdom/implementation";
import { ComponentFlags } from "../vdom/flags";
import { FrameTasksGroupFlags, FrameTasksGroup } from "./frame_tasks_group";
import { DOMReaderFlags, firstDOMReader, setCurrentDOMReader, unregisterDOMReader } from "./dom_reader";
import { incrementClock } from "./clock";
import { scheduleMicrotask } from "./microtask";

let _pending = false;
let _currentFrameReady = false;
let _currentFrame = new FrameTasksGroup();
let _nextFrame = new FrameTasksGroup();
let _updateComponents: Component<any>[] = [];

_currentFrame._rwLock();

function _requestNextFrame(): void {
    if (_pending) {
        if (__IVI_BROWSER__) {
            requestAnimationFrame(handleNextFrame);
        } else {
            setImmediate(handleNextFrame);
        }
    }
}

/**
 * Trigger next frame tasks execution.
 */
function requestNextFrame(): void {
    if (!_pending) {
        _pending = true;
        scheduleMicrotask(_requestNextFrame);
    }
}

/**
 * Frame tasks scheduler event handler.
 *
 * @param t Current time.
 */
function handleNextFrame(): void {
    const updateComponents = _updateComponents;
    let tasks: (() => void)[];
    let i: number;
    let j: number;

    _pending = false;
    _currentFrameReady = true;

    const frame = _nextFrame;
    _nextFrame = _currentFrame;
    _currentFrame = frame;

    _currentFrame._rwUnlock();
    _nextFrame._rwUnlock();

    // Mark all update components as dirty. But don't update until all write tasks are finished. It is possible that
    // we won't need to update component if it is removed.
    if (__IVI_BROWSER__) {
        for (i = 0; i < updateComponents.length; i++) {
            updateComponents[i].flags |= ComponentFlags.DirtyState;
        }
    }

    /**
     * Execute DOM Reader tasks.
     */
    if (__IVI_BROWSER__) {
        let nextReader = firstDOMReader();
        while (nextReader) {
            setCurrentDOMReader(nextReader);
            nextReader.task();
            if (nextReader.flags & DOMReaderFlags.Canceled) {
                const tmp = nextReader;
                nextReader = nextReader._next;
                unregisterDOMReader(tmp);
            } else {
                nextReader = nextReader._next;
            }
        }
        setCurrentDOMReader(null);
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

    _currentFrameReady = false;

    // Lock current from adding read and write tasks in debug mode.
    _currentFrame._rwLock();

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
        if (_updateComponents.length > 0) {
            requestNextFrame();
        }
    }

    incrementClock();
}

/**
 * Get task list for the next frame.
 *
 * @returns Frame tasks group.
 */
export function nextFrame(): FrameTasksGroup {
    requestNextFrame();
    return _nextFrame;
}

/**
 * Get task list for the current frame.
 *
 * @returns Frame tasks group.
 */
export function currentFrame(): FrameTasksGroup {
    if (_currentFrameReady) {
        return _currentFrame;
    }
    return nextFrame();
}

/**
 * Perform a synchronous frame update.
 */
export function syncFrameUpdate(): void {
    handleNextFrame();
}

/**
 * Add component to the list of components that will be updated each frame.
 *
 * @param component
 */
export function startUpdateComponentEachFrame(component: Component<any>): void {
    if (__IVI_BROWSER__) {
        requestNextFrame();
        _updateComponents.push(component);
    }
}
