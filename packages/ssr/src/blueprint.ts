import { Context, SelectorData } from "ivi-core";
import { Component, ComponentClass, StatelessComponent } from "./component";
import { ConnectDescriptor } from "./connect_descriptor";
import { VNodeFlags, VNode, vNodeEqualKeys, vNodeCanSync } from "./vnode";
import { renderOpenElement } from "./render";
import { escapeText } from "./escape";

/**
 * Blueprint Node.
 */
export class BlueprintNode {
    /**
     * Virtual DOM node that were used to create this node.
     */
    vnode: VNode<any>;
    /**
     * See `VNodeFlags` for details.
     */
    flags: VNodeFlags;
    /**
     * Prerendered string.
     */
    string: string;
    /**
     * Children nodes.
     */
    children: | BlueprintNode[] | BlueprintNode | string | number | boolean | null;
    /**
     * Additional data.
     *
     * Component instances for component nodes, and Selector data for connectors.
     */
    data: Component | SelectorData | null;
    /**
     * Children index for explicit keys.
     */
    childrenKeyIndex: Map<any, BlueprintNode> | null;
    /**
     * Children index for positional keys.
     */
    childrenPosIndex: Map<any, BlueprintNode> | null;

    constructor(
        vnode: VNode,
        children: | BlueprintNode[] | BlueprintNode | string | number | boolean | null,
        data: Component | SelectorData | null,
    ) {
        this.vnode = vnode;
        this.flags = vnode._flags;
        this.string = "";
        this.children = children;
        this.data = data;

        let childrenKeyIndex = null;
        let childrenPosIndex = null;
        if ((vnode._flags & VNodeFlags.ChildrenArray) !== 0) {
            children = children as BlueprintNode[];
            for (let i = 0; i < children.length; i++) {
                const c = children[i];
                if ((c.flags & VNodeFlags.Key) !== 0) {
                    if (childrenKeyIndex === null) {
                        childrenKeyIndex = new Map<any, BlueprintNode>();
                    }
                    childrenKeyIndex.set(c.vnode._key, c);
                } else {
                    if (childrenPosIndex === null) {
                        childrenPosIndex = new Map<any, BlueprintNode>();
                    }
                    childrenPosIndex.set(c.vnode._key, c);
                }
            }
        }

        this.childrenKeyIndex = childrenKeyIndex;
        this.childrenPosIndex = childrenPosIndex;
    }
}

/**
 * createBlueprintFromVNode creates a blueprint from Virtual DOM.
 *
 * @param vnode Virtual DOM node.
 * @param context Current context.
 * @returns Blueprint node.
 */
function createBlueprintFromVNode(vnode: VNode<any>, context: Context): BlueprintNode {
    const flags = vnode._flags;

    if ((flags & (VNodeFlags.Element | VNodeFlags.Text)) !== 0) {
        let childrenInstances = vnode._children as BlueprintNode[] | BlueprintNode | string | number | boolean | null;
        if ((flags & VNodeFlags.Element) !== 0) {
            if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
                if ((flags & VNodeFlags.ChildrenArray) !== 0) {
                    const children = vnode._children as VNode[];
                    childrenInstances = new Array(children.length);
                    for (let i = 0; i < children.length; i++) {
                        childrenInstances[i] = createBlueprintFromVNode(
                            children[i],
                            context,
                        );
                    }
                } else {
                    childrenInstances = createBlueprintFromVNode(
                        vnode._children as VNode,
                        context,
                    );
                }
            }
        }
        return new BlueprintNode(
            vnode,
            childrenInstances,
            null,
        );
    } else { // ((flags & VNodeFlags.Component) !== 0)
        if (flags & VNodeFlags.ComponentClass) {
            const component = new (vnode._tag as ComponentClass)(vnode._props);
            const root = component.render();
            return new BlueprintNode(
                vnode,
                createBlueprintFromVNode(root, context),
                component,
            );
        } else { // ((node._flags & VNodeFlags.ComponentFunction) !== 0)
            if ((flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext)) !== 0) {
                if ((flags & VNodeFlags.Connect) !== 0) {
                    const connect = vnode._tag as ConnectDescriptor<any, any, any>;
                    const selectData = connect.select(null, vnode._props, context);
                    return new BlueprintNode(
                        vnode,
                        createBlueprintFromVNode(connect.render(selectData.out), context),
                        selectData,
                    );
                } else { // ((flags & VNodeFlags.UpdateContext) !== 0)
                    return new BlueprintNode(
                        vnode,
                        createBlueprintFromVNode(vnode._children as VNode, Object.assign({}, context, vnode._props)),
                        null,
                    );
                }
            } else {
                const root = (vnode._tag as StatelessComponent)(vnode._props);
                return new BlueprintNode(
                    vnode,
                    createBlueprintFromVNode(root, context),
                    null,
                );
            }
        }
    }
}

