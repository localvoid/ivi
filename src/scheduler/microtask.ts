import { FEATURES, FeatureFlags } from "../common/feature_detection";
import { NOOP } from "../common/noop";
import { incrementClock } from "./clock";

let _pending = false;
let _microtasks: (() => void)[] = [];
let _microtaskNode: Text;
let _microtaskToggle = 0;

if (__IVI_BROWSER__) {
    if (!(FEATURES & FeatureFlags.NativePromise)) {
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
     * And again broken UIWebView, flush microtask queue with a `setTimeout` hack.
     */
    setTimeout(NOOP);
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
             * Microtask queue based on `MutationObserver` has some serious problems in UIWebView >= 9.3.3 when
             * mutation events are fired inside touch event contexts. It stops firing events after several recursive
             * events.
             */
            if (FEATURES & FeatureFlags.NativePromise) {
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
