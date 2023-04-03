import { deepStrictEqual, } from "node:assert";
import { describe, test } from "node:test";
import { parseTemplate } from "../parser.js";
import {
  INodeType, INodeText, INodeExpr, INodeElement, ITemplateType, INode,
  IProperty, IPropertyType, IPropertyAttribute,
} from "ivi/template/ir";

const _ = void 0;

const ATTR = (key: string, value: string | boolean | number, hoist = false): IPropertyAttribute => ({
  type: IPropertyType.Attribute,
  key,
  value,
  hoist,
});

const E = (tag: string, properties: IProperty[] = [], children: INode[] = []): INodeElement => ({
  type: INodeType.Element,
  tag,
  properties,
  children,
});

const T = (value: string): INodeText => ({
  type: INodeType.Text,
  value,
});

const X = (value: number): INodeExpr => ({
  type: INodeType.Expr,
  value,
});

const preventHoist = () => false;

describe("@ivi/htm/parser", () => {
  test(`<a/>`, () => {
    deepStrictEqual(
      parseTemplate(
        [`<a/>`],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("a", _, [
            X(0),
          ]),
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("div", _, [
            T("a"),
            E("a", _, [T("b")]),
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("div", [
            ATTR("a", "1"),
            ATTR("b", "2"),
          ]),
        ],
      },
    );
  });
});
