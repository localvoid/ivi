import { IOS_GESTURE_EVENT, NOOP, unorderedArrayDelete } from "ivi-core";
import { VNode } from "./vnode";
import { _render, _sync, _remove, _dirtyCheck } from "./implementation";
import { checkNestingViolations } from "../dev_mode/html_nesting_rules";

/**
 * Root.
 */
export interface Root {
  /**
   * Container element.
   */
  container: Element;
  /**
   * Next virtual DOM node.
   */
  next: VNode | null | undefined;
  /**
   * Current virtual DOM node.
   */
  current: VNode | null;
}

/**
 * Root nodes.
 */
export const ROOTS = [] as Root[];

/**
 * Find Root node in container.
 *
 * @param container - DOM Node that contains root node
 * @returns root node or undefined when root node doesn't exist
 */
export function findRoot(container: Element): Root | void {
  for (const root of ROOTS) {
    if (root.container === container) {
      return root;
    }
  }
}

let _invalidate = dirtyCheck;

export function setupScheduler(invalidateFn: () => void) {
  _invalidate = invalidateFn;
}

export function invalidate(): void {
  _invalidate();
}

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
 * Performs a dirty checking.
 */
export function dirtyCheck() {
  _dirty |= 2;
  while (_dirty === 2) {
    _dirty >>= 1;
    for (let i = 0; i < ROOTS.length; ++i) {
      const root = ROOTS[i];
      const container = root.container;
      const prev = root.current;
      const next = root.next;
      root.next = void 0;

      if (next) {
        if (prev) {
          _sync(container, prev, next, EMPTY_CONTEXT, false);
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
      } else if (prev) {
        if (next === null) {
          _remove(container, prev);
          unorderedArrayDelete(ROOTS, ROOTS.indexOf(root));
          --i;
        } else {
          _dirtyCheck(container, prev, EMPTY_CONTEXT, false);
        }
      }

      /* istanbul ignore else */
      if (DEBUG) {
        if (root.current) {
          checkNestingViolations(container, root.current);
        }
      }
    }
    _dirty ^= 1;
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

  if (DEBUG) {
    try {
      invalidate();
    } catch (e) {
      _dirty = 0;
      throw e;
    }
  } else {
    invalidate();
  }
}
