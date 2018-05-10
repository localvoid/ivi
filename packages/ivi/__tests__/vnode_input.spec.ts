import * as h from "ivi-html";

test(`assigning children should raise an exception`, () => {
  expect(() => h.input().c("123")).toThrow(Error);
});

test(`assigning unsafeHTML should raise an exception`, () => {
  expect(() => h.input().unsafeHTML("123")).toThrow(Error);
});

test(`value`, () => {
  const e = h.input().value("abc");
  expect(e._children).toBe("abc");
});

test(`checked=true`, () => {
  const e = h.inputCheckbox().value(true);
  expect(e._children).toBe(true);
});

test(`checked=false`, () => {
  const e = h.inputCheckbox().value(false);
  expect(e._children).toBe(false);
});

test(`input text should raise an exception when checked is assigned`, () => {
  expect(() => h.input().value(true)).toThrow(Error);
});

test(`input checkbox should raise an exception when value is assigned`, () => {
  expect(() => h.inputCheckbox().value("abc")).toThrow(Error);
});
