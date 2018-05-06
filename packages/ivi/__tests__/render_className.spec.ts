import { render } from "./utils";
import * as h from "./utils/html";
import * as s from "./utils/svg";

describe(`HTML`, () => {
  test(`<div>`, () => {
    const n = render<HTMLElement>(h.div());
    expect(n.getAttributeNode("class")).toBeNull();
    expect(n.className).toBe("");
  });

  test(`<div class=undefined>`, () => {
    const n = render<HTMLElement>(h.div(undefined));
    expect(n.getAttributeNode("class")).toBeNull();
    expect(n.className).toBe("");
  });

  test(`<div class="">`, () => {
    const n = render<HTMLElement>(h.div(""));
    expect(n.getAttributeNode("class")).not.toBeNull();
    expect(n.className).toBe("");
  });

  test(`<div class="a">`, () => {
    const n = render<HTMLElement>(h.div("a"));
    expect(n.classList.length).toBe(1);
    expect(n.classList.contains("a")).toBe(true);
  });

  test(`<div class="a b">`, () => {
    const n = render<HTMLElement>(h.div("a b"));
    expect(n.classList.length).toBe(2);
    expect(n.classList.contains("a")).toBe(true);
    expect(n.classList.contains("b")).toBe(true);
  });
});

describe(`SVG`, () => {
  test(`<circle class="a">`, () => {
    const n = render<SVGCircleElement>(s.circle("a"));
    expect(n.getAttribute("class")).toBe("a");
  });
});
