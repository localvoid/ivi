import { mapIterable, VNodeFlags, fragment } from "ivi";
import * as h from "ivi-html";

test(`null`, () => {
  expect(mapIterable(function* () {
    yield null;
  }())).toBeNull();
});

test(`one node`, () => {
  const v1 = h.div().k(5);

  const first = mapIterable(function* () {
    yield v1;
  }());

  expect(first).toBe(v1);
  expect(v1._f & VNodeFlags.KeyedList).toBeTruthy();
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`two nodes`, () => {
  const v1 = h.div().k(5);
  const v2 = h.div().k(6);

  const first = mapIterable(function* () {
    yield v1;
    yield v2;
  }());

  expect(first).toBe(v1);
  expect(v1._f & VNodeFlags.KeyedList).toBeTruthy();
  expect(v1._l).toBe(v2);
  expect(v1._r).toBe(v2);
  expect(v2._l).toBe(v1);
  expect(v2._r).toBeNull();
});

test(`first null`, () => {
  const v1 = h.div().k(5);

  const first = mapIterable(function* () {
    yield null;
    yield v1;
  }());

  expect(first).toBe(v1);
  expect(v1._f & VNodeFlags.KeyedList).toBeTruthy();
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`second null`, () => {
  const v1 = h.div().k(5);

  const first = mapIterable(function* () {
    yield v1;
    yield null;
  }());

  expect(first).toBe(v1);
  expect(v1._f & VNodeFlags.KeyedList).toBeTruthy();
  expect(v1._l).toBe(v1);
  expect(v1._r).toBeNull();
});

test(`raise an exception when VNode doesn't have an explicit key (first node)`, () => {
  expect(() => {
    mapIterable((function* () {
      yield h.div();
    })());
  }).toThrowError("key");
});

test(`raise an exception when VNode doesn't have an explicit key (second node)`, () => {
  expect(() => {
    mapIterable(function* () {
      yield h.div().k(0);
      yield h.div();
    }());
  }).toThrowError("key");
});

test(`raise an exception when function returns children collection`, () => {
  expect(() => {
    mapIterable(function* () {
      yield fragment(h.div().k(0), h.div().k(1));
    }());
  }).toThrowError("singular");
});
