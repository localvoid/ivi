import { VNodeFlags, element } from "ivi";
import * as h from "ivi-html";

const div = h.div();
const input = h.input();
const divFactory = element(div);
const inputFactory = element(input);

test(`div flags`, () => {
  expect(divFactory()._f & ~VNodeFlags.ElementFactory).toBe(h.div()._f);
});

test(`input flags`, () => {
  expect(inputFactory()._f & ~VNodeFlags.ElementFactory).toBe(h.input()._f);
});

test(`div factory`, () => {
  expect(divFactory()._t).toBe(div);
});

test(`input factory`, () => {
  expect(inputFactory()._t).toBe(input);
});

test(`default className = undefined`, () => {
  expect(divFactory()._cs).toBe("");
});

test(`className = undefined`, () => {
  expect(divFactory(undefined)._cs).toBe("");
});

test(`className = "a"`, () => {
  expect(divFactory("a")._cs).toBe("a");
});
