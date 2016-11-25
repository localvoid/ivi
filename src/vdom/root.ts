import { USER_AGENT, UserAgentFlags } from "../common/user_agent";
import { NOOP } from "../common/noop";
import { nextFrame, syncFrameUpdate } from "../scheduler/scheduler";
import { Context, ROOT_CONTEXT } from "./context";
import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";
import { Component, getDOMInstanceFromComponent } from "./component";
import { renderVNode, syncVNode, removeVNode, augmentVNode } from "./implementation";

/**
 * Root.
 */
export interface Root {
    container: Element;
    currentVNode: VNode<any> | null;
    newVNode: VNode<any> | null;
    newContext: Context | null;
    domNode: Node | null;
    invalidated: boolean;
}

const roots = [] as Root[];

/**
 * Find Root node in container.
 *
 * @param container DOM Node that contains root node.
 * @returns root node or undefined when root node doesn't exist.
 */
export function findRoot(container: Element): Root | undefined {
    for (let i = 0; i < roots.length; i++) {
        const r = roots[i];
        if (r.container === container) {
            return r;
        }
    }

    return;
}

/**
  * Fix for the Mouse Event bubbling on iOS devices.
  *
  * http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
  */
function iOSFixEventBubbling(container: Element): void {
    if (USER_AGENT & UserAgentFlags.iOS) {
        (container as HTMLElement).onclick = NOOP;
    }
}

/**
 * Render VNode into container.
 *
 * @param root Root data.
 * @returns rendered Node.
 */
function _render(root: Root): void {
    const currentVNode = root.currentVNode;
    const newVNode = root.newVNode;

    if (newVNode) {
        let instance;
        if (currentVNode) {
            instance = syncVNode(root.container, currentVNode, newVNode, root.newContext!);
        } else {
            instance = renderVNode(root.container, null, newVNode!, root.newContext!);
            iOSFixEventBubbling(root.container);
        }
        root.currentVNode = newVNode;
        root.domNode = (newVNode._flags & VNodeFlags.ComponentClass) ?
            getDOMInstanceFromComponent(instance as Component<any>) :
            instance as Node;
    } else if (currentVNode) {
        removeVNode(root.container, currentVNode);
        const last = roots.pop();
        if (last !== root && roots.length) {
            roots[roots.indexOf(root)] = last!;
        }
    }

    root.newVNode = null;
    root.newContext = null;
    root.invalidated = false;
}

/**
 * Render VNode into container.
 *
 * @param node VNode to render.
 * @param container DOM Node that will contain rendered node.
 * @param context root context, all root contexts should be created from the `ROOT_CONTEXT` instance.
 */
export function render(node: VNode<any> | null, container: Element, context: Context = ROOT_CONTEXT): void {
    renderNextFrame(node, container, context);
    syncFrameUpdate();
}

/**
 * Render VNode into container on the next frame.
 *
 * @param node VNode to render.
 * @param container DOM Node that will contain rendered node.
 * @param context root context, all root contexts should be created from the `ROOT_CONTEXT` instance.
 * @returns rendered Node.
 */
export function renderNextFrame(node: VNode<any> | null, container: Element, context: Context = ROOT_CONTEXT): void {
    if (__IVI_DEV__) {
        if (container === document.body) {
            throw new Error("Rendering in the <body> aren't allowed, create an element inside body that will contain " +
                "your application.");
        }
        if (!document.body.contains(container)) {
            throw new Error("Container element should be attached to the document.");
        }
    }

    let root = findRoot(container);
    if (root) {
        root.newVNode = node;
        root.newContext = context;
    } else {
        root = {
            container: container,
            currentVNode: null,
            newVNode: node,
            newContext: context,
            domNode: null,
            invalidated: false,
        } as Root;
        roots.push(root);
    }
    if (!root.invalidated) {
        root.invalidated = true;
        nextFrame().write(function () {
            if (root!.invalidated) {
                _render(root!);
            }
        });
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
 * @param context root context, all root contexts should be created from the `ROOT_CONTEXT` instance.
 */
export function augment(node: VNode<any> | null, container: Element, context: Context = ROOT_CONTEXT): void {
    if (__IVI_DEV__) {
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
        roots.push({
            container: container,
            currentVNode: node,
            newVNode: null,
            newContext: null,
            domNode: container.firstChild!,
            invalidated: false,
        });

        nextFrame().write(function augment() {
            augmentVNode(container, container.firstChild!, node, context);
            iOSFixEventBubbling(container);
        });

        syncFrameUpdate();
    }
}
