import {
  NODE_TYPE_ELEMENT,
  NODE_TYPE_EXPR,
  NODE_TYPE_TEXT,
  PROPERTY_TYPE_ATTRIBUTE,
  type INode, type INodeElement, type IProperty,
} from "./ir.js";

export const normalizeTemplate = (nodes: INode[]): INode[] => {
  const n: INode[] = [];
  let text = "";
  for (let i = 0; i < nodes.length; i++) {
    const c = nodes[i];
    switch (c.type) {
      case NODE_TYPE_ELEMENT:
        if (text !== "") {
          n.push({
            type: NODE_TYPE_TEXT,
            value: text,
          });
          text = "";
        }
        n.push({
          ...c,
          children: normalizeTemplate(c.children),
        });
        break;
      case NODE_TYPE_EXPR:
        if (text !== "") {
          n.push({
            type: NODE_TYPE_TEXT,
            value: text,
          });
          text = "";
        }
        n.push(c);
        break;
      case NODE_TYPE_TEXT:
        text += c.value;
    }
  }
  if (text !== "") {
    n.push({
      type: NODE_TYPE_TEXT,
      value: text,
    });
  }
  return n;
};

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
    if (!isStaticProperty(properties[i])) {
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

export const isStaticProperty = (prop: IProperty) => (
  (typeof prop.value !== "number") ||
  (
    prop.type === PROPERTY_TYPE_ATTRIBUTE &&
    prop.key === "class" &&
    prop.hoist === true
  )
);
