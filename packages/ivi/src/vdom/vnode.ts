import { CSSStyleProps, NOOP } from "ivi-core";
import { EventHandler } from "ivi-events";
import { checkDOMAttributesForTypos, checkDOMStylesForTypos, checkDeprecatedDOMSVGAttributes } from "../dev_mode/typos";
import { isInputTypeHasCheckedProperty } from "../dev_mode/dom";
import { VNodeFlags } from "./flags";
import { StatelessComponent, StatefulComponent, Component } from "./component";
import { ConnectDescriptor } from "./connect_descriptor";

/**
 * Virtual DOM Node.
 *
 *     const vnode = h.div("div-class-name")
 *       .a({ id: "div-id" })
 *       .e(Events.onClick((e) => console.log("click event", e)))
 *       .c("Hello");
 *
 * @final
 */
export class VNode<P = any, N = Node> {
  /**
   * Flags, see `VNodeFlags` for details.
   */
  _flags: VNodeFlags;
  /**
   * Circular link to previous node.
   */
  _prev: VNode;
  /**
   * Next sibling node.
   */
  _next: VNode | null;
  /**
   * Children.
   */
  _children: VNode | string | number | boolean | null;
  /**
   * Tag property contains details about the type of the element.
   */
  _tag:
    | string
    | VNode
    | StatefulComponent<any>
    | StatelessComponent<any>
    | ConnectDescriptor<any, any, {}>
    | null;
  /**
   * Children syncing algorithm is using key property to match nodes. Key should be unique among its siblings.
   */
  _key: any;
  /**
   * Properties.
   */
  _props: P | undefined;
  /**
   * Reference to HTML node or Component instance.
   *
   * It will be available after virtual node is created or synced. Each time VNode is synced, reference will be
   * transferred from the old VNode to the new one.
   */
  _instance: N | Component<any> | {} | null;
  /**
   * Class name.
   */
  _className: string | undefined;
  /**
   * Style.
   */
  _style: CSSStyleProps | null;
  /**
   * Events.
   */
  _events: Array<EventHandler | null> | EventHandler | null;
  /* tslint:disable:ban-types */
  /**
   * Factory function that was used to instantiate this node.
   *
   * It is used for debugging and testing purposes.
   */
  _factory!: Function;
  /* tslint:enable:ban-types */

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
    className: string | undefined,
    children:
      | VNode
      | string
      | number
      | boolean
      | null,
  ) {
    this._flags = flags;
    this._prev = this;
    this._next = null;
    this._children = children;
    this._tag = tag;
    this._key = 0;
    this._props = props;
    this._instance = null;
    this._className = className;
    this._style = null;
    this._events = null;
    if (DEBUG) {
      this._factory = NOOP;
    }
  }

  /**
   * k assigns a key.
   *
   * Children reconciliation algorithm is using keys to match nodes. Key should be unique among its siblings.
   *
   * @param key Any object that should be unique among its siblings.
   * @returns VNode
   */
  k(key: any): this {
    this._flags |= VNodeFlags.Key;
    this._key = key;
    return this;
  }

  /**
   * s assigns style for an Element node.
   *
   * @param style Style.
   * @returns VNode
   */
  s<U extends CSSStyleProps>(style: U | null): this {
    if (DEBUG) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set style, style is available on element nodes only.");
      }

      if (style !== null) {
        checkDOMStylesForTypos(style);
      }
    }
    this._style = style;
    return this;
  }

  /**
   * e assign events for an Element node.
   *
   * @param events Events.
   * @returns VNode
   */
  e(events: Array<EventHandler | null> | EventHandler | null): this {
    if (DEBUG) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set events, events are available on element nodes only.");
      }
    }
    this._flags |= VNodeFlags.ElementPropsEvents;
    this._events = events;
    return this;
  }

  /**
   * a assigns DOM attributes for an Element node.
   *
   * @param attrs DOM attributes.
   * @returns VNode
   */
  a(attrs: P | null): this {
    if (DEBUG) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set attrs, attrs are available on element nodes only.");
      }

      if (attrs) {
        checkDOMAttributesForTypos(attrs);

        if (this._flags & VNodeFlags.SvgElement) {
          checkDeprecatedDOMSVGAttributes(this._tag as string, attrs);
        }
      }
    }
    this._props = attrs as P;
    return this;
  }

  /**
   * c assigns children for an Element node.
   *
   * @param children Children can be a simple string, single VNode or recursive list of VNodes with strings and null
   *   values. It will automatically normalize recursive lists by flattening, filtering out null values and replacing
   *   strings with text nodes.
   * @returns VNode
   */
  c(...children: Array<VNode | string | number | null>): this;
  c(): this {
    if (DEBUG) {
      if (this._flags & (VNodeFlags.ChildrenVNode | VNodeFlags.UnsafeHTML)) {
        throw new Error("Failed to set children, VNode element is already having children.");
      }
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set children, children are available on element nodes only.");
      }
      if (this._flags & VNodeFlags.InputElement) {
        throw new Error("Failed to set children, input elements can't have children.");
      }
      if (this._flags & VNodeFlags.TextAreaElement) {
        throw new Error("Failed to set children, textarea elements can't have children.");
      }
      if (this._flags & VNodeFlags.MediaElement) {
        throw new Error("Failed to set children, media elements can't have children.");
      }
      if (this._flags & VNodeFlags.VoidElement) {
        throw new Error(`Failed to set children, ${this._tag} elements can't have children.`);
      }
    }

    const children = arguments;
    let first: VNode<any> | null = null;
    let prev: VNode<any> | null = null;

    for (let i = 0, p = 0; i < children.length; ++i, ++p) {
      let n = children[i];

      if (n !== null) {
        if (typeof n !== "object") {
          n = new VNode<null>(VNodeFlags.Text, null, null, void 0, n);
        }
        const last = n._prev;
        const flags = n._flags;
        if (last === n) {
          if ((flags & VNodeFlags.Key) === 0) {
            n._key = p;
          }
        } else if ((flags & VNodeFlags.KeyedList) === 0) {
          let c: VNode | null = n;
          do {
            if ((c!._flags & VNodeFlags.Key) === 0) {
              c!._key = p;
            }
            ++p;
            c = c!._next;
          } while (c !== null);
        }

        if (prev !== null) {
          n._prev = prev;
          prev._next = n;
        } else {
          first = n;
        }
        prev = last;
      }
    }
    if (first !== null) {
      first._prev = prev!;
      this._flags |= VNodeFlags.ChildrenVNode;
      this._children = first;
      if (DEBUG) {
        checkUniqueKeys(first);
      }
    }

    return this;
  }

  /**
   * unsafeHTML assigns children as an innerHTML string. It is potentially vulnerable to XSS attacks.
   *
   * @param html innerHTML in a string format.
   * @returns VNode
   */
  unsafeHTML(html: string | null): this {
    if (DEBUG) {
      if (this._flags & VNodeFlags.ChildrenVNode) {
        throw new Error("Failed to set unsafeHTML, VNode element is already having children.");
      }
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set unsafeHTML, unsafeHTML is available on element nodes only.");
      }
      if (this._flags & VNodeFlags.InputElement) {
        throw new Error("Failed to set unsafeHTML, input elements can't have innerHTML.");
      }
      if (this._flags & VNodeFlags.TextAreaElement) {
        throw new Error("Failed to set unsafeHTML, textarea elements can't have innerHTML.");
      }
      if (this._flags & VNodeFlags.MediaElement) {
        throw new Error("Failed to set unsafeHTML, media elements can't have children.");
      }
      if (this._flags & VNodeFlags.VoidElement) {
        throw new Error(`Failed to set unsafeHTML, ${this._tag} elements can't have children.`);
      }
    }
    this._flags |= VNodeFlags.UnsafeHTML;
    this._children = html;
    return this;
  }

  /**
   * value assigns value property for HTMLInputElement and HTMLTextAreaElement elements.
   *
   * @param text Text value.
   * @returns VNode
   */
  value(value: string | null): this {
    if (DEBUG) {
      if (!(this._flags & (VNodeFlags.InputElement | VNodeFlags.TextAreaElement))) {
        throw new Error("Failed to set value, value is available on input and textarea elements only.");
      }
      if (isInputTypeHasCheckedProperty(this._tag as string)) {
        throw new Error(`Failed to set value, input elements with type ${this._tag} doesn't support `
          + `value assignments.`);
      }
    }
    this._children = value;
    return this;
  }

  /**
   * checked assigns checked property for HTMLInputElement.
   *
   * @param checked Checked value.
   * @returns VNode
   */
  checked(checked: boolean | null): this {
    if (DEBUG) {
      if (!(this._flags & VNodeFlags.InputElement)) {
        throw new Error("Failed to set checked, checked is available on input elements only.");
      }
      if (!isInputTypeHasCheckedProperty(this._tag as string)) {
        throw new Error(`Failed to set checked, input elements with type ${this._tag} doesn't support `
          + `checked value.`);
      }
    }
    this._children = checked;
    return this;
  }

  /**
   * autofocus makes an Element autofocused after instantiation.
   *
   * @param focus
   * @return VNode
   */
  autofocus(focus: boolean): this {
    if (DEBUG) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set autofocus, autofocus is available on element nodes only.");
      }
    }
    if (focus === true) {
      this._flags |= VNodeFlags.Autofocus;
    }
    return this;
  }
}

