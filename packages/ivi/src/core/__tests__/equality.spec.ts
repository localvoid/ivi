import {
  strictEqual, strictNotEqual, shallowEqual, shallowNotEqual, shallowEqualArray, shallowNotEqualArray,
} from "ivi";

describe("equality", () => {
  describe("strictEqual", () => {
    test("same instance", () => {
      const a = { a: 1 };
      expect(strictEqual(a, a)).toBe(true);
      expect(strictNotEqual(a, a)).toBe(false);
    });

    test("{a:1} !== {a:1}", () => {
      expect(strictEqual({ a: 1 }, { a: 1 })).toBe(false);
      expect(strictNotEqual({ a: 1 }, { a: 1 })).toBe(true);
    });
  });

  describe("shallowEqual", () => {
    test("same instance", () => {
      const a = { a: 1 };
      expect(shallowEqual(a, a)).toBe(true);
      expect(shallowNotEqual(a, a)).toBe(false);
    });

    test("{a:1} === {a:1} (different instances)", () => {
      expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(shallowNotEqual({ a: 1 }, { a: 1 })).toBe(false);
    });

    test("{a:1} !== {a:2}", () => {
      expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
      expect(shallowNotEqual({ a: 1 }, { a: 2 })).toBe(true);
    });

    test("{a, b} !== {a}", () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
      expect(shallowNotEqual({ a: 1, b: 2 }, { a: 1 })).toBe(true);
    });
  });

  describe("shallowEqualArray", () => {
    test("same instance", () => {
      const a = [1];
      expect(shallowEqualArray(a, a)).toBe(true);
      expect(shallowNotEqualArray(a, a)).toBe(false);
    });

    test("[1] === [1] (different instances)", () => {
      expect(shallowEqual([1], [1])).toBe(true);
      expect(shallowNotEqual([1], [1])).toBe(false);
    });

    test("[1] !== [2]", () => {
      expect(shallowEqual([1], [2])).toBe(false);
      expect(shallowNotEqual([1], [2])).toBe(true);
    });

    test("[1, 2] !== [1]", () => {
      expect(shallowEqual([1, 2], [1])).toBe(false);
      expect(shallowNotEqual([1, 2], [1])).toBe(true);
    });
  });
});
