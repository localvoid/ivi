import { VNodeFlags, VNode, children } from "ivi";
import * as h from "ivi-html";

test(`empty`, () => {
  expect(children()).toBeNull();
});

test(`{ null }`, () => {
  expect(children(null)).toBeNull();
});

test(`{ null }{ null }`, () => {
  expect(children(null, null)).toBeNull();
});

test(`"abc"`, () => {
  const first = children("abc")!;

  expect(first).toBeInstanceOf(VNode);
  expect(first.flags & VNodeFlags.Text).toBeTruthy();
  expect(first.children).toBe("abc");
  expect(first.prev).toBe(first);
  expect(first.next).toBeNull();
});

test(`10`, () => {
  const first = children(10)!;

  expect(first).toBeInstanceOf(VNode);
  expect(first.flags & VNodeFlags.Text).toBeTruthy();
  expect(first.children).toBe(10);
  expect(first.prev).toBe(first);
  expect(first.next).toBeNull();
});

test(`<div></div>`, () => {
  const v1 = h.div();
  const first = children(v1);

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v1);
  expect(v1.next).toBeNull();
});

test(`<div></div></div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const first = children(v1, v2);

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`{ null }<div></div>`, () => {
  const v1 = h.div();
  const first = children(null, v1);

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v1);
  expect(v1.next).toBeNull();
});

test(`{ null }{ null }<div></div>`, () => {
  const v1 = h.div();
  const first = children(null, null, v1);

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v1);
  expect(v1.next).toBeNull();
});

test(`<div></div>{ null }`, () => {
  const v1 = h.div();
  const first = children(v1, null);

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v1);
  expect(v1.next).toBeNull();
});

test(`<div></div>{ null }{ null }`, () => {
  const v1 = h.div();
  const first = children(v1, null, null);

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v1);
  expect(v1.next).toBeNull();
});

test(`{ null }<div></div>{ null }`, () => {
  const v1 = h.div();
  const first = children(null, v1, null);

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v1);
  expect(v1.next).toBeNull();
});

test(`<div></div>{ null }</div></div>`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const first = children(v1, null, v2);

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`{ children(<div></div></div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const first = children(children(v1, v2));

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`<div></div>{ children(<div></div></div></div>) }`, () => {
  const v1 = h.div();
  const v2 = h.div();
  const v3 = h.div();
  const first = children(v1, children(v2, v3));

  expect(first).toBe(v1);
  expect(v1.prev).toBe(v3);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBe(v3);
  expect(v3.prev).toBe(v2);
  expect(v3.next).toBeNull();
});
