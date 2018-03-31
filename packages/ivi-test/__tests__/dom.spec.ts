import * as h from "ivi-html";
import { initDOMRenderer } from "../src/dom";
import { expect } from "iko";

describe("src/dom.ts", () => {
  it("div", () => {
    const r = initDOMRenderer();
    expect(r.render(h.div().c(h.span(), h.span())).getDOMInstance<HTMLDivElement>().tagName.toLowerCase())
      .toBe("div");
  });
});
