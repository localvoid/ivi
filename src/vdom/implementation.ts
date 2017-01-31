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

import { SVG_NAMESPACE, setInnerHTML } from "../common/dom";
import { DevModeFlags, DEV_MODE, perfMarkBegin, perfMarkEnd, getFunctionName } from "../dev_mode/dev_mode";
import { devModeOnError, devModeOnComponentCreated, devModeOnComponentDisposed } from "../dev_mode/hooks";
import { injectScreenOfDeath } from "../dev_mode/screen_of_death";
import {
    setInitialNestingState, pushNestingState, restoreNestingState, checkNestingViolation, nestingStateAncestorFlags,
    nestingStateParentTagName, AncestorFlags, AncestorFlagsByTagName,
} from "../dev_mode/html_nesting_rules";
import {
    stackTracePushComponent, stackTracePopComponent, stackTraceReset, stackTraceAugment,
    getFunctionalComponentStackTrace,
} from "../dev_mode/stack_trace";
import { VNodeFlags, ComponentFlags, SyncFlags } from "./flags";
import { IVNode, getDOMInstanceFromVNode } from "./ivnode";
import { ElementDescriptor } from "./element_descriptor";
import { $t } from "./vnode";
import {
    ComponentClass, ComponentFunction, Component, registerComponent, unregisterComponent, getDOMInstanceFromComponent,
} from "./component";
import { syncDOMProps, syncClassName, syncStyle } from "./sync_dom";
import { syncEvents, removeEvents } from "../events/sync_events";
import { autofocus } from "../scheduler/autofocus";

/**
 * Begin component perf mark.
 *
 * @param debugId
 * @param method
 */
function componentPerfMarkBegin(debugId: number, method: string): void {
    if (__IVI_DEV__) {
        if (DEV_MODE & DevModeFlags.EnableComponentPerformanceProfiling) {
            perfMarkBegin(`${debugId}::${method}`);
        }
    }
}

/**
 * End component perf mark.
 *
 * @param debugId
 * @param method
 * @param component
 */
function componentPerfMarkEnd(
    debugId: number,
    method: string,
    instance: false,
    component: ComponentFunction<any>,
): void;
function componentPerfMarkEnd(
    debugId: number,
    method: string,
    instance: true,
    component: Component<any>,
): void;
function componentPerfMarkEnd(
    debugId: number,
    method: string,
    instance: boolean,
    component: Component<any> | ComponentFunction<any>,
): void {
    if (__IVI_DEV__) {
        if (DEV_MODE & DevModeFlags.EnableComponentPerformanceProfiling) {
            perfMarkEnd(
                `${instance ? "[C]" : "[F]"}${getFunctionName(
                    (instance ? component.constructor : component) as Function,
                )}::${method}`,
                `${debugId}::${method}`,
            );
        }
    }
}

/**
 * Traverses tree to the body and calculates `AncestorFlags`.
 *
 * @param element
 * @returns Ancestor Flags.
 */
function ancestorFlags(element: Element | null): AncestorFlags {
    if (__IVI_DEV__) {
        let result = 0;
        while (element && (element !== document.body)) {
            result |= AncestorFlagsByTagName[element.tagName.toLowerCase()];
            element = element.parentElement;
        }
        return result;
    }

    return 0;
}

/**
 * Render VNode entry point tryCatch wrapper.
 *
 * #entry
 *
 * @param container Container Node.
 * @param refChild Reference to the next Node, when it is `null` child will be inserted at the end.
 * @param vnode VNode.
 * @param context Current context.
 * @param owner Owning component.
 * @returns Rendered instance.
 */
export function renderVNode(
    parent: Node,
    refChild: Node | null,
    vnode: IVNode<any>,
    context: { [key: string]: any },
    owner?: Component<any>,
): Node | Component<any> {
    if (__IVI_DEV__) {
        if ((parent as Element).tagName) {
            setInitialNestingState((parent as Element).tagName.toLowerCase(), ancestorFlags(parent as Element));
        } else {
            setInitialNestingState("", 0);
        }

        try {
            return _renderVNode(parent, refChild, vnode, context, owner);
        } catch (e) {
            stackTraceAugment(e);
            devModeOnError(e);
            injectScreenOfDeath(`ivi Error: ${e.message}`, e.stack);
            stackTraceReset();
            throw e;
        }
    }
    return _renderVNode(parent, refChild, vnode, context, owner);
}

/**
 * Render VNode entry point. Renders VNode into container and invokes `attached` lifecycle methods after VNode is
 * inserted into container.
 *
 * #entry
 *
 * @param container Container Node.
 * @param refChild Reference to the next Node, when it is `null` child will be inserted at the end.
 * @param vnode VNode.
 * @param context Current context.
 * @param owner Owning component.
 * @returns Rendered DOM Node.
 */
function _renderVNode(
    container: Node,
    refChild: Node | null,
    vnode: IVNode<any>,
    context: { [key: string]: any },
    owner?: Component<any>,
): Node | Component<any> {
    return vNodeRenderInto(container, refChild, vnode, context, owner);
}

/**
 * Sync VNode entry point tryCatch wrapper.
 *
 * @param parent Parent node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current context.
 * @param owner Owning component.
 * @returns Synced DOM Node. When VNodes are synced and they aren't compatible, old DOM Node will be replaced with a new
 * DOM Node.
 */
