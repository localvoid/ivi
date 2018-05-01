import { expect } from "iko";
import { createBox } from "../src/box";

describe("src/box.ts", function () {
  it("init", function () {
    const m = { a: 1 };
    const a = createBox(m);
    expect(a.value).toBe(m);
  });

  it("boxate", function () {
    const m = { a: 1 };
    const a = createBox(m);
    const b = createBox(a.value);
    expect(b.value).toBe(m);
    expect(a).notToBe(b);
  });
});
