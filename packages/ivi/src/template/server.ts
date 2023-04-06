import {
  type INode, type INodeElement, type ITemplate, type IProperty,
  INodeType, IPropertyType,
} from "./ir.js";
import {
  type SNode, SNodeFlags, createSNode, isVoidElement,
} from "./shared.js";
import {
  type TElement, type TNode, type TProperty, type TStyle,
  TFlags,
} from "../server/template.js";
import { escapeText } from "../server/escape.js";

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
        roots.push(escapeText(child.value));
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

const _createExprMap = (exprMap: Map<number, number>, node: INode) => {
  switch (node.type) {
    case INodeType.Element:
      const { tag, properties, children } = node;
      for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];
        const value = prop.value;
        if (typeof value === "number" && isSerializableDynamicProp(tag, prop)) {
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

const createTElement = (
  exprMap: Map<number, number>,
  sNode: SNode<INodeElement>,
): TElement => {
  const node = sNode.node;
  const { tag, properties } = node;

  let innerHTML: number | undefined;
  let suffix: string;
  let children: TNode[] | number | null = null;
  let props: TProperty[] | null = null;
  let style: TStyle | null = null;
  let flags = 0;
  let prefix = `<${tag}`;

  if (properties.length > 0) {
    let styleDynamic: TProperty[] | null = null;
    let styleStatic = "";
    for (let i = 0; i < properties.length; i++) {
      const { key, value, type } = properties[i];
      if (type === IPropertyType.Attribute) {
        if (typeof value === "number") {
          props = pushProp(props, ` ${key}`, 0, exprMap.get(value)!);
        } else if (value === true) {
          prefix += ` ${key}`;
        } else {
          if (key === "style") {
            styleStatic += `${value};`;
          } else {
            prefix += ` ${key}="${value}"`;
          }
        }
      } else if (type === IPropertyType.Value || type === IPropertyType.DOMValue) {
        if (key === "value") {
          if (tag === "input") {
            props = pushProp(
              props,
              ` value`,
              TFlags.IgnoreEmptyString,
              exprMap.get(value)!,
            );
          } else if (tag === "textarea") {
            flags |= TFlags.EscapeInnerHTML;
            innerHTML = exprMap.get(value);
          }
        } else if (key === "checked") {
          if (tag === "input") {
            props = pushProp(
              props,
              ` checked`,
              0,
              exprMap.get(value)!,
            );
          }
        } else if (key === "selected") {
          if (tag === "option") {
            props = pushProp(
              props,
              ` selected`,
              0,
              exprMap.get(value)!,
            );
          }
        } else if (key === "textContent") {
          flags |= TFlags.EscapeInnerHTML;
          innerHTML = exprMap.get(value);
        } else if (key === "innerHTML") {
          innerHTML = exprMap.get(value);
        }
      } else if (type === IPropertyType.Style) {
        if (typeof value === "string") {
          styleStatic += `${key}:${value};`;
        } else {
          styleDynamic = pushProp(styleDynamic, `${key}:`, 0, exprMap.get(value)!);
        }
      }
    }
    if (styleDynamic !== null) {
      style = {
        stat: styleStatic,
        dyn: styleDynamic,
      };
    } else if (styleStatic) {
      prefix += ` style="${styleStatic}"`;
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
            children.push(escapeText(child.node.value));
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
    props,
    style,
    children,
  };
};

const pushProp = (
  props: TProperty[] | null,
  prefix: string,
  flags: number,
  i: number,
): TProperty[] => {
  if (props === null) {
    props = [];
  }
  props.push({ flags, prefix, i });
  return props;
};

const isSerializableDynamicProp = (tag: string, prop: IProperty): boolean => {
  const type = prop.type;
  if (type === IPropertyType.Attribute) {
    if (prop.key === "class" && prop.hoist === true) {
      return false;
    }
    return true;
  }
  if (type === IPropertyType.Value || type === IPropertyType.DOMValue) {
    const key = prop.key;
    if (tag === "input") {
      if (key === "value" || key === "checked") {
        return true;
      }
    } else if (tag === "textarea") {
      if (key === "value") {
        return true;
      }
    } else if (tag === "option") {
      if (key === "selected") {
        return true;
      }
    }
    if (key === "textContent" || key === "innerHTML") {
      return true;
    }
    return false;
  }
  if (type === IPropertyType.Style) {
    return true;
  }
  return false;
};
