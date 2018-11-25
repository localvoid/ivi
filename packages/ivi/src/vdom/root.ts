import { IOS_GESTURE_EVENT } from "../core/feature_detection";
import { NOOP } from "../core/noop";
import { unorderedArrayDelete } from "../core/array";
import { checkNestingViolations } from "../debug/html_nesting_rules";
import { OpNode } from "./operations";
import { StateNode } from "./state";
import { _mount, _update, _unmount, _dirtyCheck, _resetState } from "./reconciler";

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
  next: OpNode | string | number | null | undefined;
  /**
   * Current virtual DOM node.
   */
  state: StateNode | null;
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
    const { container, state, next } = root;
    root.next = void 0;
    _resetState();

    if (next) {
      if (state) {
        root.state = _update(container, state, next);
      } else {
        root.state = _mount(container, null, next);
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
    } else if (state) {
      if (next === null) {
        _unmount(container, state);
        unorderedArrayDelete(ROOTS, root);
        --i;
      } else {
        _dirtyCheck(container, state);
      }
    }

    /* istanbul ignore else */
    if (DEBUG) {
      if (root.state) {
        checkNestingViolations(container, root.state);
      }
    }
  }
}
