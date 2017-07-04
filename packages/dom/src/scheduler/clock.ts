
let _clock = 0;

/**
 * clock returns monotonically increasing clock value.
 *
 * @returns current clock value.
 */
export function clock(): number {
    return _clock;
}

/**
 * incrementClock increments clock value.
 */
export function incrementClock(): void {
    _clock++;
}
