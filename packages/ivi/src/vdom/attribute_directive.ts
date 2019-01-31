import { scheduleLayoutEffect } from "../scheduler";

/**
 * Attribute directives are used to extend reconciliation algorithm.
 *
 * When DOM element attributes are updated, all value types are checked if it is a string, number, boolean or an
 * `AttributeDirective`. When it is an attribute directive, custom update function will be invoked with the DOM
 * element, attribute key, previous and next values.
 *
 * @typeparam T Value type.
 */
export interface AttributeDirective<T> {
  /**
   * Value.
   */
  v: T | undefined;
  /**
   * Update function.
   *
   * @param element Target element.
   * @param key Attribute key.
   * @param prev Previous value.
   * @param next Next value.
   */
  u(element: Element, key: string, prev: T | undefined, next: T | undefined): void;
}

/**
 * PROPERTY function creates an {@link AttributeDirective} that assigns a property to a property name derived from the
 * `key` of the attribute.
 *
 * @example
 *
 *   const e = div("", { _customProperty: PROPERTY("value") });
 *
 * @typeparam Property value type.
 * @param v Property value.
 * @returns {@link AttributeDirective}
 */
export const PROPERTY = <T>(v: T): AttributeDirective<T> => ({ v, u: updateProperty });

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
 * @example
 *
 *   const e = div("", { unsafeHTML: UNSAFE_HTML("<span></span>") });
 *
 * @param v innerHTML value.
 * @returns {@link AttributeDirective}
 */
export const UNSAFE_HTML = (v: string): AttributeDirective<string> => ({ v, u: updateUnsafeHTML });

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
 * @example
 *
 *   const e = div("", { click: EVENT((ev) => { console.log(ev) }); });
 *
 * @param v Event handler.
 * @returns {@link AttributeDirective}
 */
export const EVENT = (v: (ev: Event) => void): AttributeDirective<(ev: Event) => void> => ({ v, u: updateEvent });

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
  next: ((ev: Event) => void),
) {
  if (prev !== next) {
    if (prev !== void 0) {
      element.removeEventListener(key, prev);
    }
    element.addEventListener(key, next);
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
 * AUTOFOCUS function creates a {@link AttributeDirective} that sets autofocus on an element.
 *
 * @example
 *
 *   const e = input("", { autofocus: AUTOFOCUS(true) });
 *
 * @param v Autofocus state.
 * @returns {@link AttributeDirective}
 */
export const AUTOFOCUS = (v: boolean): AttributeDirective<boolean> => v ? AUTOFOCUS_TRUE : AUTOFOCUS_FALSE;
