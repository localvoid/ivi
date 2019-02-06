import { NOOP, NOOP_FALSE } from "ivi";
import { NOOP_TRUE } from "../noop";

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
