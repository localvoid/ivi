import {
  HTMLAnchorElementAttrs, HTMLElementAttrs, HTMLAreaElementAttrs, HTMLAudioElementAttrs,
  HTMLBaseElementAttrs, HTMLBodyElementAttrs, HTMLBRElementAttrs, HTMLButtonElementAttrs,
  HTMLCanvasElementAttrs, HTMLQuoteElementAttrs, HTMLTableCaptionElementAttrs, HTMLTableColElementAttrs,
  HTMLDataListElementAttrs, HTMLModElementAttrs, HTMLDivElementAttrs,
  HTMLDListElementAttrs, HTMLEmbedElementAttrs, HTMLFieldSetElementAttrs, HTMLFormElementAttrs,
  HTMLHeadElementAttrs, HTMLHeadingElementAttrs, HTMLHRElementAttrs,
  HTMLHtmlElementAttrs, HTMLIFrameElementAttrs, HTMLImageElementAttrs, HTMLInputElementAttrs, HTMLLabelElementAttrs,
  HTMLLegendElementAttrs, HTMLLIElementAttrs, HTMLLinkElementAttrs, HTMLMapElementAttrs,
  HTMLMenuElementAttrs, HTMLMetaElementAttrs, HTMLMeterElementAttrs, HTMLObjectElementAttrs, HTMLOListElementAttrs,
  HTMLOptGroupElementAttrs, HTMLOptionElementAttrs, HTMLParagraphElementAttrs, HTMLParamElementAttrs,
  HTMLPictureElementAttrs, HTMLPreElementAttrs, HTMLProgressElementAttrs, HTMLScriptElementAttrs,
  HTMLSelectElementAttrs, HTMLSourceElementAttrs, HTMLSpanElementAttrs, HTMLStyleElementAttrs,
  HTMLTableDataCellElementAttrs, HTMLTableElementAttrs, HTMLTableHeaderCellElementAttrs, HTMLTableRowElementAttrs,
  HTMLTableSectionElementAttrs, HTMLTemplateElementAttrs, HTMLTextAreaElementAttrs, HTMLTitleElementAttrs,
  HTMLTrackElementAttrs, HTMLUListElementAttrs, HTMLVideoElementAttrs,
  CSSStyleProps,

  SYNCABLE_VALUE_SKIP_UNDEFINED,
} from "ivi-core";
import { VNode, VNodeFlags, SyncableValue } from "ivi";

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
 * {@link SyncableValue} with `""` value and {@link syncInputValue} sync function.
 */
const INPUT_EMPTY_STRING: SyncableValue<string | number> = { v: "", s: syncInputValue };

/**
 * {@link SyncableValue} with `""` value and {@link syncTextAreaValue} sync function.
 */
const TEXTAREA_EMPTY_STRING: SyncableValue<string | number> = { v: "", s: syncTextAreaValue };

/**
 * {@link SyncableValue} with `false` value and {@link syncInputChecked} sync function.
 */
const INPUT_CHECKED_FALSE: SyncableValue<boolean> = { v: false, s: syncInputChecked };

/**
 * {@link SyncableValue} with `true` value and {@link syncInputChecked} sync function.
 */
const INPUT_CHECKED_TRUE: SyncableValue<boolean> = { v: true, s: syncInputChecked };

