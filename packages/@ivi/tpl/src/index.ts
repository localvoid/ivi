import { compileTemplate } from "ivi/template/compiler";
import { type TemplateNode, TemplateNodeType } from "ivi/template/format";
import { ITemplateType } from "ivi/template/ir";
import { TemplateParserError, formatError } from "ivi/template/parser";
import type { TemplateDescriptor, VAny } from "ivi";
import { _h, _hN, _hE, _s, _sN, _sE, _T, _t } from "ivi";
import { parseTemplate } from "./parser.js";

const tryHoistExpr = (i: number) => false;

const DESCRIPTORS = new WeakMap<TemplateStringsArray, (exprs: any[]) => VAny>();

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
  let fn = DESCRIPTORS.get(strings);
  if (fn === void 0) {
    let result;
    try {
      const tpl = parseTemplate(strings, ITemplateType.Htm, tryHoistExpr);
      result = compileTemplate(tpl);
    } catch (e) {
      if (e instanceof TemplateParserError) {
        throw Error(
          "Invalid template" +
          formatError(strings, e.message, e.staticsOffset, e.textOffset),
        );
      }
      throw e;
    }

    const roots = result.roots;
    if (roots.length === 1) {
      const root = prepareRootNode(roots[0], _hE, _h);
      fn = (exprs) => createRootNode(root, exprs);
    } else {
      const entries = roots.map((root) => prepareRootNode(root, _hE, _h));
      fn = (exprs) => entries.map((root) => createRootNode(root, exprs));
    }
    DESCRIPTORS.set(strings, fn);
  }

  return fn(exprs);
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
  let fn = DESCRIPTORS.get(strings);
  if (fn === void 0) {
    let result;
    try {
      const tpl = parseTemplate(strings, ITemplateType.Htm, tryHoistExpr);
      result = compileTemplate(tpl);
    } catch (e) {
      if (e instanceof TemplateParserError) {
        throw Error(
          "Invalid template" +
          formatError(strings, e.message, e.staticsOffset, e.textOffset),
        );
      }
      throw e;
    }

    const roots = result.roots;
    if (roots.length === 1) {
      const root = prepareRootNode(roots[0], _sE, _s);
      fn = (exprs) => createRootNode(root, exprs);
    } else {
      const entries = roots.map((root) => prepareRootNode(root, _hE, _h));
      fn = (exprs) => entries.map((root) => createRootNode(root, exprs));
    }
    DESCRIPTORS.set(strings, fn);
  }

  return fn(exprs);
};

interface RootNodeBlock {
  readonly map: number[];
  readonly descriptor: TemplateDescriptor;
}
type RootNode = RootNodeBlock | string | number;

const prepareRootNode = (root: TemplateNode,
  createElement: (t: string) => () => Element,
  cloneTemplate: (t: string) => () => Element,
) => {
  switch (root.type) {
    case TemplateNodeType.Block:
      const template = root.template;
      return {
        map: root.exprs,
        descriptor: _T(
          (typeof template === "string")
            ? createElement(template)
            : cloneTemplate(template.join("")),
          root.flags,
          root.props,
          root.child,
          root.state,
          root.data,
        ),
      };
    case TemplateNodeType.Text:
      return root.value;
    case TemplateNodeType.Expr:
      return root.value;
  }
};

const createRootNode = (e: RootNode, exprs: any[]) => {
  if (typeof e === "object") {
    return _t(e.descriptor, e.map.map((i) => exprs[i]));
  }
  if (typeof e === "number") {
    return exprs[e];
  }
  return e;
};
