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
  Canvas = 16,
  Caption = 17,
  Center = 18,
  Cite = 19,
  Code = 20,
  Col = 21,
  Colgroup = 22,
  Data = 23,
  Datalist = 24,
  Dd = 25,
  Del = 26,
  Dfn = 27,
  Dir = 28,
  Div = 29,
  Dl = 30,
  Dt = 31,
  Em = 32,
  Embed = 33,
  Fieldset = 34,
  Figcaption = 35,
  Figure = 36,
  Font = 37,
  Footer = 38,
  Form = 39,
  Frame = 40,
  Frameset = 41,
  H1 = 42,
  H2 = 43,
  H3 = 44,
  H4 = 45,
  H5 = 46,
  H6 = 47,
  Head = 48,
  Header = 49,
  Hgroup = 50,
  Hr = 51,
  Html = 52,
  I = 53,
  Iframe = 54,
  Img = 55,
  Ins = 56,
  Kbd = 57,
  Label = 58,
  Legend = 59,
  Li = 60,
  Link = 61,
  Listing = 62,
  Main = 63,
  Map = 64,
  Mark = 65,
  Menu = 66,
  Meta = 67,
  Meter = 68,
  Nav = 69,
  Nobr = 70,
  Noframes = 71,
  Noscript = 72,
  Object = 73,
  Ol = 74,
  Optgroup = 75,
  Option = 76,
  P = 77,
  Param = 78,
  Picture = 79,
  Plaintext = 80,
  Pre = 81,
  Progress = 82,
  Q = 83,
  Rt = 84,
  Ruby = 85,
  S = 86,
  Samp = 87,
  Script = 88,
  Section = 89,
  Select = 90,
  Small = 91,
  Source = 92,
  Span = 93,
  Strike = 94,
  Strong = 95,
  Style = 96,
  Sub = 97,
  Sup = 98,
  Table = 99,
  Tbody = 100,
  Td = 101,
  Template = 102,
  Textarea = 103,
  Tfoot = 104,
  Th = 105,
  Thead = 106,
  Time = 107,
  Title = 108,
  Tr = 109,
  Track = 110,
  Tt = 111,
  U = 112,
  Ul = 113,
  Wbr = 114,
  Xmp = 115,
  Audio = 116,
  Video = 117,
  // Input Elements
  InputButton = 200,
  InputCheckbox = 201,
  InputColor = 202,
  InputDate = 203,
  InputDatetime = 204,
  InputDatetimeLocal = 205,
  InputEmail = 206,
  InputFile = 207,
  InputHidden = 208,
  InputImage = 209,
  InputMonth = 210,
  InputNumber = 211,
  InputPassword = 212,
  InputRadio = 213,
  InputRange = 214,
  InputReset = 215,
  InputSearch = 216,
  InputSubmit = 217,
  InputTel = 218,
  Input = 219,
  InputTime = 220,
  InputUrl = 221,
  InputWeek = 222,
  // Button Elements
  Button = 230,
  ButtonSubmit = 231,
  ButtonReset = 232,
}

/**
 * Create a VNode representing a Text node.
 *
 * @param content Text content.
 * @returns VNode object.
 */
export function t(content: string | number | null): VNode<null, Text> {
  return new VNode(VNodeFlags.Text, null, null, null, content);
}