export function syncVNode(
    parent: Node,
    a: IVNode<any>,
    b: IVNode<any>,
    context: { [key: string]: any },
    syncFlags: SyncFlags,
    owner?: Component<any>,
): Node | Component<any> {
    if (__IVI_DEV__) {
        if ((parent as Element).tagName) {
            setInitialNestingState((parent as Element).tagName.toLowerCase(), ancestorFlags(parent as Element));
        } else {
            setInitialNestingState("", 0);
        }

        try {
            return _syncVNode(parent, a, b, context, owner);
        } catch (e) {
            stackTraceAugment(e);
            devModeOnError(e);
            injectScreenOfDeath(`ivi Error: ${e.message}`, e.stack);
            stackTraceReset();
            throw e;
        }
    }
    return _syncVNode(parent, a, b, context, owner);
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
 * @param owner Owning component.
 * @returns Synced DOM Node. When VNodes are synced and they aren't compatible, old DOM Node will be replaced with a new
 * DOM Node.
 */
function _syncVNode(
    parent: Node,
    a: IVNode<any>,
    b: IVNode<any>,
    context: { [key: string]: any },
    owner?: Component<any>,
): Node | Component<any> {
    return vNodeSync(parent, a, b, context, 0, owner);
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
            injectScreenOfDeath(`ivi Error: ${e.message}`, e.stack);
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
    parent.removeChild(getDOMInstanceFromVNode(node) !);
    vNodeDetach(node);
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
 * @param owner Owner.
 */
export function augmentVNode(
    parent: Node,
    node: Node | null,
    vnode: IVNode<any>,
    context: { [key: string]: any },
    owner?: Component<any>,
): void {
    if (__IVI_DEV__) {
        if ((parent as Element).tagName) {
            setInitialNestingState((parent as Element).tagName.toLowerCase(), ancestorFlags(parent as Element));
        } else {
            setInitialNestingState("", 0);
        }

        try {
            _augmentVNode(parent, node, vnode, context, owner);
            return;
        } catch (e) {
            stackTraceAugment(e);
            devModeOnError(e);
            injectScreenOfDeath(`ivi Error: ${e.message}`, e.stack);
            stackTraceReset();
            throw e;
        }
    }
    _augmentVNode(parent, node, vnode, context, owner);
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
 * @param owner Owner.
 */
function _augmentVNode(
    parent: Node,
    node: Node | null,
    vnode: IVNode<any>,
    context: { [key: string]: any },
    owner?: Component<any>,
): void {
    vNodeAugment(parent, node, vnode, context, owner);
}

/**
 * Update Component entry point tryCatch wrapper.
 *
 * #entry
 * #component
 *
 * @param component Component to update.
 * @returns DOM Node.
 */
export function updateComponent<P>(component: Component<P>): void {
    if (__IVI_DEV__) {
        try {
            stackTracePushComponent((component as Object).constructor as ComponentClass<any>, component);
            _updateComponent(component, 0);
            stackTracePopComponent();
            return;
        } catch (e) {
            stackTraceAugment(e);
            devModeOnError(e);
            injectScreenOfDeath(`ivi Error: ${e.message}`, e.stack);
            stackTraceReset();
            throw e;
        }
    }
    _updateComponent(component, 0);
}

/**
 * Update Component.
 *
 * #entry
 *
 * @param component Component to update.
 * @returns DOM Node.
 */
function _updateComponent<P>(component: Component<P>, syncFlags: SyncFlags): void {
    const flags = component.flags;

    if ((flags & ComponentFlags.Attached) &&
        (
            (flags & ComponentFlags.Dirty) ||
            (syncFlags & SyncFlags.ForceUpdate)
        )
    ) {
        componentPerfMarkBegin(component._debugId, "update");

        const oldRoot = component.root!;

        componentWillUpdate(component);

        if (flags & (ComponentFlags.DirtyParentContext | ComponentFlags.DirtyContext)) {
            componentUpdateContext(component);
            syncFlags |= SyncFlags.DirtyContext;
        }

        if (
            (flags & (ComponentFlags.DirtyProps | ComponentFlags.DirtyState)) ||
            ((flags & (ComponentFlags.DirtyParentContext | ComponentFlags.UsingContext)) ===
                (ComponentFlags.DirtyParentContext | ComponentFlags.UsingContext)) ||
            (syncFlags & SyncFlags.ForceUpdate)
        ) {
            if (__IVI_DEV__) {
                if ((component._parentDOMNode as Element).tagName) {
                    setInitialNestingState((component._parentDOMNode as Element).tagName.toLowerCase(),
                        component._ancestorFlags);
                } else {
                    setInitialNestingState("", component._ancestorFlags);
                }
            }
            const parentNode = component._parentDOMNode;
            const newRoot = componentClassRender(component);
            vNodeSync(parentNode!, oldRoot, newRoot, component._context, syncFlags, component);
            component.flags &= ~(ComponentFlags.Dirty | ComponentFlags.InUpdateQueue);
        } else if (oldRoot) { // (flags & (ComponentFlags.DirtyContext | ComponentFlags.DirtyParentContext))
            vNodePropagateNewContext(component._parentDOMNode!, oldRoot, component._context, syncFlags, component);
        }

        componentDidUpdate(component);
        componentPerfMarkEnd(component._debugId, "update", true, component);
    }
}

/**
 * Update a component function.
 *
 * #component
 *
 * @param parent Parent DOM Node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current Context.
 * @param owner Owner.
 * @returns DOM Node.
 */
function _updateComponentFunction(
    parent: Node,
    a: IVNode<any>,
    b: IVNode<any>,
    context: { [key: string]: any },
    syncFlags: SyncFlags,
    owner?: Component<any>,
): Node | Component<any> {
    let instance: Node | Component<any>;
    const fn = b._tag as ComponentFunction<any>;

    componentPerfMarkBegin(b._debugId, "update");

    if ((syncFlags & SyncFlags.ForceUpdate) ||
        ((a._props !== null || b._props !== null) &&
            (!fn.isPropsChanged || fn.isPropsChanged(a._props, b._props)))) {
        const oldRoot = a._children as IVNode<any>;
        const newRoot = b._children = componentFunctionRender(fn, b._props, context);
        instance = vNodeSync(parent, oldRoot, newRoot, context, syncFlags, owner);
    } else {
        b._children = a._children;
        instance = a._instance!;
        if (syncFlags & SyncFlags.DirtyContext) {
            vNodePropagateNewContext(parent, b._children as IVNode<any>, context, syncFlags, owner);
        }
    }

    componentPerfMarkEnd(b._debugId, "update", false, fn);

    b._instance = instance;
    return instance;
}

/**
 * Recursively attach all nodes.
 *
 * @param vnode VNode.
 */
function vNodeAttach(vnode: IVNode<any>): void {
    const flags = vnode._flags;

    if (flags & VNodeFlags.Component) {
        if (flags & VNodeFlags.ComponentClass) {
            const component = vnode._instance as Component<any>;
            stackTracePushComponent(vnode._tag as ComponentClass<any>, component);
            componentPerfMarkBegin(component._debugId, "attach");

            if (__IVI_DEV__) {
                if (component.flags & ComponentFlags.Attached) {
                    throw new Error("Failed to attach Component: component is already attached.");
                }
            }

            component.flags |= ComponentFlags.Attached;
            componentAttached(component);
            vNodeAttach(component.root!);
            componentPerfMarkEnd(component._debugId, "attach", true, component);
        } else { // (flags & VNodeFlags.ComponentFunction)
            stackTracePushComponent(vnode._tag as ComponentFunction<any>);
            componentPerfMarkBegin(vnode._debugId, "attach");
            vNodeAttach(vnode._children as IVNode<any>);
            componentPerfMarkEnd(vnode._debugId, "attach", false, vnode._tag as ComponentFunction<any>);
        }
        stackTracePopComponent();
    } else if (!(flags & (VNodeFlags.InputElement | VNodeFlags.MediaElement))) {
        let children = vnode._children;
        if (children !== null && (flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray))) {
            if (flags & VNodeFlags.ChildrenArray) {
                children = children as IVNode<any>[];
                for (let i = 0; i < children.length; i++) {
                    vNodeAttach(children[i]);
                }
            } else {
                vNodeAttach(children as IVNode<any>);
            }
        }
    }
}

/**
 * Recursively detach all nodes.
 *
 * @param vnode VNode.
 */
function vNodeDetach(vnode: IVNode<any>): void {
    const flags = vnode._flags;
    if (flags & VNodeFlags.Component) {
        if (flags & VNodeFlags.ComponentClass) {
            const component = vnode._instance as Component<any>;
            stackTracePushComponent(vnode._tag as ComponentClass<any>, component);
            componentPerfMarkBegin(component._debugId, "detach");

            if (__IVI_DEV__) {
                if (!(component.flags & ComponentFlags.Attached)) {
                    throw new Error("Failed to detach Component: component is already detached.");
                }
            }
            vNodeDetach(component.root!);
            component.flags &= ~(ComponentFlags.Attached | ComponentFlags.Animated);
            componentDetached(component);
            componentPerfMarkEnd(component._debugId, "detach", true, component);
            unregisterComponent(component);
            devModeOnComponentDisposed(component);
        } else { // (flags & VNodeFlags.ComponentFunction)
            stackTracePushComponent(vnode._tag as ComponentFunction<any>);
            componentPerfMarkBegin(vnode._debugId, "detach");
            vNodeDetach(vnode._children as IVNode<any>);
            componentPerfMarkEnd(vnode._debugId, "detach", false, vnode._tag as ComponentFunction<any>);
        }
        stackTracePopComponent();
    } else if (flags & VNodeFlags.Element) {
        if (!(flags & (VNodeFlags.InputElement | VNodeFlags.MediaElement))) {
            let children = vnode._children;
            if (children !== null && (flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray))) {
                if (flags & VNodeFlags.ChildrenArray) {
                    children = children as IVNode<any>[];
                    for (let i = 0; i < children.length; i++) {
                        vNodeDetach(children[i]);
                    }
                } else {
                    vNodeDetach(children as IVNode<any>);
                }
            }
        }
        if (vnode._events) {
            removeEvents(vnode._events);
        }
    }

    if (vnode._ref) {
        vnode._ref(null);
    }
}

/**
 * Detach all nodes and its subtrees.
 *
 * @param vnodes Array of VNodes.
 */
function vNodeDetachAll(vnodes: IVNode<any>[]): void {
    for (let i = 0; i < vnodes.length; i++) {
        vNodeDetach(vnodes[i]);
    }
}

/**
 * Recursively propagate new context.
 *
 * @param vnode VNode.
 * @param context New context.
 */
function vNodePropagateNewContext(
    parent: Node,
    vnode: IVNode<any>,
    context: { [key: string]: any },
    syncFlags: SyncFlags,
    owner?: Component<any>,
): void {
    const flags = vnode._flags;
    if (flags & VNodeFlags.Component) {
        if (flags & VNodeFlags.ComponentClass) {
            const component = vnode._instance as Component<any>;
            stackTracePushComponent(vnode._tag as ComponentClass<any>, component);
            componentPerfMarkBegin(component._debugId, "propagateContext");
            componentUpdateParentContext(component, context);
            _updateComponent(component, syncFlags);
            componentPerfMarkEnd(component._debugId, "propagateContext", true, component);
        } else { // (flags & VNodeFlags.ComponentFunction)
            const fn = vnode._tag as ComponentFunction<any>;
            stackTracePushComponent(vnode._tag as ComponentFunction<any>);
            componentPerfMarkBegin(vnode._debugId, "propagateContext");
            // Optimization that checks if function is using context parameter. When function doesn't use context, it
            // means that we can ignore re-renders when context is changed, and just propagate a new context through
            // existing subtree.
            if (fn.length < 2) {
                vNodePropagateNewContext(
                    parent,
                    vnode._children as IVNode<any>,
                    context,
                    syncFlags,
                    owner);
            } else {
                _updateComponentFunction(
                    parent,
                    vnode._children as IVNode<any>,
                    vnode._children as IVNode<any>,
                    context,
                    syncFlags,
                    owner);
            }
            componentPerfMarkEnd(vnode._debugId, "propagateContext", false, fn);
        }
        stackTracePopComponent();
    } else if (!(flags & (VNodeFlags.InputElement | VNodeFlags.MediaElement))) {
        let children = vnode._children;
        if (children !== null && (flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray))) {
            if (flags & VNodeFlags.ChildrenArray) {
                children = children as IVNode<any>[];
                for (let i = 0; i < children.length; i++) {
                    vNodePropagateNewContext(parent, children[i], context, syncFlags, owner);
                }
            } else {
                vNodePropagateNewContext(parent, children as IVNode<any>, context, syncFlags, owner);
            }
        }
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
    parent.insertBefore(getDOMInstanceFromVNode(node) !, nextRef!);
}

/**
 * Remove all children.
 *
 * `detach` lifecycle methods will be invoked for all children and their subtrees.
 *
 * @param parent Parent DOM node.
 * @param nodes Arrays of VNodes to remove.
 */
function vNodeRemoveAllChildren(parent: Node, nodes: IVNode<any>[]): void {
    parent.textContent = "";
    vNodeDetachAll(nodes);
}

/**
 * Remove child.
 *
 * `detach` lifecycle methods will be invoked for removed node and its subtree.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 */
function vNodeRemoveChild(parent: Node, node: IVNode<any>): void {
    parent.removeChild(getDOMInstanceFromVNode(node) !);
    vNodeDetach(node);
}

/**
 * Assign a new parent context to a component.
 *
 * Reference equality is used to check if context is changed, all context objects should be immutable.
 *
 * #component
 *
 * @param component Component.
 * @param newContext New Context to assign.
 */
function componentUpdateParentContext<P>(component: Component<P>, newParentContext: { [key: string]: any }): void {
    if (component._parentContext !== newParentContext) {
        component.flags |= ComponentFlags.DirtyParentContext;
        const oldContext = component._parentContext;
        component._parentContext = newParentContext;
        component.newContextReceived(oldContext, newParentContext);
    }
}

/**
 * Update current context of a component.
 *
 * #component
 *
 * @param component Component.
 */
function componentUpdateContext<P>(component: Component<P>): void {
    component.flags &= ~(ComponentFlags.CheckUsingProps | ComponentFlags.ContextUsingProps);
    const contextData = component.updateContext();
    component.flags |= (component.flags & ComponentFlags.CheckUsingProps) << 1;
    component._context = contextData ?
        Object.assign({}, component._parentContext, contextData) :
        component._parentContext;
}

/**
 * Assign a new props to a component.
 *
 * #component
 *
 * @param component Component.
 * @param newProps New props to assign.
 */
function componentUpdateProps<P>(component: Component<P>, newProps: P): void {
    const oldProps = component._props;
    if (component.isPropsChanged(oldProps, newProps)) {
        component.flags |= ComponentFlags.DirtyProps;

        component._props = newProps;

        // There is no reason to call `newPropsReceived` when props aren't changed, even when they are reassigned
        // later to reduce memory usage.
        component.newPropsReceived(oldProps, newProps);
        if (component.flags & ComponentFlags.ContextUsingProps) {
            component.flags |= ComponentFlags.DirtyContext;
        }
    } else {
        // Reassign props even when they aren't changed to reduce overall memory usage.
        //
        // New value always stays alive because it is referenced from virtual dom tree, so instead of keeping in memory
        // two values even when they are the same, we just always reassign it to the new value.
        component._props = newProps;
    }
}

/**
 * Invoke `component.willUpdate` method.
 *
 * #component
 *
 * @param component
 */
function componentWillUpdate<P>(component: Component<P>): void {
    component.beforeUpdate();
}

/**
 * Invoke `component.didUpdate` method.
 *
 * #component
 *
 * @param component
 */
function componentDidUpdate<P>(component: Component<P>): void {
    component.updated();
}

/**
 * Invoke `component.attached` method.
 *
 * #component
 *
 * @param component
 */
function componentAttached<P>(component: Component<P>): void {
    component.attached();
}

/**
 * Invoke `component.detached` method.
 *
 * #component
 *
 * @param component
 */
function componentDetached<P>(component: Component<P>): void {
    component.detached();
}

/**
 * Render a component class instance and return root VNode.
 *
 * #component
 *
 * @param component Component.
 * @returns Root VNode.
 */
function componentClassRender<P>(component: Component<P>): IVNode<any> {
    component.flags &= ~(ComponentFlags.CheckUsingContext | ComponentFlags.UsingContext);
    const root = component.root = component.render() || $t("");
    component.flags |= (component.flags & ComponentFlags.CheckUsingContext) << 1;
    return root;
}

/**
 * Render a component function instance and return root VNode.
 *
 * #component
 *
 * @param component Component function.
 * @param props Props.
 * @param context Context.
 * @returns Root VNode.
 */
function componentFunctionRender<P>(
    component: ComponentFunction<P>, props: P,
    context?: { [key: string]: any },
): IVNode<any> {
    return component(props, context) || $t("");
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
 * @param owner Owning component.
 * @returns Rendered DOM Node.
 */
function vNodeRender(
    parent: Node,
    vnode: IVNode<any>,
    context: { [key: string]: any },
    owner?: Component<any>,
): Node | Component<any> {
    if (__IVI_DEV__) {
        if (vnode._instance) {
            throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
                "clone VNode with `cloneVNode`, or use immutable vnodes `vnode.immutable()` for hoisted trees.");
        }

        if (vnode._flags & VNodeFlags.Immutable) {
            throw new Error("Immutable VNodes can't be used to render trees, clone an immutable tree with a " +
                "`cloneVNode` function.");
        }
    }

    const flags = vnode._flags;
    let instance: Node | Component<any>;
    let childInstance: Node | Component<any>;
    let i: number;
    let child: IVNode<any>;

    if (flags & (VNodeFlags.Text | VNodeFlags.Element)) {
        // Push nesting state and check for nesting violation.
        const _prevNestingStateParentTagName = nestingStateParentTagName();
        const _prevNestingStateAncestorFlags = nestingStateAncestorFlags();

        if (flags & VNodeFlags.Text) {
            pushNestingState("$t");
            checkNestingViolation();
            instance = document.createTextNode(vnode._children as string);
        } else { // (flags & VNodeFlags.Element)
            pushNestingState((flags & VNodeFlags.ElementDescriptor) ?
                (vnode._tag as ElementDescriptor<any>)._tag :
                vnode._tag as string);
            checkNestingViolation();
            if (flags & VNodeFlags.ElementDescriptor) {
                instance = (vnode._tag as ElementDescriptor<any>).createElement();
            } else if (flags & VNodeFlags.InputElement) {
                if (flags & VNodeFlags.TextAreaElement) {
                    instance = document.createElement("textarea");
                } else {
                    instance = document.createElement("input");
                    /**
                     * #quirks
                     *
                     * It is important that we assign `type` before any other properties. IE11 will remove assigned
                     * `value` when `type` is assigned.
                     */
                    (instance as HTMLInputElement).type = vnode._tag as string;
                }
            } else if (flags & VNodeFlags.SvgElement) {
                instance = document.createElementNS(SVG_NAMESPACE, vnode._tag as string);
            } else {
                instance = document.createElement(vnode._tag as string);
            }
            if (flags & VNodeFlags.Autofocus) {
                autofocus(instance as Element);
            }

            if (vnode._props) {
                syncDOMProps(instance as Element, flags, null, vnode._props);
            }
            if (vnode._className !== null) {
                syncClassName(instance as Element, flags, null, vnode._className);
            }
            if (vnode._style !== null) {
                syncStyle(instance as HTMLElement, null, vnode._style);
            }
            if (vnode._events) {
                syncEvents(instance as Element, null, vnode._events);
            }

            let children = vnode._children;
            if (children !== null) {
                if (flags & (VNodeFlags.ChildrenBasic | VNodeFlags.ChildrenArray)) {
                    if (flags & VNodeFlags.ChildrenBasic) {
                        instance.textContent = children as string;
                    } else {
                        children = children as IVNode<any>[];
                        for (i = 0; i < children.length; i++) {
                            child = children[i];
                            childInstance = vNodeRender(instance, child, context, owner);

                            instance.insertBefore(
                                (child._flags & VNodeFlags.ComponentClass) ?
                                    getDOMInstanceFromComponent(childInstance as Component<any>) :
                                    childInstance as Node,
                                null);
                        }
                    }
                } else if (flags & VNodeFlags.ChildrenVNode) {
                    child = children as IVNode<any>;
                    childInstance = vNodeRender(instance, child, context, owner);
                    instance.insertBefore(
                        (child._flags & VNodeFlags.ComponentClass) ?
                            getDOMInstanceFromComponent(childInstance as Component<any>) :
                            childInstance as Node,
                        null);
                } else if (flags & VNodeFlags.InputElement) {
                    /**
                     * #quirks
                     *
                     * It is important that input value is assigned after all properties. It prevents some issues with
                     * rounding, etc. `value` should be assigned after `step`, `min` and `max` properties.
                     */
                    setHTMLInputValue(instance as HTMLInputElement, children as string | boolean);
                } else { // (flags & VNodeFlags.UnsafeHTML)
                    if (children) {
                        setInnerHTML((instance as Element), children as string, !!(flags & VNodeFlags.SvgElement));
                    }
                }
            }
        }

        restoreNestingState(_prevNestingStateParentTagName, _prevNestingStateAncestorFlags);
    } else { // (flags & VNodeFlags.Component)
        if (flags & VNodeFlags.ComponentClass) {
            const component = instance = new (vnode._tag as ComponentClass<any>)(vnode._props, context, owner);
            registerComponent(component);
            devModeOnComponentCreated(component);
            stackTracePushComponent(vnode._tag as ComponentClass<any>, component);
            componentPerfMarkBegin(component._debugId, "create");
            if (__IVI_DEV__) {
                component._ancestorFlags = nestingStateAncestorFlags();
                component._stackTrace = getFunctionalComponentStackTrace();
            }
            component._parentDOMNode = parent;
            componentUpdateContext(component);
            const root = componentClassRender(component);
            vNodeRender(parent, root, component._context, component);
            componentPerfMarkEnd(component._debugId, "create", true, component);
        } else { // (flags & VNodeFlags.ComponentFunction)
            stackTracePushComponent(vnode._tag as ComponentFunction<any>);
            componentPerfMarkBegin(vnode._debugId, "create");
            const root = vnode._children =
                componentFunctionRender(vnode._tag as ComponentFunction<any>, vnode._props, context);
            instance = vNodeRender(parent, root, context, owner);
            componentPerfMarkEnd(vnode._debugId, "create", false, vnode._tag as ComponentFunction<any>);
        }
        stackTracePopComponent();
    }

    vnode._instance = instance;
    if (vnode._ref) {
        vnode._ref(instance);
    }

    return instance;
}

/**
 * Render VNode into container and invoke `attached` lifecycle methods after VNode is inserted into container.
 *
 * It is important that `attached` methods are invoked only after DOM Nodes have been inserted into container, so it
 * goes twice through the entire vnode tree, first time when everything is rendered and the second time when `attached`
 * methods are invoked.
 *
 * @param container Container Node.
 * @param refChild Reference to the next Node, when it is `null` child will be inserted at the end.
 * @param vnode VNode.
 * @param context Current context.
 * @param owner Owning component.
 * @returns Rendered DOM Node.
 */
function vNodeRenderInto(
    container: Node,
    refChild: Node | null,
    vnode: IVNode<any>,
    context: { [key: string]: any },
    owner?: Component<any>,
): Node | Component<any> {
    const instance = vNodeRender(container, vnode, context, owner);
    container.insertBefore(getDOMInstanceFromVNode(vnode) !, refChild);
    vNodeAttach(vnode);
    return instance;
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
 * @param owner Owner.
 */
function vNodeAugment(
    parent: Node,
    node: Node | null,
    vnode: IVNode<any>,
    context: { [key: string]: any },
    owner?: Component<any>,
): Node | Component<any> {
    if (__IVI_DEV__) {
        if (vnode._instance) {
            throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
                "clone VNode with `cloneVNode`, or use immutable vnodes `vnode.immutable()` for hoisted trees.");
        }

        if (vnode._flags & VNodeFlags.Immutable) {
            throw new Error("Immutable VNodes can't be used to render trees, clone an immutable tree with a " +
                "`cloneVNode` function.");
        }
    }

    let instance: Node | Component<any>;

    if (node) {
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
                    // We can't check any style properties, because browsers ignore style names they don't understand,
                    // like style names with browser specific prefixes.
                    if (vnode._children === null) {
                        if (node.hasChildNodes()) {
                            throw new Error(`Invalid children: expected "0" children, ` +
                                `actual "${node.childNodes.length}".`);
                        }
                    }
                }

                if (vnode._events) {
                    syncEvents(node as Element, null, vnode._events);
                }

                if (vnode._children !== null) {
                    if (flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) {
                        let domChild = node.firstChild;
                        if (flags & VNodeFlags.ChildrenArray) {
                            const children = vnode._children as IVNode<any>[];
                            for (let i = 0; i < children.length; i++) {
                                const child = children[i];
                                if ((child._flags & VNodeFlags.Text) && child._children === "") {
                                    vNodeRenderInto(node, domChild, child, context, owner);
                                } else {
                                    if (__IVI_DEV__) {
                                        if (domChild === null) {
                                            throw new Error(`Invalid children: expected to find ${children.length} ` +
                                                `children nodes.`);
                                        }
                                    }
                                    vNodeAugment(node, domChild, children[i], context, owner);
                                    domChild = domChild!.nextSibling;
                                }
                            }
                            if (__IVI_DEV__) {
                                if (domChild !== null) {
                                    throw new Error(`Invalid children: document contains more children nodes than ` +
                                        `expected.`);
                                }
                            }
                        } else {
                            if (__IVI_DEV__) {
                                if (domChild === null) {
                                    throw new Error(`Invalid children: expected to find 1 child node.`);
                                }
                                if (domChild.nextSibling !== null) {
                                    throw new Error(`Invalid children: document contains more children nodes than ` +
                                        `expected.`);
                                }
                            }
                            vNodeAugment(node, domChild, vnode._children as IVNode<any>, context, owner);
                        }

                    } else if (flags & VNodeFlags.InputElement) {
                        // Do not override input value when augmenting.
                        //
                        // TODO: What should be the default behavior when input element is changed before scripts
                        // are loaded. Maybe we should fire onInput event, is synthetic event enough, or it should be
                        // a native event?
                        //
                        // setHTMLInputValue(node as HTMLInputElement, vnode._children as string | boolean);
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
                const component = instance = new (vnode._tag as ComponentClass<any>)(vnode._props, context, owner);
                registerComponent(component);
                devModeOnComponentCreated(component);
                stackTracePushComponent(vnode._tag as ComponentClass<any>, component);

                if (__IVI_DEV__) {
                    component._ancestorFlags = nestingStateAncestorFlags();
                    component._stackTrace = getFunctionalComponentStackTrace();
                }

                component._parentDOMNode = parent;
                componentUpdateContext(component);
                const root = componentClassRender(component);
                vNodeAugment(parent, node, root, component._context, component);
            } else {
                stackTracePushComponent(vnode._tag as ComponentFunction<any>);
                const root = vnode._children =
                    componentFunctionRender(vnode._tag as ComponentFunction<any>, vnode._props, context);
                instance = vNodeAugment(parent, node, root, context, owner);
            }

            stackTracePopComponent();
        }
    } else {
        instance = vNodeRenderInto(parent, null, vnode, context, owner);
    }

    vnode._instance = instance;
    if (vnode._ref) {
        vnode._ref(instance);
    }

    return instance;
}

