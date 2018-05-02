import { unorderedArrayDelete, map, mapRange, mapFilterUndefined } from "../src/array";

describe("array", () => {
  describe("unorderedArrayDelete", () => {
    describe("one item", () => {
      test("delete first item", () => {
        const a = [0];
        unorderedArrayDelete(a, 0);
        expect(a).toEqual([]);
      });
    });

    describe("two items", () => {
      test("delete first item", () => {
        const a = [0, 1];
        unorderedArrayDelete(a, 0);
        expect(a).toEqual([1]);
      });

      test("delete second item", () => {
        const a = [0, 1];
        unorderedArrayDelete(a, 1);
        expect(a).toEqual([0]);
      });
    });

    describe("three items", () => {
      test("delete first item", () => {
        const a = [0, 1, 2];
        unorderedArrayDelete(a, 0);
        expect(a).toEqual([2, 1]);
      });

      test("delete second item", () => {
        const a = [0, 1, 2];
        unorderedArrayDelete(a, 1);
        expect(a).toEqual([0, 2]);
      });

      test("delete third item", () => {
        const a = [0, 1, 2];
        unorderedArrayDelete(a, 2);
        expect(a).toEqual([0, 1]);
      });
    });
  });

  describe("map", () => {
    test("empty", () => {
      let i = 0;
      const r = map([], (item: any, idx: number) => {
        i++;
        return null;
      });
      expect(i).toBe(0);
      expect(r).toEqual([]);
    });

    test("two items", () => {
      let i = 0;
      const r = map([0, 1], (item: any, idx: number) => {
        expect(idx).toBe(i);
        i++;
        return item + 10;
      });
      expect(i).toBe(2);
      expect(r).toEqual([10, 11]);
    });
  });

  describe("mapRange", () => {
    test("empty", () => {
      let i = 0;
      const r = mapRange(0, 0, (idx: number) => {
        i++;
        return null;
      });
      expect(i).toBe(0);
      expect(r).toEqual([]);
    });

    test("[0, 2)", () => {
      let i = 0;
      const r = mapRange(0, 2, (idx: number) => {
        expect(idx).toBe(i);
        i++;
        return 10 + idx;
      });
      expect(i).toBe(2);
      expect(r).toEqual([10, 11]);
    });

    test("[2, 4)", () => {
      let i = 2;
      const r = mapRange(2, 4, (idx: number) => {
        expect(idx).toBe(i);
        i++;
        return 10 + idx;
      });
      expect(i).toBe(4);
      expect(r).toEqual([12, 13]);
    });

    test("[-2, 0)", () => {
      let i = -2;
      const r = mapRange(-2, 0, (idx: number) => {
        expect(idx).toBe(i);
        i++;
        return 10 + idx;
      });
      expect(i).toBe(0);
      expect(r).toEqual([8, 9]);
    });
  });

  describe("mapFilterUndefined", () => {
    test("empty", () => {
      let i = 0;
      const r = mapFilterUndefined([], (item: any, idx: number) => {
        i++;
        return null;
      });
      expect(i).toBe(0);
      expect(r).toEqual([]);
    });

    test("two items", () => {
      let i = 0;
      const r = mapFilterUndefined([0, 1], (item: any, idx: number) => {
        expect(idx).toBe(i);
        i++;
        return item + 10;
      });
      expect(i).toBe(2);
      expect(r).toEqual([10, 11]);
    });

    test("two items, skip first", () => {
      let i = 0;
      const r = mapFilterUndefined([0, 1], (item: any, idx: number) => {
        expect(idx).toBe(i);
        if (i++ === 0) {
          return undefined;
        }
        return item + 10;
      });
      expect(i).toBe(2);
      expect(r).toEqual([11]);
    });

    test("two items, skip second", () => {
      let i = 0;
      const r = mapFilterUndefined([0, 1], (item: any, idx: number) => {
        expect(idx).toBe(i);
        if (i++ === 1) {
          return undefined;
        }
        return item + 10;
      });
      expect(i).toBe(2);
      expect(r).toEqual([10]);
    });
  });
});
