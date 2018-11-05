import {
  HTMLAnchorElementAttrs, HTMLElementAttrs, HTMLAreaElementAttrs, HTMLAudioElementAttrs,
  HTMLBaseElementAttrs, HTMLBodyElementAttrs, HTMLBRElementAttrs, HTMLButtonElementAttrs,
  HTMLCanvasElementAttrs, HTMLQuoteElementAttrs, HTMLTableCaptionElementAttrs, HTMLTableColElementAttrs,
  HTMLModElementAttrs, HTMLDivElementAttrs, HTMLDListElementAttrs, HTMLFieldSetElementAttrs, HTMLFormElementAttrs,
  HTMLHeadElementAttrs, HTMLHeadingElementAttrs, HTMLHRElementAttrs, HTMLHtmlElementAttrs, HTMLIFrameElementAttrs,
  HTMLImageElementAttrs, HTMLInputElementAttrs, HTMLLabelElementAttrs, HTMLLegendElementAttrs, HTMLLIElementAttrs,
  HTMLLinkElementAttrs, HTMLMapElementAttrs, HTMLMenuElementAttrs, HTMLMetaElementAttrs, HTMLMeterElementAttrs,
  HTMLOListElementAttrs, HTMLOptGroupElementAttrs, HTMLOptionElementAttrs, HTMLParagraphElementAttrs,
  HTMLPictureElementAttrs, HTMLPreElementAttrs, HTMLProgressElementAttrs, HTMLScriptElementAttrs,
  HTMLSelectElementAttrs, HTMLSourceElementAttrs, HTMLSpanElementAttrs, HTMLStyleElementAttrs,
  HTMLTableDataCellElementAttrs, HTMLTableElementAttrs, HTMLTableHeaderCellElementAttrs, HTMLTableRowElementAttrs,
  HTMLTableSectionElementAttrs, HTMLTemplateElementAttrs, HTMLTextAreaElementAttrs, HTMLTitleElementAttrs,
  HTMLTrackElementAttrs, HTMLUListElementAttrs, HTMLVideoElementAttrs,
  CSSStyleProps,

  ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED,

  VNode, VNodeFlags, AttributeDirective,
} from "ivi";

const enum TagId {
  A = 1,
  Abbr = 2,
  Address = 3,
  Area = 4,
  Article = 5,
  Aside = 6,
  B = 7,
  Base = 8,
  Bdo = 9,
  Blockquote = 10,
  Body = 11,
  Br = 12,
  Button = 13,
  Canvas = 14,
  Caption = 15,
  Cite = 16,
  Code = 17,
  Col = 18,
  Colgroup = 19,
  Dd = 20,
  Del = 21,
  Dfn = 22,
  Div = 23,
  Dl = 24,
  Dt = 25,
  Em = 26,
  Fieldset = 27,
  Figcaption = 28,
  Figure = 29,
  Footer = 30,
  Form = 31,
  H1 = 32,
  H2 = 33,
  H3 = 34,
  H4 = 35,
  H5 = 36,
  H6 = 37,
  Head = 38,
  Header = 39,
  Hgroup = 40,
  Hr = 41,
  Html = 42,
  I = 43,
  Iframe = 44,
  Img = 45,
  Input = 46,
  Ins = 47,
  Kbd = 48,
  Label = 49,
  Legend = 50,
  Li = 51,
  Link = 52,
  Main = 53,
  Map = 54,
  Mark = 55,
  Menu = 56,
  Meta = 57,
  Meter = 58,
  Nav = 59,
  Noscript = 60,
  Ol = 61,
  Optgroup = 62,
  Option = 63,
  P = 64,
  Picture = 65,
  Pre = 66,
  Progress = 67,
  Q = 68,
  Rt = 69,
  Ruby = 70,
  S = 71,
  Samp = 72,
  Script = 73,
  Section = 74,
  Select = 75,
  Source = 76,
  Span = 77,
  Strong = 78,
  Style = 79,
  Sub = 80,
  Sup = 81,
  Table = 82,
  Tbody = 83,
  Td = 84,
  Template = 85,
  Textarea = 86,
  Tfoot = 87,
  Th = 88,
  Thead = 89,
  Time = 90,
  Title = 91,
  Tr = 92,
  Track = 93,
  U = 94,
  Ul = 95,
  Wbr = 96,
  Audio = 97,
  Video = 98,
}

