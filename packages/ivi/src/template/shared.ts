import {
  type INode, type INodeElement, type IProperty,
  INodeType, IPropertyType
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
    if (!isStaticProperty(properties[i])) {
      propsExprs++;
    }
  }

  let siblingsFlags = 0;
  let childrenExprs = 0;
  let i = iChildren.length;
  const children: SNode[] = Array(i);

  while (i > 0) {
    const child = iChildren[--i];
    switch (child.type) {
      case INodeType.Element:
        const sNode = createSNode(child, siblingsFlags);
        if (sNode.flags & SNodeFlags.HasExpressions) {
          flags |= SNodeFlags.HasExpressions;
          siblingsFlags |= SNodeFlags.HasNextExpressions;
        }
        siblingsFlags |= SNodeFlags.HasNextDOMNode;
        children[i] = sNode;
        break;
      case INodeType.Expr:
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
      case INodeType.Text:
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
    prop.type === IPropertyType.Attribute &&
    prop.key === "class" &&
    prop.static === true
  )
);
