import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { escapeHTMLAttribute, escapeHTMLText } from "../escape.js";

describe("escapeHTML", () => {
  test("attribute", () => {
    strictEqual(escapeHTMLAttribute(`a"b&c<>'`), `a&quot;b&amp;c<>'`);
  });

  test("text", () => {
    strictEqual(escapeHTMLText(`a"b&c<>'`), `a"b&amp;c&lt;>'`);
  });
});
