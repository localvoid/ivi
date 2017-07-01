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
     * VNode represents an HTMLInputElement(+textarea) element.
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

    // Blueprint specific flags:
    /**
     * Blueprint Node contains connect node.
     */
    DeepConnect = 1 << 18,

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
    | Key
    | InputElement
    | TextAreaElement
    | MediaElement
    | SvgElement
    | Connect
    | UpdateContext,
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
     * Element Nodes should contain children virtual nodes in a flat array, singular virtual node or simple text.
     *
     * Input Element Nodes should contain input value (value or checked).
     *
     * Stateless Components should contain virtual root nodes.
     */
    _children: | VNode<any>[] | VNode<any> | string | number | boolean | null;
    /**
     * Tag property contains details about the type of the element.
     *
     * Simple elements has a string type values, components can be a simple functions, constructor, or special
     * descriptors for nodes that change syncing algorithm behavior.
     */
    _tag: | string | ComponentClass<any> | StatelessComponent<any> | ConnectDescriptor<any, any, any> | null;
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
     * Set key.
     *
     * Children reconciliation algorithm is using key property to find the same node in the previous children array. Key
     * should be unique among its siblings.
     *
     * @param key Any object that should be unique among its siblings.
     * @returns VNodeBuilder.
     */
    key(key: any): VNode<P> {
        this._flags |= VNodeFlags.Key;
        this._key = key;
        return this;
    }

    /**
     * Set className.
     *
     * @param className.
     * @returns VNodeBuilder.
     */
    className(className: string | null): VNode<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set className, className is available on element nodes only.");
            }
        }
        this._className = className;
        return this;
    }

    /**
     * Set style.
     *
     * @param style.
     * @returns VNodeBuilder.
     */
    style<U extends CSSStyleProps>(style: U | null): VNode<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set style, style is available on element nodes only.");
            }
        }
        this._style = style;
        return this;
    }

    /**
     * Set events.
     *
     * @param events.
     * @returns VNodeBuilder.
     */
    events(events: Array<EventHandler | null> | EventHandler | null): VNode<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set events, events are available on element nodes only.");
            }
        }
        return this;
    }

    /**
     * Set props.
     *
     * @param props.
     * @returns VNodeBuilder.
     */
    props<U extends P>(props: U | null): VNode<P> {
        this._props = props;
        return this;
    }

    /**
     * Set children.
     *
     * @param children Children can be a simple string, single VNode or recursive list of VNodes with strings and null
     *   values. It will automatically normalize recursive lists by flattening, filtering out null values and replacing
     *   strings with text nodes.
     * @returns VNodeBuilder.
     */
    children(...children: Array<VNode<any>[] | VNode<any> | string | number | null>): VNode<P>;
    children(): VNode<P> {
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
     * Set children as an innerHTML string. It is potentially vulnerable to XSS attacks.
     *
     * @param html innerHTML in a string format.
     * @returns VNodeBuilder.
     */
    unsafeHTML(html: string | null): VNode<P> {
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
     * Set HTMLInputElement/HTMLTextAreaElement value property.
     *
     * @param text Text value.
     * @returns VNodeBuilder.
     */
    value(value: string | null): VNode<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.InputElement)) {
                throw new Error("Failed to set value, value is available on input elements only.");
            }
        }
        this._children = value;
        return this;
    }

    /**
     * Set HTMLInputElement checked property.
     *
     * @param text Text value.
     * @returns VNodeBuilder.
     */
    checked(checked: boolean | null): VNode<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.InputElement)) {
                throw new Error("Failed to set checked, checked is available on input elements only.");
            }
        }
        this._children = checked;
        return this;
    }

    /**
     * Merge props with existing props.
     *
     * @param props
     * @return VNodeBuilder.
     */
    mergeProps<U extends P>(props: U | null): VNode<P> {
        if (__IVI_DEV__) {
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
     * Merge style with existing style.
     *
     * @param props
     * @return VNodeBuilder.
     */
    mergeStyle<U extends CSSStyleProps>(style: U | null): VNode<P> {
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
     * Element will be automatically focused after instantiation.
     *
     * @param focus
     * @return VNodeBuilder.
     */
    autofocus(focus: boolean): VNode<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set autofocus, autofocus is available on element nodes only.");
            }
        }
        return this;
    }
}

/**
 * Get reference to a DOM node from a VNode object.
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
 * Get reference to a Component instance from a VNode object.
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
    return null;
}

export function checkUniqueKeys(children: VNode<any>[]): void {
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

export function vNodeCanSync(a: VNode, b: VNode): boolean {
    return (
        ((a._flags ^ b._flags) & VNodeFlags.Syncable) === 0 &&
        a._tag === b._tag &&
        a._key === b._key
    );
}

export function vNodeEqualKeys(a: VNode, b: VNode): boolean {
    return a._key === b._key && ((a._flags ^ b._flags) & VNodeFlags.Key) === 0;
}
