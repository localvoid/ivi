import { NOOP } from "../core/noop";
import { elementRemoveAttribute } from "../core/shortcuts";

/**
 * Attribute directives are used to extend reconciliation algorithm.
 *
 * When DOM element attributes are updated, all value types are checked if it is a string, number, boolean or an
 * `AttributeDirective`. When it is an attribute directive, custom update function will be invoked with the DOM
 * element, attribute key, previous and next values.
 */
export interface AttributeDirective<P> {
  /**
   * Value.
   */
  v: P | undefined;
  /**
   * Update function.
   *
   * @param element - Target element
   * @param key - Attribute key
   * @param prev - Previous value
   * @param next - Next value
   */
  u(element: Element, key: string, prev: P | undefined, next: P | undefined): void;
}

/**
 * {@link AttributeDirective} with `undefined` value and `NOOP` update function.
 */
export const ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED: AttributeDirective<any> = {
  v: void 0,
  u: NOOP as (element: Element, key: string, prev: any, next: any) => void,
};

/**
 * {@link AttributeDirective} with `undefined` value and update functions that removes `key` attribute.
 */
export const ATTRIBUTE_DIRECTIVE_REMOVE_ATTR_UNDEFINED = {
  v: void 0,
  u: (element: Element, key: string, prev: any) => {
    if (prev !== void 0) {
      elementRemoveAttribute.call(element, key);
    }
  },
};

/**
 * {@link AttributeDirective} with `undefined` value and update functions that removes `key` event.
 */
export const ATTRIBUTE_DIRECTIVE_REMOVE_EVENT_UNDEFINED = {
  v: void 0,
  u: (
    element: Element,
    key: string,
    prev: ((ev: Event) => void) | undefined,
  ) => {
    if (prev !== void 0) {
      element.removeEventListener(key, prev);
    }
  },
};

/**
 * PROPERTY function creates an {@link AttributeDirective} that assigns a property to a property name derived from the
 * `key` of the attribute.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = div("", { _customProperty: PROPERTY("value") });
 *
 * @param v - Property value
 * @returns {@link AttributeDirective}
 */
export const PROPERTY = <T>(v: T | undefined): AttributeDirective<T> => (v === void 0) ?
  ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED : { v, u: updateProperty };

/**
 * Update function for an {@link AttributeDirective} created with a {@link PROPERTY} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function updateProperty(element: Element, key: string, prev: any, next: any) {
  if (prev !== next) {
    (element as any)[key] = next!;
  }
}

/**
 * UNSAFE_HTML function creates a {@link AttributeDirective} that assigns an `innerHTML` property to an Element.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = div("", { unsafeHTML: UNSAFE_HTML("<span></span>") });
 *
 * @param v - innerHTML value
 * @returns {@link AttributeDirective}
 */
export const UNSAFE_HTML = (v: string | undefined): AttributeDirective<string> => (v === void 0) ?
  ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED : { v, u: updateUnsafeHTML };

/**
 * Update function for an {@link AttributeDirective} created with {@link UNSAFE_HTML} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function updateUnsafeHTML(element: Element, key: string, prev: string | undefined, next: string) {
  if (prev !== next) {
    if (prev !== void 0 || next !== "") {
      element.innerHTML = next!;
    }
  }
}

/**
 * EVENT function creates an {@link AttributeDirective} that assigns a native event handler derived from the `key`
 * attribute to an Element.
 *
 * `undefined` values remove event listener.
 *
 * @example
 *
 *   const e = div("", { click: EVENT((ev) => { console.log(ev) }); });
 *
 * @param v - Event handler
 * @returns {@link AttributeDirective}
 */
export const EVENT = (v: ((ev: Event) => void) | undefined): AttributeDirective<(ev: Event) => void> => (v === void 0) ?
  ATTRIBUTE_DIRECTIVE_REMOVE_EVENT_UNDEFINED : { v, u: updateEvent };

/**
 * Update function for an {@link AttributeDirective} created with {@link EVENT} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
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
