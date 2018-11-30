import {
  NodeFlags, OpNode, Op, OpArray, ElementData,
  ComponentDescriptor, StatelessComponentDescriptor,
  ElementProtoDescriptor, ContextData, Key,
  createStateNode,
  setContext, restoreContext,
} from "ivi";
import { escapeAttributeValue, escapeText } from "./escape";

/**
 * Renders element attributes to string.
 *
 * @param attrs - Element attributes
 * @returns Element attributes in a string format
 */
export function emitElementAttrs(attrs: { [key: string]: any }): string {
  let result = "";

  for (const key in attrs) {
    const value = attrs[key];
    if (key === "style") {
      result += emitElementStyle(value);
    } else {
      if (typeof value === "object") {
        // skip attribute directives
      } else if (typeof value !== "boolean") {
        if (value !== null) {
          result += ` ${key}="${escapeAttributeValue(value)}"`;
        }
      } else {
        if (value === true) {
          result += ` ${key}`;
        }
      }
    }
  }

  return result;
}

/**
 * Renders element styles to string.
 *
 * @param style - Element styles
 * @returns Element styles in a string format
 */
export function emitElementStyle(style: { [key: string]: any }): string {
  let result = ` style="`;
  let semicolon = false;
  for (const key in style) {
    const value = style[key];
    if (semicolon === true) {
      result += ";";
    } else {
      semicolon = true;
    }
    result += `${key}:${escapeAttributeValue(value)}`;
  }

  if (semicolon === false) {
    return "";
  }

  return `${result}"`;
}

/**
 * Renders open tag for an element.
 *
 * @param op - Virtual DOM node
 * @returns Open tag in a string format
 */
export function emitElementOpen(op: OpNode<ElementData>): string {
  const data = op.d;
  let result = `<${op.t.d}`;
  let value;

  value = data.n;
  if (value !== void 0 && value !== "") {
    result += ` class="${value}"`;
  }
  value = data.a;
  if ((op.t.f & NodeFlags.ElementProto) !== 0) {
    value = { ...(op.t.d as ElementProtoDescriptor).p.d.a, ...value };
  }
  if (value !== void 0) {
    result += emitElementAttrs(value);
  }
  result += ">";

  return result;
}

export function emitElementClose(op: OpNode<ElementData>): string {
  return `</${op.t.d}>`;
}

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

function renderObject(op: OpNode): string {
  const flags = op.t.f;
  let result;
  if ((flags & NodeFlags.Element) !== 0) {
    result = emitElementOpen(op);
    const childrenString = renderToString((op as OpNode<ElementData>).d.c);
    if ((flags & NodeFlags.NewlineEatingElement) !== 0) {
      if (childrenString.length > 0 && childrenString.charCodeAt(0) === 10) { // "\n"
        result += "\n";
      }
    }
    return result + childrenString + emitElementClose(op);
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
  if ((flags & (NodeFlags.Events | NodeFlags.Ref | NodeFlags.Context)) !== 0) {
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
  const children = (op.d as Key<any, Op>[]);
  for (let i = 0; i < children.length; ++i) {
    result += renderToString(children[i].v);
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
