import { NOOP } from "./noop";
import { elementRemoveAttribute } from "./shortcuts";

/**
 * Syncable values are providing an escape hatch for synchronization algorithm and open possibilities for applying any
 * chagnes to DOM elements.
 *
 * When DOM element attributes are synchronized, all values types are checked if it is a string, number, boolean or a
 * syncable value. When it is a syncable value, synchronization function will be invoked with the current DOM element,
 * current attribute key, value from the previous syncable value and current value.
 */
export interface SyncableValue<P> {
  /**
   * Value.
   */
  v: P | undefined;
  /**
   * Synchronization function.
   *
   * @param element - Target element
   * @param key - Attribute key
   * @param prev - Previous value
   * @param next - Next value
   */
  s(element: Element, key: string, prev: P | undefined, next: P | undefined): void;
}

/**
 * {@link SyncableValue} with `undefined` value and `NOOP` sync function.
 */
export const SYNCABLE_VALUE_SKIP_UNDEFINED: SyncableValue<any> = {
  v: void 0,
  s: NOOP as (element: Element, key: string, prev: any, next: any) => void,
};

/**
 * {@link SyncableValue} with `undefined` value and sync functions that removes `key` attribute.
 */
export const SYNCABLE_VALUE_REMOVE_ATTR_UNDEFINED = {
  v: void 0,
  s: (element: Element, key: string, prev: any) => {
    if (prev !== void 0) {
      elementRemoveAttribute.call(element, key);
    }
  },
};

/**
 * PROPERTY function creates a {@link SyncableValue} that assigns a property to a property name derived from the `key`
 * of the attribute.
 *
 * `undefined` values are ignored.
 *
 * @example
 *
 *   const e = div("", { _customProperty: PROPERTY("value") });
 *
 * @param v - Property value
 * @returns {@link SyncableValue}
 */
export function PROPERTY<T>(v: T | undefined): SyncableValue<T> {
  return (v === void 0) ? SYNCABLE_VALUE_SKIP_UNDEFINED : { v, s: syncProperty };
}

/**
 * Synchronization function for {@link SyncableValue} created with a {@link PROPERTY} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function syncProperty(element: Element, key: string, prev: any, next: any) {
  if (prev !== next) {
    (element as any)[key] = next!;
  }
}
