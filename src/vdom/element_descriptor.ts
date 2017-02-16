import { checkDOMAttributesForTypos, checkDOMStylesForTypos, checkDeprecatedDOMSVGAttributes } from "../dev_mode/typos";
import { isValidTag } from "../dev_mode/dom";
import { SVG_NAMESPACE, HTMLTagType, SVGTagType, MediaTagType, InputType } from "../common/dom";
import { ElementDescriptorFlags } from "./flags";
import { syncDOMProps, syncClassName, syncStyle } from "./sync_dom";
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
 * Element Descriptor.
 *
 * Element Descriptors are partially static elements.
 *
 * @final
 */
export class ElementDescriptor<P = void> {
    /**
     * Flags, see `ElementDescriptorFlags` for details.
     */
    _flags: number;
    /**
     * Tag name of the element.
     */
    _tag: string;
    /**
     * Style.
     */
    _style: CSSStyleProps | null;
    /**
     * Properties.
     */
    _props: P | null;
    /**
     * Class name.
     */
    _className: string | null;
    /**
     * Reference to an element that will be cloned when DOM node cloning is enabled.
     */
    private _ref: Element | null;
    /**
     * Props protected from overriding.
     */
    _protectedProps: { [key: string]: boolean } | null;
    /**
     * Styles protected from overriding.
     */
    _protectedStyle: { [key: string]: boolean } | null;

    constructor(tagName: string, flags: ElementDescriptorFlags = 0) {
        this._flags = flags;
        this._tag = tagName;
        this._props = null;
        this._className = null;
        this._style = null;
        this._ref = null;
        if (__IVI_DEV__) {
            this._protectedProps = null;
            this._protectedStyle = null;
        }
    }

    /**
     * Set props.
     *
     * @param props
     * @param protect
     * @returns ElementDescriptor.
     */
    props(props: P, protect?: boolean | { [key: string]: boolean }): ElementDescriptor<P> {
        if (__IVI_DEV__) {
            if (protect) {
                this._flags |= ElementDescriptorFlags.ProtectProps;
                if (typeof protect === "object") {
                    this._protectedProps = protect;
                }
            }
            if (props) {
                checkDOMAttributesForTypos(props);
                if (this._flags & ElementDescriptorFlags.SvgElement) {
                    checkDeprecatedDOMSVGAttributes(this._tag as string, props);
                }
            }
        }
        this._props = props;
        return this;
    }

    /**
     * Set className.
     *
     * @param className
     * @param protect
     * @returns ElementDescriptor.
     */
    className(className: string, protect?: boolean): ElementDescriptor<P> {
        if (__IVI_DEV__) {
            if (protect) {
                this._flags |= ElementDescriptorFlags.ProtectClassName;
            }
        }
        this._className = className;
        return this;
    }

    /**
     * Set style.
     *
     * @param style
     * @param protect
     * @returns ElementDescriptor.
     */
    style(style: CSSStyleProps | null, protect?: boolean | { [key: string]: boolean }): ElementDescriptor<P> {
        if (__IVI_DEV__) {
            if (protect) {
                this._flags |= ElementDescriptorFlags.ProtectStyle;
                if (typeof protect === "object") {
                    this._protectedProps = protect;
                }
            }
            if (style) {
                checkDOMStylesForTypos(style);
            }
        }
        this._style = style;
        return this;
    }

    /**
     * Create a DOM Element.
     */
    createElement(): Element {
        let ref = this._ref;

        if (ref === null) {
            if (this._flags & ElementDescriptorFlags.SvgElement) {
                ref = document.createElementNS(SVG_NAMESPACE, this._tag);
            } else {
                if (this._flags & ElementDescriptorFlags.InputElement) {
                    if (this._flags & ElementDescriptorFlags.TextAreaElement) {
                        ref = document.createElement("textarea");
                    } else {
                        ref = document.createElement("input");
                        (ref as HTMLInputElement).type = this._tag as string;
                    }
                } else {
                    ref = document.createElement(this._tag);
                }
            }

            if (this._props) {
                syncDOMProps(ref as Element, this._flags, null, this._props);
            }
            if (this._className !== null) {
                syncClassName(ref as Element, this._flags, null, this._className);
            }
            if (this._style !== null) {
                syncStyle(ref as HTMLElement, null, this._style);
            }

            return ref;
        } else {
            return ref.cloneNode(false) as Element;
        }
    }
}

