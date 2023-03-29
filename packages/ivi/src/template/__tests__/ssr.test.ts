import { deepStrictEqual } from "node:assert";
import { describe, test } from "node:test";
import { compileTemplate } from "../ssr.js";
import {
  type INode, type INodeElement, type INodeExpr, type INodeText, type IProperty,
  type IPropertyAttribute, type IPropertyDOMValue, type IPropertyValue,
  type ITemplate, type IPropertyStyle,
  INodeType, IPropertyType, ITemplateType,
} from "../ir.js";
import { TFlags } from "../../ssr.js";

const _ = void 0;

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
  static: false,
});

const prop = (key: string, value: number): IPropertyValue => ({
  type: IPropertyType.Value,
  key,
  value,
  static: false,
});

const dprop = (key: string, value: number): IPropertyDOMValue => ({
  type: IPropertyType.DOMValue,
  key,
  value,
  static: false,
});

const styl = (key: string, value: string | number): IPropertyStyle => ({
  type: IPropertyType.Style,
  key,
  value,
  static: false,
});

describe("ssr compiler", () => {
  test(`<div/>`, () => {
    deepStrictEqual(
      c(h([
        el("div"),
      ])),
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
        },
      ],
    );
  });

  test(`<div>a</div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", _, [
          text("a"),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: [
            "a",
          ],
        },
      ],
    );
  });

  test(`<div>{0}</div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", _, [
          expr(0),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: [
            0,
          ],
        },
      ],
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
      [
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
        },
      ],
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
      [
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
        },
      ],
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
      [
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
            },
            0,
          ],
        },
      ],
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
      [
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
            },
            1,
          ],
        },
      ],
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
      [
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
            },
          ],
        },
      ],
    );
  });


  test(`<div a="1"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", "1"),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<div a="1"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
        },
      ],
    );
  });

  test(`<div a></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", true),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<div a`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div a="1" b="2"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
        },
      ],
    );
  });

  test(`<div a={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          attr("a", 0),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: [
            { prefix: ` a="`, i: 0 },
          ],
          style: null,
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div a="1"`,
          suffix: `</div>`,
          props: [
            { prefix: ` b="`, i: 0 },
          ],
          style: null,
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div b="1"`,
          suffix: `</div>`,
          props: [
            { prefix: ` a="`, i: 0 },
          ],
          style: null,
          children: null,
        },
      ],
    );
  });

  test(`<div .a={0}></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          prop("a", 0),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
        },
      ],
    );
  });

  test(`<div ~top="10px"></div>`, () => {
    deepStrictEqual(
      c(h([
        el("div", [
          styl("top", "10px"),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<div style="top:10px"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div style="top:10px;left:20px"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div style="top:10px;margin:0;left:20px"`,
          suffix: `</div>`,
          props: null,
          style: null,
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: {
            prefix: ` style="left:20px`,
            dynamic: [{
              prefix: ";top:", i: 0,
            }],
          },
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: {
            prefix: ` style="left:20px`,
            dynamic: [{
              prefix: ";top:", i: 0,
            }],
          },
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: {
            prefix: ` style="margin:0;left:20px`,
            dynamic: [{
              prefix: ";top:", i: 0,
            }],
          },
          children: null,
        },
      ],
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
      [
        {
          flags: 0,
          prefix: `<div`,
          suffix: `</div>`,
          props: null,
          style: {
            prefix: ` style="left:20px;margin:0`,
            dynamic: [{
              prefix: ";top:", i: 0,
            }],
          },
          children: null,
        },
      ],
    );
  });

  test(`<input .value={0}>`, () => {
    deepStrictEqual(
      c(h([
        el("input", [
          prop("value", 0),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<input`,
          suffix: ``,
          props: [
            { prefix: ` value="`, i: 0 },
          ],
          style: null,
          children: null,
        },
      ],
    );
  });

  test(`<input *value={0}>`, () => {
    deepStrictEqual(
      c(h([
        el("input", [
          dprop("value", 0),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<input`,
          suffix: ``,
          props: [
            { prefix: ` value="`, i: 0 },
          ],
          style: null,
          children: null,
        },
      ],
    );
  });

  test(`<input *checked={0}>`, () => {
    deepStrictEqual(
      c(h([
        el("input", [
          dprop("checked", 0),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<input`,
          suffix: ``,
          props: [
            { prefix: ` checked="`, i: 0 },
          ],
          style: null,
          children: null,
        },
      ],
    );
  });

  test(`<textarea *value={0}></textarea>`, () => {
    deepStrictEqual(
      c(h([
        el("textarea", [
          dprop("value", 0),
        ]),
      ])),
      [
        {
          flags: 0,
          prefix: `<textarea`,
          suffix: `</textarea>`,
          props: [
            { prefix: ` value="`, i: 0 },
          ],
          style: null,
          children: null,
        },
      ],
    );
  });
});
