/**
 * Monotonically increasing clock.
 */
let _clock = 1;

/**
 * clock returns monotonically increasing clock value.
 *
 * @returns current clock value.
 */
export function clock() {
  return _clock;
}

/**
 * advanceClock increments clock value.
 */
export function advanceClock() {
  _clock++;
}
