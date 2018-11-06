import { computedQuery } from "ivi-state";

test(`should be executed lazily`, () => {
  let i = 0;
  computedQuery(() => {
    i++;
    return 1337;
  });

  expect(i).toBe(0);
});

test(`should return value when executed`, () => {
  expect(computedQuery(() => ({ a: 1337 })).get()).toEqual({ a: 1337 });
});

test(`previous value should be undefined`, () => {
  let p;
  computedQuery(prev => (p = prev, 0)).get();
  expect(p).toBeUndefined();
});

test(`previous value should be cached`, () => {
  let p;

  const v = computedQuery(prev => (p = prev, { a: 1337 }));
  const a = v.get();
  v.get();

  expect(p).toBe(a);
});

test(`should reset previous value`, () => {
  let p;

  const v = computedQuery(prev => (p = prev, { a: 1337 }));
  v.get();
  v.reset();
  v.get();

  expect(p).toBeUndefined();
});
