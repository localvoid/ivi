import { _ } from "ivi";
import { div, span } from "ivi-html";
import { createDOMRenderer } from "ivi-test";

const r = createDOMRenderer();

beforeEach(r.reset);

describe("src/dom.ts", () => {
  test("div", () => {
    expect(r.render(div(_, _, [span(), span()]))).toMatchInlineSnapshot(`
<div
  id="ivi-test-container"
>
  <div>
    <span />
    <span />
  </div>
</div>
`);
  });
});
