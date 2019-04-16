export function useComputedValue<T>(fn: () => T): () => T {
  let value: T;
  let ready = false;
  beforeEach(() => {
    ready = false;
  });
  return () => ready ? value : (ready = true, value = fn());
}
