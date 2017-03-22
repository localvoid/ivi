import { Context } from "../common/types";
import { checkDOMAttributesForTypos, checkDOMStylesForTypos, checkDeprecatedDOMSVGAttributes } from "../dev_mode/typos";
import { isVoidElement, isInputTypeHasCheckedProperty } from "../dev_mode/dom";
import { InputType } from "../common/dom";
import { IVNode, ElementProps } from "./ivnode";
import { VNodeFlags, ElementDescriptorFlags } from "./flags";
import { ComponentFunction, ComponentClass, Component } from "./component";
import { ElementDescriptor } from "./element_descriptor";
import { SelectorData, ConnectDescriptor } from "./connect_descriptor";
import { KeepAliveHandler } from "./keep_alive";
import { EventHandler } from "../events/event_handler";
import { CSSStyleProps } from "../common/dom_props";

/**
 * VNode Builder provides a chain-method API to build VNodes.
 *
 * VNodeBuilder class has a parametric type `P` to specify `props` type.
 *
 *     const vnode = $h("div", "div-class-name")
 *         .props({ id: "div-id" })
 *         .events(Events.onClick((e) => console.log("click event", e)))
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
    _children: IVNode<any>[] | IVNode<any> | string | number | boolean | null | undefined;
    _tag: string | ComponentClass<any> | ComponentFunction<any> | ElementDescriptor<any> |
    ConnectDescriptor<any, any, any> | KeepAliveHandler | null;
    _key: any;
    _props: ElementProps<P> | P | null;
    _instance: Node | Component<any> | SelectorData | Context | null;
    _className: string | null;

    constructor(
        flags: number,
        tag: string | ComponentFunction<P> | ComponentClass<P> | ElementDescriptor<any> |
            ConnectDescriptor<any, any, any> | KeepAliveHandler | null,
        props: ElementProps<P> | P | null,
        className: string | null,
        children: IVNode<any>[] | IVNode<any> | string | number | boolean | null | undefined,
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
     * Set children.
     *
     * @param children Children can be a simple string, single VNode or recursive list of VNodes with strings and null
     *   values. It will automatically normalize recursive lists by flattening, filtering out null values and replacing
     *   strings with text nodes.
     * @returns VNodeBuilder.
     */
    children(...children: Array<IVNode<any>[] | IVNode<any> | string | number | null>): VNode<P>;
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
            if (isVoidElement(this._tag as string)) {
                throw new Error(`Failed to set children, ${this._tag} elements can't have children.`);
            }
        }

        const children = arguments;
        let c;
        if (children.length === 1) {
            c = children[0];
            if (typeof c === "object") {
                if (c !== null) {
                    if (c.constructor === Array) {
                        if (c.length > 0) {
                            if (c.length > 1) {
                                this._flags |= VNodeFlags.ChildrenArray;
                            } else {
                                this._flags |= VNodeFlags.ChildrenVNode;
                                c = c[0];
                            }
                        } else {
                            c = null;
                        }
                    } else {
                        this._flags |= VNodeFlags.ChildrenVNode;
                    }
                }
            } else {
                this._flags |= VNodeFlags.ChildrenBasic;
            }
            this._children = c as IVNode<any>[] | IVNode<any> | string | number | null;
        } else {

            let topCount = 0;
            let count = 0;
            let i;
            let last;
            for (i = 0; i < children.length; i++) {
                c = children[i];
                if (c !== null) {
                    if (c.constructor === Array) {
                        if (c.length > 0) {
                            count += c.length;
                            topCount++;
                            last = c;
                        }
                    } else {
                        count++;
                        topCount++;
                        last = c;
                    }
                }
            }
            if (topCount > 0) {
                if ((topCount | count) === 1) {
                    this._children = last;
                    if (typeof last === "object") {
                        if (last.constructor === Array) {
                            if (count > 1) {
                                this._flags |= VNodeFlags.ChildrenArray;
                            } else {
                                this._children = last[0];
                                this._flags |= VNodeFlags.ChildrenVNode;
                            }
                        } else {
                            this._flags |= VNodeFlags.ChildrenVNode;
                        }
                    } else {
                        this._flags |= VNodeFlags.ChildrenBasic;
                    }
                } else {
                    this._flags |= VNodeFlags.ChildrenArray;
                    const array = this._children = new Array(count);
                    let k = 0;
                    for (i = 0; i < children.length; i++) {
                        c = children[i];
                        if (typeof c === "object") {
                            if (c !== null) {
                                if (c.constructor === Array) {
                                    for (let j = 0; j < c.length; j++) {
                                        if (__IVI_DEV__) {
                                            if (!(c[j]._flags & VNodeFlags.Key)) {
                                                throw new Error("Invalid children array. All children nodes in nested" +
                                                    " array should have explicit keys.");
                                            }
                                        }
                                        array[k++] = c[j] as IVNode<any>;
                                    }
                                } else {
                                    array[k++] = c as IVNode<any>;
                                    if (!(c._flags & VNodeFlags.Key)) {
                                        c._key = i;
                                    }
                                }
                            }
                        } else {
                            c = array[k++] = new VNode<null>(VNodeFlags.Text, null, null, null, c as string | number);
                            c._key = i;
                        }
                    }
                    checkUniqueKeys(array);
                }
            }
        }

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
            if (this._props &&
                (this._props as ElementProps<P>).attrs &&
                typeof (this._props as ElementProps<P>).attrs !== "object") {
                throw new Error(`Failed to merge props, props object has type "${typeof this._props}".`);
            }
        }
        if (props) {
            return this.props(this._props && (this._props as ElementProps<P>).attrs ?
                Object.assign({}, (this._props as ElementProps<P>).attrs, props) :
                props);
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
            return this.style(this._props && (this._props as ElementProps<P>).style ?
                Object.assign({}, (this._props as ElementProps<P>).style, style) :
                style);
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

export function checkUniqueKeys(children: IVNode<any>[]): void {
    if (__IVI_DEV__) {
        let keys: Set<any> | undefined;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child._flags & VNodeFlags.Key) {
                if (keys === undefined) {
                    keys = new Set<any>();
                } else if (keys.has(child._key)) {
                    throw new Error(`Failed to set children, invalid children list, key: "${child._key}" ` +
                        `is used multiple times.`);
                }
                keys.add(child._key);
            }
        }
    }
}