/**
 * cloneChangedBlueprintNode checks deep changes that can occur because of context changes, and if nothing is changed
 * it will reuse existing blueprint node.
 *
 * @param bp Blueprint node.
 * @param context Current context.
 * @returns Blueprint node.
 */
function cloneChangedBlueprintNode(bp: BlueprintNode, context: Context): BlueprintNode {
    const flags = bp.flags;

    if ((flags & VNodeFlags.DeepConnect) !== 0) {
        if ((flags & VNodeFlags.Text | VNodeFlags.Element) !== 0) {
            if ((flags & VNodeFlags.Element) !== 0) {
                if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
                    if ((flags & VNodeFlags.ChildrenArray) !== 0) {
                        const children = bp.children as BlueprintNode[];
                        const newChildren = new Array(children.length);
                        let dirty = false;
                        for (let i = 0; i < children.length; i++) {
                            const c = children[i];
                            const n = cloneChangedBlueprintNode(c, context);
                            if (c !== n) {
                                dirty = true;
                            }
                            newChildren[i] = n;
                        }
                        if (dirty === true) {
                            return new BlueprintNode(
                                bp.vnode,
                                newChildren,
                                null,
                            );
                        }
                    } else { // ((flags & VNodeFlags.ChildrenVNode) !== 0)
                        const child = bp.children as BlueprintNode;
                        const n = cloneChangedBlueprintNode(child, context);
                        if (child !== n) {
                            return new BlueprintNode(
                                bp.vnode,
                                n,
                                null,
                            );
                        }
                    }
                }
            }
            return bp;
        } else { // ((flags & VNodeFlags.Component) !== 0)
            if ((flags & VNodeFlags.ComponentClass) !== 0) {
                const n = cloneChangedBlueprintNode(bp.children as BlueprintNode, context);
                if (bp.children === n) {
                    return bp;
                }
                return new BlueprintNode(
                    bp.vnode,
                    n,
                    null,
                );
            } else { // ((flags & VNodeFlags.ComponentFunction) !== 0)
                if ((flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext)) !== 0) {
                    if ((flags & VNodeFlags.Connect) !== 0) {
                        const connect = bp.vnode._tag as ConnectDescriptor<any, any, any>;
                        const prevSelectData = bp.data as SelectorData;
                        const selectData = connect.select(
                            prevSelectData,
                            bp.vnode._props,
                            context,
                        );
                        if (prevSelectData !== selectData) {
                            const n = diffBlueprintNode(
                                bp.children as BlueprintNode,
                                connect.render(selectData.out),
                                context,
                            );
                            return new BlueprintNode(
                                bp.vnode,
                                n,
                                selectData,
                            );
                        }
                        const n = cloneChangedBlueprintNode(bp.children as BlueprintNode, context);
                        if (bp.children === n) {
                            return bp;
                        }
                        return new BlueprintNode(
                            bp.vnode,
                            n,
                            selectData,
                        );
                    } else { // ((flags & VNodeFlags.UpdateContext) !== 0)
                        const n = cloneChangedBlueprintNode(
                            bp.children as BlueprintNode,
                            Object.assign({}, context, bp.vnode._props),
                        );
                        if (bp.children === n) {
                            return bp;
                        }
                        return new BlueprintNode(
                            bp.vnode,
                            n,
                            null,
                        );
                    }
                } else {
                    const n = cloneChangedBlueprintNode(bp.children as BlueprintNode, context);
                    if (bp.children === n) {
                        return bp;
                    }
                    return new BlueprintNode(
                        bp.vnode,
                        n,
                        null,
                    );
                }
            }
        }
    }

    return bp;
}

