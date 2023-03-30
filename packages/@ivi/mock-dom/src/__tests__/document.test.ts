import { deepStrictEqual, ok, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { NodeType } from "../index.js";
import { reset, trace } from "../global.js";

describe("mock-dom/document", () => {
  beforeEach(reset);

  test("createElement", () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElement("div");
        ok(n instanceof HTMLElement);
        strictEqual(n.nodeType, NodeType.Element);
        strictEqual(n.nodeName, "DIV");
        strictEqual(n.namespaceURI, "http://www.w3.org/1999/xhtml");
      }),
      [
        `createElement("div") => 2`,
        `[2] Node.nodeType`,
        `[2] Node.nodeName`,
        `[2] Element.namespaceURI`,
      ],
    );
  });

  test("createElementNS", () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElementNS("NS", "tagName");
        ok(n instanceof Element);
        strictEqual(n.nodeType, NodeType.Element);
        strictEqual(n.nodeName, "TAGNAME");
        strictEqual(n.namespaceURI, "NS");
      }),
      [
        `createElementNS("NS", "tagName") => 2`,
        `[2] Node.nodeType`,
        `[2] Node.nodeName`,
        `[2] Element.namespaceURI`,
      ],
    );
  });

  test("createText", () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createTextNode("a b");
        strictEqual(n.nodeType, NodeType.Text);
        strictEqual(n.nodeValue, "a b");
      }),
      [
        `createTextNode("a b") => 2`,
        `[2] Node.nodeType`,
        `[2] Node.nodeValue`,
      ],
    );
  });

  test(`createElementNS("http://www.w3.org/2000/svg", "a")`, () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElementNS("http://www.w3.org/2000/svg", "a");
        ok(n instanceof SVGElement);
      }),
      [
        `createElementNS("http://www.w3.org/2000/svg", "a") => 2`
      ],
    );
  });
});
