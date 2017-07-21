import { VNode, VNodeFlags, ComponentClass, StatelessComponent } from "ivi";

export const enum SnapshotFlags {
  IgnoreEvents = 1,
  IgnoreStatefulComponents = 1 << 1,
  IgnoreStatelessComponents = 1 << 2,
  IgnoreContextComponents = 1 << 3,
  IgnoreConnectComponents = 1 << 4,
  IgnoreKeepAliveComponents = 1 << 5,

  IgnoreComponents = 0
  | IgnoreStatefulComponents
  | IgnoreStatelessComponents
  | IgnoreContextComponents
  | IgnoreConnectComponents
  | IgnoreKeepAliveComponents,

  DefaultFlags = IgnoreEvents | IgnoreContextComponents | IgnoreKeepAliveComponents,
}

export function toSnapshot(vnode: VNode<any>, flags: SnapshotFlags = SnapshotFlags.DefaultFlags): string {
  return `\n${_toSnapshot(0, vnode, flags)}\n`;
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

function _toSnapshot(
  il: number,
  vnode: VNode<any>,
  sFlags: SnapshotFlags,
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
        if ((sFlags & SnapshotFlags.IgnoreEvents) === 0) {
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
              childrenString += `\n${_toSnapshot(il + 1, children[i], sFlags)}`;
            }
          } else {
            childrenString = `\n${_toSnapshot(il + 1, vnode._children as VNode<any>, sFlags)}`;
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

      if (multiline) {
        result += `\n${indent(il)}`;
      } else {
        result += ` `;
      }
      if (childrenString === "") {
        result += `/>`;
      } else {
        result += `>`;
        result += childrenString;
        result += `\n${indent(il)}</${closeTagName}>`;
      }

      return result;
    } else {
      return vnode._children as string;
    }
  } else { // ((flags & VNodeFlags.Component) !== 0)
    if ((flags & VNodeFlags.ComponentClass) !== 0) {
      if ((sFlags & SnapshotFlags.IgnoreStatefulComponents) === 0) {
        const componentName = (vnode._tag as ComponentClass<any>).displayName;
        if (vnode._children === null) {
          return `${indent(il)}<${componentName} />`;
        } else {
          let result = `${indent(il)}<${componentName}>`;
          result += _toSnapshot(il + 1, vnode._children as VNode<any>, sFlags);
          result += `${indent(il)}</${componentName}>`;
          return result;
        }
      }
    } else {
      if ((flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext)) !== 0) {
        if ((flags & VNodeFlags.Connect) !== 0) {
          if ((sFlags & SnapshotFlags.IgnoreConnectComponents) === 0) {
            if (vnode._children === null) {
              return `${indent(il)}<Connect />`;
            } else {
              let result = `${indent(il)}<Connect>`;
              result += _toSnapshot(il + 1, vnode._children as VNode<any>, sFlags);
              result += `\n${indent(il)}</Connect>`;
              return result;
            }
          }
        } else {
          if ((sFlags & SnapshotFlags.IgnoreContextComponents) === 0) {
            if (vnode._children === null) {
              return `${indent(il)}<UpdateContext />`;
            } else {
              let result = `${indent(il)}<UpdateContext>`;
              result += _toSnapshot(il + 1, vnode._children as VNode<any>, sFlags);
              result += `\n${indent(il)}</UpdateContext>`;
              return result;
            }
          }
        }
      } else {
        if ((flags & VNodeFlags.KeepAlive) !== 0) {
          if ((sFlags & SnapshotFlags.IgnoreKeepAliveComponents) === 0) {
            if (vnode._children === null) {
              return `${indent(il)}<KeepAlive />`;
            } else {
              let result = `${indent(il)}<KeepAlive>`;
              result += _toSnapshot(il + 1, vnode._children as VNode<any>, sFlags);
              result += `\n${indent(il)}</KeepAlive>`;
              return result;
            }
          }
        } else {
          if ((sFlags & SnapshotFlags.IgnoreStatelessComponents) === 0) {
            const componentName = (vnode._tag as StatelessComponent<any>).displayName;
            if (vnode._children === null) {
              return `${indent(il)}<${componentName} />`;
            } else {
              let result = `${indent(il)}<${componentName}>`;
              result += _toSnapshot(il + 1, vnode._children as VNode<any>, sFlags);
              result += `${indent(il)}</${componentName}>`;
              return result;
            }
          }
        }
      }
      if (vnode._children !== null) {
        return _toSnapshot(il + 1, vnode._children as VNode<any>, sFlags);
      }
    }
  }
  return "";
}
