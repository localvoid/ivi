import { VNode, VNodeFlags, Context, ComponentClass, StatelessComponent, ConnectDescriptor } from "ivi";

export interface SnapshotRendererOptions {
  shallow?: boolean;
  ignoreEvents?: boolean;
  ignoreContextNodes?: boolean;
  ignoreConnectNodes?: boolean;
  ignoreKeepAliveNodes?: boolean;
}

const DefaultOptions: SnapshotRendererOptions = {
  shallow: false,
  ignoreEvents: true,
  ignoreContextNodes: true,
  ignoreConnectNodes: true,
  ignoreKeepAliveNodes: true,
};

export function createSnapshotRenderer(options?: SnapshotRendererOptions): (vnode: VNode<any>) => string {
  const o = options === undefined ?
    DefaultOptions :
    { ...DefaultOptions, ...options };

  return function (vnode: VNode<any>, context: Context = {}): string {
    return `\n${renderVNodeToSnapshot(o, 0, vnode, context)}\n`;
  };
}

function indent(n: number): string {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += "  ";
  }
  return result;
}

function renderAttrsToSnapshot(il: number, props: { [key: string]: string }): string {
  let result = "";
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = props[key];
    if (typeof value !== "boolean") {
      if (value !== null) {
        result += `\n${indent(il)}${key}="${value}"`;
      }
    } else {
      if (value === true) {
        result += `\n${indent(il)}${key}`;
      }
    }
  }

  return result;
}

function renderStyleToSnapshot(il: number, style: { [key: string]: any }): string {
  const keys = Object.keys(style);
  if (keys.length === 0) {
    return "";
  }

  let result = `${indent(il)}style={`;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = style[key];
    result += `\n${indent(il + 1)}${key}: ${value};`;
  }

  result += `\n${indent(il)}}`;
  return result;
}

function renderEventsToSnapshot(il: number, events: { [key: string]: any }): string {
  return "";
}

