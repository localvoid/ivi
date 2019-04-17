import { createMutableProxy } from "./proxy";

export function useComputedValue<T>(fn: () => T): T {
  const { proxy, update } = createMutableProxy<T>();
  beforeEach(() => {
    update(fn());
  });
  return proxy;
}
