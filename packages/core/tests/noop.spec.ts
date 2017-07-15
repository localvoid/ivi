/* tslint:disable:no-unused-expression */
import { expect } from "chai";
import { NOOP, NOOP_FALSE } from "../src/noop";

describe("NOOP", () => {
  it("NOOP => undefined", () => {
    expect(NOOP()).to.equal(undefined);
  });

  it("NOOP_FALSE => false", () => {
    expect(NOOP_FALSE()).to.equal(false);
  });
});
