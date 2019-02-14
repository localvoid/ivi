import { shallowEqual } from "ivi";
import { shallowEqualArray } from "../equal";

describe("equality", () => {
  describe("shallowEqual", () => {
    test("same instance", () => {
      const a = { a: 1 };
      expect(shallowEqual(a, a)).toBe(true);
    });

    test("{a} === {a} (different instances)", () => {
      expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
    });

    test("{a:1} !== {a:2}", () => {
      expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    test("{a, b} !== {a}", () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });
  });

  describe("shallowEqualArray", () => {
    test("same instance", () => {
      const a = [1];
      expect(shallowEqualArray(a, a)).toBe(true);
    });

    test("[1] === [1] (different instances)", () => {
      expect(shallowEqual([1], [1])).toBe(true);
    });

    test("[1] !== [2]", () => {
      expect(shallowEqual([1], [2])).toBe(false);
    });

    test("[1, 2] !== [1]", () => {
      expect(shallowEqual([1, 2], [1])).toBe(false);
    });
  });
});
