import { deepStrictEqual } from "node:assert";
import { describe, test } from "node:test";
import { compileTemplate } from "../server.js";
import {
  type INode, type INodeElement, type INodeExpr, type INodeText, type IProperty,
  type IPropertyAttribute, type IPropertyDOMValue, type IPropertyValue,
  type ITemplate, type IPropertyStyle, type IPropertyDirective,
  INodeType, IPropertyType, ITemplateType, IDirectiveType,
} from "../ir.js";
import { TFlags, TNode } from "../../server/template.js";

const _ = void 0;

const c = (tpl: ITemplate) => compileTemplate(tpl);

const r = (roots: TNode[], exprs: number[] = []) => ({ roots, exprs });

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

const dprop = (key: string, value: number): IPropertyDOMValue => ({
  type: IPropertyType.DOMValue,
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

const dir = (value: number, ssr?: boolean): IPropertyDirective => ({
  type: IPropertyType.Directive,
  key: ssr ? IDirectiveType.Server : IDirectiveType.Client,
  value,
  hoist: false,
});

describe("server compiler", () => {
  test(`<div/>`, () => {
    deepStrictEqual(
      c(h([
        el("div"),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ]),
    );
  });

  test(`<div>a</div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", _, [
          text("a"),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: [
            "a",
          ],
          directives: null,
        },
      ]),
    );
  });

  test(`<div>{0}</div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", _, [
          expr(0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: [
            0,
          ],
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div>{0}a</div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", _, [
          expr(0),
          text("a"),
        ]),
      ])),
      r([
        {
          flags: TFlags.GenerateOffsets,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: [
            0,
            "a",
          ],
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div>a{0}</div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", _, [
          text("a"),
          expr(0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: [
            "a",
            0,
          ],
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div><p></p>{0}</div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", _, [
          el("p"),
          expr(0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: [
            {
              flags: 0,
              prefix: `<p`,
              suffix: `</p>`,
              props: null,
              style: null,
              children: null,
              directives: null,
            },
            0,
          ],
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div><p>{0}</p>{1}</div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", _, [
          el("p", _, [
            expr(0),
          ]),
          expr(1),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: [
            {
              flags: 0,
              prefix: `<p`,
              suffix: `</p>`,
              props: null,
              style: null,
              children: [
                0,
              ],
              directives: null,
            },
            1,
          ],
          directives: null,
        },
      ], [0, 1]),
    );
  });

  test(`<div>{0}<p>{1}</p></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", _, [
          expr(0),
          el("p", _, [
            expr(1),
          ]),
        ]),
      ])),
      r([
        {
          flags: TFlags.GenerateOffsets,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: [
            0,
            {
              flags: 0,
              prefix: `<p`,
              suffix: `</p>`,
              props: null,
              style: null,
              children: [
                1,
              ],
              directives: null,
            },
          ],
          directives: null,
        },
      ], [0, 1]),
    );
  });

  test(`<div a="1"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", "1"),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div a="1"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ]),
    );
  });

  test(`<div a></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", true),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div a`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ]),
    );
  });

  test(`<div a="1" b="2"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", "1"),
          attr("b", "2"),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div a="1" b="2"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ]),
    );
  });

  test(`<div a={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: [
            { prefix: ` a`, flags: 0, i: 0 },
          ],
          style: null,
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div a="1" b={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", "1"),
          attr("b", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div a="1"`,
          suffix: `</div>`,
          props: [
            { prefix: ` b`, flags: 0, i: 0 },
          ],
          style: null,
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div a={0} b="1"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", 0),
          attr("b", "1"),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div b="1"`,
          suffix: `</div>`,
          props: [
            { prefix: ` a`, flags: 0, i: 0 },
          ],
          style: null,
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div a={0} b={1}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", 0),
          attr("b", 1),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: [
            { prefix: ` a`, flags: 0, i: 0 },
            { prefix: ` b`, flags: 0, i: 1 },
          ],
          style: null,
          children: null,
          directives: null,
        },
      ], [0, 1]),
    );
  });

  test(`<div .a={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          prop("a", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ]),
    );
  });

  test(`<div .a={0} .b={1}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          prop("a", 0),
          prop("b", 1),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ]),
    );
  });

  test(`<div ~top="10px"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("top", "10px"),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div style="top:10px;"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ]),
    );
  });

  test(`<div ~top="10px" ~left="20px"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("top", "10px"),
          styl("left", "20px"),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div style="top:10px;left:20px;"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ]),
    );
  });

  test(`<div ~top="10px" style="margin:0" ~left="20px"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("top", "10px"),
          attr("style", "margin:0"),
          styl("left", "20px"),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div style="top:10px;margin:0;left:20px;"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ]),
    );
  });

  test(`<div ~top={0} ~left="20px"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("top", 0),
          styl("left", "20px"),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: {
            stat: `left:20px;`,
            dyn: [
              { prefix: `top:`, flags: 0, i: 0 },
            ],
          },
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div ~left="20px" ~top={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("left", "20px"),
          styl("top", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: {
            stat: `left:20px;`,
            dyn: [
              { prefix: `top:`, flags: 0, i: 0 },
            ],
          },
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div ~left={0} ~top={1}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("left", 0),
          styl("top", 1),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: {
            stat: "",
            dyn: [
              { prefix: `left:`, flags: 0, i: 0 },
              { prefix: `top:`, flags: 0, i: 1 },
            ],
          },
          children: null,
          directives: null,
        },
      ], [0, 1]),
    );
  });

  test(`<div ~top={0} style="margin:0" ~left="20px"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("top", 0),
          attr("style", "margin:0"),
          styl("left", "20px"),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: {
            stat: `margin:0;left:20px;`,
            dyn: [{ prefix: `top:`, flags: 0, i: 0 }],
          },
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div ~left="20px" style="margin:0" ~top={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("left", "20px"),
          attr("style", "margin:0"),
          styl("top", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: {
            stat: `left:20px;margin:0;`,
            dyn: [{ prefix: `top:`, flags: 0, i: 0 }]
          },
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<input .value={0}>`, () => {
    deepStrictEqual(
      c(h([
        el("input", [
          prop("value", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<input`,
          suffix: ``,
          props: [
            { flags: TFlags.IgnoreEmptyString, prefix: ` value`, i: 0 },
          ],
          style: null,
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<input *value={0}>`, () => {
    deepStrictEqual(
      c(h([
        el("input", [
          dprop("value", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<input`,
          suffix: ``,
          props: [
            { flags: TFlags.IgnoreEmptyString, prefix: ` value`, i: 0 },
          ],
          style: null,
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<input *checked={0}>`, () => {
    deepStrictEqual(
      c(h([
        el("input", [
          dprop("checked", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<input`,
          suffix: ``,
          props: [
            { prefix: ` checked`, flags: 0, i: 0 },
          ],
          style: null,
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<textarea .value={0}></textarea>`, () => {
    deepStrictEqual(
      c(h([
        el("textarea", [
          prop("value", 0),
        ]),
      ])),
      r([
        {
          flags: TFlags.EscapeInnerHTML,
          prefix: `<textarea`,
          suffix: `</textarea>`,
          props: null,
          style: null,
          children: 0,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<textarea *value={0}></textarea>`, () => {
    deepStrictEqual(
      c(h([
        el("textarea", [
          dprop("value", 0),
        ]),
      ])),
      r([
        {
          flags: TFlags.EscapeInnerHTML,
          prefix: `<textarea`,
          suffix: `</textarea>`,
          props: null,
          style: null,
          children: 0,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<option .selected={0}></textarea>`, () => {
    deepStrictEqual(
      c(h([
        el("option", [
          prop("selected", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<option`,
          suffix: `</option>`,
          props: [
            { prefix: ` selected`, flags: 0, i: 0 },
          ],
          style: null,
          children: null,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div .textContent={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          prop("textContent", 0),
        ]),
      ])),
      r([
        {
          flags: TFlags.EscapeInnerHTML,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: 0,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div .innerHTML={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          prop("innerHTML", 0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: 0,
          directives: null,
        },
      ], [0]),
    );
  });

  test(`<div {0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          dir(0),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: null,
        },
      ], []),
    );
  });

  test(`<div &:ssr={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          dir(0, true),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: [0],
        },
      ], [0]),
    );
  });

  test(`<div &:ssr={0} &:ssr={1}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          dir(0, true),
          dir(1, true),
        ]),
      ])),
      r([
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
          directives: [0, 1],
        },
      ], [0, 1]),
    );
  });
});
