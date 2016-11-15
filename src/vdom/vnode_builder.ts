import { VNode } from "./vnode";
import { VNodeFlags } from "./flags";
import { ComponentFunction, ComponentClass, Component } from "./component";
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
} from "./dom_props";

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
export class VNodeBuilder<P> implements VNode<P> {
    _flags: VNodeFlags;
    _tag: string | ComponentClass<any> | ComponentFunction<any> | null;
    _key: any;
    _props: P | null;
    _className: string | null;
    _style: CSSStyleProps | string | null;
    _events: EventHandlerList | null;
    _children: VNode<any>[] | VNode<any> | string | number | boolean | Component<any> | null | undefined;
    _dom: Node | null;
    _ref: ((ref: Node | Component<any> | null) => void) | null;

    constructor(
        flags: number,
        tag: string | ComponentFunction<P> | ComponentClass<P> | null,
        props: P | null,
        className: string | null,
        children: VNode<any>[] | VNode<any> | string | number | boolean | Component<any> | null | undefined,
    ) {
        this._flags = flags;
        this._tag = tag;
        this._key = null;
        this._props = props;
        this._className = className;
        this._style = null;
        this._events = null;
        this._children = children;
        this._dom = null;
        this._ref = null;
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
    key(key: any): VNodeBuilder<P> {
        this._key = key;
        return this;
    }

    /**
     * Set className.
     *
     * @param className.
     * @returns VNodeBuilder.
     */
    className(className: string | null): VNodeBuilder<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set className on VNode: className method should be called on element " +
                    "nodes only.");
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
    style(style: CSSStyleProps | string | null): VNodeBuilder<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set style on VNode: style method should be called on element nodes only.");
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
    events(events: EventHandlerList | null): VNodeBuilder<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set events on VNode: event method should be called on element nodes only.");
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
    props(props: P): VNodeBuilder<P> {
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
    children(children: VNodeRecursiveArray | VNode<any> | string | number | boolean | null): VNodeBuilder<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set children on VNode: children method should be called on element nodes " +
                    "only.");
            }
            if (this._flags & VNodeFlags.InputElement) {
                throw new Error("Failed to set children on VNode: input elements can't have children.");
            }
            if (this._flags & VNodeFlags.MediaElement) {
                throw new Error("Failed to set children on VNode: media elements can't have children.");
            }
        }
        if (Array.isArray(children)) {
            this._flags |= VNodeFlags.ChildrenArray;
            this._children = normalizeVNodes(children);
        } else {
            if (typeof children === "object") {
                this._flags |= VNodeFlags.ChildrenVNode;
            } else {
                this._flags |= VNodeFlags.ChildrenBasic;
            }
            this._children = children;
        }
        return this;
    }

    /**
     * Set children that will be tracked by `key` property.
     *
     * To support use cases with static nodes at the beginning and at the end of the children list, children list may
     * contain nodes with `null` keys at the beginning of the list and at the end, children with `null` keys shouldn't
     * move.
     *
     * NOTE: If you've found any other use case that can't be easily solved with the current `trackByKeyChildren`
     * implementation, feel free to submit an issue, but most of the time it is better to help browsers with layout
     * calculation, and it will be better to wrap nodes that aren't moved into its own container nodes and specify css
     * containment property. Use cases with "semantic" markup probably will be ignored.
     *
     * @param children Recursive lists of vnodes that can contain null values. It will automatically normalize recursive
     *   lists by flattening and filtering out null values.
     * @returns VNodeBuilder.
     */
    trackByKeyChildren(children: VNodeRecursiveArray | null): VNodeBuilder<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set children on VNode: children method should be called on element nodes " +
                    "only.");
            }
            if (this._flags & VNodeFlags.InputElement) {
                throw new Error("Failed to set children on VNode: input elements can't have children.");
            }
            if (this._flags & VNodeFlags.MediaElement) {
                throw new Error("Failed to set children on VNode: media elements can't have children.");
            }

        }
        this._flags |= VNodeFlags.TrackByKeyChildren | VNodeFlags.ChildrenArray;
        if (children) {
            this._children = normalizeVNodes(children);
        }

        if (__IVI_DEV__) {
            const childrenArray = this._children as VNode<any>[];
            let child: VNode<any>;
            let start = 0;
            let end = childrenArray.length - 1;
            while (start <= end) {
                child = childrenArray[start];
                if (child._key !== null) {
                    break;
                }
                start++;
            }
            while (start <= end) {
                child = childrenArray[end];
                if (child._key !== null) {
                    break;
                }
                end--;
            }

            if (start <= end) {
                const usedKeys = new Set<any>();
                while (start <= end) {
                    child = childrenArray[start];
                    const key = child._key;
                    if (key === null) {
                        throw new Error(`Failed to set children on VNode: invalid keyed children list, keyed ` +
                            `children should have a shape like [non-keyed, keyed, non-keyed].`);
                    }
                    if (usedKeys.has(key)) {
                        throw new Error(`Failed to set children on VNode: invalid children list, key: "${key}" is ` +
                            `used multiple times.`);
                    }
                    usedKeys.add(key);
                    start++;
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
    unsafeHTML(html: string): VNodeBuilder<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.Element)) {
                throw new Error("Failed to set unsafeHTML on VNode: unsafeHTML method should be called on element " +
                    "nodes only.");
            }
            if (this._flags & VNodeFlags.InputElement) {
                throw new Error("Failed to set unsafeHTML on VNode: input elements can't have innerHTML.");
            }
            if (this._flags & VNodeFlags.MediaElement) {
                throw new Error("Failed to set children on VNode: media elements can't have children.");
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
    value(value: string | null): VNodeBuilder<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.InputElement)) {
                throw new Error("Failed to set value on VNode: value method is working only with input elements.");
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
    checked(checked: boolean | null): VNodeBuilder<P> {
        if (__IVI_DEV__) {
            if (!(this._flags & VNodeFlags.InputElement)) {
                throw new Error("Failed to set checked on VNode: checked method is working only with input elements.");
            }
            if (!isInputTypeSupportsCheckedValue(this._tag as InputType)) {
                throw new Error(`Failed to set checked on VNode: input elements with type ${this._tag} doesn't have `
                    + `checked value.`);
            }
        }
        this._children = checked;
        return this;
    }

    /**
     * Set ref callback.
     *
     * When VNode is mounted ref callback will be invoked with a Node value for DOM Elements or Component instance for
     * components.
     *
     * When VNode is unmounted ref callback will be invoked with a `null` value.
     *
     * @param ref callback.
     * @returns VNodeBuilder.
     */
    ref(ref: (ref: Node | null) => void): VNodeBuilder<P>;
    ref(ref: (ref: Component<any> | null) => void): VNodeBuilder<P>;
    ref(ref: ((ref: Node | null) => void) | ((ref: Component<any> | null) => void)): VNodeBuilder<P> {
        this._ref = ref;
        return this;
    }
}