// HTML Elements:
export function a(className?: string): VNode<HTMLAnchorElementProps | null, HTMLAnchorElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function abbr(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Abbr << VNodeFlags.ElementIdOffset),
    "abbr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function acronym(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Acronym << VNodeFlags.ElementIdOffset),
    "acronym",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function address(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Address << VNodeFlags.ElementIdOffset),
    "address",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function area(className?: string): VNode<HTMLAreaElementProps | null, HTMLAreaElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Area << VNodeFlags.ElementIdOffset),
    "area",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function article(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Article << VNodeFlags.ElementIdOffset),
    "article",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function aside(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Aside << VNodeFlags.ElementIdOffset),
    "aside",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function b(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.B << VNodeFlags.ElementIdOffset),
    "b",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function base(className?: string): VNode<HTMLBaseElementProps | null, HTMLBaseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Base << VNodeFlags.ElementIdOffset),
    "base",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function basefont(className?: string): VNode<HTMLBaseFontElementProps | null, HTMLBaseFontElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Basefont << VNodeFlags.ElementIdOffset),
    "basefont",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function bdo(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Bdo << VNodeFlags.ElementIdOffset),
    "bdo",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function big(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Big << VNodeFlags.ElementIdOffset),
    "big",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function blockquote(className?: string): VNode<HTMLQuoteElementProps | null, HTMLQuoteElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Blockquote << VNodeFlags.ElementIdOffset),
    "blockquote",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function body(className?: string): VNode<HTMLBodyElementProps | null, HTMLBodyElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Body << VNodeFlags.ElementIdOffset),
    "body",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function br(className?: string): VNode<HTMLBRElementProps | null, HTMLBRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Br << VNodeFlags.ElementIdOffset),
    "br",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function button(className?: string): VNode<HTMLButtonElementProps | null, HTMLButtonElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.ButtonElement | (TagId.Button << VNodeFlags.ElementIdOffset),
    "button",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function buttonSubmit(className?: string): VNode<HTMLButtonElementProps | null, HTMLButtonElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.ButtonElement | (TagId.ButtonSubmit << VNodeFlags.ElementIdOffset),
    "",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function buttonReset(className?: string): VNode<HTMLButtonElementProps | null, HTMLButtonElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.ButtonElement | (TagId.ButtonReset << VNodeFlags.ElementIdOffset),
    "reset",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function canvas(className?: string): VNode<HTMLCanvasElementProps | null, HTMLCanvasElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Canvas << VNodeFlags.ElementIdOffset),
    "canvas",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function caption(className?: string): VNode<HTMLTableCaptionElementProps | null, HTMLTableCaptionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Caption << VNodeFlags.ElementIdOffset),
    "caption",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function center(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Center << VNodeFlags.ElementIdOffset),
    "center",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function cite(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Cite << VNodeFlags.ElementIdOffset),
    "cite",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function code(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Code << VNodeFlags.ElementIdOffset),
    "code",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function col(className?: string): VNode<HTMLTableColElementProps | null, HTMLTableColElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Col << VNodeFlags.ElementIdOffset),
    "col",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function colgroup(className?: string): VNode<HTMLTableColElementProps | null, HTMLTableColElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Colgroup << VNodeFlags.ElementIdOffset),
    "colgroup",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function data(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Data << VNodeFlags.ElementIdOffset),
    "data",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function datalist(className?: string): VNode<HTMLDataListElementProps | null, HTMLDataListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Datalist << VNodeFlags.ElementIdOffset),
    "datalist",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dd(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dd << VNodeFlags.ElementIdOffset),
    "dd",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function del(className?: string): VNode<HTMLModElementProps | null, HTMLModElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Del << VNodeFlags.ElementIdOffset),
    "del",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dfn(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dfn << VNodeFlags.ElementIdOffset),
    "dfn",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dir(className?: string): VNode<HTMLDirectoryElementProps | null, HTMLDirectoryElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dir << VNodeFlags.ElementIdOffset),
    "dir",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function div(className?: string): VNode<HTMLDivElementProps | null, HTMLDivElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Div << VNodeFlags.ElementIdOffset),
    "div",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dl(className?: string): VNode<HTMLDListElementProps | null, HTMLDListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dl << VNodeFlags.ElementIdOffset),
    "dl",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function dt(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dt << VNodeFlags.ElementIdOffset),
    "dt",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function em(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Em << VNodeFlags.ElementIdOffset),
    "em",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function embed(className?: string): VNode<HTMLEmbedElementProps | null, HTMLEmbedElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Embed << VNodeFlags.ElementIdOffset),
    "embed",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function fieldset(className?: string): VNode<HTMLFieldSetElementProps | null, HTMLFieldSetElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Fieldset << VNodeFlags.ElementIdOffset),
    "fieldset",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function figcaption(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Figcaption << VNodeFlags.ElementIdOffset),
    "figcaption",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function figure(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Figure << VNodeFlags.ElementIdOffset),
    "figure",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function font(className?: string): VNode<HTMLFontElementProps | null, HTMLFontElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Font << VNodeFlags.ElementIdOffset),
    "font",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function footer(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Footer << VNodeFlags.ElementIdOffset),
    "footer",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function form(className?: string): VNode<HTMLFormElementProps | null, HTMLFormElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Form << VNodeFlags.ElementIdOffset),
    "form",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function frame(className?: string): VNode<HTMLFrameElementProps | null, HTMLFrameElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Frame << VNodeFlags.ElementIdOffset),
    "frame",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function frameset(className?: string): VNode<HTMLFrameSetElementProps | null, HTMLFrameSetElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Frameset << VNodeFlags.ElementIdOffset),
    "frameset",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h1(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H1 << VNodeFlags.ElementIdOffset),
    "h1",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h2(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H2 << VNodeFlags.ElementIdOffset),
    "h2",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h3(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H3 << VNodeFlags.ElementIdOffset),
    "h3",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h4(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H4 << VNodeFlags.ElementIdOffset),
    "h4",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h5(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H5 << VNodeFlags.ElementIdOffset),
    "h5",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function h6(className?: string): VNode<HTMLHeadingElementProps | null, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H6 << VNodeFlags.ElementIdOffset),
    "h6",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function head(className?: string): VNode<HTMLHeadElementProps | null, HTMLHeadElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Head << VNodeFlags.ElementIdOffset),
    "head",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function header(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Header << VNodeFlags.ElementIdOffset),
    "header",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function hgroup(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Hgroup << VNodeFlags.ElementIdOffset),
    "hgroup",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function hr(className?: string): VNode<HTMLHRElementProps | null, HTMLHRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Hr << VNodeFlags.ElementIdOffset),
    "hr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function html(className?: string): VNode<HTMLHtmlElementProps | null, HTMLHtmlElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Html << VNodeFlags.ElementIdOffset),
    "html",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function i(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.I << VNodeFlags.ElementIdOffset),
    "i",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function iframe(className?: string): VNode<HTMLIFrameElementProps | null, HTMLIFrameElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Iframe << VNodeFlags.ElementIdOffset),
    "iframe",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function img(className?: string): VNode<HTMLImageElementProps | null, HTMLImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Img << VNodeFlags.ElementIdOffset),
    "img",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function ins(className?: string): VNode<HTMLModElementProps | null, HTMLModElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ins << VNodeFlags.ElementIdOffset),
    "ins",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function kbd(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Kbd << VNodeFlags.ElementIdOffset),
    "kbd",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function label(className?: string): VNode<HTMLLabelElementProps | null, HTMLLabelElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Label << VNodeFlags.ElementIdOffset),
    "label",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function legend(className?: string): VNode<HTMLLegendElementProps | null, HTMLLegendElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Legend << VNodeFlags.ElementIdOffset),
    "legend",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function li(className?: string): VNode<HTMLLIElementProps | null, HTMLLIElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Li << VNodeFlags.ElementIdOffset),
    "li",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function link(className?: string): VNode<HTMLLinkElementProps | null, HTMLLinkElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Link << VNodeFlags.ElementIdOffset),
    "link",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function listing(className?: string): VNode<HTMLPreElementProps | null, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Listing << VNodeFlags.ElementIdOffset),
    "listing",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function main(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Main << VNodeFlags.ElementIdOffset),
    "main",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function map(className?: string): VNode<HTMLMapElementProps | null, HTMLMapElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Map << VNodeFlags.ElementIdOffset),
    "map",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function mark(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Mark << VNodeFlags.ElementIdOffset),
    "mark",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function menu(className?: string): VNode<HTMLMenuElementProps | null, HTMLMenuElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Menu << VNodeFlags.ElementIdOffset),
    "menu",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function meta(className?: string): VNode<HTMLMetaElementProps | null, HTMLMetaElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Meta << VNodeFlags.ElementIdOffset),
    "meta",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function meter(className?: string): VNode<HTMLMeterElementProps | null, HTMLMeterElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Meter << VNodeFlags.ElementIdOffset),
    "meter",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function nav(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Nav << VNodeFlags.ElementIdOffset),
    "nav",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function nobr(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Nobr << VNodeFlags.ElementIdOffset),
    "nobr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function noframes(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Noframes << VNodeFlags.ElementIdOffset),
    "noframes",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function noscript(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Noscript << VNodeFlags.ElementIdOffset),
    "noscript",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function object(className?: string): VNode<HTMLObjectElementProps | null, HTMLObjectElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Object << VNodeFlags.ElementIdOffset),
    "object",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function ol(className?: string): VNode<HTMLOListElementProps | null, HTMLOListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ol << VNodeFlags.ElementIdOffset),
    "ol",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function optgroup(className?: string): VNode<HTMLOptGroupElementProps | null, HTMLOptGroupElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Optgroup << VNodeFlags.ElementIdOffset),
    "optgroup",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function option(className?: string): VNode<HTMLOptionElementProps | null, HTMLOptionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Option << VNodeFlags.ElementIdOffset),
    "option",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function p(className?: string): VNode<HTMLParagraphElementProps | null, HTMLParagraphElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.P << VNodeFlags.ElementIdOffset),
    "p",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function param(className?: string): VNode<HTMLParamElementProps | null, HTMLParamElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Param << VNodeFlags.ElementIdOffset),
    "param",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function picture(className?: string): VNode<HTMLPictureElementProps | null, HTMLPictureElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Picture << VNodeFlags.ElementIdOffset),
    "picture",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function plaintext(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Plaintext << VNodeFlags.ElementIdOffset),
    "plaintext",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function pre(className?: string): VNode<HTMLPreElementProps | null, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Pre << VNodeFlags.ElementIdOffset),
    "pre",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function progress(className?: string): VNode<HTMLProgressElementProps | null, HTMLProgressElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Progress << VNodeFlags.ElementIdOffset),
    "progress",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function q(className?: string): VNode<HTMLQuoteElementProps | null, HTMLQuoteElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Q << VNodeFlags.ElementIdOffset),
    "q",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function rt(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Rt << VNodeFlags.ElementIdOffset),
    "rt",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function ruby(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ruby << VNodeFlags.ElementIdOffset),
    "ruby",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function s(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.S << VNodeFlags.ElementIdOffset),
    "s",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function samp(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Samp << VNodeFlags.ElementIdOffset),
    "samp",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function script(className?: string): VNode<HTMLScriptElementProps | null, HTMLScriptElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Script << VNodeFlags.ElementIdOffset),
    "script",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function section(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Section << VNodeFlags.ElementIdOffset),
    "section",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function select(className?: string): VNode<HTMLSelectElementProps | null, HTMLSelectElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Select << VNodeFlags.ElementIdOffset),
    "select",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function small(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Small << VNodeFlags.ElementIdOffset),
    "small",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function source(className?: string): VNode<HTMLSourceElementProps | null, HTMLSourceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Source << VNodeFlags.ElementIdOffset),
    "source",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function span(className?: string): VNode<HTMLSpanElementProps | null, HTMLSpanElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Span << VNodeFlags.ElementIdOffset),
    "span",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function strike(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Strike << VNodeFlags.ElementIdOffset),
    "strike",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function strong(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Strong << VNodeFlags.ElementIdOffset),
    "strong",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function style(className?: string): VNode<HTMLStyleElementProps | null, HTMLStyleElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Style << VNodeFlags.ElementIdOffset),
    "style",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function sub(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Sub << VNodeFlags.ElementIdOffset),
    "sub",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function sup(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Sup << VNodeFlags.ElementIdOffset),
    "sup",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function table(className?: string): VNode<HTMLTableElementProps | null, HTMLTableElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Table << VNodeFlags.ElementIdOffset),
    "table",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function tbody(className?: string): VNode<HTMLTableSectionElementProps | null, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tbody << VNodeFlags.ElementIdOffset),
    "tbody",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function td(className?: string): VNode<HTMLTableDataCellElementProps | null, HTMLTableDataCellElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Td << VNodeFlags.ElementIdOffset),
    "td",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function template(className?: string): VNode<HTMLTemplateElementProps | null, HTMLTemplateElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Template << VNodeFlags.ElementIdOffset),
    "template",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function tfoot(className?: string): VNode<HTMLTableSectionElementProps | null, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tfoot << VNodeFlags.ElementIdOffset),
    "tfoot",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function th(className?: string): VNode<HTMLTableHeaderCellElementProps | null, HTMLTableHeaderCellElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Th << VNodeFlags.ElementIdOffset),
    "th",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function thead(className?: string): VNode<HTMLTableSectionElementProps | null, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Thead << VNodeFlags.ElementIdOffset),
    "thead",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function time(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Time << VNodeFlags.ElementIdOffset),
    "time",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function title(className?: string): VNode<HTMLTitleElementProps | null, HTMLTitleElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function tr(className?: string): VNode<HTMLTableRowElementProps | null, HTMLTableRowElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tr << VNodeFlags.ElementIdOffset),
    "tr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function track(className?: string): VNode<HTMLTrackElementProps | null, HTMLTrackElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Track << VNodeFlags.ElementIdOffset),
    "track",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function tt(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tt << VNodeFlags.ElementIdOffset),
    "tt",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function u(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.U << VNodeFlags.ElementIdOffset),
    "u",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function ul(className?: string): VNode<HTMLUListElementProps | null, HTMLUListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ul << VNodeFlags.ElementIdOffset),
    "ul",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function wbr(className?: string): VNode<HTMLElementProps | null, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.VoidElement | (TagId.Wbr << VNodeFlags.ElementIdOffset),
    "wbr",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function xmp(className?: string): VNode<HTMLPreElementProps | null, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Xmp << VNodeFlags.ElementIdOffset),
    "xmp",
    null,
    className === undefined ? null : className,
    null,
  );
}

