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
