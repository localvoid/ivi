import { VNodeFlags, VNode, fragment, mapRange } from "ivi";
import * as h from "ivi-html";

test(`{ null }`, () => {
  const v = h.div().c(null);

  expect(v._c).toBeNull();
});

test(`{ null }{ null }`, () => {
  const v = h.div().c(null, null);

  expect(v._c).toBeNull();
});

test(`10`, () => {
  const v = h.div().c(10);

  expect(v._c).toBeInstanceOf(VNode);
});

test(`"abc"`, () => {
  const v = h.div().c(10);

  expect(v._c).toBeInstanceOf(VNode);
});

test(`{ null }"abc"`, () => {
  const v = h.div().c(null, 10);

  expect((v._c as VNode)._f & VNodeFlags.Key).toBeFalsy();
  expect((v._c as VNode)._k).toBe(1);
});

test(`<div></div>`, () => {
  const v1 = h.div();
  const v = h.div().c(v1);

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(0);
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`{ null }<div></div>`, () => {
  const v1 = h.div();
  const v = h.div().c(null, v1);

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(1);
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`<div></div><div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(v1, v2);

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(0);
  expect(v2._f & VNodeFlags.Key).toBeFalsy();
  expect(v2._k).toBe(1);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`{ null }<div></div><div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(null, v1, v2);

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(1);
  expect(v2._f & VNodeFlags.Key).toBeFalsy();
  expect(v2._k).toBe(2);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`<div></div>{ null }<div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(v1, null, v2);

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(0);
  expect(v2._f & VNodeFlags.Key).toBeFalsy();
  expect(v2._k).toBe(2);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`<div></div><div></div>{ null }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(v1, v2, null);

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(0);
  expect(v2._f & VNodeFlags.Key).toBeFalsy();
  expect(v2._k).toBe(1);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`{ children(<div></div><div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(fragment(v1, v2));

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(0);
  expect(v2._f & VNodeFlags.Key).toBeFalsy();
  expect(v2._k).toBe(1);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`{ null }{ children(<div></div><div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(null, fragment(v1, v2));

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(1);
  expect(v2._f & VNodeFlags.Key).toBeFalsy();
  expect(v2._k).toBe(2);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`{ null }{ children(<div key="a"></div><div></div>) }`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div();
  const v = h.div().c(null, fragment(v1, v2));

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeTruthy();
  expect(v1._k).toBe("a");
  expect(v2._f & VNodeFlags.Key).toBeFalsy();
  expect(v2._k).toBe(2);
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`<div></div>{ children(<div></div><div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v3 = h.div();
  const v = h.div().c(v1, fragment(v2, v3));

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(0);
  expect(v2._f & VNodeFlags.Key).toBeFalsy();
  expect(v2._k).toBe(1);
  expect(v3._f & VNodeFlags.Key).toBeFalsy();
  expect(v3._k).toBe(2);
  expect(v1._l).toBe(v3);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBe(v3);
  expect(v3._l).toBe(v2);
  expect(v3._r).toBeNull();
});

test(`{ children(<div></div><div></div>) }<div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v3 = h.div();
  const v = h.div().c(fragment(v1, v2), v3);

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(0);
  expect(v2._f & VNodeFlags.Key).toBeFalsy();
  expect(v2._k).toBe(1);
  expect(v3._f & VNodeFlags.Key).toBeFalsy();
  expect(v3._k).toBe(2);
  expect(v1._l).toBe(v3);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBe(v3);
  expect(v3._l).toBe(v2);
  expect(v3._r).toBeNull();
});

test(`{ mapRange(0, 2, (i) => <div key={i}></div>) }`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div().k("b");
  const v = h.div().c(mapRange(0, 2, i => i === 0 ? v1 : v2));

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeTruthy();
  expect(v1._k).toBe("a");
  expect(v2._f & VNodeFlags.Key).toBeTruthy();
  expect(v2._k).toBe("b");
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`{ null }{ mapRange(0, 2, (i) => <div key={i}></div>) }`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div().k("b");
  const v = h.div().c(null, mapRange(0, 2, i => i === 0 ? v1 : v2));

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeTruthy();
  expect(v1._k).toBe("a");
  expect(v2._f & VNodeFlags.Key).toBeTruthy();
  expect(v2._k).toBe("b");
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`<div></div>{ mapRange(0, 2, (i) => <div key={i}></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div().k("a");
  const v3 = h.div().k("b");
  const v = h.div().c(v1, mapRange(0, 2, i => i === 0 ? v2 : v3));

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeFalsy();
  expect(v1._k).toBe(0);
  expect(v2._f & VNodeFlags.Key).toBeTruthy();
  expect(v2._k).toBe("a");
  expect(v3._f & VNodeFlags.Key).toBeTruthy();
  expect(v3._k).toBe("b");
  expect(v1._l).toBe(v3);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBe(v3);
  expect(v3._l).toBe(v2);
  expect(v3._r).toBeNull();
});

test(`{ mapRange(0, 2, (i) => <div key={i}></div>) }<div></div>`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div().k("b");
  const v3 = h.div();
  const v = h.div().c(mapRange(0, 2, i => i === 0 ? v1 : v2), v3);

  expect(v._c).toBe(v1);
  expect(v1._f & VNodeFlags.Key).toBeTruthy();
  expect(v1._k).toBe("a");
  expect(v2._f & VNodeFlags.Key).toBeTruthy();
  expect(v2._k).toBe("b");
  expect(v3._f & VNodeFlags.Key).toBeFalsy();
  expect(v3._k).toBe(1);
  expect(v1._l).toBe(v3);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBe(v3);
  expect(v3._l).toBe(v2);
  expect(v3._r).toBeNull();
});
