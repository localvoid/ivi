import { deepStrictEqual, } from "node:assert";
import { describe, test } from "bun:test";
import { parseTemplate } from "ivi/html/parser";
import {
  type INodeText, type INodeExpr, type INodeElement, type INode,
  type IProperty, type IPropertyAttribute, type IPropertyValue,
  type IPropertyDOMValue, type IPropertyStyle, type IPropertyEvent,
  type IPropertyDirective,
  TEMPLATE_TYPE_HTM,
  NODE_TYPE_EXPR,
  NODE_TYPE_TEXT,
  NODE_TYPE_ELEMENT,
  PROPERTY_TYPE_ATTRIBUTE,
  PROPERTY_TYPE_VALUE,
  PROPERTY_TYPE_DOMVALUE,
  PROPERTY_TYPE_STYLE,
  PROPERTY_TYPE_EVENT,
  PROPERTY_TYPE_DIRECTIVE,
} from "ivi/template/ir";

const _ = void 0;

const ATTR = (key: string, value: string | boolean | number): IPropertyAttribute => ({
  type: PROPERTY_TYPE_ATTRIBUTE,
  key,
  value,
});

const PROP = (key: string, value: number): IPropertyValue => ({
  type: PROPERTY_TYPE_VALUE,
  key,
  value,
  hoist: false,
});

const DPROP = (key: string, value: number): IPropertyDOMValue => ({
  type: PROPERTY_TYPE_DOMVALUE,
  key,
  value,
  hoist: false,
});

const STYLE = (key: string, value: number | string): IPropertyStyle => ({
  type: PROPERTY_TYPE_STYLE,
  key,
  value,
  hoist: false,
});

const EVENT = (key: string, value: number): IPropertyEvent => ({
  type: PROPERTY_TYPE_EVENT,
  key,
  value,
  hoist: false,
});

const DIRECTIVE = (
  value: number,
): IPropertyDirective => ({
  type: PROPERTY_TYPE_DIRECTIVE,
  key: null,
  value,
  hoist: false,
});

const E = (tag: string, properties: IProperty[] = [], children: INode[] = []): INodeElement => ({
  type: NODE_TYPE_ELEMENT,
  tag,
  properties,
  children,
});

const T = (value: string): INodeText => ({
  type: NODE_TYPE_TEXT,
  value,
});

const X = (value: number): INodeExpr => ({
  type: NODE_TYPE_EXPR,
  value,
});

