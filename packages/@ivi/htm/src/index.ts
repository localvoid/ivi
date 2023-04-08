import {
  type TemplateNode, TemplateNodeType, compileTemplate,
} from "ivi/template/client";
import { ITemplateType } from "ivi/template/ir";
import { TemplateParserError, formatError } from "ivi/template/parser";
import {
  type TemplateDescriptor, type VAny,
  _h, _hN, _hE, _s, _sN, _sE, _Td, _t
} from "ivi";
import { parseTemplate } from "./parser.js";

const tryHoistExpr = (i: number) => false;

const DESCRIPTORS = new WeakMap<TemplateStringsArray, (exprs: any[]) => VAny>();

/**
 * Creates template with HTML Elements.
 *
 * ### Element Syntax:
 *
 * - `<div name="value" />` - Static Attribute.
 * - `<div name />` - Static Attribute.
 * - `<div name=${expr} />` - Dynamic attribute `element.setAttribute(name, expr)`.
 * - `<div .name=${expr} />` - Property `element[name] = expr`.
 * - `<div *name=${expr} />` - Property `element[name] = expr`, diffs against a DOM value.
 * - `<div ~name="value" />` - Static style `<div style="name:value;">`
 * - `<div ~name=${expr} />` - Dynamic style `element.style.setProperty(name, expr)`
 * - `<div @name=${expr} />` - Event `element.addEventListener(name, expr)`
 * - `<div ${directive} />` - Client-Side Directive `directive(element)`
 * - `<div &=${directive} />` - Client-Side Element Directive `directive(element)`.
 * - `<div &:ssr=${directive} />` - Element Directive that works during Client-Side and
 *  Server-Side Rendering `directive(element, hydrate)`.
 *
 * @example
 *
 *     function MyApp(content) {
 *       return htm`
 *         <div id="App">
 *           <h1 class="Title">MyApp</h1>
 *           <div>Content ${content}</div>
 *         </div>
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
 * - `<div name="value" />` - Static Attribute.
 * - `<div name />` - Static Attribute.
 * - `<div name=${expr} />` - Dynamic attribute `element.setAttribute(name, expr)`.
 * - `<div .name=${expr} />` - Property `element[name] = expr`.
 * - `<div *name=${expr} />` - Property `element[name] = expr`, diffs against a DOM value.
 * - `<div ~name="value" />` - Static style `<div style="name:value;">`
 * - `<div ~name=${expr} />` - Dynamic style `element.style.setProperty(name, expr)`
 * - `<div @name=${expr} />` - Event `element.addEventListener(name, expr)`
 * - `<div ${directive} />` - Client-Side Directive `directive(element)`
 * - `<div &=${directive} />` - Client-Side Element Directive `directive(element)`.
 * - `<div &:ssr=${directive} />` - Element Directive that works during Client-Side and
 *  Server-Side Rendering `directive(element, hydrate)`.
 *
 * @example
 *
 *     function Star(content) {
 *       return svg`
 *         <svg height="210" width="500">
 *           <polygon
 *             points="100,10 40,198 190,78 10,78 160,198"
 *             ~fill="lime"
 *             ~stroke="purple"
 *             ~stroke-width="5"
 *             ~fill-rule="nonzero"
 *           />
 *         </svg>
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
        descriptor: _Td(
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
