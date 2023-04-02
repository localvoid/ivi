import { deepStrictEqual, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { type Component, component, getProps } from "ivi";

describe("text", () => {
  beforeEach(reset);

  test(`() => null`, () => {
    let _create = 0;
    let _render = 0;
    const t = component(() => {
      _create++;
      return () => {
        _render++;
        return null;
      };
    });
    strictEqual(_create, 0);
    strictEqual(_render, 0);

    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          t(),
        );
      }),
      [
      ],
    );
    strictEqual(_create, 1);
    strictEqual(_render, 1);
  });

  test(`() => 1`, () => {
    let _create = 0;
    let _render = 0;
    const t = component(() => {
      _create++;
      return () => {
        _render++;
        return 1;
      };
    });
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          t(),
        );
      }),
      [
        `createTextNode(1) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
    strictEqual(_create, 1);
    strictEqual(_render, 1);
  });

  test(`({ a: 1 }) => a`, () => {
    let _create = 0;
    let _render = 0;
    const t = component<{ a: number; }>(() => {
      _create++;
      return ({ a }) => {
        _render++;
        return a;
      };
    });
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          t({ a: 1 }),
        );
      }),
      [
        `createTextNode(1) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
    strictEqual(_create, 1);
    strictEqual(_render, 1);
  });

  test(`update #1`, () => {
    let _create = 0;
    let _render = 0;
    const t = component<{ a: number; }>(() => {
      _create++;
      return ({ a }) => {
        _render++;
        return a;
      };
    });
    const root = createRoot();
    root.update(
      t({ a: 1 }),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          t({ a: 2 }),
        );
      }),
      [
        `[2] Node.nodeValue = 2`,
      ],
    );
    strictEqual(_create, 1);
    strictEqual(_render, 2);
  });

  test(`unmount #1`, () => {
    let _create = 0;
    let _render = 0;
    const t = component(() => {
      _create++;
      return () => {
        _render++;
        return 1;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          null,
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );
    strictEqual(_create, 1);
    strictEqual(_render, 1);
  });

  test(`getProps`, () => {
    let _c: Component;
    const t = component<{ a: number; }>((c) => {
      _c = c;
      return ({ a }) => {
        return a;
      };
    });
    const root = createRoot();
    const props1 = { a: 0 };
    const props2 = { a: 1 };
    root.update(
      t(props1),
    );
    strictEqual(getProps(_c!), props1);
    root.update(
      t(props2),
    );
    strictEqual(getProps(_c!), props2);
  });
});
