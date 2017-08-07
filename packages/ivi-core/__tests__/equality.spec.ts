import { shallowEqual } from "../src/index";
import { expect } from "iko";

describe("equality", () => {
  describe("isPropsNotShallowEqual", () => {
    it("{a} === {a} (same instance)", () => {
      const a = { a: 1 };
      expect(shallowEqual(a, a)).toBe(true);
    });

    it("{a} === {a} (different instances)", () => {
      expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
    });

    it("{a:1} !== {a:2}", () => {
      expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it("{a, b} !== {a}", () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });
  });
});
