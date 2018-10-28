import { VNode, VNodeFlags, SyncableValue, ComponentDescriptor } from "ivi";

export interface SnapshotOptions {
  readonly ignoreEvents?: boolean;
  readonly ignoreComponent?: boolean;
  readonly ignoreContext?: boolean;
  readonly ignoreConnect?: boolean;
}

/**
 * SnapshotFlags
 */
const enum SnapshotFlags {
  IgnoreEvents = 1,
  IgnoreComponent = 1 << 1,
  IgnoreContext = 1 << 2,
  IgnoreConnect = 1 << 3,

  DefaultFlags = IgnoreEvents | IgnoreContext,
}

/**
 * toSnapshot generates a snapshot string from VNode.
 *
 * @param vnode VNode.
 * @param flags See `SnapshotFlags` for details.
 * @returns Snapshot string.
 */
export function toSnapshot(vnode: VNode, options?: SnapshotOptions): string {
  let flags = SnapshotFlags.DefaultFlags;
  if (options) {
    options = {
      ...{
        ignoreEvents: true,
        ignoreContext: true,
      },
      ...options,
    };
    flags = 0;
    if (options.ignoreEvents) {
      flags |= SnapshotFlags.IgnoreEvents;
    }
    if (options.ignoreComponent) {
      flags |= SnapshotFlags.IgnoreComponent;
    }
    if (options.ignoreContext) {
      flags |= SnapshotFlags.IgnoreContext;
    }
    if (options.ignoreConnect) {
      flags |= SnapshotFlags.IgnoreConnect;
    }
  }

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
function renderAttrsToSnapshot(il: number, props: { [key: string]: any }): string {
  let result = "";
  const keys = Object.keys(props);
  for (const key of keys) {
    let value = props[key];
    if (typeof value === "object") {
      value = value as SyncableValue<any>;
      if (value !== void 0) {
        result += `\n${indent(il)}${key}="${value.v}"`;
      }
    } else if (typeof value === "boolean") {
      if (value) {
        result += `\n${indent(il)}${key}`;
      }
    } else {
      if (value !== undefined) {
        result += `\n${indent(il)}${key}="${value}"`;
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
  for (const key of keys) {
    result += `\n${indent(il + 1)}${key}: ${style[key]};`;
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
  // TODO: missing implementation
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
  const flags = vnode._f;
  let result = ``;

  if (flags & VNodeFlags.StopDirtyChecking) {
    result += `${indent(il++)}<stopDirtyChecking>`;
  }

  if ((flags & (VNodeFlags.Element | VNodeFlags.Text)) !== 0) {
    if ((flags & VNodeFlags.Element) !== 0) {
      const closeTagName = vnode._t;
      let multiline = false;

      result += `${indent(il)}<${vnode._t}`;

      if (vnode._cs) {
        result += `\n${indent(il + 1)}class="${vnode._cs}"`;
        multiline = true;
      }

      const attrs = vnode._p;
      if (attrs !== void 0) {
        const s = renderAttrsToSnapshot(il + 1, attrs);
        if (s !== "") {
          multiline = true;
        }
        result += s;
      }
      const style = vnode._s;
      if (style !== void 0) {
        const s = renderStyleToSnapshot(il + 1, style);
        if (s !== "") {
          multiline = true;
        }
        result += s;
      }
      if ((sFlags & SnapshotFlags.IgnoreEvents) === 0) {
        const events = vnode._e;
        if (events !== null) {
          const s = renderEventsToSnapshot(il + 1, events);
          if (s !== "") {
            multiline = true;
          }
          result += s;
        }
      }

      let childrenString = "";
      if (vnode._c !== null) {
        if ((flags & VNodeFlags.Children) !== 0) {
          let child: VNode | null = vnode._c as VNode;
          do {
            childrenString += `\n${_toSnapshot(il + 1, child, sFlags)}`;
            child = child._r;
          } while (child !== null);
        } else if ((flags & VNodeFlags.TextContent) !== 0) {
          childrenString = `\n${indent(il + 1)}${vnode._c}`;
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
    } else {
      result += vnode._p as string;
    }
  } else {
    if ((flags & VNodeFlags.Component) !== 0) {
      if ((sFlags & SnapshotFlags.IgnoreComponent) === 0) {
        const componentName = (vnode._t as ComponentDescriptor).c;

        result += (vnode._c === null) ?
          `${indent(il)}<${componentName} />` :
          (
            `${indent(il)}<${componentName}>` +
            _toSnapshot(il + 1, vnode._c as VNode, sFlags) +
            `${indent(il)}</${componentName}>`
          );
      } else {
        result += _toSnapshot(il, vnode._c as VNode, sFlags);
      }
    } else { // ((flags & VNodeFlags.UpdateContext) !== 0)
      if ((sFlags & SnapshotFlags.IgnoreContext) === 0) {
        result += (vnode._c === null) ?
          `${indent(il)}<UpdateContext />` :
          (
            `${indent(il)}<UpdateContext>` +
            _toSnapshot(il + 1, vnode._c as VNode, sFlags) +
            `\n${indent(il)}</UpdateContext>`
          );
      } else {
        result += _toSnapshot(il, vnode._c as VNode, sFlags);
      }
    }
  }

  if (flags & VNodeFlags.StopDirtyChecking) {
    result += `${indent(--il)}</stopDirtyChecking>`;
  }

  return result;
}
