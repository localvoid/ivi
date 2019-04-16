export function useResetModules() {
  beforeEach(() => {
    jest.resetModules();
  });
}

export function useModule<T>(path: string): T {
  let module: any;
  const proxy = new Proxy({}, {
    get(target, key) {
      return module[key];
    }
  });
  beforeEach(async () => {
    module = await import(path);
  });
  return proxy as T;
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
