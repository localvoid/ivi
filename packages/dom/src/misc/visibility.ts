
import { scheduleMicrotask } from "../scheduler/microtask";

let _visible = true;
let _isHidden: () => boolean;
const _visibilityObservers: ((visible: boolean) => void)[] | undefined = (__IVI_BROWSER__) ? [] : undefined;
let _lock = false;

export function isVisible(): boolean {
    if (__IVI_BROWSER__) {
        return _visible;
    }
    return false;
}

export function addVisibilityObserver(observer: (visible: boolean) => void): void {
    if (__IVI_BROWSER__) {
        _visibilityObservers!.push(observer);
    }
}

export function removeVisibilityObserver(observer: (visible: boolean) => void): void {
    if (__IVI_BROWSER__) {
        if (_lock) {
            scheduleMicrotask(function () {
                removeVisibilityObserver(observer);
            });
        } else {
            const index = _visibilityObservers!.indexOf(observer);
            if (index > -1) {
                if (index === _visibilityObservers!.length) {
                    _visibilityObservers!.pop();
                } else {
                    _visibilityObservers![index] = _visibilityObservers!.pop()!;
                }
            }
        }
    }
}

function handleVisibilityChange(): void {
    const newVisible = !_isHidden();
    if (_visible !== newVisible) {
        _lock = true;
        for (let i = 0; i < _visibilityObservers!.length; i++) {
            _visibilityObservers![i](newVisible);
        }
        _lock = false;
    }
}

if (__IVI_BROWSER__) {
    if (typeof document["hidden"] !== "undefined") {
        _isHidden = function () {
            return document.hidden;
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
    } else if (typeof (document as any)["webkitHidden"] !== "undefined") {
        /**
         * #quirks
         *
         * Android 4.4
         */
        _isHidden = function () {
            return (document as any)["webkitHidden"];
        };
        document.addEventListener("webkitvisibilitychange", handleVisibilityChange);
    } else {
        _isHidden = function () {
            return true;
        };
    }
    _visible = !_isHidden();
}
