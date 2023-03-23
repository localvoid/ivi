import {
  type TemplateCompilationArtifact, type TemplateNode, type TemplateNodeBlock,
  TemplateNodeType, TemplateFlags, ChildOpCode, CommonPropType, PropOpCode,
  StateOpCode,
} from "./format.js";
import {
  type INode, type ITemplate, type INodeElement, type IProperty,
  INodeType, IPropertyType, ITemplateType,
} from "./ir.js";

export const compileTemplate = (tpl: ITemplate): TemplateCompilationArtifact => {
  return {
    roots: tpl.children.map((node) => compileTemplateNode(node, tpl.type)),
  };
};

export class TemplateCompilerError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

const compileTemplateNode = (node: INode, type: ITemplateType): TemplateNode => {
  switch (node.type) {
    case INodeType.Element:
      return compileRootElement(node, type);
    case INodeType.Expr:
      return {
        type: TemplateNodeType.Expr,
        value: node.index,
      };
    case INodeType.Text:
      return {
        type: TemplateNodeType.Text,
        value: node.value,
      };
  }
};

const enum SNodeFlags {
  /** Has expressions in the subtree. */
  HasExpressions = 1,
  /** Has expressions in the subtrees of next siblings. */
  HasNextExpressions = 1 << 1,
  /** Has next DOM node. */
  HasNextDOMNode = 1 << 2,
}

interface SNode<T extends INode = INode> {
  readonly node: T;
  stateIndex: number;
  children: SNode[] | null;
  propsExprs: number,
  childrenExprs: number;
  flags: number;
}

const compileRootElement = (
  element: INodeElement,
  type: ITemplateType,
): TemplateNodeBlock => {
  // Emits a static template. It can be either a string if it is an element
  // without any static parts, or an array of strings and expression indices.
  const template = emitStaticTemplate(element);
  // Creates a new tree with additional data for compilation.
  const sRoot = createSNode(element, 0);
  // Assigns state slots in DFS LTR order.
  assignStateSlots(sRoot);
  // Creates dynamic expressions map that stores expr indices that will be
  // used in the current template block.
  const exprMap = createExprMap(element);
  if (exprMap.size > 64) {
    throw Error("Exceeded maximum number (64) of expressions per template block.");
  }

  // Emits state OpCodes and traverses tree in DFS LTR order.
  const state = emitStateOpCodes(sRoot);
  // Emits props OpCodes and traverses tree in DFS LTR order.
  const data: string[] = [];
  const props = emitPropsOpCodes(sRoot, data, exprMap);
  // Emits child OpCodes and traverses tree in DFS RTL order.
  const child = emitChildOpCodes(sRoot, exprMap);

  const stateSlots = countStateSlots(state);
  if (stateSlots > 64) {
    throw Error("Exceeded maximum number (64) of state slots per template block.");
  }

  const childSlots = countChildSlots(child);
  if (childSlots > 64) {
    throw Error("Exceeded maximum number (64) of child slots per template block.");
  }

  return {
    type: TemplateNodeType.Block,
    flags: (
      (stateSlots) |
      (childSlots << TemplateFlags.ChildrenSizeShift) |
      (type === ITemplateType.Svg ? TemplateFlags.Svg : 0)
    ),
    template,
    props,
    child,
    state,
    data,
    exprs: Array.from(exprMap.keys()),
  };
};

const countStateSlots = (stateOpCodes: number[]) => {
  let count = 1; // Root node always occupy 1 slot.
  for (let i = 0; i < stateOpCodes.length; i++) {
    const op = stateOpCodes[i];
    if (
      (op & StateOpCode.Save) ||
      ((op & StateOpCode.EnterOrRemove) && (op >> StateOpCode.OffsetShift) === 0)
    ) {
      count++;
    }
  }
  return count;
};

const countChildSlots = (childOpCodes: number[]) => {
  let count = 0;
  for (let i = 0; i < childOpCodes.length; i++) {
    if ((childOpCodes[i] & ChildOpCode.Type) === ChildOpCode.Child) {
      count++;
    }
  }
  return count;
};

const createExprMap = (
  root: INodeElement,
) => {
  const exprMap = new Map<number, number>();
  _createExprMap(exprMap, root);
  return exprMap;
};

const _createExprMap = (
  exprMap: Map<number, number>,
  node: INodeElement,
) => {
  const { properties, children } = node;
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    const value = prop.value;
    if (typeof value === "number") {
      if (!isStaticProperty(prop)) {
        exprMap.set(value, exprMap.size);
      }
    }
  }

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const type = child.type;
    if (type === INodeType.Element) {
      _createExprMap(exprMap, child);
    } else if (type === INodeType.Expr) {
      exprMap.set(child.index, exprMap.size);
    }
  }
};

const emitStaticTemplate = (root: INodeElement) => {
  const staticTemplate: Array<string | number> = [];
  _emitStaticTemplate(staticTemplate, root);
  if (staticTemplate.length <= 3 && staticTemplate[1] === ">") {
    return root.tag;
  }
  return staticTemplate;
};

