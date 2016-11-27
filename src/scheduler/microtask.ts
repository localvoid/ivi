import { USER_AGENT, UserAgentFlags } from "../common/user_agent";
import { NOOP } from "../common/noop";
import { incrementClock } from "./clock";
import { scheduleTask } from "./task";

let _pending = false;
let _microtasks: (() => void)[] = [];
let _microtaskNode: Text;
let _microtaskToggle = 0;

if (__IVI_BROWSER__) {
    if (!(USER_AGENT & UserAgentFlags.iOSStandalone)) {
        const microtaskObserver = new MutationObserver(runMicrotasks);
        _microtaskNode = document.createTextNode("");
        microtaskObserver.observe(_microtaskNode, { characterData: true });
    }
}

function runMicrotasksInPromise(): void {
    runMicrotasks();
    /**
     * #quirks
     *
     * Flush microtask queue.
     * - iOS 8.3+
     * - UIWebView 9.3.3+
     *
     * This function is running only on this browsers, so there is no need for an additional check.
     */
    scheduleTask(NOOP);
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
            /**
             * #quirks
             *
             * Following browsers have problems with microtasks implementation based on `MutationObserver`:
             * - iOS 8.3+(full screen mode `navigator.standalone`)
             * - UIWebView 9.3.3+
             *
             * Mutation events do not fire when code is executed in touch event context.
             */
            if (USER_AGENT & UserAgentFlags.iOSStandalone) {
                Promise.resolve().then(runMicrotasksInPromise);
            } else {
                _microtaskToggle ^= 1;
                _microtaskNode.nodeValue = _microtaskToggle ? "1" : "0";
            }
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
