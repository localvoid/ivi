import { Vec2, ZeroVec2, vec2, vec2DistanceSquared, vec2Distance, vec2Div, vec2Mul } from "ivi-math";

export function velocityClampMagnitude(velocity: Vec2, minValue: number, maxValue: number): Vec2 {
  const valueSquared = vec2DistanceSquared(velocity);
  if (valueSquared > maxValue * maxValue) {
    return vec2Mul(vec2Div(velocity, vec2Distance(velocity)), maxValue);
  }
  if (valueSquared < minValue * minValue) {
    return vec2Mul(vec2Div(velocity, vec2Distance(velocity)), minValue);
  }
  return velocity;
}

export interface PointAtTime {
  readonly time: number;
  readonly point: Vec2;
}

const HISTORY_SIZE = 20;
const HORIZON_MILLISECONDS = 100;

export interface VelocityTracker {
  readonly samples: Array<PointAtTime | null>;
  index: number;
}

export function createVelocityTracker(): VelocityTracker {
  return {
    samples: new Array<PointAtTime | null>(HISTORY_SIZE).fill(null),
    index: 0,
  };
}

export function trackPosition(tracker: VelocityTracker, time: number, point: Vec2): void {
  const index = (tracker.index + 1) % HISTORY_SIZE;
  tracker.index = index;
  tracker.samples[index] = { time, point };
}

export function estimateVelocity(tracker: VelocityTracker): Vec2 | null {
  let index = tracker.index;
  const newestSample = tracker.samples[index];
  if (newestSample === null) {
    return ZeroVec2;
  }

  const x = [];
  const y = [];
  const time = [];

  let sampleCount = 0;

  do {
    const sample = tracker.samples[index];
    if (sample === null) {
      break;
    }

    const age = newestSample.time - sample.time;
    if (age > HORIZON_MILLISECONDS) {
      break;
    }

    const position = sample.point;
    x.push(position.x);
    y.push(position.y);
    time.push(-age);
    index = index === 0 ? (HISTORY_SIZE - 1) : (index - 1);
  } while (++sampleCount < HISTORY_SIZE);

  return vec2(lsq2(time, x), lsq2(time, y));
}

function lsq2(x: number[], y: number[]): number {
  const count = x.length;
  let sxi = 0;
  let sxiyi = 0;
  let syi = 0;
  let sxi2 = 0;
  let sxi3 = 0;
  let sxi2yi = 0;
  let sxi4 = 0;
  for (let i = 0; i < count; ++i) {
    const xi = x[i];
    const yi = y[i];
    const xi2 = xi * xi;
    const xi3 = xi2 * xi;
    const xi4 = xi3 * xi;
    const xi2yi = xi2 * yi;
    const xiyi = xi * yi;
    sxi += xi;
    sxi2 += xi2;
    sxiyi += xiyi;
    sxi2yi += xi2yi;
    syi += yi;
    sxi3 += xi3;
    sxi4 += xi4;
  }
  const Sxx = sxi2 - ((sxi * sxi) / count);
  const Sxy = sxiyi - ((sxi * syi) / count);
  const Sxx2 = sxi3 - ((sxi * sxi2) / count);
  const Sx2y = sxi2yi - ((sxi2 * syi) / count);
  const Sx2x2 = sxi4 - ((sxi2 * sxi2) / count);
  const numerator = (Sxy * Sx2x2) - (Sx2y * Sxx2);
  const denominator = (Sxx * Sx2x2) - (Sxx2 * Sxx2);

  return (denominator === 0) ? 0 : numerator / denominator;
}
