import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("NOOP", () => {
  test("NOOP => undefined", () => {
    expect(ivi.NOOP()).toBe(void 0);
  });

  test("NOOP_FALSE => false", () => {
    expect(ivi.NOOP_FALSE()).toBe(false);
  });

  test("NOOP_TRUE => false", () => {
    expect(ivi.NOOP_TRUE()).toBe(true);
  });
});
