/**
 * Mutable Proxy.
 */
export interface MutableProxy<T> {
  /**
   * Proxy object.
   */
  readonly proxy: T;
  /**
   * Update target value.
   *
   * @param value Target value.
   */
  update(value: T): void;
}

/**
 * createMutableProxy creates a mutable proxy.
 *
 * @param type Object type (function or object).
 * @returns {@link MutableProxy}
 */
export function createMutableProxy<T>(type: "function" | "object"): MutableProxy<T> {
  let target: any;
  return {
    proxy: new Proxy(type === "function" ? (() => void 0) as any : {}, {
      getPrototypeOf: (oTarget) => Object.getPrototypeOf(target),
      setPrototypeOf: (oTarget, proto) => Object.setPrototypeOf(target, proto),
      isExtensible: (oTarget) => Object.isExtensible(target),
      preventExtensions: (oTarget) => Object.preventExtensions(target),
      getOwnPropertyDescriptor: (oTarget, key) => Object.getOwnPropertyDescriptor(target, key),
      defineProperty: (oTarget, key, desc) => Object.defineProperty(target, key, desc),
      has: (oTarget, key) => key in target,
      get: (oTarget, key) => target[key],
      set: (oTarget, key, value) => target[key] = value,
      deleteProperty: (oTarget, key) => delete target[key],
      ownKeys: (oTarget) => Object.keys(target),
      apply: (oTarget, thisArg, args) => target.apply(thisArg, args),
      construct: (oTarget, args) => new target(...args),
    }) as T,
    update(value: T) {
      target = value;
    },
  };
}
