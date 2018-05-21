import * as h from "ivi-html";

test(`value`, () => {
  const e = h.textarea().value("abc");
  expect(e._c).toBe("abc");
});

test(`assigning children should raise an exception`, () => {
  expect(() => h.textarea().c("123")).toThrow(Error);
});

test(`assigning unsafeHTML should raise an exception`, () => {
  expect(() => h.textarea().unsafeHTML("123")).toThrow(Error);
});
