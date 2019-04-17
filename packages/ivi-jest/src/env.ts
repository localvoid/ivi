/**
 * useEnv overrides `process.env` before each tests and restores to the original value after each test.
 *
 * @param key Key.
 * @param value Value.
 */
export function useEnv(key: string, value: string) {
  const prev = process.env[key];
  beforeEach(() => {
    process.env[key] = value;
  });
  afterEach(() => {
    process.env[key] = prev;
  });
}
