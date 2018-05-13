import {
  XML_NAMESPACE, XLINK_NAMESPACE, CSSStyleProps, elementRemoveAttribute, elementSetAttribute, elementSetAttributeNS,
} from "ivi-core";

/**
 * Sync DOM styles.
 *
 * @param node HTML or SVG Element.
 * @param a Old styles.
 * @param b New styles.
 */
export function syncStyle(
  node: HTMLElement | SVGElement,
  a: CSSStyleProps | null,
  b: CSSStyleProps | null,
): void {
  const style = node.style;
  let key: string;
  let bValue;

  if (a === null) {
    // a is empty, insert all styles from b.
    for (key in b!) {
      bValue = (b as { [key: string]: string })[key];
      if (bValue !== undefined) {
        style.setProperty(key, bValue);
      }
    }
  } else if (b !== null) {
    for (key in b) {
      bValue = (b as { [key: string]: string })[key];
      if ((a as { [key: string]: string })[key] !== bValue) {
        if (bValue !== undefined) {
          style.setProperty(key, bValue);
        } else {
          style.removeProperty(key);
        }
      }
    }
  }
}

/**
 * Set DOM property.
 *
 * @param node HTML or SVG Element.
 * @param svg SVG Element.
 * @param key Attribute name.
 * @param value Attribute value.
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
 * Sync DOM Attributes.
 *
 * @param node HTML or SVG Element.
 * @param svg SVG Element.
 * @param a Old DOM properties.
 * @param b New DOM properties.
 */
export function syncDOMAttrs(
  node: Element,
  svg: boolean,
  a: { [key: string]: any } | null,
  b: { [key: string]: any } | null,
): void {
  let key: string;
  let bValue;

  if (a === null) {
    // a is empty, insert all attributes from b.
    for (key in b!) {
      bValue = b![key];
      if (bValue !== undefined) {
        setDOMAttribute(node, svg, key, bValue);
      }
    }
  } else if (b !== null) {
    for (key in b) {
      bValue = b[key];
      if (a[key] !== bValue) {
        if (bValue !== undefined) {
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
