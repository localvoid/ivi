import { ok, strictEqual } from "node:assert";
import { test } from "node:test";
import "../global.js";
import { NodeType } from "../index.js";

test("createElement", () => {
  const n = document.createElement("div");
  ok(n instanceof HTMLElement);
  strictEqual(n.nodeType, NodeType.Element);
  strictEqual(n.nodeName, "DIV");
  strictEqual(n.namespaceURI, "http://www.w3.org/1999/xhtml");
});

test("createElementNS", () => {
  const n = document.createElementNS("NS", "SVG");
  ok(n instanceof Element);
  strictEqual(n.nodeType, NodeType.Element);
  strictEqual(n.nodeName, "SVG");
  strictEqual(n.namespaceURI, "NS");
});

test("createText", () => {
  const n = document.createTextNode("a b");
  strictEqual(n.nodeType, NodeType.Text);
  strictEqual(n.nodeValue, "a b");
});

test("createElementNS(svg)", () => {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "a");
  ok(n instanceof SVGElement);
});
