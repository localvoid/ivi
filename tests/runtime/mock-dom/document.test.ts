import { deepStrictEqual, ok, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "bun:test";
import { NodeType } from "@ivi/mock-dom";
import { reset, trace } from "@ivi/mock-dom/global";

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
        `[2] Node.nodeType => 1`,
        `[2] Node.nodeName => "DIV"`,
        `[2] Element.namespaceURI => "http://www.w3.org/1999/xhtml"`,
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
        `[2] Node.nodeType => 1`,
        `[2] Node.nodeName => "TAGNAME"`,
        `[2] Element.namespaceURI => "NS"`,
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
        `[2] Node.nodeType => 3`,
        `[2] Node.nodeValue => "a b"`,
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
