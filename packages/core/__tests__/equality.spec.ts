import { shallowEqual } from "../src/index";
import { expect } from "iko";

describe("equality", () => {
  describe("isPropsNotShallowEqual", () => {
    it("{a} === {a} (same instance)", () => {
      const a = { a: 1 };
      expect(shallowEqual(a, a)).toBeEqual(true);
    });

    it("{a} === {a} (different instances)", () => {
      expect(shallowEqual({ a: 1 }, { a: 1 })).toBeEqual(true);
    });

    it("{a:1} !== {a:2}", () => {
      expect(shallowEqual({ a: 1 }, { a: 2 })).toBeEqual(false);
    });

    it("{a, b} !== {a}", () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBeEqual(false);
    });
  });
});
