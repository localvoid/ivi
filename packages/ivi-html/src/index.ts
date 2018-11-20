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

  ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED,

  AttributeDirective, htmlElement,
} from "ivi";

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
export const a = htmlElement<HTMLAnchorElementAttrs, HTMLAnchorElement>("a");

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
export const abbr = htmlElement<HTMLElementAttrs, HTMLElement>("abbr");

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
export const address = htmlElement<HTMLElementAttrs, HTMLElement>("address");

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
export const article = htmlElement<HTMLElementAttrs, HTMLElement>("article");

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
export const aside = htmlElement<HTMLElementAttrs, HTMLElement>("aside");

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
export const b = htmlElement<HTMLElementAttrs, HTMLElement>("b");

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
export const base = htmlElement<HTMLBaseElementAttrs, HTMLBaseElement>("base");

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
export const bdo = htmlElement<HTMLElementAttrs, HTMLElement>("bdo");

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
export const blockquote = htmlElement<HTMLQuoteElementAttrs, HTMLQuoteElement>("blockquote");

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
export const body = htmlElement<HTMLBodyElementAttrs, HTMLBodyElement>("body");

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
export const br = htmlElement<HTMLBRElementAttrs, HTMLBRElement>("br");

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
export const button = htmlElement<HTMLButtonElementAttrs, HTMLButtonElement>("button");

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
export const canvas = htmlElement<HTMLCanvasElementAttrs, HTMLCanvasElement>("canvas");

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
export const caption = htmlElement<HTMLTableCaptionElementAttrs, HTMLTableCaptionElement>("caption");

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
export const cite = htmlElement<HTMLElementAttrs, HTMLElement>("cite");

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
export const code = htmlElement<HTMLElementAttrs, HTMLElement>("code");

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
export const col = htmlElement<HTMLTableColElementAttrs, HTMLTableColElement>("col");

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
export const colgroup = htmlElement<HTMLTableColElementAttrs, HTMLTableColElement>("colgroup");

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
export const del = htmlElement<HTMLModElementAttrs, HTMLModElement>("del");

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
export const dfn = htmlElement<HTMLElementAttrs, HTMLElement>("dfn");

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
export const div = htmlElement<HTMLDivElementAttrs, HTMLDivElement>("div");

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
export const dd = htmlElement<HTMLElementAttrs, HTMLElement>("dd");

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
export const dl = htmlElement<HTMLDListElementAttrs, HTMLDListElement>("dl");

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
export const dt = htmlElement<HTMLElementAttrs, HTMLElement>("dt");

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
export const em = htmlElement<HTMLElementAttrs, HTMLElement>("em");

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
export const fieldset = htmlElement<HTMLFieldSetElementAttrs, HTMLFieldSetElement>("fieldset");

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
export const figcaption = htmlElement<HTMLElementAttrs, HTMLElement>("figcaption");

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
export const figure = htmlElement<HTMLElementAttrs, HTMLElement>("figure");

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
export const footer = htmlElement<HTMLElementAttrs, HTMLElement>("footer");

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
export const form = htmlElement<HTMLFormElementAttrs, HTMLFormElement>("form");

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
export const h1 = htmlElement<HTMLHeadingElementAttrs, HTMLHeadingElement>("h1");

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
export const h2 = htmlElement<HTMLHeadingElementAttrs, HTMLHeadingElement>("h2");

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
export const h3 = htmlElement<HTMLHeadingElementAttrs, HTMLHeadingElement>("h3");

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
export const h4 = htmlElement<HTMLHeadingElementAttrs, HTMLHeadingElement>("h4");

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
export const h5 = htmlElement<HTMLHeadingElementAttrs, HTMLHeadingElement>("h5");

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
export const h6 = htmlElement<HTMLHeadingElementAttrs, HTMLHeadingElement>("h6");

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
export const head = htmlElement<HTMLHeadElementAttrs, HTMLHeadElement>("head");

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
export const header = htmlElement<HTMLElementAttrs, HTMLElement>("header");

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
export const hgroup = htmlElement<HTMLElementAttrs, HTMLElement>("hgroup");

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
export const hr = htmlElement<HTMLHRElementAttrs, HTMLHRElement>("hr");

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
export const html = htmlElement<HTMLHtmlElementAttrs, HTMLHtmlElement>("html");

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
export const i = htmlElement<HTMLElementAttrs, HTMLElement>("i");

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
export const iframe = htmlElement<HTMLIFrameElementAttrs, HTMLIFrameElement>("iframe");

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
export const img = htmlElement<HTMLImageElementAttrs, HTMLImageElement>("img");

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
export const imgArea = htmlElement<HTMLAreaElementAttrs, HTMLAreaElement>("area");

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
export const imgMap = htmlElement<HTMLMapElementAttrs, HTMLMapElement>("map");

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
export const ins = htmlElement<HTMLModElementAttrs, HTMLModElement>("ins");

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
export const kbd = htmlElement<HTMLElementAttrs, HTMLElement>("kbd");

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
export const label = htmlElement<HTMLLabelElementAttrs, HTMLLabelElement>("label");

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
export const legend = htmlElement<HTMLLegendElementAttrs, HTMLLegendElement>("legend");

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
export const li = htmlElement<HTMLLIElementAttrs, HTMLLIElement>("li");

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
export const link = htmlElement<HTMLLinkElementAttrs, HTMLLinkElement>("link");

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
export const main = htmlElement<HTMLElementAttrs, HTMLElement>("main");

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
export const mark = htmlElement<HTMLElementAttrs, HTMLElement>("mark");

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
export const menu = htmlElement<HTMLMenuElementAttrs, HTMLMenuElement>("menu");

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
export const meta = htmlElement<HTMLMetaElementAttrs, HTMLMetaElement>("meta");

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
export const meter = htmlElement<HTMLMeterElementAttrs, HTMLMeterElement>("meter");

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
export const nav = htmlElement<HTMLElementAttrs, HTMLElement>("nav");

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
export const noscript = htmlElement<HTMLElementAttrs, HTMLElement>("noscript");

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
export const ol = htmlElement<HTMLOListElementAttrs, HTMLOListElement>("ol");

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
export const optgroup = htmlElement<HTMLOptGroupElementAttrs, HTMLOptGroupElement>("optgroup");

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
export const option = htmlElement<HTMLOptionElementAttrs, HTMLOptionElement>("option");

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
export const p = htmlElement<HTMLParagraphElementAttrs, HTMLParagraphElement>("p");

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
export const picture = htmlElement<HTMLPictureElementAttrs, HTMLPictureElement>("picture");

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
export const pre = htmlElement<HTMLPreElementAttrs, HTMLPreElement>("pre");

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
export const progress = htmlElement<HTMLProgressElementAttrs, HTMLProgressElement>("progress");

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
export const q = htmlElement<HTMLQuoteElementAttrs, HTMLQuoteElement>("q");

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
export const rt = htmlElement<HTMLElementAttrs, HTMLElement>("rt");

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
export const ruby = htmlElement<HTMLElementAttrs, HTMLElement>("ruby");

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
export const s = htmlElement<HTMLElementAttrs, HTMLElement>("s");

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
export const samp = htmlElement<HTMLElementAttrs, HTMLElement>("samp");

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
export const script = htmlElement<HTMLScriptElementAttrs, HTMLScriptElement>("script");

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
export const section = htmlElement<HTMLElementAttrs, HTMLElement>("section");

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
export const select = htmlElement<HTMLSelectElementAttrs, HTMLSelectElement>("select");

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
export const source = htmlElement<HTMLSourceElementAttrs, HTMLSourceElement>("source");

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
export const span = htmlElement<HTMLSpanElementAttrs, HTMLSpanElement>("span");

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
export const strong = htmlElement<HTMLElementAttrs, HTMLElement>("strong");

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
export const style = htmlElement<HTMLStyleElementAttrs, HTMLStyleElement>("style");

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
export const sub = htmlElement<HTMLElementAttrs, HTMLElement>("sub");

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
export const sup = htmlElement<HTMLElementAttrs, HTMLElement>("sup");

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
export const table = htmlElement<HTMLTableElementAttrs, HTMLTableElement>("table");

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
export const tbody = htmlElement<HTMLTableSectionElementAttrs, HTMLTableSectionElement>("tbody");

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
export const td = htmlElement<HTMLTableDataCellElementAttrs, HTMLTableDataCellElement>("td");

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
export const template = htmlElement<HTMLTemplateElementAttrs, HTMLTemplateElement>("template");

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
export const tfoot = htmlElement<HTMLTableSectionElementAttrs, HTMLTableSectionElement>("tfoot");

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
export const th = htmlElement<HTMLTableHeaderCellElementAttrs, HTMLTableHeaderCellElement>("th");

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
export const thead = htmlElement<HTMLTableSectionElementAttrs, HTMLTableSectionElement>("thead");

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
export const time = htmlElement<HTMLElementAttrs, HTMLElement>("time");

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
export const title = htmlElement<HTMLTitleElementAttrs, HTMLTitleElement>("title");

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
export const tr = htmlElement<HTMLTableRowElementAttrs, HTMLTableRowElement>("tr");

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
export const track = htmlElement<HTMLTrackElementAttrs, HTMLTrackElement>("track");

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
export const u = htmlElement<HTMLElementAttrs, HTMLElement>("u");

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
export const ul = htmlElement<HTMLUListElementAttrs, HTMLUListElement>("ul");

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
export const wbr = htmlElement<HTMLElementAttrs, HTMLElement>("wbr");

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
export const textarea = htmlElement<HTMLTextAreaElementAttrs, HTMLTextAreaElement>("textarea");

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
export const input = htmlElement<HTMLInputElementAttrs, HTMLInputElement>("input");

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
export const audio = htmlElement<HTMLAudioElementAttrs, HTMLAudioElement>("audio");

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
export const video = htmlElement<HTMLVideoElementAttrs, HTMLVideoElement>("video");