/**
 * Check if two nodes can be synced.
 *
 * Two nodes can be synced when their flags and tags are identical.
 *
 * @param a Old VNode.
 * @param b New VNode.
 * @return true if nodes can be synced.
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
 * @param owner Owning component.
 * @returns Synced DOM Node. When VNodes are synced and they aren't compatible, old DOM Node will be replaced with a new
 * DOM Node.
 */
function vNodeSync(
    parent: Node,
    a: IVNode<any>,
    b: IVNode<any>,
    context: { [key: string]: any },
    syncFlags: SyncFlags,
    owner?: Component<any>,
): Node | Component<any> {
    if (__IVI_DEV__) {
        if (b._flags & VNodeFlags.Immutable) {
            throw new Error("Immutable VNodes can't be used to render trees, clone an immutable tree with a " +
                "`cloneVNode` function.");
        }
    }

    if (a === b) {
        if (syncFlags & SyncFlags.DirtyContext) {
            vNodePropagateNewContext(parent, b, context, syncFlags, owner);
        }
        return b._instance!;
    }

    if (__IVI_DEV__) {
        if (b._instance) {
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
                    syncEvents(instance as HTMLElement, a._events, b._events);
                }

                if (a._children !== b._children) {
                    syncChildren(
                        instance as Element,
                        a._flags,
                        b._flags,
                        a._children as IVNode<any>[] | IVNode<any> | string | number | boolean,
                        b._children as IVNode<any>[] | IVNode<any> | string | number | boolean,
                        context,
                        syncFlags,
                        owner);
                }
            }
        } else { // (flags & VNodeFlags.Component)
            if (flags & VNodeFlags.ComponentClass) {
                const component = instance as Component<any>;
                stackTracePushComponent(b._tag as ComponentClass<any>, component);
                if (a._props !== null || b._props !== null) {
                    componentUpdateProps(component, b._props);
                }
                componentUpdateParentContext(component, context);
                _updateComponent(component, syncFlags);
            } else { // (flags & VNodeFlags.ComponentFunction)
                stackTracePushComponent(b._tag as ComponentFunction<any>);
                instance = b._instance = _updateComponentFunction(parent, a, b, context, syncFlags, owner);
            }
            stackTracePopComponent();
        }
    } else {
        instance = vNodeRender(parent, b, context, owner);
        parent.replaceChild(
            (b._flags & VNodeFlags.ComponentClass) ?
                getDOMInstanceFromComponent(instance as Component<any>) :
                instance as Element, getDOMInstanceFromVNode(a) !);
        vNodeDetach(a);
        vNodeAttach(b);
    }

    return instance!;
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
 * @param owner Owning component.
 */
