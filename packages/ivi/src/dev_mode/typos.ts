import { CSSStyleProps } from "ivi-core";
import { printWarn, printWarnOnce } from "./print";

const DOMHTMLAttributeTypos: { [key: string]: string | ((v: any) => string | undefined) } = {
  "autoFocus": `Typo: use "VNode.autofocus(focus: boolean)" to enable autofocus for an element.`,
  "autofocus": `Typo: use "VNode.autofocus(focus: boolean)" to enable autofocus for an element.`,
  "value": `Typo: use "VNode.value(value: string)" to set an input value.`,
  "checked": `Typo: use "VNode.value(checked: boolean)" to set an input checked status.`,
};

const DOMSVGAttributeTypos: { [key: string]: string | ((v: any) => string | undefined) } = {
};

/**
 * Checks HTML attribute typos and print warning message with possible typos.
 *
 * @param attr Attributes.
 */
export function checkDOMAttributesForTypos(attrs: { [key: string]: any }): void {
  if (DEBUG) {
    for (const attrName of Object.keys(attrs)) {
      const check = DOMHTMLAttributeTypos[attrName];
      const value = attrs[attrName];

      if (typeof value === "function") {
        printWarnOnce(
          "typo.attribute.value.function",
          "Incorrect attribute value. Value has a function type that cannot be coerced to string.",
        );
      } else if (typeof value === "symbol") {
        printWarnOnce(
          "typo.attribute.value.symbol",
          "Incorrect attribute value. Value has a symbol type that cannot be coerced to string.",
        );
      }

      if (check !== undefined) {
        const msg = (typeof check === "function") ? check(value) : check;
        if (msg) {
          printWarnOnce(`typo.attribute.html.${attrName}`, msg);
        }
      }
    }
  }
}

/**
 * Checks HTML attribute typos and print warning message with possible typos.
 *
 * @param attr Attributes.
 */
export function checkSVGDOMAttributesForTypos(attrs: { [key: string]: any }): void {
  if (DEBUG) {
    for (const attrName of Object.keys(attrs)) {
      const check = DOMSVGAttributeTypos[attrName];
      const value = attrs[attrName];

      if (typeof value === "function") {
        printWarnOnce(
          "typo.attribute.value.function",
          "Incorrect attribute value. Value has a function type that cannot be coerced to string.",
        );
      } else if (typeof value === "symbol") {
        printWarnOnce(
          "typo.attribute.value.symbol",
          "Incorrect attribute value. Value has a symbol type that cannot be coerced to string.",
        );
      }

      if (check !== undefined) {
        const msg = (typeof check === "function") ? check(value) : check;
        if (msg) {
          printWarnOnce(`typo.attribute.svg.${attrName}`, msg);
        }
      }
    }
  }
}

let DOMStyleTypos: { [key: string]: string };
if (DEBUG) {
  DOMStyleTypos = {
  };
}

/**
 * Checks DOM style typos and prints warning message with possible typos.
 *
 * @param styles Styles.
 */
export function checkDOMStylesForTypos(styles: CSSStyleProps): void {
  if (DEBUG) {
    for (const styleName of Object.keys(styles) as (keyof CSSStyleProps)[]) {
      const styleValue = styles[styleName];
      const match = DOMStyleTypos[styleName];
      if (match !== undefined) {
        printWarnOnce(`typo.style.${styleName}`,
          `Typo: style name "${styleName}" should be "${match}".`);
      } else if (styleName.indexOf("-") > -1) {
        printWarnOnce(`typo.style.${styleName}`,
          `Typo: style "${styleName}" contains a hyphen symbol.`);
      }

      if (typeof styleValue === "string") {
        if (styleValue.indexOf("\n") > -1) {
          printWarn(`Typo: style "${styleName}" has a value with a newline character "${styleValue}".`);
        }
        if (styleValue.indexOf(";") > -1) {
          printWarn(`Typo: style "${styleName}" has a value with a semicolon "${styleValue}".`);
        }
      } else if (typeof styleValue === "number") {
        if (isNaN(styleValue)) {
          printWarn(`Typo: style "${styleName}" has a numeric NaN value.`);
        }
      }
    }
  }
}

/**
 * Check deprecated DOM SVG attributes.
 *
 * @param tag Tag name.
 * @param attrs SVG attributes.
 */
export function checkDeprecatedDOMSVGAttributes(tag: string, attrs: { [key: string]: any }): void {
  if (DEBUG) {
    switch (tag) {
      case "svg":
        if (attrs.hasOwnProperty("viewport")) {
          printWarnOnce("deprecated.svg.attribute.viewport",
            `SVG attribute "viewport" is deprecated.`);
        }
        break;
      case "view":
        if (attrs.hasOwnProperty("viewTarget")) {
          printWarnOnce("deprecated.svg.attribute.viewTarget",
            `SVG attribute "viewTarget" is deprecated.`);
        }
        break;
    }
  }
}