export type VNodeRecursiveListValue = VNodeRecursiveArray | VNode<any> | string | number | boolean | null;
/**
 * Recursive VNode List.
 */
export interface VNodeRecursiveArray extends Array<VNodeRecursiveListValue> { }

/**
 * Create a VNodeBuilder representing a Text node.
 *
 * @param context Text content.
 * @returns VNodeBuilder object.
 */
export function $t(content: string | number | boolean | null): VNodeBuilder<null> {
    return new VNodeBuilder<null>(VNodeFlags.Text, null, null, null, content);
}

/* tslint:disable:max-line-length */
/**
 * Create a VNodeBuilder representing an Element node.
 *
 * @param tagName HTML Element tag name.
 * @param props HTML Element props.
 * @returns VNodeBuilder object.
 */
export function $h(tagName: "a", className?: string): VNodeBuilder<HTMLAnchorElementProps | null>;
export function $h(tagName: "abbr", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "acronym", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "address", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "applet", className?: string): VNodeBuilder<HTMLAppletElementProps | null>;
export function $h(tagName: "area", className?: string): VNodeBuilder<HTMLAreaElementProps | null>;
export function $h(tagName: "article", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "aside", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "b", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "base", className?: string): VNodeBuilder<HTMLBaseElementProps | null>;
export function $h(tagName: "basefont", className?: string): VNodeBuilder<HTMLBaseFontElementProps | null>;
export function $h(tagName: "bdo", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "big", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "blockquote", className?: string): VNodeBuilder<HTMLQuoteElementProps | null>;
export function $h(tagName: "body", className?: string): VNodeBuilder<HTMLBodyElementProps | null>;
export function $h(tagName: "br", className?: string): VNodeBuilder<HTMLBRElementProps | null>;
export function $h(tagName: "button", className?: string): VNodeBuilder<HTMLButtonElementProps | null>;
export function $h(tagName: "canvas", className?: string): VNodeBuilder<HTMLCanvasElementProps | null>;
export function $h(tagName: "caption", className?: string): VNodeBuilder<HTMLTableCaptionElementProps | null>;
export function $h(tagName: "center", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "cite", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "code", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "col", className?: string): VNodeBuilder<HTMLTableColElementProps | null>;
export function $h(tagName: "colgroup", className?: string): VNodeBuilder<HTMLTableColElementProps | null>;
export function $h(tagName: "datalist", className?: string): VNodeBuilder<HTMLDataListElementProps | null>;
export function $h(tagName: "dd", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "del", className?: string): VNodeBuilder<HTMLModElementProps | null>;
export function $h(tagName: "dfn", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "dir", className?: string): VNodeBuilder<HTMLDirectoryElementProps | null>;
export function $h(tagName: "div", className?: string): VNodeBuilder<HTMLDivElementProps | null>;
export function $h(tagName: "dl", className?: string): VNodeBuilder<HTMLDListElementProps | null>;
export function $h(tagName: "dt", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "em", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "embed", className?: string): VNodeBuilder<HTMLEmbedElementProps | null>;
export function $h(tagName: "fieldset", className?: string): VNodeBuilder<HTMLFieldSetElementProps | null>;
export function $h(tagName: "figcaption", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "figure", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "font", className?: string): VNodeBuilder<HTMLFontElementProps | null>;
export function $h(tagName: "footer", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "form", className?: string): VNodeBuilder<HTMLFormElementProps | null>;
export function $h(tagName: "frame", className?: string): VNodeBuilder<HTMLFrameElementProps | null>;
export function $h(tagName: "frameset", className?: string): VNodeBuilder<HTMLFrameSetElementProps | null>;
export function $h(tagName: "h1", className?: string): VNodeBuilder<HTMLHeadingElementProps | null>;
export function $h(tagName: "h2", className?: string): VNodeBuilder<HTMLHeadingElementProps | null>;
export function $h(tagName: "h3", className?: string): VNodeBuilder<HTMLHeadingElementProps | null>;
export function $h(tagName: "h4", className?: string): VNodeBuilder<HTMLHeadingElementProps | null>;
export function $h(tagName: "h5", className?: string): VNodeBuilder<HTMLHeadingElementProps | null>;
export function $h(tagName: "h6", className?: string): VNodeBuilder<HTMLHeadingElementProps | null>;
export function $h(tagName: "head", className?: string): VNodeBuilder<HTMLHeadElementProps | null>;
export function $h(tagName: "header", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "hgroup", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "hr", className?: string): VNodeBuilder<HTMLHRElementProps | null>;
export function $h(tagName: "html", className?: string): VNodeBuilder<HTMLHtmlElementProps | null>;
export function $h(tagName: "i", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "iframe", className?: string): VNodeBuilder<HTMLIFrameElementProps | null>;
export function $h(tagName: "img", className?: string): VNodeBuilder<HTMLImageElementProps | null>;
export function $h(tagName: "ins", className?: string): VNodeBuilder<HTMLModElementProps | null>;
export function $h(tagName: "isindex", className?: string): VNodeBuilder<HTMLUnknownElementProps | null>;
export function $h(tagName: "kbd", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "keygen", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "label", className?: string): VNodeBuilder<HTMLLabelElementProps | null>;
export function $h(tagName: "legend", className?: string): VNodeBuilder<HTMLLegendElementProps | null>;
export function $h(tagName: "li", className?: string): VNodeBuilder<HTMLLIElementProps | null>;
export function $h(tagName: "link", className?: string): VNodeBuilder<HTMLLinkElementProps | null>;
export function $h(tagName: "listing", className?: string): VNodeBuilder<HTMLPreElementProps | null>;
export function $h(tagName: "map", className?: string): VNodeBuilder<HTMLMapElementProps | null>;
export function $h(tagName: "mark", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "marquee", className?: string): VNodeBuilder<HTMLMarqueeElementProps | null>;
export function $h(tagName: "menu", className?: string): VNodeBuilder<HTMLMenuElementProps | null>;
export function $h(tagName: "meta", className?: string): VNodeBuilder<HTMLMetaElementProps | null>;
export function $h(tagName: "meter", className?: string): VNodeBuilder<HTMLMeterElementProps | null>;
export function $h(tagName: "nav", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "nextid", className?: string): VNodeBuilder<HTMLUnknownElementProps | null>;
export function $h(tagName: "nobr", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "noframes", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "noscript", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "object", className?: string): VNodeBuilder<HTMLObjectElementProps | null>;
export function $h(tagName: "ol", className?: string): VNodeBuilder<HTMLOListElementProps | null>;
export function $h(tagName: "optgroup", className?: string): VNodeBuilder<HTMLOptGroupElementProps | null>;
export function $h(tagName: "option", className?: string): VNodeBuilder<HTMLOptionElementProps | null>;
export function $h(tagName: "p", className?: string): VNodeBuilder<HTMLParagraphElementProps | null>;
export function $h(tagName: "param", className?: string): VNodeBuilder<HTMLParamElementProps | null>;
export function $h(tagName: "picture", className?: string): VNodeBuilder<HTMLPictureElementProps | null>;
export function $h(tagName: "plaintext", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "pre", className?: string): VNodeBuilder<HTMLPreElementProps | null>;
export function $h(tagName: "progress", className?: string): VNodeBuilder<HTMLProgressElementProps | null>;
export function $h(tagName: "q", className?: string): VNodeBuilder<HTMLQuoteElementProps | null>;
export function $h(tagName: "rt", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "ruby", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "s", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "samp", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "script", className?: string): VNodeBuilder<HTMLScriptElementProps | null>;
export function $h(tagName: "section", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "select", className?: string): VNodeBuilder<HTMLSelectElementProps | null>;
export function $h(tagName: "small", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "source", className?: string): VNodeBuilder<HTMLSourceElementProps | null>;
export function $h(tagName: "span", className?: string): VNodeBuilder<HTMLSpanElementProps | null>;
export function $h(tagName: "strike", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "strong", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "style", className?: string): VNodeBuilder<HTMLStyleElementProps | null>;
export function $h(tagName: "sub", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "sup", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "table", className?: string): VNodeBuilder<HTMLTableElementProps | null>;
export function $h(tagName: "tbody", className?: string): VNodeBuilder<HTMLTableSectionElementProps | null>;
export function $h(tagName: "td", className?: string): VNodeBuilder<HTMLTableDataCellElementProps | null>;
export function $h(tagName: "template", className?: string): VNodeBuilder<HTMLTemplateElementProps | null>;
export function $h(tagName: "textarea", className?: string): VNodeBuilder<HTMLTextAreaElementProps | null>;
export function $h(tagName: "tfoot", className?: string): VNodeBuilder<HTMLTableSectionElementProps | null>;
export function $h(tagName: "th", className?: string): VNodeBuilder<HTMLTableHeaderCellElementProps | null>;
export function $h(tagName: "thead", className?: string): VNodeBuilder<HTMLTableSectionElementProps | null>;
export function $h(tagName: "title", className?: string): VNodeBuilder<HTMLTitleElementProps | null>;
export function $h(tagName: "tr", className?: string): VNodeBuilder<HTMLTableRowElementProps | null>;
export function $h(tagName: "track", className?: string): VNodeBuilder<HTMLTrackElementProps | null>;
export function $h(tagName: "tt", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "u", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "ul", className?: string): VNodeBuilder<HTMLUListElementProps | null>;
export function $h(tagName: "var", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "wbr", className?: string): VNodeBuilder<HTMLElementProps | null>;
export function $h(tagName: "x-ms-webview", className?: string): VNodeBuilder<MSHTMLWebViewElementProps | null>;
export function $h(tagName: "xmp", className?: string): VNodeBuilder<HTMLPreElementProps | null>;
export function $h(tagName: string, className?: string): VNodeBuilder<HTMLElementProps | null> {
    return new VNodeBuilder<HTMLElementProps | null>(
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
 * @param props SVG Element props.
 * @returns VNodeBuilder object.
 */
export function $s(tagName: "circle", className?: string): VNodeBuilder<SVGCircleElementProps | null>;
export function $s(tagName: "clippath", className?: string): VNodeBuilder<SVGClipPathElementProps | null>;
export function $s(tagName: "defs", className?: string): VNodeBuilder<SVGDefsElementProps | null>;
export function $s(tagName: "desc", className?: string): VNodeBuilder<SVGDescElementProps | null>;
export function $s(tagName: "ellipse", className?: string): VNodeBuilder<SVGEllipseElementProps | null>;
export function $s(tagName: "feblend", className?: string): VNodeBuilder<SVGFEBlendElementProps | null>;
export function $s(tagName: "fecolormatrix", className?: string): VNodeBuilder<SVGFEColorMatrixElementProps | null>;
export function $s(tagName: "fecomponenttransfer", className?: string): VNodeBuilder<SVGFEComponentTransferElementProps | null>;
export function $s(tagName: "fecomposite", className?: string): VNodeBuilder<SVGFECompositeElementProps | null>;
export function $s(tagName: "feconvolvematrix", className?: string): VNodeBuilder<SVGFEConvolveMatrixElementProps | null>;
export function $s(tagName: "fediffuselighting", className?: string): VNodeBuilder<SVGFEDiffuseLightingElementProps | null>;
export function $s(tagName: "fedisplacementmap", className?: string): VNodeBuilder<SVGFEDisplacementMapElementProps | null>;
export function $s(tagName: "fedistantlight", className?: string): VNodeBuilder<SVGFEDistantLightElementProps | null>;
export function $s(tagName: "feflood", className?: string): VNodeBuilder<SVGFEFloodElementProps | null>;
export function $s(tagName: "fefunca", className?: string): VNodeBuilder<SVGFEFuncAElementProps | null>;
export function $s(tagName: "fefuncb", className?: string): VNodeBuilder<SVGFEFuncBElementProps | null>;
export function $s(tagName: "fefuncg", className?: string): VNodeBuilder<SVGFEFuncGElementProps | null>;
export function $s(tagName: "fefuncr", className?: string): VNodeBuilder<SVGFEFuncRElementProps | null>;
export function $s(tagName: "fegaussianblur", className?: string): VNodeBuilder<SVGFEGaussianBlurElementProps | null>;
export function $s(tagName: "feimage", className?: string): VNodeBuilder<SVGFEImageElementProps | null>;
export function $s(tagName: "femerge", className?: string): VNodeBuilder<SVGFEMergeElementProps | null>;
export function $s(tagName: "femergenode", className?: string): VNodeBuilder<SVGFEMergeNodeElementProps | null>;
export function $s(tagName: "femorphology", className?: string): VNodeBuilder<SVGFEMorphologyElementProps | null>;
export function $s(tagName: "feoffset", className?: string): VNodeBuilder<SVGFEOffsetElementProps | null>;
export function $s(tagName: "fepointlight", className?: string): VNodeBuilder<SVGFEPointLightElementProps | null>;
export function $s(tagName: "fespecularlighting", className?: string): VNodeBuilder<SVGFESpecularLightingElementProps | null>;
export function $s(tagName: "fespotlight", className?: string): VNodeBuilder<SVGFESpotLightElementProps | null>;
export function $s(tagName: "fetile", className?: string): VNodeBuilder<SVGFETileElementProps | null>;
export function $s(tagName: "feturbulence", className?: string): VNodeBuilder<SVGFETurbulenceElementProps | null>;
export function $s(tagName: "filter", className?: string): VNodeBuilder<SVGFilterElementProps | null>;
export function $s(tagName: "foreignobject", className?: string): VNodeBuilder<SVGForeignObjectElementProps | null>;
export function $s(tagName: "g", className?: string): VNodeBuilder<SVGGElementProps | null>;
export function $s(tagName: "image", className?: string): VNodeBuilder<SVGImageElementProps | null>;
export function $s(tagName: "line", className?: string): VNodeBuilder<SVGLineElementProps | null>;
export function $s(tagName: "lineargradient", className?: string): VNodeBuilder<SVGLinearGradientElementProps | null>;
export function $s(tagName: "marker", className?: string): VNodeBuilder<SVGMarkerElementProps | null>;
export function $s(tagName: "mask", className?: string): VNodeBuilder<SVGMaskElementProps | null>;
export function $s(tagName: "metadata", className?: string): VNodeBuilder<SVGMetadataElementProps | null>;
export function $s(tagName: "path", className?: string): VNodeBuilder<SVGPathElementProps | null>;
export function $s(tagName: "pattern", className?: string): VNodeBuilder<SVGPatternElementProps | null>;
export function $s(tagName: "polygon", className?: string): VNodeBuilder<SVGPolygonElementProps | null>;
export function $s(tagName: "polyline", className?: string): VNodeBuilder<SVGPolylineElementProps | null>;
export function $s(tagName: "radialgradient", className?: string): VNodeBuilder<SVGRadialGradientElementProps | null>;
export function $s(tagName: "rect", className?: string): VNodeBuilder<SVGRectElementProps | null>;
export function $s(tagName: "stop", className?: string): VNodeBuilder<SVGStopElementProps | null>;
export function $s(tagName: "svg", className?: string): VNodeBuilder<SVGSVGElementProps | null>;
export function $s(tagName: "switch", className?: string): VNodeBuilder<SVGSwitchElementProps | null>;
export function $s(tagName: "symbol", className?: string): VNodeBuilder<SVGSymbolElementProps | null>;
export function $s(tagName: "text", className?: string): VNodeBuilder<SVGTextElementProps | null>;
export function $s(tagName: "textpath", className?: string): VNodeBuilder<SVGTextPathElementProps | null>;
export function $s(tagName: "tspan", className?: string): VNodeBuilder<SVGTSpanElementProps | null>;
export function $s(tagName: "use", className?: string): VNodeBuilder<SVGUseElementProps | null>;
export function $s(tagName: "view", className?: string): VNodeBuilder<SVGViewElementProps | null>;
export function $s(tagName: string, className?: string): VNodeBuilder<SVGElementProps | null> {
    return new VNodeBuilder<SVGElementProps | null>(
        VNodeFlags.Element | VNodeFlags.SvgElement,
        tagName,
        null,
        className === undefined ? null : className,
        null);
}

export type InputType = "textarea" | "button" | "checkbox" | "color" | "date" | "datetime" | "datetime-local" |
    "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" |
    "submit" | "tel" | "text" | "time" | "url" | "week";

function isInputTypeSupportsCheckedValue(type: InputType): boolean {
    if (type === "checkbox" || type === "radio") {
        return true;
    }
    return false;
}

/**
 * Create a VNodeBuilder representing an HTMLInputElement node.
 *
 * @param type Input Element type. When type param has value "textarea", HTMLTextAreaElement will be created.
 * @param props Input Element props.
 * @returns VNodeBuilder object.
 */
export function $i(type: "textarea", className?: string): VNodeBuilder<HTMLTextAreaElementProps | null>;
export function $i(type: "button", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "checkbox", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "color", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "date", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "datetime", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "datetime-local", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "email", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "file", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "hidden", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "image", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "month", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "number", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "password", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "radio", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "range", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "reset", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "search", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "submit", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "tel", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "text", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "time", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "url", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: "week", className?: string): VNodeBuilder<HTMLInputElementProps | null>;
export function $i(type: InputType, className?: string): VNodeBuilder<HTMLInputElementProps | null> {
    return new VNodeBuilder<HTMLInputElementProps | null>(
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
 * @param props
 * @returns VNodeBuilder object.
 */
export function $m(tagName: "audio", className?: string): VNodeBuilder<HTMLAudioElementProps | null>;
export function $m(tagName: "video", className?: string): VNodeBuilder<HTMLVideoElementProps | null>;
export function $m(tagName: string, className?: string): VNodeBuilder<HTMLMediaElementProps | null> {
    return new VNodeBuilder<HTMLMediaElementProps | null>(
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
export function $c(c: ComponentFunction<null> | ComponentClass<null>): VNodeBuilder<null>;
export function $c<P>(c: ComponentFunction<P> | ComponentClass<P>, props: P): VNodeBuilder<P>;
export function $c<P>(c: ComponentFunction<P> | ComponentClass<P>, props?: P): VNodeBuilder<P> {
    return new VNodeBuilder<P>(
        (c.prototype.render) ? VNodeFlags.ComponentClass : VNodeFlags.ComponentFunction,
        c,
        props!,
        null,
        null);
}

/**
 * Perform a deep VNode cloning with DOM and Component reference erasure.
 *
 * @param node VNode to clone.
 * @returns Cloned VNode.
 */
export function cloneVNode(node: VNode<any>): VNode<any> {
    const flags = node._flags;
    let children = node._children;
    if (children !== null && (flags & VNodeFlags.ChildrenArray)) {
        children = children as VNode<any>[];
        const newChildren = new Array<VNode<any>>(children.length);
        for (let i = 0; i < 0; i++) {
            newChildren[i] = cloneVNode(children[i]);
        }
    }

    const newNode = new VNodeBuilder(
        node._flags,
        node._tag,
        node._props,
        node._className,
        (node._flags & VNodeFlags.Component) ? null : node._children);
    newNode._key = node._key;
    newNode._events = node._events;
    newNode._style = node._style;

    return newNode;
}

function _normalizeVNodes(nodes: VNodeRecursiveArray, result: VNode<any>[], i: number): void {
    for (; i < nodes.length; i++) {
        const n = nodes[i];
        if (n !== null) {
            if (Array.isArray(n)) {
                _normalizeVNodes(n, result, 0);
            } else {
                result.push(typeof n === "object" ? n as VNode<any> : $t(n));
            }
        }
    }
}

/**
 * Normalizes recursive VNode lists by flattening all nodes, filtering out `null` children and converting strings to
 * text nodes.
 *
 * @param nodes
 * @returns Normalized VNode array.
 */
export function normalizeVNodes(nodes: VNodeRecursiveArray): VNode<any>[] {
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (n === null || Array.isArray(n)) {
            const result = nodes.slice(0, i) as VNode<any>[];
            _normalizeVNodes(nodes, result, i);
            return result;
        } else if (typeof n !== "object") {
            nodes[i] = $t(n);
        }
    }

    return nodes as VNode<any>[];
}
