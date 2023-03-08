import { deepStrictEqual } from "node:assert";
import { describe, test } from "node:test";
import { compileTemplate } from "../index.js";
import { ChildOpCode, PropOpCode, StateOpCode, TemplateFlags } from "../format.js";

const ONLY = { only: true };
ONLY;

const E = (n: number) => StateOpCode.EnterOrRemove | (n << StateOpCode.OffsetShift);
const R = StateOpCode.EnterOrRemove;
const S = StateOpCode.Save;
const N = StateOpCode.Next;

const F = (svg: boolean, stateSize: number, childrenSize: number) => (
  (svg ? TemplateFlags.Svg : 0) | (stateSize + 1) | (childrenSize << 10)
);

const cSP = (n: number) => ChildOpCode.SetParent | ((n + 1) << ChildOpCode.ValueShift);
const cSN = (n: number) => ChildOpCode.SetNext | ((n + 1) << ChildOpCode.ValueShift);
const cC = (n: number) => ChildOpCode.Child | (n << ChildOpCode.ValueShift);

const pSN = (n: number) => PropOpCode.SetNode | ((n + 1) << PropOpCode.DataShift);
const pClass = (n: number) => PropOpCode.Common | (n << PropOpCode.InputShift);
const pAttr = (k: number, n: number) => PropOpCode.Attribute | (k << PropOpCode.DataShift) | (n << PropOpCode.InputShift);

const noHoistExpr = (i: number) => false;
const h = (strings: TemplateStringsArray, ...exprs: any[]): any => (
  compileTemplate(strings, false, noHoistExpr)
);

