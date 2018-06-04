import {
  HTMLAnchorElementProps, HTMLElementProps, HTMLAreaElementProps, HTMLAudioElementProps,
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
  HTMLTrackElementProps, HTMLUListElementProps, HTMLVideoElementProps,
  CSSStyleProps,
} from "ivi-core";
import { VNode, VNodeFlags } from "ivi";

const enum TagId {
  A = 1,
  Abbr = 2,
  Acronym = 3,
  Address = 4,
  Area = 5,
  Article = 6,
  Aside = 7,
  B = 8,
  Base = 9,
  Basefont = 10,
  Bdo = 11,
  Big = 12,
  Blockquote = 13,
  Body = 14,
  Br = 15,
  Button = 16,
  Canvas = 17,
  Caption = 18,
  Center = 19,
  Cite = 20,
  Code = 21,
  Col = 22,
  Colgroup = 23,
  Data = 24,
  Datalist = 25,
  Dd = 26,
  Del = 27,
  Dfn = 28,
  Dir = 29,
  Div = 30,
  Dl = 31,
  Dt = 32,
  Em = 33,
  Embed = 34,
  Fieldset = 35,
  Figcaption = 36,
  Figure = 37,
  Font = 38,
  Footer = 39,
  Form = 40,
  Frame = 41,
  Frameset = 42,
  H1 = 43,
  H2 = 44,
  H3 = 45,
  H4 = 46,
  H5 = 47,
  H6 = 48,
  Head = 49,
  Header = 50,
  Hgroup = 51,
  Hr = 52,
  Html = 53,
  I = 54,
  Iframe = 55,
  Img = 56,
  Input = 57,
  Ins = 58,
  Kbd = 59,
  Label = 60,
  Legend = 61,
  Li = 62,
  Link = 63,
  Listing = 64,
  Main = 65,
  Map = 66,
  Mark = 67,
  Menu = 68,
  Meta = 69,
  Meter = 70,
  Nav = 71,
  Nobr = 72,
  Noframes = 73,
  Noscript = 74,
  Object = 75,
  Ol = 76,
  Optgroup = 77,
  Option = 78,
  P = 79,
  Param = 80,
  Picture = 81,
  Plaintext = 82,
  Pre = 83,
  Progress = 84,
  Q = 85,
  Rt = 86,
  Ruby = 87,
  S = 88,
  Samp = 89,
  Script = 90,
  Section = 91,
  Select = 92,
  Small = 93,
  Source = 94,
  Span = 95,
  Strike = 96,
  Strong = 97,
  Style = 98,
  Sub = 99,
  Sup = 100,
  Table = 101,
  Tbody = 102,
  Td = 103,
  Template = 104,
  Textarea = 105,
  Tfoot = 106,
  Th = 107,
  Thead = 108,
  Time = 109,
  Title = 110,
  Tr = 111,
  Track = 112,
  Tt = 113,
  U = 114,
  Ul = 115,
  Wbr = 116,
  Xmp = 117,
  Audio = 118,
  Video = 119,
}

/**
 * Create a VNode representing a Text node.
 *
 * @param content Text content.
 * @returns VNode object.
 */
export function t(content: string | number): VNode<string | number, Text> {
  return new VNode(VNodeFlags.Text, null, content, "", void 0);
}

/* tslint:disable:max-line-length */

