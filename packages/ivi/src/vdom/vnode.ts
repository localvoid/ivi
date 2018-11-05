import { NOOP } from "../core/noop";
import { objectHasOwnProperty } from "../core/shortcuts";
import { CSSStyleProps } from "../dom/style";
import { isVoidElement } from "../debug/dom";
import { checkVNodeConstructor, checkUniqueKeys } from "../debug/vnode";
import { EventHandler } from "../events/event_handler";
import { ComponentDescriptor, Component } from "./component";

/**
 * VNode flags.
 */
export const enum VNodeFlags {
  /**
   * VNode represents a Text node.
   */
  Text = 1,
  /**
   * VNode represents an Element node.
   */
  Element = 1 << 1,
  /**
   * VNode is using an element factory to instantiate an Element node.
   */
  ElementFactory = 1 << 2,
  /**
   * VNode represents a component.
   */
  Component = 1 << 3,
  /**
   * VNode contains children nodes.
   */
  Children = 1 << 4,
  /**
   * VNode contains a text content.
   */
  TextContent = 1 << 5,
  /**
   * VNode is using an explicit key.
   */
  Key = 1 << 6,
  /**
   * Keyed list.
   */
  KeyedList = 1 << 7,
  /**
   * Element contains events.
   */
  Events = 1 << 8,
  /**
   * VNode is an SVGElement.
   */
  SvgElement = 1 << 9,
  /**
   * Specialized VNode with an update context behavior.
   */
  UpdateContext = 1 << 10,

  ElementIdMask = 255 << 11,
  ElementIdOffset = 11,
  /**
   * Dirty checking should be stopped at this node.
   *
   * NOTE: It is important that this flag is `1 << 31 === -1`. It allows to use a simple `flags > 0` check in the hot
   * path of the dirty checking instead of using two checks.
   */
  StopDirtyChecking = 1 << 31,

  /**
   * Flags that should match to be compatible for syncing.
   */
  Syncable = 0
  | Text
  | Element
  | ElementFactory
  | Component
  | UpdateContext
  | TextContent
  | Key
  | SvgElement
  | ElementIdMask,
}

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
  _c: VNode | string | number | null;
  /**
   * Tag property contains details about the type of the element.
   */
  _t: string | VNode | ComponentDescriptor | null;
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
  _i: N | Component<P> | {} | null;
  /**
   * Style.
   */
  _s: CSSStyleProps | undefined;
  /**
   * Class name.
   */
  _cs: string | undefined;
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
    tag: string | VNode | ComponentDescriptor<any> | null,
    props: P | undefined,
    className: string | undefined,
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
    this._s = style;
    this._cs = className;
    this._e = null;
    /* istanbul ignore else */
    if (DEBUG) {
      checkVNodeConstructor(this);
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
    /* istanbul ignore else */
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
   * Assigns a text content for ane Element node.
   *
   * @param text - Text content.
   * @returns this node
   */
  t(text: string | number): this {
    /* istanbul ignore else */
    if (DEBUG) {
      if (this._c !== null) {
        throw new Error("Failed to set text content, VNode element is already having children");
      }
      if (!(this._f & VNodeFlags.Element)) {
        throw new Error("Failed to set text content, text content is available on element nodes only");
      }
      if (isVoidElement(this._t as string)) {
        throw new Error("Failed to set text content, void elements can't have any children");
      }
      if (this._p) {
        if (objectHasOwnProperty.call(this._p, "unsafeHTML")) {
          throw new Error("Failed to set text content, element is using unsafeHTML attribute");
        }
      }
    }
    this._f |= VNodeFlags.StopDirtyChecking | VNodeFlags.TextContent;
    this._c = text;
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
    /* istanbul ignore else */
    if (DEBUG) {
      if (this._c !== null) {
        throw new Error("Failed to set children, VNode element is already having children");
      }
      if (!(this._f & VNodeFlags.Element)) {
        throw new Error("Failed to set children, children are available on element nodes only");
      }
      if (isVoidElement(this._t as string)) {
        throw new Error("Failed to set children, void elements can't have any children");
      }
      if (this._p) {
        if (objectHasOwnProperty.call(this._p, "unsafeHTML")) {
          throw new Error("Failed to set children, element is using unsafeHTML attribute");
        }
      }
    }

    const children: Array<VNode | string | number | null> = arguments as any;
    let first: VNode<any> | null = null;
    let prev: VNode<any> | null = null;

    for (let i = 0, p = 0; i < children.length; ++i, ++p) {
      let n = children[i];

      if (n !== null) {
        if (typeof n !== "object") {
          n = t(n);
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
      this._f |= VNodeFlags.Children;
      this._c = first;
      /* istanbul ignore else */
      if (DEBUG) {
        checkUniqueKeys(first);
      }
    }

    return this;
  }
}

/**
 * Create a VNode representing a Text node.
 *
 * @param content Text content.
 * @returns VNode object.
 */
export const t = (content: string | number): VNode<string | number, Text> =>
  new VNode(VNodeFlags.Text, null, content, "", void 0);

/**
 * getDOMNode retrieves a reference to a DOM node from a VNode object.
 *
 * @param vnode - Virtual DOM node which contains reference to a DOM node.
 * @returns null if VNode doesn't have a reference to a DOM node.
 */
export function getDOMNode<T extends Node>(vnode: VNode): T | null {
  if ((vnode._f & (VNodeFlags.Component | VNodeFlags.UpdateContext)) !== 0) {
    return getDOMNode<T>(vnode._c as VNode);
  }
  return vnode._i as T;
}

/**
 * getComponent retrieves a reference to a Component instance from a VNode object.
 *
 * @param vnode - Virtual DOM node which contains reference to a Component instance.
 * @returns `null` if `vnode` doesn't have a reference to a Component instance
 */
export function getComponent<T extends Component<any>>(vnode: VNode): T | null {
  /* istanbul ignore else */
  if (DEBUG) {
    if ((vnode._f & (VNodeFlags.Component | VNodeFlags.UpdateContext)) === 0) {
      throw new Error("Failed to get component instance: VNode should represent a Component.");
    }
  }
  return vnode._i as T | null;
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
