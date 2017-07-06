import { XML_NAMESPACE, XLINK_NAMESPACE, CSSStyleProps } from "ivi-core";
import { VNodeFlags } from "./flags";

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
    node.className = b;
  } else {
    node.setAttribute("class", b);
  }
}

/**
 * Sync DOM styles.
 *
 * Implementation detail: Syncing algorithm has an optimization with an early detection of object shape changes.
 * Objects with static shape will make syncing algorithm slightly faster because it doesn't need to check which
 * properties didn't existed before, so it is possible to just use the static object shapes, and use `undefined` values
 * when you want to remove property and have the same object shape.
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
      for (i = 0; i < keys.length; i++) {
        key = keys[i];
        style.setProperty(key, (b as { [key: string]: string })[key]);
      }
    }
  } else if (b === null) {
    // b is empty, remove all styles from a.
    style = node.style;
    keys = Object.keys(a);
    for (i = 0; i < keys.length; i++) {
      style.removeProperty(keys[i]);
    }
  } else {
    style = node.style;
    let matchCount = 0;

    keys = Object.keys(a);
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      const bValue = (b as { [key: string]: string })[key];

      if (bValue !== undefined) {
        const aValue = (a as { [key: string]: string })[key];
        if (aValue !== bValue) {
          style.setProperty(key, bValue);
        }
        matchCount++;
      } else {
        style.removeProperty(key);
      }
    }

    keys = Object.keys(b);
    i = 0;
    while (matchCount < keys.length && i < keys.length) {
      key = keys[i++];
      if (a.hasOwnProperty(key) === false) {
        style.setProperty(key, (b as { [key: string]: string })[key]);
        matchCount++;
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
function setDOMProperty(node: Element, flags: VNodeFlags, key: string, value?: any, prevValue?: any): void {
  if (value === undefined) {
    /**
     * Edge cases when property name doesn't match attribute name.
     */
    if ((flags & VNodeFlags.SvgElement) === 0) {
      if (key.length > 6) {
        switch (key) {
          case "acceptCharset":
            key = "accept-charset";
            break;
          case "htmlFor":
            key = "for";
          //     break;
          // case "httpEquiv": // meta tags aren't supported
          //     key = "http-equiv";
        }
      }
    }
    /**
     * Because there is no generic way to assign a default value for a property when it is removed, it is always
     * removed with `removeAttribute` method.
     */
    node.removeAttribute(key);
  } else {
    if ((flags & VNodeFlags.SvgElement) !== 0) {
      if (key.length > 5) {
        if (key.charCodeAt(0) === 120 &&
          (key.charCodeAt(3) === 58 || key.charCodeAt(5) === 58)) { // 58 === ":" "xml:", "xlink:"
          if (key.charCodeAt(1) === 109 && key.charCodeAt(2) === 108) { // [109, 108] === "ml"
            /**
             * All attributes that starts with an "xml:" prefix will be assigned with XML namespace.
             */
            node.setAttributeNS(XML_NAMESPACE, key, value);
            return;
          } else if (key.charCodeAt(1) === 108 &&
            key.charCodeAt(2) === 105 &&
            key.charCodeAt(3) === 110 &&
            key.charCodeAt(4) === 107) { // [108, 105, 110, 107] === "link"
            /**
             * All attributes that starts with an "xlink:" prefix will be assigned with XLINK namespace.
             */
            node.setAttributeNS(XLINK_NAMESPACE, key, value);
            return;
          }
        }
      }

      /**
       * SVG props should be always assigned with a `setAttribute` call.
       */
      node.setAttribute(key, value);
    } else {
      if (key.length > 5) {
        if (key.charCodeAt(4) === 45) { // 45 === "-" "data-", "aria-"
          /**
           * Attributes that has "-" character at the 4th position will be assigned with a `setAttribute`
           * method. It should work with "data-" and "aria-" attributes. Otherwise just use property
           * assignment instead of `setAttribute`.
           */
          node.setAttribute(key, value);
          return;
        }
      }

      (node as any)[key] = value;
    }
  }
}

/**
 * Sync DOM properties.
 *
 * Implementation detail: Syncing algorithm has an optimization with an early detection of object shape changes.
 * Objects with static shape will make syncing algorithm slightly faster because it doesn't need to check which
 * properties didn't existed before, so it is possible to just use the static object shapes, and use `undefined` values
 * when you want to remove property and have the same object shape.
 *
 * @param node HTML or SVG Element.
 * @param flags VNode flags.
 * @param a Old DOM properties.
 * @param b New DOM properties.
 */
export function syncDOMProps(
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
      for (i = 0; i < keys.length; i++) {
        key = keys[i];
        setDOMProperty(node, flags, key, b[key]);
      }
    }
  } else if (b === null) {
    // b is empty, remove all attributes from a.
    keys = Object.keys(a);
    for (i = 0; i < keys.length; i++) {
      setDOMProperty(node, flags, keys[i]);
    }
  } else {
    let matchCount = 0;

    // Remove and update attributes.
    keys = Object.keys(a);
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      const bValue = b[key];
      if (bValue === undefined) {
        setDOMProperty(node, flags, key);
      } else {
        const aValue = a[key];
        if (aValue !== bValue) {
          setDOMProperty(node, flags, key, bValue, aValue);
        }
        matchCount++;
      }
    }

    // Insert new attributes.
    keys = Object.keys(b);
    i = 0;
    while (matchCount < keys.length && i < keys.length) {
      key = keys[i++];
      if (a.hasOwnProperty(key) === false) {
        setDOMProperty(node, flags, key, b[key]);
        matchCount++;
      }
    }
  }
}