function syncChildren(
    parent: Node,
    aParentFlags: VNodeFlags,
    bParentFlags: VNodeFlags,
    a: IVNode<any>[] | IVNode<any> | string | number | boolean,
    b: IVNode<any>[] | IVNode<any> | string | number | boolean,
    context: { [key: string]: any },
    syncFlags: SyncFlags,
    owner: Component<any> | undefined,
): void {
    let i = 0;

    if (a === null) {
        if (bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.ChildrenArray)) {
            if (bParentFlags & VNodeFlags.ChildrenBasic) {
                parent.textContent = b as string;
            } else {
                b = b as IVNode<any>[];
                for (i = 0; i < b.length; i++) {
                    vNodeRenderInto(parent, null, b[i], context, owner);
                }
            }
        } else if (bParentFlags & VNodeFlags.ChildrenVNode) {
            vNodeRenderInto(parent, null, b as IVNode<any>, context, owner);
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
            vNodeRemoveAllChildren(parent, a as IVNode<any>[]);
        } else if (aParentFlags & VNodeFlags.ChildrenVNode) {
            vNodeRemoveChild(parent, a as IVNode<any>);
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
                        vNodeRenderInto(parent, null, b[i], context, owner);
                    }
                } else {
                    vNodeRenderInto(parent, null, b as IVNode<any>, context, owner);
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
                vNodeDetachAll(a);
            } else if (bParentFlags & VNodeFlags.ChildrenArray) {
                b = b as IVNode<any>[];
                if (a.length === 0) {
                    for (i = 0; i < b.length; i++) {
                        vNodeRenderInto(parent, null, b[i], context, owner);
                    }
                } else {
                    if (b.length === 0) {
                        vNodeRemoveAllChildren(parent, a);
                    } else if (a.length === 1 && b.length === 1) {
                        vNodeSync(parent, a[0], b[0], context, syncFlags, owner);
                    } else {
                        syncChildrenTrackByKeys(parent, a, b, context, syncFlags, owner);
                    }
                }
            } else {
                b = b as IVNode<any>;
                if (a.length > 0) {
                    vNodeSync(parent, a[0], b, context, syncFlags, owner);
                    for (i = 1; i < a.length; i++) {
                        vNodeRemoveChild(parent, a[i]);
                    }
                } else {
                    vNodeRenderInto(parent, null, b, context, owner);
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
                vNodeDetach(a);
            } else if (bParentFlags & VNodeFlags.ChildrenArray) {
                b = b as IVNode<any>[];
                if (b.length > 0) {
                    vNodeSync(parent, a, b[0], context, syncFlags, owner);
                    for (i = 1; i < b.length; i++) {
                        vNodeRenderInto(parent, null, b[i], context, owner);
                    }
                } else {
                    vNodeRemoveChild(parent, a);
                }
            } else {
                vNodeSync(parent, a, b as IVNode<any>, context, syncFlags, owner);
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
 *
 * @param parent Parent node.
 * @param a Old VNode list.
 * @param b New VNode list.
 * @param context Current context.
 * @param owner Owning component.
 */
function syncChildrenTrackByKeys(
    parent: Node,
    a: IVNode<any>[],
    b: IVNode<any>[],
    context: { [key: string]: any },
    syncFlags: SyncFlags,
    owner?: Component<any>,
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
            vNodeSync(parent, aStartNode, bStartNode, context, syncFlags, owner);
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
            vNodeSync(parent, aEndNode, bEndNode, context, syncFlags, owner);
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
            vNodeSync(parent, aEndNode, bStartNode, context, syncFlags, owner);
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
            vNodeSync(parent, aStartNode, bEndNode, context, syncFlags, owner);
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
            vNodeRenderInto(parent, next, b[bStart++], context, owner);
        }
    } else if (bStart > bEnd) {
        // All nodes from b are synced, remove the rest from a.
        while (aStart <= aEnd) {
            vNodeRemoveChild(parent, a[aStart++]);
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
                            vNodeSync(parent, aNode, bNode, context, syncFlags, owner);
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
                    positionKeyIndex[node._key] = i;
                }
            }

            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];

                if (synced < bLength) {
                    if (keyIndex !== undefined && (aNode._flags & VNodeFlags.Key)) {
                        j = keyIndex.get(aNode._key);
                    } else if (positionKeyIndex !== undefined) {
                        j = positionKeyIndex[aNode._key];
                    } else {
                        j = undefined;
                    }

                    if (j !== undefined) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        } else {
                            pos = j;
                        }
                        vNodeSync(parent, aNode, bNode, context, syncFlags, owner);
                        synced++;
                        aNullable[i] = null;
                    }
                }
            }
        }

        if (aLength === a.length && synced === 0) {
            // Noone is synced, remove all children with one dom op.
            vNodeRemoveAllChildren(parent, a);
            while (bStart < bLength) {
                vNodeRenderInto(parent, null, b[bStart++], context, owner);
            }
        } else {
            i = aLength - synced;
            while (i > 0) {
                aNode = aNullable[aStart++];
                if (aNode !== null) {
                    vNodeRemoveChild(parent, aNode);
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
                        vNodeRenderInto(parent, next, node, context, owner);
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
                        vNodeRenderInto(parent, next, node, context, owner);
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
