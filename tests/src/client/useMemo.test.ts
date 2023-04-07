import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { component, useMemo } from "ivi";

describe("useMemo", () => {
  beforeEach(reset);

  test(`1`, () => {
    let _trace: string[] = [];
    const T = component<number>(() => {
      const memo = useMemo<number, number>(
        (a, b) => {
          _trace.push(`areEqual(${a}, ${b})`);
          return a === b;
        },
        (b) => {
          _trace.push(`memo(${b})`);
          return b;
        },
      );
      return (i) => {
        _trace.push("render");
        return memo(i);
      };
    });

    const root = createRoot();
    root.update(T(0));
    deepStrictEqual(_trace, ["render", "memo(0)"]);
    _trace = [];

    deepStrictEqual(
      trace(() => { root.update(T(0)); }),
      [],
    );
    deepStrictEqual(_trace, ["render", "areEqual(0, 0)"]);
    _trace = [];

    deepStrictEqual(
      trace(() => { root.update(T(1)); }),
      [`[2] Node.nodeValue = 1`],
    );
    deepStrictEqual(_trace, ["render", "areEqual(0, 1)", "memo(1)"]);
  });
});
