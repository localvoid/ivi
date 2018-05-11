import {
  XML_NAMESPACE, XLINK_NAMESPACE, CSSStyleProps, objectHasOwnProperty, elementRemoveAttribute, elementSetAttribute,
  elementSetAttributeNS,
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

  if (a === null) {
    // a is empty, insert all styles from b.
    for (key in b!) {
      style.setProperty(key, (b as { [key: string]: string })[key]);
    }
  } else if (b === null) {
    // b is empty, remove all styles from a.
    for (key in a) {
      style.removeProperty(key);
    }
  } else {
    let matchCount = 0;
    for (key in a) {
      const bValue = (b as { [key: string]: string })[key];

      if (bValue !== undefined) {
        const aValue = (a as { [key: string]: string })[key];
        if (aValue !== bValue) {
          style.setProperty(key, bValue);
        }
        ++matchCount;
      } else {
        style.removeProperty(key);
      }
    }

    const keys = Object.keys(b);
    for (let i = 0; matchCount < keys.length && i < keys.length; ++i) {
      key = keys[i];
      if (objectHasOwnProperty.call(a, key) === false) {
        style.setProperty(key, (b as { [key: string]: string })[key]);
        ++matchCount;
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
    value = value === true ? "" : undefined;
  }
  if (value === undefined) {
    /* istanbul ignore else */
    if (DEBUG) {
      node.removeAttribute(key);
    } else {
      elementRemoveAttribute.call(node, key);
    }
  } else {
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

  if (a === null) {
    // a is empty, insert all attributes from b.
    for (key in b!) {
      setDOMAttribute(node, svg, key, b![key]);
    }
  } else if (b === null) {
    // b is empty, remove all attributes from a.
    for (key in a) {
      /* istanbul ignore else */
      if (DEBUG) {
        node.removeAttribute(key);
      } else {
        elementRemoveAttribute.call(node, key);
      }
    }
  } else {
    // Remove and update attributes.
    let matchCount = 0;
    for (key in a) {
      const bValue = b[key];
      if (bValue === undefined) {
        /* istanbul ignore else */
        if (DEBUG) {
          node.removeAttribute(key);
        } else {
          elementRemoveAttribute.call(node, key);
        }
      } else {
        const aValue = a[key];
        if (aValue !== bValue) {
          setDOMAttribute(node, svg, key, bValue);
        }
        ++matchCount;
      }
    }

    // Insert new attributes.
    const keys = Object.keys(b);
    for (let i = 0; matchCount < keys.length && i < keys.length; ++i) {
      key = keys[i];
      if (objectHasOwnProperty.call(a, key) === false) {
        setDOMAttribute(node, svg, key, b[key]);
        ++matchCount;
      }
    }
  }
}