const VOID_ELEMENTS = /^(audio|video|embed|input|param|source|textarea|track|area|base|link|meta|br|col|hr|img|wbr)$/;

const _emitStaticTemplate = (
  staticTemplate: Array<string | number>,
  node: INodeElement,
) => {
  const { tag, properties, children } = node;

  staticTemplate.push(`<${tag}`);
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    const type = prop.type;
    if (type === IPropertyType.Attribute) {
      const { key, value } = prop;
      if (typeof value === "number") {
        if (key === "class" && prop.static === true) {
          staticTemplate.push(value);
        }
      } else if (value === true) {
        staticTemplate.push(` ${key}`);
      } else {
        staticTemplate.push(` ${key}="${value}"`);
      }
    }
  }
  staticTemplate.push(`>`);
  if (children.length > 0) {
    if (VOID_ELEMENTS.test(tag)) {
      throw new TemplateCompilerError(`Invalid template, void element '${tag}' shouldn't have any children.`);
    }
    let state = 0;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      switch (child.type) {
        case INodeType.Element:
          _emitStaticTemplate(staticTemplate, child);
          state = 0;
          break;
        case INodeType.Text:
          if ((state & 3) === 3) {
            staticTemplate.push("<!>");
          }
          state = 1;
          staticTemplate.push(child.value);
          break;
        case INodeType.Expr:
          state |= 2;
          break;
      }
    }
  }
  staticTemplate.push(`</${tag}>`);
};

const getDataIndex = (
  data: string[],
  dataMap: Map<string, number>,
  key: string,
) => {
  let index = dataMap.get(key);
  if (index === void 0) {
    index = data.length;
    data.push(key);
    dataMap.set(key, index);
  }
  return index;
};

const emitPropsOpCodes = (
  root: SNode,
  data: string[],
  exprMap: Map<number, number>,
): number[] => {
  const dataMap = new Map<string, number>();
  const opCodes: number[] = [];
  _emitPropsOpCodes(opCodes, root, true, data, dataMap, exprMap);
  return opCodes;
};
const _emitPropsOpCodes = (
  opCodes: number[],
  node: SNode,
  isRoot: boolean,
  data: string[],
  dataMap: Map<string, number>,
  exprMap: Map<number, number>,
) => {
  const iNode = node.node;
  if (iNode.type === INodeType.Element) {
    if (node.propsExprs > 0) {
      if (isRoot === false) {
        opCodes.push(PropOpCode.SetNode | (node.stateIndex << PropOpCode.DataShift));
      }
      const properties = iNode.properties;
      for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];
        const value = prop.value;
        if (typeof value === "number") {
          const { type, key } = prop;
          switch (type) {
            case IPropertyType.Attribute:
              const exprIndex = exprMap.get(value)!;
              if (exprIndex !== -1) {
                if (key === "class") {
                  opCodes.push(
                    PropOpCode.Common |
                    (CommonPropType.ClassName << PropOpCode.DataShift) |
                    (exprMap.get(value)! << PropOpCode.InputShift)
                  );
                } else {
                  opCodes.push(
                    PropOpCode.Attribute |
                    (getDataIndex(data, dataMap, key) << PropOpCode.DataShift) |
                    (exprMap.get(value)! << PropOpCode.InputShift)
                  );
                }
              }
              break;
            case IPropertyType.Value:
              if (key === "textContent") {
                opCodes.push(
                  PropOpCode.Common |
                  (CommonPropType.TextContent << PropOpCode.DataShift) |
                  (exprMap.get(value)! << PropOpCode.InputShift)
                );
              } else {
                opCodes.push(
                  PropOpCode.Property |
                  (getDataIndex(data, dataMap, key) << PropOpCode.DataShift) |
                  (exprMap.get(value)! << PropOpCode.InputShift)
                );
              }
              break;
            case IPropertyType.DOMValue:
              opCodes.push(
                PropOpCode.DiffDOMProperty |
                (getDataIndex(data, dataMap, key) << PropOpCode.DataShift) |
                (exprMap.get(value)! << PropOpCode.InputShift)
              );
              break;
            case IPropertyType.Style:
              opCodes.push(
                PropOpCode.Style |
                (getDataIndex(data, dataMap, key) << PropOpCode.DataShift) |
                (exprMap.get(value)! << PropOpCode.InputShift)
              );
              break;
            case IPropertyType.Event:
              opCodes.push(
                PropOpCode.Event |
                (getDataIndex(data, dataMap, key) << PropOpCode.DataShift) |
                (exprMap.get(value)! << PropOpCode.InputShift)
              );
              break;
            case IPropertyType.Directive:
              opCodes.push(
                PropOpCode.Directive |
                (exprMap.get(value)! << PropOpCode.InputShift)
              );
              break;
          }
        }
      }
    }

    const children = node.children;
    if (children !== null) {
      for (let i = 0; i < children.length; i++) {
        _emitPropsOpCodes(opCodes, children[i], false, data, dataMap, exprMap);
      }
    }
  }
};

