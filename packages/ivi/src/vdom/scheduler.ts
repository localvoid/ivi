import { IOS_GESTURE_EVENT } from "../core/feature_detection";
import { NOOP } from "../core/noop";
import { unorderedArrayDelete } from "../core/array";
import { catchError } from "../core/error";
import { checkNestingViolations } from "../debug/html_nesting_rules";
import { InvalidateFlags, UpdateFunction } from "./invalidate";
import { VNode } from "./vnode";
import { _render, _sync, _remove, _dirtyCheck } from "./sync";
import { ROOTS, findRoot } from "./root";
import { Component } from "./component";

/**
 * Update function.
 */
let _update: UpdateFunction;

/**
 * Dirty flags:
 *
 * 1 << 0 - Running dirty check
 * 1 << 1 - Pending dirty check
 */
let _dirty = 0;

/**
 * Basic synchronous invalidation handler.
 *
 * @example
 *
 *   import { setupScheduler, invalidateHandler } from "ivi";
 *
 *   setupScheduler(invalidateHandler);
 */
export const updateHandler = catchError(() => {
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
 *   import { setupScheduler, updateHandler } from "ivi";
 *
 *   setupScheduler(updateHandler);
 *
 * @param updateFn - Update handler
 */
export function setupScheduler(updateFn: UpdateFunction): void {
  _update = updateFn;
}

/**
 * Invalidate view.
 */
export function update(flags?: InvalidateFlags): void {
  /* istanbul ignore else */
  if (DEBUG) {
    if (_update === void 0) {
      throw new Error(`Scheduler hasn't been configured`);
    }
  }
  _update(flags);
}

/**
 * Invalidate component.
 *
 * @param c - Component instance
 * @param flags - See {@link InvalidateFlags} for details.
 */
export function invalidate<P>(c: Component<P>, flags?: InvalidateFlags): void {
  /* istanbul ignore else */
  if (DEBUG) {
    if (_update === void 0) {
      throw new Error(`Scheduler hasn't been configured`);
    }
  }
  c.dirty = true;
  _update(flags);
}

/**
 * Side effect queue.
 */
const _effects = [] as Array<() => void>;

/**
 * effect adds a function to the side effect queue. Side effect queue is flushed after dirty checking.
 *
 * @param fn - Function.
 */
export function effect(fn: () => void): void {
  _effects.push(fn);
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
        _sync(container, current, next, false);
      } else {
        _render(container, null, next);
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
        _dirtyCheck(container, current, false);
      }
    }

    /* istanbul ignore else */
    if (DEBUG) {
      if (root.current) {
        checkNestingViolations(container, root.current);
      }
    }
  }

  const tasks = _effects;
  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      tasks[i]();
    }
    _effects.length = 0;
  }
}

/**
 * Render virtual DOM node into the container.
 *
 * @param next - Virtual DOM node to render
 * @param container - DOM Node that will contain rendered node
 * @param flags - See {@link InvalidateFlags} for details
 */
export function render(next: VNode | null, container: Element, flags?: InvalidateFlags): void {
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

  update(flags);
}
