import * as h from "ivi-html";
import * as s from "ivi-svg";
import { startRender } from "./utils";

describe(`HTML`, () => {
  test(`<div style=null>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div().s(null));
      expect(n.style.cssText).toBe("");
    });
  });

  test(`<div style={ top: undefined }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div().s({ top: undefined }));
      expect(n.style.cssText).toBe("");
    });
  });

  test(`<div style={ top: "10px" }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div().s({ top: "10px" }));
      expect(n.style.top).toBe("10px");
    });
  });

  test(`<div style={ float: "left" }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div().s({ float: "left" }));
      expect(n.style.cssFloat).toBe("left");
    });
  });

  test(`<div style={top: "10px"; left: "20px" }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div().s({ top: "10px", left: "20px" }));
      expect(n.style.top).toBe("10px");
      expect(n.style.left).toBe("20px");
    });
  });
});

describe(`SVG`, () => {
  test(`<circle style={top: 10px}>`, () => {
    startRender<SVGCircleElement>((r) => {
      const n = r(s.circle().s({ top: "10px" }));
      expect(n.style.top).toBe("10px");
    });
  });
});
