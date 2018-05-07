import { createBox, createBoxSnapshot } from "../src/box";

test("createBox", function () {
  const m = { a: 1 };
  const a = createBox(m);

  expect(a.value).toBe(m);
});

test("createBoxSnapshot", function () {
  const m = { a: 1 };
  const a = createBox(m);
  const b = createBoxSnapshot(a);

  expect(b.value).toBe(m);
  expect(b.box).toBe(a);
  expect(b).not.toBe(a);
});
