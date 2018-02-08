/* tslint:disable:no-unused-expression */
import { memoizeSelector } from "../src/index";
import { expect } from "iko";

describe("selector", function () {
  describe("memoize", function () {
    describe("normal", function () {
      it("should initially pass a null value as a prev state", function () {
        let p;
        let r: { v: number } | null = null;
        const sel = memoizeSelector(
          function (prev: any, props: any) {
            p = prev;
            return { v: props };
          },
          function (ref) {
            return ref ? r = ref : r;
          },
        );
        sel(null, 2);
        expect(p).notToBe(undefined);
      });

      it("should pass memoized value as a prev state", function () {
        let p: { v: number } | undefined;
        let r: { v: number } | null = null;
        const sel = memoizeSelector(
          function (prev: any, props: any) {
            p = prev;
            return { v: props };
          },
          function (ref) {
            return ref ? r = ref : r;
          },
        );
        sel(null, 2);
        sel(null, 3);
        expect(p).notToBe(undefined);
        expect(p!.v).toBe(2);
        expect(p!.v).toBe(2);
      });
    });
  });

});
