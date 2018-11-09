import { IOS_GESTURE_EVENT } from "../core/feature_detection";
import { NOOP } from "../core/noop";
import { unorderedArrayDelete } from "../core/array";
import { checkNestingViolations } from "../debug/html_nesting_rules";
import { VNode } from "./vnode";
import { _render, _sync, _remove, _dirtyCheck } from "./sync";

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
 * Find root node of a container.
 *
 * @param container - DOM Node that contains root node
 * @returns root node or undefined when root node doesn't exist
 */
export const findRoot = (container: Element) => ROOTS.find((r) => r.container === container);

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
        unorderedArrayDelete(ROOTS, root);
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
}
