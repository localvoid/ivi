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
            if (vnode._flags & VNodeFlags.ChildrenVNode) {
                let child = vnode._children as IVNode<any> | null;
                do {
                    const result = _findVNode(match, child!);
                    if (result !== null) {
                        return result;
                    }
                    child = child!._next;
                } while (child !== null);
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
            if (vnode._flags & VNodeFlags.ChildrenVNode) {
                let child = vnode._children as IVNode<any> | null;
                do {
                    visitComponents(visitor, child!);
                    child = child!._next;
                } while (child !== null);
            }
        } else if (vnode._flags & VNodeFlags.Component) {
            visitor(vnode);
        }
    }
}
