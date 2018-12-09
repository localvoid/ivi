import { _, component, useSelect, Context, context } from "ivi";
import { testRenderDOM } from "ivi-test";
import { Static } from "./utils";

const ContextValue = component(c => {
  const selector = useSelect<string>(c, () => context<{ value: string }>().value);
  return () => selector();
});

test(`context value should be propagated`, () => {
  testRenderDOM(r => {
    const v = Context({ value: 10 }, ContextValue());
    const n = r(v);

    expect(n).toMatchInlineSnapshot(`10`);
  });
});

test(`context value should be updated`, () => {
  testRenderDOM(r => {
    const v1 = Context({ value: 10 }, ContextValue());
    const v2 = Context({ value: 20 }, ContextValue());
    r(v1);
    const b = r(v2);

    expect(b).toMatchInlineSnapshot(`20`);
  });
});

test(`context value should be updated through static components`, () => {
  testRenderDOM(r => {
    const v1 = Context({ value: 10 }, Static(ContextValue()));
    const v2 = Context({ value: 20 }, Static(ContextValue()));
    r(v1);
    const b = r(v2);

    expect(b).toMatchInlineSnapshot(`20`);
  });
});