/**
 * diffBlueprintNode performs a diff with blueprint node and when nothing is changed it will try to reuse existing
 * blueprint node instead of creating a new one.
 *
 * @param bp Blueprint node.
 * @param node Virtual DOM node.
 * @param context Current context.
 * @returns Blueprint node.
 */
function diffBlueprintNode(bp: BlueprintNode, node: VNode<any>, context: Context): BlueprintNode {
    const flags = bp.flags;

    if (bp.vnode === node) {
        const n = cloneChangedBlueprintNode(bp, context);
        if (bp === n) {
            return bp;
        }
        return new BlueprintNode(
            node,
            n,
            bp.data,
        );
    }

    if (vNodeCanSync(bp.vnode, node)) {
        if ((flags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
            if ((flags & VNodeFlags.Text) !== 0) {
                if (bp.children === node._children) {
                    return bp;
                } else {
                    return new BlueprintNode(
                        node,
                        node._children as string,
                        null,
                    );
                }
            } else { // ((flags & VNodeFlags.Element) !== 0)
                let n = bp.children;
                if (node._children !== null) {
                    if (bp.vnode._children !== node._children) {
                        n = diffBlueprintChildren(
                            bp,
                            flags,
                            node._flags,
                            n as | BlueprintNode[] | BlueprintNode | string | number | boolean | null,
                            node._children as | VNode[] | VNode | string | number | boolean,
                            context,
                        );
                    } else {
                        n = cloneChangedBlueprintNode(bp, context);
                    }
                }

                if (
                    bp.vnode._props === node._props &&
                    bp.vnode._style === node._style &&
                    bp.vnode._className === node._className &&
                    bp.children === n
                ) {
                    return bp;
                }

                return new BlueprintNode(
                    node,
                    n,
                    null,
                );
            }
        } else { // ((flags & VNodeFlags.Component) !== 0)
            if ((flags & VNodeFlags.ComponentClass) !== 0) {
                let component = (bp.data as Component);
                let n;
                if (component.isPropsChanged(bp.vnode._props, node._props) === true) {
                    component = new (node._tag as ComponentClass)(node._props);
                    n = diffBlueprintNode(bp.children as BlueprintNode, component.render(), context);
                } else {
                    n = cloneChangedBlueprintNode(bp.children as BlueprintNode, context);
                }
                if (bp.children === n) {
                    return bp;
                }
                return new BlueprintNode(
                    bp.vnode,
                    n,
                    component,
                );
            } else { // ((flags & VNodeFlags.ComponentFunction) !== 0)
                if ((flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext)) !== 0) {
                    if ((flags & VNodeFlags.Connect) !== 0) {
                        const connect = bp.vnode._tag as ConnectDescriptor<any, any, any>;
                        const prevSelectData = bp.data as SelectorData;
                        const selectData = connect.select(
                            prevSelectData,
                            bp.vnode._props,
                            context,
                        );
                        if (prevSelectData !== selectData) {
                            const n = diffBlueprintNode(
                                bp.children as BlueprintNode,
                                connect.render(selectData.out),
                                context,
                            );
                            return new BlueprintNode(
                                bp.vnode,
                                n,
                                selectData,
                            );
                        }
                        const n = cloneChangedBlueprintNode(bp.children as BlueprintNode, context);
                        if (bp.children === n) {
                            return bp;
                        }
                        return new BlueprintNode(
                            bp.vnode,
                            n,
                            selectData,
                        );
                    } else { // ((flags & VNodeFlags.UpdateContext) !== 0)
                        const n = diffBlueprintNode(
                            bp.children as BlueprintNode,
                            node._children as VNode<any>,
                            Object.assign({}, context, bp.vnode._props),
                        );
                        if (bp.children === n) {
                            return bp;
                        }
                        return new BlueprintNode(
                            bp.vnode,
                            n,
                            null,
                        );
                    }
                } else {
                    const component = (node._tag as StatelessComponent);
                    let n;
                    if (
                        ((flags & VNodeFlags.CheckChangedProps) === 0 &&
                            bp.vnode._props !== node._props) ||
                        ((flags & VNodeFlags.CheckChangedProps) !== 0 &&
                            component.isPropsChanged!(bp.vnode._props, node._props) === true)
                    ) {
                        n = diffBlueprintNode(
                            bp.children as BlueprintNode,
                            component(node._props),
                            context,
                        );
                    } else {
                        n = cloneChangedBlueprintNode(bp.children as BlueprintNode, context);
                    }

                    if (bp.children === n) {
                        return bp;
                    }
                    return new BlueprintNode(
                        bp.vnode,
                        n,
                        null,
                    );
                }
            }
        }
    }

    return createBlueprintFromVNode(node, context);
}

