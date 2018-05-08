import { shallowEqual } from "ivi-core";

describe("equality", () => {
  describe("isPropsNotShallowEqual", () => {
    test("{a} === {a} (same instance)", () => {
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
});
