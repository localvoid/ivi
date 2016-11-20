import { SVG_NAMESPACE, InputType } from "../common/dom";
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
} from "./dom_props";

/**
 * Element Descriptor.
 *
 * Element Descriptors are partially static elements.
 *
 * @final
 */
export class ElementDescriptor<P> {
    /**
     * Flags, see `ElementDescriptorFlags` for details.
     */
    _flags: number;
    /**
     * Tag name of the element.
     */
    _tagName: string;
    /**
     * Style.
     */
    _style: CSSStyleProps | string | null;
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

    constructor(tagName: string, flags: ElementDescriptorFlags = 0) {
        this._flags = flags;
        this._tagName = tagName;
        this._props = null;
        this._className = null;
        this._style = null;
        this._ref = null;
    }

    /**
     * Set props.
     *
     * @param props.
     * @returns ElementDescriptor.
     */
    props(props: P): ElementDescriptor<P> {
        this._props = props;
        return this;
    }

    /**
     * Set className.
     *
     * @param className.
     * @returns ElementDescriptor.
     */
    className(classes: string): ElementDescriptor<P> {
        this._className = classes;
        return this;
    }

    /**
     * Set style.
     *
     * @param style.
     * @returns ElementDescriptor.
     */
    style(style: string): ElementDescriptor<P> {
        this._style = style;
        return this;
    }

