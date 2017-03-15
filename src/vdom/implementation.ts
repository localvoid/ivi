/**
 * DO NOT MOVE THIS FUNCTIONS TO SEPARATE MODULES!
 *
 * There are so many circular dependencies between functions in this module, so just leave it all here instead of
 * creating many circular dependencies between JS modules.
 *
 * Code in this module is working only in browser environments.
 *
 * Tags:
 *
 * #entry - Entry point, function that will be invoked just once when the reconciliation process is started with a root
 *   render, or when scheduler updates invalidated components. Entry point is a good place to inject tryCatch statements
 *   to improve stack trace messages etc.
 * #augment - Function that is used only for augmenting.
 * #component - Component related functions.
 */

import { Context } from "../common/types";
import { SVG_NAMESPACE, setInnerHTML } from "../common/dom";
import { DevModeFlags, DEV_MODE, perfMarkBegin, perfMarkEnd, getFunctionName } from "../dev_mode/dev_mode";
import {
    devModeOnError, devModeOnElementBeforeCreate, devModeOnElementCreated, devModeOnComponentCreated,
    devModeOnComponentDisposed,
} from "../dev_mode/hooks";
import {
    setInitialNestingState, pushNestingState, restoreNestingState, checkNestingViolation, nestingStateAncestorFlags,
    nestingStateParentTagName,
} from "../dev_mode/html_nesting_rules";
import {
    stackTracePushComponent, stackTracePopComponent, stackTraceReset, stackTraceAugment,
} from "../dev_mode/stack_trace";
import { VNodeFlags, ComponentFlags, SyncFlags } from "./flags";
import { IVNode, getDOMInstanceFromVNode } from "./ivnode";
import { ElementDescriptor } from "./element_descriptor";
import { ConnectDescriptor, SelectorData } from "./connect_descriptor";
import { KeepAliveHandler } from "./keep_alive";
import { ComponentClass, ComponentFunction, Component } from "./component";
import { syncDOMProps, syncClassName, syncStyle } from "./sync_dom";
import { setEventHandlersToDOMNode } from "../events/utils";
import { syncEvents, attachEvents, detachEvents } from "../events/sync_events";
import { autofocus } from "../scheduler/autofocus";

/**
 * Pool of perf mark ids.
 */
let perfMarkIds: string[];
let perfMarkIndex: number;

if (__IVI_DEV__) {
    if (DEV_MODE & DevModeFlags.EnableComponentPerformanceProfiling) {
        perfMarkIds = [];
        perfMarkIndex = 0;
    }
}

/**
 * Begin component perf mark.
 *
 * @param method
 * @param vnode
 */
function componentPerfMarkBegin(method: string, vnode: IVNode<any>): void {
    if (__IVI_DEV__) {
        if (DEV_MODE & DevModeFlags.EnableComponentPerformanceProfiling) {
            let id;
            if (perfMarkIndex >= perfMarkIds.length) {
                id = `ivi:` + perfMarkIndex;
                perfMarkIds.push(id);
            } else {
                id = perfMarkIds[perfMarkIndex];
            }
            perfMarkIndex++;
            perfMarkBegin(id);
        }
    }
}

/**
 * End component perf mark.
 *
 * @param method
 * @param vnode
 */
function componentPerfMarkEnd(
    method: string,
    vnode: IVNode<any>,
): void {
    if (__IVI_DEV__) {
        if (DEV_MODE & DevModeFlags.EnableComponentPerformanceProfiling) {
            const flags = vnode._flags;
            const id = perfMarkIds[--perfMarkIndex];
            if (flags & VNodeFlags.ComponentClass) {
                const cls = vnode._tag as ComponentClass<any>;
                perfMarkEnd(`${method} [C]${getFunctionName(cls)}`, id);
            } else {
                if (flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext | VNodeFlags.KeepAlive)) {
                    if (flags & VNodeFlags.Connect) {
                        const d = vnode._tag as ConnectDescriptor<any, any, any>;
                        perfMarkEnd(`${method} [+]${getFunctionName(d.select)}`, id);
                    } else if (flags & VNodeFlags.UpdateContext) {
                        perfMarkEnd(`${method} [^]`, id);
                    } else {
                        perfMarkEnd(`${method} [K]`, id);
                    }
                } else {
                    const fn = vnode._tag as ComponentFunction<any>;
                    perfMarkEnd(`${method} [F]${getFunctionName(fn)}`, id);
                }
            }
        }
    }
}

/**
 * Render VNode entry point tryCatch wrapper.
 *
 * #entry
 *
 * @param parent Parent DOM Node.
 * @param refChild Reference to the next Node, when it is `null` child will be inserted at the end.
 * @param vnode VNode.
 * @param context Current context.
 * @returns Rendered DOM Node.
 */
export function renderVNode(
    parent: Node,
    refChild: Node | null,
    vnode: IVNode<any>,
    context: Context,
): Node {
    if (__IVI_DEV__) {
        setInitialNestingState(parent as Element);

        try {
            return _renderVNode(parent, refChild, vnode, context);
        } catch (e) {
            stackTraceAugment(e);
            devModeOnError(e);
            stackTraceReset();
            throw e;
        }
    }
    return _renderVNode(parent, refChild, vnode, context);
}

/**
 * Render VNode entry point. Renders VNode into container and invokes `attached` lifecycle methods after VNode is
 * inserted into container.
 *
 * #entry
 *
 * @param parent Parent DOM Node.
 * @param refChild Reference to the next Node, when it is `null` child will be inserted at the end.
 * @param vnode VNode.
 * @param context Current context.
 * @returns Rendered DOM Node.
 */
function _renderVNode(
    parent: Node,
    refChild: Node | null,
    vnode: IVNode<any>,
    context: Context,
): Node {
    return vNodeRenderIntoAndAttach(parent, refChild, vnode, context, SyncFlags.Attached);
}

/**
 * Sync VNode entry point tryCatch wrapper.
 *
 * @param parent Parent DOM node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current context.
 * @param syncFlags Sync flags.
 */
export function syncVNode(
    parent: Node,
    a: IVNode<any>,
    b: IVNode<any>,
    context: Context,
    syncFlags: SyncFlags,
): void {
    if (__IVI_DEV__) {
        setInitialNestingState(parent as Element);

        try {
            _syncVNode(parent, a, b, context, syncFlags);
            return;
        } catch (e) {
            stackTraceAugment(e);
            devModeOnError(e);
            stackTraceReset();
            throw e;
        }
    }
    _syncVNode(parent, a, b, context, syncFlags);
}

/**
 * Sync VNode entry point. Sync VNode with a new one or replace when they aren't compatible.
 *
 * #entry
 *
 * @param parent Parent node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current context.
 * @param syncFlags Sync flags.
 */
function _syncVNode(
    parent: Node,
    a: IVNode<any>,
    b: IVNode<any>,
    context: Context,
    syncFlags: SyncFlags,
): void {
    vNodeSync(parent, a, b, context, syncFlags);
}

/**
 * Remove VNode entry point tryCatch wrapper.
 *
 * #entry
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 */
export function removeVNode(parent: Node, node: IVNode<any>): void {
    if (__IVI_DEV__) {
        try {
            _removeVNode(parent, node);
            return;
        } catch (e) {
            stackTraceAugment(e);
            devModeOnError(e);
            stackTraceReset();
            throw e;
        }
    }
    _removeVNode(parent, node);
}

