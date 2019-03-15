import { NOOP } from "../core";
import { scheduleLayoutEffect } from "../scheduler";
import { emitChildren, emitAttribute } from "../ssr/render";

/**
 * Attribute directives are used to extend reconciliation and `renderToString()` algorithms.
 *
 * When DOM element attributes are updated during reconciliation, custom update function `u()` will be invoked with the
 * DOM element, attribute key, previous and next values.
 *
 * When DOM element is rendered to string, custom render to string function `s()` will be invoked with attribute key
 * and its value `v`.
 *
 * @typeparam T Value type.
 */
export interface AttributeDirective<T> {
  /**
   * Value.
   */
  readonly v: T | undefined;
  /**
   * Update function.
   *
   * @param element Target element.
   * @param key Attribute key.
   * @param prev Previous value.
   * @param next Next value.
   */
  readonly u?: (element: Element, key: string, prev: T | undefined, next: T | undefined) => void;
  /**
   * Render to string function.
   *
   * @param key Attribute key.
   * @param value Value.
   */
  readonly s?: (key: string, value: T) => void;
}

/**
 * {@link AttributeDirective} that ignores rendering to string.
 */
export const IGNORE_RENDER_TO_STRING = ({ v: void 0, s: NOOP });

/**
 * PROPERTY function creates an {@link AttributeDirective} that assigns a property to a property name derived from the
 * `key` of the attribute.
 *
 * When rendered to string, it will be ignored.
 *
 * @example
 *
 *   const e = div("", { _customProperty: PROPERTY("value") });
 *
 * @typeparam Property value type.
 * @param v Property value.
 * @returns {@link AttributeDirective}
 */
export const PROPERTY = <T>(v: T): AttributeDirective<T> => (
  process.env.IVI_TARGET === "ssr" ? IGNORE_RENDER_TO_STRING : ({ v, u: updateProperty })
);

/**
 * Update function for an {@link AttributeDirective} created with a {@link PROPERTY} function.
 *
 * @param element Target element.
 * @param key Attribute key.
 * @param prev Previous value.
 * @param next Next value.
 */
function updateProperty(element: Element, key: string, prev: any, next: any): void {
  if (prev !== next && next !== void 0) {
    (element as any)[key] = next!;
  }
}

/**
 * UNSAFE_HTML function creates a {@link AttributeDirective} that assigns an `innerHTML` property to an Element.
 *
 * When rendered to string, it will emit its value as inner HTML without any escaping.
 *
 * @example
 *
 *   const e = div("", { unsafeHTML: UNSAFE_HTML("<span></span>") });
 *
 * @param v innerHTML value.
 * @returns {@link AttributeDirective}
 */
export const UNSAFE_HTML = (v: string): AttributeDirective<string> => (
  process.env.IVI_TARGET === "ssr" ?
    ({ v, s: renderToStringUnsafeHTML }) :
    ({ v, u: updateUnsafeHTML })
);

/**
 * Render to string function for an {@link AttributeDirective} created with {@link UNSAFE_HTML} function.
 *
 * @param key Attribute key.
 * @param value Value.
 */
function renderToStringUnsafeHTML(key: string, value: string) {
  emitChildren(value);
}

/**
 * Update function for an {@link AttributeDirective} created with {@link UNSAFE_HTML} function.
 *
 * @param element Target element.
 * @param key Attribute key.
 * @param prev Previous value.
 * @param next Next value.
 */
function updateUnsafeHTML(element: Element, key: string, prev: string | undefined, next: string | undefined) {
  if (prev !== next) {
    if (next === void 0) {
      element.innerHTML = "";
    } else if (prev !== void 0 || next !== "") {
      element.innerHTML = next!;
    }
  }
}

/**
 * EVENT function creates an {@link AttributeDirective} that assigns a native event handler derived from the `key`
 * attribute to an Element.
 *
 * When rendered to string, it will be ignored.
 *
 * @example
 *
 *   const e = div("", { click: EVENT((ev) => { console.log(ev) }); });
 *
 * @param v Event handler.
 * @returns {@link AttributeDirective}
 */
export const EVENT = (v: (ev: Event) => void): AttributeDirective<(ev: Event) => void> => (
  process.env.IVI_TARGET === "ssr" ?
    IGNORE_RENDER_TO_STRING :
    ({ v, u: updateEvent })
);

/**
 * Update function for an {@link AttributeDirective} created with {@link EVENT} function.
 *
 * @param element Target element.
 * @param key Attribute key.
 * @param prev Previous value.
 * @param next Next value.
 */
function updateEvent(
  element: Element,
  key: string,
  prev: ((ev: Event) => void) | undefined,
  next: ((ev: Event) => void) | undefined,
) {
  if (prev !== next) {
    if (prev !== void 0) {
      element.removeEventListener(key, prev);
    }
    if (next !== void 0) {
      element.addEventListener(key, next);
    }
  }
}

/**
 * Synchronization function for {@link AttributeDirective} created with {@link AUTOFOCUS} function.
 *
 * @param element Target element.
 * @param key Attribute key.
 * @param prev Previous value.
 * @param next Next value.
 */
function updateAutofocus(
  element: Element,
  key: string,
  prev: boolean | undefined,
  next: boolean | undefined,
) {
  if (prev === void 0 && next) {
    scheduleLayoutEffect(() => { (element as HTMLElement).focus(); });
  }
}

/**
 * {@link AttributeDirective} with `false` value and {@link updateAutofocus} sync function.
 */
const AUTOFOCUS_FALSE: AttributeDirective<boolean> = { v: false, u: updateAutofocus };

/**
 * {@link AttributeDirective} with `true` value and {@link updateAutofocus} sync function.
 */
const AUTOFOCUS_TRUE: AttributeDirective<boolean> = { v: true, u: updateAutofocus };

/**
 * {@link AttributeDirective} with `true` value that emits `autofocus` attribute.
 */
const AUTOFOCUS_TRUE_RENDER_TO_STRING: AttributeDirective<boolean> = {
  v: true,
  s: () => { emitAttribute("autofocus"); },
};

/**
 * AUTOFOCUS function creates a {@link AttributeDirective} that sets autofocus on an element.
 *
 * When rendered to string, it will emit `autofocus` attribute.
 *
 * @example
 *
 *   const e = input("", { autofocus: AUTOFOCUS(true) });
 *
 * @param v Autofocus state.
 * @returns {@link AttributeDirective}
 */
export const AUTOFOCUS = (v: boolean): AttributeDirective<boolean> => (
  process.env.IVI_TARGET === "ssr" ?
    v ? AUTOFOCUS_TRUE_RENDER_TO_STRING : IGNORE_RENDER_TO_STRING :
    v ? AUTOFOCUS_TRUE : AUTOFOCUS_FALSE
);
