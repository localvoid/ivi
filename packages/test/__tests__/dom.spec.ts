import * as h from "ivi-html";
import { initDOMRenderer } from "../src/dom";
import { expect } from "iko";

describe("dom", () => {
  it("div", () => {
    const r = initDOMRenderer();
    expect(r.render(h.div().children(h.span(), h.span())).getDOMInstance<HTMLDivElement>().tagName.toLowerCase())
      .toBeEqual("div");
  });
});
