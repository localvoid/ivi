import { lazy, memoObject, memoArray } from "ivi";

describe(`lazy`, () => {
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
});

describe(`memoObject`, () => {
  test(`should return same value when input is shallow equal`, () => {
    const v = memoObject((value) => value);
    const a = v({ a: 1337 });
    const b = v({ a: 1337 });

    expect(a).toBe(b);
  });

  test(`should return different value when input aren't shallow equal`, () => {
    const v = memoObject((value) => value);
    const a = v({ a: 1337 });
    const b = v({ a: 1338 });

    expect(a).not.toBe(b);
  });
});

describe(`memoArray`, () => {
  test(`should return same value when input is shallow equal`, () => {
    const v = memoArray((value) => value);
    const a = v([1337]);
    const b = v([1337]);

    expect(a).toBe(b);
  });

  test(`should return different value when input aren't shallow equal`, () => {
    const v = memoArray((value) => value);
    const a = v([1337]);
    const b = v([1338]);

    expect(a).not.toBe(b);
  });
});
