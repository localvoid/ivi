import { t, component, connect, context } from "ivi";
import { startRender, Static } from "./utils";

const ContextTestPrinterConnector = connect<{ value: string }, undefined, { value: string }>(
  (prev, props, ctx) => ({ value: ctx.value }),
  component<{ value: string }>(({ value }) => t(value)),
);

test(`<Context={ value: 10 }<Connector>{ ctx.value }</Connector></Context>`, () => {
  startRender(r => {
    const v = (
      context({ value: 10 },
        ContextTestPrinterConnector(),
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
        ContextTestPrinterConnector(),
      )
    );
    const v2 = (
      context({ value: 20 },
        ContextTestPrinterConnector(),
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
          ContextTestPrinterConnector(),
        ),
      )
    );
    const v2 = (
      context({ value: 20 },
        Static(
          ContextTestPrinterConnector(),
        ),
      )
    );
    r(v1);
    const b = r(v2);

    expect(b.nodeValue).toBe("20");
  });
});
