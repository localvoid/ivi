import { NOOP, NOOP_FALSE, NOOP_TRUE } from "ivi";

describe("NOOP", () => {
  test("NOOP => undefined", () => {
    expect(NOOP()).toBe(undefined);
  });

  test("NOOP_FALSE => false", () => {
    expect(NOOP_FALSE()).toBe(false);
  });

  test("NOOP_TRUE => false", () => {
    expect(NOOP_TRUE()).toBe(true);
  });
});
