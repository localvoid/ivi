/* tslint:disable:no-unused-expression */
import { isPropsNotShallowEqual } from "../src/index";
import { expect } from "chai";

describe("equality", () => {
  describe("isPropsNotShallowEqual", () => {
    it("{a} === {a} (same instance)", () => {
      const a = { a: 1 };
      expect(isPropsNotShallowEqual(a, a)).to.false;
    });

    it("{a} === {a} (different instances)", () => {
      expect(isPropsNotShallowEqual({ a: 1 }, { a: 1 })).to.false;
    });

    it("{a:1} !== {a:2}", () => {
      expect(isPropsNotShallowEqual({ a: 1 }, { a: 2 })).to.true;
    });

    it("{a, b} !== {a}", () => {
      expect(isPropsNotShallowEqual<{ a: number, b?: number }>({ a: 1, b: 2 }, { a: 1 })).to.true;
    });
  });
});
