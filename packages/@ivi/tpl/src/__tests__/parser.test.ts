import { deepStrictEqual, } from "node:assert";
import { describe, test } from "node:test";
import { parseTemplate } from "../parser.js";
import {
  INodeType, INodeText, INodeExpr, INodeElement, ITemplateType, INode,
  IProperty, IPropertyType, IPropertyAttribute, IPropertyValue, IPropertyDOMValue, IPropertyStyle, IPropertyEvent, IPropertyDirective,
} from "ivi/template/ir";

const _ = void 0;

const ATTR = (key: string, value: string | boolean | number, hoist = false): IPropertyAttribute => ({
  type: IPropertyType.Attribute,
  key,
  value,
  hoist,
});

const PROP = (key: string, value: number): IPropertyValue => ({
  type: IPropertyType.Value,
  key,
  value,
  hoist: false,
});

const DPROP = (key: string, value: number): IPropertyDOMValue => ({
  type: IPropertyType.DOMValue,
  key,
  value,
  hoist: false,
});

const STYLE = (key: string, value: number | string): IPropertyStyle => ({
  type: IPropertyType.Style,
  key,
  value,
  hoist: false,
});

const EVENT = (key: string, value: number): IPropertyEvent => ({
  type: IPropertyType.Event,
  key,
  value,
  hoist: false,
});

const DIRECTIVE = (value: number): IPropertyDirective => ({
  type: IPropertyType.Directive,
  key: null,
  value,
  hoist: false,
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

describe("@ivi/tpl/parser", () => {
  test(`a`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a`],
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

  test(`a b`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a b`],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("a", _, [E("b")]),
        ],
      },
    );
  });

  test(`a b #2`, () => {
    deepStrictEqual(
      parseTemplate(
        [`
        a
          b
        `],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("a", _, [E("b")]),
        ],
      },
    );
  });

  test(`a 'a'`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a 'a'`],
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

  test(`a 'a' #2`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `a
            'a'
        `],
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

  test(`a "a"`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a "a"`],
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

  test(`a #"a"#`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a #"a"#`],
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

  test(`a #'a'#`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a #'a'#`],
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

  test(`a ##'a'##`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a ##'a'##`],
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

  test(`a 'a' 'b'`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a 'a' 'b'`],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("a", _, [
            T("a"),
            T("b"),
          ]),
        ],
      },
    );
  });

  test(`a 'a' b 'b'`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a 'a' b 'b'`],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("a", _, [
            T("a"),
            E("b", _, [
              T("b"),
            ]),
          ]),
        ],
      },
    );
  });

  test(`a {0}`, () => {
    deepStrictEqual(
      parseTemplate(
        [`a `, ``],
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

  test(`className #1`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          div.a
          `,
        ],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("div", [
            ATTR("class", "a"),
          ]),
        ],
      },
    );
  });

  test(`className #2`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          div.a.b
          `,
        ],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("div", [
            ATTR("class", "a b"),
          ]),
        ],
      },
    );
  });

  test(`className #3`, () => {
    deepStrictEqual(
      parseTemplate(
        [
          `
          div`, `
          `,
        ],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("div", [
            ATTR("class", 0),
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
          div :a
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
          div :a="1"
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
          div :a=`, `
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
          div
           :a="1"
           :b="2"
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
          div :a="1" :b="2"
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

  test(`.prop`, () => {
    deepStrictEqual(
      parseTemplate(
        [`div .a=`, ``],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        [`div *a=`, ``],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        [`div ~a="0"`],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        [`div ~a=`, ``],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
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
        [`div @a=`, ``],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("div", [
            EVENT("a", 0),
          ]),
        ],
      },
    );
  });

  test(`directive`, () => {
    deepStrictEqual(
      parseTemplate(
        [`div $`, ``],
        ITemplateType.Htm,
        preventHoist,
      ),
      {
        type: ITemplateType.Htm,
        children: [
          E("div", [
            DIRECTIVE(0),
          ]),
        ],
      },
    );
  });
});
