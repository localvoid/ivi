import { _ } from "ivi";
import * as h from "ivi-html";
import * as s from "ivi-svg";
import { testRenderDOM } from "ivi-test";

describe(`HTML`, () => {
  test(`<div style=undefined>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { style: void 0 }))!;
      expect(n.style.cssText).toBe("");
    });
  });

  test(`<div style={ top: undefined }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { style: { top: void 0 } }))!;
      expect(n.style.cssText).toBe("");
    });
  });

  test(`<div style={ top: "10px" }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { style: { top: "10px" } }))!;
      expect(n.style.top).toBe("10px");
    });
  });

  test(`<div style={ float: "left" }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { style: { float: "left" } }))!;
      expect(n.style.cssFloat).toBe("left");
    });
  });

  test(`<div style={top: "10px"; left: "20px" }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { style: { top: "10px", left: "20px" } }))!;
      expect(n.style.top).toBe("10px");
      expect(n.style.left).toBe("20px");
    });
  });
});

describe(`SVG`, () => {
  test(`<circle style={top: 10px}>`, () => {
    testRenderDOM<SVGCircleElement>(r => {
      const n = r(s.circle("", { style: { top: "10px" } }))!;
      expect(n.style.top).toBe("10px");
    });
  });
});
