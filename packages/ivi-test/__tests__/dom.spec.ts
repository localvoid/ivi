import { initDOMRenderer } from "ivi-test";
import * as h from "ivi-html";

describe("src/dom.ts", () => {
  test("div", () => {
    const r = initDOMRenderer();
    expect(r.render(h.div().c(h.span(), h.span())).getDOMInstance<HTMLDivElement>().tagName.toLowerCase())
      .toBe("div");
  });
});
