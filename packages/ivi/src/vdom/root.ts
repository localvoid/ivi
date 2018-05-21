import { USER_AGENT, UserAgentFlags, NOOP, unorderedArrayDelete } from "ivi-core";
import { setUpdateDOMHandler, nextFrameWrite, triggerNextFrame } from "ivi-scheduler";
import { VNode } from "./vnode";
import { renderVNode, syncVNode, removeVNode, dirtyCheck } from "./implementation";
import { checkNestingViolations } from "../dev_mode/html_nesting_rules";

/**
 * Root.
 */
export interface Root {
  container: Element;
  currentVNode: VNode | null;
  newVNode: VNode | null;
  invalidated: boolean;
}

/**
 * Root nodes.
 */
export const ROOTS = [] as Root[];

/**
 * Empty Context object.
 */
const EMPTY_CONTEXT = {};

let _pendingUpdate = false;

/**
 * Find Root node in container.
 *
 * @param container - DOM Node that contains root node
 * @returns root node or undefined when root node doesn't exist
 */
export function findRoot(container: Element): Root | undefined {
  for (let i = 0; i < ROOTS.length; ++i) {
    const r = ROOTS[i];
    if (r.container === container) {
      return r;
    }
  }

  return;
}

/**
 * Update root nodes.
 */
function _update() {
  if (_pendingUpdate) {
    _pendingUpdate = false;
    setUpdateDOMHandler(update);
    for (let i = 0; i < ROOTS.length; ++i) {
      const root = ROOTS[i];
      const container = root.container;
      const currentVNode = root.currentVNode;

      if (root.invalidated) {
        const newVNode = root.newVNode;

        if (newVNode) {
          if (currentVNode) {
            syncVNode(container, currentVNode, newVNode, EMPTY_CONTEXT, false);
          } else {
            renderVNode(container, null, newVNode!, EMPTY_CONTEXT);
            /* istanbul ignore if */
            /**
             * Fix for the Mouse Event bubbling on iOS devices.
             *
             * #quirks
             *
             * http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
             */
            if (TARGET === "browser" && (USER_AGENT & UserAgentFlags.iOS)) {
              (container as HTMLElement).onclick = NOOP;
            }
          }
          root.currentVNode = newVNode;
        } else if (currentVNode) {
          removeVNode(container, currentVNode);
          unorderedArrayDelete(ROOTS, ROOTS.indexOf(root));
          --i;
        }

        root.newVNode = null;
        root.invalidated = false;
      } else if (currentVNode) {
        dirtyCheck(container, currentVNode, EMPTY_CONTEXT, false);
      }

      /* istanbul ignore else */
      if (DEBUG) {
        if (root.currentVNode) {
          checkNestingViolations(container, root.currentVNode);
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
 * @param vnode - Virtual DOM node to render
 * @param container - DOM Node that will contain rendered node
 */
export function renderNextFrame(vnode: VNode | null, container: Element): void {
  /* istanbul ignore else */
  if (DEBUG) {
    if (container === document.body) {
      throw new Error("Rendering in the <body> aren't allowed, create an element inside body that will contain " +
        "your application.");
    }
    if (!document.body.contains(container)) {
      throw new Error("Container element should be attached to the document.");
    }
  }

  const root = findRoot(container);
  if (root) {
    root.newVNode = vnode;
    root.invalidated = true;
  } else {
    ROOTS.push({
      container: container,
      currentVNode: null,
      newVNode: vnode,
      invalidated: true,
    });
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
    _pendingUpdate = true;
    nextFrameWrite(_update);
  }
}
