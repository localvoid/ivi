import {
  type INodeElement, type ITemplate, INodeType, IPropertyType
} from "./ir.js";
import {
  type SNode, SNodeFlags, createSNode, isVoidElement,
} from "./shared.js";
import {
  type TElement, type TemplateDescriptor, type TNode, type TProperty,
  TFlags
} from "../ssr.js";

export const compileTemplate = (tpl: ITemplate): TemplateDescriptor => {
  const result: TemplateDescriptor = [];
  const children = tpl.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case INodeType.Element:
        const sNode = createSNode(child, 0);
        result.push(createTElement(sNode));
        break;
      case INodeType.Text:
        result.push(child.value);
        break;
      case INodeType.Expr:
        result.push(child.value);
        break;
    }
  }

  return result;
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

const createTElement = (sNode: SNode<INodeElement>): TElement => {
  const node = sNode.node;
  const { tag, properties } = node;
  const children: TNode[] = [];
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
          props = pushAttr(props, '"', ` ${key}="`, value);
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
          if (tag === "input" || tag === "textarea") {
            props = pushAttr(props, '"', ` value="`, value);
          }
        } else if (key === "checked") {
          if (tag === "input") {
            props = pushAttr(props, '"', ` checked="`, value);
          }
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
          styleDynamic.push({ prefix: key, i: value });
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
    if (sChildren !== null) {
      for (let i = 0; i < sChildren.length; i++) {
        const child = sChildren[i];
        switch (child.node.type) {
          case INodeType.Element:
            children.push(createTElement(child as SNode<INodeElement>));
            break;
          case INodeType.Text:
            children.push(child.node.value);
            break;
          case INodeType.Expr:
            if (child.flags & SNodeFlags.HasNextDOMNode) {
              flags |= TFlags.GenerateOffsets;
            }
            children.push(child.node.value);
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
    children: children.length !== 0
      ? children
      : null,
  };
};