/**
 * diffBlueprintChildren performs a diff on children and tries to find matching children.
 *
 * @param aParent Blueprint parent node.
 * @param aParentFlags Blueprint parent node flags.
 * @param bParentFlags Virtual DOM parent node flags.
 * @param a Blueprint children.
 * @param b Virtual DOM children.
 * @param context Current context.
 * @returns Blueprint children.
 */
function diffBlueprintChildren(
    aParent: BlueprintNode,
    aParentFlags: VNodeFlags,
    bParentFlags: VNodeFlags,
    a: BlueprintNode[] | BlueprintNode | string | number | boolean | null,
    b: VNode[] | VNode | string | number | boolean,
    context: Context,
): BlueprintNode[] | BlueprintNode | string | number | boolean {
    let i = 0;
    let node;

    if ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0) {
        return b as string;
    } else {
        if ((aParentFlags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) === 0) {
            if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
                b = b as VNode[];
                const nodes = new Array(b.length);
                do {
                    nodes[i] = createBlueprintFromVNode(b[i++], context);
                } while (i < b.length);

                return nodes;
            } else { // ((bParentFlags & VNodeFlags.ChildrenVNode) !== 0)
                return createBlueprintFromVNode(b as VNode, context);
            }
        } else {
            if ((aParentFlags & VNodeFlags.ChildrenArray) !== 0) {
                a = a as BlueprintNode[];
                if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
                    return diffBlueprintChildrenTrackByKeys(
                        aParent.childrenKeyIndex,
                        aParent.childrenPosIndex,
                        a,
                        b as VNode[],
                        context,
                    );
                } else {
                    b = b as VNode;
                    for (; i < a.length; i++) {
                        node = a[i];
                        if (vNodeEqualKeys(node.vnode, b)) {
                            return diffBlueprintNode(node, b, context);
                        }
                    }
                    return createBlueprintFromVNode(b, context);
                }
            } else { // ((aParentFlags & VNodeFlags.ChildrenVNode) !== 0) {
                a = a as BlueprintNode;
                if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
                    b = b as VNode[];
                    const nodes = new Array(b.length);
                    for (i = 0; i < b.length; i++) {
                        node = b[i];
                        if (vNodeEqualKeys(a.vnode, node)) {
                            nodes[i] = diffBlueprintNode(a, node, context);
                        } else {
                            nodes[i] = createBlueprintFromVNode(node, context);
                        }
                    }
                    return nodes;
                } else {
                    return diffBlueprintNode(a, b as VNode, context);
                }
            }
        }
    }
}

/**
 * diffBlueprintChildrenTrackByKeys performs a diff on children lists and tries to find similar nodes with matching
 * keys.
 *
 * @param keyIndex Children index for explicit keys.
 * @param posIndex Children index for positional keys.
 * @param a Blueprint nodes.
 * @param b Virtual DOM nodes.
 * @param context Current context.
 * @returns Blueprint children.
 */
