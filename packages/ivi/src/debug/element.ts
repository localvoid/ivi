import { CSSStyleProps } from "../dom/style";
import { printWarn, printWarnOnce } from "./print";

/**
 * Checks style typos and prints warning messages with possible errors.
 *
 * @param styles - Styles.
 */
function checkStyle(styles: CSSStyleProps): void {
  for (const styleName of Object.keys(styles) as (keyof CSSStyleProps)[]) {
    const styleValue = styles[styleName];

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

/**
 * Checks SVG attributes.
 *
 * @param tag - Tag name.
 * @param attrs - SVG attributes.
 */
function checkSVGAttributes(tag: string, attrs: { [key: string]: any }): void {
  switch (tag) {
    case "svg":
      if (attrs.hasOwnProperty("viewport")) {
        printWarnOnce("deprecated.svg.attribute.viewport", `SVG attribute "viewport" is deprecated.`);
      }
      break;
    case "view":
      if (attrs.hasOwnProperty("viewTarget")) {
        printWarnOnce("deprecated.svg.attribute.viewTarget", `SVG attribute "viewTarget" is deprecated.`);
      }
      break;
  }
}

/**
 * Checks HTML attributes.
 *
 * @param tag - Tag name.
 * @param attrs - SVG attributes.
 */
function checkHTMLAttributes(tag: string, attrs: { [key: string]: any }): void {
  switch (tag) {
    case "input": {
      let attrsBeforeValue = 0;
      loop: for (const key of Object.keys(attrs)) {
        switch (key) {
          case "step":
            attrsBeforeValue = 1;
            break;
          case "min":
            attrsBeforeValue = 1;
            break;
          case "max":
            attrsBeforeValue = 1;
            break;
          case "value":
            if (attrsBeforeValue) {
              printWarn(`Input value should be assigned after "step", "min" and "max" attributes to prevent ` +
                `rounding issues.`);
            }
            break loop;
        }
      }
      break;
    }
  }
}

export function checkElement(tag: string, attrs: any, svg: boolean): void {
  if (attrs) {
    if (svg) {
      checkSVGAttributes(tag, attrs);
    } else {
      checkHTMLAttributes(tag, attrs);
    }
    const style = attrs.style;
    if (style) {
      checkStyle(style);
    }
  }
}
