import {
  v2, V2_ZERO, v2Distance, v2DistanceSquared, v2Scale, v2Translate, v2Negate, v2Add, v2Sub, v2Mul, v2Div, v2Mod,
  v2Equal,
} from "ivi-math";

test(`factory`, () => {
  const v = v2(2, 3);

  expect(v.x).toBe(2);
  expect(v.y).toBe(3);
});

test(`ZERO vector`, () => {
  expect(V2_ZERO.x).toBe(0);
  expect(V2_ZERO.y).toBe(0);
});

test(`distance`, () => {
  expect(v2Distance(v2(2, 3))).toBeCloseTo(3.605);
});

test(`distance squared`, () => {
  expect(v2DistanceSquared(v2(2, 3))).toBeCloseTo(13);
});

test(`scale`, () => {
  const v = v2Scale(v2(2, 3), 3, 4);
  expect(v.x).toBe(6);
  expect(v.y).toBe(12);
});

test(`translate`, () => {
  const v = v2Translate(v2(2, 3), 3, 4);
  expect(v.x).toBe(5);
  expect(v.y).toBe(7);
});

test(`negate`, () => {
  const v = v2Negate(v2(2, 3));
  expect(v.x).toBe(-2);
  expect(v.y).toBe(-3);
});

test(`add`, () => {
  const v = v2Add(v2(2, 3), v2(3, 4));
  expect(v.x).toBe(5);
  expect(v.y).toBe(7);
});

test(`subtract`, () => {
  const v = v2Sub(v2(2, 3), v2(3, 5));
  expect(v.x).toBe(-1);
  expect(v.y).toBe(-2);
});

test(`multiply`, () => {
  const v = v2Mul(v2(2, 3), 4);
  expect(v.x).toBe(8);
  expect(v.y).toBe(12);
});

test(`divide`, () => {
  const v = v2Div(v2(4, 8), 2);
  expect(v.x).toBe(2);
  expect(v.y).toBe(4);
});

test(`mod`, () => {
  const v = v2Mod(v2(4, 8), 3);
  expect(v.x).toBe(1);
  expect(v.y).toBe(2);
});

test(`equal`, () => {
  expect(v2Equal(v2(4, 8), v2(4, 8))).toBe(true);
});

test(`not equal (x)`, () => {
  expect(v2Equal(v2(4, 8), v2(5, 8))).toBe(false);
});

test(`not equal (y)`, () => {
  expect(v2Equal(v2(4, 8), v2(4, 9))).toBe(false);
});
