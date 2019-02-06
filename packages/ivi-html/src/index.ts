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

  AttributeDirective, elementFactory, htmlElementFactory, NodeFlags, NOOP,
  emitAttribute, emitChildren, escapeAttributeValue, escapeText,
} from "ivi";

/**
 * {@link AttributeDirective} with `""` value and {@link updateValue} sync function.
 */
const VALUE_EMPTY: AttributeDirective<string | number> = { v: "", u: updateValue };

/**
 * {@link AttributeDirective} with `""` value that doesn't emit any attributes.
 */
const VALUE_EMPTY_STRING: AttributeDirective<string | number> = { v: "", u: NOOP };

/**
 * {@link AttributeDirective} with `false` value and {@link updateChecked} sync function.
 */
const CHECKED_FALSE: AttributeDirective<boolean> = { v: false, u: updateChecked };

/**
 * {@link AttributeDirective} with `true` value and {@link updateChecked} sync function.
 */
const CHECKED_TRUE: AttributeDirective<boolean> = { v: true, u: updateChecked };

/**
 * {@link AttributeDirective} with `false` value that doesn't emit any attributes.
 */
const CHECKED_FALSE_STRING: AttributeDirective<boolean> = { v: false, s: NOOP };

/**
 * {@link AttributeDirective} with `true` value that emits `checked` attribute.
 */
const CHECKED_TRUE_STRING: AttributeDirective<boolean> = { v: true, s: () => { emitAttribute("checked"); } };

/**
 * Render to string function for an {@link AttributeDirective} created with {@link VALUE} function.
 *
 * @param key Attribute key.
 * @param value Value.
 */
function renderToStringValue(key: string, value: string | number) {
  emitAttribute(`value="${escapeAttributeValue(value)}"`);
}

/**
 * Render to string function for an {@link AttributeDirective} created with {@link CONTENT} function.
 *
 * @param key Attribute key.
 * @param value Value.
 */
function renderToStringContent(key: string, value: string | number) {
  emitChildren(escapeText(value));
}

/**
 * Synchronization function for {@link AttributeDirective} created with {@link VALUE} function.
 *
 * @param element Target element.
 * @param key Attribute key.
 * @param prev Previous value.
 * @param next Next value.
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
  } else if (next !== void 0) {
    if ((element as HTMLInputElement | HTMLTextAreaElement).value !== next) {
      (element as HTMLInputElement | HTMLTextAreaElement).value = next as string;
    }
  }
}

/**
 * Synchronization function for {@link AttributeDirective} created with {@link CHECKED} function.
 *
 * @param element Target element.
 * @param key Attribute key.
 * @param prev Previous value.
 * @param next Next value.
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
  } else if (next !== void 0) {
    if ((element as HTMLInputElement).checked !== next) {
      (element as HTMLInputElement).checked = next!;
    }
  }
}

/**
 * VALUE function creates a {@link AttributeDirective} that assigns a `value` property to an HTMLInputElement.
 *
 * @example
 *
 *   const e = input("", { value: VALUE("value") });
 *
 * @param v Value.
 * @returns {@link AttributeDirective}
 */
export const VALUE = (v: string | number): AttributeDirective<string | number> => (
  TARGET === "ssr" ?
    v === "" ? VALUE_EMPTY_STRING : { v, s: renderToStringValue } :
    v === "" ? VALUE_EMPTY : { v, u: updateValue }
);

/**
 * CONTENT function creates a {@link AttributeDirective} that assigns a `value` property to an HTMLTextAreaElement.
 *
 * @example
 *
 *   const e = textarea("", { content: CONTENT("content") });
 *
 * @param v Value.
 * @returns {@link AttributeDirective}
 */
export const CONTENT = TARGET === "ssr" ?
  (v: string | number): AttributeDirective<string | number> => (
    v === "" ? VALUE_EMPTY_STRING : ({ v, s: renderToStringContent })
  ) :
  VALUE;

/**
 * CHECKED function creates a {@link AttributeDirective} that assigns a `checked` property to an HTMLInputElement.
 *
 * @example
 *
 *   const e = input("", { checked: CHECKED(true) });
 *
 * @param v Checked value.
 * @returns {@link AttributeDirective}
 */
