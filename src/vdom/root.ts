import { Context } from "../common/types";
import { USER_AGENT, UserAgentFlags } from "../common/user_agent";
import { NOOP } from "../common/noop";
import { nextFrame, syncFrameUpdate } from "../scheduler/frame";
import { SyncFlags } from "./flags";
import { VNode } from "./vnode";
import { $t } from "./vnode_dom";
import { renderVNode, syncVNode, removeVNode, augmentVNode, updateComponents } from "./implementation";

/**
 * Root.
 */
export interface Root {
    container: Element;
    currentVNode: VNode<any> | null;
    newVNode: VNode<any> | null;
    invalidated: boolean;
    syncFlags: SyncFlags;
}

/**
 * Array of registered root nodes.
 */
export const ROOTS = [] as Root[];

/**
 * Empty Context object.
 */
const EMPTY_CONTEXT: Context = {};

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

let _pendingUpdate = false;
let _globalSyncFlags: SyncFlags = 0;

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
            const syncFlags = _globalSyncFlags | root.syncFlags | SyncFlags.Attached;

            if (root.invalidated) {
                let newVNode = root.newVNode;

                if (newVNode) {
                    if (newVNode.constructor !== VNode) {
                        newVNode = $t("");
                    }
                    if (currentVNode) {
                        syncVNode(container, currentVNode, newVNode, EMPTY_CONTEXT, syncFlags);
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
                updateComponents(container, currentVNode, EMPTY_CONTEXT, syncFlags);
            }
            root.syncFlags = 0;
        }
    }
}

/**
 * Render VNode into container.
 *
 * @param node VNode to render.
 * @param container DOM Node that will contain rendered node.
 * @param syncFlags Sync Flags.
 */
export function render(
    node: VNode<any> | null,
    container: Element,
    syncFlags: SyncFlags = 0,
): void {
    renderNextFrame(node, container, syncFlags);
    syncFrameUpdate();
}

/**
 * Render VNode into container on the next frame.
 *
 * @param node VNode to render.
 * @param container DOM Node that will contain rendered node.
 * @param syncFlags Sync Flags.
 */
export function renderNextFrame(
    node: VNode<any> | null,
    container: Element,
    syncFlags: SyncFlags = 0,
): void {
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
        root.invalidated = true;
        root.syncFlags = syncFlags;
    } else {
        root = {
            container: container,
            currentVNode: null,
            newVNode: node,
            invalidated: true,
            syncFlags: syncFlags,
        };
        ROOTS.push(root);
    }

    updateNextFrame();
}

/**
 * Update dirty components.
 *
 * @param syncFlags Sync Flags.
 */
export function update(syncFlags?: SyncFlags) {
    updateNextFrame(syncFlags);
    syncFrameUpdate();
}

/**
 * Update dirty components on the next frame.
 *
 * @param syncFlags Sync Flags.
 */
export function updateNextFrame(syncFlags: SyncFlags = 0) {
    _globalSyncFlags = syncFlags;
    if (!_pendingUpdate) {
        _pendingUpdate = true;
        nextFrame().write(_update);
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
        ROOTS.push({
            container: container,
            currentVNode: node,
            newVNode: null,
            invalidated: false,
            syncFlags: 0,
        });

        nextFrame().write(function augment() {
            augmentVNode(container, container.firstChild!, node, EMPTY_CONTEXT);
            iOSFixEventBubbling(container);
        });

        syncFrameUpdate();
    }
}
