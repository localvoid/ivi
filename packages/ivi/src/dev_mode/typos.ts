import { DEV } from "ivi-vars";
import { CSSStyleProps } from "ivi-core";
import { DEV_MODE, DevModeFlags, printWarn, printWarnOnce } from "./dev_mode";

let DOMAttributeTypos: { [key: string]: string };
if (DEV) {
  DOMAttributeTypos = {
    "autoFocus": `Typo: use "VNode.autofocus(focus: boolean)" to enable autofocus for an element.`,
    "autofocus": `Typo: use "VNode.autofocus(focus: boolean)" to enable autofocus for an element.`,
    "value": `Typo: use "VNode.value(value: string)" to set an input value.`,
    "checked": `Typo: use "VNode.checked(checked: boolean)" to set an input checked status.`,
  };
}

/**
 * Checks DOM attribute typos and prints warning message with possible typos.
 *
 * @param attr Attributes.
 */
export function checkDOMAttributesForTypos(attrs: { [key: string]: any }): void {
  if (DEV) {
    if ((DEV_MODE & DevModeFlags.DisableCheckingForTypos) === 0) {
      for (const attrName of Object.keys(attrs)) {
        const msg = DOMAttributeTypos[attrName];

        if (msg !== undefined) {
          printWarnOnce(`typo.attribute.${attrName}`, msg);
        }
      }
    }
  }
}

let DOMStyleTypos: { [key: string]: string };
if (DEV) {
  DOMStyleTypos = {
  };
}

/**
 * Checks DOM style typos and prints warning message with possible typos.
 *
 * @param styles Styles.
 */
export function checkDOMStylesForTypos(styles: CSSStyleProps): void {
  if (DEV) {
    if ((DEV_MODE & DevModeFlags.DisableCheckingForTypos) === 0) {
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
}

/**
 * Check deprecated DOM SVG attributes.
 *
 * @param tag Tag name.
 * @param attrs SVG attributes.
 */
export function checkDeprecatedDOMSVGAttributes(tag: string, attrs: { [key: string]: any }): void {
  if (DEV) {
    if (!(DEV_MODE & DevModeFlags.DisableWarningsForUnsupportedFeatures)) {
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
}