/**
 * Remove VNode entry point.
 *
 * #entry
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 */
function _removeVNode(parent: Node, node: IVNode<any>): void {
    parent.removeChild(getDOMInstanceFromVNode(node)!);
    vNodeDetach(node, SyncFlags.Dispose | SyncFlags.Attached);
}

/**
 * Augment entry point tryCatch wrapper.
 *
 * #entry
 * #augment
 *
 * @param parent Parent DOM Node.
 * @param node DOM Node.
 * @param vnode Virtual DOM Node.
 * @param context Context.
 */
export function augmentVNode(
    parent: Node,
    node: Node | null,
    vnode: IVNode<any>,
    context: Context,
): void {
    if (__IVI_DEV__) {
        setInitialNestingState(parent as Element);

        try {
            _augmentVNode(parent, node, vnode, context);
            return;
        } catch (e) {
            stackTraceAugment(e);
            devModeOnError(e);
            stackTraceReset();
            throw e;
        }
    }
    _augmentVNode(parent, node, vnode, context);
}

/**
 * Augment entry point. Augments DOM tree with a Virtual DOM tree and performs attaching.
 *
 * #entry
 * #augment
 *
 * @param parent Parent DOM Node.
 * @param node DOM Node.
 * @param vnode Virtual DOM Node.
 * @param context Context.
 */
function _augmentVNode(
    parent: Node,
    node: Node | null,
    vnode: IVNode<any>,
    context: Context,
): void {
    vNodeAugment(parent, node, vnode, context);
    vNodeAttach(vnode);
}

/**
 * Update Components entry point.
 *
 * #entry
 * #component
 *
 * @param parent Parent DOM Node.
 * @param vnode Virtual DOM Node.
 * @param context Context.
 * @param syncFlags Sync Flags.
 */
export function updateComponents(
    parent: Node,
    vnode: IVNode<any>,
    context: Context,
    syncFlags: SyncFlags,
): void {
    if (__IVI_DEV__) {
        setInitialNestingState(parent as Element);

        try {
            vNodeUpdateComponents(parent, vnode, context, syncFlags | SyncFlags.DirtyComponent);
            return;
        } catch (e) {
            stackTraceAugment(e);
            devModeOnError(e);
            stackTraceReset();
            throw e;
        }
    }
    vNodeUpdateComponents(parent, vnode, context, syncFlags | SyncFlags.DirtyComponent);
}

/**
 * Recursively attach all nodes.
 *
 * @param vnode VNode.
 */
function vNodeAttach(vnode: IVNode<any>): void {
    const flags = vnode._flags;

    if (flags & VNodeFlags.Element) {
        if (flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) {
            let children = vnode._children;
            if (flags & VNodeFlags.ChildrenArray) {
                children = children as IVNode<any>[];
                for (let i = 0; i < children.length; i++) {
                    vNodeAttach(children[i]);
                }
            } else {
                vNodeAttach(children as IVNode<any>);
            }
        }
        if (vnode._events) {
            attachEvents(vnode._events);
        }
    } else if (flags & VNodeFlags.Component) {
        stackTracePushComponent(vnode);
        if (flags & VNodeFlags.ComponentClass) {
            const component = vnode._instance as Component<any>;

            if (__IVI_DEV__) {
                if (component.flags & ComponentFlags.Attached) {
                    throw new Error("Failed to attach Component: component is already attached.");
                }
            }

            component.flags |= ComponentFlags.Attached;
            component.attached();
        }
        vNodeAttach(vnode._children as IVNode<any>);
        stackTracePopComponent();
    }
}

/**
 * Recursively detach all nodes.
 *
 * @param vnode VNode.
 */
function vNodeDetach(vnode: IVNode<any>, syncFlags: SyncFlags): void {
    const flags = vnode._flags;

    if (flags & VNodeFlags.Element) {
        if (flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) {
            const children = vnode._children;
            if (flags & VNodeFlags.ChildrenArray) {
                vNodeDetachAll(children as IVNode<any>[], syncFlags);
            } else {
                vNodeDetach(children as IVNode<any>, syncFlags);
            }
        }
        if (vnode._events) {
            detachEvents(vnode._events);
        }
    } else if (flags & VNodeFlags.Component) {
        stackTracePushComponent(vnode);
        if ((flags & VNodeFlags.KeepAlive) &&
            (syncFlags & SyncFlags.Dispose) &&
            ((vnode._tag as KeepAliveHandler)(vnode._children as IVNode<any>, vnode._props))) {
            if (syncFlags & SyncFlags.Attached) {
                vNodeDetach(vnode._children as IVNode<any>, syncFlags & ~SyncFlags.Dispose);
            }
        } else {
            vNodeDetach(vnode._children as IVNode<any>, syncFlags);
            if ((flags & VNodeFlags.ComponentClass) && (syncFlags & SyncFlags.Attached)) {
                const component = vnode._instance as Component<any>;

                if (__IVI_DEV__) {
                    if (!(component.flags & ComponentFlags.Attached)) {
                        throw new Error("Failed to detach Component: component is already detached.");
                    }
                }
                component.flags &= ~ComponentFlags.Attached;
                component.detached();
                devModeOnComponentDisposed(component);
            }
        }
        stackTracePopComponent();
    }
}

/**
 * Detach all nodes and its subtrees.
 *
 * @param vnodes Array of VNodes.
 */
function vNodeDetachAll(vnodes: IVNode<any>[], syncFlags: SyncFlags): void {
    for (let i = 0; i < vnodes.length; i++) {
        vNodeDetach(vnodes[i], syncFlags);
    }
}

/**
 * Recursively update all dirty components.
 *
 * @param parent Parent DOM Node.
 * @param vnode VNode.
 * @param context New context.
 * @param syncFlags Sync flags.
 */
function vNodeUpdateComponents(
    parent: Node,
    vnode: IVNode<any>,
    context: Context,
    syncFlags: SyncFlags,
): void {
    const flags = vnode._flags;
    if (flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) {
        const p = vnode._instance as Node;
        let children = vnode._children;
        if (flags & VNodeFlags.ChildrenArray) {
            children = children as IVNode<any>[];
            for (let i = 0; i < children.length; i++) {
                vNodeUpdateComponents(p, children[i], context, syncFlags);
            }
        } else {
            vNodeUpdateComponents(p, children as IVNode<any>, context, syncFlags);
        }
    } else if (flags & VNodeFlags.Component) {
        stackTracePushComponent(vnode);
        if (flags & VNodeFlags.ComponentClass) {
            const component = vnode._instance as Component<any>;

            const cflags = component.flags;
            const oldRoot = vnode._children as IVNode<any>;

            if ((cflags & ComponentFlags.Dirty) || (syncFlags & SyncFlags.ForceUpdate)) {
                componentPerfMarkBegin("update", vnode);
                component.beforeUpdate();
                const newRoot = vnode._children = component.render();
                vNodeSync(parent, oldRoot, newRoot, context, syncFlags);
                component.flags &= ~ComponentFlags.Dirty;
                component.updated();
                componentPerfMarkEnd("update", vnode);
            } else {
                vNodeUpdateComponents(parent, oldRoot, context, syncFlags);
            }

        } else { // (flags & VNodeFlags.ComponentFunction)
            if (flags & VNodeFlags.Connect) {
                const connect = vnode._tag as ConnectDescriptor<any, any, any>;
                const prevSelectData = vnode._instance as SelectorData;
                componentPerfMarkBegin("update", vnode);
                const selectData = connect.select(prevSelectData, vnode._props, context);
                const prevChildren = vnode._children;
                vnode._children = (prevSelectData === selectData) ?
                    vnode._children :
                    connect.render(selectData.out);
                vnode._instance = selectData;
                vNodeSync(
                    parent,
                    prevChildren as IVNode<any>,
                    vnode._children as IVNode<any>,
                    context,
                    syncFlags,
                );
                componentPerfMarkEnd("update", vnode);
            } else {
                if (flags & VNodeFlags.UpdateContext) {
                    if (syncFlags & SyncFlags.DirtyContext) {
                        vnode._instance = Object.assign({}, context, vnode._props);
                    }
                    context = vnode._instance as Context;
                }
                vNodeUpdateComponents(
                    parent,
                    vnode._children as IVNode<any>,
                    context,
                    syncFlags,
                );
            }
        }
        stackTracePopComponent();
    }
}

