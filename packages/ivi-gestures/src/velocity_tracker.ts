import {
  Vec2, ZeroVec2, vec2, vec2DistanceSquared, vec2Distance, vec2Div, vec2Mul, vec2Sub, vec2Equal, polynomialFit,
} from "ivi-math";

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

export interface VelocityEstimate {
  readonly pixelsPerSecond: Vec2;
  readonly confidence: number;
  readonly duration: number;
  readonly offset: Vec2;
}

interface PointAtTime {
  readonly time: number;
  readonly point: Vec2;
}

function velocityEstimate(pixelsPerSecond: Vec2, confidence: number, duration: number, offset: Vec2): VelocityEstimate {
  return { pixelsPerSecond, confidence, duration, offset };
}

const ASSUME_POINTER_MOVE_STOPPED_MILLISECONDS = 40;
const HISTORY_SIZE = 16;
const INDEX_MASK = 0b1111;
const HORIZON_MILLISECONDS = 100;
const MIN_SAMPLE_SIZE = 3;

export interface VelocityTracker {
  readonly samples: PointAtTime[];
  index: number;
}

export function createVelocityTracker(): VelocityTracker {
  return {
    samples: new Array<PointAtTime>(HISTORY_SIZE),
    index: 0,
  };
}

export function trackPosition(tracker: VelocityTracker, time: number, point: Vec2): void {
  const index = (tracker.index + 1) & INDEX_MASK;
  tracker.index = index;
  tracker.samples[index] = { time, point };
}

export function estimateVelocity(tracker: VelocityTracker): VelocityEstimate | null {
  let index = tracker.index;
  const newestSample = tracker.samples[index];
  if (newestSample === null) {
    return null;
  }

  const x = [] as number[];
  const y = [] as number[];
  const w = [] as number[];
  const time = [] as number[];

  let sampleCount = 0;
  let previousSample = newestSample;
  let oldestSample = newestSample;

  do {
    const sample = tracker.samples[index];
    if (sample === null) {
      break;
    }

    const age = newestSample.time - sample.time;
    const delta = Math.abs(sample.time - previousSample.time);
    previousSample = sample;

    if (age > HORIZON_MILLISECONDS || delta > ASSUME_POINTER_MOVE_STOPPED_MILLISECONDS) {
      break;
    }

    oldestSample = sample;
    const position = sample.point;
    x.push(position.x);
    y.push(position.y);
    w.push(1);
    time.push(-age);
    index = ((index === 0) ? HISTORY_SIZE : index) - 1;
    sampleCount++;
  } while (sampleCount < HISTORY_SIZE);

  if (sampleCount > MIN_SAMPLE_SIZE) {
    const xFit = polynomialFit(2, time, x, w);
    if (xFit !== null) {
      const yFit = polynomialFit(2, time, y, w);
      if (yFit !== null) {
        return velocityEstimate(
          vec2(xFit[1] * 1000, yFit[1] * 1000),
          xFit.confidence * yFit.confidence,
          newestSample.time - oldestSample.time,
          vec2Sub(newestSample.point, oldestSample.point),
        );
      }
    }
  }

  return velocityEstimate(
    ZeroVec2,
    1,
    newestSample.time - oldestSample.time,
    vec2Sub(newestSample.point, oldestSample.point),
  );
}

export function calculateVelocity(tracker: VelocityTracker): Vec2 | null {
  const estimate = estimateVelocity(tracker);
  if (estimate === null || vec2Equal(estimate.pixelsPerSecond, ZeroVec2) === true) {
    return null;
  }
  return estimate.pixelsPerSecond;
}
