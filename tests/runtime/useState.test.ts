import { deepStrictEqual, ok } from "node:assert";
import { beforeEach, describe, test } from "bun:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { component, useState } from "ivi";

describe("useState", () => {
  beforeEach(reset);

  test(`1`, () => {
    let _setState: (v: number) => void;
    let _trace: string[] = [];
    const T = component((c) => {
      const [state, setState] = useState(c, 0);
      _setState = setState;
      _trace.push("create");
      return () => {
        _trace.push("render");
        return state();
      };
    });

    const root = createRoot();
    root.update(T());
    deepStrictEqual(_trace, ["create", "render"]);
    _trace = [];

    deepStrictEqual(
      trace(() => { _setState(0); }),
      [],
    );
    ok(!root.isDirty);

    deepStrictEqual(
      trace(() => { _setState(1); }),
      [],
    );
    deepStrictEqual(_trace, []);
    ok(root.isDirty);
    deepStrictEqual(
      trace(() => { root.dirtyCheck(); }),
      [
        `[2] Node.nodeValue = 1`,
      ],
    );
    deepStrictEqual(_trace, ["render"]);
  });
});