/**
 * Synchronization function for {@link SyncableValue} created with {@link INPUT_VALUE} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function syncInputValue(
  element: Element,
  key: string,
  prev: string | number | undefined,
  next: string | number | undefined,
) {
  if (prev === void 0) {
    if (next !== "") {
      (element as HTMLInputElement).value = next as string;
    }
  } else {
    if ((element as HTMLInputElement).value !== next) {
      (element as HTMLInputElement).value = next as string;
    }
  }
}

/**
 * Synchronization function for {@link SyncableValue} created with {@link TEXTAREA_VALUE} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function syncTextAreaValue(
  element: Element,
  key: string,
  prev: string | number | undefined,
  next: string | number | undefined,
) {
  if (prev === void 0) {
    if (next !== "") {
      (element as HTMLTextAreaElement).value = next as string;
    }
  } else {
    if ((element as HTMLTextAreaElement).value !== next) {
      (element as HTMLTextAreaElement).value = next as string;
    }
  }
}

/**
 * Synchronization function for {@link SyncableValue} created with {@link INPUT_CHECKED} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function syncInputChecked(
  element: Element,
  key: string,
  prev: boolean | undefined,
  next: boolean | undefined,
) {
  if (prev === void 0) {
    if (next) {
      (element as HTMLInputElement).checked = next;
    }
  } else {
    if ((element as HTMLInputElement).checked !== next) {
      (element as HTMLInputElement).checked = next!;
    }
  }
}

/**
 * Synchronization function for {@link SyncableValue} created with {@link UNSAFE_HTML} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function syncUnsafeHTML(element: Element, key: string, prev: string | undefined, next: string | undefined) {
  if (
    (prev === void 0 && next !== "") ||
    (prev !== next)
  ) {
    element.innerHTML = next!;
  }
}

/**
 * INPUT_VALUE function creates a {@link SyncableValue} that assigns a `value` property to an HTMLInputElement.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = input("", { value: INPUT_VALUE("value") });
 *
 * @param v - Input value
 * @returns {@link SyncableValue}
 */
export function INPUT_VALUE(v: string | number | undefined): SyncableValue<string | number> {
  return (v === void 0) ? SYNCABLE_VALUE_SKIP_UNDEFINED :
    v === "" ? INPUT_EMPTY_STRING : { v, s: syncInputValue };
}

/**
 * INPUT_CHECKED function creates a {@link SyncableValue} that assigns a `checked` property to an HTMLInputElement.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = input("", { checked: INPUT_CHECKED(true) });
 *
 * @param v - Input checked value
 * @returns {@link SyncableValue}
 */
export function INPUT_CHECKED(v: boolean | undefined): SyncableValue<boolean> {
  return (v === void 0) ?
    SYNCABLE_VALUE_SKIP_UNDEFINED as any as SyncableValue<boolean> :
    v ? INPUT_CHECKED_TRUE : INPUT_CHECKED_FALSE;
}

/**
 * TEXTAREA_VALUE function creates a {@link SyncableValue} that assigns a `value` property to an HTMLTextAreaElement.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = textarea("", { value: TEXTAREA_VALUE("value") });
 *
 * @param v - Text area value
 * @returns {@link SyncableValue}
 */
export function TEXTAREA_VALUE(v: string | number | undefined): SyncableValue<string | number> {
  return (v === void 0) ? SYNCABLE_VALUE_SKIP_UNDEFINED :
    v === "" ? TEXTAREA_EMPTY_STRING : { v, s: syncTextAreaValue };
}

/**
 * UNSAFE_HTML function creates a {@link SyncableValue} that assigns an `innerHTML` property to an Element.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = div("", { unsafeHTML: UNSAFE_HTML("<span></span>") });
 *
 * @param v - innerHTML value
 * @returns {@link SyncableValue}
 */
