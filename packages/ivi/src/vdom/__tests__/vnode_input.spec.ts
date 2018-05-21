import * as h from "ivi-html";

test(`assigning children should raise an exception`, () => {
  expect(() => h.input().c("123")).toThrow(Error);
});

test(`assigning unsafeHTML should raise an exception`, () => {
  expect(() => h.input().unsafeHTML("123")).toThrow(Error);
});

test(`value`, () => {
  const e = h.input().value("abc");
  expect(e._c).toBe("abc");
});

test(`checked=true`, () => {
  const e = h.input().value(true);
  expect(e._c).toBe(true);
});

test(`checked=false`, () => {
  const e = h.input().value(false);
  expect(e._c).toBe(false);
});
