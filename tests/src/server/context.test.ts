import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { context, component, renderToString } from "ivi/server";

describe("ssr: context", () => {
  const [get1, provider1] = context<number>();
  const [get2, provider2] = context<number>();
  const T = component((c) => {
    const v1 = get1(c);
    const v2 = get2(c);
    return () => (
      (v1 === void 0 ? "undefined" : v1) + "|" + (v2 === void 0 ? "undefined" : v2)
    );
  });

  test(`undefined|undefined`, () => {
    strictEqual(
      renderToString(T()),
      `undefined|undefined`,
    );
  });

  test(`1|undefined`, () => {
    strictEqual(
      renderToString(provider1(1, T())),
      `1|undefined`,
    );
  });

  test(`1|2`, () => {
    strictEqual(
      renderToString(provider1(1, provider2(2, T()))),
      `1|2`,
    );
  });

  test(`nested 1`, () => {
    strictEqual(
      renderToString(
        provider1(2,
          provider1(1,
            T()
          ),
        ),
      ),
      `1|undefined`,
    );
  });
});
