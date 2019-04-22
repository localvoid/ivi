import { createMutableProxy } from "./proxy";

/**
 * useResetModules resets modules before each test.
 */
export function useResetModules() {
  beforeEach(() => {
    jest.resetModules();
  });
}

/**
 * useModule imports module before each test.
 *
 * @param path Module path.
 * @returns Module.
 */
export function useModule<T>(path: string): T {
  const { proxy, update } = createMutableProxy<T>("function");
  beforeEach(async () => {
    update(await import(path));
  });
  return proxy;
}

/**
 * useIVI imports "ivi" module.
 *
 * @returns "ivi" module.
 */
export function useIVI() {
  return useModule<typeof import("ivi")>("ivi");
}

/**
 * useHTML imports "ivi-html" module.
 *
 * @returns "ivi-html" module.
 */
export function useHTML() {
  return useModule<typeof import("ivi-html")>("ivi-html");
}

/**
 * useSVG imports "ivi-svg" module.
 *
 * @returns "ivi-svg" module.
 */
export function useSVG() {
  return useModule<typeof import("ivi-svg")>("ivi-svg");
}

/**
 * useTest imports "ivi-test-utils" module.
 *
 * @returns "ivi-test" module.
 */
export function useTest() {
  return useModule<typeof import("ivi-test-utils")>("ivi-test-utils");
}
