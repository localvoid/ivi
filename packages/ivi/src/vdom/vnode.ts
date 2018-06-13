import { CSSStyleProps, NOOP } from "ivi-core";
import { checkDOMAttributesForTypos, checkDOMStylesForTypos, checkDeprecatedDOMSVGAttributes } from "../dev_mode/typos";
import { EventHandler } from "../events/event_handler";
import { VNodeFlags } from "./flags";
import { StatelessComponent, StatefulComponent, Component } from "./component";
import { ConnectDescriptor } from "./connect_descriptor";

/**
 * Virtual DOM Node.
 *
 * @example
 *
 *     const vnode = div("div-class-name", { id: "div-id" })
 *       .e(onClick((e) => console.log("click event", e)))
 *       .c("Hello");
 *
 * @final
 */
export class VNode<P = any, N = Node> {
  /**
   * Flags, see {@link VNodeFlags} for details.
   */
  _f: VNodeFlags;
  /**
   * Circular link to previous sibling node (left).
   */
  _l: VNode;
  /**
   * Next sibling node (right).
   */
  _r: VNode | null;
  /**
   * Children.
   */
  _c: VNode | null;
  /**
   * Tag property contains details about the type of the element.
   */
  _t:
    | string
    | VNode
    | StatefulComponent<any>
    | StatelessComponent<any>
    | ConnectDescriptor<any, any, {}>
    | null;
  /**
   * Children syncing algorithm is using key property to match nodes. Key should be unique among its siblings.
   */
  _k: any;
  /**
   * Properties.
   */
  _p: P | undefined;
  /**
   * Reference to HTML node or Component instance.
   *
   * It will be available after virtual node is created or synced. Each time VNode is synced, reference will be
   * transferred from the old VNode to the new one.
   */
  _i: N | Component<any> | {} | null;
  /**
   * Class name.
   */
  _cs: string;
  /**
   * Style.
   */
  _s: CSSStyleProps | undefined;
  /**
   * Events.
   */
  _e: Array<EventHandler | null> | EventHandler | null;
  /**
   * Factory function that was used to instantiate this node.
   *
   * It is used for debugging and testing purposes.
   */
  factory!: Function;

  constructor(
    flags: number,
    tag:
      | string
      | VNode
      | StatelessComponent<P>
      | StatefulComponent<P>
      | ConnectDescriptor<any, any, {}>
      | null,
    props: P | undefined,
    className: string,
    style: CSSStyleProps | undefined,
  ) {
    this._f = flags;
    this._l = this;
    this._r = null;
    this._c = null;
    this._t = tag;
    this._k = 0;
    this._p = props;
    this._i = null;
    this._cs = className;
    this._s = style;
    this._e = null;
    if (DEBUG) {
      if (flags & VNodeFlags.Element) {
        if (props) {
          checkDOMAttributesForTypos(props);

          if (flags & VNodeFlags.SvgElement) {
            checkDeprecatedDOMSVGAttributes(tag as string, props);
          }
        }
      }

      if (style !== void 0) {
        checkDOMStylesForTypos(style);
      }
      this.factory = NOOP;
    }
  }

  /**
   * Assigns a key.
   *
   * Children reconciliation algorithm is using keys to match nodes. Key should be unique among its siblings.
   *
   * @param key - Unique key
   * @returns this node
   */
  k(key: any): this {
    this._f |= VNodeFlags.Key;
    this._k = key;
    return this;
  }

  /**
   * Assign events.
   *
   * @param events - Events
   * @returns this node
   */
  e(events: Array<EventHandler | null> | EventHandler | null): this {
    if (DEBUG) {
      if ((this._f & VNodeFlags.Text)) {
        throw new Error("Failed to set events, events aren't available on text nodes");
      }
    }
    if (events !== null) {
      this._f |= VNodeFlags.Events;
      this._e = events;
    }
    return this;
  }

