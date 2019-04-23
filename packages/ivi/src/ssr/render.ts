import { EMPTY_OBJECT } from "../core";
import { NodeFlags } from "../vdom/node_flags";
import { AttributeDirective } from "../vdom/attribute_directive";
import { OpNode, Op, ElementData, ContextData, Key, EventsData } from "../vdom/operations";
import { ComponentDescriptor, StatelessComponentDescriptor } from "../vdom/component";
import { ElementProtoDescriptor } from "../vdom/element_proto";
import { createStateNode } from "../vdom/state";
import { setContext, restoreContext, assignContext, disableContext, enableContext } from "../vdom/context";
import { escapeAttributeValue, escapeText } from "./escape";

let _attributes = "";
let _styles = "";
let _children = "";

/**
 * emitAttribute pushes attribute string.
 *
 * @example
 *
 *   emitAttribute(`id="abc"`);
 *
 * @param attr Attribute string.
 */
export function emitAttribute(attr: string): void {
  _attributes += ` ${attr}`;
}

/**
 * emitStyle pushes style string.
 *
 * @example
 *
 *   emitStyle(`padding:0`);
 *
 * @param style Style string.
 */
export function emitStyle(style: string): void {
  if (_styles !== "") {
    _styles += ";";
  }
  _styles += style;
}

/**
 * emitChildrens pushes children string.
 *
 * @example
 *
 *   emitChildren(`<h1>Hello World</h1>`);
 *
 * @param children Children string.
 */
export function emitChildren(children: string | number): void {
  _children += children;
}

/**
 * Renders a {@link OpNode} to string.
 *
 * @param op {@link OpNode}
 * @param context Current context.
 * @returns Rendering results.
 */
function _renderToString(op: Op): string {
  if (op !== null) {
    if (typeof op === "object") {
      let result = "";
      if (op instanceof Array) {
        for (let i = 0; i < op.length; ++i) {
          result += renderToString(op[i]);
        }
        return result;
      }

      const flags = op.t.f;
      if ((flags & NodeFlags.Element) !== 0) {
        const data = op.d;
        let children = "";

        let tagName;
        let className = data.n;
        let attrs = data.a;
        if ((op.t.f & NodeFlags.ElementProto) !== 0) {
          const proto = (op.t.d as ElementProtoDescriptor).p;
          const protoData = proto.d;
          tagName = proto.t.d;
          if (className === void 0) {
            className = protoData.n;
          }
          if (protoData.a !== void 0) {
            attrs = attrs === void 0 ? protoData.a : { ...protoData.a, ...attrs };
          }
        } else {
          tagName = op.t.d;
        }

        let openElement = `<${tagName}`;
        if (className !== void 0 && className !== "") {
          openElement += ` class="${className}"`;
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
                emitAttribute(`${key}="${escapeAttributeValue(value)}"`);
              } else if (value === true) {
                emitAttribute(key);
              }
            }
          }
          if (_styles !== "") {
            emitAttribute(`style="${_styles}"`);
            _styles = "";
          }
          openElement += _attributes;
          children = _children;
          _attributes = "";
          _children = "";
        }

        if (children === "") {
          children = renderToString((op as OpNode<ElementData>).d.c);
        }
        if ((flags & NodeFlags.NewlineEatingElement) !== 0) {
          if (children.length > 0 && children.charCodeAt(0) === 10) { // "\n"
            children = `\n${children}`;
          }
        }
        return ((flags & (NodeFlags.VoidElement | NodeFlags.Svg)) !== 0 && children === "") ?
          `${openElement} />` :
          `${openElement}>${children}</${tagName}>`;
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
          const prevContext = setContext(assignContext(contextData.v));
          result = renderToString(contextData.c);
          restoreContext(prevContext);
          return result;
        } else {
          return renderToString((op.d as EventsData).c);
        }
      }
      // TrackByKey Node
      const childrenNodes = (op.d as Key<any, Op>[]);
      for (let i = 0; i < childrenNodes.length; ++i) {
        result += renderToString(childrenNodes[i].v);
      }
      return result;
    }
    if (typeof op === "string") {
      return escapeText(op);
    }
    // number
    return op.toString();
  }
  return "";
}

/**
 * Renders a {@link OpNode} to string.
 *
 * @param op {@link OpNode}
 * @param context Current context.
 * @returns Rendering results.
 */
export function renderToString(op: Op): string {
  try {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      enableContext();
    }
    return _renderToString(op);
  } catch (e) {
    restoreContext(EMPTY_OBJECT);
    _attributes = "";
    _styles = "";
    _children = "";
    throw e;
  } finally {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      disableContext();
    }
  }
}
