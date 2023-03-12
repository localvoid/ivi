import { strictEqual } from "node:assert";
import { test } from "node:test";
import "global-jsdom/register";
import { createRoot } from "../test.js";
import { htm } from "../template.js";

test("template", () => {
  const root = createRoot();
  root.update(htm`div`);
  const node = root.findDOMNode<HTMLDivElement>()!;
  strictEqual(node.tagName, "DIV");
});
