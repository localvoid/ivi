import { createMutableProxy } from "./proxy";

/**
 * useComputedValue creates a value that will be recomputed before each test.
 *
 * @param fn Function.
 * @param type Proxy type.
 * @returns Computed value.
 */
export function useComputedValue<T>(fn: () => T, type: "function" | "object" = "function"): T {
  const { proxy, update } = createMutableProxy<T>(type);
  beforeEach(() => {
    update(fn());
  });
  return proxy;
}
