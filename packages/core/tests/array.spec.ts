/* tslint:disable:no-unused-expression */
import { expect } from "chai";
import { unorderedArrayDelete, map, mapRange, mapFilterUndefined } from "../src/array";

describe("array", () => {
  describe("unorderedArrayDelete", () => {
    describe("one item", () => {
      it("delete first item", () => {
        const a = [0];
        unorderedArrayDelete(a, 0);
        expect(a).to.eql([]);
      });
    });

    describe("two items", () => {
      it("delete first item", () => {
        const a = [0, 1];
        unorderedArrayDelete(a, 0);
        expect(a).to.eql([1]);
      });

      it("delete second item", () => {
        const a = [0, 1];
        unorderedArrayDelete(a, 1);
        expect(a).to.eql([0]);
      });
    });

    describe("three items", () => {
      it("delete first item", () => {
        const a = [0, 1, 2];
        unorderedArrayDelete(a, 0);
        expect(a).to.eql([2, 1]);
      });

      it("delete second item", () => {
        const a = [0, 1, 2];
        unorderedArrayDelete(a, 1);
        expect(a).to.eql([0, 2]);
      });

      it("delete third item", () => {
        const a = [0, 1, 2];
        unorderedArrayDelete(a, 2);
        expect(a).to.eql([0, 1]);
      });
    });
  });

  describe("map", () => {
    it("empty", () => {
      let i = 0;
      const r = map([], (item: any, idx: number) => {
        i++;
        return null;
      });
      expect(i).to.equal(0);
      expect(r).to.eql([]);
    });

    it("two items", () => {
      let i = 0;
      const r = map([0, 1], (item: any, idx: number) => {
        expect(idx).to.equal(i);
        i++;
        return item + 10;
      });
      expect(i).to.equal(2);
      expect(r).to.eql([10, 11]);
    });
  });

  describe("mapRange", () => {
    it("empty", () => {
      let i = 0;
      const r = mapRange(0, 0, (idx: number) => {
        i++;
        return null;
      });
      expect(i).to.equal(0);
      expect(r).to.eql([]);
    });

    it("[0, 2)", () => {
      let i = 0;
      const r = mapRange(0, 2, (idx: number) => {
        expect(idx).to.equal(i);
        i++;
        return 10 + idx;
      });
      expect(i).to.equal(2);
      expect(r).to.eql([10, 11]);
    });

    it("[2, 4)", () => {
      let i = 2;
      const r = mapRange(2, 4, (idx: number) => {
        expect(idx).to.equal(i);
        i++;
        return 10 + idx;
      });
      expect(i).to.equal(4);
      expect(r).to.eql([12, 13]);
    });

    it("[-2, 0)", () => {
      let i = -2;
      const r = mapRange(-2, 0, (idx: number) => {
        expect(idx).to.equal(i);
        i++;
        return 10 + idx;
      });
      expect(i).to.equal(0);
      expect(r).to.eql([8, 9]);
    });
  });

  describe("mapFilterUndefined", () => {
    it("empty", () => {
      let i = 0;
      const r = mapFilterUndefined([], (item: any, idx: number) => {
        i++;
        return null;
      });
      expect(i).to.equal(0);
      expect(r).to.eql([]);
    });

    it("two items", () => {
      let i = 0;
      const r = mapFilterUndefined([0, 1], (item: any, idx: number) => {
        expect(idx).to.equal(i);
        i++;
        return item + 10;
      });
      expect(i).to.equal(2);
      expect(r).to.eql([10, 11]);
    });

    it("two items, skip first", () => {
      let i = 0;
      const r = mapFilterUndefined([0, 1], (item: any, idx: number) => {
        expect(idx).to.equal(i);
        if (i++ === 0) {
          return undefined;
        }
        return item + 10;
      });
      expect(i).to.equal(2);
      expect(r).to.eql([11]);
    });

    it("two items, skip second", () => {
      let i = 0;
      const r = mapFilterUndefined([0, 1], (item: any, idx: number) => {
        expect(idx).to.equal(i);
        if (i++ === 1) {
          return undefined;
        }
        return item + 10;
      });
      expect(i).to.equal(2);
      expect(r).to.eql([10]);
    });
  });
});
