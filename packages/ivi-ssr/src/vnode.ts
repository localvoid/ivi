import { DEV } from "ivi-vars";
import { CSSStyleProps } from "ivi-core";
import { EventHandler } from "./events";
import { BlueprintNode } from "./blueprint";
import { StatelessComponent, ComponentClass, Component } from "./component";
import { ConnectDescriptor } from "./connect_descriptor";

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
   * VNode represents a simple "function" component.
   *
   * It can also represent specialized components like "UpdateContext" component.
   */
  ComponentFunction = 1 << 2,
  /**
   * VNode represents a component.
   */
  ComponentClass = 1 << 3,
  /**
   * Children property contains a child with a basic type (number/string/boolean).
   */
  ChildrenBasic = 1 << 4,
  /**
   * Children property contains a child VNode.
   */
  ChildrenVNode = 1 << 5,
  /**
   * Children property contains an Array type.
   */
  ChildrenArray = 1 << 6,
  /**
   * Children property contains unsafe HTML.
   */
  UnsafeHTML = 1 << 7,
  /**
   * VNode is using a non-artificial key.
   */
  Key = 1 << 8,
  /**
   * VNode represents an HTMLInputElement element.
   */
  InputElement = 1 << 9,
  /**
   * VNode represents a HTMLTextAreaElement.
   */
  TextAreaElement = 1 << 10,
  /**
   * VNode represents a HTMLMediaElement.
   */
  MediaElement = 1 << 11,
  /**
   * VNode is an SVGElement.
   */
  SvgElement = 1 << 12,
  /**
   * Specialized VNode with connect functionality.
   */
  Connect = 1 << 13,
  /**
   * Specialized VNode with an update context functionality.
   */
  UpdateContext = 1 << 14,
  /**
   * VNode element cannot contain any children.
   */
  VoidElement = 1 << 15,
  /**
   * http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody
   * http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre
   */
  NewLineEatingElement = 1 << 16,
  /**
   * Component VNode has a linked blueprint.
   */
  LinkedBlueprint = 1 << 17,
  /**
   * Stateless component is using `isPropsChanged` hook.
   */
  CheckChangedProps = 1 << 18,

  // Blueprint specific flags:
  /**
   * Blueprint Node contains connect node.
   */
  DeepConnect = 1 << 19,
  /**
   * Blueprint Node is frozen and shouldn't be changed.
   */
  Frozen = 1 << 20,

  /**
   * VNode represents a Component.
   */
  Component = ComponentFunction | ComponentClass,
  /**
   * Flags that should match to be compatible for syncing.
   */
  Syncable = Text
  | Element
  | Component
  // | Key (Keys shouldn't be checked for blueprint nodes)
  | InputElement
  | TextAreaElement
  | MediaElement
  | SvgElement
  | Connect
  | UpdateContext
  | VoidElement,
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
  _tag: string | ComponentClass<any> | StatelessComponent<any> | ConnectDescriptor<any, any, any> | null;
  /**
   * Children syncing algorithm is using key property to find the same node in the previous children array. Key
   * should be unique among its siblings.
   */
  _key: any;
  /**
   * Properties.
   */
  _props: P | null;
  /**
   * Style.
   */
  _style: CSSStyleProps | BlueprintNode | null;
  /**
   * Class name.
   */
  _className: string | null;
  /**
   * Close element string.
   */
  _close: string | null;

  constructor(
    flags: number,
    tag: | string | StatelessComponent<P> | ComponentClass<P> | ConnectDescriptor<any, any, any> | null,
    props: P | null,
    className: string | null,
    children: VNode<any>[] | VNode<any> | string | number | boolean | null,
    close: string | null,
  ) {
    this._flags = flags;
    this._children = children;
    this._tag = tag;
    this._key = 0;
    this._props = props;
    this._style = null;
    this._className = className;
    this._close = close;
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
    if (DEV) {
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
    if (DEV) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set style, style is available on element nodes only.");
      }
    }
    this._style = style;
    return this;
  }

  /**
   * events assign events for an Element node.
   *
   * @param events Events.
   * @returns VNode
   */
  events(events: Array<EventHandler | null> | EventHandler | null): this {
    if (DEV) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set events, events are available on element nodes only.");
      }
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
    if (DEV) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set props, props are available on element nodes only.");
      }
    }

    this._props = props;
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
  children(): VNode<P> {
    if (DEV) {
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
                    if (DEV) {
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
              c = r[k++] = new VNode<null>(VNodeFlags.Text, null, null, null, c as string | number, null);
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
    if (DEV) {
      if (this._flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenBasic)) {
        throw new Error("Failed to set unsafeHTML, VNode element is already having children.");
      }
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set unsafeHTML, unsafeHTML is available on element nodes only.");
      }
      if (this._flags & VNodeFlags.InputElement) {
        throw new Error("Failed to set unsafeHTML, input elements can't have innerHTML.");
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
    if (DEV) {
      if (!(this._flags & VNodeFlags.InputElement)) {
        throw new Error("Failed to set value, value is available on input elements only.");
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
    if (DEV) {
      if (!(this._flags & VNodeFlags.InputElement)) {
        throw new Error("Failed to set checked, checked is available on input elements only.");
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
    if (DEV) {
      if (props && typeof props !== "object") {
        throw new Error(`Failed to merge props, props object has type "${typeof props}".`);
      }
      if (this._props && typeof this._props !== "object") {
        throw new Error(`Failed to merge props, props object has type "${typeof this._props}".`);
      }
    }
    if (props !== null) {
      return this.props(
        this._props !== null ?
          Object.assign({}, this._props, props) :
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
        this._style !== null ?
          Object.assign({}, this._style, style) :
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
    if (DEV) {
      if (!(this._flags & VNodeFlags.Element)) {
        throw new Error("Failed to set autofocus, autofocus is available on element nodes only.");
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
export function getDOMInstanceFromVNode<T extends Node>(node: VNode<any>): T | null {
  if ((node._flags & VNodeFlags.Component) !== 0) {
    return getDOMInstanceFromVNode<T>(node._children as VNode<any>);
  }
  return null;
}

/**
 * getComponentInstanceFromVNode retrieves a reference to a Component instance from a VNode object.
 *
 * @param node VNode which contains reference to a Component instance.
 * @returns null if VNode doesn't have a reference to a Component instance.
 */
export function getComponentInstanceFromVNode<T extends Component<any>>(node: VNode<any>): T | null {
  if (DEV) {
    if ((node._flags & VNodeFlags.Component) === 0) {
      throw new Error("Failed to get component instance: VNode should represent a Component.");
    }
  }
  return null;
}

export function checkUniqueKeys(children: VNode<any>[]): void {
  if (DEV) {
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

export function vNodeEqualKeys(a: VNode, b: VNode): boolean {
  return a._key === b._key && ((a._flags ^ b._flags) & VNodeFlags.Key) === 0;
}

/**
 * Deep clone of VNode children.
 *
 * @param flags Parent VNode flags.
 * @param children Children.
 * @returns Cloned children.
 */
export function cloneVNodeChildren(
  flags: VNodeFlags,
  children: VNode<any>[] | VNode<any> | string | number | boolean | null,
): VNode<any>[] | VNode<any> | string | number | boolean | null {
  if (children !== null) {
    if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
      if ((flags & VNodeFlags.ChildrenArray) !== 0) {
        children = children as VNode<any>[];
        const newChildren = new Array<VNode<any>>(children.length);
        for (let i = 0; i < 0; i++) {
          newChildren[i] = _cloneVNode(children[i], true);
        }
        return newChildren;
      } else {
        return _cloneVNode(children as VNode<any>, true);
      }
    }
  }

  return children;
}

function _cloneVNode(node: VNode<any>, cloneKey: boolean): VNode<any> {
  const flags = node._flags;

  const newNode = new VNode(
    flags,
    node._tag,
    node._props,
    node._className,
    cloneVNodeChildren(flags, node._children),
    node._close,
  );
  newNode._style = node._style;

  if (cloneKey === true) {
    newNode._key = node._key;
  }

  return newNode;
}

/**
 * Deep clone of VNode.
 *
 * @param node VNode to clone.
 * @returns Cloned VNode.
 */
export function cloneVNode(node: VNode<any>): VNode<any> {
  return _cloneVNode(node, (node._flags & VNodeFlags.Key) !== 0);
}

/**
 * Shallow clone of VNode.
 *
 * @param node VNode to clone.
 * @returns Cloned VNode.
 */
export function shallowCloneVNode(node: VNode<any>): VNode<any> {
  const flags = node._flags;

  const newNode = new VNode(
    flags & ~(
      VNodeFlags.ChildrenArray |
      VNodeFlags.ChildrenBasic |
      VNodeFlags.ChildrenVNode |
      VNodeFlags.UnsafeHTML
    ),
    node._tag,
    node._props,
    node._className,
    null,
    node._close,
  );
  newNode._style = node._style;
  if ((flags & VNodeFlags.Key) !== 0) {
    newNode._key = node._key;
  }

  return newNode;
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
  return node._props as P | null;
}

/**
 * getElementStyleFromVNode retrieves `style` from VNode.
 *
 * @param node VNode.
 * @returns `style` property.
 */
export function getElementStyleFromVNode(node: VNode<any>): CSSStyleProps | null {
  return node._style as CSSStyleProps | null;
}

/**
 * disableDirtyCheck disables dirty checking for all descendants.
 *
 * @param node VNode.
 * @returns VNode.
 */
export function disableDirtyCheck<N extends VNode<any>>(node: N): N {
  return node;
}
