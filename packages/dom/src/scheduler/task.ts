import { incrementClock } from "./clock";

let _pending = false;
let _tasks: (() => void)[] = [];

/**
 * Message ID that will be used to trigger tasks execution.
 *
 * Multiple ivi instances in one document doesn't work for many reasons, so we just use the same uuid as a message ID.
 */
const TASK_MESSAGE = __IVI_BROWSER__ ? "06526c5c-2dcc-4a4e-a86c-86f5dea6319d" : undefined;

if (__IVI_BROWSER__) {
    // Task scheduler based on postMessage
    window.addEventListener("message", handleWindowMessage);
}

/**
 * Task scheduler event handler.
 *
 * @param ev Message event.
 */
function handleWindowMessage(ev: MessageEvent): void {
    if (ev.source === window && ev.data === TASK_MESSAGE) {
        runTasks();
    }
}

function runTasks(): void {
    _pending = false;

    const tasks = _tasks;
    _tasks = [];
    for (let i = 0; i < tasks.length; i++) {
        tasks[i]();
    }

    incrementClock();
}

/**
 * Trigger tasks execution.
 */
function requestTaskExecution(): void {
    if (_pending === false) {
        _pending = true;
        postMessage(TASK_MESSAGE, "*");
    }
}

/**
 * Add task to the task queue.
 *
 * @param task
 */
export function scheduleTask(task: () => void): void {
    if (__IVI_BROWSER__) {
        requestTaskExecution();
        _tasks.push(task);
    }
}
