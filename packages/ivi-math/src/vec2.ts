export interface V2 {
  x: number;
  y: number;
}

export function v2(x: number, y: number): V2 {
  return { x, y };
}

export const V2_ZERO: V2 = /*#__PURE__*/v2(0, 0);

export function v2Distance(v: V2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function v2DistanceSquared(v: V2): number {
  return v.x * v.x + v.y * v.y;
}

export function v2Scale(v: V2, scaleX: number, scaleY: number): V2 {
  return v2(v.x * scaleX, v.y * scaleY);
}

export function v2Translate(v: V2, translateX: number, translateY: number): V2 {
  return v2(v.x + translateX, v.y + translateY);
}

export function v2Negate(v: V2): V2 {
  return v2(-v.x, -v.y);
}

export function v2Add(lhs: V2, rhs: V2): V2 {
  return v2(lhs.x + rhs.x, lhs.y + rhs.y);
}

export function v2Sub(lhs: V2, rhs: V2): V2 {
  return v2(lhs.x - rhs.x, lhs.y - rhs.y);
}

export function v2Mul(v: V2, operand: number): V2 {
  return v2(v.x * operand, v.y * operand);
}

export function v2Div(v: V2, operand: number): V2 {
  return v2(v.x / operand, v.y / operand);
}

export function v2Mod(v: V2, operand: number): V2 {
  return v2(v.x % operand, v.y % operand);
}

export function v2Equal(lhs: V2, rhs: V2): boolean {
  return lhs.x === rhs.x && lhs.y === rhs.y;
}
