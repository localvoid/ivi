import { Context } from "../common/types";
import { checkDOMAttributesForTypos, checkDOMStylesForTypos, checkDeprecatedDOMSVGAttributes } from "../dev_mode/typos";
import { isVoidElement, isInputTypeHasCheckedProperty } from "../dev_mode/dom";
import { InputType } from "../common/dom";
import { IVNode } from "./ivnode";
import { VNodeFlags, ElementDescriptorFlags } from "./flags";
import { ComponentFunction, ComponentClass, Component } from "./component";
import { ElementDescriptor } from "./element_descriptor";
import { SelectorData, ConnectDescriptor } from "./connect_descriptor";
import { KeepAliveHandler } from "./keep_alive";
import { EventHandlerList, EventHandler } from "../events/event_handler";
import { CSSStyleProps } from "../common/dom_props";

/**
 * VNode Builder provides a chain-method API to build VNodes.
 *
 * VNodeBuilder class has a parametric type `P` to specify `props` type.
 *
 *     const vnode = $h("div", "div-class-name")
 *         .props({ id: "div-id" })
 *         .events({ click: Events.onClick((e) => console.log("click event", e)) })
 *         .children("Hello");
 *
 * There are several factory functions that create VNode Builder objects:
 *
 *     // Basic HTML Elements
 *     $h(tagName: string, className?: string): VNodeBuilder<HTMLElementProps | null>;
 *
 *     // SVG Elements
 *     $s(tagName: string, className?: string): VNodeBuilder<SVGElementProps | null>;
 *
 *     // Components
 *     $c<P>(component: ComponentClass<P> | ComponentFunction<P>, props: P): VNodeBuilder<P>;
 *
 *     // Input Elements and TextArea (specifying type as "textarea" will create HTMLTextAreaElement)
 *     $i(type: string, className?: string): VNodeBuilder<HTMLInputElementProps | HTMLTextAreaElementProps | null>;
 *
 *     // Media Elements (Video and Audio)
 *     $m(tagName: string, className?: string): VNodeBuilder<HTMLMediaElementProps | null>;
 *
 *     // Text Nodes
 *     $t(text: string): VNodeBuilder<null>;
 *
 * @final
 */
export class VNode<P = null> implements IVNode<P> {
    _flags: VNodeFlags;
    _prev: IVNode<any>;
    _next: IVNode<any> | null;
    _children: IVNode<any> | string | number | boolean | null | undefined;
    _tag: string | ComponentClass<any> | ComponentFunction<any> | ElementDescriptor<any> |
    ConnectDescriptor<any, any, any> | KeepAliveHandler | null;
    _key: any;
    _props: P | null;
    _instance: Node | Component<any> | SelectorData | Context | null;
    _className: string | null;
    _style: CSSStyleProps | null;
    _events: EventHandlerList | EventHandler | null;

    constructor(
        flags: number,
        tag: string | ComponentFunction<P> | ComponentClass<P> | ElementDescriptor<any> |
            ConnectDescriptor<any, any, any> | KeepAliveHandler | null,
        props: P | null,
        className: string | null,
        children: IVNode<any> | string | number | boolean | null | undefined,
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
        if (key === null) {
            this._flags &= ~VNodeFlags.Key;
        } else {
            this._flags |= VNodeFlags.Key;
        }
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
            if (className !== null) {
                if (this._flags & VNodeFlags.ElementDescriptor) {
                    const d = this._tag as ElementDescriptor<P>;
                    if (d._flags & ElementDescriptorFlags.ProtectClassName) {
                        throw new Error("Failed to set className, className is protected by an ElementDescriptor.");
                    }
                }
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

            if (style) {
                checkDOMStylesForTypos(style);

                if (this._flags & VNodeFlags.ElementDescriptor) {
                    const d = this._tag as ElementDescriptor<P>;
                    if (d._flags & ElementDescriptorFlags.ProtectStyle) {
                        if (d._protectedStyle) {
                            const keys = Object.keys(d._protectedStyle);
                            for (let i = 0; i < keys.length; i++) {
                                const key = keys[i];
                                if (style.hasOwnProperty(key)) {
                                    throw new Error(`Failed to set style, "${key}" style is protected by an ` +
                                        `ElementDescriptor.`);
                                }
                            }
                        } else {
                            throw new Error("Failed to set style, style is protected by an ElementDescriptor.");
                        }
                    }
                }
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
    events(events: EventHandlerList | EventHandler | null): VNode<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set events, events are available on element nodes only.");
            }
        }
        this._events = events;
        return this;
    }

