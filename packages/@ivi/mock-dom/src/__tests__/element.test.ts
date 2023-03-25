import { ok, strictEqual } from "node:assert";
import { test } from "node:test";
import "../global.js";

test("attributes", () => {
  const n = document.createElement("div");
  strictEqual(n.getAttribute("a"), null);
  n.setAttribute("a", "1");
  strictEqual(n.getAttribute("a"), "1");
  n.setAttribute("b", "2");
  strictEqual(n.getAttribute("b"), "2");
});

test("className", () => {
  const n = document.createElement("div");
  strictEqual(n.className, "");
  n.className = "a b";
  strictEqual(n.className, "a b");
  strictEqual(n.getAttribute("class"), "a b");
});

test("style", () => {
  const n = document.createElement("div");
  const style = n.style;
  ok(style instanceof CSSStyleDeclaration);
  strictEqual(style.getPropertyValue("a"), "");
  style.setProperty("a", "1");
  strictEqual(style.getPropertyValue("a"), "1");
  style.setProperty("b", "2");
  strictEqual(style.getPropertyValue("b"), "2");
  style.removeProperty("a");
  strictEqual(style.getPropertyValue("a"), "");
});

test("events", () => {
  const n = document.createElement("div");
  let i = 0;
  const l = () => {
    i++;
  };
  n.addEventListener("test", l);
  n.dispatchEvent("test");
  strictEqual(i, 1);
  n.dispatchEvent("test");
  strictEqual(i, 2);
  n.removeEventListener("test", l);
  n.dispatchEvent("test");
  strictEqual(i, 2);
});

test("properties", () => {
  const n = document.createElement("div") as any;
  strictEqual(n["a"], void 0);
  (n as any)["a"] = 123;
  strictEqual(n["a"], 123);
});
