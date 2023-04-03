import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, flushIdleCallbacks } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { component, useIdleEffect } from "ivi";

describe("useIdleEffect", () => {
  beforeEach(reset);

  test(`#1`, () => {
    let _trace: string[] = [];
    const t = component((c) => {
      _trace.push("create");
      const e1 = useIdleEffect(c, () => {
        _trace.push("effect1");
      });
      return () => {
        _trace.push("render");
        e1();
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "create",
      "render",
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "effect1",
    ]);
    _trace = [];

    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "effect1",
    ]);
    _trace = [];

    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "effect1",
    ]);
    _trace = [];

    root.update(
      null,
    );
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
    ]);
  });

  test(`#2`, () => {
    let _trace: string[] = [];
    const t = component((c) => {
      _trace.push("create");
      const e1 = useIdleEffect(c, () => {
        _trace.push("effect1");
        return () => {
          _trace.push("reset1");
        };
      });
      return () => {
        _trace.push("render");
        e1();
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "create",
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "effect1",
    ]);
    _trace = [];

    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "effect1",
    ]);
    _trace = [];

    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "effect1",
    ]);
    _trace = [];

    root.update(
      null,
    );
    deepStrictEqual(_trace, [
      "reset1",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
    ]);
  });

  test(`#3`, () => {
    let _trace: string[] = [];
    const t = component((c) => {
      _trace.push("create");
      const e1 = useIdleEffect(c, () => {
        _trace.push("effect1");
        return () => {
          _trace.push("reset1");
        };
      });
      const e2 = useIdleEffect(c, () => {
        _trace.push("effect2");
        return () => {
          _trace.push("reset2");
        };
      });
      return () => {
        _trace.push("render");
        e1();
        e2();
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "create",
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "effect1",
      "effect2",
    ]);
    _trace = [];

    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "effect1",
      "reset2",
      "effect2",
    ]);
    _trace = [];

    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "effect1",
      "reset2",
      "effect2",
    ]);
    _trace = [];

    root.update(
      null,
    );
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "reset2",
    ]);
  });

  test(`#4`, () => {
    let _trace: string[] = [];
    const t = component((c) => {
      _trace.push("create");
      const e1 = useIdleEffect<number>(c, (i) => {
        _trace.push(`effect1: ${i}`);
        return () => {
          _trace.push("reset1");
        };
      });
      return (i: number) => {
        _trace.push("render");
        e1(i);
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(1),
    );
    deepStrictEqual(_trace, [
      "create",
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "effect1: 1",
    ]);
    _trace = [];

    root.update(
      t(2),
    );
    deepStrictEqual(_trace, [
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "effect1: 2",
    ]);
    _trace = [];

    root.update(
      t(2),
    );
    deepStrictEqual(_trace, [
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "effect1: 2",
    ]);
  });

  test(`#5`, () => {
    let _trace: string[] = [];
    const t = component((c) => {
      _trace.push("create");
      const e1 = useIdleEffect<number>(c, (i) => {
        _trace.push(`effect1: ${i}`);
        return () => {
          _trace.push("reset1");
        };
      }, (a, b) => {
        _trace.push(`areEqual(${a}, ${b})`);
        return a === b;
      });
      return (i: number) => {
        _trace.push("render");
        e1(i);
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(1),
    );
    deepStrictEqual(_trace, [
      "create",
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "effect1: 1",
    ]);
    _trace = [];

    root.update(
      t(2),
    );
    deepStrictEqual(_trace, [
      "render",
      "areEqual(1, 2)",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "effect1: 2",
    ]);
    _trace = [];

    root.update(
      t(2),
    );
    deepStrictEqual(_trace, [
      "render",
      "areEqual(2, 2)",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
    ]);
  });

  test(`#6`, () => {
    let _trace: string[] = [];
    const t2 = component((c) => {
      _trace.push("create2");
      const e1 = useIdleEffect(c, () => {
        _trace.push(`effect2`);
        return () => {
          _trace.push("reset2");
        };
      });
      return () => {
        _trace.push("render2");
        e1();
        return null;
      };
    });
    const t1 = component((c) => {
      _trace.push("create1");
      const e1 = useIdleEffect(c, () => {
        _trace.push(`effect1`);
        return () => {
          _trace.push("reset1");
        };
      });
      return () => {
        _trace.push("render1");
        e1();
        return t2();
      };
    });
    const root = createRoot();
    root.update(
      t1(),
    );
    deepStrictEqual(_trace, [
      "create1",
      "render1",
      "create2",
      "render2",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "effect1",
      "effect2",
    ]);
    _trace = [];

    root.update(
      t1(),
    );
    deepStrictEqual(_trace, [
      "render1",
      "render2",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "effect1",
      "reset2",
      "effect2",
    ]);
    _trace = [];

    root.update(
      t1(),
    );
    deepStrictEqual(_trace, [
      "render1",
      "render2",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "reset1",
      "effect1",
      "reset2",
      "effect2",
    ]);
    _trace = [];

    root.update(
      null,
    );
    deepStrictEqual(_trace, [
      "reset1",
      "reset2",
    ]);
  });

  test(`unmount before effect #1`, () => {
    let _trace: string[] = [];
    const t = component((c) => {
      _trace.push("create");
      const e1 = useIdleEffect(c, () => {
        _trace.push("effect1");
        return () => {
          _trace.push("reset1");
        };
      });
      return () => {
        _trace.push("render");
        e1();
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "create",
      "render",
    ]);
    _trace = [];
    root.update(
      null,
    );
    deepStrictEqual(_trace, [
    ]);
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
    ]);
  });

  test(`unmount before effect #2`, () => {
    let _trace: string[] = [];
    const t = component((c) => {
      _trace.push("create");
      const e1 = useIdleEffect(c, () => {
        _trace.push("effect1");
        return () => {
          _trace.push("reset1");
        };
      });
      return () => {
        _trace.push("render");
        e1();
        return null;
      };
    });
    const root = createRoot();
    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "create",
      "render",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
      "effect1",
    ]);
    _trace = [];
    root.update(
      t(),
    );
    deepStrictEqual(_trace, [
      "render",
    ]);
    _trace = [];
    root.update(
      null,
    );
    deepStrictEqual(_trace, [
      "reset1",
    ]);
    _trace = [];
    flushIdleCallbacks();
    deepStrictEqual(_trace, [
    ]);
  });
});
