import { createMutableProxy } from "./proxy";

export function useResetModules() {
  beforeEach(() => {
    jest.resetModules();
  });
}

export function useModule<T>(path: string): T {
  const { proxy, update } = createMutableProxy<T>();
  beforeEach(async () => {
    update(await import(path));
  });
  return proxy;
}

export function useIVI() {
  return useModule<typeof import("ivi")>("ivi");
}

export function useHTML() {
  return useModule<typeof import("ivi-html")>("ivi-html");
}

export function useSVG() {
  return useModule<typeof import("ivi-svg")>("ivi-svg");
}

export function useTest() {
  return useModule<typeof import("ivi-test")>("ivi-test");
}
