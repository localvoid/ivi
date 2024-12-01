import { deepStrictEqual } from "node:assert";
import { describe, test } from "node:test";
import {
  ChildOpCode, PropOpCode, StateOpCode, TemplateFlags, CommonPropType,
} from "../../lib/template.js";
import {
  type TemplateCompilationArtifact, type TemplateNode, TemplateNodeType,
  compileTemplate,
} from "../compiler.js";
import {
  type INode, type INodeElement, type INodeExpr, type INodeText, type IProperty,
  type IPropertyAttribute, type IPropertyValue, type ITemplate,
  type IPropertyStyle,
  INodeType, IPropertyType, ITemplateType,
} from "../ir.js";

const _ = void 0;
const ONLY = { only: true };
ONLY;

const E = (n: number) => StateOpCode.EnterOrRemove | (n << StateOpCode.OffsetShift);
const R = StateOpCode.EnterOrRemove;
const S = StateOpCode.Save;

const F = (svg: boolean, stateSize: number, childrenSize: number) => (
  (svg ? TemplateFlags.Svg : 0) | (stateSize + 1) | (childrenSize << TemplateFlags.ChildrenSizeShift)
);

const cSP = (n: number) => ChildOpCode.SetParent | ((n + 1) << ChildOpCode.ValueShift);
const cSN = (n: number) => ChildOpCode.SetNext | ((n + 1) << ChildOpCode.ValueShift);
const cC = (n: number) => ChildOpCode.Child | (n << ChildOpCode.ValueShift);

const pSN = (n: number) => PropOpCode.SetNode | ((n + 1) << PropOpCode.DataShift);
const pClass = (n: number) => PropOpCode.Common | (n << PropOpCode.InputShift);
const pTextContent = (n: number) => PropOpCode.Common | (CommonPropType.TextContent << PropOpCode.DataShift) | (n << PropOpCode.InputShift);
const pInnerHTML = (n: number) => PropOpCode.Common | (CommonPropType.InnerHTML << PropOpCode.DataShift) | (n << PropOpCode.InputShift);
const pAttr = (k: number, n: number) => PropOpCode.Attribute | (k << PropOpCode.DataShift) | (n << PropOpCode.InputShift);

const c = (tpl: ITemplate) => compileTemplate(tpl);

const h = (children: INode[]): ITemplate => ({
  type: ITemplateType.Htm,
  children,
});

const el = (tag: string, properties: IProperty[] = [], children: INode[] = []): INodeElement => ({
  type: INodeType.Element,
  tag,
  properties,
  children,
});

const text = (value: string): INodeText => ({
  type: INodeType.Text,
  value,
});

const expr = (value: number): INodeExpr => ({
  type: INodeType.Expr,
  value,
});

const attr = (key: string, value: string | number | boolean): IPropertyAttribute => ({
  type: IPropertyType.Attribute,
  key,
  value,
  hoist: false,
});

const prop = (key: string, value: number): IPropertyValue => ({
  type: IPropertyType.Value,
  key,
  value,
  hoist: false,
});

const styl = (key: string, value: string | number): IPropertyStyle => ({
  type: IPropertyType.Style,
  key,
  value,
  hoist: false,
});

const result = (roots: TemplateNode[]): TemplateCompilationArtifact => ({ roots });

