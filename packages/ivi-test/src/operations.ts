import { OpNode, NodeFlags, Op, OpArray, ElementData, ContextData, Key } from "ivi";

export function visitOpNodes(
  op: Op,
  parent: Op,
  key: any,
  context: {},
  visitor: (vnode: Op, parent: Op, key: any, context: {}) => boolean,
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
        const children = (op as OpNode<Key<any, Op>[]>).data;
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

export function isOpText(op: Op): op is string | number {
  return (typeof op === "string" || typeof op === "number");
}

export function isOpObject(op: Op): op is OpNode | OpArray {
  return (typeof op === "object" && op !== null);
}

export function isOpFragment(op: Op): op is OpArray {
  return isOpObject(op) && op instanceof Array;
}

export function isOpElement(op: Op): op is OpNode<ElementData> {
  return isOpObject(op) && !isOpFragment(op) && (op.type.flags & NodeFlags.Element) !== 0;
}

export function isOpComponent<T = any>(op: Op): op is OpNode<T> {
  return isOpObject(op) && !isOpFragment(op) && (op.type.flags & NodeFlags.Component) !== 0;
}

export function isOpContext(op: Op): op is OpNode<ContextData> {
  return isOpObject(op) && !isOpFragment(op) && (op.type.flags & NodeFlags.Component) !== 0;
}
