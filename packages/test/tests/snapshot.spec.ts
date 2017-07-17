import { createSnapshotRenderer } from "../src/snapshot";
import * as h from "ivi-html";
import { expect } from "chai";

describe("renderToString", () => {
  const render = createSnapshotRenderer();

  it("'abc'", () => {
    expect(render(h.t("abc"))).to.equal("\nabc\n");
  });

  it("<div>", () => {
    expect(render(h.div())).to.equal("\n<div />\n");
  });
});