/* tslint:disable:max-line-length */
/**
 * Create an ElementDescriptor.
 *
 * @param tagName HTML Element tag name.
 * @param clone Enable DOM node cloning.
 * @returns ElementDescriptor object.
 */
export function createElementDescriptor(tagName: "a", clone?: boolean): ElementDescriptor<HTMLAnchorElementProps | null>;
export function createElementDescriptor(tagName: "abbr", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "acronym", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "address", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "applet", clone?: boolean): ElementDescriptor<HTMLAppletElementProps | null>;
export function createElementDescriptor(tagName: "area", clone?: boolean): ElementDescriptor<HTMLAreaElementProps | null>;
export function createElementDescriptor(tagName: "article", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "aside", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "b", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "base", clone?: boolean): ElementDescriptor<HTMLBaseElementProps | null>;
export function createElementDescriptor(tagName: "basefont", clone?: boolean): ElementDescriptor<HTMLBaseFontElementProps | null>;
export function createElementDescriptor(tagName: "bdo", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "big", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "blockquote", clone?: boolean): ElementDescriptor<HTMLQuoteElementProps | null>;
export function createElementDescriptor(tagName: "body", clone?: boolean): ElementDescriptor<HTMLBodyElementProps | null>;
export function createElementDescriptor(tagName: "br", clone?: boolean): ElementDescriptor<HTMLBRElementProps | null>;
export function createElementDescriptor(tagName: "button", clone?: boolean): ElementDescriptor<HTMLButtonElementProps | null>;
export function createElementDescriptor(tagName: "canvas", clone?: boolean): ElementDescriptor<HTMLCanvasElementProps | null>;
export function createElementDescriptor(tagName: "caption", clone?: boolean): ElementDescriptor<HTMLTableCaptionElementProps | null>;
export function createElementDescriptor(tagName: "center", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "cite", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "code", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "col", clone?: boolean): ElementDescriptor<HTMLTableColElementProps | null>;
export function createElementDescriptor(tagName: "colgroup", clone?: boolean): ElementDescriptor<HTMLTableColElementProps | null>;
export function createElementDescriptor(tagName: "datalist", clone?: boolean): ElementDescriptor<HTMLDataListElementProps | null>;
export function createElementDescriptor(tagName: "dd", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "del", clone?: boolean): ElementDescriptor<HTMLModElementProps | null>;
export function createElementDescriptor(tagName: "dfn", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "dir", clone?: boolean): ElementDescriptor<HTMLDirectoryElementProps | null>;
export function createElementDescriptor(tagName: "div", clone?: boolean): ElementDescriptor<HTMLDivElementProps | null>;
export function createElementDescriptor(tagName: "dl", clone?: boolean): ElementDescriptor<HTMLDListElementProps | null>;
export function createElementDescriptor(tagName: "dt", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "em", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "embed", clone?: boolean): ElementDescriptor<HTMLEmbedElementProps | null>;
export function createElementDescriptor(tagName: "fieldset", clone?: boolean): ElementDescriptor<HTMLFieldSetElementProps | null>;
export function createElementDescriptor(tagName: "figcaption", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "figure", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "font", clone?: boolean): ElementDescriptor<HTMLFontElementProps | null>;
export function createElementDescriptor(tagName: "footer", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "form", clone?: boolean): ElementDescriptor<HTMLFormElementProps | null>;
export function createElementDescriptor(tagName: "frame", clone?: boolean): ElementDescriptor<HTMLFrameElementProps | null>;
export function createElementDescriptor(tagName: "frameset", clone?: boolean): ElementDescriptor<HTMLFrameSetElementProps | null>;
export function createElementDescriptor(tagName: "h1", clone?: boolean): ElementDescriptor<HTMLHeadingElementProps | null>;
export function createElementDescriptor(tagName: "h2", clone?: boolean): ElementDescriptor<HTMLHeadingElementProps | null>;
export function createElementDescriptor(tagName: "h3", clone?: boolean): ElementDescriptor<HTMLHeadingElementProps | null>;
export function createElementDescriptor(tagName: "h4", clone?: boolean): ElementDescriptor<HTMLHeadingElementProps | null>;
export function createElementDescriptor(tagName: "h5", clone?: boolean): ElementDescriptor<HTMLHeadingElementProps | null>;
export function createElementDescriptor(tagName: "h6", clone?: boolean): ElementDescriptor<HTMLHeadingElementProps | null>;
export function createElementDescriptor(tagName: "head", clone?: boolean): ElementDescriptor<HTMLHeadElementProps | null>;
export function createElementDescriptor(tagName: "header", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "hgroup", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "hr", clone?: boolean): ElementDescriptor<HTMLHRElementProps | null>;
export function createElementDescriptor(tagName: "html", clone?: boolean): ElementDescriptor<HTMLHtmlElementProps | null>;
export function createElementDescriptor(tagName: "i", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "iframe", clone?: boolean): ElementDescriptor<HTMLIFrameElementProps | null>;
export function createElementDescriptor(tagName: "img", clone?: boolean): ElementDescriptor<HTMLImageElementProps | null>;
export function createElementDescriptor(tagName: "ins", clone?: boolean): ElementDescriptor<HTMLModElementProps | null>;
export function createElementDescriptor(tagName: "isindex", clone?: boolean): ElementDescriptor<HTMLUnknownElementProps | null>;
export function createElementDescriptor(tagName: "kbd", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "keygen", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "label", clone?: boolean): ElementDescriptor<HTMLLabelElementProps | null>;
export function createElementDescriptor(tagName: "legend", clone?: boolean): ElementDescriptor<HTMLLegendElementProps | null>;
export function createElementDescriptor(tagName: "li", clone?: boolean): ElementDescriptor<HTMLLIElementProps | null>;
export function createElementDescriptor(tagName: "link", clone?: boolean): ElementDescriptor<HTMLLinkElementProps | null>;
export function createElementDescriptor(tagName: "listing", clone?: boolean): ElementDescriptor<HTMLPreElementProps | null>;
export function createElementDescriptor(tagName: "map", clone?: boolean): ElementDescriptor<HTMLMapElementProps | null>;
export function createElementDescriptor(tagName: "mark", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "marquee", clone?: boolean): ElementDescriptor<HTMLMarqueeElementProps | null>;
export function createElementDescriptor(tagName: "menu", clone?: boolean): ElementDescriptor<HTMLMenuElementProps | null>;
export function createElementDescriptor(tagName: "meta", clone?: boolean): ElementDescriptor<HTMLMetaElementProps | null>;
export function createElementDescriptor(tagName: "meter", clone?: boolean): ElementDescriptor<HTMLMeterElementProps | null>;
export function createElementDescriptor(tagName: "nav", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "nextid", clone?: boolean): ElementDescriptor<HTMLUnknownElementProps | null>;
export function createElementDescriptor(tagName: "nobr", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "noframes", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "noscript", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "object", clone?: boolean): ElementDescriptor<HTMLObjectElementProps | null>;
export function createElementDescriptor(tagName: "ol", clone?: boolean): ElementDescriptor<HTMLOListElementProps | null>;
export function createElementDescriptor(tagName: "optgroup", clone?: boolean): ElementDescriptor<HTMLOptGroupElementProps | null>;
export function createElementDescriptor(tagName: "option", clone?: boolean): ElementDescriptor<HTMLOptionElementProps | null>;
export function createElementDescriptor(tagName: "p", clone?: boolean): ElementDescriptor<HTMLParagraphElementProps | null>;
export function createElementDescriptor(tagName: "param", clone?: boolean): ElementDescriptor<HTMLParamElementProps | null>;
export function createElementDescriptor(tagName: "picture", clone?: boolean): ElementDescriptor<HTMLPictureElementProps | null>;
export function createElementDescriptor(tagName: "plaintext", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "pre", clone?: boolean): ElementDescriptor<HTMLPreElementProps | null>;
export function createElementDescriptor(tagName: "progress", clone?: boolean): ElementDescriptor<HTMLProgressElementProps | null>;
export function createElementDescriptor(tagName: "q", clone?: boolean): ElementDescriptor<HTMLQuoteElementProps | null>;
export function createElementDescriptor(tagName: "rt", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "ruby", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "s", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "samp", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "script", clone?: boolean): ElementDescriptor<HTMLScriptElementProps | null>;
export function createElementDescriptor(tagName: "section", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "select", clone?: boolean): ElementDescriptor<HTMLSelectElementProps | null>;
export function createElementDescriptor(tagName: "small", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "source", clone?: boolean): ElementDescriptor<HTMLSourceElementProps | null>;
export function createElementDescriptor(tagName: "span", clone?: boolean): ElementDescriptor<HTMLSpanElementProps | null>;
export function createElementDescriptor(tagName: "strike", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "strong", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "style", clone?: boolean): ElementDescriptor<HTMLStyleElementProps | null>;
export function createElementDescriptor(tagName: "sub", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "sup", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "table", clone?: boolean): ElementDescriptor<HTMLTableElementProps | null>;
export function createElementDescriptor(tagName: "tbody", clone?: boolean): ElementDescriptor<HTMLTableSectionElementProps | null>;
export function createElementDescriptor(tagName: "td", clone?: boolean): ElementDescriptor<HTMLTableDataCellElementProps | null>;
export function createElementDescriptor(tagName: "template", clone?: boolean): ElementDescriptor<HTMLTemplateElementProps | null>;
export function createElementDescriptor(tagName: "textarea", clone?: boolean): ElementDescriptor<HTMLTextAreaElementProps | null>;
export function createElementDescriptor(tagName: "tfoot", clone?: boolean): ElementDescriptor<HTMLTableSectionElementProps | null>;
export function createElementDescriptor(tagName: "th", clone?: boolean): ElementDescriptor<HTMLTableHeaderCellElementProps | null>;
export function createElementDescriptor(tagName: "thead", clone?: boolean): ElementDescriptor<HTMLTableSectionElementProps | null>;
export function createElementDescriptor(tagName: "title", clone?: boolean): ElementDescriptor<HTMLTitleElementProps | null>;
export function createElementDescriptor(tagName: "tr", clone?: boolean): ElementDescriptor<HTMLTableRowElementProps | null>;
export function createElementDescriptor(tagName: "track", clone?: boolean): ElementDescriptor<HTMLTrackElementProps | null>;
export function createElementDescriptor(tagName: "tt", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "u", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "ul", clone?: boolean): ElementDescriptor<HTMLUListElementProps | null>;
export function createElementDescriptor(tagName: "var", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "wbr", clone?: boolean): ElementDescriptor<HTMLElementProps | null>;
export function createElementDescriptor(tagName: "x-ms-webview", clone?: boolean): ElementDescriptor<MSHTMLWebViewElementProps | null>;
export function createElementDescriptor(tagName: "xmp", clone?: boolean): ElementDescriptor<HTMLPreElementProps | null>;
export function createElementDescriptor(tagName: HTMLTagType, clone = false): ElementDescriptor<HTMLElementProps | null> {
    return new ElementDescriptor<HTMLElementProps | null>(
        tagName,
        clone ?
            (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                ElementDescriptorFlags.EnabledCloning) :
            ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor,
    );
}

