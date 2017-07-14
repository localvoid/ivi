import { SelectorData, selectorData, memoizeSelector } from "../src/index";

describe("selector", function () {
  describe("data", function () {
    test("should assign input data as a first param", function () {
      const d = selectorData(1);
      expect(d.in).toBe(1);
    });

    test("should assign output data as a second param", function () {
      const d = selectorData(1, 2);
      expect(d.in).toBe(1);
      expect(d.out).toBe(2);
    });

    test("should use first param as output when second param is omitted", function () {
      const d = selectorData(1);
      expect(d.out).toBe(1);
    });
  });
  describe("memoize", function () {
    describe("normal", function () {
      test("should initially pass a null value as a prev state", function () {
        let p: SelectorData | undefined;
        let r: SelectorData<number, number> | null = null;
        const sel = memoizeSelector(
          function (prev: any, props: any) {
            p = prev;
            return selectorData(props);
          },
          function (ref) {
            return ref ? r = ref : r;
          },
        );
        sel(null, 2);
        expect(p).toBeNull();
      });

      test("should pass memoized value as a prev state", function () {
        let p: SelectorData | undefined;
        let r: SelectorData<number, number> | null = null;
        const sel = memoizeSelector(
          function (prev: any, props: any) {
            p = prev;
            return selectorData(props);
          },
          function (ref) {
            return ref ? r = ref : r;
          },
        );
        sel(null, 2);
        sel(null, 3);
        expect(p).not.toBeNull();
        expect(p!.in).toBe(2);
        expect(p!.out).toBe(2);
      });
    });
  });

});
