import { IOS_GESTURE_EVENT, NOOP, unorderedArrayDelete } from "ivi-core";
import { setUpdateDOMHandler, nextFrameWrite, triggerNextFrame } from "ivi-scheduler";
import { VNode } from "./vnode";
import { renderVNode, syncVNode, removeVNode, dirtyCheck } from "./implementation";
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
 * Empty Context object.
 */
const EMPTY_CONTEXT = {};

let _pendingUpdate = 0;

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

/**
 * Update root nodes.
 */
function _update() {
  if (_pendingUpdate) {
    _pendingUpdate = 0;
    setUpdateDOMHandler(update);
    for (let i = 0; i < ROOTS.length; ++i) {
      const root = ROOTS[i];
      const container = root.container;
      const prev = root.current;
      const next = root.next;
      root.next = void 0;

      if (next) {
        if (prev) {
          syncVNode(container, prev, next, EMPTY_CONTEXT, false);
        } else {
          renderVNode(container, null, next, EMPTY_CONTEXT);
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
          removeVNode(container, prev);
          unorderedArrayDelete(ROOTS, ROOTS.indexOf(root));
          --i;
        } else {
          dirtyCheck(container, prev, EMPTY_CONTEXT, false);
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
}

/**
 * Render virtual DOM node into container.
 *
 * @param vnode - Virtual DOM node to render
 * @param container - DOM Node that will contain rendered node
 */
export function render(vnode: VNode | null, container: Element): void {
  renderNextFrame(vnode, container);
  triggerNextFrame();
}

/**
 * Render virtual DOM node into container on the next frame.
 *
 * @param next - Virtual DOM node to render
 * @param container - DOM Node that will contain rendered node
 */
export function renderNextFrame(next: VNode | null, container: Element): void {
  /* istanbul ignore else */
  if (DEBUG) {
    /**
     * Rendering into the <body> element is disabled to make it possible to fix iOS quirk with click events.
     */
    if (container === document.body) {
      throw new Error("Rendering in the <body> aren't allowed");
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

  updateNextFrame();
}

/**
 * Update dirty components.
 */
export function update() {
  updateNextFrame();
  triggerNextFrame();
}

/**
 * Add a task to update dirty components that will be executed at the next frame.
 */
export function updateNextFrame() {
  if (!_pendingUpdate) {
    _pendingUpdate = 1;
    nextFrameWrite(_update);
  }
}