/**
 * Create an ElementDescriptor with an SVG flag.
 *
 * @param tagName SVG Element tag name.
 * @param clone Enable DOM node cloning.
 * @returns VNodeBuilder object.
 */
export function createSVGElementDescriptor(tagName: "circle", clone?: boolean): ElementDescriptor<SVGCircleElementProps | null>;
export function createSVGElementDescriptor(tagName: "clippath", clone?: boolean): ElementDescriptor<SVGClipPathElementProps | null>;
export function createSVGElementDescriptor(tagName: "defs", clone?: boolean): ElementDescriptor<SVGDefsElementProps | null>;
export function createSVGElementDescriptor(tagName: "desc", clone?: boolean): ElementDescriptor<SVGDescElementProps | null>;
export function createSVGElementDescriptor(tagName: "ellipse", clone?: boolean): ElementDescriptor<SVGEllipseElementProps | null>;
export function createSVGElementDescriptor(tagName: "feblend", clone?: boolean): ElementDescriptor<SVGFEBlendElementProps | null>;
export function createSVGElementDescriptor(tagName: "fecolormatrix", clone?: boolean): ElementDescriptor<SVGFEColorMatrixElementProps | null>;
export function createSVGElementDescriptor(tagName: "fecomponenttransfer", clone?: boolean): ElementDescriptor<SVGFEComponentTransferElementProps | null>;
export function createSVGElementDescriptor(tagName: "fecomposite", clone?: boolean): ElementDescriptor<SVGFECompositeElementProps | null>;
export function createSVGElementDescriptor(tagName: "feconvolvematrix", clone?: boolean): ElementDescriptor<SVGFEConvolveMatrixElementProps | null>;
export function createSVGElementDescriptor(tagName: "fediffuselighting", clone?: boolean): ElementDescriptor<SVGFEDiffuseLightingElementProps | null>;
export function createSVGElementDescriptor(tagName: "fedisplacementmap", clone?: boolean): ElementDescriptor<SVGFEDisplacementMapElementProps | null>;
export function createSVGElementDescriptor(tagName: "fedistantlight", clone?: boolean): ElementDescriptor<SVGFEDistantLightElementProps | null>;
export function createSVGElementDescriptor(tagName: "feflood", clone?: boolean): ElementDescriptor<SVGFEFloodElementProps | null>;
export function createSVGElementDescriptor(tagName: "fefunca", clone?: boolean): ElementDescriptor<SVGFEFuncAElementProps | null>;
export function createSVGElementDescriptor(tagName: "fefuncb", clone?: boolean): ElementDescriptor<SVGFEFuncBElementProps | null>;
export function createSVGElementDescriptor(tagName: "fefuncg", clone?: boolean): ElementDescriptor<SVGFEFuncGElementProps | null>;
export function createSVGElementDescriptor(tagName: "fefuncr", clone?: boolean): ElementDescriptor<SVGFEFuncRElementProps | null>;
export function createSVGElementDescriptor(tagName: "fegaussianblur", clone?: boolean): ElementDescriptor<SVGFEGaussianBlurElementProps | null>;
export function createSVGElementDescriptor(tagName: "feimage", clone?: boolean): ElementDescriptor<SVGFEImageElementProps | null>;
export function createSVGElementDescriptor(tagName: "femerge", clone?: boolean): ElementDescriptor<SVGFEMergeElementProps | null>;
export function createSVGElementDescriptor(tagName: "femergenode", clone?: boolean): ElementDescriptor<SVGFEMergeNodeElementProps | null>;
export function createSVGElementDescriptor(tagName: "femorphology", clone?: boolean): ElementDescriptor<SVGFEMorphologyElementProps | null>;
export function createSVGElementDescriptor(tagName: "feoffset", clone?: boolean): ElementDescriptor<SVGFEOffsetElementProps | null>;
export function createSVGElementDescriptor(tagName: "fepointlight", clone?: boolean): ElementDescriptor<SVGFEPointLightElementProps | null>;
export function createSVGElementDescriptor(tagName: "fespecularlighting", clone?: boolean): ElementDescriptor<SVGFESpecularLightingElementProps | null>;
export function createSVGElementDescriptor(tagName: "fespotlight", clone?: boolean): ElementDescriptor<SVGFESpotLightElementProps | null>;
export function createSVGElementDescriptor(tagName: "fetile", clone?: boolean): ElementDescriptor<SVGFETileElementProps | null>;
export function createSVGElementDescriptor(tagName: "feturbulence", clone?: boolean): ElementDescriptor<SVGFETurbulenceElementProps | null>;
export function createSVGElementDescriptor(tagName: "filter", clone?: boolean): ElementDescriptor<SVGFilterElementProps | null>;
export function createSVGElementDescriptor(tagName: "foreignobject", clone?: boolean): ElementDescriptor<SVGForeignObjectElementProps | null>;
export function createSVGElementDescriptor(tagName: "g", clone?: boolean): ElementDescriptor<SVGGElementProps | null>;
export function createSVGElementDescriptor(tagName: "image", clone?: boolean): ElementDescriptor<SVGImageElementProps | null>;
export function createSVGElementDescriptor(tagName: "line", clone?: boolean): ElementDescriptor<SVGLineElementProps | null>;
export function createSVGElementDescriptor(tagName: "lineargradient", clone?: boolean): ElementDescriptor<SVGLinearGradientElementProps | null>;
export function createSVGElementDescriptor(tagName: "marker", clone?: boolean): ElementDescriptor<SVGMarkerElementProps | null>;
export function createSVGElementDescriptor(tagName: "mask", clone?: boolean): ElementDescriptor<SVGMaskElementProps | null>;
export function createSVGElementDescriptor(tagName: "metadata", clone?: boolean): ElementDescriptor<SVGMetadataElementProps | null>;
export function createSVGElementDescriptor(tagName: "path", clone?: boolean): ElementDescriptor<SVGPathElementProps | null>;
export function createSVGElementDescriptor(tagName: "pattern", clone?: boolean): ElementDescriptor<SVGPatternElementProps | null>;
export function createSVGElementDescriptor(tagName: "polygon", clone?: boolean): ElementDescriptor<SVGPolygonElementProps | null>;
export function createSVGElementDescriptor(tagName: "polyline", clone?: boolean): ElementDescriptor<SVGPolylineElementProps | null>;
export function createSVGElementDescriptor(tagName: "radialgradient", clone?: boolean): ElementDescriptor<SVGRadialGradientElementProps | null>;
export function createSVGElementDescriptor(tagName: "rect", clone?: boolean): ElementDescriptor<SVGRectElementProps | null>;
export function createSVGElementDescriptor(tagName: "stop", clone?: boolean): ElementDescriptor<SVGStopElementProps | null>;
export function createSVGElementDescriptor(tagName: "svg", clone?: boolean): ElementDescriptor<SVGSVGElementProps | null>;
export function createSVGElementDescriptor(tagName: "switch", clone?: boolean): ElementDescriptor<SVGSwitchElementProps | null>;
export function createSVGElementDescriptor(tagName: "symbol", clone?: boolean): ElementDescriptor<SVGSymbolElementProps | null>;
export function createSVGElementDescriptor(tagName: "text", clone?: boolean): ElementDescriptor<SVGTextElementProps | null>;
export function createSVGElementDescriptor(tagName: "textpath", clone?: boolean): ElementDescriptor<SVGTextPathElementProps | null>;
export function createSVGElementDescriptor(tagName: "tspan", clone?: boolean): ElementDescriptor<SVGTSpanElementProps | null>;
export function createSVGElementDescriptor(tagName: "use", clone?: boolean): ElementDescriptor<SVGUseElementProps | null>;
export function createSVGElementDescriptor(tagName: "view", clone?: boolean): ElementDescriptor<SVGViewElementProps | null>;
export function createSVGElementDescriptor(tagName: SVGTagType, clone = false): ElementDescriptor<SVGElementProps | null> {
    return new ElementDescriptor<SVGElementProps | null>(
        tagName,
        clone ?
            (ElementDescriptorFlags.EnabledCloning | ElementDescriptorFlags.Element |
                ElementDescriptorFlags.ElementDescriptor | ElementDescriptorFlags.SvgElement) :
            ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor | ElementDescriptorFlags.SvgElement,
    );
}

