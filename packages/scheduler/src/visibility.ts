import { scheduleMicrotask } from "./microtask";

let _visible = true;
let _isHidden: () => boolean;
const _visibilityObservers: ((visible: boolean) => void)[] = [];
let _lock = false;

export function isVisible(): boolean {
  return _visible;
}

export function addVisibilityObserver(observer: (visible: boolean) => void): void {
  _visibilityObservers!.push(observer);
}

export function removeVisibilityObserver(observer: (visible: boolean) => void): void {
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
