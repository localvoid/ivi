import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("bitset", () => {
  describe("0b00", () => {
    test("empty", () => {
      expect(ivi.bitset());
    });

    test("false", () => {
      expect(ivi.bitset(false));
    });

    test("false, false", () => {
      expect(ivi.bitset(false, false));
    });
  });

  describe("0b01", () => {
    test("true", () => {
      expect(ivi.bitset(true));
    });

    test("true, false", () => {
      expect(ivi.bitset(true, false));
    });
  });

  describe("0b10", () => {
    test("true, false", () => {
      expect(ivi.bitset(false, true));
    });
  });

  describe("0b11", () => {
    test("true, true", () => {
      expect(ivi.bitset(true, true));
    });
  });
});
