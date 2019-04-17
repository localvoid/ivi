/**
 * useTimers mocks timers.
 */
export function useTimers() {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  return {
    flushAll() {
      jest.runAllTimers();
    },
    flushPending() {
      jest.runOnlyPendingTimers();
    },
    advance(ms: number) {
      jest.advanceTimersByTime(ms);
    },
  };
}
