import { NOOP } from "./noop";
import { elementRemoveAttribute } from "./shortcuts";

export interface SyncableValue<P> {
  v: P | undefined;
  s: (element: Element, key: string, prev: P | undefined, next: P | undefined) => void;
}

export const SYNCABLE_VALUE_SKIP_UNDEFINED: SyncableValue<any> = {
  v: void 0,
  s: NOOP as (element: Element, key: string, prev: any, next: any) => void,
};

export const SYNCABLE_VALUE_REMOVE_ATTR_UNDEFINED = {
  v: void 0,
  s: (element: Element, key: string, prev: any) => {
    if (prev !== void 0) {
      elementRemoveAttribute.call(element, key);
    }
  },
};

export function PROPERTY<T>(v: T | undefined): SyncableValue<T> {
  return (v === void 0) ? SYNCABLE_VALUE_SKIP_UNDEFINED : { v, s: syncProperty };
}

function syncProperty(element: Element, key: string, prev: any, next: any) {
  if (prev !== next) {
    (element as any)[key] = next!;
  }
}
