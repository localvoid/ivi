
let _visible = true;
let _isHidden: () => boolean;
let _nextVisibilityObserver: VisibilityObserver | null = null;
let _currentVisibilityObserver: VisibilityObserver | null = null;

export function isVisible(): boolean {
    if (__IVI_BROWSER__) {
        return _visible;
    }
    return false;
}

export const enum VisibilityObserverFlags {
    Canceled = 1,
}

export class VisibilityObserver {
    flags: VisibilityObserverFlags;
    readonly callback: (visible: boolean) => void;
    _prev: VisibilityObserver | null;
    _next: VisibilityObserver | null;

    constructor(callback: (visible: boolean) => void) {
        this.flags = 0;
        this.callback = callback;
        this._prev = null;
        this._next = null;
    }

    cancel(): void {
        if (!(this.flags & VisibilityObserverFlags.Canceled)) {
            this.flags |= VisibilityObserverFlags.Canceled;
            if (_currentVisibilityObserver !== this) {
                removeVisibilityObserver(this);
            }
        }
    }
}

export function addVisibilityObserver(cb: (visible: boolean) => void): VisibilityObserver {
    const observer = new VisibilityObserver(cb);
    if (_nextVisibilityObserver) {
        _nextVisibilityObserver._prev = observer;
        observer._next = _nextVisibilityObserver;
    }
    _nextVisibilityObserver = observer;
    return observer;
}

function removeVisibilityObserver(observer: VisibilityObserver): void {
    if (observer._prev) {
        observer._prev._next = observer._next;
    } else {
        _nextVisibilityObserver = observer._next;
    }
    if (observer._next) {
        observer._next._prev = observer._prev;
    }
}

function handleVisibilityChange(): void {
    const newVisible = !_isHidden();
    if (_visible !== newVisible) {
        _visible = newVisible;
        let next = _nextVisibilityObserver;
        while (next) {
            _currentVisibilityObserver = next;
            next.callback(newVisible);
            const tmp = next._next;
            if (next.flags & VisibilityObserverFlags.Canceled) {
                removeVisibilityObserver(next);
            }
            next = tmp;
        }
        _currentVisibilityObserver = null;
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
