import { Context, CSSStyleProps, SelectorData } from "ivi-core";
import { EventHandler } from "ivi-events";
import { checkDOMAttributesForTypos, checkDOMStylesForTypos, checkDeprecatedDOMSVGAttributes } from "../dev_mode/typos";
import { isInputTypeHasCheckedProperty } from "../dev_mode/dom";
import { VNodeFlags } from "./flags";
import { StatelessComponent, ComponentClass, Component } from "./component";
import { ConnectDescriptor } from "./connect_descriptor";
import { KeepAliveHandler } from "./keep_alive";

/**
 * Element properties.
 */
export interface ElementProps<P> {
  /**
   * Attributes.
   */
  attrs: P | null;
  /**
   * Style.
   */
  style: CSSStyleProps | null;
  /**
   * Events.
   */
  events: Array<EventHandler | null> | EventHandler | null;
}

/**
 * Virtual DOM Node.
 *
 *     const vnode = html.div("div-class-name")
 *         .props({ id: "div-id" })
 *         .events(Events.onClick((e) => console.log("click event", e)))
 *         .children("Hello");
 *
 * @final
 */
export class VNode<P = null> {
  /**
   * Flags, see `VNodeFlags` for details.
   */
  _flags: VNodeFlags;
  /**
   * Children property has a dynamic type that depends on the node kind.
   *
   * Element Nodes should contain children virtual nodes in a flat array, singular virtual node or a simple text.
   *
   * Input Element Nodes should contain input value (value or checked).
   *
   * Components should contain virtual root nodes.
   */
  _children: VNode<any>[] | VNode<any> | string | number | boolean | null;
  /**
   * Tag property contains details about the type of the element.
   *
   * Simple elements has a string type values, components can be a simple functions, constructor, or special
   * descriptors for nodes that change syncing algorithm behavior.
   */
  _tag:
  | string
  | ComponentClass<any>
  | StatelessComponent<any>
  | ConnectDescriptor<any, any, any>
  | KeepAliveHandler
  | null;
  /**
   * Children syncing algorithm is using key property to find the same node in the previous children array. Key
   * should be unique among its siblings.
   */
  _key: any;
  /**
   * Properties.
   */
  _props: ElementProps<P> | P | null;
  /**
   * Reference to HTML node or Component instance. It will be available after virtual node is created or synced. Each
   * time VNode is synced, reference will be transferred from the old VNode to the new one.
   */
  _instance: Node | Component<any> | SelectorData | Context | null;
  /**
   * Class name.
   */
  _className: string | null;

  constructor(
    flags: number,
    tag:
      | string
      | StatelessComponent<P>
      | ComponentClass<P>
      | ConnectDescriptor<any, any, any>
      | KeepAliveHandler
      | null,
    props: ElementProps<P> | P | null,
    className: string | null,
    children:
      | VNode<any>[]
      | VNode<any>
      | string
      | number
      | boolean
      | null,
  ) {
    this._flags = flags;
    this._children = children;
    this._tag = tag;
    this._key = 0;
    this._props = props;
    this._instance = null;
    this._className = className;
  }

  /**
   * key assigns a key.
   *
   * Children reconciliation algorithm is using key property to find the same node in the previous children array. Key
   * should be unique among its siblings.
   *
   * @param key Any object that should be unique among its siblings.
   * @returns VNode
   */
  key(key: any): this {
    this._flags |= VNodeFlags.Key;
    this._key = key;
    return this;
  }

