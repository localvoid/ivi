import { Context } from "../common/types";
import { nextDebugId } from "../dev_mode/dev_mode";
import { checkDOMAttributesForTypos, checkDOMStylesForTypos, checkDeprecatedDOMSVGAttributes } from "../dev_mode/typos";
import { isVoidElement, isValidTag, isInputTypeHasCheckedProperty } from "../dev_mode/dom";
import { HTMLTagType, SVGTagType, MediaTagType, InputType } from "../common/dom";
import { IVNode } from "./ivnode";
import { VNodeFlags, ElementDescriptorFlags } from "./flags";
import { ComponentFunction, ComponentClass, Component } from "./component";
import { ElementDescriptor } from "./element_descriptor";
import { SelectData, ConnectDescriptor } from "./connect_descriptor";
import { EventHandlerList } from "../events/event_handler";
import {
    HTMLAnchorElementProps, HTMLElementProps, HTMLAppletElementProps, HTMLAreaElementProps, HTMLAudioElementProps,
    HTMLBaseElementProps, HTMLBaseFontElementProps, HTMLBodyElementProps, HTMLBRElementProps, HTMLButtonElementProps,
    HTMLCanvasElementProps, HTMLQuoteElementProps, HTMLTableCaptionElementProps, HTMLTableColElementProps,
    HTMLDataListElementProps, HTMLModElementProps, HTMLDirectoryElementProps, HTMLDivElementProps,
    HTMLDListElementProps, HTMLEmbedElementProps, HTMLFieldSetElementProps, HTMLFontElementProps, HTMLFormElementProps,
    HTMLFrameElementProps, HTMLFrameSetElementProps, HTMLHeadElementProps, HTMLHeadingElementProps, HTMLHRElementProps,
    HTMLHtmlElementProps, HTMLIFrameElementProps, HTMLImageElementProps, HTMLInputElementProps, HTMLLabelElementProps,
    HTMLLegendElementProps, HTMLLIElementProps, HTMLLinkElementProps, HTMLMapElementProps, HTMLMarqueeElementProps,
    HTMLMenuElementProps, HTMLMetaElementProps, HTMLMeterElementProps, HTMLObjectElementProps, HTMLOListElementProps,
    HTMLOptGroupElementProps, HTMLOptionElementProps, HTMLParagraphElementProps, HTMLParamElementProps,
    HTMLPictureElementProps, HTMLPreElementProps, HTMLProgressElementProps, HTMLScriptElementProps,
    HTMLSelectElementProps, HTMLSourceElementProps, HTMLSpanElementProps, HTMLStyleElementProps,
    HTMLTableDataCellElementProps, HTMLTableElementProps, HTMLTableHeaderCellElementProps, HTMLTableRowElementProps,
    HTMLTableSectionElementProps, HTMLTemplateElementProps, HTMLTextAreaElementProps, HTMLTitleElementProps,
    HTMLTrackElementProps, HTMLUListElementProps, HTMLUnknownElementProps, HTMLVideoElementProps, HTMLMediaElementProps,
    MSHTMLWebViewElementProps,

    SVGCircleElementProps, SVGClipPathElementProps, SVGDefsElementProps, SVGDescElementProps, SVGEllipseElementProps,
    SVGFEBlendElementProps, SVGFEColorMatrixElementProps, SVGFEComponentTransferElementProps,
    SVGFECompositeElementProps, SVGFEConvolveMatrixElementProps, SVGFEDiffuseLightingElementProps,
    SVGFEDisplacementMapElementProps, SVGFEDistantLightElementProps, SVGFEFloodElementProps, SVGFEFuncAElementProps,
    SVGFEFuncBElementProps, SVGFEFuncGElementProps, SVGFEFuncRElementProps, SVGFEGaussianBlurElementProps,
    SVGFEImageElementProps, SVGFEMergeElementProps, SVGFEMergeNodeElementProps, SVGFEMorphologyElementProps,
    SVGFEOffsetElementProps, SVGFEPointLightElementProps, SVGFESpecularLightingElementProps, SVGFESpotLightElementProps,
    SVGFETileElementProps, SVGFETurbulenceElementProps, SVGFilterElementProps, SVGForeignObjectElementProps,
    SVGGElementProps, SVGImageElementProps, SVGLinearGradientElementProps, SVGLineElementProps, SVGMarkerElementProps,
    SVGMaskElementProps, SVGMetadataElementProps, SVGPathElementProps, SVGPatternElementProps, SVGPolygonElementProps,
    SVGPolylineElementProps, SVGRadialGradientElementProps, SVGRectElementProps, SVGStopElementProps,
    SVGSVGElementProps, SVGSwitchElementProps, SVGSymbolElementProps, SVGTextElementProps, SVGTextPathElementProps,
    SVGTSpanElementProps, SVGViewElementProps, SVGUseElementProps, SVGElementProps,

    CSSStyleProps,
} from "../common/dom_props";

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
    _tag: string | ComponentClass<any> | ComponentFunction<any> | ElementDescriptor<any> |
    ConnectDescriptor<any, any, any> | null;
    _key: any;
    _props: P | null;
    _className: string | null;
    _style: CSSStyleProps | null;
    _events: EventHandlerList | null;
    _children: IVNode<any>[] | IVNode<any> | string | number | boolean | null | undefined;
    _instance: Node | Component<any> | SelectData | Context | null;
    _debugId: number;

    constructor(
        flags: number,
        tag: string | ComponentFunction<P> | ComponentClass<P> | ElementDescriptor<any> |
            ConnectDescriptor<any, any, any> | null,
        props: P | null,
        className: string | null,
        children: IVNode<any>[] | IVNode<any> | string | number | boolean | null | undefined,
    ) {
        this._flags = flags;
        this._tag = tag;
        this._key = 0;
        this._props = props;
        this._className = className;
        this._style = null;
        this._events = null;
        this._children = children;
        this._instance = null;
        if (__IVI_DEV__) {
            this._debugId = nextDebugId();
        }
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
    events(events: EventHandlerList | null): VNode<P> {
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
    children(children: VNodeArray | IVNode<any> | string | number | null): VNode<P> {
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

        if (typeof children === "object") {
            if (children !== null) {
                if (children.constructor === Array) {
                    this._flags |= VNodeFlags.ChildrenArray;
                    children = normalizeVNodes(children as VNodeArray);
                    checkUniqueKeys(children as IVNode<any>[]);
                } else if (isValidVNode(children)) {
                    this._flags |= VNodeFlags.ChildrenVNode;
                    if (!(children._flags & VNodeFlags.Key)) {
                        children._key = 0;
                    }
                } else {
                    this._flags |= VNodeFlags.ChildrenBasic;
                    children = "";
                }
            }
        } else {
            this._flags |= VNodeFlags.ChildrenBasic;
        }
        this._children = children as IVNode<any>[] | IVNode<any> | string | number | null;
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
     * Merge events with existing events.
     *
     * @param props
     * @return VNodeBuilder.
     */
    mergeEvents(events: EventHandlerList | null): VNode<P> {
        if (events) {
            return this.events(this._events ? Object.assign({}, this._events, events) : events);
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

/**
 * Denormalized VNode Array.
 */
export type VNodeArray = Array<Array<IVNode<any>> | IVNode<any> | string | number | null>;

/**
 * Create a VNodeBuilder representing a Text node.
 *
 * @param content Text content.
 * @returns VNodeBuilder object.
 */
export function $t(content: string | number | boolean | null): VNode<null> {
    return new VNode<null>(VNodeFlags.Text, null, null, null, content);
}

/* tslint:disable:max-line-length */
/**
 * Create a VNodeBuilder representing an Element node.
 *
 * @param tagName HTML Element tag name.
 * @param props HTML Element props.
 * @returns VNodeBuilder object.
 */
export function $h(tagName: "a", className?: string): VNode<HTMLAnchorElementProps | null>;
export function $h(tagName: "abbr", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "acronym", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "address", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "applet", className?: string): VNode<HTMLAppletElementProps | null>;
export function $h(tagName: "area", className?: string): VNode<HTMLAreaElementProps | null>;
export function $h(tagName: "article", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "aside", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "b", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "base", className?: string): VNode<HTMLBaseElementProps | null>;
export function $h(tagName: "basefont", className?: string): VNode<HTMLBaseFontElementProps | null>;
export function $h(tagName: "bdo", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "big", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "blockquote", className?: string): VNode<HTMLQuoteElementProps | null>;
export function $h(tagName: "body", className?: string): VNode<HTMLBodyElementProps | null>;
export function $h(tagName: "br", className?: string): VNode<HTMLBRElementProps | null>;
export function $h(tagName: "button", className?: string): VNode<HTMLButtonElementProps | null>;
export function $h(tagName: "canvas", className?: string): VNode<HTMLCanvasElementProps | null>;
export function $h(tagName: "caption", className?: string): VNode<HTMLTableCaptionElementProps | null>;
export function $h(tagName: "center", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "cite", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "code", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "col", className?: string): VNode<HTMLTableColElementProps | null>;
export function $h(tagName: "colgroup", className?: string): VNode<HTMLTableColElementProps | null>;
export function $h(tagName: "datalist", className?: string): VNode<HTMLDataListElementProps | null>;
export function $h(tagName: "dd", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "del", className?: string): VNode<HTMLModElementProps | null>;
export function $h(tagName: "dfn", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "dir", className?: string): VNode<HTMLDirectoryElementProps | null>;
export function $h(tagName: "div", className?: string): VNode<HTMLDivElementProps | null>;
export function $h(tagName: "dl", className?: string): VNode<HTMLDListElementProps | null>;
export function $h(tagName: "dt", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "em", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "embed", className?: string): VNode<HTMLEmbedElementProps | null>;
export function $h(tagName: "fieldset", className?: string): VNode<HTMLFieldSetElementProps | null>;
export function $h(tagName: "figcaption", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "figure", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "font", className?: string): VNode<HTMLFontElementProps | null>;
export function $h(tagName: "footer", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "form", className?: string): VNode<HTMLFormElementProps | null>;
export function $h(tagName: "frame", className?: string): VNode<HTMLFrameElementProps | null>;
export function $h(tagName: "frameset", className?: string): VNode<HTMLFrameSetElementProps | null>;
export function $h(tagName: "h1", className?: string): VNode<HTMLHeadingElementProps | null>;
export function $h(tagName: "h2", className?: string): VNode<HTMLHeadingElementProps | null>;
export function $h(tagName: "h3", className?: string): VNode<HTMLHeadingElementProps | null>;
export function $h(tagName: "h4", className?: string): VNode<HTMLHeadingElementProps | null>;
export function $h(tagName: "h5", className?: string): VNode<HTMLHeadingElementProps | null>;
export function $h(tagName: "h6", className?: string): VNode<HTMLHeadingElementProps | null>;
export function $h(tagName: "head", className?: string): VNode<HTMLHeadElementProps | null>;
export function $h(tagName: "header", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "hgroup", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "hr", className?: string): VNode<HTMLHRElementProps | null>;
export function $h(tagName: "html", className?: string): VNode<HTMLHtmlElementProps | null>;
export function $h(tagName: "i", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "iframe", className?: string): VNode<HTMLIFrameElementProps | null>;
export function $h(tagName: "img", className?: string): VNode<HTMLImageElementProps | null>;
export function $h(tagName: "ins", className?: string): VNode<HTMLModElementProps | null>;
export function $h(tagName: "isindex", className?: string): VNode<HTMLUnknownElementProps | null>;
export function $h(tagName: "kbd", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "keygen", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "label", className?: string): VNode<HTMLLabelElementProps | null>;
export function $h(tagName: "legend", className?: string): VNode<HTMLLegendElementProps | null>;
export function $h(tagName: "li", className?: string): VNode<HTMLLIElementProps | null>;
export function $h(tagName: "link", className?: string): VNode<HTMLLinkElementProps | null>;
export function $h(tagName: "listing", className?: string): VNode<HTMLPreElementProps | null>;
export function $h(tagName: "map", className?: string): VNode<HTMLMapElementProps | null>;
export function $h(tagName: "mark", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "marquee", className?: string): VNode<HTMLMarqueeElementProps | null>;
export function $h(tagName: "menu", className?: string): VNode<HTMLMenuElementProps | null>;
export function $h(tagName: "meta", className?: string): VNode<HTMLMetaElementProps | null>;
export function $h(tagName: "meter", className?: string): VNode<HTMLMeterElementProps | null>;
export function $h(tagName: "nav", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "nextid", className?: string): VNode<HTMLUnknownElementProps | null>;
export function $h(tagName: "nobr", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "noframes", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "noscript", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "object", className?: string): VNode<HTMLObjectElementProps | null>;
export function $h(tagName: "ol", className?: string): VNode<HTMLOListElementProps | null>;
export function $h(tagName: "optgroup", className?: string): VNode<HTMLOptGroupElementProps | null>;
export function $h(tagName: "option", className?: string): VNode<HTMLOptionElementProps | null>;
export function $h(tagName: "p", className?: string): VNode<HTMLParagraphElementProps | null>;
export function $h(tagName: "param", className?: string): VNode<HTMLParamElementProps | null>;
export function $h(tagName: "picture", className?: string): VNode<HTMLPictureElementProps | null>;
export function $h(tagName: "plaintext", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "pre", className?: string): VNode<HTMLPreElementProps | null>;
export function $h(tagName: "progress", className?: string): VNode<HTMLProgressElementProps | null>;
export function $h(tagName: "q", className?: string): VNode<HTMLQuoteElementProps | null>;
export function $h(tagName: "rt", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "ruby", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "s", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "samp", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "script", className?: string): VNode<HTMLScriptElementProps | null>;
export function $h(tagName: "section", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "select", className?: string): VNode<HTMLSelectElementProps | null>;
export function $h(tagName: "small", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "source", className?: string): VNode<HTMLSourceElementProps | null>;
export function $h(tagName: "span", className?: string): VNode<HTMLSpanElementProps | null>;
export function $h(tagName: "strike", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "strong", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "style", className?: string): VNode<HTMLStyleElementProps | null>;
export function $h(tagName: "sub", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "sup", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "table", className?: string): VNode<HTMLTableElementProps | null>;
export function $h(tagName: "tbody", className?: string): VNode<HTMLTableSectionElementProps | null>;
export function $h(tagName: "td", className?: string): VNode<HTMLTableDataCellElementProps | null>;
export function $h(tagName: "template", className?: string): VNode<HTMLTemplateElementProps | null>;
export function $h(tagName: "textarea", className?: string): VNode<HTMLTextAreaElementProps | null>;
export function $h(tagName: "tfoot", className?: string): VNode<HTMLTableSectionElementProps | null>;
export function $h(tagName: "th", className?: string): VNode<HTMLTableHeaderCellElementProps | null>;
export function $h(tagName: "thead", className?: string): VNode<HTMLTableSectionElementProps | null>;
export function $h(tagName: "title", className?: string): VNode<HTMLTitleElementProps | null>;
export function $h(tagName: "tr", className?: string): VNode<HTMLTableRowElementProps | null>;
export function $h(tagName: "track", className?: string): VNode<HTMLTrackElementProps | null>;
export function $h(tagName: "tt", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "u", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "ul", className?: string): VNode<HTMLUListElementProps | null>;
export function $h(tagName: "var", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "wbr", className?: string): VNode<HTMLElementProps | null>;
export function $h(tagName: "x-ms-webview", className?: string): VNode<MSHTMLWebViewElementProps | null>;
export function $h(tagName: "xmp", className?: string): VNode<HTMLPreElementProps | null>;
export function $h(tagName: HTMLTagType, className?: string): VNode<HTMLElementProps | null> {
    return new VNode<HTMLElementProps | null>(
        VNodeFlags.Element,
        tagName,
        null,
        className === undefined ? null : className,
        null);
}

/**
 * Create a VNodeBuilder representing a SVGElement node.
 *
 * @param tagName SVG Element tag name.
 * @param className Class name.
 * @returns VNodeBuilder object.
 */
export function $s(tagName: "circle", className?: string): VNode<SVGCircleElementProps | null>;
export function $s(tagName: "clippath", className?: string): VNode<SVGClipPathElementProps | null>;
export function $s(tagName: "defs", className?: string): VNode<SVGDefsElementProps | null>;
export function $s(tagName: "desc", className?: string): VNode<SVGDescElementProps | null>;
export function $s(tagName: "ellipse", className?: string): VNode<SVGEllipseElementProps | null>;
export function $s(tagName: "feblend", className?: string): VNode<SVGFEBlendElementProps | null>;
export function $s(tagName: "fecolormatrix", className?: string): VNode<SVGFEColorMatrixElementProps | null>;
export function $s(tagName: "fecomponenttransfer", className?: string): VNode<SVGFEComponentTransferElementProps | null>;
export function $s(tagName: "fecomposite", className?: string): VNode<SVGFECompositeElementProps | null>;
export function $s(tagName: "feconvolvematrix", className?: string): VNode<SVGFEConvolveMatrixElementProps | null>;
export function $s(tagName: "fediffuselighting", className?: string): VNode<SVGFEDiffuseLightingElementProps | null>;
export function $s(tagName: "fedisplacementmap", className?: string): VNode<SVGFEDisplacementMapElementProps | null>;
export function $s(tagName: "fedistantlight", className?: string): VNode<SVGFEDistantLightElementProps | null>;
export function $s(tagName: "feflood", className?: string): VNode<SVGFEFloodElementProps | null>;
export function $s(tagName: "fefunca", className?: string): VNode<SVGFEFuncAElementProps | null>;
export function $s(tagName: "fefuncb", className?: string): VNode<SVGFEFuncBElementProps | null>;
export function $s(tagName: "fefuncg", className?: string): VNode<SVGFEFuncGElementProps | null>;
export function $s(tagName: "fefuncr", className?: string): VNode<SVGFEFuncRElementProps | null>;
export function $s(tagName: "fegaussianblur", className?: string): VNode<SVGFEGaussianBlurElementProps | null>;
export function $s(tagName: "feimage", className?: string): VNode<SVGFEImageElementProps | null>;
export function $s(tagName: "femerge", className?: string): VNode<SVGFEMergeElementProps | null>;
export function $s(tagName: "femergenode", className?: string): VNode<SVGFEMergeNodeElementProps | null>;
export function $s(tagName: "femorphology", className?: string): VNode<SVGFEMorphologyElementProps | null>;
export function $s(tagName: "feoffset", className?: string): VNode<SVGFEOffsetElementProps | null>;
export function $s(tagName: "fepointlight", className?: string): VNode<SVGFEPointLightElementProps | null>;
export function $s(tagName: "fespecularlighting", className?: string): VNode<SVGFESpecularLightingElementProps | null>;
export function $s(tagName: "fespotlight", className?: string): VNode<SVGFESpotLightElementProps | null>;
export function $s(tagName: "fetile", className?: string): VNode<SVGFETileElementProps | null>;
export function $s(tagName: "feturbulence", className?: string): VNode<SVGFETurbulenceElementProps | null>;
export function $s(tagName: "filter", className?: string): VNode<SVGFilterElementProps | null>;
export function $s(tagName: "foreignobject", className?: string): VNode<SVGForeignObjectElementProps | null>;
export function $s(tagName: "g", className?: string): VNode<SVGGElementProps | null>;
export function $s(tagName: "image", className?: string): VNode<SVGImageElementProps | null>;
export function $s(tagName: "line", className?: string): VNode<SVGLineElementProps | null>;
export function $s(tagName: "lineargradient", className?: string): VNode<SVGLinearGradientElementProps | null>;
export function $s(tagName: "marker", className?: string): VNode<SVGMarkerElementProps | null>;
export function $s(tagName: "mask", className?: string): VNode<SVGMaskElementProps | null>;
export function $s(tagName: "metadata", className?: string): VNode<SVGMetadataElementProps | null>;
export function $s(tagName: "path", className?: string): VNode<SVGPathElementProps | null>;
export function $s(tagName: "pattern", className?: string): VNode<SVGPatternElementProps | null>;
export function $s(tagName: "polygon", className?: string): VNode<SVGPolygonElementProps | null>;
export function $s(tagName: "polyline", className?: string): VNode<SVGPolylineElementProps | null>;
export function $s(tagName: "radialgradient", className?: string): VNode<SVGRadialGradientElementProps | null>;
export function $s(tagName: "rect", className?: string): VNode<SVGRectElementProps | null>;
export function $s(tagName: "stop", className?: string): VNode<SVGStopElementProps | null>;
export function $s(tagName: "svg", className?: string): VNode<SVGSVGElementProps | null>;
export function $s(tagName: "switch", className?: string): VNode<SVGSwitchElementProps | null>;
export function $s(tagName: "symbol", className?: string): VNode<SVGSymbolElementProps | null>;
export function $s(tagName: "text", className?: string): VNode<SVGTextElementProps | null>;
export function $s(tagName: "textpath", className?: string): VNode<SVGTextPathElementProps | null>;
export function $s(tagName: "tspan", className?: string): VNode<SVGTSpanElementProps | null>;
export function $s(tagName: "use", className?: string): VNode<SVGUseElementProps | null>;
export function $s(tagName: "view", className?: string): VNode<SVGViewElementProps | null>;
export function $s(tagName: SVGTagType, className?: string): VNode<SVGElementProps | null> {
    return new VNode<SVGElementProps | null>(
        VNodeFlags.Element | VNodeFlags.SvgElement,
        tagName,
        null,
        className === undefined ? null : className,
        null);
}

/**
 * Create a VNodeBuilder representing an HTMLInputElement node.
 *
 * @param type Input Element type. When type param has value "textarea", HTMLTextAreaElement will be created.
 * @param className Class name.
 * @returns VNodeBuilder object.
 */
export function $i(type: "textarea", className?: string): VNode<HTMLTextAreaElementProps | null>;
export function $i(type: "button", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "checkbox", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "color", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "date", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "datetime", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "datetime-local", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "email", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "file", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "hidden", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "image", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "month", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "number", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "password", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "radio", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "range", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "reset", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "search", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "submit", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "tel", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "text", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "time", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "url", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: "week", className?: string): VNode<HTMLInputElementProps | null>;
export function $i(type: InputType, className?: string): VNode<HTMLInputElementProps | null> {
    return new VNode<HTMLInputElementProps | null>(
        type === "textarea" ?
            VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.TextAreaElement :
            VNodeFlags.Element | VNodeFlags.InputElement,
        type,
        null,
        className === undefined ? null : className,
        null);
}

/**
 * Create a VNodeBuilder representing an HTMLMediaElement node.
 *
 * @param tagName Media element tag name.
 * @param className Class name.
 * @returns VNodeBuilder object.
 */
export function $m(tagName: "audio", className?: string): VNode<HTMLAudioElementProps | null>;
export function $m(tagName: "video", className?: string): VNode<HTMLVideoElementProps | null>;
export function $m(tagName: MediaTagType, className?: string): VNode<HTMLMediaElementProps | null> {
    return new VNode<HTMLMediaElementProps | null>(
        VNodeFlags.Element | VNodeFlags.MediaElement,
        tagName,
        null,
        className === undefined ? null : className,
        null);
}
/* tslint:enable:max-line-length */

/**
 * Create a VNodeBuilder representing a Component node.
 *
 * @param c Component factory.
 * @param props Component props.
 * @returns VNodeBuilder object.
 */
export function $c(c: ComponentFunction<void> | ComponentClass<void>): VNode<void>;
export function $c(c: ComponentFunction<null> | ComponentClass<null>): VNode<null>;
export function $c<P, U extends P>(c: ComponentFunction<P> | ComponentClass<P>, props: U): VNode<P>;
export function $c<P>(c: ComponentFunction<P> | ComponentClass<P>, props?: P): VNode<P> {
    return new VNode<P>(
        (c.prototype.render) ? VNodeFlags.ComponentClass : VNodeFlags.ComponentFunction,
        c,
        props!,
        null,
        null);
}

/**
 * Create a VNodeBuilder representing an ElementDescriptor.
 *
 * @param d Element Descriptor.
 * @param className Class name.
 * @returns VNodeBuilder object.
 */
export function $e<P>(d: ElementDescriptor<P>, className?: string): VNode<P> {
    if (__IVI_DEV__) {
        if (className !== undefined) {
            if (d._flags & ElementDescriptorFlags.ProtectClassName) {
                throw new Error("Failed to set className, className is protected by an ElementDescriptor.");
            }
        }
    }
    return new VNode<P>(
        d._flags & ElementDescriptorFlags.CopyFlags,
        d,
        null,
        className === undefined ? null : className,
        null);
}

/**
 * Create a VNodeBuilder representing a Custom Element (WebComponent).
 *
 * @param d Element Descriptor.
 * @param className Class name.
 * @returns VNodeBuilder object.
 */
export function $w(tagName: string, className?: string): VNode<{ [key: string]: any } | null> {
    if (__IVI_DEV__) {
        if (!isValidTag(tagName)) {
            throw new Error(`Invalid tag: ${tagName}`);
        }
    }
    return new VNode<HTMLElementProps | null>(
        VNodeFlags.Element | VNodeFlags.WebComponent,
        tagName,
        null,
        className === undefined ? null : className,
        null);
}

export function $connect<T, U, K>(
    connectDescriptor: ConnectDescriptor<T, U, K>,
    props: T,
): VNode<T> {
    return new VNode<T>(
        VNodeFlags.ComponentFunction | VNodeFlags.Connect,
        connectDescriptor,
        props,
        null,
        null,
    );
}

/**
 * Placeholder function for Update Context components.
 *
 * It is used only in Dev Mode for stack traces.
 */
function UpdateContext() {
    /* tslint:disable:no-empty */
    /* tslint:enable:no-empty */
}

/**
 * Create an update context VNode.
 *
 * @param context Context.
 * @param child Child VNode.
 * @returns VNodeBuilder object.
 */
export function $ctx<T = {}>(context: Context<T>, child: IVNode<any>): VNode<Context<T>> {
    return new VNode<Context<T>>(
        VNodeFlags.ComponentFunction | VNodeFlags.UpdateContext,
        __IVI_DEV__ ? UpdateContext as () => IVNode<any> : null,
        context,
        null,
        child);
}

/**
 * Deep clone of VNode children with instance refs erasure.
 *
 * @param flags Parent VNode flags.
 * @param children Children.
 * @returns Cloned children.
 */
export function cloneVNodeChildren(
    flags: VNodeFlags,
    children: IVNode<any>[] | IVNode<any> | string | number | boolean | null | undefined,
): IVNode<any>[] | IVNode<any> | string | number | boolean | null | undefined {
    if (children !== null) {
        if (flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) {
            if (flags & VNodeFlags.ChildrenArray) {
                children = children as IVNode<any>[];
                const newChildren = new Array<IVNode<any>>(children.length);
                for (let i = 0; i < 0; i++) {
                    newChildren[i] = _cloneVNode(children[i], true);
                }
                return newChildren;
            } else {
                return _cloneVNode(children as IVNode<any>, true);
            }
        }
    }

    return children;
}

function _cloneVNode(node: IVNode<any>, cloneKey: boolean): VNode<any> {
    if (node.constructor !== VNode) {
        return $t("").key(node._key);
    }

    const flags = node._flags;

    const newNode = new VNode(
        flags,
        node._tag,
        node._props,
        node._className,
        (flags & VNodeFlags.Component) ?
            null :
            cloneVNodeChildren(flags, node._children));
    if (cloneKey) {
        newNode._key = node._key;
    }
    newNode._events = node._events;
    newNode._style = node._style;

    return newNode;
}

/**
 * Deep clone of VNode with instance refs erasure.
 *
 * @param node VNode to clone.
 * @returns Cloned VNode.
 */
export function cloneVNode(node: IVNode<any>): VNode<any> {
    return _cloneVNode(node, (node._flags & VNodeFlags.Key) ? true : false);
}

/**
 * Shallow clone of VNode with instance refs erasure.
 *
 * @param node VNode to clone.
 * @returns Cloned VNode.
 */
export function shallowCloneVNode(node: IVNode<any>): VNode<any> {
    if (node.constructor !== VNode) {
        return $t("").key(node._key);
    }

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
        null);
    if (node._flags & VNodeFlags.Key) {
        newNode._key = node._key;
    }
    newNode._events = node._events;
    newNode._style = node._style;

    return newNode;
}

function isVNodeKeyedChildrenArray(v: any): v is IVNode<any>[] {
    return v.constructor === Array;
}

function isValidVNode(v: any): v is IVNode<any> {
    return v.constructor === VNode;
}

/**
 * Normalizes VNode array by flattening all nodes, removing null values and converting number and string objects to text
 * nodes.
 *
 * @param nodes
 * @returns Normalized VNode array.
 */
export function normalizeVNodes(nodes: VNodeArray): IVNode<any>[] {
    for (let i = 0; i < nodes.length; i++) {
        let n = nodes[i];

        if (typeof n === "object") {
            if (n === null || isVNodeKeyedChildrenArray(n)) {
                return _normalizeVNodes(nodes, i);
            } else {
                if (!isValidVNode(n)) {
                    n = $t("");
                    nodes[i] = n;
                }
                if (!(n._flags & VNodeFlags.Key)) {
                    n._key = i;
                }
            }
        } else { // basic object
            if (typeof n === "string" || typeof n === "number") {
                const node = $t(n);
                node._key = i;
                nodes[i] = node;
            } else {
                return _normalizeVNodes(nodes, i);
            }
        }
    }

    return nodes as IVNode<any>[];
}

function _normalizeVNodes(nodes: VNodeArray, i: number): IVNode<any>[] {
    const result = nodes.slice(0, i) as IVNode<any>[];

    for (; i < nodes.length; i++) {
        let n = nodes[i];
        if (typeof n === "object") {
            if (n !== null) {
                if (isVNodeKeyedChildrenArray(n)) {
                    for (let j = 0; j < n.length; j++) {
                        const nj = n[j];

                        if (__IVI_DEV__) {
                            if (!(nj._flags & VNodeFlags.Key)) {
                                throw new Error("Invalid children array. All children nodes in nested array should " +
                                    "have explicit keys.");
                            }
                        }

                        // No need to protect against xss here, nested arrays can't have denormalized values.
                        result.push(nj);
                    }
                } else {
                    if (!isValidVNode(n)) {
                        n = $t("");
                    }
                    if (!(n._flags & VNodeFlags.Key)) {
                        n._key = i;
                    }
                    result.push(n);
                }
            }
        } else { // basic object
            const node = $t(n);
            node._key = i;
            result.push(node);
        }
    }

    return result;
}

function checkUniqueKeys(children: IVNode<any>[]): void {
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
