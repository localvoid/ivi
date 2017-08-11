import { DEV } from "ivi-vars";
import { Context, USER_AGENT, UserAgentFlags, NOOP, isTestEnvironment, addTestResetTask } from "ivi-core";
import { nextFrameWrite, triggerNextFrame } from "ivi-scheduler";
import { SyncFlags, VNodeFlags } from "./flags";
import { VNode } from "./vnode";
import { renderVNode, syncVNode, removeVNode, augmentVNode, updateComponents } from "./implementation";

/**
 * Root.
 */
export interface Root {
  container: Element;
  currentVNode: VNode<any> | null;
  newVNode: VNode<any> | null;
  invalidated: boolean;
}

/**
 * Array of registered root nodes.
 */
export const ROOTS = [] as Root[];

/**
 * Empty Context object.
 */
const EMPTY_CONTEXT: Context = {};

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
  for (let i = 0; i < ROOTS.length; i++) {
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
    for (let i = 0; i < ROOTS.length; i++) {
      const root = ROOTS[i];
      const container = root.container;
      const currentVNode = root.currentVNode;

      if (root.invalidated) {
        let newVNode = root.newVNode;

        if (newVNode) {
          if (newVNode.constructor !== VNode) {
            newVNode = new VNode(VNodeFlags.Text, null, null, null, "");
          }
          if (currentVNode) {
            syncVNode(container, currentVNode, newVNode, EMPTY_CONTEXT, SyncFlags.Attached);
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
        updateComponents(container, currentVNode, EMPTY_CONTEXT, SyncFlags.Attached);
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
  node: VNode<any> | null,
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
  node: VNode<any> | null,
  container: Element,
): void {
  if (DEV) {
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
    if (DEV) {
      if (isTestEnvironment()) {
        addTestResetTask(reset);
      }
    }
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
 * Update dirty components on the next frame.
 */
export function updateNextFrame() {
  if (!_pendingUpdate) {
    _pendingUpdate = true;
    nextFrameWrite(_update);
  }
}

/**
 * Augment existing DOM tree with a Virtual DOM tree.
 *
 * Augmentation is separated from `render` function to reduce code size when web application doesn't use augmentation.
 * Optimizing javascript compiler should remove all code associated with augmentation when it isn't used.
 *
 * @param node Root VNode.
 * @param container Container DOM Node.
 */
export function augment(
  node: VNode<any> | null,
  container: Element,
): void {
  if (DEV) {
    if (container === document.body) {
      throw new Error("Rendering in the <body> aren't allowed, create an element inside body that will contain " +
        "your application.");
    }
    if (!document.body.contains(container)) {
      throw new Error("Container element should be attached to the document.");
    }

    if (findRoot(container)) {
      throw new Error("Failed to augment, container is associated with a Virtual DOM.");
    }
  }

  if (node) {
    ROOTS.push({
      container: container,
      currentVNode: node,
      newVNode: null,
      invalidated: false,
    });
    if (DEV) {
      if (isTestEnvironment()) {
        addTestResetTask(reset);
      }
    }

    nextFrameWrite(function augmentNextFrame() {
      augmentVNode(container, container.firstChild!, node, EMPTY_CONTEXT);
      iOSFixEventBubbling(container);
    });

    triggerNextFrame();
  }
}