describe("@ivi/htm/parser", () => {
  test(`a`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          T("a"),
        ],
      },
    );
  });

  test(`<a/>`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<a/>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a"),
        ],
      },
    );
  });

  test(`<a></a>`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<a></a>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a"),
        ],
      },
    );
  });

  test(`<a>a</a>`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<a>a</a>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            T("a"),
          ]),
        ],
      },
    );
  });

  test(`<a>{0}</a>`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<a>`, `</a>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            X(0),
          ]),
        ],
      },
    );
  });

  test(`<a>a{0}</a>`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<a>a`, `</a>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            T("a"), X(0),
          ]),
        ],
      },
    );
  });

  test(`<a>{0}b</a>`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<a>`, `b</a>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            X(0), T("b"),
          ]),
        ],
      },
    );
  });

  test(`<a>a{0}b</a>`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<a>a`, `b</a>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            T("a"), X(0), T("b"),
          ]),
        ],
      },
    );
  });

  test(`a<a/>b`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a<a/>b`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          T("a"),
          E("a"),
          T("b"),
        ],
      },
    );
  });

  test(`a{0}b`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a`, `b`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          T("a"),
          X(0),
          T("b"),
        ],
      },
    );
  });

  test(`whitespace #1`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <a>
          </a>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a"),
        ],
      },
    );
  });

  test(`whitespace #2`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <a>

          </a>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a"),
        ],
      },
    );
  });

  test(`whitespace #3`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <a> </a>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [T(" ")]),
        ],
      },
    );
  });

  test(`whitespace #4`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div>
            <a></a>
            <b></b>
          </div>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", _, [
            E("a"),
            E("b"),
          ]),
        ],
      },
    );
  });

  test(`whitespace #5`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div>
            a
          </div>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", _, [
            T("a"),
          ]),
        ],
      },
    );
  });

  test(`whitespace #6`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div>
            a
            b
          </div>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", _, [
            T("a b"),
          ]),
        ],
      },
    );
  });

  test(`whitespace #7`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div>
            a  b
          </div>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", _, [
            T("a b"),
          ]),
        ],
      },
    );
  });

  test(`whitespace #8`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div>  a  b  </div>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", _, [
            T(" a b "),
          ]),
        ],
      },
    );
  });

  test(`whitespace #9`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div>
            \va
          </div>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", _, [
            T(" a"),
          ]),
        ],
      },
    );
  });

  test(`whitespace #10`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div>
            a\v
          </div>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", _, [
            T("a "),
          ]),
        ],
      },
    );
  });

  test(`whitespace #11`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div>
            a
            <a>
              b
            </a>
          </div>
        `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", _, [
            T("a"),
            E("a", _, [T("b")]),
          ]),
        ],
      },
    );
  });

  test(`whitespace #12`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `<a> `,
          `</a>`,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            T(" "),
            X(0),
          ]),
        ],
      },
    );
  });

  test(`whitespace #13`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `<a>`,
          ` </a>`,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            X(0),
            T(" "),
          ]),
        ],
      },
    );
  });

  test(`whitespace #14`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `<a> `,
          ` </a>`,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            T(" "),
            X(0),
            T(" "),
          ]),
        ],
      },
    );
  });

  test(`whitespace #15`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `<a> `,
          ` `,
          ` </a>`,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            T(" "),
            X(0),
            T(" "),
            X(1),
            T(" "),
          ]),
        ],
      },
    );
  });

  test(`whitespace #16`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `<a>
          `,
          `
          </a>`,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            X(0),
          ]),
        ],
      },
    );
  });

  test(`whitespace #17`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `<a>
          \v`,
          `\v
          </a>`,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            T(" "),
            X(0),
            T(" "),
          ]),
        ],
      },
    );
  });

  test(`whitespace #18`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `<a> `, ` `, ` </a>`
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("a", _, [
            T(" "),
            X(0),
            T(" "),
            X(1),
            T(" "),
          ]),
        ],
      },
    );
  });

  test(`attr #1`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div a/>
          `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            ATTR("a", true),
          ]),
        ],
      },
    );
  });

  test(`attr #2`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div a="1"/>
          `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            ATTR("a", "1"),
          ]),
        ],
      },
    );
  });

  test(`attr #3`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div a=`, `/>
          `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            ATTR("a", 0),
          ]),
        ],
      },
    );
  });

  test(`attr #4`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div
             a="1"
             b="2"
          />
          `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            ATTR("a", "1"),
            ATTR("b", "2"),
          ]),
        ],
      },
    );
  });

  test(`attr #5`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          <div
             a="1"
             b="2"
          ></div>
          `,
        ],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            ATTR("a", "1"),
            ATTR("b", "2"),
          ]),
        ],
      },
    );
  });

  test(`.prop`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<div .a=`, `/>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            PROP("a", 0),
          ]),
        ],
      },
    );
  });

  test(`*prop`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<div *a=`, `/>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            DPROP("a", 0),
          ]),
        ],
      },
    );
  });

  test(`~style="0"`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<div ~a="0"/>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            STYLE("a", "0"),
          ]),
        ],
      },
    );
  });

  test(`~style={0}`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<div ~a=`, `/>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            STYLE("a", 0),
          ]),
        ],
      },
    );
  });

  test(`@event={0}`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<div @a=`, `/>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            EVENT("a", 0),
          ]),
        ],
      },
    );
  });

  test(`shorthand directive syntax`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<div `, `/>`],
        TEMPLATE_TYPE_HTM,
      ),
      {
        type: TEMPLATE_TYPE_HTM,
        children: [
          E("div", [
            DIRECTIVE(0),
          ]),
        ],
      },
    );
  });
});
