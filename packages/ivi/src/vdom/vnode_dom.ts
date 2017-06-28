import {
    HTMLTagType, SVGTagType, MediaTagType, InputType,

    HTMLAnchorElementProps, HTMLElementProps, HTMLAppletElementProps, HTMLAreaElementProps, HTMLAudioElementProps,
    HTMLBaseElementProps, HTMLBaseFontElementProps, HTMLBodyElementProps, HTMLBRElementProps, HTMLButtonElementProps,
    HTMLCanvasElementProps, HTMLQuoteElementProps, HTMLTableCaptionElementProps, HTMLTableColElementProps,
    HTMLDataListElementProps, HTMLModElementProps, HTMLDirectoryElementProps, HTMLDivElementProps,
    HTMLDListElementProps, HTMLEmbedElementProps, HTMLFieldSetElementProps, HTMLFontElementProps, HTMLFormElementProps,
    HTMLFrameElementProps, HTMLFrameSetElementProps, HTMLHeadElementProps, HTMLHeadingElementProps, HTMLHRElementProps,
    HTMLHtmlElementProps, HTMLIFrameElementProps, HTMLImageElementProps, HTMLInputElementProps, HTMLLabelElementProps,
    HTMLLegendElementProps, HTMLLIElementProps, HTMLLinkElementProps, HTMLMapElementProps,
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
} from "ivi-core";
import { VNodeFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * Create a VNode representing a Text node.
 *
 * @param content Text content.
 * @returns VNodeBuilder object.
 */
export function text(content: string | number | boolean | null): VNode<null> {
    return new VNode<null>(VNodeFlags.Text, null, null, null, content);
}

/* tslint:disable:max-line-length unified-signatures */
/**
 * Create a VNode representing an Element node.
 *
 * @param tagName HTML Element tag name.
 * @param props HTML Element props.
 * @returns VNodeBuilder object.
 */
export function html(tagName: "a", className?: string): VNode<HTMLAnchorElementProps | null>;
export function html(tagName: "abbr", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "acronym", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "address", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "applet", className?: string): VNode<HTMLAppletElementProps | null>;
export function html(tagName: "area", className?: string): VNode<HTMLAreaElementProps | null>;
export function html(tagName: "article", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "aside", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "b", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "base", className?: string): VNode<HTMLBaseElementProps | null>;
export function html(tagName: "basefont", className?: string): VNode<HTMLBaseFontElementProps | null>;
export function html(tagName: "bdo", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "big", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "blockquote", className?: string): VNode<HTMLQuoteElementProps | null>;
export function html(tagName: "body", className?: string): VNode<HTMLBodyElementProps | null>;
export function html(tagName: "br", className?: string): VNode<HTMLBRElementProps | null>;
export function html(tagName: "button", className?: string): VNode<HTMLButtonElementProps | null>;
export function html(tagName: "canvas", className?: string): VNode<HTMLCanvasElementProps | null>;
export function html(tagName: "caption", className?: string): VNode<HTMLTableCaptionElementProps | null>;
export function html(tagName: "center", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "cite", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "code", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "col", className?: string): VNode<HTMLTableColElementProps | null>;
export function html(tagName: "colgroup", className?: string): VNode<HTMLTableColElementProps | null>;
export function html(tagName: "datalist", className?: string): VNode<HTMLDataListElementProps | null>;
export function html(tagName: "dd", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "del", className?: string): VNode<HTMLModElementProps | null>;
export function html(tagName: "dfn", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "dir", className?: string): VNode<HTMLDirectoryElementProps | null>;
export function html(tagName: "div", className?: string): VNode<HTMLDivElementProps | null>;
export function html(tagName: "dl", className?: string): VNode<HTMLDListElementProps | null>;
export function html(tagName: "dt", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "em", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "embed", className?: string): VNode<HTMLEmbedElementProps | null>;
export function html(tagName: "fieldset", className?: string): VNode<HTMLFieldSetElementProps | null>;
export function html(tagName: "figcaption", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "figure", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "font", className?: string): VNode<HTMLFontElementProps | null>;
export function html(tagName: "footer", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "form", className?: string): VNode<HTMLFormElementProps | null>;
export function html(tagName: "frame", className?: string): VNode<HTMLFrameElementProps | null>;
export function html(tagName: "frameset", className?: string): VNode<HTMLFrameSetElementProps | null>;
export function html(tagName: "h1", className?: string): VNode<HTMLHeadingElementProps | null>;
export function html(tagName: "h2", className?: string): VNode<HTMLHeadingElementProps | null>;
export function html(tagName: "h3", className?: string): VNode<HTMLHeadingElementProps | null>;
export function html(tagName: "h4", className?: string): VNode<HTMLHeadingElementProps | null>;
export function html(tagName: "h5", className?: string): VNode<HTMLHeadingElementProps | null>;
export function html(tagName: "h6", className?: string): VNode<HTMLHeadingElementProps | null>;
export function html(tagName: "head", className?: string): VNode<HTMLHeadElementProps | null>;
export function html(tagName: "header", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "hgroup", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "hr", className?: string): VNode<HTMLHRElementProps | null>;
export function html(tagName: "html", className?: string): VNode<HTMLHtmlElementProps | null>;
export function html(tagName: "i", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "iframe", className?: string): VNode<HTMLIFrameElementProps | null>;
export function html(tagName: "img", className?: string): VNode<HTMLImageElementProps | null>;
export function html(tagName: "ins", className?: string): VNode<HTMLModElementProps | null>;
export function html(tagName: "isindex", className?: string): VNode<HTMLUnknownElementProps | null>;
export function html(tagName: "kbd", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "keygen", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "label", className?: string): VNode<HTMLLabelElementProps | null>;
export function html(tagName: "legend", className?: string): VNode<HTMLLegendElementProps | null>;
export function html(tagName: "li", className?: string): VNode<HTMLLIElementProps | null>;
export function html(tagName: "link", className?: string): VNode<HTMLLinkElementProps | null>;
export function html(tagName: "listing", className?: string): VNode<HTMLPreElementProps | null>;
export function html(tagName: "map", className?: string): VNode<HTMLMapElementProps | null>;
export function html(tagName: "mark", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "menu", className?: string): VNode<HTMLMenuElementProps | null>;
export function html(tagName: "meta", className?: string): VNode<HTMLMetaElementProps | null>;
export function html(tagName: "meter", className?: string): VNode<HTMLMeterElementProps | null>;
export function html(tagName: "nav", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "nextid", className?: string): VNode<HTMLUnknownElementProps | null>;
export function html(tagName: "nobr", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "noframes", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "noscript", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "object", className?: string): VNode<HTMLObjectElementProps | null>;
export function html(tagName: "ol", className?: string): VNode<HTMLOListElementProps | null>;
export function html(tagName: "optgroup", className?: string): VNode<HTMLOptGroupElementProps | null>;
export function html(tagName: "option", className?: string): VNode<HTMLOptionElementProps | null>;
export function html(tagName: "p", className?: string): VNode<HTMLParagraphElementProps | null>;
export function html(tagName: "param", className?: string): VNode<HTMLParamElementProps | null>;
export function html(tagName: "picture", className?: string): VNode<HTMLPictureElementProps | null>;
export function html(tagName: "plaintext", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "pre", className?: string): VNode<HTMLPreElementProps | null>;
export function html(tagName: "progress", className?: string): VNode<HTMLProgressElementProps | null>;
export function html(tagName: "q", className?: string): VNode<HTMLQuoteElementProps | null>;
export function html(tagName: "rt", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "ruby", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "s", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "samp", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "script", className?: string): VNode<HTMLScriptElementProps | null>;
export function html(tagName: "section", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "select", className?: string): VNode<HTMLSelectElementProps | null>;
export function html(tagName: "small", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "source", className?: string): VNode<HTMLSourceElementProps | null>;
export function html(tagName: "span", className?: string): VNode<HTMLSpanElementProps | null>;
export function html(tagName: "strike", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "strong", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "style", className?: string): VNode<HTMLStyleElementProps | null>;
export function html(tagName: "sub", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "sup", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "table", className?: string): VNode<HTMLTableElementProps | null>;
export function html(tagName: "tbody", className?: string): VNode<HTMLTableSectionElementProps | null>;
export function html(tagName: "td", className?: string): VNode<HTMLTableDataCellElementProps | null>;
export function html(tagName: "template", className?: string): VNode<HTMLTemplateElementProps | null>;
export function html(tagName: "textarea", className?: string): VNode<HTMLTextAreaElementProps | null>;
export function html(tagName: "tfoot", className?: string): VNode<HTMLTableSectionElementProps | null>;
export function html(tagName: "th", className?: string): VNode<HTMLTableHeaderCellElementProps | null>;
export function html(tagName: "thead", className?: string): VNode<HTMLTableSectionElementProps | null>;
export function html(tagName: "title", className?: string): VNode<HTMLTitleElementProps | null>;
export function html(tagName: "tr", className?: string): VNode<HTMLTableRowElementProps | null>;
export function html(tagName: "track", className?: string): VNode<HTMLTrackElementProps | null>;
export function html(tagName: "tt", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "u", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "ul", className?: string): VNode<HTMLUListElementProps | null>;
export function html(tagName: "var", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "wbr", className?: string): VNode<HTMLElementProps | null>;
export function html(tagName: "x-ms-webview", className?: string): VNode<MSHTMLWebViewElementProps | null>;
export function html(tagName: "xmp", className?: string): VNode<HTMLPreElementProps | null>;
export function html(tagName: HTMLTagType, className?: string): VNode<HTMLElementProps | null> {
    return new VNode<HTMLElementProps | null>(
        VNodeFlags.Element,
        tagName,
        null,
        className === undefined ? null : className,
        null);
}

/**
 * Create a VNode representing a SVGElement node.
 *
 * @param tagName SVG Element tag name.
 * @param className Class name.
 * @returns VNodeBuilder object.
 */
export function svg(tagName: "circle", className?: string): VNode<SVGCircleElementProps | null>;
export function svg(tagName: "clippath", className?: string): VNode<SVGClipPathElementProps | null>;
export function svg(tagName: "defs", className?: string): VNode<SVGDefsElementProps | null>;
export function svg(tagName: "desc", className?: string): VNode<SVGDescElementProps | null>;
export function svg(tagName: "ellipse", className?: string): VNode<SVGEllipseElementProps | null>;
export function svg(tagName: "feblend", className?: string): VNode<SVGFEBlendElementProps | null>;
export function svg(tagName: "fecolormatrix", className?: string): VNode<SVGFEColorMatrixElementProps | null>;
export function svg(tagName: "fecomponenttransfer", className?: string): VNode<SVGFEComponentTransferElementProps | null>;
export function svg(tagName: "fecomposite", className?: string): VNode<SVGFECompositeElementProps | null>;
export function svg(tagName: "feconvolvematrix", className?: string): VNode<SVGFEConvolveMatrixElementProps | null>;
export function svg(tagName: "fediffuselighting", className?: string): VNode<SVGFEDiffuseLightingElementProps | null>;
export function svg(tagName: "fedisplacementmap", className?: string): VNode<SVGFEDisplacementMapElementProps | null>;
export function svg(tagName: "fedistantlight", className?: string): VNode<SVGFEDistantLightElementProps | null>;
export function svg(tagName: "feflood", className?: string): VNode<SVGFEFloodElementProps | null>;
export function svg(tagName: "fefunca", className?: string): VNode<SVGFEFuncAElementProps | null>;
export function svg(tagName: "fefuncb", className?: string): VNode<SVGFEFuncBElementProps | null>;
export function svg(tagName: "fefuncg", className?: string): VNode<SVGFEFuncGElementProps | null>;
export function svg(tagName: "fefuncr", className?: string): VNode<SVGFEFuncRElementProps | null>;
export function svg(tagName: "fegaussianblur", className?: string): VNode<SVGFEGaussianBlurElementProps | null>;
export function svg(tagName: "feimage", className?: string): VNode<SVGFEImageElementProps | null>;
export function svg(tagName: "femerge", className?: string): VNode<SVGFEMergeElementProps | null>;
export function svg(tagName: "femergenode", className?: string): VNode<SVGFEMergeNodeElementProps | null>;
export function svg(tagName: "femorphology", className?: string): VNode<SVGFEMorphologyElementProps | null>;
export function svg(tagName: "feoffset", className?: string): VNode<SVGFEOffsetElementProps | null>;
export function svg(tagName: "fepointlight", className?: string): VNode<SVGFEPointLightElementProps | null>;
export function svg(tagName: "fespecularlighting", className?: string): VNode<SVGFESpecularLightingElementProps | null>;
export function svg(tagName: "fespotlight", className?: string): VNode<SVGFESpotLightElementProps | null>;
export function svg(tagName: "fetile", className?: string): VNode<SVGFETileElementProps | null>;
export function svg(tagName: "feturbulence", className?: string): VNode<SVGFETurbulenceElementProps | null>;
export function svg(tagName: "filter", className?: string): VNode<SVGFilterElementProps | null>;
export function svg(tagName: "foreignobject", className?: string): VNode<SVGForeignObjectElementProps | null>;
export function svg(tagName: "g", className?: string): VNode<SVGGElementProps | null>;
export function svg(tagName: "image", className?: string): VNode<SVGImageElementProps | null>;
export function svg(tagName: "line", className?: string): VNode<SVGLineElementProps | null>;
export function svg(tagName: "lineargradient", className?: string): VNode<SVGLinearGradientElementProps | null>;
export function svg(tagName: "marker", className?: string): VNode<SVGMarkerElementProps | null>;
export function svg(tagName: "mask", className?: string): VNode<SVGMaskElementProps | null>;
export function svg(tagName: "metadata", className?: string): VNode<SVGMetadataElementProps | null>;
export function svg(tagName: "path", className?: string): VNode<SVGPathElementProps | null>;
export function svg(tagName: "pattern", className?: string): VNode<SVGPatternElementProps | null>;
export function svg(tagName: "polygon", className?: string): VNode<SVGPolygonElementProps | null>;
export function svg(tagName: "polyline", className?: string): VNode<SVGPolylineElementProps | null>;
export function svg(tagName: "radialgradient", className?: string): VNode<SVGRadialGradientElementProps | null>;
export function svg(tagName: "rect", className?: string): VNode<SVGRectElementProps | null>;
export function svg(tagName: "stop", className?: string): VNode<SVGStopElementProps | null>;
export function svg(tagName: "svg", className?: string): VNode<SVGSVGElementProps | null>;
export function svg(tagName: "switch", className?: string): VNode<SVGSwitchElementProps | null>;
export function svg(tagName: "symbol", className?: string): VNode<SVGSymbolElementProps | null>;
export function svg(tagName: "text", className?: string): VNode<SVGTextElementProps | null>;
export function svg(tagName: "textpath", className?: string): VNode<SVGTextPathElementProps | null>;
export function svg(tagName: "tspan", className?: string): VNode<SVGTSpanElementProps | null>;
export function svg(tagName: "use", className?: string): VNode<SVGUseElementProps | null>;
export function svg(tagName: "view", className?: string): VNode<SVGViewElementProps | null>;
export function svg(tagName: SVGTagType, className?: string): VNode<SVGElementProps | null> {
    return new VNode<SVGElementProps | null>(
        VNodeFlags.Element | VNodeFlags.SvgElement,
        tagName,
        null,
        className === undefined ? null : className,
        null);
}

/**
 * Create a VNode representing an HTMLInputElement node.
 *
 * @param type Input Element type. When type param has value "textarea", HTMLTextAreaElement will be created.
 * @param className Class name.
 * @returns VNodeBuilder object.
 */
export function input(type: "textarea", className?: string): VNode<HTMLTextAreaElementProps | null>;
export function input(type: "button", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "checkbox", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "color", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "date", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "datetime", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "datetime-local", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "email", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "file", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "hidden", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "image", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "month", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "number", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "password", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "radio", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "range", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "reset", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "search", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "submit", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "tel", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "text", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "time", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "url", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: "week", className?: string): VNode<HTMLInputElementProps | null>;
export function input(type: InputType, className?: string): VNode<HTMLInputElementProps | null> {
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
export function media(tagName: "audio", className?: string): VNode<HTMLAudioElementProps | null>;
export function media(tagName: "video", className?: string): VNode<HTMLVideoElementProps | null>;
export function media(tagName: MediaTagType, className?: string): VNode<HTMLMediaElementProps | null> {
    return new VNode<HTMLMediaElementProps | null>(
        VNodeFlags.Element | VNodeFlags.MediaElement,
        tagName,
        null,
        className === undefined ? null : className,
        null);
}
/* tslint:enable:max-line-length unified-signatures */