    /**
     * Create a DOM Element.
     */
    createElement(): Element {
        let ref = this._ref;

        if (ref === null) {
            if ((this._flags & ElementDescriptorFlags.Svg) === 0) {
                ref = document.createElement(this._tagName);
            } else {
                ref = document.createElementNS(SVG_NAMESPACE, this._tagName);
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
 * @param clone Enable cloning
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
export function createElementDescriptor(tagName: string, clone = false): ElementDescriptor<HTMLElementProps | null> {
    return new ElementDescriptor<HTMLElementProps | null>(
        tagName,
        clone ?
            (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                ElementDescriptorFlags.EnabledCloning) :
            ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor,
    );
};

/**
 * Create an ElementDescriptor with an SVG flag.
 *
 * @param tagName SVG Element tag name.
 * @param props SVG Element props.
 * @returns VNodeBuilder object.
 */
export function createSvgElementDescriptor(tagName: "circle", clone?: boolean): ElementDescriptor<SVGCircleElementProps | null>;
export function createSvgElementDescriptor(tagName: "clippath", clone?: boolean): ElementDescriptor<SVGClipPathElementProps | null>;
export function createSvgElementDescriptor(tagName: "defs", clone?: boolean): ElementDescriptor<SVGDefsElementProps | null>;
export function createSvgElementDescriptor(tagName: "desc", clone?: boolean): ElementDescriptor<SVGDescElementProps | null>;
export function createSvgElementDescriptor(tagName: "ellipse", clone?: boolean): ElementDescriptor<SVGEllipseElementProps | null>;
export function createSvgElementDescriptor(tagName: "feblend", clone?: boolean): ElementDescriptor<SVGFEBlendElementProps | null>;
export function createSvgElementDescriptor(tagName: "fecolormatrix", clone?: boolean): ElementDescriptor<SVGFEColorMatrixElementProps | null>;
export function createSvgElementDescriptor(tagName: "fecomponenttransfer", clone?: boolean): ElementDescriptor<SVGFEComponentTransferElementProps | null>;
export function createSvgElementDescriptor(tagName: "fecomposite", clone?: boolean): ElementDescriptor<SVGFECompositeElementProps | null>;
export function createSvgElementDescriptor(tagName: "feconvolvematrix", clone?: boolean): ElementDescriptor<SVGFEConvolveMatrixElementProps | null>;
export function createSvgElementDescriptor(tagName: "fediffuselighting", clone?: boolean): ElementDescriptor<SVGFEDiffuseLightingElementProps | null>;
export function createSvgElementDescriptor(tagName: "fedisplacementmap", clone?: boolean): ElementDescriptor<SVGFEDisplacementMapElementProps | null>;
export function createSvgElementDescriptor(tagName: "fedistantlight", clone?: boolean): ElementDescriptor<SVGFEDistantLightElementProps | null>;
export function createSvgElementDescriptor(tagName: "feflood", clone?: boolean): ElementDescriptor<SVGFEFloodElementProps | null>;
export function createSvgElementDescriptor(tagName: "fefunca", clone?: boolean): ElementDescriptor<SVGFEFuncAElementProps | null>;
export function createSvgElementDescriptor(tagName: "fefuncb", clone?: boolean): ElementDescriptor<SVGFEFuncBElementProps | null>;
export function createSvgElementDescriptor(tagName: "fefuncg", clone?: boolean): ElementDescriptor<SVGFEFuncGElementProps | null>;
export function createSvgElementDescriptor(tagName: "fefuncr", clone?: boolean): ElementDescriptor<SVGFEFuncRElementProps | null>;
export function createSvgElementDescriptor(tagName: "fegaussianblur", clone?: boolean): ElementDescriptor<SVGFEGaussianBlurElementProps | null>;
export function createSvgElementDescriptor(tagName: "feimage", clone?: boolean): ElementDescriptor<SVGFEImageElementProps | null>;
export function createSvgElementDescriptor(tagName: "femerge", clone?: boolean): ElementDescriptor<SVGFEMergeElementProps | null>;
export function createSvgElementDescriptor(tagName: "femergenode", clone?: boolean): ElementDescriptor<SVGFEMergeNodeElementProps | null>;
export function createSvgElementDescriptor(tagName: "femorphology", clone?: boolean): ElementDescriptor<SVGFEMorphologyElementProps | null>;
export function createSvgElementDescriptor(tagName: "feoffset", clone?: boolean): ElementDescriptor<SVGFEOffsetElementProps | null>;
export function createSvgElementDescriptor(tagName: "fepointlight", clone?: boolean): ElementDescriptor<SVGFEPointLightElementProps | null>;
export function createSvgElementDescriptor(tagName: "fespecularlighting", clone?: boolean): ElementDescriptor<SVGFESpecularLightingElementProps | null>;
export function createSvgElementDescriptor(tagName: "fespotlight", clone?: boolean): ElementDescriptor<SVGFESpotLightElementProps | null>;
export function createSvgElementDescriptor(tagName: "fetile", clone?: boolean): ElementDescriptor<SVGFETileElementProps | null>;
export function createSvgElementDescriptor(tagName: "feturbulence", clone?: boolean): ElementDescriptor<SVGFETurbulenceElementProps | null>;
export function createSvgElementDescriptor(tagName: "filter", clone?: boolean): ElementDescriptor<SVGFilterElementProps | null>;
export function createSvgElementDescriptor(tagName: "foreignobject", clone?: boolean): ElementDescriptor<SVGForeignObjectElementProps | null>;
export function createSvgElementDescriptor(tagName: "g", clone?: boolean): ElementDescriptor<SVGGElementProps | null>;
export function createSvgElementDescriptor(tagName: "image", clone?: boolean): ElementDescriptor<SVGImageElementProps | null>;
export function createSvgElementDescriptor(tagName: "line", clone?: boolean): ElementDescriptor<SVGLineElementProps | null>;
export function createSvgElementDescriptor(tagName: "lineargradient", clone?: boolean): ElementDescriptor<SVGLinearGradientElementProps | null>;
export function createSvgElementDescriptor(tagName: "marker", clone?: boolean): ElementDescriptor<SVGMarkerElementProps | null>;
export function createSvgElementDescriptor(tagName: "mask", clone?: boolean): ElementDescriptor<SVGMaskElementProps | null>;
export function createSvgElementDescriptor(tagName: "metadata", clone?: boolean): ElementDescriptor<SVGMetadataElementProps | null>;
export function createSvgElementDescriptor(tagName: "path", clone?: boolean): ElementDescriptor<SVGPathElementProps | null>;
export function createSvgElementDescriptor(tagName: "pattern", clone?: boolean): ElementDescriptor<SVGPatternElementProps | null>;
export function createSvgElementDescriptor(tagName: "polygon", clone?: boolean): ElementDescriptor<SVGPolygonElementProps | null>;
export function createSvgElementDescriptor(tagName: "polyline", clone?: boolean): ElementDescriptor<SVGPolylineElementProps | null>;
export function createSvgElementDescriptor(tagName: "radialgradient", clone?: boolean): ElementDescriptor<SVGRadialGradientElementProps | null>;
export function createSvgElementDescriptor(tagName: "rect", clone?: boolean): ElementDescriptor<SVGRectElementProps | null>;
export function createSvgElementDescriptor(tagName: "stop", clone?: boolean): ElementDescriptor<SVGStopElementProps | null>;
export function createSvgElementDescriptor(tagName: "svg", clone?: boolean): ElementDescriptor<SVGSVGElementProps | null>;
export function createSvgElementDescriptor(tagName: "switch", clone?: boolean): ElementDescriptor<SVGSwitchElementProps | null>;
export function createSvgElementDescriptor(tagName: "symbol", clone?: boolean): ElementDescriptor<SVGSymbolElementProps | null>;
export function createSvgElementDescriptor(tagName: "text", clone?: boolean): ElementDescriptor<SVGTextElementProps | null>;
export function createSvgElementDescriptor(tagName: "textpath", clone?: boolean): ElementDescriptor<SVGTextPathElementProps | null>;
export function createSvgElementDescriptor(tagName: "tspan", clone?: boolean): ElementDescriptor<SVGTSpanElementProps | null>;
export function createSvgElementDescriptor(tagName: "use", clone?: boolean): ElementDescriptor<SVGUseElementProps | null>;
export function createSvgElementDescriptor(tagName: "view", clone?: boolean): ElementDescriptor<SVGViewElementProps | null>;
export function createSvgElementDescriptor(tagName: string, clone = false): ElementDescriptor<SVGElementProps | null> {
    return new ElementDescriptor<SVGElementProps | null>(
        tagName,
        clone ?
            (ElementDescriptorFlags.EnabledCloning | ElementDescriptorFlags.Element |
                ElementDescriptorFlags.ElementDescriptor | ElementDescriptorFlags.Svg) :
            ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor | ElementDescriptorFlags.Svg,
    );
}

/**
 * Create an Element Descriptor for HTMLInputElement node.
 *
 * @param type Input Element type. When type param has value "textarea", HTMLTextAreaElement will be created.
 * @param props Input Element props.
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
 * @param props
 * @returns VNodeBuilder object.
 */
export function createMediaElementDescriptor(tagName: "audio", clone?: boolean): ElementDescriptor<HTMLAudioElementProps | null>;
export function createMediaElementDescriptor(tagName: "video", clone?: boolean): ElementDescriptor<HTMLVideoElementProps | null>;
export function createMediaElementDescriptor(tagName: "audio" | "video", clone?: boolean): ElementDescriptor<HTMLMediaElementProps | null> {
    return new ElementDescriptor<HTMLInputElementProps | null>(
        tagName,
        clone ?
            (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                ElementDescriptorFlags.MediaElement | ElementDescriptorFlags.EnabledCloning) :
            (ElementDescriptorFlags.Element | ElementDescriptorFlags.ElementDescriptor |
                ElementDescriptorFlags.MediaElement),
    );
}
/* tslint:enable:max-line-length */
