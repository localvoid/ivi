import { incrementClock } from "./clock";

let _pending = false;
let _microtasks: (() => void)[] = [];
const microtaskNode = __IVI_BROWSER__ ? document.createTextNode("") : undefined;
let _microtaskToggle = 0;

if (__IVI_BROWSER__) {
    // Microtask scheduler based on mutation observer
    const microtaskObserver = new MutationObserver(runMicrotasks);
    microtaskObserver.observe(microtaskNode!, { characterData: true });
}

function runMicrotasks(): void {
    while (_microtasks.length > 0) {
        const tasks = _microtasks;
        _microtasks = [];
        for (let i = 0; i < tasks.length; i++) {
            tasks[i]();
        }
        incrementClock();
    }

    _pending = false;
}

/**
 * Trigger microtasks execution.
 */
function requestMicrotaskExecution(): void {
    if (!_pending) {
        _pending = true;
        if (__IVI_BROWSER__) {
            _microtaskToggle ^= 1;
            microtaskNode!.nodeValue = _microtaskToggle ? "1" : "0";
        } else {
            process.nextTick(runMicrotasks);
        }
    }
}

/**
 * Add task to the microtask queue.
 *
 * @param task
 */
export function scheduleMicrotask(task: () => void): void {
    requestMicrotaskExecution();
    _microtasks.push(task);
}