    /**
     * Set props.
     *
     * @param props.
     * @returns VNodeBuilder.
     */
    props<U extends P>(props: U | null): VNode<P> {
        if (__IVI_DEV__) {
            if (props) {
                checkDOMAttributesForTypos(props);

                if (this._flags & VNodeFlags.SvgElement) {
                    checkDeprecatedDOMSVGAttributes(this._tag as string, props);
                }

                if (this._flags & VNodeFlags.ElementDescriptor) {
                    const d = this._tag as ElementDescriptor<P>;
                    if (d._flags & ElementDescriptorFlags.ProtectProps) {
                        if (d._protectedProps) {
                            const keys = Object.keys(d._protectedProps);
                            for (let i = 0; i < keys.length; i++) {
                                const key = keys[i];
                                if (props.hasOwnProperty(key)) {
                                    throw new Error(`Failed to set props, "${key}" property is protected by an ` +
                                        `ElementDescriptor.`);
                                }
                            }
                        } else {
                            throw new Error("Failed to set props, props are protected by an ElementDescriptor.");
                        }
                    }
                }
            }
        }
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
    children(...children: Array<IVNode<any> | string | number | null>): VNode<P>;
    children(): VNode<P> {
        if (__IVI_DEV__) {
            if (this._flags &
                (VNodeFlags.ChildrenVNode |
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
            if (isVoidElement(this._tag as string)) {
                throw new Error(`Failed to set children, ${this._tag} elements can't have children.`);
            }
        }

        let first: IVNode<any> | string | number | null = null;
        let firstPosition = 0;
        let i;
        let n;

        const children = arguments;
        for (i = 0; i < children.length; i++) {
            n = children[i];
            if (n !== null) {
                if (first === null) {
                    first = n;
                    firstPosition = i;
                } else {
                    if (!isValidVNode(first)) {
                        first = new VNode<null>(VNodeFlags.Text, null, null, null, first);
                    }
                    if (!(first._flags & VNodeFlags.Key)) {
                        first._key = firstPosition;
                    }
                    break;
                }
            }
        }

        if (i < children.length) {
            first = first as IVNode<any>;
            let prev = first._prev;
            for (; i < children.length; i++) {
                n = children[i];

                if (n !== null) {
                    if (isValidVNode(n)) {
                        if (!(n._flags & VNodeFlags.Key)) {
                            n._key = i;
                        }
                    } else {
                        n = new VNode<null>(VNodeFlags.Text, null, null, null, n);
                        n._key = i;
                    }

                    const last = n._prev;
                    n._prev = prev;
                    prev!._next = n;
                    prev = last;
                }
            }
            first._prev = prev;
        }

        if (typeof first === "object") {
            if (first !== null) {
                this._flags |= VNodeFlags.ChildrenVNode;
                checkUniqueKeys(first);
            }
        } else {
            this._flags |= VNodeFlags.ChildrenBasic;
        }
        this._children = first;

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
            if (this._flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenBasic)) {
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
            if (isVoidElement(this._tag as string)) {
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
            if (!isInputTypeHasCheckedProperty(this._tag as InputType)) {
                throw new Error(`Failed to set checked, input elements with type ${this._tag} doesn't support `
                    + `checked value.`);
            }
        }
        this._children = checked;
        return this;
    }

    /**
     * Marks VNode as an immutable.
     *
     * Immutable VNodes can't be used directly when rendering trees, they should be cloned with a `cloneVNode` function.
     *
     * @returns VNodeBuilder.
     */
    immutable(): VNode<P> {
        if (__IVI_DEV__) {
            this._flags |= VNodeFlags.Immutable;
        }
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
        if (props) {
            return this.props(this._props ? Object.assign({}, this._props, props) : props);
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
        if (style) {
            return this.style(this._style ? Object.assign({}, this._style, style) : style);
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
        if (focus) {
            this._flags |= VNodeFlags.Autofocus;
        }
        return this;
    }
}

export function isValidVNode(v: any): v is IVNode<any> {
    return v.constructor === VNode;
}

export function checkUniqueKeys(children: IVNode<any> | null): void {
    if (__IVI_DEV__) {
        if (children !== null) {
            let keys: Set<any> | undefined;
            let node: IVNode<any> | null = children;
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
    }
}