const emitStateOpCodes = (root: SNode<INodeElement>): number[] => {
  const opCodes: number[] = [];
  _emitStateOpCodes(opCodes, root);
  return opCodes;
};

const enum VisitState {
  PrevText = 1,
  PrevExpr = 1 << 1,
}

const _emitStateOpCodes = (
  opCodes: number[],
  node: SNode<INodeElement>,
) => {
  const children = node.children;
  if (children !== null) {
    let state = 0;
    outer: for (let i = 0; i < children.length; i++) {
      const child = children[i];
      switch (child.node.type) {
        case INodeType.Element: {
          let opCode = 0;
          if (
            state & VisitState.PrevExpr ||
            child.childrenExprs > 0 ||
            child.propsExprs > 0
          ) {
            opCode = StateOpCode.Save;
          }

          const currentOpCodeIndex = opCodes.length;
          opCodes.push(opCode);

          if (child.flags & SNodeFlags.HasExpressions) {
            _emitStateOpCodes(opCodes, child as SNode<INodeElement>);
            const childrenOffset = opCodes.length - (currentOpCodeIndex + 1);
            if (childrenOffset > 0) {
              opCode |= StateOpCode.EnterOrRemove | (childrenOffset << StateOpCode.OffsetShift);
              opCodes[currentOpCodeIndex] = opCode;
            }
          }
          if (
            (child.flags & (SNodeFlags.HasNextExpressions | SNodeFlags.HasNextDOMNode)) !==
            (SNodeFlags.HasNextExpressions | SNodeFlags.HasNextDOMNode)
          ) {
            if (opCode === 0) {
              opCodes.pop();
            }
            break outer;
          }
          state = 0;
          break;
        }
        case INodeType.Text: {
          if ((state & (VisitState.PrevText | VisitState.PrevExpr)) === (VisitState.PrevText | VisitState.PrevExpr)) {
            opCodes.push(StateOpCode.EnterOrRemove);
          } else if (state & VisitState.PrevExpr) {
            opCodes.push(StateOpCode.Save);
          }
          if (
            (child.flags & (SNodeFlags.HasNextExpressions | SNodeFlags.HasNextDOMNode)) !==
            (SNodeFlags.HasNextExpressions | SNodeFlags.HasNextDOMNode)
          ) {
            break outer;
          } else {
            opCodes.push(0);
          }
          state = 1;
          break;
        }
        case INodeType.Expr:
          state |= VisitState.PrevExpr;
          break;
      }
    }
  }
};

const emitChildOpCodes = (
  root: SNode<INodeElement>,
  exprMap: Map<number, number>,
): number[] => {
  const opCodes: number[] = [];
  _emitChildOpCodes(opCodes, root, true, exprMap);
  return opCodes;
};

const _emitChildOpCodes = (
  opCodes: number[],
  node: SNode,
  isRoot: boolean,
  exprMap: Map<number, number>,
) => {
  if (node.childrenExprs > 0) {
    const children = node.children;
    if (children !== null) {
      // Do not emit SetParent for root nodes
      if (isRoot === false) {
        opCodes.push(ChildOpCode.SetParent | (node.stateIndex << ChildOpCode.ValueShift));
      }
      let prev: SNode | undefined;
      let i = children.length;
      while (--i >= 0) {
        const child = children[i];
        if (child.node.type === INodeType.Expr) {
          if (prev !== void 0 && prev.node.type !== INodeType.Expr) {
            opCodes.push(ChildOpCode.SetNext | (prev.stateIndex << ChildOpCode.ValueShift));
          }
          opCodes.push(ChildOpCode.Child | (exprMap.get(child.node.index)! << ChildOpCode.ValueShift));
        }
        prev = child;
      }
    }
  }
  const children = node.children;
  if (children !== null) {
    let i = children.length;
    while (--i >= 0) {
      const child = children[i];
      if (child.node.type === INodeType.Element) {
        _emitChildOpCodes(opCodes, child, false, exprMap);
      }
    }
  }
};

const assignStateSlots = (root: SNode): number => (
  _assignStateSlots(root, 1)
);

const _assignStateSlots = (node: SNode, stateIndex: number): number => {
  const children = node.children;
  if (children !== null) {
    let prevExpr = false;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      switch (child.node.type) {
        case INodeType.Element:
          if (prevExpr) {
            child.stateIndex = stateIndex++;
            prevExpr = false;
          } else if (child.propsExprs > 0 || child.childrenExprs > 0) {
            child.stateIndex = stateIndex++;
          }
          stateIndex = _assignStateSlots(child, stateIndex);
        case INodeType.Text:
          if (prevExpr) {
            child.stateIndex = stateIndex++;
            prevExpr = false;
          }
          break;
        case INodeType.Expr:
          prevExpr = true;
      }
    }
  }
  return stateIndex;
};

const isStaticProperty = (prop: IProperty) => (
  (typeof prop.value !== "number") ||
  (
    prop.type === IPropertyType.Attribute &&
    prop.key === "class" &&
    prop.static === true
  )
);

const createSNode = (node: INodeElement, flags: number): SNode<INodeElement> => {
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
