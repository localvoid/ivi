import { VNode, VNodeFlags, StatefulComponent, StatelessComponent } from "ivi";

/**
 * SnapshotFlags
 */
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

/**
 * toSnapshot generates a snapshot string from VNode.
 *
 * @param vnode VNode.
 * @param flags See `SnapshotFlags` for details.
 * @returns Snapshot string.
 */
export function toSnapshot(vnode: VNode, flags: SnapshotFlags = SnapshotFlags.DefaultFlags): string {
  return _toSnapshot(0, vnode, flags);
}

/**
 * indent creates an indented string.
 *
 * @param n Indentation depth.
 * @returns Indented string.
 */
function indent(n: number): string {
  let result = "";
  for (let i = 0; i < n; ++i) {
    result += "  ";
  }
  return result;
}

/**
 * renderAttrsToSnapshot generates a snapshot string from VNode properties.
 *
 * @param il Indentation depth.
 * @param props Properties.
 * @returns Stringified properties.
 */
function renderAttrsToSnapshot(il: number, props: { [key: string]: string }): string {
  let result = "";
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; ++i) {
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

/**
 * renderStyleToSnapshot generates a snapshot string from VNode style.
 *
 * @param il Indentation depth.
 * @param style Style.
 * @returns Stringified style.
 */
function renderStyleToSnapshot(il: number, style: { [key: string]: any }): string {
  const keys = Object.keys(style);
  if (keys.length === 0) {
    return "";
  }

  let result = `\n${indent(il)}style={`;
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const value = style[key];
    result += `\n${indent(il + 1)}${key}: ${value};`;
  }

  result += `\n${indent(il)}}`;
  return result;
}

/**
 * renderEventsToSnapshot generates a snapshot string from VNode events.
 *
 * @param il Indentation depth.
 * @param events Events.
 * @returns Stringified events.
 */
function renderEventsToSnapshot(il: number, events: { [key: string]: any }): string {
  return "";
}

/**
 * _toSnapshot generates a snapshot string from VNode.
 *
 * @param il Indentation depth.
 * @param vnode VNode.
 * @param sFlags See `SnapshotFlags` for details.
 * @returns Snapshot string.
 */
function _toSnapshot(
  il: number,
  vnode: VNode,
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
        result += `<input`;
        if (vnode._tag !== "") {
          result += `\n${indent(il + 1)}type="${vnode._tag}"`;
          multiline = true;
        }
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

      const attrs = vnode._props;
      if (attrs !== null) {
        const s = renderAttrsToSnapshot(il + 1, attrs);
        if (s !== "") {
          multiline = true;
        }
        result += s;
      }
      const style = vnode._style;
      if (style !== null) {
        const s = renderStyleToSnapshot(il + 1, style);
        if (s !== "") {
          multiline = true;
        }
        result += s;
      }
      if ((sFlags & SnapshotFlags.IgnoreEvents) === 0) {
        const events = vnode._events;
        if (events !== null) {
          const s = renderEventsToSnapshot(il + 1, events);
          if (s !== "") {
            multiline = true;
          }
          result += s;
        }
      }

      let childrenString = "";
      if (vnode._children !== null) {
        if ((flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) !== 0) {
          if ((flags & VNodeFlags.ChildrenArray) !== 0) {
            const children = vnode._children as VNode[];
            for (let i = 0; i < children.length; ++i) {
              childrenString += `\n${_toSnapshot(il + 1, children[i], sFlags)}`;
            }
          } else {
            childrenString = `\n${_toSnapshot(il + 1, vnode._children as VNode, sFlags)}`;
          }
        } else {
          if ((flags & VNodeFlags.InputElement) !== 0) {
            if (vnode._children !== null) {
              if (typeof vnode._children === "boolean") {
                result += `\n${indent(il + 1)}checked="${vnode._children}"`;
              } else {
                result += `\n${indent(il + 1)}value="${vnode._children}"`;
              }
              multiline = true;
            }
          } else { // ((flags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) !== 0)
            childrenString = `\n${indent(il + 1)}${vnode._children}`;
          }
        }
      }

      if (multiline) {
        result += `\n${indent(il)}`;
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
  } else {
    if ((flags & VNodeFlags.StatefulComponent) !== 0) {
      if ((sFlags & SnapshotFlags.IgnoreStatefulComponents) === 0) {
        const componentName = (vnode._tag as StatefulComponent<any>).displayName;
        if (vnode._children === null) {
          return `${indent(il)}<${componentName} />`;
        } else {
          let result = `${indent(il)}<${componentName}>`;
          result += _toSnapshot(il + 1, vnode._children as VNode, sFlags);
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
              result += _toSnapshot(il + 1, vnode._children as VNode, sFlags);
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
              result += _toSnapshot(il + 1, vnode._children as VNode, sFlags);
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
              result += _toSnapshot(il + 1, vnode._children as VNode, sFlags);
              result += `\n${indent(il)}</KeepAlive>`;
              return result;
            }
          }
        } else {
          if ((sFlags & SnapshotFlags.IgnoreStatelessComponents) === 0) {
            const componentName = (vnode._tag as StatelessComponent<any>).render.displayName;
            if (vnode._children === null) {
              return `${indent(il)}<${componentName} />`;
            } else {
              let result = `${indent(il)}<${componentName}>`;
              result += _toSnapshot(il + 1, vnode._children as VNode, sFlags);
              result += `${indent(il)}</${componentName}>`;
              return result;
            }
          }
        }
      }
      if (vnode._children !== null) {
        return _toSnapshot(il + 1, vnode._children as VNode, sFlags);
      }
    }
  }
  return "";
}
