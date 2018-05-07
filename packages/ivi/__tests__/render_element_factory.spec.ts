import { elementFactory } from "../src/vdom/element";
import { render } from "./utils";
import * as h from "./utils/html";

test(`<div></div>`, () => {
  const e = elementFactory(h.div());
  const n = render<HTMLElement>(e());

  expect(n.tagName.toLowerCase()).toBe("div");
});

test(`predefined className: <div class="a"></div>`, () => {
  const e = elementFactory(h.div("a"));
  const n = render<HTMLElement>(e());

  expect(n.classList.length).toBe(1);
  expect(n.classList.contains("a")).toBeTruthy();
});

test(`<div class="a"></div>`, () => {
  const e = elementFactory(h.div());
  const n = render<HTMLElement>(e("a"));

  expect(n.classList.length).toBe(1);
  expect(n.classList.contains("a")).toBeTruthy();
});

test(`<div id="123"></div>`, () => {
  const e = elementFactory(h.div().a({ id: "123" }));
  const n = render<HTMLElement>(e());

  expect(n.attributes.length).toBe(1);
  expect(n.getAttribute("id")).toBe("123");
});

test(`render twice: <div id="123"></div>`, () => {
  const e = elementFactory(h.div().a({ id: "123" }));
  render(e());
  const n = render<HTMLElement>(e());

  expect(n.tagName.toLowerCase()).toBe("div");
  expect(n.attributes.length).toBe(1);
  expect(n.getAttribute("id")).toBe("123");
});
