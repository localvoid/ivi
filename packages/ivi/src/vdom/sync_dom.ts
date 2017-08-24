import { XML_NAMESPACE, XLINK_NAMESPACE, CSSStyleProps } from "ivi-core";
import { VNodeFlags } from "./flags";

const _setAttribute = Element.prototype.setAttribute;
const _setAttributeNS = Element.prototype.setAttributeNS;
const _removeAttribute = Element.prototype.removeAttribute;
const _className = Object.getOwnPropertyDescriptor(Element.prototype, "className").set!;

function removeAttribute(el: Element, name: string): void {
  _removeAttribute.call(el, name);
}

function setAttribute(el: Element, name: string, value: any): void {
  _setAttribute.call(el, name, value);
}

function setAttributeNS(el: Element, namespace: string, name: string, value: any): void {
  _setAttributeNS.call(el, namespace, name, value);
}

/**
 * Sync DOM class names.
 *
 * @param node HTML or SVG Element.
 * @param flags VNode flags.
 * @param a Old className.
 * @param b New className.
 */
export function syncClassName(node: Element, flags: VNodeFlags, a: string | null, b: string | null): void {
  if (b === null) {
    b = "";
  }
  if ((flags & VNodeFlags.SvgElement) === 0) {
    _className.call(node, b);
  } else {
    setAttribute(node, "class", b);
  }
}

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
  let i: number;
  let keys: string[];
  let key: string;
  let style: CSSStyleDeclaration;

  if (a === null) {
    if (b !== null) {
      // a is empty, insert all styles from b.
      style = node.style;
      keys = Object.keys(b);
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        style.setProperty(key, (b as { [key: string]: string })[key]);
      }
    }
  } else {
    i = 0;
    keys = Object.keys(a);
    style = node.style;

    if (b === null) {
      // b is empty, remove all styles from a.
      for (; i < keys.length; ++i) {
        style.removeProperty(keys[i]);
      }
    } else {
      let matchCount = 0;
      for (; i < keys.length; ++i) {
        key = keys[i];
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

      keys = Object.keys(b);
      for (i = 0; matchCount < keys.length && i < keys.length; ++i) {
        key = keys[i];
        if (a.hasOwnProperty(key) === false) {
          style.setProperty(key, (b as { [key: string]: string })[key]);
          ++matchCount;
        }
      }
    }
  }
}

/**
 * Set DOM property.
 *
 * @param node HTML or SVG Element.
 * @param isSVG node is an SVG Element.
 * @param key Attribute name.
 * @param value Attribute value.
 */
function setDOMAttribute(node: Element, flags: VNodeFlags, key: string, value: any): void {
  if (typeof value === "boolean") {
    value = value === true ? "" : undefined;
  }
  if (value === undefined) {
    removeAttribute(node, key);
  } else {
    if ((flags & VNodeFlags.SvgElement) !== 0) {
      if (key.length > 5) {
        if (key.charCodeAt(0) === 120 &&
          (key.charCodeAt(3) === 58 || key.charCodeAt(5) === 58)) { // 58 === ":" "xml:", "xlink:"
          if (key.charCodeAt(1) === 109 && key.charCodeAt(2) === 108) { // [109, 108] === "ml"
            /**
             * All attributes that starts with an "xml:" prefix will be assigned with XML namespace.
             */
            setAttributeNS(node, XML_NAMESPACE, key, value);
            return;
          } else if (key.charCodeAt(1) === 108 &&
            key.charCodeAt(2) === 105 &&
            key.charCodeAt(3) === 110 &&
            key.charCodeAt(4) === 107) { // [108, 105, 110, 107] === "link"
            /**
             * All attributes that starts with an "xlink:" prefix will be assigned with XLINK namespace.
             */
            setAttributeNS(node, XLINK_NAMESPACE, key, value);
            return;
          }
        }
      }
    }
    setAttribute(node, key, value);
  }
}

/**
 * Sync DOM Attributes.
 *
 * @param node HTML or SVG Element.
 * @param flags VNode flags.
 * @param a Old DOM properties.
 * @param b New DOM properties.
 */
export function syncDOMAttrs(
  node: Element,
  flags: VNodeFlags,
  a: { [key: string]: any } | null,
  b: { [key: string]: any } | null,
): void {
  let i: number;
  let keys: string[];
  let key: string;

  if (a === null) {
    if (b !== null) {
      // a is empty, insert all attributes from b.
      keys = Object.keys(b);
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        setDOMAttribute(node, flags, key, b[key]);
      }
    }
  } else {
    i = 0;
    keys = Object.keys(a);
    if (b === null) {
      // b is empty, remove all attributes from a.
      for (; i < keys.length; ++i) {
        removeAttribute(node, keys[i]);
      }
    } else {
      // Remove and update attributes.
      let matchCount = 0;
      for (; i < keys.length; ++i) {
        key = keys[i];
        const bValue = b[key];
        if (bValue === undefined) {
          removeAttribute(node, key);
        } else {
          const aValue = a[key];
          if (aValue !== bValue) {
            setDOMAttribute(node, flags, key, bValue);
          }
          ++matchCount;
        }
      }

      // Insert new attributes.
      keys = Object.keys(b);
      for (i = 0; matchCount < keys.length && i < keys.length; ++i) {
        key = keys[i];
        if (a.hasOwnProperty(key) === false) {
          setDOMAttribute(node, flags, key, b[key]);
          ++matchCount;
        }
      }
    }
  }
}
