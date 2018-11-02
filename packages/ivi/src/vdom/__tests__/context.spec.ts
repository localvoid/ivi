import { t, component, useSelect, context } from "ivi";
import { startRender, Static } from "./utils";

const ContextTestPrinter = component((h) => {
  const selector = useSelect<string, undefined, { value: string }>(h, (props, ctx) => ctx.value);
  return () => t(selector());
});

test(`<Context={ value: 10 }<Connector>{ ctx.value }</Connector></Context>`, () => {
  startRender(r => {
    const v = (
      context({ value: 10 },
        ContextTestPrinter(),
      )
    );
    const n = r(v);

    expect(n.nodeValue).toBe("10");
  });
});

test(`Sync context value`, () => {
  startRender(r => {
    const v1 = (
      context({ value: 10 },
        ContextTestPrinter(),
      )
    );
    const v2 = (
      context({ value: 20 },
        ContextTestPrinter(),
      )
    );
    r(v1);
    const b = r(v2);

    expect(b.nodeValue).toBe("20");
  });
});

test(`Sync context value inside component with shouldUpdate=false`, () => {
  startRender(r => {
    const v1 = (
      context({ value: 10 },
        Static(
          ContextTestPrinter(),
        ),
      )
    );
    const v2 = (
      context({ value: 20 },
        Static(
          ContextTestPrinter(),
        ),
      )
    );
    r(v1);
    const b = r(v2);

    expect(b.nodeValue).toBe("20");
  });
});
