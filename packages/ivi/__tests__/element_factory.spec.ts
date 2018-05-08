import { VNodeFlags, elementFactory } from "ivi";
import * as h from "ivi-html";

const div = h.div();
const input = h.input();
const divFactory = elementFactory(div);
const inputFactory = elementFactory(input);

test(`div flags`, () => {
  expect(divFactory()._flags & ~VNodeFlags.ElementFactory).toBe(h.div()._flags);
});

test(`input flags`, () => {
  expect(inputFactory()._flags & ~VNodeFlags.ElementFactory).toBe(h.input()._flags);
});

test(`div factory`, () => {
  expect(divFactory()._tag).toBe(div);
});

test(`input factory`, () => {
  expect(inputFactory()._tag).toBe(input);
});

test(`default className = undefined`, () => {
  expect(divFactory()._className).toBeUndefined();
});

test(`className = undefined`, () => {
  expect(divFactory(undefined)._className).toBeUndefined();
});

test(`className = "a"`, () => {
  expect(divFactory("a")._className).toBe("a");
});
