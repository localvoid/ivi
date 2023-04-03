import { deepStrictEqual, ok, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import {
  type Component, component, getProps, useUnmount, invalidate,
} from "ivi";

describe("text", () => {
  beforeEach(reset);

  test(`() => null`, () => {
    let _trace: string[] = [];
    const t = component(() => {
      _trace.push("create");
      return () => {
        _trace.push("render");
        return null;
      };
    });
    deepStrictEqual(_trace, []);

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
    deepStrictEqual(_trace, ["create", "render"]);
  });

  test(`() => 1`, () => {
    let _trace: string[] = [];
    const t = component(() => {
      _trace.push("create");
      return () => {
        _trace.push("render");
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
    deepStrictEqual(_trace, ["create", "render"]);
  });

  test(`({ a: 1 }) => a`, () => {
    let _trace: string[] = [];
    const t = component<{ a: number; }>(() => {
      _trace.push("create");
      return ({ a }) => {
        _trace.push("render");
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
    deepStrictEqual(_trace, ["create", "render"]);
  });

  test(`update #1`, () => {
    let _trace: string[] = [];
    const t = component<{ a: number; }>(() => {
      _trace.push("create");
      return ({ a }) => {
        _trace.push("render");
        return a;
      };
    });
    const root = createRoot();
    root.update(
      t({ a: 1 }),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
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
    deepStrictEqual(_trace, ["render"]);
  });

  test(`update #2`, () => {
    let _trace: string[] = [];
    const t = component(() => {
      _trace.push("create");
      return () => {
        _trace.push("render");
        return 1;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    root.update(
      t(),
    );
    deepStrictEqual(_trace, ["render"]);
  });

  test(`update: areEqual => false`, () => {
    let _trace: string[] = [];
    const t = component(() => {
      _trace.push("create");
      return () => {
        _trace.push("render");
        return 1;
      };
    }, () => false);
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    root.update(
      t(),
    );
    deepStrictEqual(_trace, ["render"]);
  });

  test(`update: areEqual => true`, () => {
    let _trace: string[] = [];
    const t = component<{ a: number; }>(() => {
      _trace.push("create");
      return ({ a }) => {
        _trace.push("render");
        return a;
      };
    }, (a, b) => {
      _trace.push(`areEqual(${a.a}, ${b.a})`);
      return true;
    });
    const root = createRoot();
    root.update(
      t({ a: 1 }),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    root.update(
      t({ a: 2 }),
    );
    deepStrictEqual(_trace, ["areEqual(1, 2)"]);
  });

  test(`forceUpdate: areEqual => true`, () => {
    let _trace: string[] = [];
    const t = component<{ a: number; }>(() => {
      _trace.push("create");
      return ({ a }) => {
        _trace.push("render");
        return a;
      };
    }, () => true);
    const root = createRoot();
    root.update(
      t({ a: 1 }),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    root.update(
      t({ a: 2 }),
      true,
    );
    deepStrictEqual(_trace, ["render"]);
  });

  test(`dirtyCheck #1`, () => {
    let _trace: string[] = [];
    const t = component<{ a: number; }>(() => {
      _trace.push("create");
      return ({ a }) => {
        _trace.push("render");
        return a;
      };
    });
    const root = createRoot();
    root.update(
      t({ a: 1 }),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    root.dirtyCheck();
    deepStrictEqual(_trace, []);
  });

  test(`dirtyCheck: areEqual => false`, () => {
    let _trace: string[] = [];
    const t = component<{ a: number; }>(() => {
      _trace.push("create");
      return ({ a }) => {
        _trace.push("render");
        return a;
      };
    }, () => false);
    const root = createRoot();
    root.update(
      t({ a: 1 }),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    root.dirtyCheck();
    deepStrictEqual(_trace, []);
  });

  test(`dirtyCheck: areEqual => true`, () => {
    let _trace: string[] = [];
    const t = component<{ a: number; }>(() => {
      _trace.push("create");
      return ({ a }) => {
        _trace.push("render");
        return a;
      };
    }, () => true);
    const root = createRoot();
    root.update(
      t({ a: 1 }),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    root.dirtyCheck();
    deepStrictEqual(_trace, []);
  });

  test(`dirtyCheck+forceUpdate: areEqual => true`, () => {
    let _trace: string[] = [];
    const t = component<{ a: number; }>(() => {
      _trace.push("create");
      return ({ a }) => {
        _trace.push("render");
        return a;
      };
    }, () => true);
    const root = createRoot();
    root.update(
      t({ a: 1 }),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    root.dirtyCheck(true);
    deepStrictEqual(_trace, ["render"]);
  });

  test(`unmount #1`, () => {
    let _trace: string[] = [];
    const t = component(() => {
      _trace.push("create");
      return () => {
        _trace.push("render");
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
    deepStrictEqual(_trace, ["create", "render"]);
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

  test(`useUnmount 1`, () => {
    let _unmounted = 0;
    const t = component((c) => {
      useUnmount(c, () => {
        _unmounted++;
      });
      return () => null;
    });
    const root = createRoot();
    root.update(
      t(),
    );
    strictEqual(_unmounted, 0);
    root.update(
      null,
    );
    strictEqual(_unmounted, 1);
  });

  test(`useUnmount 2`, () => {
    let _unmounted: number[] = [];
    const t = component((c) => {
      useUnmount(c, () => {
        _unmounted.push(0);
      });
      useUnmount(c, () => {
        _unmounted.push(1);
      });
      return () => null;
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_unmounted, []);
    root.update(
      null,
    );
    deepStrictEqual(_unmounted, [0, 1]);
  });

  test(`useUnmount 3`, () => {
    let _unmounted: number[] = [];
    const t = component((c) => {
      useUnmount(c, () => {
        _unmounted.push(0);
      });
      useUnmount(c, () => {
        _unmounted.push(1);
      });
      useUnmount(c, () => {
        _unmounted.push(2);
      });
      return () => null;
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_unmounted, []);
    root.update(
      null,
    );
    deepStrictEqual(_unmounted, [0, 1, 2]);
  });

  test(`invalidate 1`, () => {
    let _trace: string[] = [];
    let _c: Component;
    const t = component((c) => {
      _trace.push("create");
      _c = c;
      return () => {
        _trace.push("render");
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    invalidate(_c!);
    deepStrictEqual(_trace, []);
    ok(root.isDirty);
    root.dirtyCheck();
    ok(!root.isDirty);
    deepStrictEqual(_trace, ["render"]);
  });

  test(`invalidate 2`, () => {
    let _trace: string[] = [];
    let _c: Component;
    const t = component((c) => {
      _trace.push("create");
      _c = c;
      return () => {
        _trace.push("render");
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    invalidate(_c!);
    invalidate(_c!);
    deepStrictEqual(_trace, []);
    ok(root.isDirty);
    root.dirtyCheck();
    ok(!root.isDirty);
    deepStrictEqual(_trace, ["render"]);
  });

  test(`invalidate 3`, () => {
    let _trace: string[] = [];
    let _c: Component;
    const t = component((c) => {
      _trace.push("create");
      _c = c;
      return () => {
        _trace.push("render");
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];
    invalidate(_c!);
    deepStrictEqual(_trace, []);
    ok(root.isDirty);
    root.dirtyCheck();
    deepStrictEqual(_trace, ["render"]);
    _trace = [];
    invalidate(_c!);
    deepStrictEqual(_trace, []);
    ok(root.isDirty);
    root.dirtyCheck();
    deepStrictEqual(_trace, ["render"]);
  });
});
