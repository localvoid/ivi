import { VNodeFlags } from "ivi";
import * as h from "ivi-html";

test(`unsafeHTML should toggle unsafeHTML flag when null is assigned`, () => {
  const v = h.div().unsafeHTML(null);

  expect(v._f & VNodeFlags.UnsafeHTML).toBeTruthy();
});

test(`unsafeHTML should toggle unsafeHTML flag when string is assigned`, () => {
  const v = h.div().unsafeHTML("a");

  expect(v._f & VNodeFlags.UnsafeHTML).toBeTruthy();
});

test(`unsafeHTML should raise an exception when it is invoked on a void element`, () => {
  expect(() => h.br().unsafeHTML("a")).toThrowError();
});
