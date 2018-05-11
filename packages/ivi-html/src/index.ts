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
export function t(content: string | number | null): VNode<null, Text> {
  return new VNode(VNodeFlags.Text, null, null, void 0, content);
}

// HTML Elements:
export function a(className?: string): VNode<HTMLAnchorElementProps | null, HTMLAnchorElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    null,
    className,
    null,
  );
}
export function abbr(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Abbr << VNodeFlags.ElementIdOffset),
    "abbr",
    null,
    className,
    null,
  );
}
export function acronym(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Acronym << VNodeFlags.ElementIdOffset),
    "acronym",
    null,
    className,
    null,
  );
}
export function address(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Address << VNodeFlags.ElementIdOffset),
    "address",
    null,
    className,
    null,
  );
}
export function area(className?: string): VNode<HTMLAreaElementProps | null, HTMLAreaElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Area << VNodeFlags.ElementIdOffset),
    "area",
    null,
    className,
    null,
  );
}
export function article(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Article << VNodeFlags.ElementIdOffset),
    "article",
    null,
    className,
    null,
  );
}
export function aside(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Aside << VNodeFlags.ElementIdOffset),
    "aside",
    null,
    className,
    null,
  );
}
export function b(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.B << VNodeFlags.ElementIdOffset),
    "b",
    null,
    className,
    null,
  );
}
export function base(className?: string): VNode<HTMLBaseElementProps | null, HTMLBaseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Base << VNodeFlags.ElementIdOffset),
    "base",
    null,
    className,
    null,
  );
}
export function basefont(className?: string): VNode<HTMLBaseFontElementProps | null, HTMLBaseFontElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Basefont << VNodeFlags.ElementIdOffset),
    "basefont",
    null,
    className,
    null,
  );
}
export function bdo(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Bdo << VNodeFlags.ElementIdOffset),
    "bdo",
    null,
    className,
    null,
  );
}
export function big(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Big << VNodeFlags.ElementIdOffset),
    "big",
    null,
    className,
    null,
  );
}
export function blockquote(className?: string): VNode<HTMLQuoteElementProps | null, HTMLQuoteElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Blockquote << VNodeFlags.ElementIdOffset),
    "blockquote",
    null,
    className,
    null,
  );
}
export function body(className?: string): VNode<HTMLBodyElementProps | null, HTMLBodyElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Body << VNodeFlags.ElementIdOffset),
    "body",
    null,
    className,
    null,
  );
}
export function br(className?: string): VNode<HTMLBRElementProps | null, HTMLBRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Br << VNodeFlags.ElementIdOffset),
    "br",
    null,
    className,
    null,
  );
}
export function button(className?: string): VNode<HTMLButtonElementProps | null, HTMLButtonElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Button << VNodeFlags.ElementIdOffset),
    "button",
    null,
    className,
    null,
  );
}
export function canvas(className?: string): VNode<HTMLCanvasElementProps | null, HTMLCanvasElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Canvas << VNodeFlags.ElementIdOffset),
    "canvas",
    null,
    className,
    null,
  );
}
export function caption(className?: string): VNode<HTMLTableCaptionElementProps | null, HTMLTableCaptionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Caption << VNodeFlags.ElementIdOffset),
    "caption",
    null,
    className,
    null,
  );
}
export function center(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Center << VNodeFlags.ElementIdOffset),
    "center",
    null,
    className,
    null,
  );
}
export function cite(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Cite << VNodeFlags.ElementIdOffset),
    "cite",
    null,
    className,
    null,
  );
}
export function code(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Code << VNodeFlags.ElementIdOffset),
    "code",
    null,
    className,
    null,
  );
}
export function col(className?: string): VNode<HTMLTableColElementProps | null, HTMLTableColElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Col << VNodeFlags.ElementIdOffset),
    "col",
    null,
    className,
    null,
  );
}
export function colgroup(className?: string): VNode<HTMLTableColElementProps | null, HTMLTableColElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Colgroup << VNodeFlags.ElementIdOffset),
    "colgroup",
    null,
    className,
    null,
  );
}
export function data(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Data << VNodeFlags.ElementIdOffset),
    "data",
    null,
    className,
    null,
  );
}
export function datalist(className?: string): VNode<HTMLDataListElementProps | null, HTMLDataListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Datalist << VNodeFlags.ElementIdOffset),
    "datalist",
    null,
    className,
    null,
  );
}
export function dd(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dd << VNodeFlags.ElementIdOffset),
    "dd",
    null,
    className,
    null,
  );
}
export function del(className?: string): VNode<HTMLModElementProps | null, HTMLModElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Del << VNodeFlags.ElementIdOffset),
    "del",
    null,
    className,
    null,
  );
}
export function dfn(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dfn << VNodeFlags.ElementIdOffset),
    "dfn",
    null,
    className,
    null,
  );
}
export function dir(className?: string): VNode<HTMLDirectoryElementProps | null, HTMLDirectoryElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dir << VNodeFlags.ElementIdOffset),
    "dir",
    null,
    className,
    null,
  );
}
export function div(className?: string): VNode<HTMLDivElementProps | null, HTMLDivElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Div << VNodeFlags.ElementIdOffset),
    "div",
    null,
    className,
    null,
  );
}
export function dl(className?: string): VNode<HTMLDListElementProps | null, HTMLDListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dl << VNodeFlags.ElementIdOffset),
    "dl",
    null,
    className,
    null,
  );
}
export function dt(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dt << VNodeFlags.ElementIdOffset),
    "dt",
    null,
    className,
    null,
  );
}
export function em(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Em << VNodeFlags.ElementIdOffset),
    "em",
    null,
    className,
    null,
  );
}
export function embed(className?: string): VNode<HTMLEmbedElementProps | null, HTMLEmbedElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Embed << VNodeFlags.ElementIdOffset),
    "embed",
    null,
    className,
    null,
  );
}
export function fieldset(className?: string): VNode<HTMLFieldSetElementProps | null, HTMLFieldSetElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Fieldset << VNodeFlags.ElementIdOffset),
    "fieldset",
    null,
    className,
    null,
  );
}
export function figcaption(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Figcaption << VNodeFlags.ElementIdOffset),
    "figcaption",
    null,
    className,
    null,
  );
}
export function figure(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Figure << VNodeFlags.ElementIdOffset),
    "figure",
    null,
    className,
    null,
  );
}
export function font(className?: string): VNode<HTMLFontElementProps | null, HTMLFontElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Font << VNodeFlags.ElementIdOffset),
    "font",
    null,
    className,
    null,
  );
}
export function footer(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Footer << VNodeFlags.ElementIdOffset),
    "footer",
    null,
    className,
    null,
  );
}
export function form(className?: string): VNode<HTMLFormElementProps | null, HTMLFormElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Form << VNodeFlags.ElementIdOffset),
    "form",
    null,
    className,
    null,
  );
}
export function frame(className?: string): VNode<HTMLFrameElementProps | null, HTMLFrameElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Frame << VNodeFlags.ElementIdOffset),
    "frame",
    null,
    className,
    null,
  );
}
export function frameset(className?: string): VNode<HTMLFrameSetElementProps | null, HTMLFrameSetElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Frameset << VNodeFlags.ElementIdOffset),
    "frameset",
    null,
    className,
    null,
  );
}
export function h1(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H1 << VNodeFlags.ElementIdOffset),
    "h1",
    null,
    className,
    null,
  );
}
export function h2(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H2 << VNodeFlags.ElementIdOffset),
    "h2",
    null,
    className,
    null,
  );
}
export function h3(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H3 << VNodeFlags.ElementIdOffset),
    "h3",
    null,
    className,
    null,
  );
}
export function h4(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H4 << VNodeFlags.ElementIdOffset),
    "h4",
    null,
    className,
    null,
  );
}
export function h5(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H5 << VNodeFlags.ElementIdOffset),
    "h5",
    null,
    className,
    null,
  );
}
export function h6(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H6 << VNodeFlags.ElementIdOffset),
    "h6",
    null,
    className,
    null,
  );
}
export function head(className?: string): VNode<HTMLHeadElementProps | null, HTMLHeadElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Head << VNodeFlags.ElementIdOffset),
    "head",
    null,
    className,
    null,
  );
}
export function header(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Header << VNodeFlags.ElementIdOffset),
    "header",
    null,
    className,
    null,
  );
}
export function hgroup(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Hgroup << VNodeFlags.ElementIdOffset),
    "hgroup",
    null,
    className,
    null,
  );
}
export function hr(className?: string): VNode<HTMLHRElementProps | null, HTMLHRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Hr << VNodeFlags.ElementIdOffset),
    "hr",
    null,
    className,
    null,
  );
}
export function html(className?: string): VNode<HTMLHtmlElementProps | null, HTMLHtmlElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Html << VNodeFlags.ElementIdOffset),
    "html",
    null,
    className,
    null,
  );
}
export function i(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.I << VNodeFlags.ElementIdOffset),
    "i",
    null,
    className,
    null,
  );
}
export function iframe(className?: string): VNode<HTMLIFrameElementProps | null, HTMLIFrameElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Iframe << VNodeFlags.ElementIdOffset),
    "iframe",
    null,
    className,
    null,
  );
}
export function img(className?: string): VNode<HTMLImageElementProps | null, HTMLImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Img << VNodeFlags.ElementIdOffset),
    "img",
    null,
    className,
    null,
  );
}
export function ins(className?: string): VNode<HTMLModElementProps | null, HTMLModElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ins << VNodeFlags.ElementIdOffset),
    "ins",
    null,
    className,
    null,
  );
}
export function kbd(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Kbd << VNodeFlags.ElementIdOffset),
    "kbd",
    null,
    className,
    null,
  );
}
export function label(className?: string): VNode<HTMLLabelElementProps | null, HTMLLabelElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Label << VNodeFlags.ElementIdOffset),
    "label",
    null,
    className,
    null,
  );
}
export function legend(className?: string): VNode<HTMLLegendElementProps | null, HTMLLegendElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Legend << VNodeFlags.ElementIdOffset),
    "legend",
    null,
    className,
    null,
  );
}
export function li(className?: string): VNode<HTMLLIElementProps | null, HTMLLIElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Li << VNodeFlags.ElementIdOffset),
    "li",
    null,
    className,
    null,
  );
}
export function link(className?: string): VNode<HTMLLinkElementProps | null, HTMLLinkElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Link << VNodeFlags.ElementIdOffset),
    "link",
    null,
    className,
    null,
  );
}
export function listing(className?: string): VNode<HTMLPreElementProps | null, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Listing << VNodeFlags.ElementIdOffset),
    "listing",
    null,
    className,
    null,
  );
}
export function main(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Main << VNodeFlags.ElementIdOffset),
    "main",
    null,
    className,
    null,
  );
}
export function map(className?: string): VNode<HTMLMapElementProps | null, HTMLMapElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Map << VNodeFlags.ElementIdOffset),
    "map",
    null,
    className,
    null,
  );
}
export function mark(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Mark << VNodeFlags.ElementIdOffset),
    "mark",
    null,
    className,
    null,
  );
}
export function menu(className?: string): VNode<HTMLMenuElementProps | null, HTMLMenuElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Menu << VNodeFlags.ElementIdOffset),
    "menu",
    null,
    className,
    null,
  );
}
export function meta(className?: string): VNode<HTMLMetaElementProps | null, HTMLMetaElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Meta << VNodeFlags.ElementIdOffset),
    "meta",
    null,
    className,
    null,
  );
}
export function meter(className?: string): VNode<HTMLMeterElementProps | null, HTMLMeterElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Meter << VNodeFlags.ElementIdOffset),
    "meter",
    null,
    className,
    null,
  );
}
export function nav(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Nav << VNodeFlags.ElementIdOffset),
    "nav",
    null,
    className,
    null,
  );
}
export function nobr(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Nobr << VNodeFlags.ElementIdOffset),
    "nobr",
    null,
    className,
    null,
  );
}
export function noframes(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Noframes << VNodeFlags.ElementIdOffset),
    "noframes",
    null,
    className,
    null,
  );
}
export function noscript(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Noscript << VNodeFlags.ElementIdOffset),
    "noscript",
    null,
    className,
    null,
  );
}
export function object(className?: string): VNode<HTMLObjectElementProps | null, HTMLObjectElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Object << VNodeFlags.ElementIdOffset),
    "object",
    null,
    className,
    null,
  );
}
export function ol(className?: string): VNode<HTMLOListElementProps | null, HTMLOListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ol << VNodeFlags.ElementIdOffset),
    "ol",
    null,
    className,
    null,
  );
}
export function optgroup(className?: string): VNode<HTMLOptGroupElementProps | null, HTMLOptGroupElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Optgroup << VNodeFlags.ElementIdOffset),
    "optgroup",
    null,
    className,
    null,
  );
}
export function option(className?: string): VNode<HTMLOptionElementProps | null, HTMLOptionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Option << VNodeFlags.ElementIdOffset),
    "option",
    null,
    className,
    null,
  );
}
export function p(className?: string): VNode<HTMLParagraphElementProps | null, HTMLParagraphElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.P << VNodeFlags.ElementIdOffset),
    "p",
    null,
    className,
    null,
  );
}
export function param(className?: string): VNode<HTMLParamElementProps | null, HTMLParamElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Param << VNodeFlags.ElementIdOffset),
    "param",
    null,
    className,
    null,
  );
}
export function picture(className?: string): VNode<HTMLPictureElementProps | null, HTMLPictureElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Picture << VNodeFlags.ElementIdOffset),
    "picture",
    null,
    className,
    null,
  );
}
export function plaintext(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Plaintext << VNodeFlags.ElementIdOffset),
    "plaintext",
    null,
    className,
    null,
  );
}
export function pre(className?: string): VNode<HTMLPreElementProps | null, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Pre << VNodeFlags.ElementIdOffset),
    "pre",
    null,
    className,
    null,
  );
}
export function progress(className?: string): VNode<HTMLProgressElementProps | null, HTMLProgressElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Progress << VNodeFlags.ElementIdOffset),
    "progress",
    null,
    className,
    null,
  );
}
export function q(className?: string): VNode<HTMLQuoteElementProps | null, HTMLQuoteElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Q << VNodeFlags.ElementIdOffset),
    "q",
    null,
    className,
    null,
  );
}
export function rt(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Rt << VNodeFlags.ElementIdOffset),
    "rt",
    null,
    className,
    null,
  );
}
export function ruby(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ruby << VNodeFlags.ElementIdOffset),
    "ruby",
    null,
    className,
    null,
  );
}
export function s(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.S << VNodeFlags.ElementIdOffset),
    "s",
    null,
    className,
    null,
  );
}
export function samp(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Samp << VNodeFlags.ElementIdOffset),
    "samp",
    null,
    className,
    null,
  );
}
export function script(className?: string): VNode<HTMLScriptElementProps | null, HTMLScriptElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Script << VNodeFlags.ElementIdOffset),
    "script",
    null,
    className,
    null,
  );
}
export function section(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Section << VNodeFlags.ElementIdOffset),
    "section",
    null,
    className,
    null,
  );
}
export function select(className?: string): VNode<HTMLSelectElementProps | null, HTMLSelectElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Select << VNodeFlags.ElementIdOffset),
    "select",
    null,
    className,
    null,
  );
}
export function small(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Small << VNodeFlags.ElementIdOffset),
    "small",
    null,
    className,
    null,
  );
}
export function source(className?: string): VNode<HTMLSourceElementProps | null, HTMLSourceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Source << VNodeFlags.ElementIdOffset),
    "source",
    null,
    className,
    null,
  );
}
export function span(className?: string): VNode<HTMLSpanElementProps | null, HTMLSpanElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Span << VNodeFlags.ElementIdOffset),
    "span",
    null,
    className,
    null,
  );
}
export function strike(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Strike << VNodeFlags.ElementIdOffset),
    "strike",
    null,
    className,
    null,
  );
}
export function strong(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Strong << VNodeFlags.ElementIdOffset),
    "strong",
    null,
    className,
    null,
  );
}
export function style(className?: string): VNode<HTMLStyleElementProps | null, HTMLStyleElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Style << VNodeFlags.ElementIdOffset),
    "style",
    null,
    className,
    null,
  );
}
export function sub(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Sub << VNodeFlags.ElementIdOffset),
    "sub",
    null,
    className,
    null,
  );
}
export function sup(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Sup << VNodeFlags.ElementIdOffset),
    "sup",
    null,
    className,
    null,
  );
}
export function table(className?: string): VNode<HTMLTableElementProps | null, HTMLTableElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Table << VNodeFlags.ElementIdOffset),
    "table",
    null,
    className,
    null,
  );
}
export function tbody(className?: string): VNode<HTMLTableSectionElementProps | null, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tbody << VNodeFlags.ElementIdOffset),
    "tbody",
    null,
    className,
    null,
  );
}
export function td(className?: string): VNode<HTMLTableDataCellElementProps | null, HTMLTableDataCellElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Td << VNodeFlags.ElementIdOffset),
    "td",
    null,
    className,
    null,
  );
}
export function template(className?: string): VNode<HTMLTemplateElementProps | null, HTMLTemplateElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Template << VNodeFlags.ElementIdOffset),
    "template",
    null,
    className,
    null,
  );
}
export function tfoot(className?: string): VNode<HTMLTableSectionElementProps | null, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tfoot << VNodeFlags.ElementIdOffset),
    "tfoot",
    null,
    className,
    null,
  );
}
export function th(className?: string): VNode<HTMLTableHeaderCellElementProps | null, HTMLTableHeaderCellElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Th << VNodeFlags.ElementIdOffset),
    "th",
    null,
    className,
    null,
  );
}
export function thead(className?: string): VNode<HTMLTableSectionElementProps | null, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Thead << VNodeFlags.ElementIdOffset),
    "thead",
    null,
    className,
    null,
  );
}
export function time(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Time << VNodeFlags.ElementIdOffset),
    "time",
    null,
    className,
    null,
  );
}
export function title(className?: string): VNode<HTMLTitleElementProps | null, HTMLTitleElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    null,
    className,
    null,
  );
}
export function tr(className?: string): VNode<HTMLTableRowElementProps | null, HTMLTableRowElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tr << VNodeFlags.ElementIdOffset),
    "tr",
    null,
    className,
    null,
  );
}
export function track(className?: string): VNode<HTMLTrackElementProps | null, HTMLTrackElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Track << VNodeFlags.ElementIdOffset),
    "track",
    null,
    className,
    null,
  );
}
export function tt(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tt << VNodeFlags.ElementIdOffset),
    "tt",
    null,
    className,
    null,
  );
}
export function u(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.U << VNodeFlags.ElementIdOffset),
    "u",
    null,
    className,
    null,
  );
}
export function ul(className?: string): VNode<HTMLUListElementProps | null, HTMLUListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ul << VNodeFlags.ElementIdOffset),
    "ul",
    null,
    className,
    null,
  );
}
export function wbr(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Wbr << VNodeFlags.ElementIdOffset),
    "wbr",
    null,
    className,
    null,
  );
}
export function xmp(className?: string): VNode<HTMLPreElementProps | null, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Xmp << VNodeFlags.ElementIdOffset),
    "xmp",
    null,
    className,
    null,
  );
}

// Textarea / Input Elements:
export function textarea(className?: string): VNode<HTMLTextAreaElementProps | null, HTMLTextAreaElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.TextAreaElement | (TagId.Textarea << VNodeFlags.ElementIdOffset),
    "textarea",
    null,
    className,
    null,
  );
}
export function input(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.Input << VNodeFlags.ElementIdOffset),
    "input",
    null,
    className,
    null,
  );
}

// Media Elements:
export function audio(className?: string): VNode<HTMLAudioElementProps | null, HTMLAudioElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.MediaElement | (TagId.Audio << VNodeFlags.ElementIdOffset),
    "audio",
    null,
    className,
    null,
  );
}

export function video(className?: string): VNode<HTMLVideoElementProps | null, HTMLVideoElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.MediaElement | (TagId.Video << VNodeFlags.ElementIdOffset),
    "video",
    null,
    className,
    null,
  );
}