function renderVNodeToSnapshot(
  options: SnapshotRendererOptions,
  il: number,
  vnode: VNode<any>,
  context: Context,
): string {
  const flags = vnode._flags;
  if ((flags & (VNodeFlags.Element | VNodeFlags.Text)) !== 0) {
    if ((flags & VNodeFlags.Element) !== 0) {
      let result = indent(il);
      let multiline = false;
      let closeTagName;
      if ((flags & VNodeFlags.InputElement) !== 0) {
        closeTagName = `input`;
        result += `<input\n`;
        result += `${indent(il + 1)}type="${vnode._tag}"`;
        multiline = true;
      } else {
        closeTagName = vnode._tag;
        result += `<${vnode._tag}`;
      }

      if (vnode._className !== null) {
        result += `\n${indent(il + 1)}class="${vnode._className}"`;
        multiline = true;
      }

      if ((flags & VNodeFlags.Autofocus) !== 0) {
        result += `\n${indent(il + 1)}autofocus="true"`;
        multiline = true;
      }

      const props = vnode._props;
      if (props !== null) {
        const attrs = props.attrs;
        const style = props.style;
        if (attrs !== null) {
          const s = renderAttrsToSnapshot(il + 1, attrs);
          if (s !== "") {
            multiline = true;
          }
          result += s;
        }
        if (style !== null) {
          const s = renderStyleToSnapshot(il + 1, style);
          if (s !== "") {
            multiline = true;
          }
          result += s;
        }
        if (options.ignoreEvents === false) {
          const events = props.events;
          if (events !== null) {
            const s = renderEventsToSnapshot(il + 1, events);
            if (s !== "") {
              multiline = true;
            }
            result += s;
          }
        }
      }

      let childrenString = "";
      if (vnode._children !== null) {
        if ((flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) !== 0) {
          if ((flags & VNodeFlags.ChildrenArray) !== 0) {
            const children = vnode._children as VNode<any>[];
            for (let i = 0; i < children.length; i++) {
              childrenString += `\n${renderVNodeToSnapshot(options, il + 1, children[i], context)}`;
            }
          } else {
            childrenString = `\n${renderVNodeToSnapshot(options, il + 1, vnode._children as VNode<any>, context)}`;
          }
        } else {
          if ((flags & VNodeFlags.InputElement) !== 0) {
            if (vnode._children !== null) {
              if (typeof vnode._children === "boolean") {
                result += `${indent(il + 1)}checked="${vnode._children}"`;
              } else {
                result += `${indent(il + 1)}value="${vnode._children}"`;
              }
            }
          } else { // ((flags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) !== 0)
            childrenString = `\n${indent(il + 1)}${vnode._children}`;
          }
        }
      }

      if (multiline || childrenString !== "") {
        if (multiline) {
          result += `\n${indent(il)}`;
        }
        result += `>`;
        if (childrenString !== "") {
          result += childrenString;
        }
        result += `\n${indent(il)}</${closeTagName}>`;
      } else {
        result += ` />`;
      }

      return result;
    } else {
      return vnode._children as string;
    }
  } else { // ((flags & VNodeFlags.Component) !== 0)
    if ((flags & VNodeFlags.ComponentClass) !== 0) {
      const componentName = (vnode._tag as ComponentClass<any>).displayName;
      if (options.shallow === true) {
        return `${indent(il)}<${componentName} />`;
      } else {
        const component = new (vnode._tag as ComponentClass<any>)(vnode._props);
        let result = `${indent(il)}<${componentName}>`;
        result += renderVNodeToSnapshot(options, il + 1, component.render(), context);
        result += `${indent(il)}</${componentName}>`;
        return result;
      }
    } else { // ((node._flags & VNodeFlags.ComponentFunction) !== 0)
      if ((flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext)) !== 0) {
        if ((flags & VNodeFlags.Connect) !== 0) {
          if (options.shallow === true) {
            return `${indent(il)}<Connect />`;
          } else {
            const connect = vnode._tag as ConnectDescriptor<any, any, any>;
            const selectData = connect.select(null, vnode._props, context);
            const root = connect.render(selectData.out);
            if (options.ignoreConnectNodes === true) {
              return renderVNodeToSnapshot(options, il, root, context);
            } else {
              let result = `${indent(il)}<Connect>`;
              result += renderVNodeToSnapshot(options, il + 1, root, context);
              result += `\n${indent(il)}</Connect>`;
              return result;
            }
          }
        } else {
          if (options.shallow === true) {
            return `${indent(il)}<UpdateContext />`;
          } else {
            context = Object.assign({}, context, vnode._props);
            const root = vnode._children as VNode;
            if (options.ignoreContextNodes === true) {
              return renderVNodeToSnapshot(options, il, root, context);
            } else {
              let result = `${indent(il)}<UpdateContext>`;
              result += renderVNodeToSnapshot(options, il + 1, root, context);
              result += `\n${indent(il)}</UpdateContext>`;
              return result;
            }
          }
        }
      } else {
        if ((flags & VNodeFlags.KeepAlive) !== 0) {
          if (options.shallow === true) {
            return `${indent(il)}<KeepAlive />`;
          } else {
            if (options.ignoreKeepAliveNodes === true) {
              return renderVNodeToSnapshot(options, il, vnode._children as VNode<any>, context);
            } else {
              let result = `${indent(il)}<KeepAlive>`;
              result += renderVNodeToSnapshot(options, il + 1, vnode._children as VNode<any>, context);
              result += `\n${indent(il)}</KeepAlive>`;
              return result;
            }
          }
        } else {
          const componentName = (vnode._tag as StatelessComponent<any>).displayName;
          if (options.shallow === true) {
            return `${indent(il)}<${componentName} />`;
          } else {
            const root = (vnode._tag as StatelessComponent<any>)(vnode._props);
            let result = `${indent(il)}<${componentName}>`;
            result += renderVNodeToSnapshot(options, il + 1, root, context);
            result += `${indent(il)}</${componentName}>`;
            return result;
          }
        }
      }
    }
  }
}