export type Children = Array<VNode[] | VNode | string | number | null>;

/**
 * getDOMInstanceFromVNode retrieves a reference to a DOM node from a VNode object.
 *
 * @param node VNode which contains reference to a DOM node.
 * @returns null if VNode doesn't have a reference to a DOM node.
 */
export function getDOMInstanceFromVNode<T extends Node>(node: VNode<any, T>): T | null {
  if ((node._flags & VNodeFlags.Component) !== 0) {
    return getDOMInstanceFromVNode<T>(node._children as VNode<any, T>);
  }
  return node._instance as T;
}

/**
 * getComponentInstanceFromVNode retrieves a reference to a Component instance from a VNode object.
 *
 * @param node VNode which contains reference to a Component instance.
 * @returns null if VNode doesn't have a reference to a Component instance.
 */
export function getComponentInstanceFromVNode<T extends Component<any>>(node: VNode): T | null {
  if (DEBUG) {
    if ((node._flags & VNodeFlags.Component) === 0) {
      throw new Error("Failed to get component instance: VNode should represent a Component.");
    }
  }
  return node._instance as T | null;
}

/**
 * isTextVNode returns `true` when VNode is a Text node.
 *
 * @param node VNode.
 * @returns `true` when VNode is a Text node.
 */
export function isTextVNode(node: VNode): boolean {
  return (node._flags & VNodeFlags.Text) !== 0;
}

