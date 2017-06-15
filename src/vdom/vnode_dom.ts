import { isValidTag } from "../dev_mode/dom";
import { HTMLTagType, SVGTagType, MediaTagType, InputType } from "../common/dom";
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
} from "../common/dom_props";
import { VNodeFlags, ElementDescriptorFlags } from "./flags";
import { VNode } from "./vnode";
import { ElementDescriptor } from "./element_descriptor";

/**
 * Create a VNodeBuilder representing a Text node.
 *
 * @param content Text content.
 * @returns VNodeBuilder object.
 */
export function $t(content: string | number | boolean | null): VNode<null> {
    return new VNode<null>(VNodeFlags.Text, null, null, null, content);
}

/* tslint:disable:max-line-length unified-signatures */
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
/* tslint:enable:max-line-length unified-signatures */

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
            if ((d._flags & ElementDescriptorFlags.ProtectClassName) !== 0) {
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