/**
 * {@link AttributeDirective} with `""` value and {@link updateValue} sync function.
 */
const VALUE_EMPTY_STRING: AttributeDirective<string | number> = { v: "", u: updateValue };

/**
 * {@link AttributeDirective} with `false` value and {@link updateChecked} sync function.
 */
const CHECKED_FALSE: AttributeDirective<boolean> = { v: false, u: updateChecked };

/**
 * {@link AttributeDirective} with `true` value and {@link updateChecked} sync function.
 */
const CHECKED_TRUE: AttributeDirective<boolean> = { v: true, u: updateChecked };

/**
 * Synchronization function for {@link AttributeDirective} created with {@link VALUE} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function updateValue(
  element: Element,
  key: string,
  prev: string | number | undefined,
  next: string | number | undefined,
) {
  if (prev === void 0) {
    if (next !== "") {
      (element as HTMLInputElement | HTMLTextAreaElement).value = next as string;
    }
  } else {
    if ((element as HTMLInputElement | HTMLTextAreaElement).value !== next) {
      (element as HTMLInputElement | HTMLTextAreaElement).value = next as string;
    }
  }
}

/**
 * Synchronization function for {@link AttributeDirective} created with {@link CHECKED} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function updateChecked(
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
 * VALUE function creates a {@link AttributeDirective} that assigns a `value` property to an HTMLInputElement or
 * HTMLTextAreaElement.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = input("", { value: VALUE("value") });
 *
 * @param v - Value
 * @returns {@link AttributeDirective}
 */
export function VALUE(v: string | number | undefined): AttributeDirective<string | number> {
  return (v === void 0) ?
    ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED :
    v === "" ?
      VALUE_EMPTY_STRING :
      { v, u: updateValue };
}

/**
 * CHECKED function creates a {@link AttributeDirective} that assigns a `checked` property to an HTMLInputElement.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = input("", { checked: CHECKED(true) });
 *
 * @param v - Checked value
 * @returns {@link AttributeDirective}
 */
export function CHECKED(v: boolean | undefined): AttributeDirective<boolean> {
  return (v === void 0) ?
    ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED as any as AttributeDirective<boolean> :
    v ? CHECKED_TRUE : CHECKED_FALSE;
}

/* tslint:disable:max-line-length */
/**
 * Creates Virtual DOM HTML element <a>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <a>
 */
export const a = (className?: string, attrs?: HTMLAnchorElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLAnchorElementAttrs | undefined, HTMLAnchorElement>(
    VNodeFlags.Element | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <abbr>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <abbr>
 */
export const abbr = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Abbr << VNodeFlags.ElementIdOffset),
    "abbr",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <address>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <address>
 */
export const address = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Address << VNodeFlags.ElementIdOffset),
    "address",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <article>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <article>
 */
export const article = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Article << VNodeFlags.ElementIdOffset),
    "article",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <aside>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <aside>
 */
export const aside = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Aside << VNodeFlags.ElementIdOffset),
    "aside",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <b>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <b>
 */
export const b = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.B << VNodeFlags.ElementIdOffset),
    "b",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <base>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <base>
 */
