import { USER_AGENT, UserAgentFlags, NOOP, isTestEnvironment, addTestResetTask } from "ivi-core";
import { nextFrameWrite, triggerNextFrame } from "ivi-scheduler";
import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";
import { renderVNode, syncVNode, removeVNode, dirtyCheck } from "./implementation";

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

function reset() {
  ROOTS.length = 0;
  _pendingUpdate = false;
}

/**
 * Find Root node in container.
 *
 * @param container DOM Node that contains root node.
 * @returns root node or undefined when root node doesn't exist.
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
 * Fix for the Mouse Event bubbling on iOS devices.
 *
 * #quirks
 *
 * http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
 */
function iOSFixEventBubbling(container: Element): void {
  if (USER_AGENT & UserAgentFlags.iOS) {
    (container as HTMLElement).onclick = NOOP;
  }
}

/**
 * Update root nodes.
 */
function _update() {
  if (_pendingUpdate) {
    _pendingUpdate = false;
    for (let i = 0; i < ROOTS.length; ++i) {
      const root = ROOTS[i];
      const container = root.container;
      const currentVNode = root.currentVNode;

      if (root.invalidated) {
        let newVNode = root.newVNode;

        if (newVNode) {
          if (newVNode.constructor !== VNode) {
            newVNode = new VNode(VNodeFlags.Text, null, null, void 0, "");
          }
          if (currentVNode) {
            syncVNode(container, currentVNode, newVNode, EMPTY_CONTEXT, false);
          } else {
            renderVNode(container, null, newVNode!, EMPTY_CONTEXT);
            iOSFixEventBubbling(container);
          }
          root.currentVNode = newVNode;
        } else if (currentVNode) {
          removeVNode(container, currentVNode);
          const last = ROOTS.pop();
          if (last !== root && ROOTS.length) {
            ROOTS[ROOTS.indexOf(root)] = last!;
          }
        }

        root.newVNode = null;
        root.invalidated = false;
      } else if (currentVNode) {
        dirtyCheck(container, currentVNode, EMPTY_CONTEXT, false);
      }
    }
  }
}

/**
 * Render VNode into container.
 *
 * @param node VNode to render.
 * @param container DOM Node that will contain rendered node.
 */
export function render(
  node: VNode | null,
  container: Element,
): void {
  renderNextFrame(node, container);
  triggerNextFrame();
}

/**
 * Render VNode into container on the next frame.
 *
 * @param node VNode to render.
 * @param container DOM Node that will contain rendered node.
 */
export function renderNextFrame(
  node: VNode | null,
  container: Element,
): void {
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
    root.newVNode = node;
    root.invalidated = true;
  } else {
    ROOTS.push({
      container: container,
      currentVNode: null,
      newVNode: node,
      invalidated: true,
    });
    if (DEBUG) {
      if (isTestEnvironment()) {
        addTestResetTask(reset);
      }
    }
  }

  updateNextFrame();
}

/**
 * update updates dirty components.
 */
export function update() {
  updateNextFrame();
  triggerNextFrame();
}

/**
 * updateNextFrame adds a task to update dirty components that will be executed at the next frame.
 */
export function updateNextFrame() {
  if (!_pendingUpdate) {
    _pendingUpdate = true;
    nextFrameWrite(_update);
  }
}
