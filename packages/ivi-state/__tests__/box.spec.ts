import { createBox } from "../src/box";

describe("src/box.ts", function () {
  test("init", function () {
    const m = { a: 1 };
    const a = createBox(m);
    expect(a.value).toBe(m);
  });

  test("createBox", function () {
    const m = { a: 1 };
    const a = createBox(m);
    const b = createBox(a.value);
    expect(b.value).toBe(m);
    expect(a).not.toBe(b);
  });
});
