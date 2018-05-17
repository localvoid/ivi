import { cachedQuery } from "ivi-state";

test(`should be executed lazily`, () => {
  let i = 0;
  cachedQuery(() => {
    i++;
    return 1337;
  });

  expect(i).toBe(0);
});

test(`should return value when executed`, () => {
  expect(cachedQuery(() => ({ a: 1337 })).get()).toEqual({ result: { a: 1337 } });
});

test(`should return same value when executed twice`, () => {
  const v = cachedQuery(() => ({ a: 1337 }));
  const a = v.get();
  const b = v.get();

  expect(a).toBe(b);
});

test(`should return different value after reset`, () => {
  const v = cachedQuery(() => ({ a: 1337 }));
  const a = v.get();
  v.reset();
  const b = v.get();

  expect(a).not.toBe(b);
});
