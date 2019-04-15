export function useMockFn<T = any, Y extends any[] = any>(
  each?: (mock: jest.Mock<T, Y>) => void,
): jest.Mock<T, Y> {
  const fn = jest.fn();
  if (each !== void 0) {
    beforeEach(() => {
      each(fn);
    });
  }
  afterEach(() => {
    fn.mockReset();
  });
  return fn;
}

export function useSpyOn<T extends {}, M extends jest.NonFunctionPropertyNames<Required<T>>>(
  object: () => T,
  method: M,
  accessType: "get",
): () => jest.SpyInstance<Required<T>[M], []>;
export function useSpyOn<T extends {}, M extends jest.NonFunctionPropertyNames<Required<T>>>(
  object: () => T,
  method: M,
  accessType: "set",
): () => jest.SpyInstance<void, [Required<T>[M]]>;
export function useSpyOn<T extends {}, M extends jest.FunctionPropertyNames<Required<T>>>(
  object: () => T,
  method: M,
): () => Required<T>[M] extends (...args: any[]) => any ?
  jest.SpyInstance<ReturnType<Required<T>[M]>, jest.ArgsType<Required<T>[M]>> : never;
export function useSpyOn(object: any, methodName: any, accessType?: any) {
  let spy: any;
  beforeEach(() => {
    spy = jest.spyOn(object(), methodName, accessType);
  });
  afterEach(() => {
    spy.mockRestore();
  });

  return () => spy;
}
