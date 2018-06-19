import { IOS_GESTURE_EVENT, NOOP, unorderedArrayDelete, catchError } from "ivi-core";
import { InvalidateFlags, InvalidateFunction } from "./invalidate";
import { VNode } from "./vnode";
import { _render, _sync, _remove, _dirtyCheck } from "./implementation";
import { ROOTS, findRoot } from "./root";
import { checkNestingViolations } from "../dev_mode/html_nesting_rules";

/**
 * Invalidate function.
 */
let _invalidate: InvalidateFunction;

/**
 * Empty Context object.
 */
const EMPTY_CONTEXT = {};

/**
 * Dirty flags:
 *
 * 1 << 0 - Running dirty check
 * 1 << 1 - Pending dirty check
 */
let _dirty = 0;

/**
 * Basic synchronous invalidation handler.
 */
export const invalidateHandler = catchError(() => {
  _dirty |= 2;
  while (_dirty === 2) {
    _dirty >>= 1;
    dirtyCheck();
    _dirty ^= 1;
  }
});

/**
 * Set up scheduler.
 *
 * @example
 *
 *   import { setupScheduler, invalidateHandler } from "ivi";
 *
 *   setupScheduler(invalidateHandler);
 *
 * @param invalidateFn - Invalidate handler
 */
export function setupScheduler(invalidateFn: InvalidateFunction): void {
  _invalidate = invalidateFn;
}

/**
 * Invalidate view.
 */
export function invalidate(flags?: InvalidateFlags): void {
  /* istanbul ignore else */
  if (DEBUG) {
    if (_invalidate === void 0) {
      throw new Error(`Scheduler hasn't been configured`);
    }
  }
  _invalidate(flags);
}

/**
 * Performs a dirty checking.
 */
export function dirtyCheck() {
  for (let i = 0; i < ROOTS.length; ++i) {
    const root = ROOTS[i];
    const { container, current, next } = root;
    root.next = void 0;

    if (next) {
      if (current) {
        _sync(container, current, next, EMPTY_CONTEXT, false);
      } else {
        _render(container, null, next, EMPTY_CONTEXT);
        /* istanbul ignore if */
        /**
         * Fix for the Mouse Event bubbling on iOS devices.
         *
         * #quirks
         *
         * http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
         */
        if (TARGET === "browser" && IOS_GESTURE_EVENT) {
          (container as HTMLElement).onclick = NOOP;
        }
      }
      root.current = next;
    } else if (current) {
      if (next === null) {
        _remove(container, current);
        unorderedArrayDelete(ROOTS, ROOTS.indexOf(root));
        --i;
      } else {
        _dirtyCheck(container, current, EMPTY_CONTEXT, false);
      }
    }

    /* istanbul ignore else */
    if (DEBUG) {
      if (root.current) {
        checkNestingViolations(container, root.current);
      }
    }
  }
}

/**
 * Render virtual DOM node into the container.
 *
 * @param next - Virtual DOM node to render
 * @param container - DOM Node that will contain rendered node
 */
export function render(next: VNode | null, container: Element): void {
  /* istanbul ignore else */
  if (DEBUG) {
    /**
     * Rendering into the <body> element is disabled to make it possible to fix iOS quirk with click events.
     */
    if (container === document.body) {
      throw new Error("Rendering into the <body> element aren't allowed");
    }
    if (!document.body.contains(container)) {
      throw new Error("Container element should be attached to the document");
    }
  }

  const root = findRoot(container);
  if (root) {
    root.next = next;
  } else {
    ROOTS.push({ container, next, current: null });
  }

  invalidate();
}
