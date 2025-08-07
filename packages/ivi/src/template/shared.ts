import {
  NODE_TYPE_ELEMENT,
  NODE_TYPE_EXPR,
  NODE_TYPE_TEXT,
  type INode, type INodeElement,
} from "./ir.js";

export const enum SNodeFlags {
  /** Has expressions in the subtree. */
  HasExpressions = 1,
  /** Has expressions in the subtrees of next siblings. */
  HasNextExpressions = 1 << 1,
  /** Has next DOM node. */
  HasNextDOMNode = 1 << 2,
}

export interface SNode<T extends INode = INode> {
  readonly node: T;
  stateIndex: number;
  children: SNode[] | null;
  propsExprs: number,
  childrenExprs: number;
  flags: number;
}

export const createSNode = (node: INodeElement, flags: number): SNode<INodeElement> => {
  const properties = node.properties;
  const iChildren = node.children;

  let propsExprs = 0;
  for (let i = 0; i < properties.length; i++) {
    if (typeof properties[i].value === "number") {
      propsExprs++;
    }
  }

  let children: SNode[] | null = null;
  let siblingsFlags = 0;
  let childrenExprs = 0;
  let i = iChildren.length;
  if (i > 0) {
    children = Array(i);
    while (i > 0) {
      const child = iChildren[--i];
      switch (child.type) {
        case NODE_TYPE_ELEMENT:
          const sNode = createSNode(child, siblingsFlags);
          if (sNode.flags & SNodeFlags.HasExpressions) {
            flags |= SNodeFlags.HasExpressions;
            siblingsFlags |= SNodeFlags.HasNextExpressions;
          }
          siblingsFlags |= SNodeFlags.HasNextDOMNode;
          children[i] = sNode;
          break;
        case NODE_TYPE_EXPR:
          siblingsFlags |= SNodeFlags.HasNextExpressions;
          childrenExprs++;
          children[i] = {
            node: child,
            stateIndex: 0,
            children: null,
            childrenExprs: 0,
            propsExprs: 0,
            flags: siblingsFlags,
          };
          break;
        case NODE_TYPE_TEXT:
          children[i] = {
            node: child,
            stateIndex: 0,
            children: null,
            childrenExprs: 0,
            propsExprs: 0,
            flags: siblingsFlags,
          };
          siblingsFlags |= SNodeFlags.HasNextDOMNode;
      }
    }
  }

  if (propsExprs > 0 || childrenExprs > 0) {
    flags |= SNodeFlags.HasExpressions;
  }

  return {
    node,
    stateIndex: 0,
    children,
    childrenExprs,
    propsExprs,
    flags,
  };
};
