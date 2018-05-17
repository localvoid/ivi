import { NOOP, NOOP_FALSE } from "ivi-core";

describe("NOOP", () => {
  test("NOOP => undefined", () => {
    expect(NOOP()).toBe(undefined);
  });

  test("NOOP_FALSE => false", () => {
    expect(NOOP_FALSE()).toBe(false);
  });
});