export const base = (className?: string, attrs?: HTMLBaseElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLBaseElementAttrs | undefined, HTMLBaseElement>(
    VNodeFlags.Element | (TagId.Base << VNodeFlags.ElementIdOffset),
    "base",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <bdo>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <bdo>
 */
export const bdo = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Bdo << VNodeFlags.ElementIdOffset),
    "bdo",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <blockquote>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <blockquote>
 */
export const blockquote = (className?: string, attrs?: HTMLQuoteElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLQuoteElementAttrs | undefined, HTMLQuoteElement>(
    VNodeFlags.Element | (TagId.Blockquote << VNodeFlags.ElementIdOffset),
    "blockquote",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <body>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <body>
 */
export const body = (className?: string, attrs?: HTMLBodyElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLBodyElementAttrs | undefined, HTMLBodyElement>(
    VNodeFlags.Element | (TagId.Body << VNodeFlags.ElementIdOffset),
    "body",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <br>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <br>
 */
export const br = (className?: string, attrs?: HTMLBRElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLBRElementAttrs | undefined, HTMLBRElement>(
    VNodeFlags.Element | (TagId.Br << VNodeFlags.ElementIdOffset),
    "br",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <button>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <button>
 */
export const button = (className?: string, attrs?: HTMLButtonElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLButtonElementAttrs | undefined, HTMLButtonElement>(
    VNodeFlags.Element | (TagId.Button << VNodeFlags.ElementIdOffset),
    "button",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <canvas>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <canvas>
 */
export const canvas = (className?: string, attrs?: HTMLCanvasElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLCanvasElementAttrs | undefined, HTMLCanvasElement>(
    VNodeFlags.Element | (TagId.Canvas << VNodeFlags.ElementIdOffset),
    "canvas",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <caption>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <caption>
 */
export const caption = (className?: string, attrs?: HTMLTableCaptionElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableCaptionElementAttrs | undefined, HTMLTableCaptionElement>(
    VNodeFlags.Element | (TagId.Caption << VNodeFlags.ElementIdOffset),
    "caption",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <cite>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <cite>
 */
export const cite = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Cite << VNodeFlags.ElementIdOffset),
    "cite",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <code>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <code>
 */
export const code = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Code << VNodeFlags.ElementIdOffset),
    "code",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <col>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <col>
 */
export const col = (className?: string, attrs?: HTMLTableColElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableColElementAttrs | undefined, HTMLTableColElement>(
    VNodeFlags.Element | (TagId.Col << VNodeFlags.ElementIdOffset),
    "col",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <colgroup>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <colgroup>
 */
export const colgroup = (className?: string, attrs?: HTMLTableColElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableColElementAttrs | undefined, HTMLTableColElement>(
    VNodeFlags.Element | (TagId.Colgroup << VNodeFlags.ElementIdOffset),
    "colgroup",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <del>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <del>
 */
export const del = (className?: string, attrs?: HTMLModElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLModElementAttrs | undefined, HTMLModElement>(
    VNodeFlags.Element | (TagId.Del << VNodeFlags.ElementIdOffset),
    "del",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <dfn>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <dfn>
 */
export const dfn = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Dfn << VNodeFlags.ElementIdOffset),
    "dfn",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <div>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <div>
 */
export const div = (className?: string, attrs?: HTMLDivElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLDivElementAttrs | undefined, HTMLDivElement>(
    VNodeFlags.Element | (TagId.Div << VNodeFlags.ElementIdOffset),
    "div",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <dd>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <dd>
 */
export const dd = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Dd << VNodeFlags.ElementIdOffset),
    "dd",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <dl>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <dl>
 */
export const dl = (className?: string, attrs?: HTMLDListElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLDListElementAttrs | undefined, HTMLDListElement>(
    VNodeFlags.Element | (TagId.Dl << VNodeFlags.ElementIdOffset),
    "dl",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <dt>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <dt>
 */
export const dt = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Dt << VNodeFlags.ElementIdOffset),
    "dt",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <em>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <em>
 */
export const em = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Em << VNodeFlags.ElementIdOffset),
    "em",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <fieldset>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <fieldset>
 */
export const fieldset = (className?: string, attrs?: HTMLFieldSetElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLFieldSetElementAttrs | undefined, HTMLFieldSetElement>(
    VNodeFlags.Element | (TagId.Fieldset << VNodeFlags.ElementIdOffset),
    "fieldset",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <figcaption>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <figcaption>
 */
export const figcaption = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Figcaption << VNodeFlags.ElementIdOffset),
    "figcaption",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <figure>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <figure>
 */
export const figure = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Figure << VNodeFlags.ElementIdOffset),
    "figure",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <footer>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <footer>
 */
export const footer = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Footer << VNodeFlags.ElementIdOffset),
    "footer",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <form>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <form>
 */
export const form = (className?: string, attrs?: HTMLFormElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLFormElementAttrs | undefined, HTMLFormElement>(
    VNodeFlags.Element | (TagId.Form << VNodeFlags.ElementIdOffset),
    "form",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <h1>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <h1>
 */
export const h1 = (className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement>(
    VNodeFlags.Element | (TagId.H1 << VNodeFlags.ElementIdOffset),
    "h1",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <h2>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h2}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <h2>
 */
export const h2 = (className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement>(
    VNodeFlags.Element | (TagId.H2 << VNodeFlags.ElementIdOffset),
    "h2",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <h3>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h3}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <h3>
 */
export const h3 = (className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement>(
    VNodeFlags.Element | (TagId.H3 << VNodeFlags.ElementIdOffset),
    "h3",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <h4>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h4}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <h4>
 */
export const h4 = (className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement>(
    VNodeFlags.Element | (TagId.H4 << VNodeFlags.ElementIdOffset),
    "h4",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <h5>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h5}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <h5>
 */
export const h5 = (className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement>(
    VNodeFlags.Element | (TagId.H5 << VNodeFlags.ElementIdOffset),
    "h5",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <h6>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h6}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <h6>
 */
export const h6 = (className?: string, attrs?: HTMLHeadingElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLHeadingElementAttrs | undefined, HTMLHeadingElement>(
    VNodeFlags.Element | (TagId.H6 << VNodeFlags.ElementIdOffset),
    "h6",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <head>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <head>
 */
export const head = (className?: string, attrs?: HTMLHeadElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLHeadElementAttrs | undefined, HTMLHeadElement>(
    VNodeFlags.Element | (TagId.Head << VNodeFlags.ElementIdOffset),
    "head",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <header>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <header>
 */
export const header = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Header << VNodeFlags.ElementIdOffset),
    "header",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <hgroup>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <hgroup>
 */
export const hgroup = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Hgroup << VNodeFlags.ElementIdOffset),
    "hgroup",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <hr>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <hr>
 */
export const hr = (className?: string, attrs?: HTMLHRElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLHRElementAttrs | undefined, HTMLHRElement>(
    VNodeFlags.Element | (TagId.Hr << VNodeFlags.ElementIdOffset),
    "hr",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <html>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <html>
 */
export const html = (className?: string, attrs?: HTMLHtmlElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLHtmlElementAttrs | undefined, HTMLHtmlElement>(
    VNodeFlags.Element | (TagId.Html << VNodeFlags.ElementIdOffset),
    "html",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <i>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <i>
 */
export const i = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.I << VNodeFlags.ElementIdOffset),
    "i",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <iframe>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <iframe>
 */
export const iframe = (className?: string, attrs?: HTMLIFrameElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLIFrameElementAttrs | undefined, HTMLIFrameElement>(
    VNodeFlags.Element | (TagId.Iframe << VNodeFlags.ElementIdOffset),
    "iframe",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <img>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <img>
 */
export const img = (className?: string, attrs?: HTMLImageElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLImageElementAttrs | undefined, HTMLImageElement>(
    VNodeFlags.Element | (TagId.Img << VNodeFlags.ElementIdOffset),
    "img",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <area>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <area>
 */
export const imgArea = (className?: string, attrs?: HTMLAreaElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLAreaElementAttrs | undefined, HTMLAreaElement>(
    VNodeFlags.Element | (TagId.Area << VNodeFlags.ElementIdOffset),
    "area",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <map>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <map>
 */
export const imgMap = (className?: string, attrs?: HTMLMapElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLMapElementAttrs | undefined, HTMLMapElement>(
    VNodeFlags.Element | (TagId.Map << VNodeFlags.ElementIdOffset),
    "map",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <ins>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <ins>
 */
export const ins = (className?: string, attrs?: HTMLModElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLModElementAttrs | undefined, HTMLModElement>(
    VNodeFlags.Element | (TagId.Ins << VNodeFlags.ElementIdOffset),
    "ins",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <kbd>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <kbd>
 */
export const kbd = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Kbd << VNodeFlags.ElementIdOffset),
    "kbd",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <label>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <label>
 */
export const label = (className?: string, attrs?: HTMLLabelElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLLabelElementAttrs | undefined, HTMLLabelElement>(
    VNodeFlags.Element | (TagId.Label << VNodeFlags.ElementIdOffset),
    "label",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <legend>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <legend>
 */
export const legend = (className?: string, attrs?: HTMLLegendElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLLegendElementAttrs | undefined, HTMLLegendElement>(
    VNodeFlags.Element | (TagId.Legend << VNodeFlags.ElementIdOffset),
    "legend",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <li>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <li>
 */
export const li = (className?: string, attrs?: HTMLLIElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLLIElementAttrs | undefined, HTMLLIElement>(
    VNodeFlags.Element | (TagId.Li << VNodeFlags.ElementIdOffset),
    "li",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <link>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <link>
 */
export const link = (className?: string, attrs?: HTMLLinkElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLLinkElementAttrs | undefined, HTMLLinkElement>(
    VNodeFlags.Element | (TagId.Link << VNodeFlags.ElementIdOffset),
    "link",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <main>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <main>
 */
export const main = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Main << VNodeFlags.ElementIdOffset),
    "main",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <mark>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <mark>
 */
export const mark = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Mark << VNodeFlags.ElementIdOffset),
    "mark",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <menu>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <menu>
 */
export const menu = (className?: string, attrs?: HTMLMenuElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLMenuElementAttrs | undefined, HTMLMenuElement>(
    VNodeFlags.Element | (TagId.Menu << VNodeFlags.ElementIdOffset),
    "menu",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <meta>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <meta>
 */
export const meta = (className?: string, attrs?: HTMLMetaElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLMetaElementAttrs | undefined, HTMLMetaElement>(
    VNodeFlags.Element | (TagId.Meta << VNodeFlags.ElementIdOffset),
    "meta",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <meter>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <meter>
 */
export const meter = (className?: string, attrs?: HTMLMeterElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLMeterElementAttrs | undefined, HTMLMeterElement>(
    VNodeFlags.Element | (TagId.Meter << VNodeFlags.ElementIdOffset),
    "meter",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <nav>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <nav>
 */
export const nav = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Nav << VNodeFlags.ElementIdOffset),
    "nav",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <noscript>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <noscript>
 */
export const noscript = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Noscript << VNodeFlags.ElementIdOffset),
    "noscript",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <ol>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <ol>
 */
export const ol = (className?: string, attrs?: HTMLOListElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLOListElementAttrs | undefined, HTMLOListElement>(
    VNodeFlags.Element | (TagId.Ol << VNodeFlags.ElementIdOffset),
    "ol",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <optgroup>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <optgroup>
 */
export const optgroup = (className?: string, attrs?: HTMLOptGroupElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLOptGroupElementAttrs | undefined, HTMLOptGroupElement>(
    VNodeFlags.Element | (TagId.Optgroup << VNodeFlags.ElementIdOffset),
    "optgroup",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <option>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <option>
 */
export const option = (className?: string, attrs?: HTMLOptionElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLOptionElementAttrs | undefined, HTMLOptionElement>(
    VNodeFlags.Element | (TagId.Option << VNodeFlags.ElementIdOffset),
    "option",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <p>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <p>
 */
export const p = (className?: string, attrs?: HTMLParagraphElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLParagraphElementAttrs | undefined, HTMLParagraphElement>(
    VNodeFlags.Element | (TagId.P << VNodeFlags.ElementIdOffset),
    "p",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <picture>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <picture>
 */
export const picture = (className?: string, attrs?: HTMLPictureElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLPictureElementAttrs | undefined, HTMLPictureElement>(
    VNodeFlags.Element | (TagId.Picture << VNodeFlags.ElementIdOffset),
    "picture",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <pre>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <pre>
 */
export const pre = (className?: string, attrs?: HTMLPreElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLPreElementAttrs | undefined, HTMLPreElement>(
    VNodeFlags.Element | (TagId.Pre << VNodeFlags.ElementIdOffset),
    "pre",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <progress>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <progress>
 */
export const progress = (className?: string, attrs?: HTMLProgressElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLProgressElementAttrs | undefined, HTMLProgressElement>(
    VNodeFlags.Element | (TagId.Progress << VNodeFlags.ElementIdOffset),
    "progress",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <q>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <q>
 */
export const q = (className?: string, attrs?: HTMLQuoteElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLQuoteElementAttrs | undefined, HTMLQuoteElement>(
    VNodeFlags.Element | (TagId.Q << VNodeFlags.ElementIdOffset),
    "q",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <rt>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <rt>
 */
export const rt = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Rt << VNodeFlags.ElementIdOffset),
    "rt",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <ruby>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <ruby>
 */
export const ruby = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Ruby << VNodeFlags.ElementIdOffset),
    "ruby",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <s>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <s>
 */
export const s = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.S << VNodeFlags.ElementIdOffset),
    "s",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <samp>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <samp>
 */
export const samp = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Samp << VNodeFlags.ElementIdOffset),
    "samp",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <script>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <script>
 */
export const script = (className?: string, attrs?: HTMLScriptElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLScriptElementAttrs | undefined, HTMLScriptElement>(
    VNodeFlags.Element | (TagId.Script << VNodeFlags.ElementIdOffset),
    "script",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <section>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <section>
 */
export const section = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Section << VNodeFlags.ElementIdOffset),
    "section",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <select>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <select>
 */
export const select = (className?: string, attrs?: HTMLSelectElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLSelectElementAttrs | undefined, HTMLSelectElement>(
    VNodeFlags.Element | (TagId.Select << VNodeFlags.ElementIdOffset),
    "select",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <source>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <source>
 */
export const source = (className?: string, attrs?: HTMLSourceElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLSourceElementAttrs | undefined, HTMLSourceElement>(
    VNodeFlags.Element | (TagId.Source << VNodeFlags.ElementIdOffset),
    "source",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <span>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <span>
 */
export const span = (className?: string, attrs?: HTMLSpanElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLSpanElementAttrs | undefined, HTMLSpanElement>(
    VNodeFlags.Element | (TagId.Span << VNodeFlags.ElementIdOffset),
    "span",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <strong>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <strong>
 */
export const strong = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Strong << VNodeFlags.ElementIdOffset),
    "strong",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <style>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <style>
 */
export const style = (className?: string, attrs?: HTMLStyleElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLStyleElementAttrs | undefined, HTMLStyleElement>(
    VNodeFlags.Element | (TagId.Style << VNodeFlags.ElementIdOffset),
    "style",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <sub>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <sub>
 */
export const sub = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Sub << VNodeFlags.ElementIdOffset),
    "sub",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <sup>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <sup>
 */
export const sup = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Sup << VNodeFlags.ElementIdOffset),
    "sup",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <table>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <table>
 */
export const table = (className?: string, attrs?: HTMLTableElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableElementAttrs | undefined, HTMLTableElement>(
    VNodeFlags.Element | (TagId.Table << VNodeFlags.ElementIdOffset),
    "table",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <tbody>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <tbody>
 */
export const tbody = (className?: string, attrs?: HTMLTableSectionElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableSectionElementAttrs | undefined, HTMLTableSectionElement>(
    VNodeFlags.Element | (TagId.Tbody << VNodeFlags.ElementIdOffset),
    "tbody",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <td>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <td>
 */
export const td = (className?: string, attrs?: HTMLTableDataCellElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableDataCellElementAttrs | undefined, HTMLTableDataCellElement>(
    VNodeFlags.Element | (TagId.Td << VNodeFlags.ElementIdOffset),
    "td",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <template>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <template>
 */
export const template = (className?: string, attrs?: HTMLTemplateElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTemplateElementAttrs | undefined, HTMLTemplateElement>(
    VNodeFlags.Element | (TagId.Template << VNodeFlags.ElementIdOffset),
    "template",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <tfoot>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <tfoot>
 */
export const tfoot = (className?: string, attrs?: HTMLTableSectionElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableSectionElementAttrs | undefined, HTMLTableSectionElement>(
    VNodeFlags.Element | (TagId.Tfoot << VNodeFlags.ElementIdOffset),
    "tfoot",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <th>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <th>
 */
export const th = (className?: string, attrs?: HTMLTableHeaderCellElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableHeaderCellElementAttrs | undefined, HTMLTableHeaderCellElement>(
    VNodeFlags.Element | (TagId.Th << VNodeFlags.ElementIdOffset),
    "th",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <thead>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <thead>
 */
export const thead = (className?: string, attrs?: HTMLTableSectionElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableSectionElementAttrs | undefined, HTMLTableSectionElement>(
    VNodeFlags.Element | (TagId.Thead << VNodeFlags.ElementIdOffset),
    "thead",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <time>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <time>
 */
export const time = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Time << VNodeFlags.ElementIdOffset),
    "time",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <title>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <title>
 */
export const title = (className?: string, attrs?: HTMLTitleElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTitleElementAttrs | undefined, HTMLTitleElement>(
    VNodeFlags.Element | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <tr>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <tr>
 */
export const tr = (className?: string, attrs?: HTMLTableRowElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTableRowElementAttrs | undefined, HTMLTableRowElement>(
    VNodeFlags.Element | (TagId.Tr << VNodeFlags.ElementIdOffset),
    "tr",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <track>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <track>
 */
export const track = (className?: string, attrs?: HTMLTrackElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTrackElementAttrs | undefined, HTMLTrackElement>(
    VNodeFlags.Element | (TagId.Track << VNodeFlags.ElementIdOffset),
    "track",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <u>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <u>
 */
export const u = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.U << VNodeFlags.ElementIdOffset),
    "u",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <ul>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <ul>
 */
export const ul = (className?: string, attrs?: HTMLUListElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLUListElementAttrs | undefined, HTMLUListElement>(
    VNodeFlags.Element | (TagId.Ul << VNodeFlags.ElementIdOffset),
    "ul",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <wbr>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <wbr>
 */
export const wbr = (className?: string, attrs?: HTMLElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLElementAttrs | undefined, HTMLElement>(
    VNodeFlags.Element | (TagId.Wbr << VNodeFlags.ElementIdOffset),
    "wbr",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <textarea>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <textarea>
 */
export const textarea = (className?: string, attrs?: HTMLTextAreaElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLTextAreaElementAttrs | undefined, HTMLTextAreaElement>(
    VNodeFlags.Element | (TagId.Textarea << VNodeFlags.ElementIdOffset),
    "textarea",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <input>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <input>
 */
export const input = (className?: string, attrs?: HTMLInputElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLInputElementAttrs | undefined, HTMLInputElement>(
    VNodeFlags.Element | (TagId.Input << VNodeFlags.ElementIdOffset),
    "input",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <audio>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <audio>
 */
export const audio = (className?: string, attrs?: HTMLAudioElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLAudioElementAttrs | undefined, HTMLAudioElement>(
    VNodeFlags.Element | (TagId.Audio << VNodeFlags.ElementIdOffset),
    "audio",
    attrs,
    className,
    css,
  )
);

/**
 * Creates Virtual DOM HTML element <video>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM HTML element <video>
 */
export const video = (className?: string, attrs?: HTMLVideoElementAttrs, css?: CSSStyleProps) => (
  new VNode<HTMLVideoElementAttrs | undefined, HTMLVideoElement>(
    VNodeFlags.Element | (TagId.Video << VNodeFlags.ElementIdOffset),
    "video",
    attrs,
    className,
    css,
  )
);