function diffBlueprintChildrenTrackByKeys(
    keyIndex: Map<any, BlueprintNode> | null,
    posIndex: Map<any, BlueprintNode> | null,
    a: BlueprintNode[],
    b: VNode[],
    context: Context,
): BlueprintNode[] {
    const newChildren = new Array(b.length);
    let synced = 0;
    let dirty = false;

    for (let i = 0; i < b.length; i++) {
        let aNode;
        const bNode = b[i];
        if ((bNode._flags & VNodeFlags.Key) !== 0) {
            if (keyIndex !== null) {
                aNode = keyIndex.get(bNode._key);
            }
        } else {
            if (posIndex !== null) {
                aNode = posIndex.get(bNode._key);
            }
        }

        let n;
        if (aNode === undefined) {
            n = createBlueprintFromVNode(bNode, context);
        } else {
            n = diffBlueprintNode(aNode, bNode, context);
            if (aNode !== n) {
                dirty = true;
            }
            synced++;
        }
        newChildren[i] = n;
    }

    if (dirty === false && synced === a.length) {
        return a;
    }
    return newChildren;
}

/**
 * Prerender blueprint nodes.
 *
 * @param node Blueprint node.
 * @param componentNode Current component node.
 */
function prerenderBlueprint(node: BlueprintNode, componentNode?: BlueprintNode): void {
    const flags = node.flags;
    if ((flags & (VNodeFlags.Element | VNodeFlags.Component)) !== 0) {
        if ((flags & VNodeFlags.Element) !== 0) {
            node.string = renderOpenElement(node.vnode);
            if (componentNode !== undefined) {
                componentNode.string += node.string;
            }
            if ((flags & VNodeFlags.VoidElement) === 0) {
                if (node.children !== null) {
                    if ((flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) !== 0) {
                        if ((flags & VNodeFlags.ChildrenArray) !== 0) {
                            const children = node.children as BlueprintNode[];
                            for (let i = 0; i < children.length; i++) {
                                const c = children[i];
                                prerenderBlueprint(c, componentNode);
                                node.flags |= c.flags & VNodeFlags.DeepConnect;
                            }
                        } else {
                            const c = node.children as BlueprintNode;
                            prerenderBlueprint(c, componentNode);
                            node.flags |= c.flags & VNodeFlags.DeepConnect;
                        }
                    } else {
                        node.children = escapeText(node.children as string | number);
                        if (componentNode !== undefined) {
                            componentNode.string += node.children;
                        }
                    }
                }
                if (componentNode !== undefined) {
                    componentNode.string += node.vnode._close;
                }
            }
        } else { // ((flags & VNodeFlags.Component) !== 0)
            const c = node.children as BlueprintNode;
            if ((flags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) === 0) {
                prerenderBlueprint(c, node);
                node.flags |= c.flags & VNodeFlags.DeepConnect;
                if (componentNode !== undefined) {
                    componentNode.string += node.string;
                }
            } else {
                prerenderBlueprint(c, componentNode);
                if ((flags & VNodeFlags.Connect) === 0) {
                    node.flags |= c.flags & VNodeFlags.DeepConnect;
                } else {
                    node.flags |= VNodeFlags.DeepConnect;
                }
            }
        }
    } else { // (((flags & VNodeFlags.Text) !== 0)
        if (componentNode !== undefined) {
            node.string = escapeText(node.children as string | number);
            componentNode.string += node.string;
        }
    }
}

/**
 * createBlueprint creates a blueprint that can be used to optimize rendering to string.
 *
 * @param node Virtual DOM node.
 * @param context Context.
 * @param blueprint Blueprint that will be reused to reduce memory usage.
 * @returns Blueprint.
 */
export function createBlueprint(node: VNode<any>, context: Context = {}, blueprint?: BlueprintNode): BlueprintNode {
    const result = (blueprint === undefined) ?
        createBlueprintFromVNode(node, context) :
        diffBlueprintNode(blueprint, node, context);

    prerenderBlueprint(result);
    return result;
}

/**
 * linkBlueprint links blueprint to a component factory.
 *
 * Linked blueprint will be automatically for rendering components produced from this factory.
 *
 * @param componentFactory Component factory.
 * @param blueprint Blueprint node.
 */
export function linkBlueprint<P>(componentFactory: (props?: P) => VNode<P>, blueprint: BlueprintNode): void {
    (componentFactory as any).linkBlueprint(blueprint);
}
