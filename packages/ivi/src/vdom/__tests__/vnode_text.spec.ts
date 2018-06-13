import { VNodeFlags, autofocus } from "ivi";
import * as h from "ivi-html";

test(`text flags`, () => {
  const t = h.t("abc");
  expect(t._f & VNodeFlags.Text).toBeTruthy();
});

test(`children text`, () => {
  const t = h.t("abc");
  expect(t._p).toBe("abc");
});

test(`implicit key`, () => {
  const t = h.t("abc");
  expect(t._f & VNodeFlags.Key).toBeFalsy();
  expect(t._k).toBe(0);
});

test(`explicit key`, () => {
  const t = h.t("abc").k("k");
  expect(t._f & VNodeFlags.Key).toBeTruthy();
  expect(t._k).toBe("k");
});

test(`assigning events should raise an exception`, () => {
  expect(() => h.t("abc").e([])).toThrow(Error);
});

test(`assigning children should raise an exception`, () => {
  expect(() => h.t("abc").c("123")).toThrow(Error);
});

test(`assigning autofocus should raise an exception`, () => {
  expect(() => autofocus(h.t("abc"))).toThrow(Error);
});
