export interface Vec2 {
  x: number;
  y: number;
}

export function vec2(x: number, y: number): Vec2 {
  return { x, y };
}

export const ZeroVec2: Vec2 = vec2(0, 0);

export function vec2Distance(v: Vec2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function vec2DistanceSquared(v: Vec2): number {
  return v.x * v.x + v.y * v.y;
}

export function vec2Scale(v: Vec2, scaleX: number, scaleY: number): Vec2 {
  return vec2(v.x * scaleX, v.y * scaleY);
}

export function vec2Translate(v: Vec2, translateX: number, translateY: number): Vec2 {
  return vec2(v.x + translateX, v.y + translateY);
}

export function vec2Negate(v: Vec2): Vec2 {
  return vec2(-v.x, -v.y);
}

export function vec2Add(lhs: Vec2, rhs: Vec2): Vec2 {
  return vec2(lhs.x + rhs.x, lhs.y + rhs.y);
}

export function vec2Sub(lhs: Vec2, rhs: Vec2): Vec2 {
  return vec2(lhs.x - rhs.x, lhs.y - rhs.y);
}

export function vec2Mul(v: Vec2, operand: number): Vec2 {
  return vec2(v.x * operand, v.y * operand);
}

export function vec2Div(v: Vec2, operand: number): Vec2 {
  return vec2(v.x / operand, v.y / operand);
}

export function vec2Mod(v: Vec2, operand: number): Vec2 {
  return vec2(v.x % operand, v.y % operand);
}

export function vec2Equal(lhs: Vec2, rhs: Vec2): boolean {
  return lhs.x === rhs.x && lhs.y === rhs.y;
}
