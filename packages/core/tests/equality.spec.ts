import { shallowEqual } from "../src/index";

describe("equality", () => {
  describe("isPropsNotShallowEqual", () => {
    test("{a} === {a} (same instance)", () => {
      const a = { a: 1 };
      expect(shallowEqual(a, a)).toBeTruthy();
    });

    test("{a} === {a} (different instances)", () => {
      expect(shallowEqual({ a: 1 }, { a: 1 })).toBeTruthy();
    });

    test("{a:1} !== {a:2}", () => {
      expect(shallowEqual({ a: 1 }, { a: 2 })).toBeFalsy();
    });

    test("{a, b} !== {a}", () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBeFalsy();
    });
  });
});
