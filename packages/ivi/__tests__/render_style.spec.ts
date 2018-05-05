import { render } from "./utils";
import * as h from "./utils/html";
import * as s from "./utils/svg";

describe(`HTML`, () => {
  test(`<div style=null>`, () => {
    const n = render<HTMLElement>(h.div().s(null));
    expect(n.style.cssText).toBe("");
  });

  test(`<div style={ top: "10px" }>`, () => {
    const n = render<HTMLElement>(h.div().s({ top: "10px" }));
    expect(n.style.top).toBe("10px");
  });

  test(`<div style={ float: "left" }>`, () => {
    const n = render<HTMLElement>(h.div().s({ float: "left" }));
    expect(n.style.cssFloat).toBe("left");
  });

  test(`<div style={top: "10px"; left: "20px" }>`, () => {
    const n = render<HTMLElement>(h.div().s({ top: "10px", left: "20px" }));
    expect(n.style.top).toBe("10px");
    expect(n.style.left).toBe("20px");
  });
});

describe(`SVG`, () => {
  test("<circle style={top: 10px}>", () => {
    const n = render<SVGCircleElement>(s.circle().s({ top: "10px" }));
    expect(n.style.top).toBe("10px");
  });
});