/**
 * Move node.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to move.
 * @param nextRef Reference to the next node, if it is null, node will be moved to the end.
 */
function vNodeMoveChild(parent: Node, node: IVNode<any>, nextRef: Node | null): void {
    parent.insertBefore(getDOMInstanceFromVNode(node)!, nextRef!);
}

/**
 * Remove all children.
 *
 * `detach` lifecycle methods will be invoked for all children and their subtrees.
 *
 * @param parent Parent DOM node.
 * @param nodes Arrays of VNodes to remove.
 */
function vNodeRemoveAllChildren(parent: Node, nodes: IVNode<any>[], syncFlags: SyncFlags): void {
    parent.textContent = "";
    vNodeDetachAll(nodes, syncFlags | SyncFlags.Dispose);
}

/**
 * Remove child.
 *
 * `detach` lifecycle methods will be invoked for removed node and its subtree.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 */
function vNodeRemoveChild(parent: Node, node: IVNode<any>, syncFlags: SyncFlags): void {
    parent.removeChild(getDOMInstanceFromVNode(node)!);
    vNodeDetach(node, syncFlags | SyncFlags.Dispose);
}

/**
 * Set value for HTMLInputElement.
 *
 * When value has a string type it is assigned to `value` property, otherwise it is assigned to `checked` property.
 *
 * @param input HTMLInputElement.
 * @param value Value.
 */
function setHTMLInputValue(input: HTMLInputElement, value: string | boolean | null): void {
    if (typeof value === "string") {
        input.value = value;
    } else {
        input.checked = value as boolean;
    }
}

/**
 * Render VNode.
 *
 * @param parent Parent DOM Node.
 * @param vnode VNode to render.
 * @param context Current context.
 * @returns Rendered DOM Node.
 */
function vNodeRender(
    parent: Node,
    vnode: IVNode<any>,
    context: Context,
): Node {
    if (__IVI_DEV__) {
        if (!(vnode._flags & VNodeFlags.ComponentFunction) && vnode._instance) {
            throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
                "clone VNode with `cloneVNode`, or use immutable vnodes `vnode.immutable()` for hoisted trees.");
        }

        if (vnode._flags & VNodeFlags.Immutable) {
            throw new Error("Immutable VNodes can't be used to render trees, clone an immutable tree with a " +
                "`cloneVNode` function.");
        }
    }

    const flags = vnode._flags;
    let instance: Node | Component<any> | null = null;
    let node: Node;
    let childNode: Node;
    let i: number;
    let child: IVNode<any>;

    if (flags & (VNodeFlags.Text | VNodeFlags.Element)) {
        // Push nesting state and check for nesting violation.
        const _prevNestingStateParentTagName = nestingStateParentTagName();
        const _prevNestingStateAncestorFlags = nestingStateAncestorFlags();

        if (flags & VNodeFlags.Text) {
            pushNestingState("$t");
            checkNestingViolation();
            node = document.createTextNode(vnode._children as string);
        } else { // (flags & VNodeFlags.Element)
            pushNestingState((flags & VNodeFlags.ElementDescriptor) ?
                (vnode._tag as ElementDescriptor<any>)._tag :
                vnode._tag as string);
            checkNestingViolation();

            devModeOnElementBeforeCreate(vnode);
            if (flags & VNodeFlags.ElementDescriptor) {
                node = (vnode._tag as ElementDescriptor<any>).createElement();
            } else if (flags & VNodeFlags.InputElement) {
                if (flags & VNodeFlags.TextAreaElement) {
                    node = document.createElement("textarea");
                } else {
                    node = document.createElement("input");
                    /**
                     * #quirks
                     *
                     * It is important that we assign `type` before any other properties. IE11 will remove assigned
                     * `value` when `type` is assigned.
                     */
                    (node as HTMLInputElement).type = vnode._tag as string;
                }
            } else if (flags & VNodeFlags.SvgElement) {
                node = document.createElementNS(SVG_NAMESPACE, vnode._tag as string);
            } else {
                node = document.createElement(vnode._tag as string);
            }
            devModeOnElementCreated(vnode, node as Element);

            if (flags & VNodeFlags.Autofocus) {
                autofocus(node as Element);
            }

            if (vnode._props) {
                syncDOMProps(node as Element, flags, null, vnode._props);
            }
            if (vnode._className !== null) {
                syncClassName(node as Element, flags, null, vnode._className);
            }
            if (vnode._style !== null) {
                syncStyle(node as HTMLElement, null, vnode._style);
            }
            if (vnode._events) {
                setEventHandlersToDOMNode(node as Element, vnode._events);
            }

            let children = vnode._children;
            if (children !== null) {
                if (flags & (VNodeFlags.ChildrenBasic | VNodeFlags.ChildrenArray)) {
                    if (flags & VNodeFlags.ChildrenBasic) {
                        node.textContent = children as string;
                    } else {
                        children = children as IVNode<any>[];
                        for (i = 0; i < children.length; i++) {
                            child = children[i];
                            childNode = vNodeRender(node, child, context);
                            node.insertBefore(childNode, null);
                        }
                    }
                } else if (flags & VNodeFlags.ChildrenVNode) {
                    child = children as IVNode<any>;
                    childNode = vNodeRender(node, child, context);
                    node.insertBefore(childNode, null);
                } else if (flags & VNodeFlags.InputElement) {
                    /**
                     * #quirks
                     *
                     * It is important that input value is assigned after all properties. It prevents some issues with
                     * rounding, etc. `value` should be assigned after `step`, `min` and `max` properties.
                     */
                    setHTMLInputValue(node as HTMLInputElement, children as string | boolean);
                } else { // (flags & VNodeFlags.UnsafeHTML)
                    if (children) {
                        setInnerHTML((node as Element), children as string, !!(flags & VNodeFlags.SvgElement));
                    }
                }
            }
        }

        instance = node;
        restoreNestingState(_prevNestingStateParentTagName, _prevNestingStateAncestorFlags);
    } else { // (flags & VNodeFlags.Component)
        if (flags & VNodeFlags.ComponentClass) {
            const component = instance = new (vnode._tag as ComponentClass<any>)(vnode._props);
            devModeOnComponentCreated(component);
            stackTracePushComponent(vnode, instance);
            componentPerfMarkBegin("create", vnode);
            const root = vnode._children = component.render();
            node = vNodeRender(parent, root, context);
            componentPerfMarkEnd("create", vnode);
        } else { // (flags & VNodeFlags.ComponentFunction)
            stackTracePushComponent(vnode);
            if (flags & VNodeFlags.KeepAlive) {
                const keepAlive = vnode._tag as KeepAliveHandler;
                const prev = keepAlive(null, vnode._props);
                if (prev) {
                    vNodeSync(
                        parent,
                        prev as IVNode<any>,
                        vnode._children as IVNode<any>,
                        context,
                        SyncFlags.DirtyContext,
                    );
                    node = getDOMInstanceFromVNode(vnode._children as IVNode<any>)!;
                } else {
                    node = vNodeRender(
                        parent,
                        vnode._children as IVNode<any>,
                        context,
                    );
                }
            } else {
                if (flags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) {
                    if (flags & VNodeFlags.Connect) {
                        const connect = (vnode._tag as ConnectDescriptor<any, any, any>);
                        const selectData = vnode._instance = connect.select(null, vnode._props, context);
                        vnode._children = connect.render(selectData.out);
                    } else {
                        context = instance = Object.assign({}, context, vnode._props);
                    }
                } else {
                    componentPerfMarkBegin("create", vnode);
                    vnode._children = (vnode._tag as ComponentFunction<any>)(vnode._props);
                }
                node = vNodeRender(
                    parent,
                    vnode._children as IVNode<any>,
                    context,
                );
                if (__IVI_DEV__) {
                    if (!(flags & (VNodeFlags.UpdateContext | VNodeFlags.Connect))) {
                        componentPerfMarkEnd("create", vnode);
                    }
                }
            }
        }
        stackTracePopComponent();
    }

    vnode._instance = instance;

    return node;
}

