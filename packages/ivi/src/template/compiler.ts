import {
  TemplateFlags, ChildOpCode, CommonPropType, PropOpCode, StateOpCode,
} from "../lib/template.js";
import {
  type INode, type ITemplate, type INodeElement, type ITemplateType,
  NODE_TYPE_ELEMENT,
  NODE_TYPE_EXPR,
  NODE_TYPE_TEXT,
  TEMPLATE_TYPE_SVG,
  PROPERTY_TYPE_ATTRIBUTE,
  PROPERTY_TYPE_STYLE,
  PROPERTY_TYPE_VALUE,
  PROPERTY_TYPE_DOMVALUE,
  PROPERTY_TYPE_EVENT,
  PROPERTY_TYPE_DIRECTIVE,
} from "./ir.js";
import {
  type SNode, SNodeFlags,
  createSNode,
} from "./shared.js";

export interface TemplateCompilationArtifact {
  /** Root Nodes */
  readonly roots: TemplateNode[],
}

export enum TemplateNodeType {
  Block = 0,
  Text = 1,
  Expr = 2,
}

export interface TemplateNodeBlock {
  /** Node type */
  readonly type: TemplateNodeType.Block;
  /** Template Flags */
  readonly flags: TemplateFlags;
  /** Static Template */
  readonly template: (string | number)[] | string,
  /** Prop OpCodes */
  readonly props: number[],
  /** Child OpCodes */
  readonly child: number[],
  /** State OpCodes */
  readonly state: number[],
  /** Data */
  readonly data: string[],
  /** Dynamic Expressions */
  readonly exprs: number[],
}

export interface TemplateNodeText {
  readonly type: TemplateNodeType.Text;
  readonly value: string;
}

export interface TemplateNodeExpr {
  readonly type: TemplateNodeType.Expr;
  readonly value: number;
}

