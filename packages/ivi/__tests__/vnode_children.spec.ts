import { VNodeFlags, VNode, fragment, mapRange } from "ivi";
import * as h from "ivi-html";

test(`{ null }`, () => {
  const v = h.div().c(null);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeFalsy();
});

test(`{ null }{ null }`, () => {
  const v = h.div().c(null, null);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeFalsy();
});

test(`10`, () => {
  const v = h.div().c(10);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
});

test(`"abc"`, () => {
  const v = h.div().c(10);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
});

test(`{ null }"abc"`, () => {
  const v = h.div().c(null, 10);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect((v.children as VNode).flags & VNodeFlags.Key).toBeFalsy();
  expect((v.children as VNode).key).toBe(1);
});

test(`<div></div>`, () => {
  const v1 = h.div();
  const v = h.div().c(v1);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(0);
  expect(v1.prev).toBe(v1);
  expect(v1.next).toBeNull();
});

test(`{ null }<div></div>`, () => {
  const v1 = h.div();
  const v = h.div().c(null, v1);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(1);
  expect(v1.prev).toBe(v1);
  expect(v1.next).toBeNull();
});

test(`<div></div><div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(v1, v2);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(0);
  expect(v2.flags & VNodeFlags.Key).toBeFalsy();
  expect(v2.key).toBe(1);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`{ null }<div></div><div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(null, v1, v2);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(1);
  expect(v2.flags & VNodeFlags.Key).toBeFalsy();
  expect(v2.key).toBe(2);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`<div></div>{ null }<div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(v1, null, v2);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(0);
  expect(v2.flags & VNodeFlags.Key).toBeFalsy();
  expect(v2.key).toBe(2);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`<div></div><div></div>{ null }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(v1, v2, null);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(0);
  expect(v2.flags & VNodeFlags.Key).toBeFalsy();
  expect(v2.key).toBe(1);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`{ children(<div></div><div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(fragment(v1, v2));

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(0);
  expect(v2.flags & VNodeFlags.Key).toBeFalsy();
  expect(v2.key).toBe(1);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`{ null }{ children(<div></div><div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(null, fragment(v1, v2));

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(1);
  expect(v2.flags & VNodeFlags.Key).toBeFalsy();
  expect(v2.key).toBe(2);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`{ null }{ children(<div key="a"></div><div></div>) }`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div();
  const v = h.div().c(null, fragment(v1, v2));

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeTruthy();
  expect(v1.key).toBe("a");
  expect(v2.flags & VNodeFlags.Key).toBeFalsy();
  expect(v2.key).toBe(2);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`<div></div>{ children(<div></div><div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v3 = h.div();
  const v = h.div().c(v1, fragment(v2, v3));

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(0);
  expect(v2.flags & VNodeFlags.Key).toBeFalsy();
  expect(v2.key).toBe(1);
  expect(v3.flags & VNodeFlags.Key).toBeFalsy();
  expect(v3.key).toBe(2);
  expect(v1.prev).toBe(v3);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBe(v3);
  expect(v3.prev).toBe(v2);
  expect(v3.next).toBeNull();
});

test(`{ children(<div></div><div></div>) }<div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v3 = h.div();
  const v = h.div().c(fragment(v1, v2), v3);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(0);
  expect(v2.flags & VNodeFlags.Key).toBeFalsy();
  expect(v2.key).toBe(1);
  expect(v3.flags & VNodeFlags.Key).toBeFalsy();
  expect(v3.key).toBe(2);
  expect(v1.prev).toBe(v3);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBe(v3);
  expect(v3.prev).toBe(v2);
  expect(v3.next).toBeNull();
});

test(`{ mapRange(0, 2, (i) => <div key={i}></div>) }`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div().k("b");
  const v = h.div().c(mapRange(0, 2, (i) => i === 0 ? v1 : v2));

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeTruthy();
  expect(v1.key).toBe("a");
  expect(v2.flags & VNodeFlags.Key).toBeTruthy();
  expect(v2.key).toBe("b");
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`{ null }{ mapRange(0, 2, (i) => <div key={i}></div>) }`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div().k("b");
  const v = h.div().c(null, mapRange(0, 2, (i) => i === 0 ? v1 : v2));

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeTruthy();
  expect(v1.key).toBe("a");
  expect(v2.flags & VNodeFlags.Key).toBeTruthy();
  expect(v2.key).toBe("b");
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`<div></div>{ mapRange(0, 2, (i) => <div key={i}></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div().k("a");
  const v3 = h.div().k("b");
  const v = h.div().c(v1, mapRange(0, 2, (i) => i === 0 ? v2 : v3));

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeFalsy();
  expect(v1.key).toBe(0);
  expect(v2.flags & VNodeFlags.Key).toBeTruthy();
  expect(v2.key).toBe("a");
  expect(v3.flags & VNodeFlags.Key).toBeTruthy();
  expect(v3.key).toBe("b");
  expect(v1.prev).toBe(v3);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBe(v3);
  expect(v3.prev).toBe(v2);
  expect(v3.next).toBeNull();
});

test(`{ mapRange(0, 2, (i) => <div key={i}></div>) }<div></div>`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div().k("b");
  const v3 = h.div();
  const v = h.div().c(mapRange(0, 2, (i) => i === 0 ? v1 : v2), v3);

  expect(v.flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v.children).toBe(v1);
  expect(v1.flags & VNodeFlags.Key).toBeTruthy();
  expect(v1.key).toBe("a");
  expect(v2.flags & VNodeFlags.Key).toBeTruthy();
  expect(v2.key).toBe("b");
  expect(v3.flags & VNodeFlags.Key).toBeFalsy();
  expect(v3.key).toBe(1);
  expect(v1.prev).toBe(v3);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBe(v3);
  expect(v3.prev).toBe(v2);
  expect(v3.next).toBeNull();
});

test(`c should raise an exception when it is invoked on a void element`, () => {
  expect(() => h.br().c("a")).toThrowError();
});