/**
 * Render VNode into container and invoke `attached` lifecycle methods after VNode is inserted into container.
 *
 * It is important that `attached` methods are invoked only after DOM Nodes have been inserted into container, so it
 * goes twice through the entire vnode tree, first time when everything is rendered and the second time when `attached`
 * methods are invoked.
 *
 * @param parent Parent DOM Node.
 * @param refChild Reference to the next Node, when it is `null` child will be inserted at the end.
 * @param vnode VNode.
 * @param context Current context.
 * @returns Rendered DOM Node.
 */
function vNodeRenderIntoAndAttach(
    parent: Node,
    refChild: Node | null,
    vnode: IVNode<any>,
    context: Context,
    syncFlags: SyncFlags,
): Node {
    const node = vNodeRender(parent, vnode, context);
    parent.insertBefore(node, refChild);
    if (syncFlags & SyncFlags.Attached) {
        vNodeAttach(vnode);
    }
    return node;
}

/**
 * Augment DOM Node with a Virtual DOM Node.
 *
 * #augment
 *
 * @param parent Parent DOM Node.
 * @param node DOM Node.
 * @param vnode Virtual DOM Node.
 * @param context Context.
 */
function vNodeAugment(
    parent: Node,
    node: Node | null,
    vnode: IVNode<any>,
    context: Context,
): void {
    if (__IVI_DEV__) {
        if (!(vnode._flags & VNodeFlags.ComponentFunction) && vnode._instance) {
            throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
                "clone VNode with `cloneVNode`, or use immutable vnodes `vnode.immutable()` for hoisted trees.");
        }

        if (vnode._flags & VNodeFlags.Immutable) {
            throw new Error("Immutable VNodes can't be used to render trees, clone an immutable tree with a " +
                "`cloneVNode` function.");
        }
    }

    let instance: Node | Component<any> | null = null;

    if (node) {
        if (node.nodeType !== 8) { // Node.COMMENT_NODE === 8
            const flags = vnode._flags;

            if (flags & (VNodeFlags.Element | VNodeFlags.Text)) {
                // Push nesting state and check for nesting violation.
                const _prevNestingStateParentTagName = nestingStateParentTagName();
                const _prevNestingStateAncestorFlags = nestingStateAncestorFlags();

                instance = node;

                if (flags & VNodeFlags.Element) {
                    if (__IVI_DEV__) {
                        pushNestingState((flags & VNodeFlags.ElementDescriptor) ?
                            (vnode._tag as ElementDescriptor<any>)._tag :
                            vnode._tag as string);
                        checkNestingViolation();
                        if (node.nodeType !== 1) {
                            throw new Error(`Invalid node type: expected "1", actual "${node.nodeType}".`);
                        }
                        if (vnode._className) {
                            const className = (node as Element).getAttribute("class");
                            if (className !== vnode._className) {
                                throw new Error(`Invalid class name: expected "${vnode._className}", ` +
                                    `actual "${className}".`);
                            }
                        }
                        // We can't check any style properties, because browsers ignore style names they don't
                        // understand, like style names with browser specific prefixes.
                        if (vnode._children === null) {
                            if (node.hasChildNodes()) {
                                throw new Error(`Invalid children: expected "0" children, ` +
                                    `actual "${node.childNodes.length}".`);
                            }
                        }
                    }

                    if (vnode._events) {
                        setEventHandlersToDOMNode(node as Element, vnode._events);
                    }

                    if (flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) {
                        let domChild = node.firstChild;
                        if (flags & VNodeFlags.ChildrenArray) {
                            const children = vnode._children as IVNode<any>[];
                            for (let i = 0; i < children.length; i++) {
                                if (__IVI_DEV__) {
                                    if (domChild === null) {
                                        throw new Error(`Invalid children: expected to find ${children.length} ` +
                                            `children nodes.`);
                                    }
                                }
                                const next = domChild!.nextSibling;
                                vNodeAugment(node, domChild, children[i], context);
                                domChild = next;
                            }
                            if (__IVI_DEV__) {
                                if (domChild !== null) {
                                    throw new Error(`Invalid children: document contains more children nodes ` +
                                        `than expected.`);
                                }
                            }
                        } else {
                            if (__IVI_DEV__) {
                                if (domChild === null) {
                                    throw new Error(`Invalid children: expected to find 1 child node.`);
                                }
                                if (domChild.nextSibling !== null) {
                                    throw new Error(`Invalid children: document contains more children nodes ` +
                                        `than expected.`);
                                }
                            }
                            vNodeAugment(node, domChild, vnode._children as IVNode<any>, context);
                        }
                    }
                } else { // (flags & VNodeFlags.Text)
                    const children = typeof vnode._children === "number" ?
                        vnode._children.toString() :
                        vnode._children as string;

                    if (__IVI_DEV__) {
                        pushNestingState("$t");
                        checkNestingViolation();

                        if (node.nodeType !== 3) {
                            throw new Error(`Invalid node type: expected "3", actual "${node.nodeType}".`);
                        }
                        if (!node.nodeValue!.startsWith(children)) {
                            throw new Error(`Invalid text content: expected "${vnode._children}", actual ` +
                                `"${node.nodeValue!.slice(0, children.length)}".`);
                        }
                    }

                    if (node.nodeValue!.length > children.length) {
                        parent.insertBefore((node as Text).splitText(children.length), node.nextSibling);
                    }

                }

                restoreNestingState(_prevNestingStateParentTagName, _prevNestingStateAncestorFlags);
            } else { // (flags & VNodeFlags.Component)
                if (flags & VNodeFlags.ComponentClass) {
                    const component = instance = new (vnode._tag as ComponentClass<any>)(vnode._props);
                    devModeOnComponentCreated(component);
                    stackTracePushComponent(vnode, instance);
                    const root = vnode._children = component.render();
                    if (component.shouldAugment()) {
                        vNodeAugment(parent, node, root, context);
                    } else {
                        parent.replaceChild(vNodeRender(parent, root, context), node);
                    }
                } else {
                    stackTracePushComponent(vnode);
                    if (flags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) {
                        if (flags & VNodeFlags.Connect) {
                            const connect = (vnode._tag as ConnectDescriptor<any, any, any>);
                            const selectData = vnode._instance = connect.select(null, vnode._props, context);
                            vnode._children = connect.render(selectData.out);
                        } else {
                            context = instance = Object.assign({}, context, vnode._props);
                        }
                        vNodeAugment(parent, node, vnode._children as IVNode<any>, context);
                    } else {
                        const fc = vnode._tag as ComponentFunction<any>;
                        vnode._children = fc(vnode._props);
                        if (fc.shouldAugment === undefined || fc.shouldAugment(vnode._props)) {
                            vNodeAugment(parent, node, vnode._children as IVNode<any>, context);
                        } else {
                            parent.replaceChild(vNodeRender(parent, vnode._children as IVNode<any>, context), node);
                        }
                    }
                }

                stackTracePopComponent();
            }

            vnode._instance = instance;
        } else {
            parent.replaceChild(vNodeRender(parent, vnode, context), node);
        }
    } else {
        parent.insertBefore(vNodeRender(parent, vnode, context), null);
    }
}

