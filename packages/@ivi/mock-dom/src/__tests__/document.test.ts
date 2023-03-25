import { strictEqual } from "node:assert";
import { test } from "node:test";
import "../global.js";
import { NodeType } from "../index.js";

test("createElement", () => {
  const n = document.createElement("div");
  strictEqual(n.nodeType, NodeType.Element);
  strictEqual(n.nodeName, "DIV");
  strictEqual(n.namespaceURI, "http://www.w3.org/1999/xhtml");
});

test("createElementNS", () => {
  const n = document.createElementNS("NS", "SVG");
  strictEqual(n.nodeType, NodeType.Element);
  strictEqual(n.nodeName, "SVG");
  strictEqual(n.namespaceURI, "NS");
});

test("createText", () => {
  const n = document.createTextNode("a b");
  strictEqual(n.nodeType, NodeType.Text);
  strictEqual(n.nodeValue, "a b");
});
