import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("equality", () => {
  describe("strictEqual", () => {
    test("same instance", () => {
      const a = { a: 1 };
      expect(ivi.strictEqual(a, a)).toBe(true);
      expect(ivi.strictNotEqual(a, a)).toBe(false);
    });

    test("{a:1} !== {a:1}", () => {
      expect(ivi.strictEqual({ a: 1 }, { a: 1 })).toBe(false);
      expect(ivi.strictNotEqual({ a: 1 }, { a: 1 })).toBe(true);
    });
  });

  describe("shallowEqual", () => {
    test("same instance", () => {
      const a = { a: 1 };
      expect(ivi.shallowEqual(a, a)).toBe(true);
      expect(ivi.shallowNotEqual(a, a)).toBe(false);
    });

    test("{a:1} === {a:1} (different instances)", () => {
      expect(ivi.shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(ivi.shallowNotEqual({ a: 1 }, { a: 1 })).toBe(false);
    });

    test("{a:1} !== {a:2}", () => {
      expect(ivi.shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
      expect(ivi.shallowNotEqual({ a: 1 }, { a: 2 })).toBe(true);
    });

    test("{a, b} !== {a}", () => {
      expect(ivi.shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
      expect(ivi.shallowNotEqual({ a: 1, b: 2 }, { a: 1 })).toBe(true);
    });
  });

  describe("shallowEqualArray", () => {
    test("same instance", () => {
      const a = [1];
      expect(ivi.shallowEqualArray(a, a)).toBe(true);
      expect(ivi.shallowNotEqualArray(a, a)).toBe(false);
    });

    test("[1] === [1] (different instances)", () => {
      expect(ivi.shallowEqualArray([1], [1])).toBe(true);
      expect(ivi.shallowNotEqualArray([1], [1])).toBe(false);
    });

    test("[1] !== [2]", () => {
      expect(ivi.shallowEqualArray([1], [2])).toBe(false);
      expect(ivi.shallowNotEqualArray([1], [2])).toBe(true);
    });

    test("[1, 2] !== [1]", () => {
      expect(ivi.shallowEqualArray([1, 2], [1])).toBe(false);
      expect(ivi.shallowNotEqualArray([1, 2], [1])).toBe(true);
    });
  });
});