/**
 * Check if two nodes can be synced.
 *
 * Two nodes can be synced when their flags and tags are identical.
 *
 * @param a Old VNode.
 * @param b New VNode.
 * @returns true if nodes can be synced.
 */
function vNodeCanSync(a: IVNode<any>, b: IVNode<any>): boolean {
    return (
        (a._flags & VNodeFlags.Syncable) === (b._flags & VNodeFlags.Syncable) &&
        a._tag === b._tag &&
        a._key === b._key
    );
}

/**
 * Check if two nodes has equal keys.
 *
 * @param a VNode.
 * @param b VNode.
 * @returns true if nodes has equal keys.
 */
function vNodeEqualKeys(a: IVNode<any>, b: IVNode<any>): boolean {
    return (
        a._key === b._key &&
        (a._flags & VNodeFlags.Key) === (b._flags & VNodeFlags.Key)
    );
}

/**
 * Sync two VNodes.
 *
 * When node `a` is synced with node `b`, `a` node should be considered as destroyed, and any access to it after sync
 * is an undefined behavior.
 *
 * @param parent Parent node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current context.
 * @param syncFlags Sync flags.
 */
function vNodeSync(
    parent: Node,
    a: IVNode<any>,
    b: IVNode<any>,
    context: Context,
    syncFlags: SyncFlags,
): void {
    if (__IVI_DEV__) {
        if (b._flags & VNodeFlags.Immutable) {
            throw new Error("Immutable VNodes can't be used to render trees, clone an immutable tree with a " +
                "`cloneVNode` function.");
        }
    }

    if (a === b) {
        vNodeUpdateComponents(parent, b, context, syncFlags);
        return;
    }

    if (__IVI_DEV__) {
        if (!(b._flags & VNodeFlags.ComponentFunction) && b._instance) {
            throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
                "clone VNode with `cloneVNode` function.");
        }
    }

    let instance;
    const flags = b._flags;
    if (vNodeCanSync(a, b)) {
        instance = b._instance = a._instance;

        if (flags & (VNodeFlags.Text | VNodeFlags.Element)) {
            if (flags & VNodeFlags.Text) {
                if (a._children !== b._children) {
                    (instance as Text).nodeValue = b._children as string;
                }
            } else { // (flags & VNodeFlags.Element)
                if (a._props !== b._props) {
                    syncDOMProps(instance as Element, flags, a._props, b._props);
                }
                if (a._className !== b._className) {
                    syncClassName(instance as Element, flags, a._className, b._className);
                }
                if (a._style !== b._style) {
                    syncStyle(instance as HTMLElement, a._style, b._style);
                }
                if (a._events !== b._events) {
                    if (syncFlags & SyncFlags.Attached) {
                        syncEvents(instance as Element, a._events, b._events);
                    }
                    setEventHandlersToDOMNode(instance as Element, b._events);
                }

                if (a._children !== b._children) {
                    syncChildren(
                        instance as Element,
                        a._flags,
                        flags,
                        a._children as IVNode<any>[] | IVNode<any> | string | number | boolean,
                        b._children as IVNode<any>[] | IVNode<any> | string | number | boolean,
                        context,
                        syncFlags,
                    );
                }
            }
        } else { // (flags & VNodeFlags.Component)
            stackTracePushComponent(b);
            if (flags & VNodeFlags.ComponentClass) {
                const component = instance as Component<any>;
                // Update component props
                const oldProps = a._props;
                const newProps = b._props;
                let propsChanged = false;
                if (component.isPropsChanged(oldProps, newProps)) {
                    propsChanged = true;
                    // There is no reason to call `newPropsReceived` when props aren't changed, even when they are
                    // reassigned later to reduce memory usage.
                    component.newPropsReceived(oldProps, newProps);
                }
                // Reassign props even when they aren't changed to reduce overall memory usage.
                //
                // New value always stays alive because it is referenced from virtual dom tree, so instead of keeping
                // in memory two values even when they are the same, we just always reassign it to the new value.
                component.props = newProps;

                const oldRoot = a._children as IVNode<any>;
                if (propsChanged || (component.flags & ComponentFlags.Dirty) || (syncFlags & SyncFlags.ForceUpdate)) {
                    componentPerfMarkBegin("update", a);
                    component.beforeUpdate();
                    const newRoot = b._children = component.render();
                    vNodeSync(parent, oldRoot, newRoot, context, syncFlags);
                    component.flags &= ~ComponentFlags.Dirty;
                    component.updated();
                    componentPerfMarkEnd("update", a);
                } else {
                    b._children = a._children;
                    vNodeUpdateComponents(parent, oldRoot, context, syncFlags);
                }
            } else { // (flags & VNodeFlags.ComponentFunction)
                const fn = b._tag as ComponentFunction<any>;

                if (flags & (VNodeFlags.UpdateContext | VNodeFlags.Connect | VNodeFlags.KeepAlive)) {
                    if (flags & VNodeFlags.Connect) {
                        const connect = b._tag as ConnectDescriptor<any, any, any>;
                        const prevSelectData = a._instance as SelectorData;
                        componentPerfMarkBegin("update", b);
                        const selectData = connect.select(prevSelectData, b._props, context);
                        b._children = (prevSelectData === selectData) ?
                            a._children :
                            connect.render(selectData.out);
                        b._instance = selectData;
                        vNodeSync(
                            parent,
                            a._children as IVNode<any>,
                            b._children as IVNode<any>,
                            context,
                            syncFlags,
                        );
                        componentPerfMarkEnd("update", b);
                    } else {
                        if (flags & VNodeFlags.UpdateContext) {
                            if ((syncFlags & SyncFlags.DirtyContext) || (a._props !== b._props)) {
                                syncFlags |= SyncFlags.DirtyContext;
                                context = b._instance = Object.assign({}, context, b._props);
                            } else {
                                context = b._instance = a._instance as Context;
                            }
                        }
                        vNodeSync(
                            parent,
                            a._children as IVNode<any>,
                            b._children as IVNode<any>,
                            context,
                            syncFlags,
                        );
                    }
                } else {
                    if ((syncFlags & SyncFlags.ForceUpdate) ||
                        ((a !== b) &&
                            ((!fn.isPropsChanged && a._props !== b._props) ||
                                (fn.isPropsChanged && fn.isPropsChanged(a._props, b._props))))) {
                        componentPerfMarkBegin("update", b);
                        const oldRoot = a._children as IVNode<any>;
                        const newRoot = b._children = fn(b._props);
                        vNodeSync(parent, oldRoot, newRoot, context, syncFlags);
                        componentPerfMarkEnd("update", b);
                    } else {
                        b._children = a._children;
                        vNodeUpdateComponents(parent, b._children as IVNode<any>, context, syncFlags);
                    }
                }
            }
            stackTracePopComponent();
        }
    } else {
        instance = vNodeRender(parent, b, context);
        parent.replaceChild(instance, getDOMInstanceFromVNode(a)!);
        if (syncFlags & SyncFlags.Attached) {
            vNodeDetach(a, syncFlags | SyncFlags.Dispose);
            vNodeAttach(b);
        }
    }
}

