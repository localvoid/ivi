/* tslint:disable:no-unused-expression */
import { NOOP, NOOP_FALSE } from "../src/noop";

describe("NOOP", () => {
  test("NOOP => undefined", () => {
    expect(NOOP()).toBe(undefined);
  });

  test("NOOP_FALSE => false", () => {
    expect(NOOP_FALSE()).toBe(false);
  });
});