  /**
   * Assigns children for an Element node.
   *
   * @param children - Children can be a simple string, single VNode or recursive list of VNodes with strings and null
   *   values. It will automatically normalize recursive lists by flattening, filtering out null values and replacing
   *   strings with text nodes.
   * @returns this node
   */
  c(...children: Array<VNode | string | number | null>): this;
  c(): this {
    if (DEBUG) {
      if (this._f & VNodeFlags.ChildrenVNode) {
        throw new Error("Failed to set children, VNode element is already having children.");
      }
      if (!(this._f & VNodeFlags.Element)) {
        throw new Error("Failed to set children, children are available on element nodes only.");
      }
    }

    const children: Array<VNode | string | number | null> = arguments as any;
    let first: VNode<any> | null = null;
    let prev: VNode<any> | null = null;

    for (let i = 0, p = 0; i < children.length; ++i, ++p) {
      let n = children[i];

      if (n !== null) {
        if (typeof n !== "object") {
          n = new VNode<string | number>(VNodeFlags.Text, null, n, "", void 0);
        }
        const last = n._l;
        const flags = n._f;
        if (last === n) {
          if ((flags & VNodeFlags.Key) === 0) {
            n._k = p;
          }
        } else if ((flags & VNodeFlags.KeyedList) === 0) {
          let c: VNode | null = n;
          do {
            if ((c!._f & VNodeFlags.Key) === 0) {
              c!._k = p;
            }
            ++p;
            c = c!._r;
          } while (c !== null);
          --p;
        }

        if (prev !== null) {
          n._l = prev;
          prev._r = n;
        } else {
          first = n;
        }
        prev = last;
      }
    }
    if (first !== null) {
      first._l = prev!;
      this._f |= VNodeFlags.ChildrenVNode;
      this._c = first;
      if (DEBUG) {
        checkUniqueKeys(first);
      }
    }

    return this;
  }
}

/**
 * getDOMInstanceFromVNode retrieves a reference to a DOM node from a VNode object.
 *
 * @param node VNode which contains reference to a DOM node.
 * @returns null if VNode doesn't have a reference to a DOM node.
 */
export function getDOMInstanceFromVNode<T extends Node>(node: VNode<any, T>): T | null {
  if ((node._f & (
    VNodeFlags.StatelessComponent |
    VNodeFlags.StatefulComponent |
    VNodeFlags.Connect |
    VNodeFlags.UpdateContext
  )) !== 0) {
    return getDOMInstanceFromVNode<T>(node._c as VNode<any, T>);
  }
  return node._i as T;
}

/**
 * getComponentInstanceFromVNode retrieves a reference to a Component instance from a VNode object.
 *
 * @param vnode - Virtual DOM node which contains reference to a Component instance
 * @returns `null` if `vnode` doesn't have a reference to a Component instance
 */
export function getComponentInstanceFromVNode<T extends Component<any>>(vnode: VNode): T | null {
  if (DEBUG) {
    if ((vnode._f & (
      VNodeFlags.StatelessComponent |
      VNodeFlags.StatefulComponent |
      VNodeFlags.Connect |
      VNodeFlags.UpdateContext
    )) === 0) {
      throw new Error("Failed to get component instance: VNode should represent a Component.");
    }
  }
  return vnode._i as T | null;
}

/**
 * autofocus makes an element focused after instantiation.
 *
 * @param vnode - Virtual DOM node
 * @return `vnode`
 */
export function autofocus<N extends VNode>(vnode: N): N {
  if (DEBUG) {
    if (!(vnode._f & (
      VNodeFlags.Element |
      VNodeFlags.StatelessComponent |
      VNodeFlags.StatefulComponent |
      VNodeFlags.Connect |
      VNodeFlags.UpdateContext
    ))) {
      throw new Error("Failed to set autofocus, autofocus is available on element and component nodes only.");
    }
  }
  vnode._f |= VNodeFlags.Autofocus;
  return vnode;
}

/**
 * stopDirtyChecking stops dirty checking process when it goes through this virtual DOM node.
 *
 * @param vnode - Virtual DOM node
 * @returns `vnode`
 */
export function stopDirtyChecking<N extends VNode>(vnode: N): N {
  vnode._f |= VNodeFlags.StopDirtyChecking;
  return vnode;
}

/**
 * checkUniqueKeys checks that all nodes have unique keys.
 *
 * @param children - Children nodes
 */
function checkUniqueKeys(children: VNode): void {
  let keys: Set<any> | undefined;
  let node: VNode<any> | null = children;
  while (node !== null) {
    if (node._f & VNodeFlags.Key) {
      if (keys === undefined) {
        keys = new Set<any>();
      } else if (keys.has(node._k)) {
        throw new Error(`Failed to set children, invalid children list, key: "${node._k}" is used multiple times.`);
      }
      keys.add(node._k);
    }
    node = node._r;
  }
}
