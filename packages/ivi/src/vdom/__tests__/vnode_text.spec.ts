import { VNodeFlags, t } from "ivi";

describe(`Text node`, () => {
  test(`flags`, () => {
    const n = t("abc");
    expect(n._f & VNodeFlags.Text).toBeTruthy();
  });

  test(`props`, () => {
    const n = t("abc");
    expect(n._p).toBe("abc");
  });

  test(`implicit key`, () => {
    const n = t("abc");
    expect(n._f & VNodeFlags.Key).toBeFalsy();
    expect(n._k).toBe(0);
  });

  test(`explicit key`, () => {
    const n = t("abc").k("k");
    expect(n._f & VNodeFlags.Key).toBeTruthy();
    expect(n._k).toBe("k");
  });

  test(`assigning events should raise an exception`, () => {
    expect(() => t("abc").e([])).toThrow(Error);
  });

  test(`assigning children should raise an exception`, () => {
    expect(() => t("abc").c("123")).toThrow(Error);
  });
});
