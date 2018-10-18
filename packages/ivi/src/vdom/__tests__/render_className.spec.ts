import { startRender } from "./utils";
import * as h from "ivi-html";
import * as s from "ivi-svg";

describe(`HTML`, () => {
  test(`<div>`, () => {
    startRender<HTMLElement>(r => {
      const n = r(h.div());
      expect(n.getAttributeNode("class")).toBeNull();
      expect(n.className).toBe("");
    });
  });

  test(`<div class=undefined>`, () => {
    startRender<HTMLElement>(r => {
      const n = r(h.div(undefined));
      expect(n.getAttributeNode("class")).toBeNull();
      expect(n.className).toBe("");
    });
  });

  test(`<div class="">`, () => {
    startRender<HTMLElement>(r => {
      const n = r(h.div(""));
      expect(n.getAttributeNode("class")).toBeNull();
      expect(n.className).toBe("");
    });
  });

  test(`<div class="a">`, () => {
    startRender<HTMLElement>(r => {
      const n = r(h.div("a"));
      expect(n.classList.length).toBe(1);
      expect(n.classList.contains("a")).toBe(true);
    });
  });

  test(`<div class="a b">`, () => {
    startRender<HTMLElement>(r => {
      const n = r(h.div("a b"));
      expect(n.classList.length).toBe(2);
      expect(n.classList.contains("a")).toBe(true);
      expect(n.classList.contains("b")).toBe(true);
    });
  });
});

describe(`SVG`, () => {
  test(`<circle class="a">`, () => {
    startRender<SVGElement>(r => {
      const n = r(s.circle("a"));
      expect(n.getAttribute("class")).toBe("a");
    });
  });
});
