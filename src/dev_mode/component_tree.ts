import { IVNode, getDOMInstanceFromVNode } from "../vdom/ivnode";
import { VNodeFlags } from "../vdom/flags";
import { Component } from "../vdom/component";
import { ROOTS } from "../vdom/root";

function _findVNode(
    match: (vnode: IVNode<any>) => boolean,
    vnode: IVNode<any>,
): IVNode<any> | null {
    if (match(vnode)) {
        return vnode;
    }
    if (vnode._flags & (VNodeFlags.Element | VNodeFlags.Text)) {
        if (vnode._flags & VNodeFlags.Element) {
            if (vnode._children !== null) {
                if (vnode._flags & VNodeFlags.ChildrenArray) {
                    const children = vnode._children as IVNode<any>[];
                    for (const c of children) {
                        return _findVNode(match, c);
                    }
                } else if (vnode._flags & VNodeFlags.ChildrenVNode) {
                    return _findVNode(match, vnode._children as IVNode<any>);
                }
            }
        }
    } else if (vnode._flags & VNodeFlags.Component) {
        return _findVNode(match, vnode._children as IVNode<any>);
    }

    return null;
}

function findVNode(
    match: (vnode: IVNode<any>) => boolean,
): IVNode<any> | null {
    if (__IVI_DEV__) {
        for (const root of ROOTS) {
            const result = _findVNode(match, root.currentVNode!);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

/**
 * Find VNode instance by DOM Node.
 *
 * @param node DOM Node.
 * @returns VNode instance or `null`.
 */
export function findVNodeByNode(node: Node): IVNode<any> | null {
    if (__IVI_DEV__) {
        function match(vnode: IVNode) {
            if (vnode._flags & VNodeFlags.ComponentClass) {
                return node === getDOMInstanceFromVNode(vnode._children as IVNode<any>);
            }
            return false;
        }
        return findVNode(match);
    }
    return null;
}

/**
 * Find VNode instance by debug ID.
 *
 * @param debugId Debug ID.
 * @returns VNode instance or `null`.
 */
export function findVNodeByDebugId(id: number): IVNode<any> | null {
    if (__IVI_DEV__) {
        function match(vnode: IVNode) {
            if (id === vnode._debugId) {
                return true;
            }
            if (vnode._flags & VNodeFlags.ComponentClass) {
                return id === (vnode._instance as Component<any>)._debugId;
            }
            return false;
        }
        return findVNode(match);
    }
    return null;
}

export function visitComponents(visitor: (vnode: IVNode<any>) => void, vnode?: IVNode<any>): void {
    if (!vnode) {
        for (const root of ROOTS) {
            visitComponents(visitor, root.currentVNode!);
        }
    } else {
        if (vnode._flags & VNodeFlags.Element) {
            if (vnode._children !== null) {
                if (vnode._flags & VNodeFlags.ChildrenArray) {
                    for (const c of vnode._children as IVNode<any>[]) {
                        visitComponents(visitor, c);
                    }
                } else if (vnode._flags & VNodeFlags.ChildrenVNode) {
                    return visitComponents(visitor, vnode._children as IVNode<any>);
                }
            }
        } else if (vnode._flags & VNodeFlags.Component) {
            visitor(vnode);
        }
    }
}
