/* tslint:disable:no-unused-expression */
import { shallowEqual } from "../src/index";
import { expect } from "chai";

describe("equality", () => {
  describe("isPropsNotShallowEqual", () => {
    it("{a} === {a} (same instance)", () => {
      const a = { a: 1 };
      expect(shallowEqual(a, a)).to.true;
    });

    it("{a} === {a} (different instances)", () => {
      expect(shallowEqual({ a: 1 }, { a: 1 })).to.true;
    });

    it("{a:1} !== {a:2}", () => {
      expect(shallowEqual({ a: 1 }, { a: 2 })).to.false;
    });

    it("{a, b} !== {a}", () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).to.false;
    });
  });
});