describe("template compilation", () => {
  describe("static templates", () => {
    test("single element", () => {
      deepStrictEqual(
        c(h([el("div")])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: `div`,
            props: [],
            child: [],
            state: [],
            data: [],
            exprs: [],
          },
        ]),
      );
    });


    test("child text", () => {
      deepStrictEqual(
        c(h([el("div", _, [text("ab")])])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: [`<div`, `>`, `ab`, `</div>`],
            props: [],
            child: [],
            state: [],
            data: [],
            exprs: [],
          },
        ]),
      );
    });

    test("merge text #1", () => {
      deepStrictEqual(
        c(h([el("div", _, [text("a"), text("b")])])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: [`<div`, `>`, `ab`, `</div>`],
            props: [],
            child: [],
            state: [],
            data: [],
            exprs: [],
          },
        ]),
      );
    });

    test("merge text #2", () => {
      deepStrictEqual(
        c(h([el("div", _, [text("a"), text("b"), el("a")])])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: [`<div`, `>`, `ab`, `<a`, `>`, `</a>`, `</div>`],
            props: [],
            child: [],
            state: [],
            data: [],
            exprs: [],
          },
        ]),
      );
    });


    test("merge text #3", () => {
      deepStrictEqual(
        c(h([el("div", _, [text("a"), text("b"), expr(0)])])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 1),
            template: [`<div`, `>`, `ab`, `</div>`],
            props: [],
            child: [0],
            state: [],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });
    test("child element", () => {
      deepStrictEqual(
        c(h([el("div", _, [el("span")])])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: [`<div`, `>`, `<span`, `>`, `</span>`, `</div>`],
            props: [],
            child: [],
            state: [],
            data: [],
            exprs: [],
          },
        ]),
      );
    });

    test("nested elements 1", () => {
      deepStrictEqual(
        c(h([
          el("h1", _, [
            el("h2", _, [el("h3")]),
            el("h4"),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: [`<h1`, `>`, `<h2`, `>`, `<h3`, `>`, `</h3>`, `</h2>`, `<h4`, `>`, `</h4>`, `</h1>`],
            props: [],
            child: [],
            state: [],
            data: [],
            exprs: [],
          },
        ]),
      );
    });

    test("attribute", () => {
      deepStrictEqual(
        c(h([
          el("div", [attr("class", "ab")]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: [`<div`, ` class="ab"`, `>`, `</div>`],
            props: [],
            child: [],
            state: [],
            data: [],
            exprs: [],
          },
        ]),
      );
    });

    test("bool attribute", () => {
      deepStrictEqual(
        c(h([
          el("div", [attr("autofocus", true)]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: [`<div`, ` autofocus`, `>`, `</div>`],
            props: [],
            child: [],
            state: [],
            data: [],
            exprs: [],
          },
        ]),
      );
    });
  });

  describe("dynamic children", () => {
    test("single child expr", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            expr(0),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 1),
            template: `div`,
            props: [],
            child: [cC(0)],
            state: [],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("expr after text", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            text("a"),
            expr(0),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 1),
            template: [`<div`, `>`, `a`, `</div>`],
            props: [],
            child: [cC(0)],
            state: [],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("expr before text", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            expr(0),
            text("b"),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 1, 1),
            template: [`<div`, `>`, `b`, `</div>`],
            props: [],
            child: [cSN(0), cC(0)],
            state: [S],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("expr between texts", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            text("a"),
            expr(0),
            text("b"),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 1, 1),
            template: [`<div`, `>`, `a`, `<!>`, `b`, `</div>`],
            props: [],
            child: [cSN(0), cC(0)],
            state: [0, R],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("expr between texts 2", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            expr(0),
            text("a"),
            expr(1),
            text("b"),
            expr(2),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 2, 3),
            template: [`<div`, `>`, `a`, `<!>`, `b`, `</div>`],
            props: [],
            child: [cC(2), cSN(1), cC(1), cSN(0), cC(0)],
            state: [S, R],
            data: [],
            exprs: [0, 1, 2],
          },
        ]),
      );
    });

    test("expr after element", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            el("a"),
            expr(0),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 1),
            template: [`<div`, `>`, `<a`, `>`, `</a>`, `</div>`],
            props: [],
            child: [cC(0)],
            state: [],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("expr before element", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            expr(0),
            el("b"),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 1, 1),
            template: [`<div`, `>`, `<b`, `>`, `</b>`, `</div>`],
            props: [],
            child: [cSN(0), cC(0)],
            state: [S],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("expr between elements", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            el("a"),
            expr(0),
            el("b"),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 1, 1),
            template: [`<div`, `>`, `<a`, `>`, `</a>`, `<b`, `>`, `</b>`, `</div>`],
            props: [],
            child: [cSN(0), cC(0)],
            state: [0, S],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("expr between text and element", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            text("a"),
            expr(0),
            el("b"),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 1, 1),
            template: [`<div`, `>`, `a`, `<b`, `>`, `</b>`, `</div>`],
            props: [],
            child: [cSN(0), cC(0)],
            state: [0, S],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("expr between element and text", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            el("a"),
            expr(0),
            text("b"),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 1, 1),
            template: [`<div`, `>`, `<a`, `>`, `</a>`, `b`, `</div>`],
            props: [],
            child: [cSN(0), cC(0)],
            state: [0, S],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("1", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            el("a", _, [expr(0)]),
            el("h1", _, [
              el("h2", _, [expr(1)]),
            ]),
            expr(2),
            expr(3),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 2, 4),
            template: [`<div`, `>`, `<a`, `>`, `</a>`, `<h1`, `>`, `<h2`, `>`, `</h2>`, `</h1>`, `</div>`],
            props: [],
            child: [cC(3), cC(2), cSP(1), cC(1), cSP(0), cC(0)],
            state: [S, E(1), S],
            data: [],
            exprs: [0, 1, 2, 3],
          },
        ]),
      );
    });

    test("2", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            el("a", _, [
              el("b"),
              expr(0),
              el("c"),
            ]),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 2, 1),
            template: [`<div`, `>`, `<a`, `>`, `<b`, `>`, `</b>`, `<c`, `>`, `</c>`, `</a>`, `</div>`],
            props: [],
            child: [cSP(0), cSN(1), cC(0)],
            state: [E(2) | S, 0, S],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("3", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            el("a", _, [
              el("b", _, [expr(0)]),
              expr(1),
            ]),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 2, 2),
            template: [`<div`, `>`, `<a`, `>`, `<b`, `>`, `</b>`, `</a>`, `</div>`],
            props: [],
            child: [cSP(0), cC(1), cSP(1), cC(0)],
            state: [E(1) | S, S],
            data: [],
            exprs: [0, 1],
          },
        ]),
      );
    });

    test("4", () => {
      deepStrictEqual(
        c(h([
          el("div", _, [
            expr(0),
            el("a", _, [
              el("b", _, [expr(1)]),
              el("c"),
            ]),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 2, 2),
            template: [`<div`, `>`, `<a`, `>`, `<b`, `>`, `</b>`, `<c`, `>`, `</c>`, `</a>`, `</div>`],
            props: [],
            child: [cSN(0), cC(0), cSP(1), cC(1)],
            state: [E(1) | S, S],
            data: [],
            exprs: [0, 1],
          },
        ]),
      );
    });

    test("5", () => {
      deepStrictEqual(
        c(h([
          el("a", _, [
            el("b", _, [expr(0)]),
            el("c", _, [
              el("d", [attr("class", 1)], [expr(2)]),
            ]),
            expr(3),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 2, 3),
            template: [`<a`, `>`, `<b`, `>`, `</b>`, `<c`, `>`, `<d`, `>`, `</d>`, `</c>`, `</a>`],
            props: [pSN(1), pClass(1)],
            child: [cC(3), cSP(1), cC(2), cSP(0), cC(0)],
            state: [S, E(1), S],
            data: [],
            exprs: [0, 1, 2, 3],
          },
        ]),
      );
    });

    test("6", () => {
      deepStrictEqual(
        c(h([
          el("a", [attr("class", 0), attr("key", 1)], [
            expr(2),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 1),
            template: `a`,
            props: [pClass(0), pAttr(0, 1)],
            child: [cC(2)],
            state: [],
            data: ["key"],
            exprs: [0, 1, 2],
          },
        ]),
      );
    });

    test("7", () => {
      deepStrictEqual(
        c(h([
          el("h1", _, [
            el("h2", _, [
              el("h3", [attr("class", 0)], [text("t")]),
            ]),
            el("h2", _, [
              el("h3", [prop("textContent", 1)]),
              expr(2),
            ]),
          ]),
        ])).roots[0],
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 3, 1),
            template: ["<h1", ">", "<h2", ">", "<h3", ">", "t", "</h3>", "</h2>", "<h2", ">", "<h3", ">", "</h3>", "</h2>", "</h1>"],
            props: [pSN(0), pClass(0), pSN(2), pTextContent(1)],
            child: [cSP(1), cC(2)],
            state: [E(1), S, S | E(1), S],
            data: [],
            exprs: [0, 1, 2],
          },
        ]).roots[0],
      );
    });

    test("8", () => {
      deepStrictEqual(
        c(h([
          el("h1", _, [
            el("h2", _, [
              el("h3", _, [
                expr(0)
              ]),
            ]),
          ]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 1, 1),
            template: [`<h1`, `>`, `<h2`, `>`, `<h3`, `>`, `</h3>`, `</h2>`, `</h1>`],
            props: [],
            child: [cSP(0), cC(0)],
            state: [E(1), S],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });

    test("9", () => {
      deepStrictEqual(
        c(h([
          el("h1", [attr("a", 0), prop("textContent", 1)]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: `h1`,
            props: [pAttr(0, 0), pTextContent(1)],
            child: [],
            state: [],
            data: ["a"],
            exprs: [0, 1],
          },
        ]),
      );
    });

    test("innerHTML", () => {
      deepStrictEqual(
        c(h([
          el("a", [prop("innerHTML", 0)]),
        ])),
        result([
          {
            type: TemplateNodeType.Block,
            flags: F(false, 0, 0),
            template: `a`,
            props: [pInnerHTML(0)],
            child: [],
            state: [],
            data: [],
            exprs: [0],
          },
        ]),
      );
    });
  });
});

describe("static styles", () => {
  test("1", () => {
    deepStrictEqual(
      c(h([
        el("div", [styl("top", "1px")]),
      ])),
      result([
        {
          type: TemplateNodeType.Block,
          flags: F(false, 0, 0),
          template: [`<div`, ` style="top:1px"`, `>`, `</div>`],
          props: [],
          child: [],
          state: [],
          data: [],
          exprs: [],
        },
      ]),
    );
  });

  test("2", () => {
    deepStrictEqual(
      c(h([
        el("div", [styl("top", "1px"), styl("left", "2px")]),
      ])),
      result([
        {
          type: TemplateNodeType.Block,
          flags: F(false, 0, 0),
          template: [`<div`, ` style="top:1px;left:2px"`, `>`, `</div>`],
          props: [],
          child: [],
          state: [],
          data: [],
          exprs: [],
        },
      ]),
    );
  });

  test("merge with attribute", () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("top", "1px"),
          attr("style", "margin:0"),
          styl("left", "2px"),
        ]),
      ])),
      result([
        {
          type: TemplateNodeType.Block,
          flags: F(false, 0, 0),
          template: [`<div`, ` style="top:1px;margin:0;left:2px"`, `>`, `</div>`],
          props: [],
          child: [],
          state: [],
          data: [],
          exprs: [],
        },
      ]),
    );
  });
});
