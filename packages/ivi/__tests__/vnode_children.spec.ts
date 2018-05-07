import { VNodeFlags } from "../src/vdom/flags";
import { VNode } from "../src/vdom/vnode";
import { children, mapRange } from "../src/vdom/vnode_collections";
import * as h from "./utils/html";

test(`{ null }`, () => {
  const v = h.div().c(null);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeFalsy();
});

test(`{ null }{ null }`, () => {
  const v = h.div().c(null, null);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeFalsy();
});

test(`10`, () => {
  const v = h.div().c(10);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
});

test(`"abc"`, () => {
  const v = h.div().c(10);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
});

test(`{ null }"abc"`, () => {
  const v = h.div().c(null, 10);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect((v._children as VNode)._flags & VNodeFlags.Key).toBeFalsy();
  expect((v._children as VNode)._key).toBe(1);
});

test(`<div></div>`, () => {
  const v1 = h.div();
  const v = h.div().c(v1);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(0);
  expect(v1._prev).toBe(v1);
  expect(v1._next).toBeNull();
});

test(`{ null }<div></div>`, () => {
  const v1 = h.div();
  const v = h.div().c(null, v1);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(1);
  expect(v1._prev).toBe(v1);
  expect(v1._next).toBeNull();
});

test(`<div></div><div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(v1, v2);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(0);
  expect(v2._flags & VNodeFlags.Key).toBeFalsy();
  expect(v2._key).toBe(1);
  expect(v1._prev).toBe(v2);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBeNull();
});

test(`{ null }<div></div><div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(null, v1, v2);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(1);
  expect(v2._flags & VNodeFlags.Key).toBeFalsy();
  expect(v2._key).toBe(2);
  expect(v1._prev).toBe(v2);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBeNull();
});

test(`<div></div>{ null }<div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(v1, null, v2);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(0);
  expect(v2._flags & VNodeFlags.Key).toBeFalsy();
  expect(v2._key).toBe(2);
  expect(v1._prev).toBe(v2);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBeNull();
});

test(`<div></div><div></div>{ null }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(v1, v2, null);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(0);
  expect(v2._flags & VNodeFlags.Key).toBeFalsy();
  expect(v2._key).toBe(1);
  expect(v1._prev).toBe(v2);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBeNull();
});

test(`{ children(<div></div><div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(children(v1, v2));

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(0);
  expect(v2._flags & VNodeFlags.Key).toBeFalsy();
  expect(v2._key).toBe(1);
  expect(v1._prev).toBe(v2);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBeNull();
});

test(`{ null }{ children(<div></div><div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v = h.div().c(null, children(v1, v2));

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(1);
  expect(v2._flags & VNodeFlags.Key).toBeFalsy();
  expect(v2._key).toBe(2);
  expect(v1._prev).toBe(v2);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBeNull();
});

test(`{ null }{ children(<div key="a"></div><div></div>) }`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div();
  const v = h.div().c(null, children(v1, v2));

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeTruthy();
  expect(v1._key).toBe("a");
  expect(v2._flags & VNodeFlags.Key).toBeFalsy();
  expect(v2._key).toBe(2);
  expect(v1._prev).toBe(v2);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBeNull();
});

test(`<div></div>{ children(<div></div><div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v3 = h.div();
  const v = h.div().c(v1, children(v2, v3));

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(0);
  expect(v2._flags & VNodeFlags.Key).toBeFalsy();
  expect(v2._key).toBe(1);
  expect(v3._flags & VNodeFlags.Key).toBeFalsy();
  expect(v3._key).toBe(2);
  expect(v1._prev).toBe(v3);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBe(v3);
  expect(v3._prev).toBe(v2);
  expect(v3._next).toBeNull();
});

test(`{ children(<div></div><div></div>) }<div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v3 = h.div();
  const v = h.div().c(children(v1, v2), v3);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(0);
  expect(v2._flags & VNodeFlags.Key).toBeFalsy();
  expect(v2._key).toBe(1);
  expect(v3._flags & VNodeFlags.Key).toBeFalsy();
  expect(v3._key).toBe(2);
  expect(v1._prev).toBe(v3);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBe(v3);
  expect(v3._prev).toBe(v2);
  expect(v3._next).toBeNull();
});

test(`{ mapRange(0, 2, (i) => <div key={i}></div>) }`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div().k("b");
  const v = h.div().c(mapRange(0, 2, (i) => i === 0 ? v1 : v2));

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeTruthy();
  expect(v1._key).toBe("a");
  expect(v2._flags & VNodeFlags.Key).toBeTruthy();
  expect(v2._key).toBe("b");
  expect(v1._prev).toBe(v2);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBeNull();
});

test(`{ null }{ mapRange(0, 2, (i) => <div key={i}></div>) }`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div().k("b");
  const v = h.div().c(null, mapRange(0, 2, (i) => i === 0 ? v1 : v2));

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeTruthy();
  expect(v1._key).toBe("a");
  expect(v2._flags & VNodeFlags.Key).toBeTruthy();
  expect(v2._key).toBe("b");
  expect(v1._prev).toBe(v2);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBeNull();
});

test(`<div></div>{ mapRange(0, 2, (i) => <div key={i}></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div().k("a");
  const v3 = h.div().k("b");
  const v = h.div().c(v1, mapRange(0, 2, (i) => i === 0 ? v2 : v3));

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeFalsy();
  expect(v1._key).toBe(0);
  expect(v2._flags & VNodeFlags.Key).toBeTruthy();
  expect(v2._key).toBe("a");
  expect(v3._flags & VNodeFlags.Key).toBeTruthy();
  expect(v3._key).toBe("b");
  expect(v1._prev).toBe(v3);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBe(v3);
  expect(v3._prev).toBe(v2);
  expect(v3._next).toBeNull();
});

test(`{ mapRange(0, 2, (i) => <div key={i}></div>) }<div></div>`, () => {
  const v1 = h.div().k("a");
  const v2 = h.div().k("b");
  const v3 = h.div();
  const v = h.div().c(mapRange(0, 2, (i) => i === 0 ? v1 : v2), v3);

  expect(v._flags & VNodeFlags.ChildrenVNode).toBeTruthy();
  expect(v._children).toBe(v1);
  expect(v1._flags & VNodeFlags.Key).toBeTruthy();
  expect(v1._key).toBe("a");
  expect(v2._flags & VNodeFlags.Key).toBeTruthy();
  expect(v2._key).toBe("b");
  expect(v3._flags & VNodeFlags.Key).toBeFalsy();
  expect(v3._key).toBe(1);
  expect(v1._prev).toBe(v3);
  expect(v1._next).toBe(v2);
  expect(v2._prev).toBe(v1);
  expect(v2._next).toBe(v3);
  expect(v3._prev).toBe(v2);
  expect(v3._next).toBeNull();
});
