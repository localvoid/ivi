import { VNodeFlags, autofocus } from "ivi";
import * as h from "ivi-html";

test(`text flags`, () => {
  const t = h.t("abc");
  expect(t._flags & VNodeFlags.Text).toBeTruthy();
});

test(`children text`, () => {
  const t = h.t("abc");
  expect(t._children).toBe("abc");
});

test(`implicit key`, () => {
  const t = h.t("abc");
  expect(t._flags & VNodeFlags.Key).toBeFalsy();
  expect(t._key).toBe(0);
});

test(`explicit key`, () => {
  const t = h.t("abc").k("k");
  expect(t._flags & VNodeFlags.Key).toBeTruthy();
  expect(t._key).toBe("k");
});

test(`assigning attributes should raise an exception`, () => {
  expect(() => h.t("abc").a({} as any)).toThrow(Error);
});

test(`assigning style should raise an exception`, () => {
  expect(() => h.t("abc").s({})).toThrow(Error);
});

test(`assigning events should raise an exception`, () => {
  expect(() => h.t("abc").e([])).toThrow(Error);
});

test(`assigning children should raise an exception`, () => {
  expect(() => h.t("abc").c("123")).toThrow(Error);
});

test(`assigning unsafeHTML should raise an exception`, () => {
  expect(() => h.t("abc").unsafeHTML("123")).toThrow(Error);
});

test(`assigning input value should raise an exception`, () => {
  expect(() => h.t("abc").value("123")).toThrow(Error);
});

test(`assigning checked value should raise an exception`, () => {
  expect(() => h.t("abc").checked(true)).toThrow(Error);
});

test(`assigning autofocus should raise an exception`, () => {
  expect(() => autofocus(h.t("abc"))).toThrow(Error);
});