/**
 * Sync old children list with the new one.
 *
 * @param parent Parent node.
 * @param aParentFlags Old parent VNode flags.
 * @param bParentFlags New parent VNode flags.
 * @param a Old VNode list.
 * @param b New VNode list.
 * @param context Current context.
 * @param syncFlags Sync flags.
 */
function syncChildren(
    parent: Node,
    aParentFlags: VNodeFlags,
    bParentFlags: VNodeFlags,
    a: IVNode<any>[] | IVNode<any> | string | number | boolean,
    b: IVNode<any>[] | IVNode<any> | string | number | boolean,
    context: Context,
    syncFlags: SyncFlags,
): void {
    let i = 0;

    if (a === null) {
        if (bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.ChildrenArray)) {
            if (bParentFlags & VNodeFlags.ChildrenBasic) {
                parent.textContent = b as string;
            } else {
                b = b as IVNode<any>[];
                for (i = 0; i < b.length; i++) {
                    vNodeRenderIntoAndAttach(parent, null, b[i], context, syncFlags);
                }
            }
        } else if (bParentFlags & VNodeFlags.ChildrenVNode) {
            vNodeRenderIntoAndAttach(parent, null, b as IVNode<any>, context, syncFlags);
        } else if (bParentFlags & VNodeFlags.InputElement) {
            setHTMLInputValue(parent as HTMLInputElement, b as string | boolean);
        } else { // (bParentFlags & VNodeFlags.UnsafeHTML)
            if (b) {
                setInnerHTML(parent as Element, b as string, !!(bParentFlags & VNodeFlags.SvgElement));
            }
        }
    } else if (b === null) {
        if (aParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) {
            parent.textContent = "";
        } else if (aParentFlags & VNodeFlags.ChildrenArray) {
            vNodeRemoveAllChildren(parent, a as IVNode<any>[], syncFlags);
        } else if (aParentFlags & VNodeFlags.ChildrenVNode) {
            vNodeRemoveChild(parent, a as IVNode<any>, syncFlags);
        } else { // (bParentFlags & VNodeFlags.InputElement)
            /**
             * When value/checked isn't specified, we should just ignore it.
             */
        }
    } else {
        if (aParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) {
            if (bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) {
                if ((bParentFlags & VNodeFlags.ChildrenBasic) || !b) {
                    const c = parent.firstChild;
                    if (c) {
                        c.nodeValue = b as string;
                    } else {
                        parent.textContent = b as string;
                    }
                } else {
                    setInnerHTML((parent as Element), b as string, !!(bParentFlags & VNodeFlags.SvgElement));
                }
            } else {
                parent.textContent = "";
                if (bParentFlags & VNodeFlags.ChildrenArray) {
                    b = b as IVNode<any>[];
                    for (i = 0; i < b.length; i++) {
                        vNodeRenderIntoAndAttach(parent, null, b[i], context, syncFlags);
                    }
                } else {
                    vNodeRenderIntoAndAttach(parent, null, b as IVNode<any>, context, syncFlags);
                }
            }
        } else if (aParentFlags & VNodeFlags.ChildrenArray) {
            a = a as IVNode<any>[];
            if (bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) {
                if ((bParentFlags & VNodeFlags.ChildrenBasic) || !b) {
                    parent.textContent = b as string;
                } else {
                    setInnerHTML(parent as Element, b as string, !!(bParentFlags & VNodeFlags.SvgElement));
                }
                vNodeDetachAll(a, syncFlags | SyncFlags.Dispose);
            } else if (bParentFlags & VNodeFlags.ChildrenArray) {
                b = b as IVNode<any>[];
                if (a.length === 0) {
                    for (i = 0; i < b.length; i++) {
                        vNodeRenderIntoAndAttach(parent, null, b[i], context, syncFlags);
                    }
                } else {
                    if (b.length === 0) {
                        vNodeRemoveAllChildren(parent, a, syncFlags);
                    } else if (a.length === 1 && b.length === 1) {
                        vNodeSync(parent, a[0], b[0], context, syncFlags);
                    } else {
                        syncChildrenTrackByKeys(parent, a, b, context, syncFlags);
                    }
                }
            } else {
                b = b as IVNode<any>;
                if (a.length > 0) {
                    i = 0;
                    while (i < a.length) {
                        const node = a[i++];
                        if (vNodeEqualKeys(node, b)) {
                            vNodeSync(parent, node, b, context, syncFlags);
                            break;
                        } else {
                            vNodeRemoveChild(parent, node, syncFlags);
                        }
                    }
                    if (i < a.length) {
                        while (i < a.length) {
                            vNodeRemoveChild(parent, a[i++], syncFlags);
                        }
                    } else {
                        vNodeRenderIntoAndAttach(parent, null, b, context, syncFlags);
                    }
                } else {
                    vNodeRenderIntoAndAttach(parent, null, b, context, syncFlags);
                }
            }
        } else if (aParentFlags & VNodeFlags.ChildrenVNode) {
            a = a as IVNode<any>;
            if (bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) {
                if ((bParentFlags & VNodeFlags.ChildrenBasic) || !b) {
                    parent.textContent = b as string;
                } else {
                    setInnerHTML(parent as Element, b as string, !!(bParentFlags & VNodeFlags.SvgElement));
                }
                vNodeDetach(a, syncFlags | SyncFlags.Dispose);
            } else if (bParentFlags & VNodeFlags.ChildrenArray) {
                b = b as IVNode<any>[];
                if (b.length > 0) {
                    i = 0;
                    const next = getDOMInstanceFromVNode(a);
                    while (i < b.length) {
                        const node = b[i++];
                        if (vNodeEqualKeys(a, node)) {
                            vNodeSync(parent, a, node, context, syncFlags);
                            break;
                        } else {
                            vNodeRenderIntoAndAttach(parent, next, b[i], context, syncFlags);
                        }
                    }
                    if (i < b.length) {
                        while (i < b.length) {
                            vNodeRenderIntoAndAttach(parent, null, b[i++], context, syncFlags);
                        }
                    } else {
                        vNodeRemoveChild(parent, a, syncFlags);
                    }
                } else {
                    vNodeRemoveChild(parent, a, syncFlags);
                }
            } else {
                vNodeSync(parent, a, b as IVNode<any>, context, syncFlags);
            }
        } else { // (aParentFlags & VNodeFlags.InputElement)
            /**
             * Input elements has an internal state with a `value` property, so it should be checked before an
             * assignment to prevent unnecessary events when `value` is the same as the `value` in the internal
             * state.
             *
             * In general we don't want to override behaviour of DOM Elements with an internal state. Assigning props
             * to such elements should be treated as a one-time assignment, so it works almost like `value` attribute,
             * except when a new value is passed down, it can override previous value when it doesn't match the previous
             * one. There is absolutely no reasons to overcomplicate such behaviour just to make it more beatiful like
             * it is a declarative assignment and can't be changed, because in real applications, component that
             * controls this element will always track changes, and when it changes it will invalidate its
             * representation, so everything will stay in-sync.
             */
            if (typeof b === "string") {
                if ((parent as HTMLInputElement).value !== b) {
                    (parent as HTMLInputElement).value = b;
                }
            } else {
                (parent as HTMLInputElement).checked = b as boolean;
            }
        }
    }
}

