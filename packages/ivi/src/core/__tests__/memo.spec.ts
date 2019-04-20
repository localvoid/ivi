import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("lazy", () => {
  test("should be executed lazily", () => {
    const fn = jest.fn();
    ivi.lazy(fn);

    expect(fn).not.toHaveBeenCalled();
  });

  test("should return value when executed", () => {
    expect(ivi.lazy(() => ({ a: 1337 }))()).toEqual({ a: 1337 });
  });

  test("should return same value when executed twice", () => {
    const v = ivi.lazy(() => ({ a: 1337 }));
    expect(v()).toBe(v());
  });
});

describe("memoObject", () => {
  test("should return same value when input is shallow equal", () => {
    const v = ivi.memoObject((value) => value);
    expect(v({ a: 1 })).toBe(v({ a: 1 }));
  });

  test("should return different value when input aren't shallow equal", () => {
    const v = ivi.memoObject((value) => value);
    expect(v({ a: 1 })).not.toBe(v({ a: 2 }));
  });
});

describe("memoArray", () => {
  test("should return same value when input is shallow equal", () => {
    const v = ivi.memoArray((value) => value);
    expect(v([1])).toBe(v([1]));
  });

  test("should return different value when input aren't shallow equal", () => {
    const v = ivi.memoArray((value) => value);
    expect(v([1])).not.toBe(v([2]));
  });
});