export function a(className?: string, attrs?: HTMLAnchorElementProps, css?: CSSStyleProps): VNode<HTMLAnchorElementProps | undefined, HTMLAnchorElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function abbr(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Abbr << VNodeFlags.ElementIdOffset),
    "abbr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function acronym(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Acronym << VNodeFlags.ElementIdOffset),
    "acronym",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function address(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Address << VNodeFlags.ElementIdOffset),
    "address",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function area(className?: string, attrs?: HTMLAreaElementProps, css?: CSSStyleProps): VNode<HTMLAreaElementProps | undefined, HTMLAreaElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Area << VNodeFlags.ElementIdOffset),
    "area",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function article(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Article << VNodeFlags.ElementIdOffset),
    "article",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function aside(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Aside << VNodeFlags.ElementIdOffset),
    "aside",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function b(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.B << VNodeFlags.ElementIdOffset),
    "b",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function base(className?: string, attrs?: HTMLBaseElementProps, css?: CSSStyleProps): VNode<HTMLBaseElementProps | undefined, HTMLBaseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Base << VNodeFlags.ElementIdOffset),
    "base",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function basefont(className?: string, attrs?: HTMLBaseFontElementProps, css?: CSSStyleProps): VNode<HTMLBaseFontElementProps | undefined, HTMLBaseFontElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Basefont << VNodeFlags.ElementIdOffset),
    "basefont",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function bdo(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Bdo << VNodeFlags.ElementIdOffset),
    "bdo",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function big(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Big << VNodeFlags.ElementIdOffset),
    "big",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function blockquote(className?: string, attrs?: HTMLQuoteElementProps, css?: CSSStyleProps): VNode<HTMLQuoteElementProps | undefined, HTMLQuoteElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Blockquote << VNodeFlags.ElementIdOffset),
    "blockquote",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function body(className?: string, attrs?: HTMLBodyElementProps, css?: CSSStyleProps): VNode<HTMLBodyElementProps | undefined, HTMLBodyElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Body << VNodeFlags.ElementIdOffset),
    "body",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function br(className?: string, attrs?: HTMLBRElementProps, css?: CSSStyleProps): VNode<HTMLBRElementProps | undefined, HTMLBRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Br << VNodeFlags.ElementIdOffset),
    "br",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function button(className?: string, attrs?: HTMLButtonElementProps, css?: CSSStyleProps): VNode<HTMLButtonElementProps | undefined, HTMLButtonElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Button << VNodeFlags.ElementIdOffset),
    "button",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function canvas(className?: string, attrs?: HTMLCanvasElementProps, css?: CSSStyleProps): VNode<HTMLCanvasElementProps | undefined, HTMLCanvasElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Canvas << VNodeFlags.ElementIdOffset),
    "canvas",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function caption(className?: string, attrs?: HTMLTableCaptionElementProps, css?: CSSStyleProps): VNode<HTMLTableCaptionElementProps | undefined, HTMLTableCaptionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Caption << VNodeFlags.ElementIdOffset),
    "caption",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function center(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Center << VNodeFlags.ElementIdOffset),
    "center",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function cite(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Cite << VNodeFlags.ElementIdOffset),
    "cite",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function code(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Code << VNodeFlags.ElementIdOffset),
    "code",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function col(className?: string, attrs?: HTMLTableColElementProps, css?: CSSStyleProps): VNode<HTMLTableColElementProps | undefined, HTMLTableColElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Col << VNodeFlags.ElementIdOffset),
    "col",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function colgroup(className?: string, attrs?: HTMLTableColElementProps, css?: CSSStyleProps): VNode<HTMLTableColElementProps | undefined, HTMLTableColElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Colgroup << VNodeFlags.ElementIdOffset),
    "colgroup",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function data(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Data << VNodeFlags.ElementIdOffset),
    "data",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function datalist(className?: string, attrs?: HTMLDataListElementProps, css?: CSSStyleProps): VNode<HTMLDataListElementProps | undefined, HTMLDataListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Datalist << VNodeFlags.ElementIdOffset),
    "datalist",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function dd(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dd << VNodeFlags.ElementIdOffset),
    "dd",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function del(className?: string, attrs?: HTMLModElementProps, css?: CSSStyleProps): VNode<HTMLModElementProps | undefined, HTMLModElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Del << VNodeFlags.ElementIdOffset),
    "del",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function dfn(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dfn << VNodeFlags.ElementIdOffset),
    "dfn",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function dir(className?: string, attrs?: HTMLDirectoryElementProps, css?: CSSStyleProps): VNode<HTMLDirectoryElementProps | undefined, HTMLDirectoryElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dir << VNodeFlags.ElementIdOffset),
    "dir",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function div(className?: string, attrs?: HTMLDivElementProps, css?: CSSStyleProps): VNode<HTMLDivElementProps | undefined, HTMLDivElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Div << VNodeFlags.ElementIdOffset),
    "div",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function dl(className?: string, attrs?: HTMLDListElementProps, css?: CSSStyleProps): VNode<HTMLDListElementProps | undefined, HTMLDListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dl << VNodeFlags.ElementIdOffset),
    "dl",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function dt(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dt << VNodeFlags.ElementIdOffset),
    "dt",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function em(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Em << VNodeFlags.ElementIdOffset),
    "em",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function embed(className?: string, attrs?: HTMLEmbedElementProps, css?: CSSStyleProps): VNode<HTMLEmbedElementProps | undefined, HTMLEmbedElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Embed << VNodeFlags.ElementIdOffset),
    "embed",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function fieldset(className?: string, attrs?: HTMLFieldSetElementProps, css?: CSSStyleProps): VNode<HTMLFieldSetElementProps | undefined, HTMLFieldSetElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Fieldset << VNodeFlags.ElementIdOffset),
    "fieldset",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function figcaption(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Figcaption << VNodeFlags.ElementIdOffset),
    "figcaption",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function figure(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Figure << VNodeFlags.ElementIdOffset),
    "figure",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function font(className?: string, attrs?: HTMLFontElementProps, css?: CSSStyleProps): VNode<HTMLFontElementProps | undefined, HTMLFontElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Font << VNodeFlags.ElementIdOffset),
    "font",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function footer(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Footer << VNodeFlags.ElementIdOffset),
    "footer",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function form(className?: string, attrs?: HTMLFormElementProps, css?: CSSStyleProps): VNode<HTMLFormElementProps | undefined, HTMLFormElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Form << VNodeFlags.ElementIdOffset),
    "form",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function frame(className?: string, attrs?: HTMLFrameElementProps, css?: CSSStyleProps): VNode<HTMLFrameElementProps | undefined, HTMLFrameElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Frame << VNodeFlags.ElementIdOffset),
    "frame",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function frameset(className?: string, attrs?: HTMLFrameSetElementProps, css?: CSSStyleProps): VNode<HTMLFrameSetElementProps | undefined, HTMLFrameSetElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Frameset << VNodeFlags.ElementIdOffset),
    "frameset",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h1(className?: string, attrs?: HTMLHeadingElementProps, css?: CSSStyleProps): VNode<HTMLHeadingElementProps | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H1 << VNodeFlags.ElementIdOffset),
    "h1",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h2(className?: string, attrs?: HTMLHeadingElementProps, css?: CSSStyleProps): VNode<HTMLHeadingElementProps | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H2 << VNodeFlags.ElementIdOffset),
    "h2",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h3(className?: string, attrs?: HTMLHeadingElementProps, css?: CSSStyleProps): VNode<HTMLHeadingElementProps | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H3 << VNodeFlags.ElementIdOffset),
    "h3",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h4(className?: string, attrs?: HTMLHeadingElementProps, css?: CSSStyleProps): VNode<HTMLHeadingElementProps | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H4 << VNodeFlags.ElementIdOffset),
    "h4",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h5(className?: string, attrs?: HTMLHeadingElementProps, css?: CSSStyleProps): VNode<HTMLHeadingElementProps | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H5 << VNodeFlags.ElementIdOffset),
    "h5",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h6(className?: string, attrs?: HTMLHeadingElementProps, css?: CSSStyleProps): VNode<HTMLHeadingElementProps | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H6 << VNodeFlags.ElementIdOffset),
    "h6",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function head(className?: string, attrs?: HTMLHeadElementProps, css?: CSSStyleProps): VNode<HTMLHeadElementProps | undefined, HTMLHeadElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Head << VNodeFlags.ElementIdOffset),
    "head",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function header(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Header << VNodeFlags.ElementIdOffset),
    "header",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function hgroup(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Hgroup << VNodeFlags.ElementIdOffset),
    "hgroup",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function hr(className?: string, attrs?: HTMLHRElementProps, css?: CSSStyleProps): VNode<HTMLHRElementProps | undefined, HTMLHRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Hr << VNodeFlags.ElementIdOffset),
    "hr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function html(className?: string, attrs?: HTMLHtmlElementProps, css?: CSSStyleProps): VNode<HTMLHtmlElementProps | undefined, HTMLHtmlElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Html << VNodeFlags.ElementIdOffset),
    "html",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function i(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.I << VNodeFlags.ElementIdOffset),
    "i",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function iframe(className?: string, attrs?: HTMLIFrameElementProps, css?: CSSStyleProps): VNode<HTMLIFrameElementProps | undefined, HTMLIFrameElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Iframe << VNodeFlags.ElementIdOffset),
    "iframe",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function img(className?: string, attrs?: HTMLImageElementProps, css?: CSSStyleProps): VNode<HTMLImageElementProps | undefined, HTMLImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Img << VNodeFlags.ElementIdOffset),
    "img",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function ins(className?: string, attrs?: HTMLModElementProps, css?: CSSStyleProps): VNode<HTMLModElementProps | undefined, HTMLModElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ins << VNodeFlags.ElementIdOffset),
    "ins",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function kbd(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Kbd << VNodeFlags.ElementIdOffset),
    "kbd",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function label(className?: string, attrs?: HTMLLabelElementProps, css?: CSSStyleProps): VNode<HTMLLabelElementProps | undefined, HTMLLabelElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Label << VNodeFlags.ElementIdOffset),
    "label",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function legend(className?: string, attrs?: HTMLLegendElementProps, css?: CSSStyleProps): VNode<HTMLLegendElementProps | undefined, HTMLLegendElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Legend << VNodeFlags.ElementIdOffset),
    "legend",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function li(className?: string, attrs?: HTMLLIElementProps, css?: CSSStyleProps): VNode<HTMLLIElementProps | undefined, HTMLLIElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Li << VNodeFlags.ElementIdOffset),
    "li",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function link(className?: string, attrs?: HTMLLinkElementProps, css?: CSSStyleProps): VNode<HTMLLinkElementProps | undefined, HTMLLinkElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Link << VNodeFlags.ElementIdOffset),
    "link",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function listing(className?: string, attrs?: HTMLPreElementProps, css?: CSSStyleProps): VNode<HTMLPreElementProps | undefined, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Listing << VNodeFlags.ElementIdOffset),
    "listing",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function main(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Main << VNodeFlags.ElementIdOffset),
    "main",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function map(className?: string, attrs?: HTMLMapElementProps, css?: CSSStyleProps): VNode<HTMLMapElementProps | undefined, HTMLMapElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Map << VNodeFlags.ElementIdOffset),
    "map",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function mark(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Mark << VNodeFlags.ElementIdOffset),
    "mark",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function menu(className?: string, attrs?: HTMLMenuElementProps, css?: CSSStyleProps): VNode<HTMLMenuElementProps | undefined, HTMLMenuElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Menu << VNodeFlags.ElementIdOffset),
    "menu",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function meta(className?: string, attrs?: HTMLMetaElementProps, css?: CSSStyleProps): VNode<HTMLMetaElementProps | undefined, HTMLMetaElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Meta << VNodeFlags.ElementIdOffset),
    "meta",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function meter(className?: string, attrs?: HTMLMeterElementProps, css?: CSSStyleProps): VNode<HTMLMeterElementProps | undefined, HTMLMeterElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Meter << VNodeFlags.ElementIdOffset),
    "meter",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function nav(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Nav << VNodeFlags.ElementIdOffset),
    "nav",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function nobr(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Nobr << VNodeFlags.ElementIdOffset),
    "nobr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function noframes(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Noframes << VNodeFlags.ElementIdOffset),
    "noframes",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function noscript(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Noscript << VNodeFlags.ElementIdOffset),
    "noscript",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function object(className?: string, attrs?: HTMLObjectElementProps, css?: CSSStyleProps): VNode<HTMLObjectElementProps | undefined, HTMLObjectElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Object << VNodeFlags.ElementIdOffset),
    "object",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function ol(className?: string, attrs?: HTMLOListElementProps, css?: CSSStyleProps): VNode<HTMLOListElementProps | undefined, HTMLOListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ol << VNodeFlags.ElementIdOffset),
    "ol",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function optgroup(className?: string, attrs?: HTMLOptGroupElementProps, css?: CSSStyleProps): VNode<HTMLOptGroupElementProps | undefined, HTMLOptGroupElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Optgroup << VNodeFlags.ElementIdOffset),
    "optgroup",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function option(className?: string, attrs?: HTMLOptionElementProps, css?: CSSStyleProps): VNode<HTMLOptionElementProps | undefined, HTMLOptionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Option << VNodeFlags.ElementIdOffset),
    "option",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function p(className?: string, attrs?: HTMLParagraphElementProps, css?: CSSStyleProps): VNode<HTMLParagraphElementProps | undefined, HTMLParagraphElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.P << VNodeFlags.ElementIdOffset),
    "p",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function param(className?: string, attrs?: HTMLParamElementProps, css?: CSSStyleProps): VNode<HTMLParamElementProps | undefined, HTMLParamElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Param << VNodeFlags.ElementIdOffset),
    "param",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function picture(className?: string, attrs?: HTMLPictureElementProps, css?: CSSStyleProps): VNode<HTMLPictureElementProps | undefined, HTMLPictureElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Picture << VNodeFlags.ElementIdOffset),
    "picture",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function plaintext(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Plaintext << VNodeFlags.ElementIdOffset),
    "plaintext",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function pre(className?: string, attrs?: HTMLPreElementProps, css?: CSSStyleProps): VNode<HTMLPreElementProps | undefined, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Pre << VNodeFlags.ElementIdOffset),
    "pre",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function progress(className?: string, attrs?: HTMLProgressElementProps, css?: CSSStyleProps): VNode<HTMLProgressElementProps | undefined, HTMLProgressElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Progress << VNodeFlags.ElementIdOffset),
    "progress",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function q(className?: string, attrs?: HTMLQuoteElementProps, css?: CSSStyleProps): VNode<HTMLQuoteElementProps | undefined, HTMLQuoteElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Q << VNodeFlags.ElementIdOffset),
    "q",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function rt(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Rt << VNodeFlags.ElementIdOffset),
    "rt",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function ruby(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ruby << VNodeFlags.ElementIdOffset),
    "ruby",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function s(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.S << VNodeFlags.ElementIdOffset),
    "s",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function samp(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Samp << VNodeFlags.ElementIdOffset),
    "samp",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function script(className?: string, attrs?: HTMLScriptElementProps, css?: CSSStyleProps): VNode<HTMLScriptElementProps | undefined, HTMLScriptElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Script << VNodeFlags.ElementIdOffset),
    "script",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function section(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Section << VNodeFlags.ElementIdOffset),
    "section",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function select(className?: string, attrs?: HTMLSelectElementProps, css?: CSSStyleProps): VNode<HTMLSelectElementProps | undefined, HTMLSelectElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Select << VNodeFlags.ElementIdOffset),
    "select",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function small(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Small << VNodeFlags.ElementIdOffset),
    "small",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function source(className?: string, attrs?: HTMLSourceElementProps, css?: CSSStyleProps): VNode<HTMLSourceElementProps | undefined, HTMLSourceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Source << VNodeFlags.ElementIdOffset),
    "source",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function span(className?: string, attrs?: HTMLSpanElementProps, css?: CSSStyleProps): VNode<HTMLSpanElementProps | undefined, HTMLSpanElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Span << VNodeFlags.ElementIdOffset),
    "span",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function strike(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Strike << VNodeFlags.ElementIdOffset),
    "strike",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function strong(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Strong << VNodeFlags.ElementIdOffset),
    "strong",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function style(className?: string, attrs?: HTMLStyleElementProps, css?: CSSStyleProps): VNode<HTMLStyleElementProps | undefined, HTMLStyleElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Style << VNodeFlags.ElementIdOffset),
    "style",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function sub(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Sub << VNodeFlags.ElementIdOffset),
    "sub",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function sup(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Sup << VNodeFlags.ElementIdOffset),
    "sup",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function table(className?: string, attrs?: HTMLTableElementProps, css?: CSSStyleProps): VNode<HTMLTableElementProps | undefined, HTMLTableElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Table << VNodeFlags.ElementIdOffset),
    "table",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function tbody(className?: string, attrs?: HTMLTableSectionElementProps, css?: CSSStyleProps): VNode<HTMLTableSectionElementProps | undefined, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tbody << VNodeFlags.ElementIdOffset),
    "tbody",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function td(className?: string, attrs?: HTMLTableDataCellElementProps, css?: CSSStyleProps): VNode<HTMLTableDataCellElementProps | undefined, HTMLTableDataCellElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Td << VNodeFlags.ElementIdOffset),
    "td",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function template(className?: string, attrs?: HTMLTemplateElementProps, css?: CSSStyleProps): VNode<HTMLTemplateElementProps | undefined, HTMLTemplateElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Template << VNodeFlags.ElementIdOffset),
    "template",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function tfoot(className?: string, attrs?: HTMLTableSectionElementProps, css?: CSSStyleProps): VNode<HTMLTableSectionElementProps | undefined, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tfoot << VNodeFlags.ElementIdOffset),
    "tfoot",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function th(className?: string, attrs?: HTMLTableHeaderCellElementProps, css?: CSSStyleProps): VNode<HTMLTableHeaderCellElementProps | undefined, HTMLTableHeaderCellElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Th << VNodeFlags.ElementIdOffset),
    "th",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function thead(className?: string, attrs?: HTMLTableSectionElementProps, css?: CSSStyleProps): VNode<HTMLTableSectionElementProps | undefined, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Thead << VNodeFlags.ElementIdOffset),
    "thead",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function time(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Time << VNodeFlags.ElementIdOffset),
    "time",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function title(className?: string, attrs?: HTMLTitleElementProps, css?: CSSStyleProps): VNode<HTMLTitleElementProps | undefined, HTMLTitleElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function tr(className?: string, attrs?: HTMLTableRowElementProps, css?: CSSStyleProps): VNode<HTMLTableRowElementProps | undefined, HTMLTableRowElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tr << VNodeFlags.ElementIdOffset),
    "tr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function track(className?: string, attrs?: HTMLTrackElementProps, css?: CSSStyleProps): VNode<HTMLTrackElementProps | undefined, HTMLTrackElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Track << VNodeFlags.ElementIdOffset),
    "track",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function tt(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tt << VNodeFlags.ElementIdOffset),
    "tt",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function u(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.U << VNodeFlags.ElementIdOffset),
    "u",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function ul(className?: string, attrs?: HTMLUListElementProps, css?: CSSStyleProps): VNode<HTMLUListElementProps | undefined, HTMLUListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ul << VNodeFlags.ElementIdOffset),
    "ul",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function wbr(className?: string, attrs?: HTMLElementProps, css?: CSSStyleProps): VNode<HTMLElementProps | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Wbr << VNodeFlags.ElementIdOffset),
    "wbr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function xmp(className?: string, attrs?: HTMLPreElementProps, css?: CSSStyleProps): VNode<HTMLPreElementProps | undefined, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Xmp << VNodeFlags.ElementIdOffset),
    "xmp",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

// Textarea / Input Elements:
export function textarea(className?: string, attrs?: HTMLTextAreaElementProps, css?: CSSStyleProps): VNode<HTMLTextAreaElementProps | undefined, HTMLTextAreaElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.TextAreaElement | (TagId.Textarea << VNodeFlags.ElementIdOffset),
    "textarea",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function input(className?: string, attrs?: HTMLInputElementProps, css?: CSSStyleProps): VNode<HTMLInputElementProps | undefined, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.Input << VNodeFlags.ElementIdOffset),
    "input",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

// Media Elements:
export function audio(className?: string, attrs?: HTMLAudioElementProps, css?: CSSStyleProps): VNode<HTMLAudioElementProps | undefined, HTMLAudioElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.MediaElement | (TagId.Audio << VNodeFlags.ElementIdOffset),
    "audio",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function video(className?: string, attrs?: HTMLVideoElementProps, css?: CSSStyleProps): VNode<HTMLVideoElementProps | undefined, HTMLVideoElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.MediaElement | (TagId.Video << VNodeFlags.ElementIdOffset),
    "video",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
