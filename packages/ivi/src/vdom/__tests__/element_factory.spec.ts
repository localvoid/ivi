import { VNodeFlags, element } from "ivi";
import * as h from "ivi-html";

const div = h.div();
const input = h.input();
const divFactory = element(div);
const inputFactory = element(input);

test(`div flags`, () => {
  expect(divFactory().flags & ~VNodeFlags.ElementFactory).toBe(h.div().flags);
});

test(`input flags`, () => {
  expect(inputFactory().flags & ~VNodeFlags.ElementFactory).toBe(h.input().flags);
});

test(`div factory`, () => {
  expect(divFactory().tag).toBe(div);
});

test(`input factory`, () => {
  expect(inputFactory().tag).toBe(input);
});

test(`default className = undefined`, () => {
  expect(divFactory().className).toBeUndefined();
});

test(`className = undefined`, () => {
  expect(divFactory(undefined).className).toBeUndefined();
});

test(`className = "a"`, () => {
  expect(divFactory("a").className).toBe("a");
});
