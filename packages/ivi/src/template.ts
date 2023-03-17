import { compileTemplate, TemplateCompilerError } from "@ivi/template-compiler";
import type { TemplateDescriptor } from "./index.js";
import { _h, _hN, _hE, _s, _sN, _sE, _T, _t } from "./index.js";

const tryHoistExpr = (i: number) => false;

const DESCRIPTORS = new WeakMap<TemplateStringsArray, TemplateDescriptor>();

/**
 * Formats error message.
 *
 * @param errorMsg Error message.
 * @param errorCol Line column.
 */
const formatErrorMsg = (errorMsg: string, errorCol: number): string => {
  let msg = "";
  while (--errorCol >= 0) {
    msg += " ";
  }
  msg += "^\nError: " + errorMsg + "\n";
  return msg;
};

/**
 * Formats compiler errors.
 *
 * @param statics Statics.
 * @param errorMsg Error message.
 * @param staticsOffset Expression offset.
 * @param textOffset Text offset.
 * @returns Formatted error message.
 */
const formatError = (
  statics: TemplateStringsArray,
  errorMsg: string,
  staticsOffset: number,
  textOffset: number,
): string => {
  for (let i = 0; i < staticsOffset; i++) {
    if (i > 0) {
      textOffset += 4 + (Math.log10(i) | 0); // ${i}
    }
    textOffset += statics[i].length;
  }

  let msg = "\n";
  let text = statics[0];
  for (let i = 1; i < statics.length; i++) {
    text += "${" + (i - 1) + "}" + statics[i];
  }

  for (const line of text.split("\n")) {
    msg += line + "\n";
    if (textOffset >= 0 && textOffset < line.length) {
      msg += formatErrorMsg(errorMsg, textOffset);
    }
    textOffset -= (line.length + 1);
  }

  if (textOffset >= 0) {
    msg += formatErrorMsg(errorMsg, textOffset);
  }

  return msg;
};

/**
 * Creates template with HTML Elements.
 *
 * ### Element Syntax:
 *
 * - `div.classA.classB` - Static class names `<div class="classA classB">`
 * - `div${expr}`        - Dynamic class names `element.className = expr`
 * - `div :name='value'` - Static attribute with a value `<div name="value">`.
 * - `div :name`         - Static attribute without a value `<div name>`.
 * - `div :name=${expr}` - Dynamic attribute `element.setAttribute(name, expr)`.
 * - `div .name=${expr}` - Property `element[name] = expr`.
 * - `div *name=${expr}` - Property `element[name] = expr`, uses DOM value for diffing.
 * - `div ~name=${expr}` - Style `element.style.setProperty(name, expr)`
 * - `div @name=${expr}` - Event `element.addEventListener(name, expr)`
 * - `div =${expr}`      - Text Content `element.textContent = expr`
 * - `div $${directive}` - Directive `directive(element)`
 *
 *
 * @example
 *
 *     function MyApp(content) {
 *       return htm`
 *         div :id='App'
 *           h1.Title 'MyApp'
 *           div.Content ${content}
 *       `;
 *     }
 */
export const htm = (strings: TemplateStringsArray, ...exprs: any[]) => {
  let descriptor = DESCRIPTORS.get(strings);
  if (descriptor === void 0) {
    let result;
    try {
      result = compileTemplate(strings, false, tryHoistExpr);
    } catch (e) {
      if (e instanceof TemplateCompilerError) {
        throw Error(
          "Invalid template" +
          formatError(strings, e.message, e.staticsOffset, e.textOffset),
        );
      }
      throw e;
    }

    let factory;
    let template = result.template;
    if (typeof template === "string") {
      factory = _hE(template);
    } else {
      template = template.join("");
      if (result.disableCloning) {
        factory = _hN(template);
      } else {
        factory = _h(template);
      }
    }
    DESCRIPTORS.set(
      strings,
      descriptor = _T(
        factory,
        result.flags,
        result.propOpCodes,
        result.childOpCodes,
        result.stateOpCodes,
        result.data,
      ),
    );
  }

  return _t(descriptor, exprs);
};

/**
 * Creates template with SVG Elements.
 *
 * ### Element Syntax:
 *
 * - `div.classA.classB` - Static class names `<div class="classA classB">`
 * - `div${expr}`        - Dynamic class names `element.className = expr`
 * - `div :name='value'` - Static attribute with a value `<div name="value">`.
 * - `div :name`         - Static attribute without a value `<div name>`.
 * - `div :name=${expr}` - Dynamic attribute `element.setAttribute(name, expr)`.
 * - `div .name=${expr}` - Property `element[name] = expr`.
 * - `div *name=${expr}` - Property `element[name] = expr`, uses DOM value for diffing.
 * - `div ~name=${expr}` - Style `element.style.setProperty(name, expr)`
 * - `div @name=${expr}` - Event `element.addEventListener(name, expr)`
 * - `div =${expr}`      - Text Content `element.textContent = expr`
 * - `div $${directive}` - Directive `directive(element)`
 *
 * @example
 *
 *     function Star(content) {
 *       return svg`
 *         svg :height='210' :width='500'
 *           polygon
 *             :points='100,10 40,198 190,78 10,78 160,198'
 *             :style='fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero'
 *       `;
 *     }
 */
export const svg = (strings: TemplateStringsArray, ...exprs: any[]) => {
  let descriptor = DESCRIPTORS.get(strings);
  if (descriptor === void 0) {
    let result;
    try {
      result = compileTemplate(strings, true, tryHoistExpr);
    } catch (e) {
      if (e instanceof TemplateCompilerError) {
        throw Error(
          "Invalid template: " +
          formatError(strings, e.message, e.staticsOffset, e.textOffset),
        );
      }
      throw e;
    }
    let factory;
    let template = result.template;
    if (typeof template === "string") {
      factory = _sE(template);
    } else {
      template = template.join("");
      if (result.disableCloning) {
        factory = _sN(template);
      } else {
        factory = _s(template);
      }
    }
    DESCRIPTORS.set(
      strings,
      descriptor = _T(
        factory,
        result.flags,
        result.propOpCodes,
        result.childOpCodes,
        result.stateOpCodes,
        result.data,
      ),
    );
  }

  return _t(descriptor, exprs);
};
