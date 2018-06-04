import { VNodeFlags, VNode, fragment } from "ivi";
import * as h from "ivi-html";

test(`empty`, () => {
  expect(fragment()).toBeNull();
});

test(`{ null }`, () => {
  expect(fragment(null)).toBeNull();
});

test(`{ null }{ null }`, () => {
  expect(fragment(null, null)).toBeNull();
});

test(`"abc"`, () => {
  const first = fragment("abc")!;

  expect(first).toBeInstanceOf(VNode);
  expect(first._f & VNodeFlags.Text).toBeTruthy();
  expect(first._p).toBe("abc");
  expect(first._l).toBe(first);
  expect(first._r).toBeNull();
});

test(`10`, () => {
  const first = fragment(10)!;

  expect(first).toBeInstanceOf(VNode);
  expect(first._f & VNodeFlags.Text).toBeTruthy();
  expect(first._p).toBe(10);
  expect(first._l).toBe(first);
  expect(first._r).toBeNull();
});

test(`<div></div>`, () => {
  const v1 = h.div();
  const first = fragment(v1);

  expect(first).toBe(v1);
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`<div></div></div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const first = fragment(v1, v2);

  expect(first).toBe(v1);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`{ null }<div></div>`, () => {
  const v1 = h.div();
  const first = fragment(null, v1);

  expect(first).toBe(v1);
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`{ null }{ null }<div></div>`, () => {
  const v1 = h.div();
  const first = fragment(null, null, v1);

  expect(first).toBe(v1);
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`<div></div>{ null }`, () => {
  const v1 = h.div();
  const first = fragment(v1, null);

  expect(first).toBe(v1);
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`<div></div>{ null }{ null }`, () => {
  const v1 = h.div();
  const first = fragment(v1, null, null);

  expect(first).toBe(v1);
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`{ null }<div></div>{ null }`, () => {
  const v1 = h.div();
  const first = fragment(null, v1, null);

  expect(first).toBe(v1);
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`<div></div>{ null }</div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const first = fragment(v1, null, v2);

  expect(first).toBe(v1);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`{ children(<div></div></div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const first = fragment(fragment(v1, v2));

  expect(first).toBe(v1);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`<div></div>{ children(<div></div></div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v3 = h.div();
  const first = fragment(v1, fragment(v2, v3));

  expect(first).toBe(v1);
  expect(v1._l).toBe(v3);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBe(v3);
  expect(v3._l).toBe(v2);
  expect(v3._r).toBeNull();
});