export const CHECKED = (v: boolean): AttributeDirective<boolean> => v ?
  TARGET === "ssr" ? CHECKED_TRUE_STRING : CHECKED_TRUE :
  TARGET === "ssr" ? CHECKED_FALSE_STRING : CHECKED_FALSE;

/* tslint:disable:max-line-length */
/**
 * Creates OpNode HTML element <a>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <a>
 */
export const a = /*#__PURE__*/htmlElementFactory<HTMLAnchorElementAttrs, HTMLAnchorElement>("a");

/**
 * Creates OpNode HTML element <abbr>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <abbr>
 */
export const abbr = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("abbr");

/**
 * Creates OpNode HTML element <address>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <address>
 */
export const address = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("address");

/**
 * Creates OpNode HTML element <article>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <article>
 */
export const article = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("article");

/**
 * Creates OpNode HTML element <aside>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <aside>
 */
export const aside = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("aside");

/**
 * Creates OpNode HTML element <b>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <b>
 */
export const b = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("b");

/**
 * Creates OpNode HTML element <base>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <base>
 */
export const base = /*#__PURE__*/elementFactory<HTMLBaseElementAttrs, HTMLBaseElement>("base", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <bdo>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <bdo>
 */
export const bdo = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("bdo");

/**
 * Creates OpNode HTML element <blockquote>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <blockquote>
 */
export const blockquote = /*#__PURE__*/htmlElementFactory<HTMLQuoteElementAttrs, HTMLQuoteElement>("blockquote");

/**
 * Creates OpNode HTML element <body>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <body>
 */
export const body = /*#__PURE__*/htmlElementFactory<HTMLBodyElementAttrs, HTMLBodyElement>("body");

/**
 * Creates OpNode HTML element <br>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <br>
 */
export const br = /*#__PURE__*/elementFactory<HTMLBRElementAttrs, HTMLBRElement>("br", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <button>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <button>
 */
export const button = /*#__PURE__*/htmlElementFactory<HTMLButtonElementAttrs, HTMLButtonElement>("button");

/**
 * Creates OpNode HTML element <canvas>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <canvas>
 */
export const canvas = /*#__PURE__*/htmlElementFactory<HTMLCanvasElementAttrs, HTMLCanvasElement>("canvas");

/**
 * Creates OpNode HTML element <caption>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <caption>
 */
export const caption = /*#__PURE__*/htmlElementFactory<HTMLTableCaptionElementAttrs, HTMLTableCaptionElement>("caption");

/**
 * Creates OpNode HTML element <cite>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <cite>
 */
export const cite = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("cite");

/**
 * Creates OpNode HTML element <code>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <code>
 */
export const code = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("code");

/**
 * Creates OpNode HTML element <col>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <col>
 */
export const col = /*#__PURE__*/elementFactory<HTMLTableColElementAttrs, HTMLTableColElement>("col", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <colgroup>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <colgroup>
 */
export const colgroup = /*#__PURE__*/htmlElementFactory<HTMLTableColElementAttrs, HTMLTableColElement>("colgroup");

/**
 * Creates OpNode HTML element <del>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <del>
 */
export const del = /*#__PURE__*/htmlElementFactory<HTMLModElementAttrs, HTMLModElement>("del");

/**
 * Creates OpNode HTML element <dfn>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <dfn>
 */
export const dfn = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("dfn");

/**
 * Creates OpNode HTML element <div>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <div>
 */
export const div = /*#__PURE__*/htmlElementFactory<HTMLDivElementAttrs, HTMLDivElement>("div");

/**
 * Creates OpNode HTML element <dd>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <dd>
 */
export const dd = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("dd");

/**
 * Creates OpNode HTML element <dl>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <dl>
 */
export const dl = /*#__PURE__*/htmlElementFactory<HTMLDListElementAttrs, HTMLDListElement>("dl");

/**
 * Creates OpNode HTML element <dt>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <dt>
 */
export const dt = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("dt");

/**
 * Creates OpNode HTML element <em>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <em>
 */
export const em = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("em");

/**
 * Creates OpNode HTML element <fieldset>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <fieldset>
 */
export const fieldset = /*#__PURE__*/htmlElementFactory<HTMLFieldSetElementAttrs, HTMLFieldSetElement>("fieldset");

/**
 * Creates OpNode HTML element <figcaption>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <figcaption>
 */
export const figcaption = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("figcaption");

/**
 * Creates OpNode HTML element <figure>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <figure>
 */
export const figure = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("figure");

/**
 * Creates OpNode HTML element <footer>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <footer>
 */
export const footer = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("footer");

/**
 * Creates OpNode HTML element <form>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <form>
 */
export const form = /*#__PURE__*/htmlElementFactory<HTMLFormElementAttrs, HTMLFormElement>("form");

/**
 * Creates OpNode HTML element <h1>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <h1>
 */
export const h1 = /*#__PURE__*/htmlElementFactory<HTMLHeadingElementAttrs, HTMLHeadingElement>("h1");

/**
 * Creates OpNode HTML element <h2>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h2}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <h2>
 */
export const h2 = /*#__PURE__*/htmlElementFactory<HTMLHeadingElementAttrs, HTMLHeadingElement>("h2");

/**
 * Creates OpNode HTML element <h3>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h3}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <h3>
 */
export const h3 = /*#__PURE__*/htmlElementFactory<HTMLHeadingElementAttrs, HTMLHeadingElement>("h3");

/**
 * Creates OpNode HTML element <h4>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h4}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <h4>
 */
export const h4 = /*#__PURE__*/htmlElementFactory<HTMLHeadingElementAttrs, HTMLHeadingElement>("h4");

/**
 * Creates OpNode HTML element <h5>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h5}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <h5>
 */
export const h5 = /*#__PURE__*/htmlElementFactory<HTMLHeadingElementAttrs, HTMLHeadingElement>("h5");

/**
 * Creates OpNode HTML element <h6>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h6}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <h6>
 */
export const h6 = /*#__PURE__*/htmlElementFactory<HTMLHeadingElementAttrs, HTMLHeadingElement>("h6");

/**
 * Creates OpNode HTML element <head>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <head>
 */
export const head = /*#__PURE__*/htmlElementFactory<HTMLHeadElementAttrs, HTMLHeadElement>("head");

/**
 * Creates OpNode HTML element <header>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <header>
 */
export const header = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("header");

/**
 * Creates OpNode HTML element <hgroup>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <hgroup>
 */
export const hgroup = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("hgroup");

/**
 * Creates OpNode HTML element <hr>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <hr>
 */
export const hr = /*#__PURE__*/elementFactory<HTMLHRElementAttrs, HTMLHRElement>("hr", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <html>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <html>
 */
export const html = /*#__PURE__*/htmlElementFactory<HTMLHtmlElementAttrs, HTMLHtmlElement>("html");

/**
 * Creates OpNode HTML element <i>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <i>
 */
export const i = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("i");

/**
 * Creates OpNode HTML element <iframe>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <iframe>
 */
export const iframe = /*#__PURE__*/htmlElementFactory<HTMLIFrameElementAttrs, HTMLIFrameElement>("iframe");

/**
 * Creates OpNode HTML element <img>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <img>
 */
export const img = /*#__PURE__*/elementFactory<HTMLImageElementAttrs, HTMLImageElement>("img", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <area>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <area>
 */
export const area = /*#__PURE__*/elementFactory<HTMLAreaElementAttrs, HTMLAreaElement>("area", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <map>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <map>
 */
export const map = /*#__PURE__*/htmlElementFactory<HTMLMapElementAttrs, HTMLMapElement>("map");

/**
 * Creates OpNode HTML element <ins>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <ins>
 */
export const ins = /*#__PURE__*/htmlElementFactory<HTMLModElementAttrs, HTMLModElement>("ins");

/**
 * Creates OpNode HTML element <kbd>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <kbd>
 */
export const kbd = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("kbd");

/**
 * Creates OpNode HTML element <label>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <label>
 */
export const label = /*#__PURE__*/htmlElementFactory<HTMLLabelElementAttrs, HTMLLabelElement>("label");

/**
 * Creates OpNode HTML element <legend>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <legend>
 */
export const legend = /*#__PURE__*/htmlElementFactory<HTMLLegendElementAttrs, HTMLLegendElement>("legend");

/**
 * Creates OpNode HTML element <li>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <li>
 */
export const li = /*#__PURE__*/htmlElementFactory<HTMLLIElementAttrs, HTMLLIElement>("li");

/**
 * Creates OpNode HTML element <link>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <link>
 */
export const link = /*#__PURE__*/elementFactory<HTMLLinkElementAttrs, HTMLLinkElement>("link", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <main>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <main>
 */
export const main = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("main");

/**
 * Creates OpNode HTML element <mark>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <mark>
 */
export const mark = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("mark");

/**
 * Creates OpNode HTML element <menu>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <menu>
 */
export const menu = /*#__PURE__*/htmlElementFactory<HTMLMenuElementAttrs, HTMLMenuElement>("menu");

/**
 * Creates OpNode HTML element <meta>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <meta>
 */
export const meta = /*#__PURE__*/elementFactory<HTMLMetaElementAttrs, HTMLMetaElement>("meta", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <meter>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <meter>
 */
export const meter = /*#__PURE__*/htmlElementFactory<HTMLMeterElementAttrs, HTMLMeterElement>("meter");

/**
 * Creates OpNode HTML element <nav>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <nav>
 */
export const nav = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("nav");

/**
 * Creates OpNode HTML element <noscript>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <noscript>
 */
export const noscript = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("noscript");

/**
 * Creates OpNode HTML element <ol>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <ol>
 */
export const ol = /*#__PURE__*/htmlElementFactory<HTMLOListElementAttrs, HTMLOListElement>("ol");

/**
 * Creates OpNode HTML element <optgroup>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <optgroup>
 */
export const optgroup = /*#__PURE__*/htmlElementFactory<HTMLOptGroupElementAttrs, HTMLOptGroupElement>("optgroup");

/**
 * Creates OpNode HTML element <option>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <option>
 */
export const option = /*#__PURE__*/htmlElementFactory<HTMLOptionElementAttrs, HTMLOptionElement>("option");

/**
 * Creates OpNode HTML element <p>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <p>
 */
export const p = /*#__PURE__*/htmlElementFactory<HTMLParagraphElementAttrs, HTMLParagraphElement>("p");

/**
 * Creates OpNode HTML element <picture>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <picture>
 */
export const picture = /*#__PURE__*/htmlElementFactory<HTMLPictureElementAttrs, HTMLPictureElement>("picture");

/**
 * Creates OpNode HTML element <pre>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <pre>
 */
export const pre = /*#__PURE__*/elementFactory<HTMLPreElementAttrs, HTMLPreElement>("pre", NodeFlags.Element | NodeFlags.NewlineEatingElement);

/**
 * Creates OpNode HTML element <progress>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <progress>
 */
export const progress = /*#__PURE__*/htmlElementFactory<HTMLProgressElementAttrs, HTMLProgressElement>("progress");

/**
 * Creates OpNode HTML element <q>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <q>
 */
export const q = /*#__PURE__*/htmlElementFactory<HTMLQuoteElementAttrs, HTMLQuoteElement>("q");

/**
 * Creates OpNode HTML element <rt>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <rt>
 */
export const rt = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("rt");

/**
 * Creates OpNode HTML element <ruby>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <ruby>
 */
export const ruby = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("ruby");

/**
 * Creates OpNode HTML element <s>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <s>
 */
export const s = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("s");

/**
 * Creates OpNode HTML element <samp>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <samp>
 */
export const samp = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("samp");

/**
 * Creates OpNode HTML element <script>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <script>
 */
export const script = /*#__PURE__*/htmlElementFactory<HTMLScriptElementAttrs, HTMLScriptElement>("script");

/**
 * Creates OpNode HTML element <section>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <section>
 */
export const section = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("section");

/**
 * Creates OpNode HTML element <select>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <select>
 */
export const select = /*#__PURE__*/htmlElementFactory<HTMLSelectElementAttrs, HTMLSelectElement>("select");

/**
 * Creates OpNode HTML element <source>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <source>
 */
export const source = /*#__PURE__*/elementFactory<HTMLSourceElementAttrs, HTMLSourceElement>("source", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <span>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <span>
 */
export const span = /*#__PURE__*/htmlElementFactory<HTMLSpanElementAttrs, HTMLSpanElement>("span");

/**
 * Creates OpNode HTML element <strong>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <strong>
 */
export const strong = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("strong");

/**
 * Creates OpNode HTML element <style>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <style>
 */
export const style = /*#__PURE__*/htmlElementFactory<HTMLStyleElementAttrs, HTMLStyleElement>("style");

/**
 * Creates OpNode HTML element <sub>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <sub>
 */
export const sub = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("sub");

/**
 * Creates OpNode HTML element <sup>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <sup>
 */
export const sup = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("sup");

/**
 * Creates OpNode HTML element <table>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <table>
 */
export const table = /*#__PURE__*/htmlElementFactory<HTMLTableElementAttrs, HTMLTableElement>("table");

/**
 * Creates OpNode HTML element <tbody>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <tbody>
 */
export const tbody = /*#__PURE__*/htmlElementFactory<HTMLTableSectionElementAttrs, HTMLTableSectionElement>("tbody");

/**
 * Creates OpNode HTML element <td>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <td>
 */
export const td = /*#__PURE__*/htmlElementFactory<HTMLTableDataCellElementAttrs, HTMLTableDataCellElement>("td");

/**
 * Creates OpNode HTML element <template>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <template>
 */
export const template = /*#__PURE__*/htmlElementFactory<HTMLTemplateElementAttrs, HTMLTemplateElement>("template");

/**
 * Creates OpNode HTML element <tfoot>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <tfoot>
 */
export const tfoot = /*#__PURE__*/htmlElementFactory<HTMLTableSectionElementAttrs, HTMLTableSectionElement>("tfoot");

/**
 * Creates OpNode HTML element <th>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <th>
 */
export const th = /*#__PURE__*/htmlElementFactory<HTMLTableHeaderCellElementAttrs, HTMLTableHeaderCellElement>("th");

/**
 * Creates OpNode HTML element <thead>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <thead>
 */
export const thead = /*#__PURE__*/htmlElementFactory<HTMLTableSectionElementAttrs, HTMLTableSectionElement>("thead");

/**
 * Creates OpNode HTML element <time>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <time>
 */
export const time = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("time");

/**
 * Creates OpNode HTML element <title>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <title>
 */
export const title = /*#__PURE__*/htmlElementFactory<HTMLTitleElementAttrs, HTMLTitleElement>("title");

/**
 * Creates OpNode HTML element <tr>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <tr>
 */
export const tr = /*#__PURE__*/htmlElementFactory<HTMLTableRowElementAttrs, HTMLTableRowElement>("tr");

/**
 * Creates OpNode HTML element <track>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <track>
 */
export const track = /*#__PURE__*/elementFactory<HTMLTrackElementAttrs, HTMLTrackElement>("track", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <u>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <u>
 */
export const u = /*#__PURE__*/htmlElementFactory<HTMLElementAttrs, HTMLElement>("u");

/**
 * Creates OpNode HTML element <ul>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <ul>
 */
export const ul = /*#__PURE__*/htmlElementFactory<HTMLUListElementAttrs, HTMLUListElement>("ul");

/**
 * Creates OpNode HTML element <wbr>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <wbr>
 */
export const wbr = /*#__PURE__*/elementFactory<HTMLElementAttrs, HTMLElement>("wbr", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <textarea>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <textarea>
 */
export const textarea = /*#__PURE__*/elementFactory<HTMLTextAreaElementAttrs, HTMLTextAreaElement>("textarea", NodeFlags.Element | NodeFlags.NewlineEatingElement);

/**
 * Creates OpNode HTML element <input>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <input>
 */
export const input = /*#__PURE__*/elementFactory<HTMLInputElementAttrs, HTMLInputElement>("input", NodeFlags.Element | NodeFlags.VoidElement);

/**
 * Creates OpNode HTML element <audio>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <audio>
 */
export const audio = /*#__PURE__*/htmlElementFactory<HTMLAudioElementAttrs, HTMLAudioElement>("audio");

/**
 * Creates OpNode HTML element <video>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode HTML element <video>
 */
export const video = /*#__PURE__*/htmlElementFactory<HTMLVideoElementAttrs, HTMLVideoElement>("video");
