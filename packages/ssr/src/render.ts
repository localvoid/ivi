import { Context, SelectorData } from "ivi-core";
import { VNodeFlags, VNode, vNodeEqualKeys, vNodeCanSync } from "./vnode";
import { BlueprintNode } from "./blueprint";
import { ComponentClass, StatelessComponent, Component } from "./component";
import { ConnectDescriptor } from "./connect_descriptor";
import { escapeAttributeValue, escapeText } from "./escape";

export interface RenderState<T> {
    result: T;
}

function attributeName(name: string): string {
    switch (name) {
        case "acceptCharset":
            return "accept-charset";
        case "htmlFor":
            return "for";
    }
    return name;
}

function renderElementProps(props: any): string {
    let result = "";

    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = props[key];
        if (value !== null) {
            if (typeof value === "boolean" && value === true) {
                result += ` ${key}`;
            } else {
                result += ` ${attributeName(key)}="${escapeAttributeValue(value)}"`;
            }
        }
    }

    return result;
}

function renderElementStyle(style: { [key: string]: any }): string {
    const keys = Object.keys(style);
    if (keys.length === 0) {
        return "";
    }

    let result = ` style="`;
    let semicolon = false;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = style[key];
        if (semicolon === true) {
            result += ";";
        } else {
            semicolon = true;
        }
        result += `${key}:${escapeAttributeValue(value)}`;
    }

    return `${result}"`;
}

export function renderOpenElement(node: VNode): string {
    const flags = node._flags;
    let result;
    let close = ">";
    if ((flags & VNodeFlags.InputElement) === 0) {
        result = node._tag as string;
    } else {
        if ((flags & VNodeFlags.TextAreaElement) === 0) {
            result = `<input type="${node._tag}"`;

            const value = node._children;
            if (value !== null) {
                if (typeof value === "string") {
                    result += ` value="${escapeAttributeValue(value)}"`;
                } else if (value === true) {
                    result += ` checked`;
                }
            }
            close = ` />`;
        } else {
            result = `<textarea`;
        }
    }

    if (node._className !== null) {
        result += ` class="${node._className}"`;
    }
    if (node._props !== null) {
        result += `${renderElementProps(node._props)}`;
    }
    if (node._style !== null) {
        result += `${renderElementStyle(node._style)}`;
    }
    result += close;

    return result;
}

function renderVNode(state: RenderState<any>, node: VNode<any>, context: Context): void {
    const flags = node._flags;
    if ((flags & (VNodeFlags.Element | VNodeFlags.Text)) !== 0) {
        if ((flags & VNodeFlags.Element) !== 0) {
            state.result += renderOpenElement(node);
            if ((flags & VNodeFlags.VoidElement) === 0) {
                if (node._children !== null) {
                    if ((flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) !== 0) {
                        if ((flags & VNodeFlags.ChildrenArray) !== 0) {
                            const children = node._children as VNode<any>[];
                            for (let i = 0; i < children.length; i++) {
                                renderVNode(state, children[i], context);
                            }
                        } else {
                            renderVNode(state, node._children as VNode<any>, context);
                        }
                    } else { // ((flags & VNodeFlags.ChildrenBasic) !== 0)
                        state.result += escapeText(node._children as string);
                    }
                }
                state.result += node._close;
            } else {
                state.result += " />";
            }
        } else { // ((flags & VNodeFlags.Text) !== 0)
            state.result += escapeText(node._children as string);
        }
    } else { // ((flags & VNodeFlags.Component) !== 0)
        if ((flags & VNodeFlags.LinkedBlueprint) === 0) {
            if ((flags & VNodeFlags.ComponentClass) !== 0) {
                const component = new (node._tag as ComponentClass)(node._props);
                renderVNode(state, component.render(), context);
            } else { // ((node._flags & VNodeFlags.ComponentFunction) !== 0)
                let root;
                if ((flags & VNodeFlags.Connect) !== 0) {
                    const connect = node._tag as ConnectDescriptor<any, any, any>;
                    const selectData = connect.select(null, node._props, context);
                    root = connect.render(selectData.out);
                } else {
                    if ((flags & VNodeFlags.UpdateContext) !== 0) {
                        context = Object.assign({}, context, node._props);
                        root = node._children as VNode;
                    } else {
                        root = (node._tag as StatelessComponent)(node._props);
                    }
                }
                renderVNode(state, root, context);
            }
        } else {
            patchVNode(state, node._style as BlueprintNode, node, context);
        }
    }
}

