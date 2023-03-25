import { strictEqual } from "node:assert";
import { test } from "node:test";
import "../global.js";
import { NodeType, HTMLElement } from "../index.js";

test("<span></span>", () => {
  const e = document.createElement("div");
  e.innerHTML = "<span></span>";
  strictEqual(e.firstChild?.nodeName, "SPAN");
  strictEqual(e.lastChild, e.firstChild);
  strictEqual(e.firstChild?.previousSibling, null);
  strictEqual(e.firstChild?.nextSibling, null);
});

test("<span><a></a></span>", () => {
  const e = document.createElement("div");
  e.innerHTML = "<span><a></a></span>";
  strictEqual(e.firstChild?.nodeName, "SPAN");
  strictEqual(e.lastChild, e.firstChild);
  strictEqual(e.firstChild?.previousSibling, null);
  strictEqual(e.firstChild?.nextSibling, null);
  const root = e.firstChild;
  const a = root.firstChild;
  strictEqual(a?.nodeName, "A");
  strictEqual(a?.nextSibling, null);
  strictEqual(a?.previousSibling, null);
});

test("<span><a></a><b></b></span>", () => {
  const e = document.createElement("div");
  e.innerHTML = "<span><a></a><b></b></span>";
  strictEqual(e.firstChild?.nodeName, "SPAN");
  strictEqual(e.lastChild, e.firstChild);
  strictEqual(e.firstChild?.previousSibling, null);
  strictEqual(e.firstChild?.nextSibling, null);
  const root = e.firstChild;
  const a = root.firstChild;
  const b = root.lastChild;
  strictEqual(a?.nodeName, "A");
  strictEqual(b?.nodeName, "B");
  strictEqual(a?.nextSibling, b);
  strictEqual(b?.previousSibling, a);
});

test("<span> text </span>", () => {
  const e = document.createElement("div");
  e.innerHTML = "<span> text </span>";
  strictEqual(e.firstChild?.nodeName, "SPAN");
  strictEqual(e.lastChild, e.firstChild);
  strictEqual(e.firstChild?.previousSibling, null);
  strictEqual(e.firstChild?.nextSibling, null);
  const root = e.firstChild;
  const text = root.firstChild;
  strictEqual(text?.nodeValue, " text ");
  strictEqual(text?.nextSibling, null);
  strictEqual(text?.previousSibling, null);
});

test("<span><a></a>text<b></b></span>", () => {
  const e = document.createElement("div");
  e.innerHTML = "<span><a></a>text<b></b></span>";
  strictEqual(e.firstChild?.nodeName, "SPAN");
  strictEqual(e.lastChild, e.firstChild);
  strictEqual(e.firstChild?.previousSibling, null);
  strictEqual(e.firstChild?.nextSibling, null);
  const root = e.firstChild;
  const a = root.firstChild;
  const b = root.lastChild;
  const text = a?.nextSibling;
  strictEqual(a?.nodeName, "A");
  strictEqual(b?.nodeName, "B");
  strictEqual(a?.nextSibling, text);
  strictEqual(b?.previousSibling, text);
  strictEqual(text?.nodeValue, "text");
});

test(`<span attr="value"></span>`, () => {
  const e = document.createElement("div");
  e.innerHTML = `<span attr="value"></span>`;
  const span = e.firstChild as HTMLElement;
  strictEqual(span.getAttribute("attr"), "value");
});

test(`<span a="1" b="2"></span>`, () => {
  const e = document.createElement("div");
  e.innerHTML = `<span a="1" b="2"></span>`;
  const span = e.firstChild as HTMLElement;
  strictEqual(span.getAttribute("a"), "1");
  strictEqual(span.getAttribute("b"), "2");
});

test(`<span class="a b"></span>`, () => {
  const e = document.createElement("div");
  e.innerHTML = `<span class="a b"></span>`;
  const span = e.firstChild as HTMLElement;
  strictEqual(span.className, "a b");
  strictEqual(span.getAttribute("class"), "a b");
});

test(`<div><input><span></span></div>`, () => {
  const e = document.createElement("div");
  e.innerHTML = `<div><input><span></span></div>`;
  const root = e.firstChild;
  const a = root?.firstChild;
  const b = root?.lastChild;
  strictEqual(a?.nodeName, "INPUT");
  strictEqual(b?.nodeName, "SPAN");
  strictEqual(a?.nextSibling, b);
  strictEqual(b?.previousSibling, a);
});

test("<span><!></span>", () => {
  const e = document.createElement("div");
  e.innerHTML = "<span><!></span>";
  const root = e.firstChild;
  const a = root?.firstChild;
  strictEqual(a?.nodeType, NodeType.Comment);
  strictEqual(a?.nextSibling, null);
  strictEqual(a?.previousSibling, null);
});
