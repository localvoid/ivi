import { OpNode, NodeFlags, OpChildren, RecursiveOpChildrenArray, ElementData, ContextData, Key } from "ivi";

export function visitOpNodes(
  op: OpChildren,
  parent: OpChildren,
  key: any,
  context: {},
  visitor: (vnode: OpChildren, parent: OpChildren, key: any, context: {}) => boolean,
): boolean {
  if (visitor(op, parent, key, context) === true) {
    return true;
  }

  if (typeof op === "object" && op !== null) {
    if (op instanceof Array) {
      for (let i = 0; i < op.length; i++) {
        if (visitOpNodes(op[i], op, void 0, context, visitor)) {
          return true;
        }
      }
    } else {
      const flags = op.type.flags;
      if ((flags & NodeFlags.Element) !== 0) {
        return visitOpNodes(op.data.children, op, void 0, context, visitor);
      } else if ((flags & NodeFlags.TrackByKey) !== 0) {
        const children = (op as OpNode<Key<any, OpChildren>[]>).data;
        for (let i = 0; i < children.length; i++) {
          const k = children[i];
          if (visitOpNodes(k.v, op, k.k, context, visitor)) {
            return true;
          }
        }
      } else if ((flags & NodeFlags.Context) !== 0) {
        return visitOpNodes(op.data.children, op, void 0, { ...context, ...op.data.data }, visitor);
      } else if ((flags & (NodeFlags.Events | NodeFlags.Ref)) !== 0) {
        return visitOpNodes(op.data.children, op, void 0, context, visitor);
      }
    }
  }

  return false;
}

export function isOpText(op: OpChildren): op is string | number {
  return (typeof op === "string" || typeof op === "number");
}

export function isOpObject(op: OpChildren): op is OpNode | RecursiveOpChildrenArray {
  return (typeof op === "object" && op !== null);
}

export function isOpFragment(op: OpChildren): op is RecursiveOpChildrenArray {
  return isOpObject(op) && op instanceof Array;
}

export function isOpElement(op: OpChildren): op is OpNode<ElementData> {
  return isOpObject(op) && !isOpFragment(op) && (op.type.flags & NodeFlags.Element) !== 0;
}

export function isOpComponent<T = any>(op: OpChildren): op is OpNode<T> {
  return isOpObject(op) && !isOpFragment(op) && (op.type.flags & NodeFlags.Component) !== 0;
}

export function isOpContext(op: OpChildren): op is OpNode<ContextData> {
  return isOpObject(op) && !isOpFragment(op) && (op.type.flags & NodeFlags.Component) !== 0;
}
