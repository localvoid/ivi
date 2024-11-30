import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import {
  preventUpdates, strictEq, shallowEq, shallowEqArray,
} from "../equal.js";

describe("equal", () => {
  test("preventUpdates", () => {
    strictEqual(preventUpdates(0, 1), true);
  });

  describe("strictEq", () => {
    test("same instance", () => {
      const a = { a: 1 };
      strictEqual(strictEq(a, a), true);
    });

    test("{a:1} !== {a:1}", () => {
      strictEqual(strictEq({ a: 1 }, { a: 1 }), false);
    });
  });

  describe("shallowEq", () => {
    test("same instance", () => {
      const a = { a: 1 };
      strictEqual(shallowEq(a, a), true);
    });

    test("{a:1} === {a:1} (different instances)", () => {
      strictEqual(shallowEq({ a: 1 }, { a: 1 }), true);
    });

    test("{a:1} !== {a:2}", () => {
      strictEqual(shallowEq({ a: 1 }, { a: 2 }), false);
    });

    test("{a, b} !== {a}", () => {
      strictEqual(shallowEq({ a: 1, b: 2 }, { a: 1 }), false);
    });
  });

  describe("shallowEqArray", () => {
    test("same instance", () => {
      const a = [1];
      strictEqual(shallowEqArray(a, a), true);
    });

    test("[1] === [1] (different instances)", () => {
      strictEqual(shallowEqArray([1], [1]), true);
    });

    test("[1] !== [2]", () => {
      strictEqual(shallowEqArray([1], [2]), false);
    });

    test("[1, 2] !== [1]", () => {
      strictEqual(shallowEqArray([1, 2], [1]), false);
    });
  });
});
