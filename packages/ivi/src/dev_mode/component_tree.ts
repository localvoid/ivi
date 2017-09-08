import { DEV } from "ivi-vars";
import { VNode, getDOMInstanceFromVNode } from "../vdom/vnode";
import { VNodeFlags } from "../vdom/flags";
import { Component } from "../vdom/component";
import { ROOTS } from "../vdom/root";

function _findVNode(
  match: (vnode: VNode) => boolean,
  vnode: VNode,
): VNode | null {
  if (match(vnode) === true) {
    return vnode;
  }
  if ((vnode._flags & (VNodeFlags.Element | VNodeFlags.Text)) !== 0) {
    if ((vnode._flags & VNodeFlags.Element) !== 0) {
      if (vnode._children !== null) {
        if ((vnode._flags & VNodeFlags.ChildrenArray) !== 0) {
          const children = vnode._children as VNode[];
          for (const c of children) {
            return _findVNode(match, c);
          }
        } else if ((vnode._flags & VNodeFlags.ChildrenVNode) !== 0) {
          return _findVNode(match, vnode._children as VNode);
        }
      }
    }
  } else if ((vnode._flags & VNodeFlags.Component) !== 0) {
    return _findVNode(match, vnode._children as VNode);
  }

  return null;
}

function findVNode(
  match: (vnode: VNode) => boolean,
): VNode | null {
  if (DEV) {
    for (const root of ROOTS) {
      const result = _findVNode(match, root.currentVNode!);
      if (result !== null) {
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
export function findVNodeByNode(node: Node): VNode | null {
  if (DEV) {
    return findVNode(function (vnode: VNode) {
      if ((vnode._flags & VNodeFlags.ComponentClass) !== 0) {
        return node === getDOMInstanceFromVNode(vnode._children as VNode);
      }
      return false;
    });
  }
  return null;
}

/**
 * Find VNode instance by debug ID.
 *
 * @param debugId Debug ID.
 * @returns VNode instance or `null`.
 */
export function findVNodeByDebugId(id: number): VNode | null {
  if (DEV) {
    return findVNode(function (vnode: VNode) {
      if ((vnode._flags & VNodeFlags.ComponentClass) !== 0) {
        return id === (vnode._instance as Component<any>)._debugId;
      }
      return false;
    });
  }
  return null;
}

export function visitComponents(visitor: (vnode: VNode) => void, vnode?: VNode): void {
  if (!vnode) {
    for (const root of ROOTS) {
      visitComponents(visitor, root.currentVNode!);
    }
  } else {
    if ((vnode._flags & VNodeFlags.Element) !== 0) {
      if (vnode._children !== null) {
        if ((vnode._flags & VNodeFlags.ChildrenArray) !== 0) {
          for (const c of vnode._children as VNode[]) {
            visitComponents(visitor, c);
          }
        } else if ((vnode._flags & VNodeFlags.ChildrenVNode) !== 0) {
          return visitComponents(visitor, vnode._children as VNode);
        }
      }
    } else if ((vnode._flags & VNodeFlags.Component) !== 0) {
      visitor(vnode);
    }
  }
}