function patchCheckDeepChanges(
    state: RenderState<any>,
    bp: BlueprintNode,
    context: Context,
): void {
    const flags = bp.flags;
    if ((flags & (VNodeFlags.Element | VNodeFlags.Text)) !== 0) {
        state.result += bp.string;
        if ((flags & VNodeFlags.Element) !== 0) {
            if (bp.children !== null) {
                if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
                    let children = bp.children;
                    if ((flags & VNodeFlags.ChildrenArray) !== 0) {
                        children = children as BlueprintNode[];
                        for (let i = 0; i < children.length; i++) {
                            patchCheckDeepChanges(
                                state,
                                children[i],
                                context,
                            );
                        }
                    } else {
                        patchCheckDeepChanges(
                            state,
                            children as BlueprintNode,
                            context,
                        );
                    }
                } else {
                    state.result += bp.children as string;
                }
            }
            state.result += bp.vnode._close;
        }
    } else {
        if ((flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext)) === 0) {
            if ((flags & VNodeFlags.DeepConnect) === 0) {
                state.result += bp.string;
            } else {
                patchCheckDeepChanges(
                    state,
                    bp.children as BlueprintNode,
                    context,
                );
            }
        } else {
            if ((flags & VNodeFlags.Connect) !== 0) {
                const connect = bp.vnode._tag as ConnectDescriptor<any, any, any>;
                const prevSelectData = bp.data as SelectorData;
                const selectData = connect.select(
                    prevSelectData,
                    bp.vnode._props,
                    context,
                );
                const prevChildren = bp.children as BlueprintNode;
                if (prevSelectData === selectData) {
                    if ((flags & VNodeFlags.DeepConnect) === 0) {
                        state.result += bp.string;
                    } else {
                        patchCheckDeepChanges(
                            state,
                            prevChildren,
                            context,
                        );
                    }
                } else {
                    patchVNode(
                        state,
                        prevChildren,
                        connect.render(selectData.out),
                        context,
                    );
                }
            } else {
                context = Object.assign({}, context, bp.vnode._props);
                patchCheckDeepChanges(
                    state,
                    bp.children as BlueprintNode,
                    context,
                );
            }
        }
    }
}

