import { mapRange, VNodeFlags, children } from "ivi";
import * as h from "ivi-html";

test(`zero range (0, 0)`, () => {
  expect(mapRange(0, 0, () => h.div())).toBeNull();
});

test(`zero range (5, 5)`, () => {
  expect(mapRange(5, 5, () => h.div())).toBeNull();
});

test(`negative range (5, 3)`, () => {
  expect(mapRange(5, 5, () => h.div())).toBeNull();
});

test(`check indexes (0, 2)`, () => {
  let j = 0;
  mapRange(0, 2, (i) => {
    expect(i).toBe(j++);
    return h.div().k(i);
  });
});

test(`check indexes (2, 4)`, () => {
  let j = 2;
  mapRange(2, 4, (i) => {
    expect(i).toBe(j++);
    return h.div().k(i);
  });
});

test(`one node`, () => {
  const v1 = h.div().k(5);
  const first = mapRange(0, 1, () => v1);

  expect(first).toBe(v1);
  expect(v1.flags & VNodeFlags.KeyedList).toBeTruthy();
  expect(v1.prev).toBe(v1);
  expect(v1.next).toBeNull();
});

test(`two nodes`, () => {
  const v1 = h.div().k(5);
  const v2 = h.div().k(6);
  const first = mapRange(0, 2, (i) => i === 0 ? v1 : v2);

  expect(first).toBe(v1);
  expect(v1.flags & VNodeFlags.KeyedList).toBeTruthy();
  expect(v1.prev).toBe(v2);
  expect(v1.next).toBe(v2);
  expect(v2.prev).toBe(v1);
  expect(v2.next).toBeNull();
});

test(`raise an exception when VNode doesn't have an explicit key (first node)`, () => {
  expect(() => { mapRange(0, 1, (v) => h.div()); }).toThrowError("key");
});

test(`raise an exception when VNode doesn't have an explicit key (second node)`, () => {
  expect(() => { mapRange(0, 2, (v) => v === 0 ? h.div().k(0) : h.div()); }).toThrowError("key");
});

test(`raise an exception when function returns children collection`, () => {
  expect(() => { mapRange(0, 1, () => children(h.div().k(0), h.div().k(1))); }).toThrowError("singular");
});
