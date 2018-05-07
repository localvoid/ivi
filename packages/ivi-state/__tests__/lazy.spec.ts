import { lazy } from "../src/lazy";

test(`should be executed lazily`, () => {
  let i = 0;
  lazy(() => {
    i++;
    return 1337;
  });

  expect(i).toBe(0);
});

test(`should return value when executed`, () => {
  expect(lazy(() => ({ a: 1337 }))()).toEqual({ a: 1337 });
});

test(`should return same value when executed twice`, () => {
  const v = lazy(() => ({ a: 1337 }));
  const a = v();
  const b = v();

  expect(a).toBe(b);
});