describe("template compilation", () => {
  describe("static templates", () => {
    test("single element", () => {
      deepStrictEqual(
        h`div`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: `div`,
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("spaces at the start", () => {
      deepStrictEqual(
        h`  \tdiv`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: `div`,
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("spaces at the end", () => {
      deepStrictEqual(
        h`div  \t`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: `div`,
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("new line before the root element", () => {
      deepStrictEqual(
        h`
        div`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: `div`,
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("new line after the root element", () => {
      deepStrictEqual(
        h`div
        `,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: `div`,
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("inline text 1", () => {
      deepStrictEqual(
        h`div 'ab'`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, `>`, `ab`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("inline text 2", () => {
      deepStrictEqual(
        h`div #'a#b'#`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, `>`, `a#b`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("inline text 3", () => {
      deepStrictEqual(
        h`div ##'a#b'##`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, `>`, `a#b`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("inline element", () => {
      deepStrictEqual(
        h`div span`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, `>`, `<span`, `>`, `</span>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("nested elements 1", () => {
      deepStrictEqual(
        h`
        h1
          h2`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<h1`, `>`, `<h2`, `>`, `</h2>`, `</h1>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("nested elements 2", () => {
      deepStrictEqual(
        h`
        h1
          h2
            h3
          h2`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<h1`, `>`, `<h2`, `>`, `<h3`, `>`, `</h3>`, `</h2>`, `<h2`, `>`, `</h2>`, `</h1>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("nested text", () => {
      deepStrictEqual(
        h`
        h1
          h2 'a'
            h3 'b'
          h2`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<h1`, `>`, `<h2`, `>`, `a`, `<h3`, `>`, `b`, `</h3>`, `</h2>`, `<h2`, `>`, `</h2>`, `</h1>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("class name", () => {
      deepStrictEqual(
        h`div.ab`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, ` class="ab"`, `>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("multiple class names", () => {
      deepStrictEqual(
        h`div.ab.cd`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, ` class="ab cd"`, `>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("bool attribute", () => {
      deepStrictEqual(
        h`div :autofocus`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, ` autofocus`, `>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("attribute with a value", () => {
      deepStrictEqual(
        h`div :attr='value'`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, ` attr="value"`, `>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("multiline attributes", () => {
      deepStrictEqual(
        h`
        div
          :autofocus
          :attr='ok'`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, ` autofocus`, ` attr="ok"`, `>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });
  });

  describe("escaping", () => {
    test("attributes", () => {
      deepStrictEqual(
        h`div :attr=#'a<b>#c&d"e'f'#`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, ` attr="a<b>#c&amp;d&quot;e'f"`, `>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("text nodes", () => {
      deepStrictEqual(
        h`div #'a<b>#c&d"e'f'#`,
        {
          disableCloning: false,
          flags: F(false, 0, 0),
          template: [`<div`, `>`, `a&lt;b>#c&amp;d"e'f`, `</div>`],
          propOpCodes: [],
          childOpCodes: [],
          stateOpCodes: [],
          data: [],
        },
      );
    });
  });

  describe("dynamic children", () => {
    test("inline expr", () => {
      deepStrictEqual(
        h`div ${0}`,
        {
          disableCloning: false,
          flags: F(false, 0, 1),
          template: `div`,
          propOpCodes: [],
          childOpCodes: [cC(0)],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("single child expr", () => {
      deepStrictEqual(
        h`
        div
          ${0}`,
        {
          disableCloning: false,
          flags: F(false, 0, 1),
          template: `div`,
          propOpCodes: [],
          childOpCodes: [cC(0)],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("expr after text", () => {
      deepStrictEqual(
        h`
        div
          'a'
          ${0}`,
        {
          disableCloning: false,
          flags: F(false, 0, 1),
          template: [`<div`, `>`, `a`, `</div>`],
          propOpCodes: [],
          childOpCodes: [cC(0)],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("expr before text", () => {
      deepStrictEqual(
        h`
        div
          ${0}
          'b'`,
        {
          disableCloning: false,
          flags: F(false, 1, 1),
          template: [`<div`, `>`, `b`, `</div>`],
          propOpCodes: [],
          childOpCodes: [cSN(0), cC(0)],
          stateOpCodes: [S],
          data: [],
        },
      );
    });

    test("expr between texts", () => {
      deepStrictEqual(
        h`
        div
          'a'
          ${0}
          'b'`,
        {
          disableCloning: false,
          flags: F(false, 1, 1),
          template: [`<div`, `>`, `a`, `<!>`, `b`, `</div>`],
          propOpCodes: [],
          childOpCodes: [cSN(0), cC(0)],
          stateOpCodes: [N, R],
          data: [],
        },
      );
    });

    test("expr after element", () => {
      deepStrictEqual(
        h`
        div
          a
          ${0}`,
        {
          disableCloning: false,
          flags: F(false, 0, 1),
          template: [`<div`, `>`, `<a`, `>`, `</a>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [cC(0)],
          stateOpCodes: [],
          data: [],
        },
      );
    });

    test("expr before element", () => {
      deepStrictEqual(
        h`
        div
          ${0}
          b`
        ,
        {
          disableCloning: false,
          flags: F(false, 1, 1),
          template: [`<div`, `>`, `<b`, `>`, `</b>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [cSN(0), cC(0)],
          stateOpCodes: [S],
          data: [],
        },
      );
    });

    test("expr between elements", () => {
      deepStrictEqual(
        h`
        div
          a
          ${0}
          b`,
        {
          disableCloning: false,
          flags: F(false, 1, 1),
          template: [`<div`, `>`, `<a`, `>`, `</a>`, `<b`, `>`, `</b>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [cSN(0), cC(0)],
          stateOpCodes: [N, S],
          data: [],
        },
      );
    });

    test("expr between text and element", () => {
      deepStrictEqual(
        h`
        div
          'a'
          ${0}
          b`,
        {
          disableCloning: false,
          flags: F(false, 1, 1),
          template: [`<div`, `>`, `a`, `<b`, `>`, `</b>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [cSN(0), cC(0)],
          stateOpCodes: [N, S],
          data: [],
        },
      );
    });

    test("expr between element and text", () => {
      deepStrictEqual(
        h`
        div
          a
          ${0}
          'b'`,
        {
          disableCloning: false,
          flags: F(false, 1, 1),
          template: [`<div`, `>`, `<a`, `>`, `</a>`, `b`, `</div>`],
          propOpCodes: [],
          childOpCodes: [cSN(0), cC(0)],
          stateOpCodes: [N, S],
          data: [],
        },
      );
    });

    test("1", () => {
      deepStrictEqual(
        h`
        div
          a ${0}
          h1 h2 ${1}
          ${2}
          ${3}
        `,

        {
          disableCloning: false,
          flags: F(false, 2, 4),
          template: [`<div`, `>`, `<a`, `>`, `</a>`, `<h1`, `>`, `<h2`, `>`, `</h2>`, `</h1>`, `</div>`],
          propOpCodes: [],
          childOpCodes: [cC(3), cC(2), cSP(1), cC(1), cSP(0), cC(0)],
          stateOpCodes: [S | N, E(1), S],
          data: [],
        },
      );
    });

    test("2", () => {
      deepStrictEqual(
        h`
        div
          a
            b
            ${0}
            c
        `,
        {
          t: `<div><a><b></b><c></c></a></div>`,
          k: [],
          s: [E(2) | S, N, S],
          p: [],
          c: [cSP(0), cSN(1), cC(0)],
          f: F(false, 2, 1),
        },
      );
    });

    test("3", () => {
      deepStrictEqual(
        h`
        div
          a
            b
              ${0}
            ${1}
        `,
        {
          t: `<div><a><b></b></a></div>`,
          k: [],
          s: [E(1) | S, S],
          p: [],
          c: [cSP(0), cC(1), cSP(1), cC(0)],
          f: F(false, 2, 2),
        },
      );
    });

    test("4", () => {
      deepStrictEqual(
        h`
        div
          ${0}
          a
            b ${1}
            c
        `,
        {
          t: `<div><a><b></b><c></c></a></div>`,
          k: [],
          s: [E(1) | S, S],
          p: [],
          c: [cSN(0), cC(0), cSP(1), cC(1)],
          f: F(false, 2, 2),
        },
      );
    });

    test("5", () => {
      deepStrictEqual(
        h`
        a
          b ${0}
          c d${1} ${2}
          ${3}
        `,

        {
          disableCloning: false,
          flags: F(false, 2, 3),
          template: [`<a`, `>`, `<b`, `>`, `</b>`, `<c`, `>`, `<d`, `>`, `</d>`, `</c>`, `</a>`],
          propOpCodes: [pSN(1), pClass(1)],
          childOpCodes: [cC(3), cSP(1), cC(2), cSP(0), cC(0)],
          stateOpCodes: [S | N, E(1), S],
          data: [],
        },
      );
    });

    test("6", () => {
      deepStrictEqual(
        h`
        a${0}
          :key=${1}
          ${2}
        `,

        {
          disableCloning: false,
          flags: F(false, 0, 1),
          template: `a`,
          propOpCodes: [pClass(0), pAttr(0, 1)],
          childOpCodes: [cC(2)],
          stateOpCodes: [],
          data: ["key"],
          dynamicExprs: [0, 1, 2],
        },
      );
    });
  });
});
