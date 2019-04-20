import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("array", () => {
  describe("append", () => {
    test("append(null, 1)", () => {
      expect(ivi.append(null, 1)).toEqual([1]);
    });

    test("append([0], 1)", () => {
      expect(ivi.append([0], 1)).toEqual([0, 1]);
    });

    test("same instance", () => {
      const a = [0];
      const b = ivi.append(a, 1);
      expect(a).toBe(b);
    });
  });

  describe("unorderedArrayDeleteByIndex", () => {
    describe("one item", () => {
      test("delete first item", () => {
        const a = [0];
        ivi.unorderedArrayDeleteByIndex(a, 0);
        expect(a).toEqual([]);
      });
    });

    describe("two items", () => {
      test("delete first item", () => {
        const a = [0, 1];
        ivi.unorderedArrayDeleteByIndex(a, 0);
        expect(a).toEqual([1]);
      });

      test("delete second item", () => {
        const a = [0, 1];
        ivi.unorderedArrayDeleteByIndex(a, 1);
        expect(a).toEqual([0]);
      });
    });

    describe("three items", () => {
      test("delete first item", () => {
        const a = [0, 1, 2];
        ivi.unorderedArrayDeleteByIndex(a, 0);
        expect(a).toEqual([2, 1]);
      });

      test("delete second item", () => {
        const a = [0, 1, 2];
        ivi.unorderedArrayDeleteByIndex(a, 1);
        expect(a).toEqual([0, 2]);
      });

      test("delete third item", () => {
        const a = [0, 1, 2];
        ivi.unorderedArrayDeleteByIndex(a, 2);
        expect(a).toEqual([0, 1]);
      });
    });
  });

  describe("unorderedArrayDelete", () => {
    describe("one item", () => {
      test("delete first item", () => {
        const a = [0];
        ivi.unorderedArrayDelete(a, 0);
        expect(a).toEqual([]);
      });
    });

    describe("two items", () => {
      test("delete first item", () => {
        const a = [10, 20];
        ivi.unorderedArrayDelete(a, 10);
        expect(a).toEqual([20]);
      });

      test("delete second item", () => {
        const a = [10, 20];
        ivi.unorderedArrayDelete(a, 20);
        expect(a).toEqual([10]);
      });
    });

    test("deleting non-existent item should throw an exception", () => {
      const a = [10, 20];
      expect(() => { ivi.unorderedArrayDelete(a, 30); }).toThrowError();
    });
  });
});
