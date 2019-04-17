export function useResetModules() {
  beforeEach(() => {
    jest.resetModules();
  });
}

export function useModule<T>(path: string): T {
  let module: any;
  beforeEach(async () => {
    module = await import(path);
  });
  return new Proxy({}, {
    get(target, key) {
      return module[key];
    },
    apply(target, thisArg, args) {
      return module(...args);
    },
    construct(target, args) {
      return new module(...args);
    },
  }) as T;
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