  /**
   * className assigns className for an Element node.
   *
   * @param className CSS Class name.
   * @returns VNode
   */
  className(className: string | null): this {
    if (__IVI_DEV__) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set className, className is available on element nodes only.");
      }
    }
    this._className = className;
    return this;
  }

  /**
   * style assigns style for an Element node.
   *
   * @param style Style.
   * @returns VNode
   */
  style<U extends CSSStyleProps>(style: U | null): this {
    if (__IVI_DEV__) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set style, style is available on element nodes only.");
      }

      if (style !== null) {
        checkDOMStylesForTypos(style);
      }
    }
    if (this._props === null) {
      this._flags |= VNodeFlags.ElementProps;
      this._props = {
        attrs: null,
        style,
        events: null,
      };
    } else {
      (this._props as ElementProps<P>).style = style;
    }
    return this;
  }

  /**
   * events assign events for an Element node.
   *
   * @param events Events.
   * @returns VNode
   */
  events(events: Array<EventHandler | null> | EventHandler | null): this {
    if (__IVI_DEV__) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set events, events are available on element nodes only.");
      }
    }
    if (this._props === null) {
      this._flags |= VNodeFlags.ElementProps;
      this._props = {
        attrs: null,
        style: null,
        events,
      };
    } else {
      (this._props as ElementProps<P>).events = events;
    }
    return this;
  }

  /**
   * props assigns props for an Element node.
   *
   * @param props Props.
   * @returns VNode
   */
  props<U extends P>(props: U | null): this {
    if (__IVI_DEV__) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set props, props are available on element nodes only.");
      }

      if (props) {
        checkDOMAttributesForTypos(props);

        if (this._flags & VNodeFlags.SvgElement) {
          checkDeprecatedDOMSVGAttributes(this._tag as string, props);
        }
      }
    }
    if (this._props === null) {
      this._flags |= VNodeFlags.ElementProps;
      this._props = {
        attrs: props,
        style: null,
        events: null,
      };
    } else {
      (this._props as ElementProps<P>).attrs = props;
    }
    return this;
  }

  /**
   * children assigns children for an Element node.
   *
   * @param children Children can be a simple string, single VNode or recursive list of VNodes with strings and null
   *   values. It will automatically normalize recursive lists by flattening, filtering out null values and replacing
   *   strings with text nodes.
   * @returns VNode
   */
  children(...children: Array<VNode<any>[] | VNode<any> | string | number | null>): this;
  children(): this {
    if (__IVI_DEV__) {
      if (this._flags &
        (VNodeFlags.ChildrenArray |
          VNodeFlags.ChildrenVNode |
          VNodeFlags.ChildrenBasic |
          VNodeFlags.UnsafeHTML)) {
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
    let f = 0;
    let r = null;
    if (children.length === 1) {
      r = children[0] as VNode<any>[] | VNode<any> | string | number | null;
      if (typeof r === "object") {
        if (r !== null) {
          if (r.constructor === Array) {
            r = r as VNode<any>[];
            if (r.length > 1) {
              f = VNodeFlags.ChildrenArray;
            } else if (r.length === 1) {
              f = VNodeFlags.ChildrenVNode;
              r = r[0];
            } else {
              r = null;
            }
          } else {
            f = VNodeFlags.ChildrenVNode;
          }
        }
      } else {
        f = VNodeFlags.ChildrenBasic;
      }
    } else {
      let i;
      let j = 0;
      let k = 0;
      let c;
      for (i = 0; i < children.length; i++) {
        c = children[i];
        if (c !== null) {
          if (c.constructor === Array) {
            if (c.length > 0) {
              k += c.length;
              j++;
              r = c;
            }
          } else {
            k++;
            j++;
            r = c;
          }
        }
      }
      if (j > 0) {
        if ((j | k) === 1) {
          if (typeof r === "object") {
            if (r.constructor === Array) {
              if (k > 1) {
                f = VNodeFlags.ChildrenArray;
              } else {
                f = VNodeFlags.ChildrenVNode;
                r = r[0];
              }
            } else {
              f = VNodeFlags.ChildrenVNode;
            }
          } else {
            f = VNodeFlags.ChildrenBasic;
          }
        } else {
          f = VNodeFlags.ChildrenArray;
          r = new Array(k);
          k = 0;
          for (i = 0; i < children.length; i++) {
            c = children[i];
            if (typeof c === "object") {
              if (c !== null) {
                if (c.constructor === Array) {
                  for (j = 0; j < c.length; j++) {
                    if (__IVI_DEV__) {
                      if (!(c[j]._flags & VNodeFlags.Key)) {
                        throw new Error("Invalid children array. All children nodes in nested" +
                          " array should have explicit keys.");
                      }
                    }
                    r[k++] = c[j] as VNode<any>;
                  }
                } else {
                  r[k++] = c as VNode<any>;
                  if ((c._flags & VNodeFlags.Key) === 0) {
                    c._key = i;
                  }
                }
              }
            } else {
              c = r[k++] = new VNode<null>(VNodeFlags.Text, null, null, null, c as string | number);
              c._key = i;
            }
          }
          checkUniqueKeys(r);
        }
      }
    }
    this._flags |= f;
    this._children = r;
    return this;
  }

  /**
   * applyChildren calls `children` method with arguments provided as an array.
   *
   * @param children Children can be a simple string, single VNode or recursive list of VNodes with strings and null
   *   values. It will automatically normalize recursive lists by flattening, filtering out null values and replacing
   *   strings with text nodes
   * @returns VNode
   */
  applyChildren(children: Array<VNode<any>[] | VNode<any> | string | number | null>): this {
    this.children.apply(this, children);
    return this;
  }

  /**
   * unsafeHTML assigns children as an innerHTML string. It is potentially vulnerable to XSS attacks.
   *
   * @param html innerHTML in a string format.
   * @returns VNode
   */
  unsafeHTML(html: string | null): this {
    if (__IVI_DEV__) {
      if (this._flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenBasic)) {
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
    if (__IVI_DEV__) {
      if (!(this._flags & (VNodeFlags.InputElement | VNodeFlags.TextAreaElement))) {
        throw new Error("Failed to set value, value is available on input and textarea elements only.");
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
    if (__IVI_DEV__) {
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
   * mergeProps merges props with existing props for an Element node.
   *
   * @param props
   * @return VNode
   */
  mergeProps<U extends P>(props: U | null): this {
    if (__IVI_DEV__) {
      if (props && typeof props !== "object") {
        throw new Error(`Failed to merge props, props object has type "${typeof props}".`);
      }
      if (this._props &&
        (this._props as ElementProps<P>).attrs &&
        typeof (this._props as ElementProps<P>).attrs !== "object") {
        throw new Error(`Failed to merge props, props object has type "${typeof this._props}".`);
      }
    }
    if (props !== null) {
      return this.props(
        this._props !== null && (this._props as ElementProps<P>).attrs !== null ?
          Object.assign({}, (this._props as ElementProps<P>).attrs, props) :
          props,
      );
    }
    return this;
  }

  /**
   * mergeStyle merges style with existing style for an Element node.
   *
   * @param props
   * @return VNode
   */
  mergeStyle<U extends CSSStyleProps>(style: U | null): this {
    if (style !== null) {
      return this.style(
        this._props !== null && (this._props as ElementProps<P>).style !== null ?
          Object.assign({}, (this._props as ElementProps<P>).style, style) :
          style,
      );
    }
    return this;
  }

  /**
   * autofocus makes an Element autofocused on instantiation.
   *
   * @param focus
   * @return VNode
   */
  autofocus(focus: boolean): this {
    if (__IVI_DEV__) {
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

/**
 * getDOMInstanceFromVNode retrieves a reference to a DOM node from a VNode object.
 *
 * @param node VNode which contains reference to a DOM node.
 * @returns null if VNode doesn't have a reference to a DOM node.
 */
export function getDOMInstanceFromVNode<T extends Node>(node: VNode<any>): T | null {
  if ((node._flags & VNodeFlags.Component) !== 0) {
    return getDOMInstanceFromVNode<T>(node._children as VNode<any>);
  }
  return node._instance as T;
}

/**
 * getComponentInstanceFromVNode retrieves a reference to a Component instance from a VNode object.
 *
 * @param node VNode which contains reference to a Component instance.
 * @returns null if VNode doesn't have a reference to a Component instance.
 */
export function getComponentInstanceFromVNode<T extends Component<any>>(node: VNode<any>): T | null {
  if (__IVI_DEV__) {
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
export function isTextVNode(node: VNode<any>): boolean {
  return (node._flags & VNodeFlags.Text) !== 0;
}

/**
 * isElementVNode returns `true` when VNode is an Element node.
 *
 * @param node VNode.
 * @returns `true` when VNode is an Element node.
 */
export function isElementVNode(node: VNode<any>): boolean {
  return (node._flags & VNodeFlags.Element) !== 0;
}

/**
 * isComponentVNode returns `true` when VNode is a Component node.
 *
 * @param node VNode.
 * @returns `true` when VNode is a Component node.
 */
export function isComponentVNode(node: VNode<any>): boolean {
  return (node._flags & VNodeFlags.Component) !== 0;
}

/**
 * getKeyFromVNode retrieves `key` from VNode.
 *
 * @param node VNode.
 * @returns `key` property.
 */
export function getKeyFromVNode<T = any>(node: VNode<any>): T {
  return node._key;
}

/**
 * getElementClassNameFromVNode retrieves `className` from VNode.
 *
 * @param node VNode.
 * @returns `className` property.
 */
export function getElementClassNameFromVNode(node: VNode<any>): string | null {
  return node._className;
}

/**
 * getElementPropsFromVNode retrieves element properties from VNode.
 *
 * @param node VNode.
 * @returns element properties.
 */
export function getElementPropsFromVNode<P>(node: VNode<P>): P | null {
  const props = (node._props as ElementProps<P>);
  if (props !== null) {
    return props.attrs;
  }
  return null;
}

/**
 * getElementStyleFromVNode retrieves `style` from VNode.
 *
 * @param node VNode.
 * @returns `style` property.
 */
export function getElementStyleFromVNode(node: VNode<any>): CSSStyleProps | null {
  const props = (node._props as ElementProps<any>);
  if (props !== null) {
    return props.style;
  }
  return null;
}

function checkUniqueKeys(children: VNode<any>[]): void {
  if (__IVI_DEV__) {
    let keys: Set<any> | undefined;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if ((child._flags & VNodeFlags.Key) !== 0) {
        if (keys === undefined) {
          keys = new Set<any>();
        } else if (keys.has(child._key) === true) {
          throw new Error(`Failed to set children, invalid children list, key: "${child._key}" ` +
            `is used multiple times.`);
        }
        keys.add(child._key);
      }
    }
  }
}
