import { CSSStyleProps } from "../dom/style";
import { VNodeFlags, VNode } from "../vdom/vnode";
import { printWarn, printWarnOnce } from "./print";

/**
 * Checks style typos and prints warning messages with possible errors.
 *
 * @param styles - Styles.
 */
function checkStyles(styles: CSSStyleProps): void {
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

export function checkVNodeConstructor(vnode: VNode): void {
  const flags = vnode._f;

  if (flags & VNodeFlags.Element) {
    const type = vnode._t;
    const props = vnode._p;
    const style = vnode._s;
    if (props) {
      if (flags & VNodeFlags.SvgElement) {
        checkSVGAttributes(type as string, props);
      } else {
        checkHTMLAttributes(type as string, props);
      }
    }
    if (style) {
      checkStyles(style);
    }
  }
}

/**
 * checkUniqueKeys checks that all nodes have unique keys.
 *
 * @param children - Children nodes
 */
export function checkUniqueKeys(children: VNode): void {
  let keys: Set<any> | undefined;
  let node: VNode<any> | null = children;
  while (node !== null) {
    if (node._f & VNodeFlags.Key) {
      if (keys === undefined) {
        keys = new Set<any>();
      } else if (keys.has(node._k)) {
        throw new Error(`Failed to set children, invalid children list, key: "${node._k}" is used multiple times.`);
      }
      keys.add(node._k);
    }
    node = node._r;
  }
}
