import { _, getDOMNode } from "ivi";
import { div, span } from "ivi-html";
import { testRender, testRenderDOM } from "ivi-test";

describe("testRender", () => {
  test("div", () => {
    testRender(r => {
      const root = r(div(_, _, [span(), span()]));
      expect(getDOMNode(root!)).toMatchInlineSnapshot(`
<div>
  <span />
  <span />
</div>
`);
    });
  });
});

describe("testRenderDOM", () => {
  test("div", () => {
    testRenderDOM(r => {
      expect(r(div(_, _, [span(), span()]))).toMatchInlineSnapshot(`
<div>
  <span />
  <span />
</div>
`);
    });
  });
});
