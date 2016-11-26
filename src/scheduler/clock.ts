
let _clock = 0;

/**
 * Monotonically increasing clock.
 *
 * @returns current clock value.
 */
export function clock(): number {
    return _clock;
}

export function incrementClock(): void {
    _clock++;
}
