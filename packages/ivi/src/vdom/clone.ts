import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * Deep clone of VNode children with instance refs erasure.
 *
 * @param flags Parent VNode flags.
 * @param children Children.
 * @returns Cloned children.
 */
export function cloneVNodeChildren(
  flags: VNodeFlags,
  children: VNode[] | VNode | string | number | boolean | null,
): VNode[] | VNode | string | number | boolean | null {
  if (children !== null) {
    if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
      if ((flags & VNodeFlags.ChildrenArray) !== 0) {
        children = children as VNode[];
        const newChildren = new Array<VNode>(children.length);
        for (let i = 0; i < children.length; ++i) {
          newChildren[i] = _cloneVNode(children[i], true);
        }
        return newChildren;
      } else {
        return _cloneVNode(children as VNode, true);
      }
    }
  }

  return children;
}

function _cloneVNode<P, N>(node: VNode<P, N>, cloneKey: boolean): VNode<P, N> {
  const flags = node._flags;

  const newNode = new VNode<P, N>(
    flags,
    node._tag,
    node._props,
    node._className,
    (flags & VNodeFlags.Component) === 0 ?
      cloneVNodeChildren(flags, node._children) :
      null,
  );

  if (cloneKey === true) {
    newNode._key = node._key;
  }

  newNode._style = node._style;
  newNode._events = node._events;

  return newNode;
}

/**
 * Deep clone of VNode with instance refs erasure.
 *
 * @param node VNode to clone.
 * @returns Cloned VNode.
 */
export function cloneVNode<P, N>(node: VNode<P, N>): VNode<P, N> {
  return _cloneVNode(node, (node._flags & VNodeFlags.Key) !== 0);
}

/**
 * Shallow clone of VNode with instance refs erasure.
 *
 * @param node VNode to clone.
 * @returns Cloned VNode.
 */
export function shallowCloneVNode<P, N>(node: VNode<P, N>): VNode<P, N> {
  const flags = node._flags;

  const newNode = new VNode<P, N>(
    flags & ~(
      VNodeFlags.ChildrenArray |
      VNodeFlags.ChildrenBasic |
      VNodeFlags.ChildrenVNode |
      VNodeFlags.UnsafeHTML
    ),
    node._tag,
    node._props,
    node._className,
    null,
  );

  if ((flags & VNodeFlags.Key) !== 0) {
    newNode._key = node._key;
  }

  newNode._style = node._style;
  newNode._events = node._events;

  return newNode;
}