/**
 * isElementVNode returns `true` when VNode is an Element node.
 *
 * @param node VNode.
 * @returns `true` when VNode is an Element node.
 */
export function isElementVNode(node: VNode): boolean {
  return (node._flags & VNodeFlags.Element) !== 0;
}

/**
 * isComponentVNode returns `true` when VNode is a Component node.
 *
 * @param node VNode.
 * @returns `true` when VNode is a Component node.
 */
export function isComponentVNode(node: VNode): boolean {
  return (node._flags & VNodeFlags.Component) !== 0;
}

/**
 * getKeyFromVNode retrieves `key` from VNode.
 *
 * @param node VNode.
 * @returns `key` property.
 */
export function getKeyFromVNode<T = any>(node: VNode): T {
  return node._key;
}

/**
 * getElementClassNameFromVNode retrieves `className` from VNode.
 *
 * @param node VNode.
 * @returns `className` property.
 */
export function getElementClassNameFromVNode(node: VNode): string | undefined {
  return node._className;
}

/**
 * getElementPropsFromVNode retrieves element properties from VNode.
 *
 * @param node VNode.
 * @returns element properties.
 */
export function getElementPropsFromVNode<P>(node: VNode<P>): P | undefined {
  return node._props;
}

/**
 * getElementStyleFromVNode retrieves `style` from VNode.
 *
 * @param node VNode.
 * @returns `style` property.
 */
export function getElementStyleFromVNode(node: VNode): CSSStyleProps | null {
  return node._style;
}

/**
 * disableDirtyChecking disables dirty checking for all descendants.
 *
 * @param node VNode.
 * @returns VNode.
 */
export function disableDirtyChecking<N extends VNode>(node: N): N {
  node._flags |= VNodeFlags.DisabledDirtyChecking;
  return node;
}

function checkUniqueKeys(children: VNode): void {
  let keys: Set<any> | undefined;
  let node: VNode<any> | null = children;
  while (node !== null) {
    if (node._flags & VNodeFlags.Key) {
      if (keys === undefined) {
        keys = new Set<any>();
      } else if (keys.has(node._key)) {
        throw new Error(`Failed to set children, invalid children list, key: "${node._key}" ` +
          `is used multiple times.`);
      }
      keys.add(node._key);
    }
    node = node._next;
  }
}
