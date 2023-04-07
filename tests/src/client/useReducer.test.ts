import { deepStrictEqual, ok } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { component, useReducer } from "ivi";

describe("useReducer", () => {
  beforeEach(reset);

  test(`1`, () => {
    let _dispatch: (v: number) => void;
    let _trace: string[] = [];
    const T = component((c) => {
      const [state, dispatch] = useReducer<number, number>(c, 0, (prev, action) => {
        _trace.push(`dispatch(${prev}, ${action})`);
        return action;
      });
      _dispatch = dispatch;
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
      trace(() => { _dispatch(0); }),
      [],
    );
    deepStrictEqual(_trace, ["dispatch(0, 0)"]);
    _trace = [];
    ok(!root.isDirty);

    deepStrictEqual(
      trace(() => { _dispatch(1); }),
      [],
    );
    deepStrictEqual(_trace, ["dispatch(0, 1)"]);
    _trace = [];
    ok(root.isDirty);
    deepStrictEqual(
      trace(() => { root.dirtyCheck(); }),
      [`[2] Node.nodeValue = 1`],
    );
    deepStrictEqual(_trace, ["render"]);
  });
});