/**
 * Sync children.
 *
 * This algorithm finds a minimum[1] number of DOM operations. It works in several steps:
 *
 * 1. Find common suffix and prefix, and perform simple moves on the edges.
 *
 * This optimization technique is searching for nodes with identical keys by simultaneously iterating over nodes in the
 * old children list `A` and new children list `B` from both sides:
 *
 *  A: -> [a b c d e f g] <-
 *  B: -> [a b f d c g] <-
 *
 * Here we can skip nodes "a" and "b" at the begininng, and node "g" at the end.
 *
 *  A: -> [c d e f] <-
 *  B: -> [f d c] <-
 *
 * At this position it will try to look at the opposite edge, and if there is a node with the same key at the opposite
 * edge, it will perform simple move operation. Node "c" is moved to the right edge, and node "f" is moved to the left
 * edge.
 *
 *  A: -> [d e] <-
 *  B: -> [d] <-
 *
 * Now it will try again to find common prefix and suffix, node "d" is the same, so we can skip it.
 *
 *  A: [e]
 *  B: []
 *
 * Here it will check if the size of one of the list is equal to zero, and if length of the old children list is zero,
 * it will insert all remaining nodes from the new list, or if length of the new children list is zero, it will remove
 * all remaining nodes from the old list.
 *
 * This simple optimization technique will cover most of the real world use cases, even reversing the children list,
 * except for sorting.
 *
 * When algorithm couldn't find a solution with this simple optimization technique, it will go to the next step of the
 * algorithm. For example:
 *
 *  A: -> [a b c d e f g] <-
 *  B: -> [a c b h f e g] <-
 *
 * Nodes "a" and "g" at the edges are the same, skipping them.
 *
 *  A: -> [b c d e f] <-
 *  B: -> [c b h f e] <-
 *
 * Here we are stuck, so we need to switch to the next step.
 *
 * 2. Look for removed and inserted nodes, and simultaneously check if one of the nodes is moved.
 *
 * First we create an array `P` with the length of the new children list and assign to each position value `-1`, it has
 * a meaning of a new node that should be inserted. Later we will assign node positions in the old children list to this
 * array.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *  P: [. . . . .] // . == -1
 *
 * Then we need to build an index `I` that maps keys with node positions of the remaining nodes from the new children
 * list.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *  P: [. . . . .] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1,
 *    h: 2,
 *    f: 3,
 *    e: 4,
 *  }
 *  last = 0
 *
 * With this index, we start to iterate over the remaining nodes from the old children list and check if we can find a
 * node with the same key in the index. If we can't find any node, it means that it should be removed, otherwise we
 * assign position of the node in the old children list to the positions array.
 *
 *  A: [b c d e f]
 *      ^
 *  B: [c b h f e]
 *  P: [. 0 . . .] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1, <-
 *    h: 2,
 *    f: 3,
 *    e: 4,
 *  }
 *  last = 1
 *
 * When we assigning positions to the positions array, we also keep a position of the last seen node in the new children
 * list, if the last seen position is larger than current position of the node at the new list, then we are switching
 * `moved` flag to `true`.
 *
 *  A: [b c d e f]
 *        ^
 *  B: [c b h f e]
 *  P: [1 0 . . .] // . == -1
 *  I: {
 *    c: 0, <-
 *    b: 1,
 *    h: 2,
 *    f: 3,
 *    e: 4,
 *  }
 *  last = 1 // last > 0; moved = true
 *
 * The last position `1` is larger than current position of the node at the new list `0`, switching `moved` flag to
 * `true`.
 *
 *  A: [b c d e f]
 *          ^
 *  B: [c b h f e]
 *  P: [1 0 . . .] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1,
 *    h: 2,
 *    f: 3,
 *    e: 4,
 *  }
 *  moved = true
 *
 * Node with key "d" doesn't exist in the index, removing node.
 *
 *  A: [b c d e f]
 *            ^
 *  B: [c b h f e]
 *  P: [1 0 . . 3] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1,
 *    h: 2,
 *    f: 3,
 *    e: 4, <-
 *  }
 *  moved = true
 *
 * Assign position for `e`.
 *
 *  A: [b c d e f]
 *              ^
 *  B: [c b h f e]
 *  P: [1 0 . 4 3] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1,
 *    h: 2,
 *    f: 3, <-
 *    e: 4,
 *  }
 *  moved = true
 *
 * Assign position for 'f'.
 *
 * At this point we are checking if `moved` flag is on, or if the length of the old children list minus the number of
 * removed nodes isn't equal to the length of the new children list. If any of this conditions is true, then we are
 * going to the next step.
 *
 * 3. Find minimum number of moves if `moved` flag is on, or insert new nodes if the length is changed.
 *
 * When `moved` flag is on, we need to find the
 * [longest increasing subsequence](http://en.wikipedia.org/wiki/Longest_increasing_subsequence) in the positions array,
 * and move all nodes that doesn't belong to this subsequence.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *  moved = true
 *
 * Now we just need to simultaneously iterate over the new children list and LIS from the end and check if the current
 * position is equal to a value from LIS.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *              ^  // new_pos == 4
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *              ^  // new_pos == 4
 *  moved = true
 *
 * Node "e" stays at the same place.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *            ^    // new_pos == 3
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *            ^    // new_pos != 1
 *  moved = true
 *
 * Node "f" is moved, move it before the next node "e".
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *          ^      // new_pos == 2
 *  P: [1 0 . 4 3] // . == -1
 *          ^      // old_pos == -1
 *  LIS:     [1 4]
 *            ^
 *  moved = true
 *
 * Node "h" has a `-1` value in the positions array, insert new node "h".
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *        ^        // new_pos == 1
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *            ^    // new_pos == 1
 *  moved = true
 *
 * Node "b" stays at the same place.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *      ^          // new_pos == 0
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *          ^      // new_pos != undefined
 *  moved = true
 *
 * Node "c" is moved, move it before the next node "b".
 *
 * When moved flag is off, we don't need to find LIS, and we just iterate over the new children list and check its
 * current position in the positions array, if it is `-1`, then we insert new node.
 *
 * That is how children reconciliation algorithm is working in one of the fastest virtual dom libraries :)
 *
 * [1] Actually it is almost minimum number of dom ops, when node is removed and another one is inserted at the same
 * place, instead of insert and remove dom ops, we can use one replace op. It will make everything even more
 * complicated, and other use cases will be slower, so I don't think that it is worth to use replace here.
 * Also, there are some rare cases like "ab" => "bc" that will use more DOM ops that is necessary because of
 * prefix/suffix optimization.
 *
 * @param parent Parent node.
 * @param a Old VNode list.
 * @param b New VNode list.
 * @param context Current context.
 * @param syncFlags Sync flags.
 */
