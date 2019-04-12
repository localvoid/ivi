import { _, component } from "ivi";
import { div } from "ivi-html";
import { portal } from "ivi-portal";
import { testRenderDOM } from "ivi-test";

test(`portal`, () => {
  testRenderDOM(r => {
    const P = portal();
    const C = component(c => {
      return () => P.entry(div(_, _, 1));
    });
    const n = r([div("portal", _, P.root), C()]);

    expect(n).toMatchInlineSnapshot(`
<div
  class="portal"
>
  <div>
    1
  </div>
</div>
`);
  });
});
