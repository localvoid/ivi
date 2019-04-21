import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("equality", () => {
  describe("strictEqual", () => {
    test("same instance", () => {
      const a = { a: 1 };
      expect(ivi.strictEqual(a, a)).toBe(true);
    });

    test("{a:1} !== {a:1}", () => {
      expect(ivi.strictEqual({ a: 1 }, { a: 1 })).toBe(false);
    });
  });

  describe("shallowEqual", () => {
    test("same instance", () => {
      const a = { a: 1 };
      expect(ivi.shallowEqual(a, a)).toBe(true);
    });

    test("{a:1} === {a:1} (different instances)", () => {
      expect(ivi.shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
    });

    test("{a:1} !== {a:2}", () => {
      expect(ivi.shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    test("{a, b} !== {a}", () => {
      expect(ivi.shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });
  });

  describe("shallowEqualArray", () => {
    test("same instance", () => {
      const a = [1];
      expect(ivi.shallowEqualArray(a, a)).toBe(true);
    });

    test("[1] === [1] (different instances)", () => {
      expect(ivi.shallowEqualArray([1], [1])).toBe(true);
    });

    test("[1] !== [2]", () => {
      expect(ivi.shallowEqualArray([1], [2])).toBe(false);
    });

    test("[1, 2] !== [1]", () => {
      expect(ivi.shallowEqualArray([1, 2], [1])).toBe(false);
    });
  });
});
