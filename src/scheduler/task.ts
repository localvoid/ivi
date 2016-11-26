import { incrementClock } from "./clock";

let _pending = false;
let _tasks: (() => void)[] = [];

const TASK_MESSAGE = __IVI_BROWSER__ ? "__ivi" + Math.random() : undefined;

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

    let tasks = _tasks;
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
    if (!_pending) {
        _pending = true;
        if (__IVI_BROWSER__) {
            window.postMessage(TASK_MESSAGE, "*");
        } else {
            setImmediate(runTasks);
        }
    }
}

/**
 * Add task to the task queue.
 *
 * @param task
 */
export function scheduleTask(task: () => void): void {
    requestTaskExecution();
    _tasks.push(task);
}
