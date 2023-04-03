import {
  type INode, type INodeElement, type ITemplate, type IProperty,
  INodeType, IPropertyType,
} from "./ir.js";
import {
  type SNode, SNodeFlags, createSNode, isVoidElement,
} from "./shared.js";
import {
  type TElement, type TNode, type TProperty,
  TFlags
} from "../server/template.js";

export interface TemplateCompilationArtifact {
  readonly roots: TNode[];
  readonly exprs: number[];
}

export const compileTemplate = (tpl: ITemplate): TemplateCompilationArtifact => {
  const exprMap = createExprMap(tpl);
  const roots = [];
  const children = tpl.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case INodeType.Element:
        const sNode = createSNode(child, 0);
        roots.push(createTElement(exprMap, sNode));
        break;
      case INodeType.Text:
        roots.push(child.value);
        break;
      case INodeType.Expr:
        roots.push(exprMap.get(child.value)!);
        break;
    }
  }

  return {
    roots,
    exprs: Array.from(exprMap.keys()),
  };
};

const createExprMap = (tpl: ITemplate): Map<number, number> => {
  const exprMap = new Map<number, number>();
  const children = tpl.children;
  for (let i = 0; i < children.length; i++) {
    _createExprMap(exprMap, children[i]);
  }
  return exprMap;
};

const isSerializableDynamicProp = (prop: IProperty): boolean => {
  const type = prop.type;
  if (type === IPropertyType.Attribute) {
    if (prop.key === "class" && prop.hoist === true) {
      return false;
    }
    return true;
  }
  if (type === IPropertyType.Value || type === IPropertyType.DOMValue) {
    const key = prop.key;
    if (key === "value" || key === "checked" || key === "innerHTML") {
      return true;
    }
    return false;
  }
  if (type === IPropertyType.Style) {
    return true;
  }
  return false;
};

const _createExprMap = (exprMap: Map<number, number>, node: INode) => {
  switch (node.type) {
    case INodeType.Element:
      const { properties, children } = node;
      for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];
        const value = prop.value;
        if (typeof value === "number" && isSerializableDynamicProp(prop)) {
          exprMap.set(value, exprMap.size);
        }
      }
      for (let i = 0; i < children.length; i++) {
        _createExprMap(exprMap, children[i]);
      }
      break;
    case INodeType.Text:
      break;
    case INodeType.Expr:
      exprMap.set(node.value, exprMap.size);
  }
};

const pushAttr = (
  props: TProperty[] | undefined,
  separator: string,
  prefix: string,
  i: number,
) => {
  if (props === void 0) {
    props = [];
  } else {
    prefix = separator + prefix;
  }
  props.push({ prefix, i });
  return props;
};

const createTElement = (
  exprMap: Map<number, number>,
  sNode: SNode<INodeElement>,
): TElement => {
  const node = sNode.node;
  const { tag, properties } = node;
  let children: TNode[] | number | null = null;
  let innerHTML: number | undefined;
  let props: TProperty[] | undefined;
  let suffix: string;
  let flags = 0;
  let prefix = `<${tag}`;

  if (properties.length > 0) {
    let styleDynamic: TProperty[] | undefined;
    let stylePrefix = "";
    for (let i = 0; i < properties.length; i++) {
      const { key, value, type } = properties[i];
      if (type === IPropertyType.Attribute) {
        if (typeof value === "number") {
          props = pushAttr(props, '"', ` ${key}="`, exprMap.get(value)!);
        } else if (value === true) {
          prefix += ` ${key}`;
        } else {
          if (key === "style") {
            if (stylePrefix === "") {
              stylePrefix = ` style="${value}`;
            } else {
              stylePrefix += `;${value}`;
            }
          } else {
            prefix += ` ${key}="${value}"`;
          }
        }
      } else if (type === IPropertyType.Value || type === IPropertyType.DOMValue) {
        if (key === "value") {
          if (tag === "input") {
            props = pushAttr(props, '"', ` value="`, exprMap.get(value)!);
          } else if (tag === "textarea") {
            flags |= TFlags.EscapeInnerHTML;
            innerHTML = exprMap.get(value);
          }
        } else if (key === "checked") {
          if (tag === "input") {
            props = pushAttr(props, '"', ` checked="`, exprMap.get(value)!);
          }
        } else if (key === "innerHTML") {
          innerHTML = value;
        }
      } else if (type === IPropertyType.Style) {
        if (typeof value === "string") {
          if (stylePrefix === "") {
            stylePrefix = ` style="${key}:${value}`;
          } else {
            stylePrefix += `;${key}:${value}`;
          }
        } else {
          if (styleDynamic === void 0) {
            styleDynamic = [];
          }
          styleDynamic.push({ prefix: key, i: exprMap.get(value)! });
        }
      }
    }
    if (styleDynamic === void 0) {
      if (stylePrefix !== "") {
        prefix += stylePrefix + '"';
      }
    } else {
      if (stylePrefix === "") {
        stylePrefix = ` style="`;
      } else {
        stylePrefix += ";";
      }
      for (let i = 0; i < styleDynamic.length; i++) {
        const s = styleDynamic[i];
        if (i === 0) {
          props = pushAttr(props, "", `${stylePrefix}${s.prefix}:`, s.i);
        } else {
          props = pushAttr(props, "", `;${s.prefix}:`, s.i);
        }
      }
    }
  }

  const sChildren = sNode.children;
  if (isVoidElement(tag)) {
    if (sChildren !== null) {
      throw new Error(`Invalid template, void element '${tag}' shouldn't have any children.`);
    }
    suffix = "";
  } else {
    if (innerHTML !== void 0) {
      children = innerHTML;
    } else if (sChildren !== null && sChildren.length > 0) {
      children = [];
      for (let i = 0; i < sChildren.length; i++) {
        const child = sChildren[i];
        switch (child.node.type) {
          case INodeType.Element:
            children.push(createTElement(exprMap, child as SNode<INodeElement>));
            break;
          case INodeType.Text:
            children.push(child.node.value);
            break;
          case INodeType.Expr:
            if (child.flags & SNodeFlags.HasNextDOMNode) {
              flags |= TFlags.GenerateOffsets;
            }
            children.push(exprMap.get(child.node.value)!);
        }
      }
    }
    suffix = `</${tag}>`;
  }
  return {
    flags,
    prefix,
    suffix,
    props: props !== void 0
      ? props
      : null,
    children,
  };
};
