import { strictEqual, ok } from "node:assert";
import { test } from "node:test";
import "../global.js";
import { NodeType } from "../index.js";

test(`createElement("template")`, () => {
  const n = document.createElement("template");
  ok(n instanceof Template);
  ok(n.content instanceof DocumentFragment);
  strictEqual(n.nodeType, NodeType.Element);
  strictEqual(n.nodeName, "TEMPLATE");
  strictEqual(n.content.firstChild, null);
  strictEqual(n.content.lastChild, null);
});

test("innerHTML", () => {
  const n = document.createElement("template");
  ok(n instanceof Template);
  const content = n.content;
  n.innerHTML = "<a></a>";
  strictEqual(n.content, content);
  strictEqual(content.firstChild?.nodeName, "A");
});
