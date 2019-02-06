import { NodeFlags } from "../vdom/node_flags";
import { AttributeDirective } from "../vdom/attribute_directive";
import { OpNode, Op, OpArray, ElementData, ContextData, Key } from "../vdom/operations";
import { ComponentDescriptor, StatelessComponentDescriptor } from "../vdom/component";
import { ElementProtoDescriptor } from "../vdom/element_proto";
import { createStateNode } from "../vdom/state";
import { setContext, restoreContext } from "../vdom/context";
import { escapeAttributeValue, escapeText } from "./escape";

function renderText(text: string | number): string {
  if (typeof text === "string") {
    return escapeText(text);
  }
  return text.toString();
}

function renderFragment(children: OpArray): string {
  let result = "";
  for (let i = 0; i < children.length; ++i) {
    result += renderToString(children[i]);
  }
  return result;
}

let _attributes = "";
let _styles = "";
let _children = "";

export function emitAttribute(attr: string): void {
  _attributes += ` ${attr}`;
}

export function emitStyle(style: string): void {
  if (_styles !== "") {
    _styles += ";";
  }
  _styles += style;
}

export function emitChildren(children: string | number): void {
  _children += children;
}

function renderObject(op: OpNode): string {
  const flags = op.t.f;
  let result;
  if ((flags & NodeFlags.Element) !== 0) {
    const data = op.d;
    _attributes = "";
    _styles = "";
    _children = "";

    const className = data.n;
    if (className !== void 0 && className !== "") {
      emitAttribute(`class="${className}"`);
    }
    let attrs = data.a;
    if ((op.t.f & NodeFlags.ElementProto) !== 0 && (op.t.d as ElementProtoDescriptor).p.d.a !== void 0) {
      attrs = { ...(op.t.d as ElementProtoDescriptor).p.d.a, ...attrs };
    }
    if (attrs !== void 0) {
      for (const key in attrs) {
        const value = attrs[key];
        if (key === "style") {
          for (const skey in value) {
            emitStyle(`${skey}:${escapeAttributeValue(value[skey])}`);
          }
        } else {
          if (typeof value === "object") {
            (value as AttributeDirective<any>).s!(key, (value as AttributeDirective<any>).v);
          } else if (typeof value !== "boolean") {
            if (value !== null) {
              emitAttribute(`${key}="${escapeAttributeValue(value)}"`);
            }
          } else if (value === true) {
            emitAttribute(key);
          }
        }
      }
      if (_styles !== "") {
        emitAttribute(`style="${_styles}"`);
      }
    }
    const openElement = `<${op.t.d}${_attributes}`;
    let children = _children;
    if (children === "") {
      children = renderToString((op as OpNode<ElementData>).d.c);
    }
    if ((flags & NodeFlags.NewlineEatingElement) !== 0) {
      if (children.length > 0 && children.charCodeAt(0) === 10) { // "\n"
        children = `\n${children}`;
      }
    }
    return (
      (flags & NodeFlags.VoidElement) !== 0 ||
      ((flags & NodeFlags.Svg) !== 0 && children === "")
    ) ?
      `${openElement} />` :
      `${openElement}>${children}</${op.t.d}>`;
  }
  if ((flags & NodeFlags.Component) !== 0) {
    if ((flags & NodeFlags.Stateful) !== 0) {
      const stateNode = createStateNode(op);
      stateNode.s = { r: null, s: null, u: null };
      return renderToString((op.t.d as ComponentDescriptor).c(stateNode)(op.d));
    } else {
      return renderToString((op.t.d as StatelessComponentDescriptor).c(op.d));
    }
  }
  if ((flags & (NodeFlags.Events | NodeFlags.Context)) !== 0) {
    if ((flags & NodeFlags.Context) !== 0) {
      const contextData = (op.d as ContextData);
      const prevContext = setContext(contextData.v);
      result = renderToString(contextData.c);
      restoreContext(prevContext);
      return result;
    } else {
      return renderToString(op.d.children);
    }
  }

  result = "";
  const childrenNodes = (op.d as Key<any, Op>[]);
  for (let i = 0; i < childrenNodes.length; ++i) {
    result += renderToString(childrenNodes[i].v);
  }
  return result;
}

/**
 * Renders a {@link OpNode} to string.
 *
 * @param op {@link OpNode}
 * @param context Current context.
 * @returns Rendering results.
 */
export function renderToString(op: Op): string {
  if (op !== null) {
    if (typeof op === "object") {
      if (op instanceof Array) {
        return renderFragment(op);
      }
      return renderObject(op);
    }
    return renderText(op);
  }
  return "";
}
