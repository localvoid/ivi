import {
  NodeFlags, OpNode, OpChildren, RecursiveOpChildrenArray, ElementData,
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
  const data = op.data;
  let result = `<${op.type.descriptor}`;
  let value;

  value = data.className;
  if (value !== void 0 && value !== "") {
    result += ` class="${value}"`;
  }
  value = data.attrs;
  if ((op.type.flags & NodeFlags.ElementProto) !== 0) {
    value = { ...(op.type.descriptor as ElementProtoDescriptor).proto.data.attrs, ...value };
  }
  if (value !== void 0) {
    result += emitElementAttrs(value);
  }
  result += ">";

  return result;
}

export function emitElementClose(op: OpNode<ElementData>): string {
  return `</${op.type.descriptor}>`;
}

function renderText(text: string | number): string {
  if (typeof text === "string") {
    return escapeText(text);
  }
  return text.toString();
}

function renderFragment(children: RecursiveOpChildrenArray): string {
  let result = "";
  for (let i = 0; i < children.length; ++i) {
    result += renderToString(children[i]);
  }
  return result;
}

function renderObject(op: OpNode): string {
  const flags = op.type.flags;
  let result;
  if ((flags & NodeFlags.Element) !== 0) {
    return emitElementOpen(op) + renderToString(op.data.children) + emitElementClose(op);
  }
  if ((flags & NodeFlags.Component) !== 0) {
    if ((flags & NodeFlags.Stateful) !== 0) {
      const stateNode = createStateNode(op);
      stateNode.state = { update: null, dirtyCheck: null, unmount: null };
      return renderToString((op.type.descriptor as ComponentDescriptor).c(stateNode)(op.data));
    } else {
      return renderToString((op.type.descriptor as StatelessComponentDescriptor).c(op.data));
    }
  }
  if ((flags & (NodeFlags.Events | NodeFlags.Ref | NodeFlags.Context)) !== 0) {
    if ((flags & NodeFlags.Context) !== 0) {
      const contextData = (op.data as ContextData);
      const prevContext = setContext(contextData.data);
      result = renderToString(contextData.children);
      restoreContext(prevContext);
      return result;
    } else {
      return renderToString(op.data.children);
    }
  }

  result = "";
  const children = (op.data as Key<any, OpChildren>[]);
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
export function renderToString(op: OpChildren): string {
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
