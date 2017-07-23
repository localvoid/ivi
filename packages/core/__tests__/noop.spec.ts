/* tslint:disable:no-unused-expression */
import { NOOP, NOOP_FALSE } from "../src/noop";
import { expect } from "iko";

describe("NOOP", () => {
  it("NOOP => undefined", () => {
    expect(NOOP()).toBeEqual(undefined);
  });

  it("NOOP_FALSE => false", () => {
    expect(NOOP_FALSE()).toBeEqual(false);
  });
});