/**
 * Create an Element Descriptor for HTMLInputElement node.
 *
 * @param type Input Element type. When type param has value "textarea", HTMLTextAreaElement will be created.
 * @param clone Enable DOM node cloning.
 * @returns VNodeBuilder object.
 */
export function createInputElementDescriptor(type: "textarea", clone?: boolean): ElementDescriptor<HTMLTextAreaElementProps | null>;
export function createInputElementDescriptor(type: "button", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "checkbox", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "color", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "date", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "datetime", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "datetime-local", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "email", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "file", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "hidden", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "image", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "month", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "number", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "password", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "radio", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "range", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "reset", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "search", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "submit", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "tel", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "text", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "time", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "url", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: "week", clone?: boolean): ElementDescriptor<HTMLInputElementProps | null>;
export function createInputElementDescriptor(type: InputType, clone?: boolean): ElementDescriptor<HTMLInputElementProps | null> {
    if (type === "textarea") {
        return new ElementDescriptor<HTMLInputElementProps | null>(
            type,
            clone ?
                (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                    ElementDescriptorFlags.InputElement | ElementDescriptorFlags.TextAreaElement |
                    ElementDescriptorFlags.EnabledCloning) :
                (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                    ElementDescriptorFlags.InputElement | ElementDescriptorFlags.TextAreaElement),
        );
    }
    return new ElementDescriptor<HTMLInputElementProps | null>(
        type,
        clone ?
            (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                ElementDescriptorFlags.InputElement | ElementDescriptorFlags.EnabledCloning) :
            (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                ElementDescriptorFlags.InputElement),
    );
}

