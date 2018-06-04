import {
  XML_NAMESPACE, XLINK_NAMESPACE, CSSStyleProps, elementRemoveAttribute, elementSetAttribute, elementSetAttributeNS,
} from "ivi-core";

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
 * @param node - HTML or SVG Element
 * @param svg - SVG Element
 * @param key - Attribute name
 * @param value - Attribute value
 */
function setDOMAttribute(node: Element, svg: boolean, key: string, value: any): void {
  if (typeof value === "boolean") {
    if (value) {
      value = "";
    } else {
      return;
    }
  }
  if (svg === true) {
    if (key.length > 5) {
      if (key.charCodeAt(0) === 120 &&
        // 58 === ":"
        (
          key.charCodeAt(3) === 58 || // "xml:"
          key.charCodeAt(5) === 58    // "xlink:"
        )
      ) {
        if (key.startsWith("xml:")) {
          /**
           * All attributes that starts with an "xml:" prefix will be assigned with XML namespace.
           */
          /* istanbul ignore else */
          if (DEBUG) {
            node.setAttributeNS(XML_NAMESPACE, key, value);
          } else {
            elementSetAttributeNS.call(node, XML_NAMESPACE, key, value);
          }
          return;
        } else if (key.startsWith("xlink:")) {
          /**
           * All attributes that starts with an "xlink:" prefix will be assigned with XLINK namespace.
           */
          /* istanbul ignore else */
          if (DEBUG) {
            node.setAttributeNS(XLINK_NAMESPACE, key, value);
          } else {
            elementSetAttributeNS.call(node, XLINK_NAMESPACE, key, value);
          }
          return;
        }
      }
    }
  }
  /* istanbul ignore else */
  if (DEBUG) {
    node.setAttribute(key, value);
  } else {
    elementSetAttribute.call(node, key, value);
  }
}

/**
 * Sync DOM attributes.
 *
 * @param node - HTML or SVG Element
 * @param svg - SVG Element
 * @param a - Prev DOM properties
 * @param b - Next DOM properties
 */
export function syncDOMAttrs(
  node: Element,
  svg: boolean,
  a: { [key: string]: any } | undefined,
  b: { [key: string]: any } | undefined,
): void {
  let key: string;
  let bValue;

  if (a === void 0) {
    // a is empty, insert all attributes from b.
    for (key in b!) {
      bValue = b![key];
      if (bValue !== void 0) {
        setDOMAttribute(node, svg, key, bValue);
      }
    }
  } else if (b !== void 0) {
    for (key in b) {
      bValue = b[key];
      if (a[key] !== bValue) {
        if (bValue !== void 0) {
          setDOMAttribute(node, svg, key, bValue);
        } else {
          /* istanbul ignore else */
          if (DEBUG) {
            node.removeAttribute(key);
          } else {
            elementRemoveAttribute.call(node, key);
          }
        }
      }
    }
  }
}
