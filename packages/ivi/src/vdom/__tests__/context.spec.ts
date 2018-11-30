import { _, component, useSelect, Context } from "ivi";
import { div } from "ivi-html";
import { testRenderDOM } from "ivi-test";
import { Static } from "./utils";

const ContextTestPrinter = component(h => {
  const selector = useSelect<string, undefined, { value: string }>(
    h,
    (props, ctx) => ctx.value
  );
  return () => div(_, _, selector());
});

test(`<Context={ value: 10 }<Connector>{ ctx.value }</Connector></Context>`, () => {
  testRenderDOM(r => {
    const v = Context({ value: 10 }, ContextTestPrinter());
    const n = r(v);

    expect(n).toMatchInlineSnapshot(`
<div>
  10
</div>
`);
  });
});

test(`Sync context value`, () => {
  testRenderDOM(r => {
    const v1 = Context({ value: 10 }, ContextTestPrinter());
    const v2 = Context({ value: 20 }, ContextTestPrinter());
    r(v1);
    const b = r(v2);

    expect(b).toMatchInlineSnapshot(`
<div>
  20
</div>
`);
  });
});

test(`Sync context value inside component with shouldUpdate=false`, () => {
  testRenderDOM(r => {
    const v1 = Context({ value: 10 }, Static(ContextTestPrinter()));
    const v2 = Context({ value: 20 }, Static(ContextTestPrinter()));
    r(v1);
    const b = r(v2);

    expect(b).toMatchInlineSnapshot(`
<div>
  20
</div>
`);
  });
});