function patchVNode(state: RenderState<any>, a: BlueprintNode, b: VNode<any>, context: Context): void {
    if (a.vnode === b) {
        patchCheckDeepChanges(state, a, context);
    }

    const bFlags = b._flags;
    if (vNodeCanSync(a.vnode, b)) {
        if ((bFlags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
            if ((bFlags & VNodeFlags.Text) !== 0) {
                state.result += (a.children === b._children)
                    ? a.string :
                    escapeText(b._children as string);
            } else { // ((flags & VNodeFlags.Element) !== 0)
                if (
                    a.vnode._props !== b._props ||
                    a.vnode._style !== b._style ||
                    a.vnode._className !== b._className
                ) {
                    state.result += renderOpenElement(b);
                } else {
                    state.result += a.string;
                }

                if ((bFlags & VNodeFlags.VoidElement) === 0) {
                    if (a.vnode._children !== b._children) {
                        patchChildren(
                            state,
                            a,
                            a.flags,
                            bFlags,
                            a.children as | BlueprintNode[] | BlueprintNode | string | number | boolean,
                            b._children as | VNode[] | VNode | string | number | boolean,
                            context,
                        );
                    }

                    state.result += a.vnode._close;
                }
            }
        } else { // ((flags & VNodeFlags.Component) !== 0)
            if ((bFlags & VNodeFlags.ComponentClass) !== 0) {
                const component = a.data as Component;
                // Update component props
                const oldProps = a.vnode._props;
                const newProps = b._props;
                const oldRoot = a.children as BlueprintNode;
                if (component.isPropsChanged(oldProps, newProps) === true) {
                    const newComponent = new (b._tag as ComponentClass)(newProps);
                    const newRoot = newComponent.render();
                    patchVNode(state, oldRoot, newRoot, context);
                } else {
                    if ((a.flags & VNodeFlags.DeepConnect) === 0) {
                        state.result += a.string;
                    } else {
                        patchCheckDeepChanges(state, oldRoot, context);
                    }
                }
            } else { // (flags & VNodeFlags.ComponentFunction)
                const fn = b._tag as StatelessComponent;

                if ((bFlags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0) {
                    if ((bFlags & VNodeFlags.Connect) !== 0) {
                        const connect = b._tag as ConnectDescriptor<any, any, any>;
                        const prevSelectData = a.data as SelectorData;
                        const selectData = connect.select(
                            prevSelectData,
                            b._props,
                            context,
                        );
                        if (prevSelectData === selectData) {
                            patchCheckDeepChanges(
                                state,
                                a.children as BlueprintNode,
                                context,
                            );
                        } else {
                            patchVNode(
                                state,
                                a.children as BlueprintNode,
                                connect.render(selectData.out),
                                context,
                            );
                        }
                    } else {
                        if ((bFlags & VNodeFlags.UpdateContext) !== 0) {
                            context = Object.assign({}, context, b._props);
                        }
                        patchVNode(
                            state,
                            a.children as BlueprintNode,
                            b._children as VNode<any>,
                            context,
                        );
                    }
                } else {
                    if (
                        (fn.isPropsChanged === undefined && a.vnode._props !== b._props) ||
                        (fn.isPropsChanged !== undefined && fn.isPropsChanged(a.vnode._props, b._props) === true)
                    ) {
                        patchVNode(
                            state,
                            a.children as BlueprintNode,
                            fn(b._props),
                            context,
                        );
                    } else {
                        if ((a.flags & VNodeFlags.DeepConnect) === 0) {
                            state.result += a.string;
                        } else {
                            patchCheckDeepChanges(
                                state,
                                a.children as BlueprintNode,
                                context,
                            );
                        }
                    }
                }
            }
        }
    } else {
        renderVNode(state, b, context);
    }
}

function patchChildren(
    state: RenderState<any>,
    aParent: BlueprintNode,
    aParentFlags: VNodeFlags,
    bParentFlags: VNodeFlags,
    a: BlueprintNode[] | BlueprintNode | string | number | boolean,
    b: VNode[] | VNode | string | number | boolean,
    context: Context,
): void {
    let i = 0;
    let synced;
    let node;

    if ((aParentFlags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) === 0) {
        if ((bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.ChildrenArray)) !== 0) {
            if ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0) {
                state.result += escapeText(b as string);
            } else {
                b = b as VNode<any>[];
                do {
                    renderVNode(state, b[i++], context);
                } while (i < b.length);
            }
        } else if ((bParentFlags & VNodeFlags.ChildrenVNode) !== 0) {
            renderVNode(state, b as VNode<any>, context);
        }
    } else {
        if ((aParentFlags & VNodeFlags.ChildrenArray) !== 0) {
            a = a as BlueprintNode[];
            if ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0) {
                state.result += escapeText(b as string);
            } else if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
                patchChildrenTrackByKeys(
                    state,
                    aParent.childrenKeyIndex,
                    aParent.childrenPosIndex,
                    a,
                    b as VNode<any>[],
                    context,
                );
            } else {
                b = b as VNode<any>;
                synced = false;
                i = 0;
                do {
                    node = a[i];
                    if (vNodeEqualKeys(node.vnode, b)) {
                        patchVNode(state, node, b, context);
                        synced = true;
                        break;
                    }
                    i++;
                } while (i < a.length);

                if (!synced) {
                    renderVNode(state, b, context);
                }
            }
        } else { // ((aParentFlags & VNodeFlags.ChildrenVNode) !== 0) {
            a = a as BlueprintNode;
            if ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0) {
                state.result += escapeText(b as string);
            } else if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
                b = b as VNode[];
                for (i = 0; i < b.length; i++) {
                    node = b[i];
                    if (vNodeEqualKeys(a.vnode, node)) {
                        patchVNode(state, a, node, context);
                    } else {
                        renderVNode(state, b[i], context);
                    }
                }
            } else {
                patchVNode(state, a, b as VNode, context);
            }
        }
    }
}

function patchChildrenTrackByKeys(
    state: RenderState<any>,
    keyIndex: Map<any, BlueprintNode> | null,
    posIndex: Map<any, BlueprintNode> | null,
    a: BlueprintNode[],
    b: VNode[],
    context: Context,
): void {
    let aStart = 0;
    let bStart = 0;
    const aEnd = a.length - 1;
    const bEnd = b.length - 1;
    let aStartNode = a[aStart];
    let bStartNode = b[bStart];
    let aNode;
    let bNode;

    while (vNodeEqualKeys(aStartNode.vnode, bStartNode)) {
        patchVNode(state, aStartNode, bStartNode, context);
        aStart++;
        bStart++;
        if (aStart > aEnd || bStart > bEnd) {
            break;
        }
        aStartNode = a[aStart];
        bStartNode = b[bStart];
    }

    while (bStart <= bEnd) {
        aNode = undefined;
        bNode = b[bStart++];
        if ((bNode._flags & VNodeFlags.Key) !== 0) {
            if (keyIndex !== null) {
                aNode = keyIndex.get(bNode._key);
            }
        } else {
            if (posIndex !== null) {
                aNode = posIndex.get(bNode._key);
            }
        }
        if (aNode === undefined) {
            renderVNode(state, bNode, context);
        } else {
            patchVNode(state, aNode, bNode, context);
        }
    }
}

export function renderToString<T>(
    state: RenderState<T>,
    node: VNode<any>,
    context: Context = {},
    blueprint?: BlueprintNode,
): void {
    if (blueprint === undefined) {
        renderVNode(state, node, context);
    } else {
        patchVNode(state, blueprint, node, context);
    }
}
