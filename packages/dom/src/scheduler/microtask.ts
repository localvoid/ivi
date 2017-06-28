import { USER_AGENT, UserAgentFlags } from "ivi-core";
import { incrementClock } from "./clock";

let _pending = false;
let _microtasks: (() => void)[] = [];
let _microtaskNode: Text;
let _microtaskToggle = 0;

if (__IVI_BROWSER__) {
    if (!(USER_AGENT & UserAgentFlags.iOSStandalone)) {
        const microtaskObserver = new MutationObserver(runMicrotasks);
        _microtaskNode = document.createTextNode("");
        microtaskObserver.observe(_microtaskNode, { "characterData": true });
    }
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
    if (_pending === false) {
        _pending = true;
        _microtaskToggle ^= 1;
        _microtaskNode.nodeValue = _microtaskToggle ? "1" : "0";
    }
}

/**
 * Add task to the microtask queue.
 *
 * @param task
 */
export function scheduleMicrotask(task: () => void): void {
    if (__IVI_BROWSER__) {
        requestMicrotaskExecution();
        _microtasks.push(task);
    }
}
