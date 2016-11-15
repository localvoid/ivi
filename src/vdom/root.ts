import { USER_AGENT, UserAgentFlags } from "../common/user_agent";
import { NOOP } from "../common/noop";
import { Context, ROOT_CONTEXT } from "./context";
import { VNode } from "./vnode";
import { renderVNode, syncVNode, removeVNode, augmentVNode } from "./implementation";

/**
 * Root.
 */
export interface Root {
    container: Element;
    vNode: VNode<any>;
    domNode: Node;
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
 * Render VNode into container.
 *
 * @param node VNode to render.
 * @param container DOM Node that will contain rendered node.
 * @param context root context, all root contexts should be created from the `ROOT_CONTEXT` instance.
 * @returns rendered Node.
 */
export function render<T extends Node>(
    node: VNode<any> | null,
    container: Element,
    context: Context = ROOT_CONTEXT,
): T | undefined {
    if (__IVI_DEV__) {
        if (container === document.body) {
            throw new Error("Rendering in the <body> aren't allowed because of browsers bugs that can't be solved " +
                +"when root container is a body element.");
        }
    }

    let result: Node | undefined;
    const root = findRoot(container);
    if (node) {
        if (root) {
            result = syncVNode(container, root.vNode, node, context);
            root.vNode = node;
            root.domNode = result;
        } else {
            result = renderVNode(container, null, node, context);
            roots.push({
                container: container,
                vNode: node,
                domNode: result,
            });
            /**
             * Fix for the Mouse Event bubbling on iOS devices.
             *
             * http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
             */
            if (USER_AGENT & UserAgentFlags.iOS) {
                (container as HTMLElement).onclick = NOOP;
            }
        }
    } else if (root) {
        removeVNode(container, root.vNode);
        const last = roots.pop();
        if (last !== root && roots.length) {
            roots[roots.indexOf(root)] = last!;
        }
        result = root.domNode;
    }

    return result as T | undefined;
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
            throw new Error("Rendering in the <body> aren't allowed because of browsers bugs that can't be solved " +
                +"when root container is a body element.");
        }
    }

    if (node) {
        augmentVNode(container, container.firstChild!, node, context);
        roots.push({
            container: container,
            vNode: node,
            domNode: container.firstChild!,
        });
        /**
         * Fix for the Mouse Event bubbling on iOS devices.
         *
         * http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
         */
        if (USER_AGENT & UserAgentFlags.iOS) {
            (container as HTMLElement).onclick = NOOP;
        }
    }
}
