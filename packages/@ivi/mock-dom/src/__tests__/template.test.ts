import { strictEqual, ok, deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { NodeType } from "../index.js";
import { reset, trace } from "../global.js";

describe("mock-dom/template", () => {
  beforeEach(reset);

  test(`createElement("template")`, () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElement("template");
        ok(n instanceof Template);
        ok(n.content instanceof DocumentFragment);
        strictEqual(n.nodeType, NodeType.Element);
        strictEqual(n.nodeName, "TEMPLATE");
        strictEqual(n.content.firstChild, null);
        strictEqual(n.content.lastChild, null);
      }),
      [
        `createElement("template") => 2`,
        `[2] Template.content`,
        `[2] Node.nodeType`,
        `[2] Node.nodeName`,
        `[2] Template.content`,
        `[3] Node.firstChild`,
        `[2] Template.content`,
        `[3] Node.lastChild`,
      ],
    );
  });

  test("template.innerHTML", () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElement("template");
        ok(n instanceof Template);
        const content = n.content;
        n.innerHTML = "<a></a>";
        strictEqual(n.content, content);
        strictEqual(content.firstChild?.nodeName, "A");
      }),
      [
        `createElement("template") => 2`,
        `[2] Template.content`,
        `[2] Template.innerHTML = "<a></a>"`,
        `[2] Element.namespaceURI`,
        `[2] Template.content`,
        `[3] Node.firstChild`,
        `[5] Node.nodeName`,
      ],
    );
  });
});