export type TemplateNode =
  | TemplateNodeBlock
  | TemplateNodeText
  | TemplateNodeExpr
  ;

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
    case NODE_TYPE_ELEMENT:
      return compileRootElement(node, type);
    case NODE_TYPE_EXPR:
      return {
        type: TemplateNodeType.Expr,
        value: node.value,
      };
    case NODE_TYPE_TEXT:
      return {
        type: TemplateNodeType.Text,
        value: node.value,
      };
  }
};

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
      (type === TEMPLATE_TYPE_SVG ? TemplateFlags.Svg : 0)
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
      exprMap.set(value, exprMap.size);
    }
  }

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const type = child.type;
    if (type === NODE_TYPE_ELEMENT) {
      _createExprMap(exprMap, child);
    } else if (type === NODE_TYPE_EXPR) {
      exprMap.set(child.value, exprMap.size);
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
  let style = "";

  staticTemplate.push(`<${tag}`);
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    const { type, key, value } = prop;
    if (type === PROPERTY_TYPE_ATTRIBUTE) {
      if (key === "style") {
        if (typeof value === "string") {
          if (style !== "") {
            style += `;${value}`;
          } else {
            style = value;
          }
        }
      } else {
        if (value === true) {
          staticTemplate.push(` ${key}`);
        } else if (typeof value === "string") {
          staticTemplate.push(` ${key}="${value}"`);
        }
      }
    } else if (type === PROPERTY_TYPE_STYLE) {
      if (typeof value === "string") {
        if (style !== "") {
          style += `;${key}:${value}`;
        } else {
          style = `${key}:${value}`;
        }
      }
    }
  }
  if (style !== "") {
    staticTemplate.push(` style="${style}"`);
  }
  staticTemplate.push(`>`);
  if (VOID_ELEMENTS.test(tag)) {
    if (children.length > 0) {
      throw new TemplateCompilerError(`Invalid template, void element '${tag}' shouldn't have any children.`);
    }
    return;
  }

  let state = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case NODE_TYPE_ELEMENT:
        _emitStaticTemplate(staticTemplate, child);
        state = 0;
        break;
      case NODE_TYPE_TEXT:
        if ((state & 3) === 3) {
          staticTemplate.push("<!>");
        }
        state = 1;
        staticTemplate.push(child.value);
        break;
      case NODE_TYPE_EXPR:
        state |= 2;
        break;
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
  if (iNode.type === NODE_TYPE_ELEMENT) {
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
            case PROPERTY_TYPE_ATTRIBUTE:
              const exprIndex = exprMap.get(value)!;
              if (exprIndex !== -1) {
                if (key === "class") {
                  opCodes.push(
                    PropOpCode.Common |
                    (CommonPropType.ClassName << PropOpCode.DataShift) |
                    (exprIndex << PropOpCode.InputShift)
                  );
                } else {
                  opCodes.push(
                    PropOpCode.Attribute |
                    (getDataIndex(data, dataMap, key) << PropOpCode.DataShift) |
                    (exprIndex << PropOpCode.InputShift)
                  );
                }
              }
              break;
            case PROPERTY_TYPE_VALUE:
              if (key === "textContent") {
                opCodes.push(
                  PropOpCode.Common |
                  (CommonPropType.TextContent << PropOpCode.DataShift) |
                  (exprMap.get(value)! << PropOpCode.InputShift)
                );
              } else if (key === "innerHTML") {
                opCodes.push(
                  PropOpCode.Common |
                  (CommonPropType.InnerHTML << PropOpCode.DataShift) |
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
            case PROPERTY_TYPE_DOMVALUE:
              if (key === "textContent") {
                opCodes.push(
                  PropOpCode.Common |
                  (CommonPropType.TextContent << PropOpCode.DataShift) |
                  (exprMap.get(value)! << PropOpCode.InputShift)
                );
              } else if (key === "innerHTML") {
                opCodes.push(
                  PropOpCode.Common |
                  (CommonPropType.InnerHTML << PropOpCode.DataShift) |
                  (exprMap.get(value)! << PropOpCode.InputShift)
                );
              } else {
                opCodes.push(
                  PropOpCode.DiffDOMProperty |
                  (getDataIndex(data, dataMap, key) << PropOpCode.DataShift) |
                  (exprMap.get(value)! << PropOpCode.InputShift)
                );
              }
              break;
            case PROPERTY_TYPE_STYLE:
              opCodes.push(
                PropOpCode.Style |
                (getDataIndex(data, dataMap, key) << PropOpCode.DataShift) |
                (exprMap.get(value)! << PropOpCode.InputShift)
              );
              break;
            case PROPERTY_TYPE_EVENT:
              opCodes.push(
                PropOpCode.Event |
                (getDataIndex(data, dataMap, key) << PropOpCode.DataShift) |
                (exprMap.get(value)! << PropOpCode.InputShift)
              );
              break;
            case PROPERTY_TYPE_DIRECTIVE:
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
        case NODE_TYPE_ELEMENT: {
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
        case NODE_TYPE_TEXT: {
          if ((state & (VisitState.PrevText | VisitState.PrevExpr)) === (VisitState.PrevText | VisitState.PrevExpr)) {
            opCodes.push(StateOpCode.EnterOrRemove);
          } else if (state & VisitState.PrevExpr) {
            opCodes.push(StateOpCode.Save);
          } else {
            if (
              (child.flags & (SNodeFlags.HasNextExpressions | SNodeFlags.HasNextDOMNode)) !==
              (SNodeFlags.HasNextExpressions | SNodeFlags.HasNextDOMNode)
            ) {
              break outer;
            } else {
              opCodes.push(0);
            }
          }
          state = 1;
          break;
        }
        case NODE_TYPE_EXPR:
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
        if (child.node.type === NODE_TYPE_EXPR) {
          if (prev !== void 0 && prev.node.type !== NODE_TYPE_EXPR) {
            opCodes.push(ChildOpCode.SetNext | (prev.stateIndex << ChildOpCode.ValueShift));
          }
          opCodes.push(ChildOpCode.Child | (exprMap.get(child.node.value)! << ChildOpCode.ValueShift));
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
      if (child.node.type === NODE_TYPE_ELEMENT) {
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
        case NODE_TYPE_ELEMENT:
          if (prevExpr) {
            child.stateIndex = stateIndex++;
            prevExpr = false;
          } else if (child.propsExprs > 0 || child.childrenExprs > 0) {
            child.stateIndex = stateIndex++;
          }
          stateIndex = _assignStateSlots(child, stateIndex);
        case NODE_TYPE_TEXT:
          if (prevExpr) {
            child.stateIndex = stateIndex++;
            prevExpr = false;
          }
          break;
        case NODE_TYPE_EXPR:
          prevExpr = true;
      }
    }
  }
  return stateIndex;
};