export function UNSAFE_HTML(v: string | undefined): SyncableValue<string> {
  return (v === void 0) ? SYNCABLE_VALUE_SKIP_UNDEFINED : { v, s: syncUnsafeHTML };
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

export function a(className?: string, attrs?: HTMLAnchorElementAttrs, css?: CSSStyleProps): VNode<HTMLAnchorElementAttrs | undefined, HTMLAnchorElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function abbr(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Abbr << VNodeFlags.ElementIdOffset),
    "abbr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function acronym(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Acronym << VNodeFlags.ElementIdOffset),
    "acronym",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function address(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Address << VNodeFlags.ElementIdOffset),
    "address",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function area(className?: string, attrs?: HTMLAreaElementAttrs, css?: CSSStyleProps): VNode<HTMLAreaElementAttrs | undefined, HTMLAreaElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Area << VNodeFlags.ElementIdOffset),
    "area",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function article(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Article << VNodeFlags.ElementIdOffset),
    "article",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function aside(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Aside << VNodeFlags.ElementIdOffset),
    "aside",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function b(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.B << VNodeFlags.ElementIdOffset),
    "b",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function base(className?: string, attrs?: HTMLBaseElementAttrs, css?: CSSStyleProps): VNode<HTMLBaseElementAttrs | undefined, HTMLBaseElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Base << VNodeFlags.ElementIdOffset),
    "base",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function bdo(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Bdo << VNodeFlags.ElementIdOffset),
    "bdo",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function big(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Big << VNodeFlags.ElementIdOffset),
    "big",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function blockquote(className?: string, attrs?: HTMLQuoteElementAttrs, css?: CSSStyleProps): VNode<HTMLQuoteElementAttrs | undefined, HTMLQuoteElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Blockquote << VNodeFlags.ElementIdOffset),
    "blockquote",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function body(className?: string, attrs?: HTMLBodyElementAttrs, css?: CSSStyleProps): VNode<HTMLBodyElementAttrs | undefined, HTMLBodyElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Body << VNodeFlags.ElementIdOffset),
    "body",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function br(className?: string, attrs?: HTMLBRElementAttrs, css?: CSSStyleProps): VNode<HTMLBRElementAttrs | undefined, HTMLBRElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Br << VNodeFlags.ElementIdOffset),
    "br",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function button(className?: string, attrs?: HTMLButtonElementAttrs, css?: CSSStyleProps): VNode<HTMLButtonElementAttrs | undefined, HTMLButtonElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Button << VNodeFlags.ElementIdOffset),
    "button",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function canvas(className?: string, attrs?: HTMLCanvasElementAttrs, css?: CSSStyleProps): VNode<HTMLCanvasElementAttrs | undefined, HTMLCanvasElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Canvas << VNodeFlags.ElementIdOffset),
    "canvas",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function caption(className?: string, attrs?: HTMLTableCaptionElementAttrs, css?: CSSStyleProps): VNode<HTMLTableCaptionElementAttrs | undefined, HTMLTableCaptionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Caption << VNodeFlags.ElementIdOffset),
    "caption",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function center(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Center << VNodeFlags.ElementIdOffset),
    "center",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function cite(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Cite << VNodeFlags.ElementIdOffset),
    "cite",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function code(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Code << VNodeFlags.ElementIdOffset),
    "code",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function col(className?: string, attrs?: HTMLTableColElementAttrs, css?: CSSStyleProps): VNode<HTMLTableColElementAttrs | undefined, HTMLTableColElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Col << VNodeFlags.ElementIdOffset),
    "col",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function colgroup(className?: string, attrs?: HTMLTableColElementAttrs, css?: CSSStyleProps): VNode<HTMLTableColElementAttrs | undefined, HTMLTableColElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Colgroup << VNodeFlags.ElementIdOffset),
    "colgroup",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function data(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Data << VNodeFlags.ElementIdOffset),
    "data",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function datalist(className?: string, attrs?: HTMLDataListElementAttrs, css?: CSSStyleProps): VNode<HTMLDataListElementAttrs | undefined, HTMLDataListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Datalist << VNodeFlags.ElementIdOffset),
    "datalist",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function dd(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dd << VNodeFlags.ElementIdOffset),
    "dd",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function del(className?: string, attrs?: HTMLModElementAttrs, css?: CSSStyleProps): VNode<HTMLModElementAttrs | undefined, HTMLModElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Del << VNodeFlags.ElementIdOffset),
    "del",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function dfn(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dfn << VNodeFlags.ElementIdOffset),
    "dfn",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function div(className?: string, attrs?: HTMLDivElementAttrs, css?: CSSStyleProps): VNode<HTMLDivElementAttrs | undefined, HTMLDivElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Div << VNodeFlags.ElementIdOffset),
    "div",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function dl(className?: string, attrs?: HTMLDListElementAttrs, css?: CSSStyleProps): VNode<HTMLDListElementAttrs | undefined, HTMLDListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dl << VNodeFlags.ElementIdOffset),
    "dl",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function dt(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Dt << VNodeFlags.ElementIdOffset),
    "dt",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function em(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Em << VNodeFlags.ElementIdOffset),
    "em",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function embed(className?: string, attrs?: HTMLEmbedElementAttrs, css?: CSSStyleProps): VNode<HTMLEmbedElementAttrs | undefined, HTMLEmbedElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Embed << VNodeFlags.ElementIdOffset),
    "embed",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function fieldset(className?: string, attrs?: HTMLFieldSetElementAttrs, css?: CSSStyleProps): VNode<HTMLFieldSetElementAttrs | undefined, HTMLFieldSetElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Fieldset << VNodeFlags.ElementIdOffset),
    "fieldset",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function figcaption(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Figcaption << VNodeFlags.ElementIdOffset),
    "figcaption",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function figure(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Figure << VNodeFlags.ElementIdOffset),
    "figure",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function footer(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Footer << VNodeFlags.ElementIdOffset),
    "footer",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function form(className?: string, attrs?: HTMLFormElementAttrs, css?: CSSStyleProps): VNode<HTMLFormElementAttrs | undefined, HTMLFormElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Form << VNodeFlags.ElementIdOffset),
    "form",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h1(className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps): VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H1 << VNodeFlags.ElementIdOffset),
    "h1",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h2(className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps): VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H2 << VNodeFlags.ElementIdOffset),
    "h2",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h3(className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps): VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H3 << VNodeFlags.ElementIdOffset),
    "h3",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h4(className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps): VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H4 << VNodeFlags.ElementIdOffset),
    "h4",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h5(className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps): VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H5 << VNodeFlags.ElementIdOffset),
    "h5",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function h6(className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps): VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.H6 << VNodeFlags.ElementIdOffset),
    "h6",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function head(className?: string, attrs?: HTMLHeadElementAttrs, css?: CSSStyleProps): VNode<HTMLHeadElementAttrs | undefined, HTMLHeadElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Head << VNodeFlags.ElementIdOffset),
    "head",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function header(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Header << VNodeFlags.ElementIdOffset),
    "header",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function hgroup(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Hgroup << VNodeFlags.ElementIdOffset),
    "hgroup",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function hr(className?: string, attrs?: HTMLHRElementAttrs, css?: CSSStyleProps): VNode<HTMLHRElementAttrs | undefined, HTMLHRElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Hr << VNodeFlags.ElementIdOffset),
    "hr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function html(className?: string, attrs?: HTMLHtmlElementAttrs, css?: CSSStyleProps): VNode<HTMLHtmlElementAttrs | undefined, HTMLHtmlElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Html << VNodeFlags.ElementIdOffset),
    "html",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function i(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.I << VNodeFlags.ElementIdOffset),
    "i",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function iframe(className?: string, attrs?: HTMLIFrameElementAttrs, css?: CSSStyleProps): VNode<HTMLIFrameElementAttrs | undefined, HTMLIFrameElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Iframe << VNodeFlags.ElementIdOffset),
    "iframe",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function img(className?: string, attrs?: HTMLImageElementAttrs, css?: CSSStyleProps): VNode<HTMLImageElementAttrs | undefined, HTMLImageElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Img << VNodeFlags.ElementIdOffset),
    "img",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function ins(className?: string, attrs?: HTMLModElementAttrs, css?: CSSStyleProps): VNode<HTMLModElementAttrs | undefined, HTMLModElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ins << VNodeFlags.ElementIdOffset),
    "ins",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function kbd(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Kbd << VNodeFlags.ElementIdOffset),
    "kbd",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function label(className?: string, attrs?: HTMLLabelElementAttrs, css?: CSSStyleProps): VNode<HTMLLabelElementAttrs | undefined, HTMLLabelElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Label << VNodeFlags.ElementIdOffset),
    "label",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function legend(className?: string, attrs?: HTMLLegendElementAttrs, css?: CSSStyleProps): VNode<HTMLLegendElementAttrs | undefined, HTMLLegendElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Legend << VNodeFlags.ElementIdOffset),
    "legend",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function li(className?: string, attrs?: HTMLLIElementAttrs, css?: CSSStyleProps): VNode<HTMLLIElementAttrs | undefined, HTMLLIElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Li << VNodeFlags.ElementIdOffset),
    "li",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function link(className?: string, attrs?: HTMLLinkElementAttrs, css?: CSSStyleProps): VNode<HTMLLinkElementAttrs | undefined, HTMLLinkElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Link << VNodeFlags.ElementIdOffset),
    "link",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function listing(className?: string, attrs?: HTMLPreElementAttrs, css?: CSSStyleProps): VNode<HTMLPreElementAttrs | undefined, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Listing << VNodeFlags.ElementIdOffset),
    "listing",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function main(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Main << VNodeFlags.ElementIdOffset),
    "main",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function map(className?: string, attrs?: HTMLMapElementAttrs, css?: CSSStyleProps): VNode<HTMLMapElementAttrs | undefined, HTMLMapElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Map << VNodeFlags.ElementIdOffset),
    "map",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function mark(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Mark << VNodeFlags.ElementIdOffset),
    "mark",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function menu(className?: string, attrs?: HTMLMenuElementAttrs, css?: CSSStyleProps): VNode<HTMLMenuElementAttrs | undefined, HTMLMenuElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Menu << VNodeFlags.ElementIdOffset),
    "menu",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function meta(className?: string, attrs?: HTMLMetaElementAttrs, css?: CSSStyleProps): VNode<HTMLMetaElementAttrs | undefined, HTMLMetaElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Meta << VNodeFlags.ElementIdOffset),
    "meta",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function meter(className?: string, attrs?: HTMLMeterElementAttrs, css?: CSSStyleProps): VNode<HTMLMeterElementAttrs | undefined, HTMLMeterElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Meter << VNodeFlags.ElementIdOffset),
    "meter",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function nav(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Nav << VNodeFlags.ElementIdOffset),
    "nav",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function nobr(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Nobr << VNodeFlags.ElementIdOffset),
    "nobr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function noframes(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Noframes << VNodeFlags.ElementIdOffset),
    "noframes",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function noscript(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Noscript << VNodeFlags.ElementIdOffset),
    "noscript",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function object(className?: string, attrs?: HTMLObjectElementAttrs, css?: CSSStyleProps): VNode<HTMLObjectElementAttrs | undefined, HTMLObjectElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Object << VNodeFlags.ElementIdOffset),
    "object",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function ol(className?: string, attrs?: HTMLOListElementAttrs, css?: CSSStyleProps): VNode<HTMLOListElementAttrs | undefined, HTMLOListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ol << VNodeFlags.ElementIdOffset),
    "ol",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function optgroup(className?: string, attrs?: HTMLOptGroupElementAttrs, css?: CSSStyleProps): VNode<HTMLOptGroupElementAttrs | undefined, HTMLOptGroupElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Optgroup << VNodeFlags.ElementIdOffset),
    "optgroup",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function option(className?: string, attrs?: HTMLOptionElementAttrs, css?: CSSStyleProps): VNode<HTMLOptionElementAttrs | undefined, HTMLOptionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Option << VNodeFlags.ElementIdOffset),
    "option",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function p(className?: string, attrs?: HTMLParagraphElementAttrs, css?: CSSStyleProps): VNode<HTMLParagraphElementAttrs | undefined, HTMLParagraphElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.P << VNodeFlags.ElementIdOffset),
    "p",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function param(className?: string, attrs?: HTMLParamElementAttrs, css?: CSSStyleProps): VNode<HTMLParamElementAttrs | undefined, HTMLParamElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Param << VNodeFlags.ElementIdOffset),
    "param",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function picture(className?: string, attrs?: HTMLPictureElementAttrs, css?: CSSStyleProps): VNode<HTMLPictureElementAttrs | undefined, HTMLPictureElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Picture << VNodeFlags.ElementIdOffset),
    "picture",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function plaintext(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Plaintext << VNodeFlags.ElementIdOffset),
    "plaintext",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function pre(className?: string, attrs?: HTMLPreElementAttrs, css?: CSSStyleProps): VNode<HTMLPreElementAttrs | undefined, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Pre << VNodeFlags.ElementIdOffset),
    "pre",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function progress(className?: string, attrs?: HTMLProgressElementAttrs, css?: CSSStyleProps): VNode<HTMLProgressElementAttrs | undefined, HTMLProgressElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Progress << VNodeFlags.ElementIdOffset),
    "progress",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function q(className?: string, attrs?: HTMLQuoteElementAttrs, css?: CSSStyleProps): VNode<HTMLQuoteElementAttrs | undefined, HTMLQuoteElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Q << VNodeFlags.ElementIdOffset),
    "q",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function rt(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Rt << VNodeFlags.ElementIdOffset),
    "rt",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function ruby(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ruby << VNodeFlags.ElementIdOffset),
    "ruby",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function s(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.S << VNodeFlags.ElementIdOffset),
    "s",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function samp(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Samp << VNodeFlags.ElementIdOffset),
    "samp",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function script(className?: string, attrs?: HTMLScriptElementAttrs, css?: CSSStyleProps): VNode<HTMLScriptElementAttrs | undefined, HTMLScriptElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Script << VNodeFlags.ElementIdOffset),
    "script",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function section(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Section << VNodeFlags.ElementIdOffset),
    "section",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function select(className?: string, attrs?: HTMLSelectElementAttrs, css?: CSSStyleProps): VNode<HTMLSelectElementAttrs | undefined, HTMLSelectElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Select << VNodeFlags.ElementIdOffset),
    "select",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function small(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Small << VNodeFlags.ElementIdOffset),
    "small",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function source(className?: string, attrs?: HTMLSourceElementAttrs, css?: CSSStyleProps): VNode<HTMLSourceElementAttrs | undefined, HTMLSourceElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Source << VNodeFlags.ElementIdOffset),
    "source",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function span(className?: string, attrs?: HTMLSpanElementAttrs, css?: CSSStyleProps): VNode<HTMLSpanElementAttrs | undefined, HTMLSpanElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Span << VNodeFlags.ElementIdOffset),
    "span",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function strike(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Strike << VNodeFlags.ElementIdOffset),
    "strike",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function strong(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Strong << VNodeFlags.ElementIdOffset),
    "strong",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function style(className?: string, attrs?: HTMLStyleElementAttrs, css?: CSSStyleProps): VNode<HTMLStyleElementAttrs | undefined, HTMLStyleElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Style << VNodeFlags.ElementIdOffset),
    "style",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function sub(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Sub << VNodeFlags.ElementIdOffset),
    "sub",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function sup(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Sup << VNodeFlags.ElementIdOffset),
    "sup",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function table(className?: string, attrs?: HTMLTableElementAttrs, css?: CSSStyleProps): VNode<HTMLTableElementAttrs | undefined, HTMLTableElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Table << VNodeFlags.ElementIdOffset),
    "table",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function tbody(className?: string, attrs?: HTMLTableSectionElementAttrs, css?: CSSStyleProps): VNode<HTMLTableSectionElementAttrs | undefined, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tbody << VNodeFlags.ElementIdOffset),
    "tbody",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function td(className?: string, attrs?: HTMLTableDataCellElementAttrs, css?: CSSStyleProps): VNode<HTMLTableDataCellElementAttrs | undefined, HTMLTableDataCellElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Td << VNodeFlags.ElementIdOffset),
    "td",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function template(className?: string, attrs?: HTMLTemplateElementAttrs, css?: CSSStyleProps): VNode<HTMLTemplateElementAttrs | undefined, HTMLTemplateElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Template << VNodeFlags.ElementIdOffset),
    "template",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function tfoot(className?: string, attrs?: HTMLTableSectionElementAttrs, css?: CSSStyleProps): VNode<HTMLTableSectionElementAttrs | undefined, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tfoot << VNodeFlags.ElementIdOffset),
    "tfoot",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function th(className?: string, attrs?: HTMLTableHeaderCellElementAttrs, css?: CSSStyleProps): VNode<HTMLTableHeaderCellElementAttrs | undefined, HTMLTableHeaderCellElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Th << VNodeFlags.ElementIdOffset),
    "th",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function thead(className?: string, attrs?: HTMLTableSectionElementAttrs, css?: CSSStyleProps): VNode<HTMLTableSectionElementAttrs | undefined, HTMLTableSectionElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Thead << VNodeFlags.ElementIdOffset),
    "thead",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function time(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Time << VNodeFlags.ElementIdOffset),
    "time",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function title(className?: string, attrs?: HTMLTitleElementAttrs, css?: CSSStyleProps): VNode<HTMLTitleElementAttrs | undefined, HTMLTitleElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function tr(className?: string, attrs?: HTMLTableRowElementAttrs, css?: CSSStyleProps): VNode<HTMLTableRowElementAttrs | undefined, HTMLTableRowElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tr << VNodeFlags.ElementIdOffset),
    "tr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function track(className?: string, attrs?: HTMLTrackElementAttrs, css?: CSSStyleProps): VNode<HTMLTrackElementAttrs | undefined, HTMLTrackElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Track << VNodeFlags.ElementIdOffset),
    "track",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function tt(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Tt << VNodeFlags.ElementIdOffset),
    "tt",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function u(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.U << VNodeFlags.ElementIdOffset),
    "u",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function ul(className?: string, attrs?: HTMLUListElementAttrs, css?: CSSStyleProps): VNode<HTMLUListElementAttrs | undefined, HTMLUListElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Ul << VNodeFlags.ElementIdOffset),
    "ul",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function wbr(className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps): VNode<HTMLElementAttrs | undefined, HTMLElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Wbr << VNodeFlags.ElementIdOffset),
    "wbr",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function xmp(className?: string, attrs?: HTMLPreElementAttrs, css?: CSSStyleProps): VNode<HTMLPreElementAttrs | undefined, HTMLPreElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Xmp << VNodeFlags.ElementIdOffset),
    "xmp",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

// Textarea / Input Elements:
export function textarea(className?: string, attrs?: HTMLTextAreaElementAttrs, css?: CSSStyleProps): VNode<HTMLTextAreaElementAttrs | undefined, HTMLTextAreaElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Textarea << VNodeFlags.ElementIdOffset),
    "textarea",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
export function input(className?: string, attrs?: HTMLInputElementAttrs, css?: CSSStyleProps): VNode<HTMLInputElementAttrs | undefined, HTMLInputElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Input << VNodeFlags.ElementIdOffset),
    "input",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

// Media Elements:
export function audio(className?: string, attrs?: HTMLAudioElementAttrs, css?: CSSStyleProps): VNode<HTMLAudioElementAttrs | undefined, HTMLAudioElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Audio << VNodeFlags.ElementIdOffset),
    "audio",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function video(className?: string, attrs?: HTMLVideoElementAttrs, css?: CSSStyleProps): VNode<HTMLVideoElementAttrs | undefined, HTMLVideoElement> {
  return new VNode(
    VNodeFlags.Element | (TagId.Video << VNodeFlags.ElementIdOffset),
    "video",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}
