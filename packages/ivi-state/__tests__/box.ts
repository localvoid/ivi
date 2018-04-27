import { expect } from "iko";
import { box } from "../src/box";

describe("src/box.ts", function () {
  it("init", function () {
    const m = { a: 1 };
    const a = box(m);
    expect(a.ref).toBe(m);
  });

  it("boxate", function () {
    const m = { a: 1 };
    const a = box(m);
    const b = box(a.ref);
    expect(b.ref).toBe(m);
    expect(a).notToBe(b);
  });
});