function syncChildrenTrackByKeys(
    parent: Node,
    a: IVNode<any>[],
    b: IVNode<any>[],
    context: Context,
    syncFlags: SyncFlags,
): void {
    let aStart = 0;
    let bStart = 0;
    let aEnd = a.length - 1;
    let bEnd = b.length - 1;
    let aStartNode = a[aStart];
    let bStartNode = b[bStart];
    let aEndNode = a[aEnd];
    let bEndNode = b[bEnd];
    let i: number;
    let j: number | undefined;
    let nextPos: number;
    let next: Node | null;
    let aNode: IVNode<any> | null;
    let bNode: IVNode<any>;
    let node: IVNode<any>;

    // Step 1
    outer: while (true) {
        // Sync nodes with the same key at the beginning.
        while (vNodeEqualKeys(aStartNode, bStartNode)) {
            vNodeSync(parent, aStartNode, bStartNode, context, syncFlags);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
        }

        // Sync nodes with the same key at the end.
        while (vNodeEqualKeys(aEndNode, bEndNode)) {
            vNodeSync(parent, aEndNode, bEndNode, context, syncFlags);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
        }

        // Move and sync nodes from right to left.
        if (vNodeEqualKeys(aEndNode, bStartNode)) {
            vNodeSync(parent, aEndNode, bStartNode, context, syncFlags);
            vNodeMoveChild(parent, bStartNode, getDOMInstanceFromVNode(aStartNode));
            aEnd--;
            bStart++;
            // There is no need to check when we out of bounds, because the only way we can get here is when there are
            // more nodes in the lists.
            //
            // Impossible transformations:
            //   [a] => [a b] (common prefix)
            //   [b a] => [a] (common suffix)
            //
            // Possible transformations:
            //   [b a] => [a b]
            //   [b a] => [a c]

            aEndNode = a[aEnd];
            bStartNode = b[bStart];
            // In a real-world scenarios there is a higher chance that next node after the move will be the same, so we
            // immediately jump to the start of this prefix/suffix algo.
            continue;
        }

        // Move and sync nodes from left to right.
        if (vNodeEqualKeys(aStartNode, bEndNode)) {
            vNodeSync(parent, aStartNode, bEndNode, context, syncFlags);
            nextPos = bEnd + 1;
            next = nextPos < b.length ? getDOMInstanceFromVNode(b[nextPos]) : null;
            vNodeMoveChild(parent, bEndNode, next);
            aStart++;
            bEnd--;
            aStartNode = a[aStart];
            bEndNode = b[bEnd];
            continue;
        }

        break;
    }

    if (aStart > aEnd) {
        // All nodes from a are synced, insert the rest from b.
        nextPos = bEnd + 1;
        next = nextPos < b.length ? getDOMInstanceFromVNode(b[nextPos]) : null;
        while (bStart <= bEnd) {
            vNodeRenderIntoAndAttach(parent, next, b[bStart++], context, syncFlags);
        }
    } else if (bStart > bEnd) {
        // All nodes from b are synced, remove the rest from a.
        while (aStart <= aEnd) {
            vNodeRemoveChild(parent, a[aStart++], syncFlags);
        }
        // Step 2
    } else {
        let aLength = aEnd - aStart + 1;
        let bLength = bEnd - bStart + 1;
        const aNullable = a as Array<IVNode<any> | null>; // will be removed by js optimizing compilers.
        // Mark all nodes as inserted.
        const sources = new Array<number>(bLength).fill(-1);

        let moved = false;
        let pos = 0;
        let synced = 0;

        // When children lists are small, we are using naive O(N) algorithm to find if child is removed.
        if ((bLength <= 4) || ((aLength * bLength) <= 16)) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (synced < bLength) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (vNodeEqualKeys(aNode, bNode)) {
                            sources[j - bStart] = i;

                            if (pos > j) {
                                moved = true;
                            } else {
                                pos = j;
                            }
                            vNodeSync(parent, aNode, bNode, context, syncFlags);
                            synced++;
                            aNullable[i] = null;
                            break;
                        }
                    }
                }
            }
        } else {
            let keyIndex: Map<any, number> | undefined;
            let positionKeyIndex: Array<number> | undefined;

            for (i = bStart; i <= bEnd; i++) {
                node = b[i];
                if (node._flags & VNodeFlags.Key) {
                    if (keyIndex === undefined) {
                        keyIndex = new Map<any, number>();
                    }
                    keyIndex.set(node._key, i);
                } else {
                    if (positionKeyIndex === undefined) {
                        positionKeyIndex = [];
                    }
                    positionKeyIndex[node._key - aStart] = i;
                }
            }

            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];

                if (synced < bLength) {
                    if (aNode._flags & VNodeFlags.Key) {
                        j = keyIndex ? keyIndex.get(aNode._key) : undefined;
                    } else {
                        j = positionKeyIndex ? positionKeyIndex[aNode._key - aStart] : undefined;
                    }

                    if (j !== undefined) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        } else {
                            pos = j;
                        }
                        vNodeSync(parent, aNode, bNode, context, syncFlags);
                        synced++;
                        aNullable[i] = null;
                    }
                }
            }
        }

        if (aLength === a.length && synced === 0) {
            // Noone is synced, remove all children with one dom op.
            vNodeRemoveAllChildren(parent, a, syncFlags);
            while (bStart < bLength) {
                vNodeRenderIntoAndAttach(parent, null, b[bStart++], context, syncFlags);
            }
        } else {
            i = aLength - synced;
            while (i > 0) {
                aNode = aNullable[aStart++];
                if (aNode !== null) {
                    vNodeRemoveChild(parent, aNode, syncFlags);
                    i--;
                }
            }

            // Step 3
            if (moved) {
                const seq = lis(sources);
                j = seq.length - 1;
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        nextPos = pos + 1;
                        next = nextPos < b.length ? getDOMInstanceFromVNode(b[nextPos]) : null;
                        vNodeRenderIntoAndAttach(parent, next, node, context, syncFlags);
                    } else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            next = nextPos < b.length ? getDOMInstanceFromVNode(b[nextPos]) : null;
                            vNodeMoveChild(parent, node, next);
                        } else {
                            j--;
                        }
                    }
                }
            } else if (synced !== bLength) {
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        nextPos = pos + 1;
                        next = nextPos < b.length ? getDOMInstanceFromVNode(b[nextPos]) : null;
                        vNodeRenderIntoAndAttach(parent, next, node, context, syncFlags);
                    }
                }
            }
        }
    }
}

/**
 * Slightly modified Longest Increased Subsequence algorithm, it ignores items that have -1 value, they're representing
 * new items.
 *
 * http://en.wikipedia.org/wiki/Longest_increasing_subsequence
 *
 * @param a Array of numbers.
 * @returns Longest increasing subsequence.
 */
function lis(a: number[]): number[] {
    const p = a.slice(0);
    const result: number[] = [];
    result.push(0);
    let u: number;
    let v: number;

    for (let i = 0, il = a.length; i < il; i++) {
        if (a[i] === -1) {
            continue;
        }

        let j = result[result.length - 1];
        if (a[j] < a[i]) {
            p[i] = j;
            result.push(i);
            continue;
        }

        u = 0;
        v = result.length - 1;

        while (u < v) {
            let c = ((u + v) / 2) | 0;
            if (a[result[c]] < a[i]) {
                u = c + 1;
            } else {
                v = c;
            }
        }

        if (a[i] < a[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1];
            }
            result[u] = i;
        }
    }

    u = result.length;
    v = result[u - 1];

    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }

    return result;
}
