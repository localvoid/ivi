import { CSSStyleProps, elementRemoveAttribute, elementSetAttribute, SyncableValue } from "ivi-core";

/**
 * Sync DOM styles.
 *
 * @param node - HTML or SVG Element
 * @param a - Prev styles
 * @param b - Next styles
 */
export function syncStyle(
  node: HTMLElement | SVGElement,
  a: CSSStyleProps | undefined,
  b: CSSStyleProps | undefined,
): void {
  const style = node.style;
  let key: string;
  let bValue;

  if (a === void 0) {
    // a is empty, insert all styles from b.
    for (key in b!) {
      bValue = (b as { [key: string]: string })[key];
      if (bValue !== void 0) {
        style.setProperty(key, bValue);
      }
    }
  } else if (b !== void 0) {
    for (key in b) {
      bValue = (b as { [key: string]: string })[key];
      if ((a as { [key: string]: string })[key] !== bValue) {
        if (bValue !== void 0) {
          style.setProperty(key, bValue);
        } else {
          style.removeProperty(key);
        }
      }
    }
  }
}

/**
 * Set DOM attribute.
 *
 * @param element - DOM Element
 * @param key - Attribute name
 * @param prev - Previous value
 * @param next - Next value
 */
function syncDOMAttr(element: Element, key: string, prev: any, next: any): void {
  if (typeof next === "object") {
    (next as SyncableValue<any>).s(
      element,
      key,
      prev === void 0 ? void 0 : (prev as SyncableValue<any>).v,
      (next as SyncableValue<any>).v,
    );
  } else if (prev !== next) {
    if (typeof next === "boolean") {
      next = next ? "" : void 0;
    }
    if (next === void 0) {
      elementRemoveAttribute.call(element, key);
    } else {
      elementSetAttribute.call(element, key, next);
    }
  }
}

/**
 * Sync DOM attributes.
 *
 * @param element - DOM element
 * @param a - Prev DOM properties
 * @param b - Next DOM properties
 */
export function syncDOMAttrs(
  element: Element,
  a: { [key: string]: any } | undefined,
  b: { [key: string]: any } | undefined,
): void {
  let key: string;

  if (a === void 0) {
    // a is empty, insert all attributes from b.
    for (key in b!) {
      syncDOMAttr(element, key, void 0, b![key]);
    }
  } else if (b !== void 0) {
    for (key in b) {
      syncDOMAttr(element, key, a[key], b[key]);
    }
  }
}
