import {
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
  HTMLTrackElementProps, HTMLUListElementProps, HTMLUnknownElementProps, HTMLVideoElementProps,
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
  SVGSVGElementProps, SVGSymbolElementProps, SVGTextElementProps, SVGTextPathElementProps,
  SVGTSpanElementProps, SVGViewElementProps, SVGUseElementProps,
} from "ivi-core";
import { VNode, VNodeFlags } from "ivi";

/**
 * Create a VNode representing a Text node.
 *
 * @param content Text content.
 * @returns VNode object.
 */
export function t(content: string | number | null): VNode<null> {
  return new VNode<null>(VNodeFlags.Text, null, null, null, content);
}

// HTML Elements:
export function a(className?: string): VNode<HTMLAnchorElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "a",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function abbr(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "abbr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function acronym(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "acronym",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function address(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "address",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function applet(className?: string): VNode<HTMLAppletElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "applet",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function area(className?: string): VNode<HTMLAreaElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "area",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function article(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "article",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function aside(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "aside",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function b(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "b",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function base(className?: string): VNode<HTMLBaseElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "base",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function basefont(className?: string): VNode<HTMLBaseFontElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "basefont",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function bdo(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "bdo",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function big(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "big",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function blockquote(className?: string): VNode<HTMLQuoteElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "blockquote",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function body(className?: string): VNode<HTMLBodyElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "body",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function br(className?: string): VNode<HTMLBRElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "br",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function button(className?: string): VNode<HTMLButtonElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "button",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function canvas(className?: string): VNode<HTMLCanvasElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "canvas",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function caption(className?: string): VNode<HTMLTableCaptionElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "caption",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function center(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "center",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function cite(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "cite",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function code(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "code",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function col(className?: string): VNode<HTMLTableColElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "col",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function colgroup(className?: string): VNode<HTMLTableColElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "colgroup",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function datalist(className?: string): VNode<HTMLDataListElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "datalist",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dd(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "dd",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function del(className?: string): VNode<HTMLModElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "del",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dfn(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "dfn",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dir(className?: string): VNode<HTMLDirectoryElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "dir",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function div(className?: string): VNode<HTMLDivElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "div",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dl(className?: string): VNode<HTMLDListElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "dl",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dt(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "dt",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function em(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "em",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function embed(className?: string): VNode<HTMLEmbedElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "embed",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fieldset(className?: string): VNode<HTMLFieldSetElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "fieldset",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function figcaption(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "figcaption",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function figure(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "figure",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function font(className?: string): VNode<HTMLFontElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "font",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function footer(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "footer",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function form(className?: string): VNode<HTMLFormElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "form",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function frame(className?: string): VNode<HTMLFrameElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "frame",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function frameset(className?: string): VNode<HTMLFrameSetElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "frameset",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h1(className?: string): VNode<HTMLHeadingElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "h1",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h2(className?: string): VNode<HTMLHeadingElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "h2",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h3(className?: string): VNode<HTMLHeadingElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "h3",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h4(className?: string): VNode<HTMLHeadingElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "h4",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h5(className?: string): VNode<HTMLHeadingElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "h5",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h6(className?: string): VNode<HTMLHeadingElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "h6",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function head(className?: string): VNode<HTMLHeadElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "head",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function header(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "header",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function hgroup(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "hgroup",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function hr(className?: string): VNode<HTMLHRElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "hr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function html(className?: string): VNode<HTMLHtmlElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "html",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function i(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "i",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function iframe(className?: string): VNode<HTMLIFrameElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "iframe",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function img(className?: string): VNode<HTMLImageElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "img",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function ins(className?: string): VNode<HTMLModElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "ins",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function isindex(className?: string): VNode<HTMLUnknownElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "isindex",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function kbd(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "kbd",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function keygen(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "keygen",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function label(className?: string): VNode<HTMLLabelElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "label",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function legend(className?: string): VNode<HTMLLegendElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "legend",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function li(className?: string): VNode<HTMLLIElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "li",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function link(className?: string): VNode<HTMLLinkElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "link",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function listing(className?: string): VNode<HTMLPreElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "listing",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function main(className?: string): VNode<HTMLMapElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "main",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function map(className?: string): VNode<HTMLMapElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "map",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function mark(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "mark",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function menu(className?: string): VNode<HTMLMenuElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "menu",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function meta(className?: string): VNode<HTMLMetaElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "meta",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function meter(className?: string): VNode<HTMLMeterElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "meter",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function nav(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "nav",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function nextid(className?: string): VNode<HTMLUnknownElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "nextid",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function nobr(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "nobr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function noframes(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "noframes",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function noscript(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "noscript",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function object(className?: string): VNode<HTMLObjectElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "object",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function ol(className?: string): VNode<HTMLOListElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "ol",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function optgroup(className?: string): VNode<HTMLOptGroupElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "optgroup",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function option(className?: string): VNode<HTMLOptionElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "option",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function p(className?: string): VNode<HTMLParagraphElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "p",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function param(className?: string): VNode<HTMLParamElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "param",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function picture(className?: string): VNode<HTMLPictureElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "picture",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function plaintext(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "plaintext",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function pre(className?: string): VNode<HTMLPreElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "pre",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function progress(className?: string): VNode<HTMLProgressElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "progress",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function q(className?: string): VNode<HTMLQuoteElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "q",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function rt(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "rt",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function ruby(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "ruby",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function s(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "s",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function samp(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "samp",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function script(className?: string): VNode<HTMLScriptElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "script",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function section(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "section",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function select(className?: string): VNode<HTMLSelectElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "select",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function small(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "small",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function source(className?: string): VNode<HTMLSourceElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "source",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function span(className?: string): VNode<HTMLSpanElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "span",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function strike(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "strike",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function strong(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "strong",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function style(className?: string): VNode<HTMLStyleElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "style",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function sub(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "sub",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function sup(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "sup",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function table(className?: string): VNode<HTMLTableElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "table",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function tbody(className?: string): VNode<HTMLTableSectionElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "tbody",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function td(className?: string): VNode<HTMLTableDataCellElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "td",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function template(className?: string): VNode<HTMLTemplateElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "template",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function tfoot(className?: string): VNode<HTMLTableSectionElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "tfoot",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function th(className?: string): VNode<HTMLTableHeaderCellElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "th",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function thead(className?: string): VNode<HTMLTableSectionElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "thead",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function title(className?: string): VNode<HTMLTitleElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "title",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function tr(className?: string): VNode<HTMLTableRowElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "tr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function track(className?: string): VNode<HTMLTrackElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "track",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function tt(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "tt",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function u(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "u",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function ul(className?: string): VNode<HTMLUListElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "ul",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function wbr(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement,
    "wbr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function x_ms_webview(className?: string): VNode<MSHTMLWebViewElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "x-ms-webview",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function xmp(className?: string): VNode<HTMLPreElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "xmp",
    null,
    className === undefined ? null : className,
    null,
  );
}

// SVG Elements:
export function circle(className?: string): VNode<SVGCircleElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "circle",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function clippath(className?: string): VNode<SVGClipPathElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "clippath",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function defs(className?: string): VNode<SVGDefsElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "defs",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function desc(className?: string): VNode<SVGDescElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "desc",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function ellipse(className?: string): VNode<SVGEllipseElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "ellipse",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function feblend(className?: string): VNode<SVGFEBlendElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feblend",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fecolormatrix(className?: string): VNode<SVGFEColorMatrixElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fecolormatrix",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fecomponenttransfer(className?: string): VNode<SVGFEComponentTransferElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fecomponenttransfer",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fecomposite(className?: string): VNode<SVGFECompositeElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fecomposite",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function feconvolvematrix(className?: string): VNode<SVGFEConvolveMatrixElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feconvolvematrix",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fediffuselighting(className?: string): VNode<SVGFEDiffuseLightingElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fediffuselighting",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fedisplacementmap(className?: string): VNode<SVGFEDisplacementMapElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fedisplacementmap",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fedistantlight(className?: string): VNode<SVGFEDistantLightElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fedistantlight",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function feflood(className?: string): VNode<SVGFEFloodElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feflood",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fefunca(className?: string): VNode<SVGFEFuncAElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fefunca",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fefuncb(className?: string): VNode<SVGFEFuncBElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fefuncb",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fefuncg(className?: string): VNode<SVGFEFuncGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fefuncg",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fefuncr(className?: string): VNode<SVGFEFuncRElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fefuncr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fegaussianblur(className?: string): VNode<SVGFEGaussianBlurElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fegaussianblur",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function feimage(className?: string): VNode<SVGFEImageElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feimage",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function femerge(className?: string): VNode<SVGFEMergeElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "femerge",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function femergenode(className?: string): VNode<SVGFEMergeNodeElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "femergenode",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function femorphology(className?: string): VNode<SVGFEMorphologyElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "femorphology",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function feoffset(className?: string): VNode<SVGFEOffsetElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feoffset",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fepointlight(className?: string): VNode<SVGFEPointLightElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fepointlight",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fespecularlighting(className?: string): VNode<SVGFESpecularLightingElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fespecularlighting",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fespotlight(className?: string): VNode<SVGFESpotLightElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fespotlight",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fetile(className?: string): VNode<SVGFETileElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fetile",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function feturbulence(className?: string): VNode<SVGFETurbulenceElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feturbulence",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function filter(className?: string): VNode<SVGFilterElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "filter",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function foreignobject(className?: string): VNode<SVGForeignObjectElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "foreignobject",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function g(className?: string): VNode<SVGGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "g",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function image(className?: string): VNode<SVGImageElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "image",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function line(className?: string): VNode<SVGLineElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "line",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function lineargradient(className?: string): VNode<SVGLinearGradientElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "lineargradient",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function marker(className?: string): VNode<SVGMarkerElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "marker",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function mask(className?: string): VNode<SVGMaskElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "mask",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function metadata(className?: string): VNode<SVGMetadataElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "metadata",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function path(className?: string): VNode<SVGPathElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "path",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function pattern(className?: string): VNode<SVGPatternElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "pattern",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function polygon(className?: string): VNode<SVGPolygonElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "polygon",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function polyline(className?: string): VNode<SVGPolylineElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "polyline",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function radialgradient(className?: string): VNode<SVGRadialGradientElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "radialgradient",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function rect(className?: string): VNode<SVGRectElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "rect",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function stop(className?: string): VNode<SVGStopElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "stop",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function svg(className?: string): VNode<SVGSVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "svg",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function symbol(className?: string): VNode<SVGSymbolElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "symbol",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function text(className?: string): VNode<SVGTextElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "text",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function textpath(className?: string): VNode<SVGTextPathElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "textpath",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function tspan(className?: string): VNode<SVGTSpanElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "tspan",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function use(className?: string): VNode<SVGUseElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "use",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function view(className?: string): VNode<SVGViewElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "view",
    null,
    className === undefined ? null : className,
    null,
  );
}

// Textarea / Input Elements:
export function textarea(className?: string): VNode<HTMLTextAreaElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.TextAreaElement,
    "textarea",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputButton(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "button",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputCheckbox(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "checkbox",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputColor(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "color",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputDate(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "date",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputDatetime(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "datetime",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputDatetimeLocal(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "datetime-local",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputEmail(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "email",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputFile(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "file",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputHidden(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "hidden",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputImage(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "image",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputMonth(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "month",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputNumber(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "number",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputPassword(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "password",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputRadio(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "radio",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputRange(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "range",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputReset(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "reset",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputSearch(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "search",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputSubmit(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "submit",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputTel(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "tel",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputText(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "text",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputTime(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "time",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputUrl(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "url",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputWeek(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    "week",
    null,
    className === undefined ? null : className,
    null,
  );
}

// Media Elements:
export function audio(className?: string): VNode<HTMLAudioElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.MediaElement,
    "audio",
    null,
    className === undefined ? null : className,
    null);

}

export function video(className?: string): VNode<HTMLVideoElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.MediaElement,
    "video",
    null,
    className === undefined ? null : className,
    null);
}
