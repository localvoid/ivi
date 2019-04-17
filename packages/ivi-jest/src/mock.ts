import { createMutableProxy } from "./proxy";

/**
 * useMockFn creates a mock function and resets it after each test.
 *
 * @param each Optional callback that will be executed before each test.
 * @returns Mock function.
 */
export function useMockFn<T = any, Y extends any[] = any>(
  each?: (mock: jest.Mock<T, Y>) => void,
): jest.Mock<T, Y> {
  const fn = jest.fn();
  if (each !== void 0) {
    each(fn);
  }
  afterEach(() => {
    fn.mockClear();
  });
  return fn;
}

/**
 * useSpyOn creates a spy object and resets it after each test.
 *
 * @param object Target.
 * @param method Target method.
 * @param accessType Access type.
 * @returns Spy object.
 */
export function useSpyOn<T extends {}, M extends jest.NonFunctionPropertyNames<Required<T>>>(
  object: () => T,
  method: M,
  accessType: "get",
): jest.SpyInstance<Required<T>[M], []>;
export function useSpyOn<T extends {}, M extends jest.NonFunctionPropertyNames<Required<T>>>(
  object: () => T,
  method: M,
  accessType: "set",
): jest.SpyInstance<void, [Required<T>[M]]>;
export function useSpyOn<T extends {}, M extends jest.FunctionPropertyNames<Required<T>>>(
  object: () => T,
  method: M,
): Required<T>[M] extends (...args: any[]) => any ?
  jest.SpyInstance<ReturnType<Required<T>[M]>, jest.ArgsType<Required<T>[M]>> : never;
export function useSpyOn(object: any, methodName: any, accessType?: any): any {
  const { proxy, update } = createMutableProxy<any>("object");
  beforeEach(() => {
    update(jest.spyOn(object(), methodName, accessType));
  });
  afterEach(() => {
    proxy.mockRestore();
  });

  return proxy;
}
