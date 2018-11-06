import { action, handleAction } from "ivi-state";

test("action without arguments", () => {
  let i = 0;
  const a = action(() => { i++; });
  a();
  expect(i).toBe(1);
});

test("action with mutliple arguments", () => {
  let _x = 0;
  let _y = 0;
  const a = action((x: number, y: number) => { _x += x; _y += y; });
  a(1, 2);
  expect(_x).toBe(1);
  expect(_y).toBe(2);
});

test("action with mutliple handlers", () => {
  let _x = 0;
  let _y = 0;
  const a = action((x: number, y: number) => { /**/ });
  handleAction(a, (x, y) => { _x += x; _y += y; });
  handleAction(a, (x, y) => { _x += x; _y += y; });

  a(1, 2);
  expect(_x).toBe(2);
  expect(_y).toBe(4);
});
