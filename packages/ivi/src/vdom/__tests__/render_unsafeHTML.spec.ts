import { UNSAFE_HTML, _ } from "ivi";
import * as h from "ivi-html";
import { testRenderDOM } from "ivi-test";

test(`<div unsafeHTML="<span>abc</span>"></div>`, () => {
  testRenderDOM<HTMLElement>(r => {
    const v = h.div(_, { unsafeHTML: UNSAFE_HTML("<span>abc</span>") });
    const n = r(v);

    expect(n).toMatchInlineSnapshot(`
<div>
  <span>
    abc
  </span>
</div>
`);
  });
});