/**
 * Create a VNodeBuilder representing an HTMLMediaElement node.
 *
 * @param tagName Media element tag name.
 * @param clone Enable DOM node cloning.
 * @returns VNodeBuilder object.
 */
export function createMediaElementDescriptor(tagName: "audio", clone?: boolean): ElementDescriptor<HTMLAudioElementProps | null>;
export function createMediaElementDescriptor(tagName: "video", clone?: boolean): ElementDescriptor<HTMLVideoElementProps | null>;
export function createMediaElementDescriptor(tagName: MediaTagType, clone?: boolean): ElementDescriptor<HTMLMediaElementProps | null> {
    return new ElementDescriptor<HTMLInputElementProps | null>(
        tagName,
        clone ?
            (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                ElementDescriptorFlags.MediaElement | ElementDescriptorFlags.EnabledCloning) :
            (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                ElementDescriptorFlags.MediaElement),
    );
}

/**
 * Create a VNodeBuilder representing a Custom Element.
 *
 * @param tagName Custom element tag name.
 * @param clone Enable DOM node cloning.
 * @returns VNodeBuilder object.
 */
export function createCustomElementDescriptor(tagName: string, clone = false): ElementDescriptor<{ [key: string]: any } | null> {
    if (__IVI_DEV__) {
        if (!isValidTag(tagName)) {
            throw new Error(`Invalid tag: ${tagName}`);
        }
    }

    return new ElementDescriptor<HTMLElementProps | null>(
        tagName,
        clone ?
            (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                ElementDescriptorFlags.WebComponent | ElementDescriptorFlags.EnabledCloning) :
            ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
            ElementDescriptorFlags.WebComponent,
    );
}
/* tslint:enable:max-line-length */
