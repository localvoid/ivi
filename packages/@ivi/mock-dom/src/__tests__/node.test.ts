import { strictEqual } from "node:assert";
import { test } from "node:test";
import "../global.js";

test("append child", () => {
  const parent = document.createElement("div");
  const a = document.createElement("span");
  parent.appendChild(a);
  strictEqual(parent.firstChild, a);
  strictEqual(parent.lastChild, a);
  strictEqual(a.parentNode, parent);
  strictEqual(a.previousSibling, null);
  strictEqual(a.nextSibling, null);
});

test("append 2 child", () => {
  const parent = document.createElement("div");
  const a = document.createElement("span");
  const b = document.createElement("span");
  parent.appendChild(a);
  parent.appendChild(b);
  strictEqual(parent.firstChild, a);
  strictEqual(parent.lastChild, b);
  strictEqual(a.parentNode, parent);
  strictEqual(b.parentNode, parent);

  strictEqual(a.previousSibling, null);
  strictEqual(a.nextSibling, b);
  strictEqual(b.previousSibling, a);
  strictEqual(b.nextSibling, null);
});

test("insertBefore before 1 node", () => {
  const parent = document.createElement("div");
  const a = document.createElement("span");
  const b = document.createElement("span");
  parent.insertBefore(a, null);
  parent.insertBefore(b, a);
  strictEqual(parent.firstChild, b);
  strictEqual(parent.lastChild, a);
  strictEqual(a.parentNode, parent);
  strictEqual(b.parentNode, parent);

  strictEqual(a.previousSibling, b);
  strictEqual(a.nextSibling, null);
  strictEqual(b.previousSibling, null);
  strictEqual(b.nextSibling, a);
});

test("insertBefore between 2 nodes", () => {
  const parent = document.createElement("div");
  const a = document.createElement("span");
  const b = document.createElement("span");
  const c = document.createElement("span");
  parent.insertBefore(a, null);
  parent.insertBefore(b, null);
  parent.insertBefore(c, b);
  strictEqual(parent.firstChild, a);
  strictEqual(parent.lastChild, b);
  strictEqual(a.parentNode, parent);
  strictEqual(b.parentNode, parent);
  strictEqual(c.parentNode, parent);

  strictEqual(a.previousSibling, null);
  strictEqual(a.nextSibling, c);
  strictEqual(b.previousSibling, c);
  strictEqual(b.nextSibling, null);
  strictEqual(c.previousSibling, a);
  strictEqual(c.nextSibling, b);
});

