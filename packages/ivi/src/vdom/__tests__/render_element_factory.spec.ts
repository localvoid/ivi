import { elementProto, _ } from "ivi";
import * as h from "ivi-html";
import { testRenderDOM } from "ivi-test";

test(`<div></div>`, () => {
  testRenderDOM<HTMLElement>(r => {
    const e = elementProto(h.div());
    const n = r(e());

    expect(n).toMatchInlineSnapshot(`<div />`);
  });
});

test(`predefined className: <div class="a"></div>`, () => {
  testRenderDOM<HTMLElement>(r => {
    const e = elementProto(h.div("a"));
    const n = r(e());

    expect(n).toMatchInlineSnapshot(`
<div
  class="a"
/>
`);
  });
});

test(`<div class="a"></div>`, () => {
  testRenderDOM<HTMLElement>(r => {
    const e = elementProto(h.div());
    const n = r(e("a"));

    expect(n).toMatchInlineSnapshot(`
<div
  class="a"
/>
`);
  });
});

test(`<div id="123"></div>`, () => {
  testRenderDOM<HTMLElement>(r => {
    const e = elementProto(h.div(_, { id: "123" }));
    const n = r(e());

    expect(n).toMatchInlineSnapshot(`
<div
  id="123"
/>
`);
  });
});

test(`render twice: <div id="123"></div>`, () => {
  testRenderDOM<HTMLElement>(r => {
    const e = elementProto(h.div(_, { id: "123" }));
    r(e());
    const n = r(e());

    expect(n).toMatchInlineSnapshot(`
<div
  id="123"
/>
`);
  });
});
