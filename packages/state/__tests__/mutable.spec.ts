import { expect } from "iko";
import { mut } from "../src/mutable";

describe("src/mutable.ts", function () {
  it("init", function () {
    const m = { a: 1 };
    const a = mut(m);
    expect(a.ref).toBe(m);
  });

  it("mutate", function () {
    const m = { a: 1 };
    const a = mut(m);
    const b = mut(a.ref);
    expect(b.ref).toBe(m);
    expect(a).notToBe(b);
  });
});