/* tslint:disable:max-line-length */
// Textarea / Input Elements:
export function textarea(className?: string): VNode<HTMLTextAreaElementProps | null, HTMLTextAreaElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.TextAreaElement | (TagId.Textarea << VNodeFlags.ElementIdOffset),
    "textarea",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function input(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.Input << VNodeFlags.ElementIdOffset),
    "",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputButton(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputButton << VNodeFlags.ElementIdOffset),
    "button",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputCheckbox(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputCheckbox << VNodeFlags.ElementIdOffset),
    "checkbox",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputColor(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputColor << VNodeFlags.ElementIdOffset),
    "color",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputDate(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputDate << VNodeFlags.ElementIdOffset),
    "date",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputDatetime(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputDatetime << VNodeFlags.ElementIdOffset),
    "datetime",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputDatetimeLocal(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputDatetimeLocal << VNodeFlags.ElementIdOffset),
    "datetime-local",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputEmail(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputEmail << VNodeFlags.ElementIdOffset),
    "email",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputFile(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputFile << VNodeFlags.ElementIdOffset),
    "file",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputHidden(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputHidden << VNodeFlags.ElementIdOffset),
    "hidden",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputImage(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputImage << VNodeFlags.ElementIdOffset),
    "image",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputMonth(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputMonth << VNodeFlags.ElementIdOffset),
    "month",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputNumber(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputNumber << VNodeFlags.ElementIdOffset),
    "number",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputPassword(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputPassword << VNodeFlags.ElementIdOffset),
    "password",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputRadio(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputRadio << VNodeFlags.ElementIdOffset),
    "radio",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputRange(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputRange << VNodeFlags.ElementIdOffset),
    "range",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputReset(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputReset << VNodeFlags.ElementIdOffset),
    "reset",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputSearch(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputSearch << VNodeFlags.ElementIdOffset),
    "search",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputSubmit(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputSubmit << VNodeFlags.ElementIdOffset),
    "submit",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputTel(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputTel << VNodeFlags.ElementIdOffset),
    "tel",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputTime(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputTime << VNodeFlags.ElementIdOffset),
    "time",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputUrl(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputUrl << VNodeFlags.ElementIdOffset),
    "url",
    null,
    className === undefined ? null : className,
    null,
  );
}
export function inputWeek(className?: string): VNode<HTMLInputElementProps | null, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement | (TagId.InputWeek << VNodeFlags.ElementIdOffset),
    "week",
    null,
    className === undefined ? null : className,
    null,
  );
}

// Media Elements:
export function audio(className?: string): VNode<HTMLAudioElementProps | null, HTMLAudioElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.MediaElement | (TagId.Audio << VNodeFlags.ElementIdOffset),
    "audio",
    null,
    className === undefined ? null : className,
    null);

}

export function video(className?: string): VNode<HTMLVideoElementProps | null, HTMLVideoElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.MediaElement | (TagId.Video << VNodeFlags.ElementIdOffset),
    "video",
    null,
    className === undefined ? null : className,
    null);
}
