import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { component, context } from "ivi";

describe("context", () => {
  beforeEach(reset);

  test(`undefined`, () => {
    const [get, _provider] = context<number>();

    const t = component((c) => {
      return () => {
        return get(c) ?? "undefined";
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
        `createTextNode("undefined") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`basic`, () => {
    const [get, provider] = context<number>();

    const t = component((c) => {
      return () => {
        return get(c);
      };
    });
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          provider(1, t()),
        );
      }),
      [
        `createTextNode(1) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(
          provider(2, t()),
        );
      }),
      [
        `[2] Node.nodeValue = 2`,
      ],
    );
  });

  test(`nested #1`, () => {
    const [get, provider] = context<number>();

    const t = component((c) => {
      return () => {
        return get(c);
      };
    });
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          provider(0,
            provider(1, t()),
          ),
        );
      }),
      [
        `createTextNode(1) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(
          provider(0,
            provider(2, t()),
          )
        );
      }),
      [
        `[2] Node.nodeValue = 2`,
      ],
    );
  });

  test(`nested #2`, () => {
    const [get1, provider1] = context<number>();
    const [get2, provider2] = context<number>();

    const t = component((c) => {
      return () => {
        return `${get1(c)}|${get2(c)}`;
      };
    });
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          provider1(1,
            provider2(10, t()),
          ),
        );
      }),
      [
        `createTextNode("1|10") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(
          provider1(2,
            provider2(20, t()),
          )
        );
      }),
      [
        `[2] Node.nodeValue = "2|20"`,
      ],
    );
  });

  test(`nested #3`, () => {
    const [_get1, provider1] = context<number>();
    const [get2, _provider2] = context<number>();

    const t = component((c) => {
      return () => {
        return get2(c) ?? "undefined";
      };
    });
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          provider1(1, t()),
        );
      }),
      [
        `createTextNode("undefined") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`forceUpdate`, () => {
    const [get, provider] = context<number>();
    let _trace: string[] = [];
    const t = component((c) => {
      return () => {
        _trace.push("render");
        return get(c);
      };
    }, () => true);
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          provider(1, t()),
        );
      }),
      [
        `createTextNode(1) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
    deepStrictEqual(_trace, ["render"]);
    _trace = [];

    deepStrictEqual(
      trace(() => {
        root.update(
          provider(1, t()),
        );
      }),
      [
      ],
    );

    deepStrictEqual(_trace, []);

    deepStrictEqual(
      trace(() => {
        root.update(
          provider(2, t()),
        );
      }),
      [
        `[2] Node.nodeValue = 2`,
      ],
    );
    deepStrictEqual(_trace, ["render"]);
  });
});
